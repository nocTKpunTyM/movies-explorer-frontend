import './SavedMovies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { maxDuration, isSaveFilter } from '../../utils/options';

function SavedMovies() {
  const {savedMovies, toGetSavedMovies, toDeleteMovie} = useContext(AppContext);
  const [savedSwitchOn, setSavedSwitchOn] = useState(localStorage.getItem('savedSwitchOn') === 'true' || false);
  const [savedMovieQuery, setSavedMovieQuery] = useState(localStorage.getItem('savedMovieQuery') || '');
  const [savedMoviesToRender, setSavedMoviesToRender] = useState([]);
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    if (Object.keys(savedMovies).length === 0) {
      toGetSavedMovies();
    }
  }, [])

  useEffect(() => {
    const moviesToFilter = savedMovies.filter((movie) => {
      if (savedMovieQuery) {
        const filteredFilm =
        movie.nameRU.toLowerCase().includes(savedMovieQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(savedMovieQuery.toLowerCase());
        if (savedSwitchOn) {
          return filteredFilm && movie.duration <= maxDuration;
        } else {
          return filteredFilm;
        }
      } else {
        if (savedSwitchOn) {
          return savedMovies && movie.duration <= maxDuration;
        } else {
          return savedMovies;
        }
      }
    });
      setSavedMoviesToRender(moviesToFilter);
  }, [savedMovies, savedMovieQuery, savedSwitchOn])

  useEffect(() => {
    if (Object.keys(savedMoviesToRender).length === 0) {
      setSavedFeedback(true);
    } else {
      setSavedFeedback(false);
    }
  }, [savedMoviesToRender])

  function savedChangeQuery (query) {
    setSavedMovieQuery(query);
    isSaveFilter && localStorage.setItem('savedMovieQuery', query);
  }

  function compareSavedQuery(query, mQuery) {
    if (query !== mQuery) {
      savedChangeQuery(query); 
    }
  }


  function handelDeleteMovie (movies) {
    toDeleteMovie(movies);
  }

  return (
    <>
      <Header />
      <main className="saved-movies">
          <SearchForm
            savedSwitchOn={savedSwitchOn}
            setSavedSwitchOn={setSavedSwitchOn}
            savedChangeQuery={savedChangeQuery}
            savedMovieQuery={savedMovieQuery}
            compareQuery={compareSavedQuery} />
          <MoviesCardList
            movies={savedMoviesToRender}
            toChangePreference={handelDeleteMovie}
            needFeedback={savedFeedback} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;