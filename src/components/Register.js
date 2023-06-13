import { Link } from "react-router-dom";
import LoginAndRegistrationWithForm from './LoginAndRegistrationWithForm';

export default function Register({ handelSubmit, handleChange, errorMessage }) {

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