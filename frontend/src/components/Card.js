import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const [isLiked, setIsLiked] = React.useState(false);
  const [isOwn, setIsOwn] = React.useState(false);
  const [likesTotal, setLikesTotal] = React.useState(0);

  const currentUser = React.useContext(CurrentUserContext); // same

//   const isOwn = props.card.owner === currentUser._id; // was props.card.owner._id
//  // const isOwn = currentUser && (props.card.owner === currentUser._id);
//   const cardDeleteButtonClassName = (
//     `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`);

//   // Check if the card was liked by the current user
//   //const isLiked = props.card.likes.some(i => i._id === currentUser._id); // original
//   const isLiked = props.card.likes.some((i) => i === currentUser._id); // change from original
  
//   const cardLikeButtonClassName = (`button card__like-button ${isLiked ? 'card__like-button_active' : ''}`); 
//   const likesTotal = props.card.likes.length;

  // Delete Button Visiblility
  React.useEffect(() => {
    if (props.card.owner) {
      props.card.owner._id === currentUser._id ? setIsOwn(true) : setIsOwn(false);
    }
  }, [props.card])

  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`);

  // Check for likes on card
  React.useEffect(() => {
    if (props.card.likes) {
      props.card.likes.some(i => i === currentUser._id) ? setIsLiked(true) : setIsLiked(false);
    }
  }, [props.card])

  const cardLikeButtonClassName = (`button card__like-button ${isLiked && 'card__like-button_active'}`); 
 
  // Number of likes
  React.useEffect(() => {
    if (props.card.likes) {
      setLikesTotal(props.card.likes.length);
    }
  }, props.card)


  function handleCardClick() {
    props.onCardClick(props.card);
  } // same

  function handleLikeClick(e) {
    e.stopPropagation();
    e.preventDefault();
    props.onCardLike(props.card);
  } // same

  function handleCardDelete(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    props.onCardDelete(props.card);
  } // same

  return (
    <li className="card" data-id="#">
      <button 
        type="button" 
        className={cardDeleteButtonClassName} 
        onClick={handleCardDelete} 
        aria-label="Delete Button" 
      ></button>
      <img 
        className="card__img" 
        alt={props.card.name} 
        src={props.card.link} 
        onClick={handleCardClick} 
      />
      <div className="card__wrapper">
        <h3 className="card__name">{props.card.name}</h3>
        <div className="card__like">
          <button 
            type="button" 
            className={cardLikeButtonClassName} 
            onClick={handleLikeClick} 
            aria-label="Like Button" 
          ></button>
          <span className="card__like-count">{likesTotal}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;