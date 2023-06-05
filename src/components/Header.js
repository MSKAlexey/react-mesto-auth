import { Link, useLocation, Routes, Route } from "react-router-dom";

import logoHeader from '../images/logo.svg';

export default function Header({ loggedIn, logOut, email }) {

 const location = useLocation();
 const linkText = location.pathname === "/sign-in" ? "Регистрация" : "Войти";
 const buttonText = loggedIn ? "Выйти" : linkText;

 return (
  <header className='header'>

   <img
    className='header__logo'
    src={logoHeader}
    alt='Надпись на латинице: Место и Россия'
   />

   {loggedIn && <p className="header__email">{email}</p>}
   <Routes>
    <Route
     path="/react-mesto-auth"
     element={
      <Link
       to="/sign-in"
       className="header__registet-link"
      >
       Войти
      </Link>
     }
    />
    <Route
     path="/sign-up"
     element={
      <Link
       to="/sign-in"
       className="header__registet-link"
      >
       Войти
      </Link>
     }
    />
    <Route
     path="/sign-in"
     element={
      <Link
       to="/sign-up"
       className="header__registet-link"
      >
       Регистрация
      </Link>
     }
    />
   </Routes>
   {loggedIn && (
    <button
     className="header__registet-link"
     onClick={logOut}
    >
     {buttonText}
    </button>
   )}

  </header>

 )
}