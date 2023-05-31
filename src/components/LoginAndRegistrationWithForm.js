function LoginAndRegistrationWithForm({ titleText, buttonText, typeEmail, typePassword, textInputEmail, children }) {
  return (
    <form
      className='login'
    >
      <div className='login__container'>

        <h1 className='login__title'>{titleText}</h1>
        <input
          className='login__input'
          placeholder={textInputEmail}
          type={typeEmail}
          minLength="5"
          maxLength="15"
          required
        />
        <input
          className='login__input'
          placeholder='••••••••••'
          type={typePassword}
          minLength="6"
          maxLength="15"
          required
        />

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