import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import {useContext, useEffect, useState} from 'react';
import { AppContext } from '../../contexts/AppContext';

function Movies({toGetMovies, movies, setMovies}) {
  const {toGetSavedMovies, toSaveMovie, toDeleteMovie, savedMovies} = useContext(AppContext);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [movieQuery, setMovieQuery] = useState(localStorage.getItem('movieQuery'));
  const [moviesReadyToRender, setMoviesReadyToRender] = useState([]);

  useEffect(() => {
    console.log(`Только монтирование - получение сохраненных ${Object.keys(savedMovies).length}`);
    toGetSavedMovies();
  }, [])

  useEffect(() => { 
    if (Object.keys(movies).length !== 0 && Object.keys(savedMovies).length !== 0) {
        console.log(`movies, savedMovies - выяснение лайков. movies =  ${Object.keys(movies).length} savedMovies = ${Object.keys(savedMovies).length}`);
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
    console.log(`Функция. Сравнил два массива и присвоил лайки. movies =  ${Object.keys(movies).length} savedMovies = ${Object.keys(savedMovies).length}`);
    setMoviesForRender(movies);
  }

  useEffect(() => {
    if (Object.keys(moviesForRender).length !== 0) {
      if (movieQuery) {
  console.log('moviesForRender - фильтрация по запросу');  
        const moviesToFilter = moviesForRender.filter((movie) => {
          const filteredFilm =
            movie.nameRU.toLowerCase().includes(movieQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(movieQuery.toLowerCase());
            if (2 > 1) {
              return filteredFilm && movie.duration <= 104;
            } else {
              return filteredFilm;
            }
        });
        setMoviesReadyToRender(moviesToFilter);
      } else {
        setMoviesReadyToRender(moviesForRender);
      }
    }
  }, [moviesForRender])




  function changeQuery (query) {
    setMovieQuery(query);
    localStorage.setItem('movieQuery', query);
    console.log('Функция. Кладем query в стейт и localStorage');
  }
  useEffect(() => {
    if (movieQuery) {
      console.log(`movieQuery - запрос ${movieQuery}`);
      if (localStorage.getItem('movies')) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
        console.log(`movieQuery - есть movies в хранилище - достаем - ${Object.keys(movies).length}`);
      } else {
        toGetMovies();
        console.log(`movieQuery - movies нет в хранилище - пошли в АПИ - ${Object.keys(movies).length}`);
      }
    }
  }, [movieQuery])


  




















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
            <SearchForm movieQuery={movieQuery} changeQuery={changeQuery}/>
            <MoviesCardList movies={moviesReadyToRender} toChangePreference={saveOrDelMovie}/>
            <div className='movies__button-box'>
                <button className='movies__button' type='button'>Ещё</button>
            </div>
        </main>
        <Footer />
    </>
  );
}

export default Movies;