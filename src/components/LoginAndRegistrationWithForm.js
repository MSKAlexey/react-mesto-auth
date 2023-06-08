function LoginAndRegistrationWithForm({ titleText, buttonText, children, onSubmit }) {
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
   </div>

  </form>
 )
}
export default LoginAndRegistrationWithForm;