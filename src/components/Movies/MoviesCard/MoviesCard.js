import './MoviesCard.css';
import React, { useState, useEffect } from 'react';

function MoviesCard({movie}) {
console.log(movie);
    const [isLiked, setLiked] = useState(false);
    const [classNameForLike, setclassNameForLike] = useState('movies-card__like movies-card__like_grey');
    const changeLike = () => {
        setLiked(!isLiked);
    }
    useEffect(() => {
        if (isLiked) {
            setclassNameForLike('movies-card__like movies-card__like_red');
        }
        else {
            setclassNameForLike('movies-card__like movies-card__like_grey');
        }
    }, [isLiked])
    const delClassForLike = 'movies-card__like movies-card__like_delete';

    return (
        <>  
            <li className='movies-card'>
                <img src={`https://api.nomoreparties.co/${movie.image.url}`} alt={movie.nameRU} className='movies-card__img'></img>
                <div className='movies-card__text-box'>
                    <p className='movies-card__name'>{movie.nameRU}</p>
                    <button
                        className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                        onClick={changeLike}
                        type='button'
                    ></button>

                </div>
                <div className='movies-card__time-box'>
                    <p className='movies-card__time'>1ч42м</p>
                </div>
            </li>
        </>
    );
}

export default MoviesCard;