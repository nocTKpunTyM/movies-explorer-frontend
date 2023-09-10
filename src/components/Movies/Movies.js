import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import {useState, useContext} from 'react';
import { getMovies } from '../../utils/MoviesApi';
import { API_URL_IMG } from '../../utils/constants';
import { AppContext } from '../../contexts/AppContext';
import * as mainApi from '../../utils/mainApi';

function Movies() {
  const {currentUser, toGetSavedMovies} = useContext(AppContext);
  const [movies, setMovies] = useState({});

  let moviesFromApi = {};
  function toGetMovies() {
    getMovies()
      .then((data) => { 
        // const savedMoviesForFilter = toGetSavedMovies();
        moviesFromApi = data.map((movie) => {
          // let isLiked = false;
          // isLiked = savedMoviesForFilter.some((item)=> item.movieId === movie.id);
          return {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: API_URL_IMG + movie.image.url,
            trailerLink: movie.trailerLink,
            thumbnail: API_URL_IMG + movie.image.formats.thumbnail.url,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            // isLiked: isLiked
          };
        })
        setMovies(moviesFromApi);
console.log(moviesFromApi);
        localStorage.setItem('movies', moviesFromApi);
      })
      .catch(console.error);
  }

  function toSaveMovie(movie) {
    const token = localStorage.getItem('token');
    mainApi.saveMovie({token, currentUser, movie})
      .catch(console.error);
  }
  
  return (
    <>
        <Header />
        <main className="movies">
            <SearchForm toGetMovies={toGetMovies}/>
            <MoviesCardList movies={movies} toChangePreference={toSaveMovie}/>
            <div className='movies__button-box'>
                <button className='movies__button' type='button'>Ещё</button>
            </div>
        </main>
        <Footer />
    </>
  );
}

export default Movies;