import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

// состояния для информации о пользователе и карточках
function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__config">
          <img
            src={currentUser ? currentUser.avatar : ''} // Проверка на существование currentUser
            alt={currentUser ? currentUser.name : ''} // Проверка на существование currentUser
            className="profile__image"
            onClick={onEditAvatar}
          />
        </div>
        <h1 className="profile__title">{currentUser ? currentUser.name : ''}</h1>
        <p className="profile__paragraph">{currentUser ? currentUser.about : ''}</p>
        <button
          className="button profile__edit-button profile__popup-open"
          type="button"
          aria-label="Кнопка Редактировать профиль"
          onClick={onEditProfile}
        ></button>
        <button
          className="button profile__add-icon"
          type="button"
          aria-label="Кнопка Добавить профиль"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__cards">
          {cards.map(card => (
            <Card 
              key={card._id} 
              card={card} 
              onCardClick={onCardClick} 
              onCardLike={onCardLike} 
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
