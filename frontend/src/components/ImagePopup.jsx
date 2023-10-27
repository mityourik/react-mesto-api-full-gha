import React from 'react';
import Popup from './Popup';

function ImagePopup({ card, onClose, isOpen }) {

  return (
    <Popup isOpen={isOpen} name='preview' onClose={onClose}>
        <img
          alt={`Фото путешествия ${card?.name}`}//применение опциональной цепочки
          className="popup__image-preview"
          src={card?.link}
        />
        <h2 className="popup__preview-name">{card?.name}</h2>
    </Popup>
  );
}

export default ImagePopup;