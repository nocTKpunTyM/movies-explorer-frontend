import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({toGetMovies}) {
    return (
        <form className='search-form'>
            <div className='search-form__search-box'>
                <input className='search-form__input' placeholder='Фильм' type='text' required></input>
                <button className='search-form__button' type='submit' onClick={toGetMovies}>Найти</button>
            </div>
            <div className='search-form__switch-box'>
                <p className='search-form__switch-text'>Короткометражки</p>
                <FilterCheckbox />
            </div>
        </form>
    );
}

export default SearchForm;