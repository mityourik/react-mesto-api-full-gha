import React from 'react';
import { useFormAndValidation } from './hooks/useFormAndValidation';

function AuthForm({ title, children, onSubmit, buttonText, isPreloading }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onSubmit(values);
    }
  }

  return (
    <div className="authorization">
        <h2 className="authorization__title">{title}</h2>
        <form className="authorization__form" onSubmit={handleSubmit} noValidate>
            <input
                id="authorization-email"
                type="email"
                name="email"
                className="authorization__input"
                placeholder="Email"
                pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
                onChange={handleChange}
                value={values.email || ""}
                required
            />
            <span className="authorization__span" id="authorization-email-error">
                {errors.email}
            </span>
            <input
                id="authorization-password"
                type="password"
                name="password"
                className="authorization__input"
                placeholder="Пароль"
                minLength="6"
                onChange={handleChange}
                value={values.password || ""}
                required
            />
            <span 
                className="authorization__span" 
                id="authorization-password-error"
            >
                {errors.password}
            </span>
            <button 
                className="authorization__submit-button" 
                type="submit"
            >
                {isPreloading ? "Загрузка..." : buttonText}
            </button>
                {children}
        </form>
    </div>
  );
}

export default AuthForm;