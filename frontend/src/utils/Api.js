export class Api {
  constructor(config) {// конструктор принимает объект конфигурации API
    this._url = config.url;
    this._headers = config.headers;
  }

  async _handleResponse(res) {// Метод обработки ответа сервера
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка ${res.status}`);
  }

  async _fetchData(url, options) {
    try {
      const response = await fetch(url, options);
      if (response.ok && response.status !== 204) { // проверка, что не пустой прежде чем преобразовать в json
        return response.json();
      } else if (response.ok && response.status === 204) {
        return {}; // просто возвращаем пустой объект
      } else {
        throw new Error(`Ошибка ${response.status}`);
      }
    } catch (error) {
      throw new Error('Ошибка сети');
    }
  }

  get _userUrl() {//геттер для формирования URL для получения и изменения информации о пользователе
    return `${this._url}/users/me`;
  }

  async getUserInfoApi() {// метод для получения информации о пользователе
    return this._fetchData(this._userUrl, {
      credentials: "include",
      headers: this._headers,
    });
  }

  async setUserInfoApi(data) {// метод для обновления информации о пользователе
    return this._fetchData(this._userUrl, {
      method: 'PATCH',
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  get _cardsUrl() {//геттер для формирования URL для работы с карточками
    return `${this._url}/cards`;
  }

  async getInitialCards() {//метод для получения карточек с сервера
    return this._fetchData(this._cardsUrl, {
      credentials: "include",
      headers: this._headers
    });
  }

  async putNewCard(data) {//метод для добавления новой карточки
    return this._fetchData(this._cardsUrl, {
      method: 'POST',
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  _getCardUrl(cardId) { //геттер для формирования URL для работы с отдельной карточкой
    return `${this._url}/cards/${cardId}`;
  }

  async deleteCard(cardId) {//метод для удаления карточки
    return this._fetchData(this._getCardUrl(cardId), {
      method: 'DELETE',
      credentials: "include",
      headers: this._headers
    });
  }

  async pushCardLike(cardId) {//метод для добавления лайка
    return this._fetchData(`${this._getCardUrl(cardId)}/likes`, {
      method: 'PUT',
      credentials: "include",
      headers: this._headers
    });
  }

  async removeCardLike(cardId) {//метод для удаления лайка
    return this._fetchData(`${this._getCardUrl(cardId)}/likes`, {
      method: 'DELETE',
      credentials: "include",
      headers: this._headers
    });
  }

  async patchUserAvatar(data) {//метод для обновления аватара пользователя
    return this._fetchData(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
  }
}

//класс для апи
export const api = new Api({
  // url: 'http://localhost:3000/',
  url: "https://api.mityourik.nomoredomainsrocks.ru",
  headers: {
    'Content-Type': 'application/json',
  }
});
