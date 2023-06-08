import React, { useState } from 'react';
import * as auth from '../utils/Auth';
import { Link, useNavigate } from "react-router-dom";
import LoginAndRegistrationWithForm from './LoginAndRegistrationWithForm';

export default function Register() {

 const [formValue, setFormValue] = useState({
  email: '',
  password: ''
 });

 const { password, email } = formValue;
 const [errorMessage, setErrorMessage] = useState('');
 const navigate = useNavigate();

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormValue({
   ...formValue,
   [name]: value,
  });
 }


 function handelSubmit(e) {
  e.preventDefault();
  auth.register({ email, password })
   .then(() => {
    navigate('/sign-in');
   })
   .catch(err => setErrorMessage(err));
 }

 return (
  <LoginAndRegistrationWithForm
   titleText={'Регистрация'}
   buttonText={'Зарегистрироваться'}
   onSubmit={handelSubmit}
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
   <span id="input-name-error" className="error">{errorMessage}</span>
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
   <span id="input-name-error" className="error">{errorMessage}</span>
   <p className='login__register-text'>Уже зарегистрированы? <Link className='login__register-link' href='/sign-in'>Войти</Link></p>
  </LoginAndRegistrationWithForm>
 )
}