import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList() {
    return (
        <section className='movies-cardlist'>
            <ul className='movies-cardlist__box'>
                <MoviesCard />
            </ul>
        </section>
    );
}

export default MoviesCardList;