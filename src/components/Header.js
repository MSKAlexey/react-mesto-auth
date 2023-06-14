import { Link, useLocation, Routes, Route } from 'react-router-dom';

import logoHeader from '../images/logo.svg';

export default function Header({ loggedIn, logOut, userData }) {
 const email = userData;
 const location = useLocation();
 const linkText = location.pathname === '/sign-in' ? 'Регистрация' : 'Войти';
 const logOutText = loggedIn ? 'Выйти' : linkText;

 return (
  <header className='header'>

   <Link
    href='/'
   >
    <img
     className='header__logo'
     src={logoHeader}
     alt='Надпись на латинице: Место и Россия'
    />
   </Link>

   <Routes>

    <Route
     path='/sign-up'
     element={
      <Link
       className='header__registet-link cursor'
       to='/sign-in'
      >
       Войти
      </Link>
     }
    />
    <Route
     path='/sign-in'
     element={
      <Link
       className='header__registet-link cursor'
       to='/sign-up'
      >
       Регистрация
      </Link>
     }
    />

   </Routes>

   {loggedIn && (
    <div  className="header__logOut">
     <p className='header__user-email'>{email}</p>
     <Link
      className='header__registet-link cursor'
      onClick={logOut}
     >
      {logOutText}
     </Link>
    </div>
   )}

  </header>
 )
}