import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img 
            className="profile__avatar-img" 
            src={currentUser.avatar} 
            alt="profile avatar" 
          />
          <button 
            onClick={props.onEditAvatar} 
            className="button profile__button_role_edit-avatar"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button 
            onClick={props.onEditProfile} 
            className="button profile__button profile__button_role_edit" 
          ></button>
          <p className="profile__job">{currentUser.about}</p>
        </div> 
        <button 
          onClick={props.onAddPlace} 
          className="button profile__button profile__button_role_add"
        ></button>
      </section>
    
      <section className="cards">
        <ul className="cards__list">
          {props.cards.map((card, index) => (
            <Card 
              key={index} 
              card={card} 
              onCardClick={props.onCardClick} 
              onCardLike={props.onCardLike} 
              onCardDelete={props.onCardDelete} 
            />
            )  
          )}
        </ul>
      </section>
  </main>
  );
}

export default Main;

