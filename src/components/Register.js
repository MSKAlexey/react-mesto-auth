import React, { useState } from 'react';
import LoginAndRegistrationWithForm from './LoginAndRegistrationWithForm';
import { Link } from 'react-router-dom';

export default function Register({ handelRegisterSubmit, /* errorMessage */ }) {

 const [formValue, setFormValue] = useState({
  email: '',
  password: ''
 });

 const { email, password } = formValue;

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormValue({
   ...formValue,
   [name]: value,
  });
 }

 function handelSubmit(e) {
  e.preventDefault();
  handelRegisterSubmit({ email, password });
 }

 return (
  <LoginAndRegistrationWithForm
   titleText={'Регистрация'}
   buttonText={'Зарегистрироваться'}
   onSubmit={handelSubmit}
   logIn={<p className='login__register-text'>Уже зарегистрированы? <Link className='login__register-link' to='/sign-in'>Войти</Link></p>}
  >
   <input
    className='login__input'
    placeholder='email@mail.com'
    type='email'
    name='email'
    minLength='5'
    maxLength='15'
    required
    onChange={handleChange}
   />
   <span id="input-name-error" className="error">{/* errorMessage */}</span>
   <input
    className='login__input'
    placeholder='••••••••••'
    type='password'
    name='password'
    minLength='6'
    maxLength='15'
    required
    onChange={handleChange}
   />
   <span id="input-name-error" className="error">{/* errorMessage */}</span>
  </LoginAndRegistrationWithForm>
 )
}