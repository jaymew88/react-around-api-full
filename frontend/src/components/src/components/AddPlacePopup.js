import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const name = React.useRef();
  const link = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
        name: name.current.value,
        link: link.current.value,
    });
  }

  return (
    <PopupWithForm 
      name="add-place" 
      title="New Place" 
      submitButtonText="Save"
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit} >
      <label className="popup__label">
        <input 
          className="popup__field popup__field_place_name" 
          id="place-input" 
          name="place-input" 
          type="text" 
          placeholder="Title" 
          minLength={1} 
          maxLength={30}
          ref={name}  
          required 
        />
        <span className="popup__field-error" id="place-input-error" />
      </label>
      <label className="popup__label">
        <input 
          className="popup__field popup__field_place_image" 
          name="image-input" 
          id="image-input" 
          type="url" 
          placeholder="Image Link" 
          ref={link} 
          required 
        />
        <span className="popup__field-error" id="image-input-error" />
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;