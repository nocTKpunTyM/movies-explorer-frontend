import './SavedMovies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';


function SavedMovies() {
  return (
    <>
        <Header />
        <main className="saved-movies">
            <SearchForm />
            <MoviesCardList />
        </main>
        <Footer />
    </>
  );
}

export default SavedMovies;