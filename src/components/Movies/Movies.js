import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import {useContext, useEffect, useState} from 'react';
import { AppContext } from '../../contexts/AppContext';

function Movies({toGetMovies, movies, toTakeLike}) {
  const {toGetSavedMovies, toSaveMovie, toDeleteMovie, savedMovies} = useContext(AppContext);
  const [moviesForRender, setMoviesForRender] = useState({});

useEffect(() => {
  toGetSavedMovies();
}, [])

  useEffect(() => { 
    if (Object.keys(movies).length !== 0) {
      toGetLikes(movies);
    }
  }, [movies])

  function toGetLikes (movies) {
    for (let x = 0; x < movies.length; x++) {
      const film = movies[x];
      if (toTakeLike(film)) {
        film.isLiked = true;
      }
    }
    setMoviesForRender(movies);
    localStorage.setItem('movies', movies);
  }

  function safeOrDelMovie (movie) {
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
            <SearchForm toGetMovies={toGetMovies}/>
            <MoviesCardList movies={moviesForRender} toChangePreference={safeOrDelMovie}/>
            <div className='movies__button-box'>
                <button className='movies__button' type='button'>Ещё</button>
            </div>
        </main>
        <Footer />
    </>
  );
}

export default Movies;