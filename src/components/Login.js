// import React from 'react';
import LoginAndRegistrationWithForm from './LoginAndRegistrationWithForm';


function Login() {

  return (
    <LoginAndRegistrationWithForm
      titleText={'Вход'}
      buttonText={'Войти'}
    typeEmail={'email'}
    typePassword={'password'}
    textInputEmail={'email@mail.com'}
    />
  )
}

export default Login;