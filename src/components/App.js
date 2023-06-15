import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import api from '../utils/Api';
import * as auth from '../utils/Auth';

export default function App() {

 const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
 const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
 const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
 const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
 const [isInfoTolltip, setIsInfoTolltip] = useState(false);
 const [isImagePopupOpen, setImagePopupOpen] = useState(false);
 const [selectedCard, setselectedCard] = useState({});
 const [currentUser, setCurrentUser] = useState({});
 const [cards, setCards] = useState([]);
 const [loggedIn, setLoggedIn] = useState(false);
 const navigate = useNavigate();
 const [userData, setUserData] = useState({ email: '' });
 // const [errorMessage, setErrorMessage] = useState('');

 const handleLogin = (email) => {
  setLoggedIn(true);
  setUserData(email);
 }
 // проверка токена
 function tokenCheck() {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
   auth.getContent(jwt)
    .then(user => {
     handleLogin(user.data.email);
     navigate('/');
    })
    .catch(console.log);
  }
 }
 // проверка токена при ребуте страницы
 useEffect(() => {
  tokenCheck();
 }, [])
 // открытия попапов
 function handleEditAvatarClick() {
  setIsEditAvatarPopupOpen(true);
 }
 function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true);
 }
 function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
 }
 function handleCardClick(card) {
  setImagePopupOpen(true);
  setselectedCard(card)
 }
 // закрытие всех попапов
 function closeAllPopups() {
  setIsEditProfilePopupOpen(false);
  setIsEditAvatarPopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setImagePopupOpen(false);
  setIsRegisterPopupOpen(false);
 }
 // ставим лайк картинке, середечко становиться черного цвета
 function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  api.changeLikeCardStatus(card._id, !isLiked)
   .then((newCard) => {
    setCards((state) => state.map(c => c._id === card._id ? newCard : c));
   })
   .catch(console.log);
 }
 // удаляем карточку, возможно удалять только карточки которые сами создали
 function handleCardDelete(card) {
  // setDeleteCardPopupOpen(true);
  api.deleteCard(card._id)
   .then(() => {
    setCards((state) => state.filter(c => c._id !== card._id));
   })
   .catch(console.log);
 }
 // добавляем новую карточку, оба поля обязательны для заполнения
 function handleAddPlaceSubmit({ name, link }) {
  api.addCard({ name, link })
   .then(
    (newCard) => {
     setCards([newCard, ...cards]);
     closeAllPopups();
    })
   .catch(console.log);
 }
 // редактируем имя и профессию профиля
 function handleUpdateUser(data) {
  api.changeUserInfo({ data })
   .then(
    (data) => {
     setCurrentUser(data);
     closeAllPopups();
    })
   .catch(console.log);
 }
 // изменяем картинку аватара пользователя
 function handleUpdateAvatar(data) {
  api.changeUserAvatar(data)
   .then(
    (data) => {
     setCurrentUser(data);
     closeAllPopups();
    })
   .catch(console.log);
 }
 // субмит формы регистрации
 function handelRegisterSubmit({ email, password }) {
  auth.register({ email, password })
   .then(() => {
    setIsRegisterPopupOpen(true);
    setIsInfoTolltip(true);
    navigate('/sign-in');
   })
   .catch(err => {
    setIsInfoTolltip(false);
    // setErrorMessage(err);   При переключении страниц регистрации/логин ошибка остается старая, то есть с не удачной попытки регистрации бует отображатся на странице логина
    console.log(err);
   })
   .finally(setIsRegisterPopupOpen(true));
 }
 // субмит формы входа
 function handelLoginSubmit({ email, password }) {
  auth.authorize({ email, password })
   .then(data => {
    if (data) {
     localStorage.setItem('jwt', data.token);
     handleLogin(email);
     navigate('/main');
    }
   })
   .catch(err => {
    setIsInfoTolltip(false);
    setIsRegisterPopupOpen(true);
    // setErrorMessage(err);
    console.log(err);
   })
 }
 // хук для начальной загрузки карточек с сервера и получение имя и профессии пользователя профиля. проверка на присутствие jwt токена в локальном хранилище
 useEffect(() => {
  if (loggedIn) {
   Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([data, card]) => {
     setCurrentUser(data);
     setCards(card);
    })
    .catch(console.log);
  }
 }, [loggedIn]);
 // удаляем jwt токен из локального хранилища и выходим из профиля
 function logOut() {
  setLoggedIn(false);
  localStorage.removeItem("jwt");
  // setErrorMessage('');
 }

 return (

  <CurrentUserContext.Provider value={currentUser}>

   <div className='page'>

    <div className='page__container'>

     <Header
      loggedIn={loggedIn}
      logOut={logOut}
      userData={userData}
     />

     <Routes>

      <Route
       path='/'
       element={
        <ProtectedRoute
         loggedIn={loggedIn}
         element={Main}
         onEditAvatar={handleEditAvatarClick}
         onEditProfile={handleEditProfileClick}
         onAddPlace={handleAddPlaceClick}
         onCardClick={handleCardClick}
         onCardLike={handleCardLike}
         cards={cards}
         onCardDelete={handleCardDelete}
        />
       }
      />

      <Route
       path='/sign-in'
       element={<Login
        handelLoginSubmit={handelLoginSubmit}
       // errorMessage={errorMessage}
       />}
      />

      <Route
       path='/sign-up'
       element={
        <Register
         handelRegisterSubmit={handelRegisterSubmit}
        // errorMessage={errorMessage}
        />}
      />

      <Route
       path='*'
       element={<Navigate to='/' replace />}
      />

     </Routes>

     <Footer />

    </div>

    {/* редактирование профиля */}
    <EditProfilePopup
     isOpen={isEditProfilePopupOpen}
     onClose={closeAllPopups}
     onUpdateUser={handleUpdateUser}
    />

    {/* редактирование аватара */}
    <EditAvatarPopup
     isOpen={isEditAvatarPopupOpen}
     onClose={closeAllPopups}
     onUpdateAvatar={handleUpdateAvatar}
    />

    {/* добавление карточки */}
    <AddPlacePopup
     isOpen={isAddPlacePopupOpen}
     onClose={closeAllPopups}
     onAddCard={handleAddPlaceSubmit}
    />
    {/* удаление карточки */}
    <PopupWithForm
     name={'remove'}
     title={'Вы уверены?'}
     buttonText={'Да'}
    />
    {/* открытие картинки */}
    <ImagePopup
     onClose={closeAllPopups}
     isOpen={isImagePopupOpen}
     card={selectedCard}
    />
    <InfoTooltip
     isOpen={isRegisterPopupOpen}
     onClose={closeAllPopups}
     name={"register"}
     statusRegister={isInfoTolltip}
    />
   </div>

  </CurrentUserContext.Provider>
 );
}