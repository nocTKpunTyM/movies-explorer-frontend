import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList() {
    return (
        <section className='movies-cardlist'>
            <div className='movies-cardlist__box'>
                <MoviesCard />
            </div>
        </section>
    );
}

export default MoviesCardList;