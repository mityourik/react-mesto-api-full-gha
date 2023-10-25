import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useFormAndValidation } from './hooks/useFormAndValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isPreloading }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    useEffect(() => {
      if (isOpen && currentUser) {
          resetForm({ input_avatar_link: '' });
      }
    }, [isOpen, currentUser]);

    function handleSubmit(e) {
      e.preventDefault();
      if (isValid) {
        onUpdateAvatar({ avatar: values.input_avatar_link });
      }
    }

    return (
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          textButton={isPreloading ? "Загрузка..." : "Сохранить"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            id="input-avatar"
            type="url"
            name="input_avatar_link"
            className="popup__input"
            placeholder="Введите ссылку на аватар"
            required
            value={values.input_avatar_link || ''}
            onChange={handleChange}
          />
          <span id="input-avatar-error" className="popup__error">
            {errors.input_avatar_link}
          </span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
