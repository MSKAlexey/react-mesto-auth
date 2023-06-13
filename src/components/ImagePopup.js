function ImagePopup({ onClose, isOpen, card }) {
 return (
  <div className={isOpen ? `popup popup_img  popup_opened` : `popup popup_img`}>
   <div className='popup__content'>
    <button
     type='button'
     className='popup__close cursor'
     onClick={onClose}
    ></button>
    <img
     src={card.link}
     alt={card.name}
     className='popup__image'
    />
    <h2 className='popup__name'>{card.name}</h2>
   </div>
  </div>
 )
}
export default ImagePopup;