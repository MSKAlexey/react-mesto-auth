import React, { useState } from 'react';
import LoginAndRegistrationWithForm from './LoginAndRegistrationWithForm';

export default function Login({ handelLoginSubmit, /* errorMessage */ }) {

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

 function handleSubmit(e) {
  e.preventDefault();
  handelLoginSubmit({ email, password });
 }

 return (
  <LoginAndRegistrationWithForm
   titleText={'Вход'}
   buttonText={'Войти'}
   onSubmit={handleSubmit}
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