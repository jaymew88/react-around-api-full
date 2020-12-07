import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`);

  // Check if the card was liked by the current user
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`button card__like-button ${isLiked ? 'card__like-button_active' : ''}`); 
  const likesTotal = props.card.likes.length;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick(e) {
    e.stopPropagation();
    e.preventDefault();
    props.onCardLike(props.card);
  }

  function handleCardDelete(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    props.onCardDelete(props.card);
  } 

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