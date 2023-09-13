import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import { urls } from "../../../utils/constants";

function MoviesCardList({movies, toChangePreference}) {
    const [cardsCount, setCardsCount] = useState(0);
    const [cards, setCards] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [thatEnough, setThatEnough] = useState(false);
    const whatPath = window.location.pathname;

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
            console.log('Сработал resize');
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
        //console.log(`Если кол-во карточек больше 0, то отсеять из movies ${cardsCount} штук`);
        setCards(movies.slice(0, cardsCount));
    }
  }, [cardsCount, movies])

  useEffect(() => {
    if (Object.keys(cards).length > 0) {
        console.log(`Количество фильмов после всех фильтраций - ${Object.keys(movies).length}`);
        console.log(`Количество карточек для отображения - ${Object.keys(cards).length}`);
    }
  }, [cards])

  useEffect(() => {
    if (thatEnough) {
        console.log('Кнопка исчезни!');
    } else {
        console.log('Кнопка появись!');
    }
  }, [thatEnough])

  function addCards() {
    if (screenWidth > 1279) {
        setCardsCount(cardsCount + 4);
        console.log(`Теперь количество отображаемых - ${cardsCount + 4}`);
    } else if (screenWidth > 767) {
        setCardsCount(cardsCount + 2);
        console.log(`Теперь количество отображаемых - ${cardsCount + 2}`);
    } else {
        setCardsCount(cardsCount + 2);
        console.log(`Теперь количество отображаемых - ${cardsCount + 2}`);
    }
  }

  useEffect(() => {
    console.log(`СЕЙЧАС КОЛ-ВО ОТОБРАЖАЕМЫХ - ${cardsCount}`);
    if (cardsCount > 0 && Object.keys(movies).length !==0) {
        console.log(`Количество фильмов после всех фильтраций - ${Object.keys(movies).length}`);
        if (cardsCount >= Object.keys(movies).length) {
            console.log('Количество отображаемых равно или больше количеству отсеянных');
            setThatEnough(true);
        } else {
            console.log('Количество отображаемых равно МЕНЬШЕ количества отсеянных');
            setThatEnough(false);
        }
    }
  }, [cardsCount, movies])

  function needButton() {
    if (whatPath === urls.movies) {
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
    );
}

export default MoviesCardList;