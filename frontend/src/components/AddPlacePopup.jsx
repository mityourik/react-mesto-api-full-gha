import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from './hooks/useFormAndValidation';

function AddPlacePopup({ 
  isOpen, 
  onClose, 
  onAddPlace, 
  isPreloading
  }) {
  
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onAddPlace({
        name: values.elements_input_name,
        link: values.elements_input_link,
      });
      resetForm();
    }
  }

  return (
    <PopupWithForm
        name="cell"
        title="Новое место"
        textButton={isPreloading ? 'Сохранение...' : 'Создать'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
    >
        <input
            id="name-card"
            type="text"
            name="elements_input_name"
            className="popup__input"
            placeholder="Введите название места"
            minLength="2"
            maxLength="30"
            required
            value={values.elements_input_name || ""}
            onChange={handleChange}
        />
        <span 
            id="name-card-error" 
            className="popup__error"
        >
            {errors.elements_input_name}
        </span>
        <input
            id="input-link"
            type="url"
            name="elements_input_link"
            className="popup__input popup__input_type_link"
            placeholder="Введите адрес картинки"
            required
            value={values.elements_input_link || ""}
            onChange={handleChange}
        />
        <span 
            id="input-link-error"
            className="popup__error"
        >
            {errors.elements_input_link}
        </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;