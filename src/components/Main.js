import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, cards, onCardDelete }) {

 const currentUser = useContext(CurrentUserContext);

 return (
  <main className='main'>
   <section className='profile'>
    <div className='profile__pencil'>
     <img
      className='profile__image cursor'
      src={currentUser.avatar} alt='Аватар пользователя'
      onClick={onEditAvatar}
     />
    </div>
    <div className='profile__content'>
     <div className='profile__name-buttom'>
      <h1 className='profile__title'>{currentUser.name}</h1>
      <button
       type='button'
       className='profile__popup-open opacity cursor'
       onClick={onEditProfile}
      ></button>
     </div>
     <p className='profile__subtitle'>{currentUser.about}</p>
    </div>
    <button
     type='button'
     className='profile__vector opacity cursor'
     onClick={onAddPlace}
    ></button>
   </section>
   <section className='places'>
    <ul className='cards'>
     {cards.map((item) => (
      <Card
       key={item._id}
       card={item}
       onCardClick={onCardClick}
       onCardLike={onCardLike}
       onCardDelete={onCardDelete}
      />
     ))}
    </ul>
   </section>
  </main>
 )
}
export default Main;