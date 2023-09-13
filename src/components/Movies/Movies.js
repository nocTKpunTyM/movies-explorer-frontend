import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import {useContext, useEffect, useState} from 'react';
import { AppContext } from '../../contexts/AppContext';
import { maxDuration } from '../../utils/options';

function Movies({toGetMovies, movies, setMovies}) {
  const {toGetSavedMovies, toSaveMovie, toDeleteMovie, savedMovies} = useContext(AppContext);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [movieQuery, setMovieQuery] = useState(localStorage.getItem('movieQuery') || '');
  const [moviesReadyToRender, setMoviesReadyToRender] = useState([]);
  const [switchOn, setswitchOn] = useState(localStorage.getItem('switchOn') === 'true' || false);

  useEffect(() => {
    if (Object.keys(savedMovies).length === 0) {
      toGetSavedMovies();
    }
  }, [])

  useEffect(() => { 
    if (Object.keys(movies).length !== 0 && Object.keys(savedMovies).length !== 0) {
        //console.log(`movies, savedMovies - выяснение лайков. movies =  ${Object.keys(movies).length} savedMovies = ${Object.keys(savedMovies).length}`);
        toGetLikes();
    }
  }, [movies, savedMovies])

  function toGetLikes () {
    for (let x = 0; x < movies.length; x++) {
      const film = movies[x];
      if (Object.keys(savedMovies).length !== 0) {
        if (savedMovies.some((item)=> item.movieId === film.movieId)) {
          film.isLiked = true;
        }
      }
    }
    //console.log(`Функция. Сравнил два массива и присвоил лайки. movies =  ${Object.keys(movies).length} savedMovies = ${Object.keys(savedMovies).length}`);
    setMoviesForRender(movies);
  }

  useEffect(() => {
    if (Object.keys(moviesForRender).length !== 0) {
      if (movieQuery) {
  //console.log('moviesForRender - фильтрация по запросу');  
        const moviesToFilter = moviesForRender.filter((movie) => {
          const filteredFilm =
            movie.nameRU.toLowerCase().includes(movieQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(movieQuery.toLowerCase());
            if (switchOn) {
              return filteredFilm && movie.duration <= maxDuration;
            } else {
              return filteredFilm;
            }
        });
        setMoviesReadyToRender(moviesToFilter);
      } else {
        setMoviesReadyToRender(moviesForRender);
      }
    }
  }, [moviesForRender, switchOn])

  function changeQuery (query) {
    setMovieQuery(query);
    localStorage.setItem('movieQuery', query);
    //console.log('Функция. Кладем query в стейт и localStorage');
    if (movieQuery) {
      //console.log(`movieQuery - запрос ${movieQuery}`);
      if (localStorage.getItem('movies')) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
        //console.log(`movieQuery - в хранилище есть movies - достаем - ${Object.keys(movies).length}`);
      } else {
        toGetMovies();
        //console.log(`movieQuery - movies нет в хранилище - пошли в АПИ - ${Object.keys(movies).length}`);
      }
    }
  }

  function compareQuery(query, mQuery) {
    if (Object.keys(mQuery).length > 0 && query !== mQuery) {
      //console.log('Ползунок заменил запрос');
      changeQuery(query); 
    }
  }

  function saveOrDelMovie (movie) {
    if (movie.isLiked) {
      const myMovieForDel = savedMovies.find((item)=> item.movieId === movie.movieId);
      toDeleteMovie(myMovieForDel);
      const movieForDislike = moviesForRender.find((item)=> item.movieId === movie.movieId);
      movieForDislike.isLiked = false;
    } else {
      toSaveMovie(movie);
      const movieForLike = moviesForRender.find((item)=> item.movieId === movie.movieId);
      movieForLike.isLiked = true;
    }
  }
  
  return (
    <>
        <Header />
        <main className="movies">
            <SearchForm switchOn={switchOn}
                        setswitchOn={setswitchOn}
                        movieQuery={movieQuery}
                        setMovieQuery={setMovieQuery}
                        changeQuery={changeQuery}
                        compareQuery={compareQuery} />
            <MoviesCardList movies={moviesReadyToRender} toChangePreference={saveOrDelMovie}/>
        </main>
        <Footer />
    </>
  );
}

export default Movies;