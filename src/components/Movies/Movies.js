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
    //console.log('Welcome to movies!');
    if (Object.keys(savedMovies).length < 1) {
      toGetSavedMovies();
    }
  }, [])

  useEffect(() => { 
    if (Object.keys(movies).length !== 0 && Object.keys(savedMovies).length !== 0) {
        //console.log(`Выяснение лайков. movies =  ${Object.keys(movies).length} savedMovies = ${Object.keys(savedMovies).length}`);
        toGetLikes();
    } else {
      setMoviesForRender(movies);
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
    //console.log(`Сравнил два массива и присвоил лайки. movies =  ${Object.keys(movies).length} savedMovies = ${Object.keys(savedMovies).length}`);
    setMoviesForRender(movies);
  }

  useEffect(() => {
    //console.log(`После присваения лайков moviesForRender - ${Object.keys(moviesForRender).length}`);
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
        //console.log(`Есть запрос ${movieQuery}, присвоил к рендеру отфильтрованные фильмы` );
      } else {
        setMoviesReadyToRender(moviesForRender);
        //console.log("Запроса нет, присвоил к рендеру нефильтрованные фильмы" );
      }
      //console.log(moviesReadyToRender);
    }
  }, [moviesForRender, switchOn, savedMovies])

  function changeQuery (query) {
    setMovieQuery(query);
    localStorage.setItem('movieQuery', query);
    //console.log('Функция. Кладем query в стейт и localStorage');
    
      //console.log(`movieQuery - запрос ${movieQuery}`);
      if (localStorage.getItem('movies')) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
        //console.log(`в хранилище есть movies - достаем - ${Object.keys(movies).length}`);
      } else {
        toGetMovies();
        //console.log(`movies нет в хранилище - пошли в АПИ - ${Object.keys(movies).length}`);
      }
    
  }

  function compareQuery(query, mQuery) {
    //console.log(query);
    //console.log(mQuery);
    if (Object.keys(movies).length !== 0 && query !== mQuery) {
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