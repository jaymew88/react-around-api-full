import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const [isLiked, setIsLiked] = React.useState(false); 
  const [isOwn, setIsOwn] = React.useState(false);
  const [likesTotal, setLikesTotal] = React.useState(0);
  const currentUser = React.useContext(CurrentUserContext); 

  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`);

  const cardLikeButtonClassName = (
    `button card__like-button ${isLiked ? 'card__like-button_active' : ''}`); 
   
  // Delete Button Visiblility
  React.useEffect(() => {
    if (props.card.owner) {
      props.card.owner._id === currentUser._id ? setIsOwn(true) : setIsOwn(false);
    }
  }, [props.card])

  // Check for likes on card
  React.useEffect(() => {
    if (props.card.likes) {
      props.card.likes.includes(currentUser._id) ? setIsLiked(true) : setIsLiked(false);
      console.log("Card.js", isLiked); // #1 onload all False
    }
  }, [props.card])

  // Number of likes
  React.useEffect(() => {
    if (props.card.likes) {
      setLikesTotal(props.card.likes.length);
    }
  }, [props.card]) 

   
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
            className={`${cardLikeButtonClassName}${isLiked ? 'card__like-button_active' : ''}`} 
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