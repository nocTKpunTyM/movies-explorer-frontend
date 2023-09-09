import {checkResponse} from './checkResponse';

export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getMovies = () => {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
        .then(checkResponse);
};