import React from 'react';
import LoginAndRegistrationWithForm from './LoginAndRegistrationWithForm';

function Register() {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  return (
    <LoginAndRegistrationWithForm
      titleText={'Регистрация'}
      buttonText={'Зарегистрироваться'}
    >
      <input
        className='login__input'
        placeholder='email@mail.com'
        type='email'
        minLength='5'
        maxLength='15'
        required
      />
      <input
        className='login__input'
        placeholder='••••••••••'
        type='password'
        minLength='6'
        maxLength='15'
        required
      />
      <p className='login__register-text'>Уже зарегистрированы? <a className='login__register-link' href='/sign-in'>Войти</a></p>
    </LoginAndRegistrationWithForm>
  )
}
export default Register;