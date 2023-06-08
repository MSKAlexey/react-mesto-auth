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
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import api from '../utils/Api';
import * as auth from '../utils/Auth';

function App() {

 const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
 const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
 const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
 // const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
 const [isImagePopupOpen, setImagePopupOpen] = useState(false);
 const [selectedCard, setselectedCard] = useState({});
 const [currentUser, setCurrentUser] = useState({});
 const [cards, setCards] = useState([]);
 const [loggedIn, setLoggedIn] = useState(false);
 // const [errorMessage, setErrorMessage] = useState('');
 const navigate = useNavigate();
 const [userData, setUserData] = useState({ email: '' });

 function handleLogin({ email }) {
  setLoggedIn(true);
  setUserData({ email });
 }
 function tokenCheck() {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
   auth.getContent(jwt)
    .then(user => {
     // setIsLoading(false);
     handleLogin(user);
     navigate('/main');
    })
    .catch(console.log);
  } else {
   // setIsLoading(true);
  }
 }

 useEffect(() => {
  tokenCheck();
 }, [])

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

 function closeAllPopups() {
  setIsEditProfilePopupOpen(false);
  setIsEditAvatarPopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setImagePopupOpen(false);
 }

 function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  api.changeLikeCardStatus(card._id, !isLiked)
   .then((newCard) => {
    setCards((state) => state.map(c => c._id === card._id ? newCard : c));
   })
   .catch(console.error);
 }

 function handleCardDelete(card) {
  // setDeleteCardPopupOpen(true);
  api.deleteCard(card._id)
   .then(() => {
    setCards((state) => state.filter(c => c._id !== card._id));
   })
   .catch(console.error);
 }

 function handleAddPlaceSubmit({ name, link }) {
  api.addCard({ name, link })
   .then(
    (newCard) => {
     setCards([newCard, ...cards]);
     closeAllPopups();
    })
   .catch(console.error);
 }

 function handleUpdateUser(data) {
  api.changeUserInfo({ data })
   .then(
    (data) => {
     setCurrentUser(data);
     closeAllPopups();
    })
   .catch(console.error);
 }

 function handleUpdateAvatar(data) {
  api.changeUserAvatar(data)
   .then(
    (data) => {
     setCurrentUser(data);
     closeAllPopups();
    })
   .catch(console.error);
 }

 React.useEffect(() => {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
   .then(([data, card]) => {
    setCurrentUser(data);
    setCards(card);
   })
   .catch(console.error);
 }, []);

 function logOut() {
  setLoggedIn(false);
  localStorage.removeItem("jwt");
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
       path='main'
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
       path='sign-in'
       element={<Login
        handleLogin={handleLogin}
       />}
      />

      <Route
       path='sign-up'
       element={<Register />}
      />

      <Route
       path='*'
       element={<Navigate to='main' replace />}
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
   </div>

  </CurrentUserContext.Provider>
 );
}
export default App;