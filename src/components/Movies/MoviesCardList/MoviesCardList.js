import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useState, useEffect, useContext } from 'react';
import { URLS } from "../../../utils/constants";
import Preloader from '../../Preloader/Preloader';
import { AppContext } from '../../../contexts/AppContext';

function MoviesCardList({movies, toChangePreference}) {
    const [cardsCount, setCardsCount] = useState(0);
    const [cards, setCards] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [thatEnough, setThatEnough] = useState(true);
    const whatPath = window.location.pathname;
    const {isLoading} = useContext(AppContext);

    useEffect(() => {
        window.addEventListener("resize", throttledСhangeScreen);
        return () => {
          window.removeEventListener("resize", throttledСhangeScreen);
        };
    }, []);

    function throttle(callee, timeout) {
        // надо ли нам пропускать текущий вызов.
        let timer = null
        // Как результат возвращаем другую функцию.
        return function perform(...args) {
            if (timer) return
            timer = setTimeout(() => {
            callee(...args)
            clearTimeout(timer)
            timer = null
            }, timeout)
        }
    }
    const throttledСhangeScreen = throttle(changeScreen, 1000)

    function changeScreen() {
        setScreenWidth(window.innerWidth); 
    }

    useEffect(() => {
        if (screenWidth > 1279) {
            setCardsCount(16);
        } else if (screenWidth > 767) {
            setCardsCount(8);
        } else {
            setCardsCount(5);
        }
    }, [screenWidth])

  useEffect(() => {
    if (cardsCount > 0) {
        setCards(movies.slice(0, cardsCount));
    }
  }, [cardsCount, movies])

  function addCards() {
    if (screenWidth > 1279) {
        setCardsCount(cardsCount + 4);
    } else if (screenWidth > 767) {
        setCardsCount(cardsCount + 2);
    } else {
        setCardsCount(cardsCount + 2);
    }
  }

  useEffect(() => {
    if (cardsCount > 0 && Object.keys(movies).length !==0) {
        if (cardsCount >= Object.keys(movies).length) {
            setThatEnough(true);
        } else {
            setThatEnough(false);
        }
    }
  }, [cardsCount, movies])

  function needButton() {
    if (whatPath === URLS.MOVIES) {
        if (!thatEnough) {
            return (
                <div className='movies__button-box'>
                    <button className='movies__button' type='button' onClick={addCards}>Ещё</button>
                </div>
            ) 
        } 
    }
  }
  
    return (
        <>
        {isLoading && <Preloader />}
        <section className='movies-cardlist'>
            <ul className='movies-cardlist__box'>
                {Object.entries(cards).length !== 0 ? cards.map((movie) => {
                    return (
                            <MoviesCard
                                key={movie.movieId}
                                movie={movie}
                                toChangePreference={toChangePreference}
                            />
                    );
                }) : ''}
                {needButton()}
            </ul>
        </section>
        </>
    );
}

export default MoviesCardList;