import React, { useState, useEffect } from 'react';
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
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {   
      auth.checkUserValidity(token) 
      .then((res) => {
        if (res && res.data) {   
          setLoggedIn(true);
          setUserEmail(res.data.email);
          setCurrentUser(res.data);  
          history.push('/'); 
        }  
      }).catch((err) => console.log(err));

      api.getInitialCards(token) 
        .then((res) => {
          if (res.data) {
            setCards(() => res.data);
          }
      }).catch((err) => console.log(err));
    }
   Promise.all([]); 
  }, [token]);   

  function handleSignup({ email, password, name, about, avatar }) {
    auth.registerUser(email, password, name, about, avatar)
    .then((res) => {
      if (res && res.data) {
        setIsToolTipOpen(true);
        setAuthSuccess(true);
        setLoggedIn(true);  
        setUserEmail(res.data.email); 
        setToken(res.token);
        localStorage.setItem('token', res.token);
        setCurrentUser(res.data);
      }   
    }).then(() => history.push('/'))
    .catch(() => {
        setIsToolTipOpen(true);
        setAuthSuccess(false);
      });
  } 
  function handleSignin({email, password}) {
    auth.loginUser(email, password)
        .then((res) => {
        if (res && res.token) {
          setLoggedIn(true); 
          setToken(res.token);   
          localStorage.setItem('token', res.token);
          history.push("/"); 
        }
      })
      .catch((err) => {
        setIsToolTipOpen(true);
        setAuthSuccess(false);
        console.log(err);
      });
  } 
  
  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push("/signin");
  }

  function handleCardLike(card) {
   // const token = localStorage.getItem('token');
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i._id === currentUser._id); // original from previous sprint
    //const isLiked = card.likes.some((i) => i === currentUser._id); // changed
    api.updateLike(card._id, !isLiked, token).then((newCard) => {
      // Create a new array based on the existing one and putting a new card into it
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Update the state
      setCards(newCards);
    }).catch((err) => console.log(err));
  }

  function handleCardDelete(deletedCard) {
   // const token = localStorage.getItem("token");
    api.deleteCard(deletedCard._id, token).then(() => {
        const newCards = cards.filter((card) => card._id !== deletedCard._id)
        setCards(newCards);
        setIsDeletePopupOpen(false);
    }).catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
  //  const token = localStorage.getItem("token");
    api.editUserInfo({ name, about }, token).then((res) =>{
      setCurrentUser(res.data);
      setIsEditProfilePopupOpen(false);
    }).catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
  //  const token = localStorage.getItem("token");
    api.setUserAvatar({ avatar }, token).then((res) => {
        setCurrentUser(res.data);
        setIsEditAvatarPopupOpen(false);
    }).catch((err) => console.log(err));
  }

  function handleAddPlace({ name, link }) {
  //  const token = localStorage.getItem("token");
    api.newCard({ name, link }, token).then((newCard) => {
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

  function handleCardClick(card) {
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
