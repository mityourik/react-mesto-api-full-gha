import React, { useRef, useState, useEffect } from 'react';
import headerLogo from '../images/header__logo.svg';
import headerNavbarIcon from '../images/header__navbar-icon.svg';
import headerNavbarCloseIcon from '../images/popup__close-button.svg';
import { useLocation, Link } from "react-router-dom";
import DropdownMenu from './DropdownMenu';

function Header({ email, signOut, loggedIn }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);//состояние выпадающего меню
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const path = (location.pathname === '/sign-in') ? '/sign-up' : 'sign-in';
  const linkName = (location.pathname === '/sign-in') ? 'Регистрация' : 'Войти';

  return (
    <header className="header">
      {isMenuOpen && loggedIn && (
        <DropdownMenu email={email} signOut={signOut} ref={dropdownRef}/>
      )}
      <div className='header__logo-container'>
        <img src={headerLogo} alt="Лого Место" className="header__logo" />
        {!loggedIn && (<Link
            className="header__auth-link_loggedout"
            to={path}
          >
            {linkName}
          </Link>)}
        {loggedIn && (
          <button className="header__navbar-button" onClick={toggleMenu}>
            <img className="header__menu-icon" 
            src={isMenuOpen ? headerNavbarCloseIcon : headerNavbarIcon} 
            alt="Иконка открыть или закрыть" />
          </button>
        )}
      </div>
      {loggedIn && (
        <div className="header__logout-container">
          <p className="header__email">{email}</p>
          <Link
            className="header__auth-link"
            to="/sign-in"
            onClick={signOut}
          >
            Выйти
          </Link>
        </div>)
      }
    </header>
  );
}

export default Header;