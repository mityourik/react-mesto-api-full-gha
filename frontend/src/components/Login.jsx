import React from 'react';
import AuthForm from './AuthForm';

function Login({ onLogin, isPreloading }) {

  function handleSubmit(values) {
    const { email, password } = values;
    onLogin(password, email);
  }

  return (
    <AuthForm
      title="Вход"
      onSubmit={handleSubmit}
      buttonText="Войти"
      isPreloading={isPreloading}
    />
  );
}

export default Login;