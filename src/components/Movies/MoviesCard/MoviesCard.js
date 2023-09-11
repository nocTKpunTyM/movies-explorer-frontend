import './MoviesCard.css';
import {useState, useEffect } from 'react';

function MoviesCard({movie, toChangePreference}) {
    const [isLiked, setLiked] = useState(movie.isLiked);
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

    function handleChangePreference() {
        changeLike();
        toChangePreference(movie);
    }

    let duration = movie.duration;
    const durH = Math.floor(duration / 60);
    const durM = duration % 60;
    duration = `${durH}ч ${durM}м`;


    return (
        <>  
            <li className='movies-card'>
                <img src={movie.image} alt={movie.nameRU} className='movies-card__img'></img>
                <div className='movies-card__text-box'>
                    <p className='movies-card__name'>{movie.nameRU}</p>
                    <button
                        className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
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