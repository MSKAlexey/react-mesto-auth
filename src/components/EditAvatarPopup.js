import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatar = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar(avatar.current.value);
  }

  React.useEffect(() => {
    if (!isOpen) {
      avatar.current.value = '';
    }
  }, [isOpen])

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      buttonText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id='input-link-type-avatar'
        className='popup__input popup__input_type_link'
        type='url'
        name='link'
        placeholder='Ссылка на картинку'
        required
        ref={avatar}
      />
      <span id='input-link-type-avatar-error' className='error'></span>
    </PopupWithForm>
  )
}
export default EditAvatarPopup;
