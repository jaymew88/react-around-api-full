import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm 
      name="edit" 
      title="Edit Profile" 
      submitButtonText="Save"
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit} 
    >
      <label className="popup__label">
        <input 
          className="popup__field popup__field_name" 
          name="name-input" 
          id="name-input" 
          type="text" 
          title="name"
          placeholder="Name" 
          pattern="[A-Za-z -]+" 
          minLength={2} 
          maxLength={40} 
          value={name} 
          onChange={handleNameChange} 
          required 
        />
        <span className="popup__field-error" id="name-input-error" />
      </label>
      <label className="popup__label">
        <input 
          className="popup__field popup__field_job" 
          name="job-input" 
          id="job-input" 
          type="text" 
          title="about"
          placeholder="About Me" 
          minLength={2} 
          maxLength={200} 
          value={description} 
          onChange={handleDescriptionChange} 
          required 
        />
        <span className="popup__field-error" id="job-input-error" />
      </label> 
    </PopupWithForm>
  );
}

export default EditProfilePopup;