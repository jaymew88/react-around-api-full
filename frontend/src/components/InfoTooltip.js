import React from "react";

function InfoToolTip(props) {
  const statusMessage = props.success
    ? "Success! You have now been registered."
    : "Opps, something went wrong! Please try again.";
  const statusIcon = `${
    props.success 
      ? "popup__status-icon_type_success"
      : "popup__status-icon_type_error"
   
  }`;

  return (
    <section className={`popup popup_type_register ${props.isOpen ? "popup_opened": ""}`}>
      <div className="popup__container">
        <button className="button popup__close-btn" onClick={props.onClose}>
        </button>
        <div className={`popup__status-icon ${statusIcon}`}></div>
        <h2 className="popup__title popup__title_type_auth">{statusMessage}</h2>
      </div>
    </section>
  )
}

export default InfoToolTip;