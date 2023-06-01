function LoginAndRegistrationWithForm({ titleText, buttonText, children }) {
  return (
    <form className='login'>
      <div className='login__container'>

        <h1 className='login__title'>{titleText}</h1>

        <button
          type='submit'
          name='button'
          className='login__button cursor'
        >{buttonText}</button>
        {children}
      </div>

    </form>
  )
}
export default LoginAndRegistrationWithForm;