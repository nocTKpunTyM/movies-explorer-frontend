import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';


function Movies() {
  return (
    <>
        <Header />
        <main className="movies">
            <SearchForm />
            <MoviesCardList />
            <div className='movies__button-box'>
                <button className='movies__button'>Ещё</button>
            </div>
        </main>
        <Footer />
    </>
  );
}

export default Movies;