import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onRegister, isPreloading }) {
  
  function handleSubmit(values) {
    const { email, password } = values;
    onRegister(password, email);
  }

  return (
    <AuthForm
      title="Регистрация"
      onSubmit={handleSubmit}
      buttonText="Зарегистрироваться"
      isPreloading={isPreloading}
    >
      <Link className="authorization__link" to="/signin">
        Уже зарегистрированы? Войти
      </Link>
    </AuthForm>
  );
}

export default Register;