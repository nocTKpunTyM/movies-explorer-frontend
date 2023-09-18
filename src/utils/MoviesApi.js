import {checkResponse} from './checkResponse';
import {API_URL} from './constants';

export const getMovies = () => {
    return fetch(API_URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse);
};