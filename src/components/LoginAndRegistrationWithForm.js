function LoginAndRegistrationWithForm({ titleText, buttonText, onSubmit, children, errorMessage }) {
 return (
  <form
   className='login'
   onSubmit={onSubmit}
  >

   <div className='login__container'>

    <h1 className='login__title'>{titleText}</h1>

    {children}
    <p id="input-name-error" className="error">{errorMessage}</p>

    <button
     type='submit'
     name='button'
     className='login__button cursor'
    >{buttonText}</button>
   </div>

  </form>
 )
}
export default LoginAndRegistrationWithForm;