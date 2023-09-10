import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({movies, toChangePreference}) {
    return (
        <section className='movies-cardlist'>
            <ul className='movies-cardlist__box'>
                {Object.entries(movies).length !== 0 ? movies.map((movie) => {
                    return (
                    <MoviesCard
                        key={movie.movieId}
                        movie={movie}
                        toChangePreference={toChangePreference}
                    />
                    );
                }) : ''}
            </ul>
        </section>
    );
}

export default MoviesCardList;