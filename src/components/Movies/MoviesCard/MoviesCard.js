import './MoviesCard.css';
import React, { useState, useEffect } from 'react';
import cardImg1 from '../../../images/movies/1.png';
import cardImg2 from '../../../images/movies/2.png';
import cardImg3 from '../../../images/movies/3.png';
import cardImg4 from '../../../images/movies/4.png';
import cardImg5 from '../../../images/movies/5.png';
import cardImg6 from '../../../images/movies/6.png';
import cardImg7 from '../../../images/movies/7.png';
import cardImg8 from '../../../images/movies/8.png';
import cardImg9 from '../../../images/movies/9.png';
import cardImg10 from '../../../images/movies/10.png';
import cardImg11 from '../../../images/movies/11.png';
import cardImg12 from '../../../images/movies/12.png';
import cardImg13 from '../../../images/movies/13.png';
import cardImg14 from '../../../images/movies/14.png';
import cardImg15 from '../../../images/movies/15.png';
import cardImg16 from '../../../images/movies/16.png';

// КУЧА КАРТИНОК  +  СУПЕР ФУНКЦИЯ ДЛЯ ПРОВЕРКИ ВЕРСТКИ

function MoviesCard() {
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
   
    const superMegaFuncForTest0 = () => {
        if (window.location.pathname === '/movies') {
            return (
                <>
                    <div className='movies-card'>
                        <img src={cardImg3} alt='В погоне за Бенкси' className='movies-card__img'></img>
                        <div className='movies-card__text-box'>
                            <p className='movies-card__name'>В погоне за Бенкси</p>
                            <button
                                className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                onClick={changeLike}
                            ></button>
                        </div>
                        <div className='movies-card__time-box'>
                            <p className='movies-card__time'>1ч 42м</p>
                        </div>
                    </div>
                    <div className='movies-card'>
                        <img src={cardImg4} alt='Баския: Взрыв реальности' className='movies-card__img'></img>
                        <div className='movies-card__text-box'>
                            <p className='movies-card__name'>Баския: Взрыв реальности</p>
                            <button
                                className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                onClick={changeLike}
                            ></button>
                        </div>
                        <div className='movies-card__time-box'>
                            <p className='movies-card__time'>1ч 42м</p>
                        </div>
                    </div>
                    <div className='movies-card'>
                        <img src={cardImg5} alt='Бег это свобода' className='movies-card__img'></img>
                        <div className='movies-card__text-box'>
                            <p className='movies-card__name'>Бег это свобода</p>
                            <button
                                className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                onClick={changeLike}
                            ></button>
                        </div>
                        <div className='movies-card__time-box'>
                            <p className='movies-card__time'>1ч 42м</p>
                        </div>
                    </div>
                </>
            )
        }
    }

    const superMegaFuncForTest = () => {
        if (window.innerWidth > 767) {
            if (window.location.pathname === '/movies') {
                return (
                    <>
                        <div className='movies-card'>
                            <img src={cardImg6} alt='Книготорговцы' className='movies-card__img'></img>
                            <div className='movies-card__text-box'>
                                <p className='movies-card__name'>Книготорговцы</p>
                                <button
                                    className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                    onClick={changeLike}
                                ></button>
                            </div>
                            <div className='movies-card__time-box'>
                                <p className='movies-card__time'>1ч 42м</p>
                            </div>
                        </div>
                        <div className='movies-card'>
                            <img src={cardImg7} alt='Когда я думаю о Германии ночью' className='movies-card__img'></img>
                            <div className='movies-card__text-box'>
                                <p className='movies-card__name'>Когда я думаю о Германии ночью</p>
                                <button
                                    className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                    onClick={changeLike}
                                ></button>
                            </div>
                            <div className='movies-card__time-box'>
                                <p className='movies-card__time'>1ч 42м</p>
                            </div>
                        </div>
                        <div className='movies-card'>
                            <img src={cardImg8} alt='Gimme Danger: История Игги и The Stooges' className='movies-card__img'></img>
                            <div className='movies-card__text-box'>
                                <p className='movies-card__name'>Gimme Danger: История Игги и The Stooges</p>
                                <button
                                    className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                    onClick={changeLike}
                                ></button>
                            </div>
                            <div className='movies-card__time-box'>
                                <p className='movies-card__time'>1ч 42м</p>
                            </div>
                        </div>
                    </>
                    
                )
            }
            return (
                <div className='movies-card'>
                    <img src={cardImg3} alt='В погоне за Бенкси' className='movies-card__img'></img>
                    <div className='movies-card__text-box'>
                        <p className='movies-card__name'>В погоне за Бенкси</p>
                        <button
                            className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                            onClick={changeLike}
                        ></button>
                    </div>
                    <div className='movies-card__time-box'>
                        <p className='movies-card__time'>1ч 42м</p>
                    </div>
                </div>
            )    
        } else {
            return '';
        }
    }

    const superMegaFuncForTest2 = () => {
        if (window.innerWidth > 1279) {
            if (window.location.pathname === '/movies') {
                return (
                    <>
                        <div className='movies-card'>
                            <img src={cardImg9} alt='Дженис: Маленькая девочка грустит' className='movies-card__img'></img>
                            <div className='movies-card__text-box'>
                                <p className='movies-card__name'>Дженис: Маленькая девочка грустит</p>
                                <button
                                    className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                    onClick={changeLike}
                                ></button>
                            </div>
                            <div className='movies-card__time-box'>
                                <p className='movies-card__time'>1ч 42м</p>
                            </div>
                        </div>
                        <div className='movies-card'>
                            <img src={cardImg10} alt='Соберись перед прыжком' className='movies-card__img'></img>
                            <div className='movies-card__text-box'>
                                <p className='movies-card__name'>Соберись перед прыжком</p>
                                <button
                                    className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                    onClick={changeLike}
                                ></button>
                            </div>
                            <div className='movies-card__time-box'>
                                <p className='movies-card__time'>1ч 42м</p>
                            </div>
                        </div>
                        <div className='movies-card'>
                            <img src={cardImg11} alt='Пи Джей Харви: A dog called money' className='movies-card__img'></img>
                            <div className='movies-card__text-box'>
                                <p className='movies-card__name'>Пи Джей Харви: A dog called money</p>
                                <button
                                    className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                    onClick={changeLike}
                                ></button>
                            </div>
                            <div className='movies-card__time-box'>
                                <p className='movies-card__time'>1ч 42м</p>
                            </div>
                        </div>
                        <div className='movies-card'>
                            <img src={cardImg12} alt='По волнам: Искусство звука в кино' className='movies-card__img'></img>
                            <div className='movies-card__text-box'>
                                <p className='movies-card__name'>По волнам: Искусство звука в кино</p>
                                <button
                                    className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                    onClick={changeLike}
                                ></button>
                            </div>
                            <div className='movies-card__time-box'>
                                <p className='movies-card__time'>1ч 42м</p>
                            </div>
                        </div>
                        <div className='movies-card'>
                            <img src={cardImg13} alt='Рудбой' className='movies-card__img'></img>
                            <div className='movies-card__text-box'>
                                <p className='movies-card__name'>Рудбой</p>
                                <button
                                    className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                    onClick={changeLike}
                                ></button>
                            </div>
                            <div className='movies-card__time-box'>
                                <p className='movies-card__time'>1ч 42м</p>
                            </div>
                        </div>
                        <div className='movies-card'>
                            <img src={cardImg14} alt='Скейт — кухня' className='movies-card__img'></img>
                            <div className='movies-card__text-box'>
                                <p className='movies-card__name'>Скейт — кухня</p>
                                <button
                                    className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                    onClick={changeLike}
                                ></button>
                            </div>
                            <div className='movies-card__time-box'>
                                <p className='movies-card__time'>1ч 42м</p>
                            </div>
                        </div>
                        <div className='movies-card'>
                            <img src={cardImg15} alt='Война искусств' className='movies-card__img'></img>
                            <div className='movies-card__text-box'>
                                <p className='movies-card__name'>Война искусств</p>
                                <button
                                    className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                    onClick={changeLike}
                                ></button>
                            </div>
                            <div className='movies-card__time-box'>
                                <p className='movies-card__time'>1ч 42м</p>
                            </div>
                        </div>
                        <div className='movies-card'>
                            <img src={cardImg16} alt='Зона' className='movies-card__img'></img>
                            <div className='movies-card__text-box'>
                                <p className='movies-card__name'>Зона</p>
                                <button
                                    className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                                    onClick={changeLike}
                                ></button>
                            </div>
                            <div className='movies-card__time-box'>
                                <p className='movies-card__time'>1ч 42м</p>
                            </div>
                        </div>
                    </>   
                )
            }
            
        } else {
            return '';
        }
    }



    return (
        <>  
            <div className='movies-card'>
                <img src={cardImg1} alt='33 слова о дизайне' className='movies-card__img'></img>
                <div className='movies-card__text-box'>
                    <p className='movies-card__name'>33 слова о дизайне</p>
                    <button
                        className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                        onClick={changeLike}
                    ></button>

                </div>
                <div className='movies-card__time-box'>
                    <p className='movies-card__time'>1ч42м</p>
                </div>
            </div>
            <div className='movies-card'>
                <img src={cardImg2} alt='Киноальманах «100 лет дизайна»' className='movies-card__img'></img>
                <div className='movies-card__text-box'>
                    <p className='movies-card__name'>Киноальманах «100 лет дизайна»</p>
                    <button
                        className={window.location.pathname === '/saved-movies' ? delClassForLike : classNameForLike}
                        onClick={changeLike}
                    ></button>
                </div>
                <div className='movies-card__time-box'>
                    <p className='movies-card__time'>1ч 42м</p>
                </div>
            </div>
            {superMegaFuncForTest0()}
            {superMegaFuncForTest()}
            {superMegaFuncForTest2()}
        </>
    );
}

export default MoviesCard;