import React from 'react';

function PopupWithForm(props) {
  const isOpenClass = props.isOpen ? "popup_opened" : "";

  return (
    <>
      <div className={`popup popup_type_${props.name} ${isOpenClass}`}>
        <div className="popup__container popup__container_form">
          <button className="button popup__button popup__button_role_close" onClick={props.onClose}/>
          <form 
            className="popup__form" 
            action="#" 
            name="profile-edit" 
            onSubmit={props.onSubmit}
            noValidate 
          >
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button className="button popup__button popup__button_role_save" type="submit">
              {props.submitButtonText}
            </button>
          </form>
        </div> 
      </div>
    </>
  );
}

export default PopupWithForm;