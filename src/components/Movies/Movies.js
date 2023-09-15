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
  const [needFeedback, setFeedback] = useState(false);

  useEffect(() => {
    if (Object.keys(savedMovies).length < 1) {
      toGetSavedMovies();
    }
  }, [])

  useEffect(() => { 
    if (Object.keys(movies).length !== 0 && Object.keys(savedMovies).length !== 0) {
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
    setMoviesForRender(movies);
  }

  useEffect(() => {
    if (Object.keys(moviesForRender).length !== 0) {
      if (movieQuery) {
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
  }, [moviesForRender, switchOn, savedMovies])

  useEffect(() => {
    if (Object.keys(moviesReadyToRender).length === 0) {
      setFeedback(true);
    } else {
      setFeedback(false);
    }
  }, [moviesReadyToRender])

  function changeQuery (query) {
    setMovieQuery(query);
    localStorage.setItem('movieQuery', query);
      if (localStorage.getItem('movies')) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
      } else {
        toGetMovies();
      }
    
  }

  function compareQuery(query, mQuery) {
    if (Object.keys(movies).length !== 0 && query !== mQuery) {
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
  console.log(needFeedback);
  return (
    <>
        <Header />
        <main className="movies">
            <SearchForm
              switchOn={switchOn}
              setswitchOn={setswitchOn}
              movieQuery={movieQuery}
              setMovieQuery={setMovieQuery}
              changeQuery={changeQuery}
              compareQuery={compareQuery} />
            <MoviesCardList
              movies={moviesReadyToRender}
              toChangePreference={saveOrDelMovie}
              needFeedback={needFeedback} />
        </main>
        <Footer />
    </>
  );
}

export default Movies;