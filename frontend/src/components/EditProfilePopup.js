import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: about
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
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
      <label className="form__label">
        <input
          className="form__input form__input_name"
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
        <span className="form__input-error" id="name-input-error" />
      </label>
      <label className="form__label">
        <input
          className="form__input form__input_job"
          name="job-input"
          id="job-input"
          type="text"
          title="about"
          placeholder="About Me"
          minLength={2}
          maxLength={200}
          value={about}
          onChange={handleAboutChange}
          required
        />
        <span className="form__input-error" id="job-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
