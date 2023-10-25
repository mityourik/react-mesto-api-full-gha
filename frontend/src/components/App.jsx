  import React, { useState, useEffect } from 'react';
  import Header from './Header';
  import EditProfilePopup from './EditProfilePopup';
  import EditAvatarPopup from './EditAvatarPopup';
  import Footer from './Footer';
  import Main from './Main';
  import ImagePopup from './ImagePopup';
  import { api } from '../utils/Api';
  import CurrentUserContext from '../contexts/CurrentUserContext';
  import AddPlacePopup from './AddPlacePopup';
  import ConfirmationPopup from './ConfirmationPopup';
  import Login from './Login';
  import Register from './Register';
  import InfoTooltip from './InfoTooltip';
  import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
  import ProtectedRoute from "./ProtectedRoute";

  import * as auth from '../utils/authorization';

  function App() {//cостояния для управления открытием/закрытием попапов и выбранной карточкой
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = useState([]);
    const [isPreloading, setIsPreloading] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);
    const [email, setEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [tooltipTitle, setTooltipTitle] = useState('');
    const [tooltipIcon, setTooltipIcon] = useState('');

    const navigate = useNavigate();

    const popupsToClose = {
      isEditProfilePopupOpen,
      isAddPlacePopupOpen,
      isEditAvatarPopupOpen,
      isImagePopupOpen,
      isConfirmationPopupOpen,
      isInfoTooltipPopupOpen
    }

    useEffect(() => {
      const handleEscClose = (e) => {
        if (e.key === 'Escape' && popupsToClose) {
          closeAllPopups();
        }
      };
    
      if (popupsToClose) {
        document.addEventListener('keydown', handleEscClose);
      }
    
      return () => {//удалить обработчик при размонтировании компонента или изменении состояния
        document.removeEventListener('keydown', handleEscClose);
      };
    }, [popupsToClose]);  

    useEffect(() => {
      if (loggedIn) {
        Promise.all([api.getUserInfoApi(), api.getInitialCards()])
          .then(([user, card]) => {
            setCurrentUser(user);
            setCards(card);
          })
          .catch((err) => alert(err))
      }
    }, [loggedIn]);

    const handleEditProfileClick = () => {
      setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
      setIsAddPlacePopupOpen(true);
    };

    const handleEditAvatarClick = () => {
      setIsEditAvatarPopupOpen(true);
    };

    const closeAllPopups = () => {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsImagePopupOpen(false);
      setSelectedCard(null);
      setIsConfirmationPopupOpen(false);
      setIsInfoTooltipPopupOpen(false);
    };

    const handleCardClick = (card) => {
      setSelectedCard(card);
      setIsImagePopupOpen(true); 
    };

    const handleCardLike = (card) => {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      const likeRequest = isLiked ? api.removeCardLike(card._id) : api.pushCardLike(card._id);

      likeRequest.then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
    };

    function handleUpdateUser(value) {
      setIsPreloading(true)
      api
        .setUserInfoApi(value)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => alert(err))
        .finally(() => setIsPreloading(false))
    }

    function handleUpdateAvatar(value) {
      setIsPreloading(true)
      api.patchUserAvatar(value)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => alert(err))
        .finally(() => setIsPreloading(false))
    }

    function handleAddPlaceSubmit(card) {
      setIsPreloading(true);
      api.putNewCard(card)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch((err) => alert(err))
        .finally(() => setIsPreloading(false))
    }

    function handleConfirmDelete() {
      if (cardToDelete) {
        setIsPreloading(true);
          api.deleteCard(cardToDelete._id)
              .then(() => {
                  setCards(state => state.filter((c) => c._id !== cardToDelete._id));
                  handleCloseConfirmation();
                  setCardToDelete(null);
              })
              .catch((err) => alert(err))
              .finally(() => setIsPreloading(false))
      }
    }

    function handleCardDelete(card) {
      setCardToDelete(card);
      handleOpenConfirmation();
    }

    function handleOpenConfirmation() {
      setIsConfirmationPopupOpen(true);
    }

    function handleCloseConfirmation() {
      setIsConfirmationPopupOpen(false);
    }

    function onRegister() {// Обработка успешной регистрации
      setTooltipTitle("Вы успешно зарегистрировались!");
      setTooltipIcon("success");//установить картинку ок
      setIsInfoTooltipPopupOpen(true);
    }

    function onError() {
      setTooltipTitle("Что-то пошло не так! Попробуйте еще раз.");
      setTooltipIcon("error");
      setIsInfoTooltipPopupOpen(true);
    }

    function checkToken() {// проверка токена пользователя
      const jwt = localStorage.getItem('jwt');//получить токен из локального хранилища
      if (jwt) {//если наличие токена тру
        auth.getContent(jwt)//вызываем ф-ю получения инф-ии
          .then((res) => {
            setLoggedIn(true);
            setEmail(res.data.email);//получаем значение email
            navigate("/");
          })
          .catch(err => console.log(err));
      }
    }

    useEffect(() => {
      checkToken();
    }, []);

    function handleLogin(password, email) {
      setIsPreloading(true);
      auth.authorize(password, email)
        .then(res => {
          localStorage.setItem('jwt', res.token);
          checkToken(); //получить email после успешной авторизации
        })
        .then(() => {//второй блок then чтобы залогинить после получения почты
          setLoggedIn(true);
          navigate("/");
        })
        .catch(err => {
          onError();
          console.log(err);
        })
        .finally(() => setIsPreloading(false));
    }

    function handleRegister(password, email) {
      setIsPreloading(true);
      auth.register(password, email)
        .then(() => {
          navigate("/sign-in");
          onRegister();
        })
        .catch(err => {
          onError();
          console.log(err);
        })
        .finally(() => setIsPreloading(false));
    }

    function signOut() {
      localStorage.removeItem("jwt");
      setLoggedIn(false);
    }

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header 
          email={email} 
          signOut={signOut} 
          loggedIn={loggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute
                element={Main}
                cards={cards}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />}
            />
            <Route 
              path="/sign-in" 
              element={
                <Login
                  isPreloading={isPreloading}
                  onLogin={handleLogin} 
                  setEmail={setEmail} />}
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  isPreloading={isPreloading}
                  onRegister={handleRegister} />}
            />
            <Route
              path="*"
              element={
                <Navigate
                  to={loggedIn ? "/" : "/sign-in"} />}
            />
          </Routes>

          {loggedIn && <Footer />}

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
            isPreloading={isPreloading}
          />

          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isPreloading={isPreloading}
          />

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
            isPreloading={isPreloading}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <ConfirmationPopup 
            isOpen={isConfirmationPopupOpen} 
            onClose={handleCloseConfirmation} 
            onConfirm={handleConfirmDelete}
            isPreloading={isPreloading}
          />

          <InfoTooltip
            title={tooltipTitle}
            tooltipIcon={tooltipIcon}
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
          />

        </div>
      </CurrentUserContext.Provider>
    );
  }

  export default App;