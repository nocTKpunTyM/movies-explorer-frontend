import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { AppContext } from '../../../contexts/AppContext';
import {useContext} from 'react';

function MoviesCardList() {
    const {movies} = useContext(AppContext);
    console.log(movies);
    return (
        <section className='movies-cardlist'>
            <ul className='movies-cardlist__box'>
                {Object.entries(movies).length !== 0 ? movies.map((movie) => {
                    return (
                    <MoviesCard
                        movie={movie}
                    />
                    );
                }) : ''}
            </ul>
        </section>
    );
}

export default MoviesCardList;