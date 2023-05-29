function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
      <div className='popup__container'>
        <button
          type='button'
          className='popup__close cursor'
          onClick={onClose}
        ></button>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          <h2 className='popup__title'>{title}</h2>
          {children}
          <button
            type='submit'
            name='button'
            className='popup__button cursor'
          >{buttonText}</button>
        </form>
      </div>
    </div>
  )
}
export default PopupWithForm;