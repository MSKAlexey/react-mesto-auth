import React from 'react';

function Login() {

  return (
    <form
      className='login'
    >
      <div className='login__container'>

        <h1 className='login__title'>Вход</h1>
        <input
          className='login__input'
          placeholder='email@mail.com'
        />
        <input
          className='login__input'
          placeholder='••••••••••'
        />

        <button
          type='submit'
          name='button'
          className='login__button cursor'>Войти</button>

      </div>

    </form>
  )
}

export default Login;