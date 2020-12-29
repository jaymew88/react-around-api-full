// Validation settings
export const validationSettings = {
  formSelector: ".popup__form", 
  inputSelector: ".popup__field", 
  submitButtonSelector: ".popup__button_role_save",
  inactiveButtonClass: "popup__button_role_inactive",
  inputErrorClass: "popup__field_type_error", 
  errorClass: "popup__field-error_active" 
};

// Forms Array
export const forms = Array.from(document.querySelectorAll(validationSettings.formSelector));

// Buttons
export const editUserButton = document.querySelector('.profile__button_role_edit');
export const addCardButton = document.querySelector('.profile__button_role_add');
export const editAvatarButton = document.querySelector('.profile__button_role_edit-avatar');
