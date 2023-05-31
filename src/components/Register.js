import LoginAndRegistrationWithForm from './LoginAndRegistrationWithForm';

function Register() {

  return (
    <LoginAndRegistrationWithForm
      titleText={'Регистрация'}
      buttonText={'Зарегистрироваться'}
      typeEmail={'email'}
      typePassword={'password'}
      textInputEmail={'email@mail.com'}
    >
      <p className='login__register-text'>Уже зарегистрированы? <a className='login__register-link' href='/sign-in'>Войти</a></p>
    </LoginAndRegistrationWithForm>
  )
}
export default Register;