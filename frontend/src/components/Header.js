import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo" />
      <nav className="header__info">
        <p className="header__email">{props.loggedIn ? props.email : ""}</p>
        <Link 
          to={props.link.to}
          className="header__link"
          onClick={props.onLogout ? props.onLogout : null}
        > 
          {props.link.description} 
        </Link>
      </nav>
    </header>
  );
}

export default Header;

