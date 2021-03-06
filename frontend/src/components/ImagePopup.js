import React from 'react';

function ImagePopup(props) {
  return (
    <>
      <div className={`popup popup_type_image ${props.card ? "popup_opened" : ""}`}>
        <div className="popup__container popup__container_type_image">
          <img className="popup__img" alt="" src={props.card && props.card.link} />
          <p className="popup__img-title">{props.card && props.card.name}</p>
          <button className="button popup__close-btn" aria-label="Close Image" onClick={props.onClose} />
        </div> 
      </div> 
    </>
  );
}

export default ImagePopup;
