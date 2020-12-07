import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup(props) {

    function handleSubmit(evt) {
      evt.preventDefault();
      props.onConfirmation(props.confirmSelectedCard);
    }
    
    return (
        <PopupWithForm 
            name="delete" 
            title="Are you sure?"
            submitButtonText="Yes"
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit} 
            >
        {props.card}
        </PopupWithForm>
    );
}

export default ConfirmationPopup;