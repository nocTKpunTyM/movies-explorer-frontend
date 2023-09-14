import './MoviesCard.css';
import {useState, useEffect } from 'react';
import { URLS } from '../../../utils/constants';

function MoviesCard({movie, toChangePreference}) {
    const [classNameForLike, setclassNameForLike] = useState('movies-card__like movies-card__like_grey');

    useEffect(() => {
        if (movie.isLiked) {
            setclassNameForLike('movies-card__like movies-card__like_red');
        }
        else {
            setclassNameForLike('movies-card__like movies-card__like_grey');
        }
    })
    const delClassForLike = 'movies-card__like movies-card__like_delete';

    function handleChangePreference() {
        toChangePreference(movie);
    }

    let duration = movie.duration;
    const durH = Math.floor(duration / 60);
    const durM = duration % 60;
    duration = `${durH}ч ${durM}м`;

    return (
        <>  
            <li className='movies-card'>
                <a href={movie.trailerLink} target="_blank" rel="noreferrer" className='movies-card__img'>
                    <img src={movie.image} alt={movie.nameRU} className='movies-card__img'></img>
                </a>
                <div className='movies-card__text-box'>
                    <p className='movies-card__name'>{movie.nameRU}</p>
                    <button
                        className={window.location.pathname === URLS.SAVEDMOVIES ? delClassForLike : classNameForLike}
                        onClick={handleChangePreference}
                        type='button'
                    ></button>
                </div>
                <div className='movies-card__time-box'>
                    <p className='movies-card__time'>{duration}</p>
                </div>
            </li>
        </>
    );
}

export default MoviesCard;