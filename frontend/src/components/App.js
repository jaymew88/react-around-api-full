import React, {useState} from 'react';
import {
  Route, 
  Switch,
  withRouter,
  useHistory,
  Redirect
} from 'react-router-dom';
import api from '../utils/api';
import auth from '../utils/auth';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // User Profile and Cards
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  // Login and Register
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isInfoToolTipOpen, setIsToolTipOpen] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
 
  React.useEffect(() => {
    api.getUserInfo().then((userProfile) => {
        setCurrentUser(userProfile);
    }).catch((err) => console.log(err));

    api.getInitialCards().then((cards) => {
      cards.forEach((card) => {
        setCards([...cards, card]);
      });
    }).catch((err) => console.log(err));

    if (localStorage.getItem("jwt")) {
      tokenCheck();
    }
    Promise.all([]);
  }, []);

  React.useEffect(tokenCheck, []);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth.checkUserValidity(token)
        .then((res) => {
          if (res && res.data) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push("/");
          }
        }).catch((err) => console.log(err));
    }
  } 

  function handleSignup({ email, password }) {
    auth.registerUser(email, password)
      .then((res) => {
        if (res && res.data) {
          setIsToolTipOpen(true);
          setAuthSuccess(true);
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push("/");
        }
      }).catch(() => {
        setIsToolTipOpen(true);
        setAuthSuccess(false);
      }); 
  }

  function handleSignin({ email, password }) {
    auth.loginUser(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          history.push("/");
          tokenCheck();
        }
      }).catch(() => {
        setIsToolTipOpen(true);
        setAuthSuccess(false);
      }); 
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/signin");
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.updateLike(card._id, !isLiked).then((newCard) => {
      // Create a new array based on the existing one and putting a new card into it
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Update the state
      setCards(newCards);
    }).catch((err) => console.log(err));
  }

  function handleCardDelete(deletedCard) {
    api.deleteCard(deletedCard._id).then(() => {
        const newCards = cards.filter((card) => card._id !== deletedCard._id)
        setCards(newCards);
        setIsDeletePopupOpen(false);
    }).catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about}) {
    api.editUserInfo({ name: name, about: about }).then((userProfile) =>{
      setCurrentUser(userProfile);
      setIsEditProfilePopupOpen(false);
    }).catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar).then((userProfile) => {
        setCurrentUser(userProfile);
        setIsEditAvatarPopupOpen(false);
    }).catch((err) => console.log(err));
  }

  function handleAddPlace({ name, link }) {
    api.newCard({name: name, link: link,}).then((newCard) => {
        setCards([...cards, newCard]);
        setIsAddPlacePopupOpen(false);
    }).catch((err) => console.log(err));
  }

  function handleEditAvatarClick() {
   setIsEditAvatarPopupOpen(true);
   window.addEventListener('keyup', handleEscClose);
  }
  function handleEditProfileClick() {
   setIsEditProfilePopupOpen(true);
   window.addEventListener('keyup', handleEscClose);
  }
  function handleAddPlaceClick() {
   setIsAddPlacePopupOpen(true);
   window.addEventListener('keyup', handleEscClose); 
  }

  function handleCardClick(card){
    setSelectedCard(card);
    window.addEventListener('keyup', handleEscClose); 
  }

  function handleDeleteClick(card) {
    setDeletedCard(card);
    setIsDeletePopupOpen(true);
    window.addEventListener('keyup', handleEscClose); 
  }

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups()
    }
  }

  function closeAllPopups() {
    window.removeEventListener('keyup', handleEscClose);
    setSelectedCard(null);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsToolTipOpen(false);
  }

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <ProtectedRoute path="/" exact loggedIn={loggedIn}>
              <Header 
                loggedIn={loggedIn}
                email={userEmail}
                link={{ description: "Log out", to : "#" }}
                onLogout={handleLogout}
              />
              <Main 
                cards={cards} 
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick} 
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick} 
              />
            </ProtectedRoute>
            <Route path="/signin">
              <Header 
                loggedIn={loggedIn}
                email={userEmail}
                link={{ description: "Sign up", to: "/signup" }}
              />
              <Login onSignin={handleSignin} />
            </Route>
            <Route path="/signup">
              <Header 
                loggedIn={loggedIn}
                email={userEmail}
                link={{ description: "Log in", to:"/signin" }}
              />
              <Register onSignup={handleSignup} />
            </Route>
            <Route>
              <Redirect to={loggedIn ? "/" : "/signin"} />
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser} 
          />
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar} 
          />
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlace}
          />
          <ConfirmationPopup 
            isOpen={isDeletePopupOpen} 
            onClose={closeAllPopups} 
            onConfirmation={handleCardDelete} 
            confirmSelectedCard={deletedCard}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoToolTip 
            isOpen={isInfoToolTipOpen} 
            onClose={closeAllPopups} 
            success={authSuccess} 
          />
      </CurrentUserContext.Provider>
    </div>  
   </>       
  );
}

export default withRouter(App);
