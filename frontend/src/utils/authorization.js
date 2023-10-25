export const BASE_URL = "https://auth.nomoreparties.co";

async function checkResponse(res) {// проверка ответа от сервера на ошибки
  if (res.ok) {
    return res.json();
  }
  const errorMessage = await res.text();//текст ошибки из ответа
  throw new Error(`Ошибка: ${res.status} - ${errorMessage}`);
}

export const register = async (password, email) => {//функция для регистрации
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  });
  return checkResponse(response); 
};

export const authorize = async (password, email) => {//функция для авторизации
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  });
  return checkResponse(response);
};

export const getContent = async (token) => {//функция для получения контента пользователя
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`// заголовок с токеном авторизации
    }
  });
  return checkResponse(response);
};