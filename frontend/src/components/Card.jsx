import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);
  
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = `button elements__like-button ${isLiked ? 'elements__like-image_enabled' : ''}`;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <li className="elements__cell">
        <a href="#" className="elements__image-preview">
          <img
            onClick={handleClick}
            className="elements__photo"
            src={card.link}
            alt={`Изображение ${card.name}`}
          />
        </a>
        {isOwn && 
        <button 
          className='button elements__trash-button' 
          type="button" 
          aria-label="Кнопка Удалить карточку" 
          onClick={handleDeleteClick} 
        />
        }
        <div className="elements__title-container">
          <h3 className="elements__title">{card.name}</h3>
          <div className="elements__like-group">
            <button 
            className={cardLikeButtonClassName} 
            type="button" 
            aria-label="Кнопка Нравится" 
            onClick={handleLikeClick}
            ></button>
            <span className="elements__like-counter">{card.likes.length}</span>
          </div>
        </div>
      </li>
    </CurrentUserContext.Provider>
  );
}

export default Card;
