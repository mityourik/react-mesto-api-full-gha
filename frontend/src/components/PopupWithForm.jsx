import React from 'react';
import Popup from './Popup';

function PopupWithForm({ name, title, textButton, isOpen, children, onClose, onSubmit }) {

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__profile-form popup__profile-form_content_${name}`}
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="button popup__save-button" type="submit">
            {textButton || 'Сохранить'}
          </button>
        </form>
    </Popup>
  );
};

export default PopupWithForm;