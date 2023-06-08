import React, { useState } from 'react';
import * as auth from '../utils/Auth';
import { Link, useNavigate } from "react-router-dom";
import LoginAndRegistrationWithForm from './LoginAndRegistrationWithForm';

export default function Login({ handleLogin }) {

 const [formValue, setFormValue] = useState({
  email: '',
  password: ''
 });

 const { email, password } = formValue;
 const [errorMessage, setErrorMessage] = useState('');
 const navigate = useNavigate();

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormValue({
   ...formValue,
   [name]: value,
  });
 }

 function handleSubmit(e) {
  e.preventDefault();
  if (!formValue.email || !formValue.password) {
   setErrorMessage('Both fields are required');
   return;
  }

  auth.authorize({ email, password })
   .then(data => {
    console.log(data)
    if (data) {
     localStorage.setItem('jwt', data.token);
     handleLogin();
     navigate('/main');
    }
   })
   .catch(err => setErrorMessage(err));
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
   {/* <span id="input-name-error" className="error">{errorMessage}</span> */}
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
   {/* <span id="input-name-error" className="error">{errorMessage}</span> */}
  </LoginAndRegistrationWithForm>
 )
}