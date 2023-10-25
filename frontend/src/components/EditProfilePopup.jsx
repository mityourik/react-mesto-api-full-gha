import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useFormAndValidation } from './hooks/useFormAndValidation';

function EditProfilePopup({ isOpen, onClose, isPreloading, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    useEffect(() => {
        if (currentUser && isOpen) {
            resetForm({
                name: currentUser.name,
                about: currentUser.about
            }, {}, false);
        }
    }, [currentUser, isOpen, resetForm]);
    
    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            onUpdateUser(values);
        }
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            textButton={isPreloading ? 'Загрузка...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="name-profile"
                className="popup__input"
                type="text"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                required
                value={values.name ?? ''}
                onChange={handleChange}
            />
            <span 
                id="name-profile-error" 
                className="popup__error"
                >{errors.name}</span>
            <input
                id="description-profile"
                className="popup__input"
                type="text"
                name="about"
                placeholder="О себе"
                minLength="2"
                maxLength="40"
                required
                onChange={handleChange}
                value={values.about ?? ''}
            />
            <span 
                id="description-profile-error" 
                className="popup__error"
            >{errors.about}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;