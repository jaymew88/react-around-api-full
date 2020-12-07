import React from 'react';

function PopupWithForm(props) {
  const isOpenClass = props.isOpen ? "popup_opened" : "";

  return (
    <>
      <div className={`popup popup_type_${props.name} ${isOpenClass}`}>
        <div className="popup__container popup__container_form">
          <button className="button popup__close-btn" onClick={props.onClose}/>
          <form 
            className="form" 
            action="#" 
            name="profile-edit" 
            onSubmit={props.onSubmit}
            noValidate 
          >
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button className="button form__submit-btn" type="submit">
              {props.submitButtonText}
            </button>
          </form>
        </div> 
      </div>
    </>
  );
}

export default PopupWithForm;