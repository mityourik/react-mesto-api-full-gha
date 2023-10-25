import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({ isOpen, onClose, onConfirm, isPreloading }) {
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onConfirm();
            onClose();
        }
        if (event.key === 'Escape' && isOpen) {
            onClose();
        }
    };
    
    // Добавление и удаление обработчика нажатия клавиши при открытии/закрытии попапа
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const buttonText = isPreloading ? 'поцеловал тебя Витек' : 'угу';

    return (
        <PopupWithForm
            name="confirmation"
            title="Удаляем?"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onConfirm}
            isPreloading={isPreloading}
            textButton={buttonText}
        >
        </PopupWithForm>
    );
}

export default ConfirmationPopup;