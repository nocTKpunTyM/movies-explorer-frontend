// Урлы для роутинга, навигации и ссылок в проекте
const URLS = {
    'SIGNIN' : '/signin',
    'SIGNUP' : '/signup',
    'PROFILE' : '/profile',
    'MOVIES' : '/movies',
    'SAVEDMOVIES' : '/saved-movies',
};

// Урлы для запросов АПИ и обработки
const BASE_URL = 'https://back.noctkpuntym.nomoreparties.co';
const API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const API_URL_IMG = 'https://api.nomoreparties.co';

// Патерны для инпутов
const PATERN_EMAIL = '^[a-zA-Z0-9+_.\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,}$';

const ERR_API = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'

export { URLS, BASE_URL, API_URL, API_URL_IMG, PATERN_EMAIL, ERR_API };