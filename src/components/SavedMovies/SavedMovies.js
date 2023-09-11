import './SavedMovies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import { useEffect, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

function SavedMovies() {
  const {savedMovies, toGetSavedMovies, toDeleteMovie} = useContext(AppContext);

  useEffect(() => {
    toGetSavedMovies();
  }, [])

  function handelDeleteMovie (movies) {
    toDeleteMovie(movies);
  }

  return (
    <>
        <Header />
        <main className="saved-movies">
            <SearchForm />
            <MoviesCardList movies={savedMovies} toChangePreference={handelDeleteMovie}/>
        </main>
        <Footer />
    </>
  );
}

export default SavedMovies;