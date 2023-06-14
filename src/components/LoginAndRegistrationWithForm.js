function LoginAndRegistrationWithForm({ titleText, buttonText, onSubmit, children, logIn }) {
 return (
  <form
   className='login'
   onSubmit={onSubmit}
  >

   <div className='login__container'>

    <h1 className='login__title'>{titleText}</h1>

    {children}

    <button
     type='submit'
     name='button'
     className='login__button cursor'
    >{buttonText}</button>
    {logIn}
   </div>

  </form>
 )
}
export default LoginAndRegistrationWithForm;