import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Popup = ({ isOpen, name, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)

}, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  const handleContainerClick = (e) => {
    e.stopPropagation();  // блокирование всплытия обработчика до оверлея
  }

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_content_${name}`}
      onClick={handleOverlay}
    >
        <div className={`popup__container popup__container_content_${name}`} onClick={handleContainerClick}>
            <button
                className='button popup__close-button'
                type='button'
                aria-label="Кнопка Закрыть окно"
                onClick={onClose}
            />
                {children}
        </div>
    </div>
  );
};

export default Popup;
