import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onSignup({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  }

  return (
    <section className="login">
      <div className="login__container">
        <h2 className="form__title">Sign Up</h2>
        <form 
          className="form form_auth"
          action="#"
          name="Sign Up"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="form__label" htmlFor="reg-email-input">
            <input 
              className="form__input form__input_type_email form__input_theme_dark" 
              id="reg-email-input"
              type="email"
              name="email"
              title="Email"
              ref={emailRef}
              placeholder="Email"
              required            
            />
            <span 
              className=""
              id="email-error-input"
            >
            </span>
          </label>
          <label className="form__label" htmlFor="reg-password-input">
            <input 
              className="form__input form__input_type_password form__input_theme_dark"
              id="reg-password-input"
              type="passowrd"
              name="password"
              title="Password"
              ref={passwordRef}
              placeholder="Password"
              required 
            />
            <span 
              className="form__input-error"
              id="password-error-input"
            >
            </span>
          </label>
          <button 
            className="button form__submit-btn form__submit-btn_light"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <Link to="/signin" className="login__link">
          Already a member? Log in here!
        </Link>
      </div>
    </section>
  );
}

export default Register;