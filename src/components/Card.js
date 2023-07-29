import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  // debugger
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);
  // debugger
  const cardLikeButtonClassName = (
    `cards__icon cursor ${isLiked && 'cards__icon_active'}`
  );

  return (
    <li className='cards__item'>
      {isOwn && <button
        className='cards__trash cursor'
        onClick={handleDeleteClick}
      />}
      <img
        src={card.link}
        alt={card.name}
        className='cards__image'
        onClick={handleClick}
      />
      <div className='cards__title-icon'>
        <h2 className='cards__title'>{card.name}</h2>
        <div className='cards_like-count'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div
            className='cards__count'
          >{card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}
export default Card;