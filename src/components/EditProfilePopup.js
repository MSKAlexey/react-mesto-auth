import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name={'edit'}
      title={'Редактировать профиль'}
      buttonText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id='input-name'
        className='popup__input popup__input_type_name'
        placeholder='Введите имя'
        type='text'
        name='title'
        minLength='2'
        maxLength='40'
        required
        value={name || ''}
        onChange={e => setName(e.target.value)}
      /><span id='input-name-error' className='error'></span>
      <input
        id='input-about'
        className='popup__input popup__input_type_about'
        placeholder='Введите род деятельности'
        name='about'
        type='text'
        minLength='2'
        maxLength='200'
        required
        value={description || ''}
        onChange={e => setDescription(e.target.value)}
      /><span id='input-about-error' className='error'></span>
    </PopupWithForm>
  )
}
export default EditProfilePopup;