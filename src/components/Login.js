import LoginAndRegistrationWithForm from './LoginAndRegistrationWithForm';

export default function Login() {

  return (
    <LoginAndRegistrationWithForm
      titleText={'Вход'}
      buttonText={'Войти'}
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
    </LoginAndRegistrationWithForm>
  )
}