import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import {useState, useContext} from 'react';
import { isSaveCheckBox } from '../../../utils/options';
import { URLS } from "../../../utils/constants";
import { AppContext } from '../../../contexts/AppContext';

function SearchForm({
    switchOn,
    setswitchOn,
    movieQuery,
    changeQuery,
    compareQuery,
    savedSwitchOn,
    setSavedSwitchOn,
    savedChangeQuery,
    savedMovieQuery}) {

    const [moviePath, ] = useState(window.location.pathname);
    const [query, setQuery] = useState(movieQuery || '');
    const [isEmpty, setEmpty] = useState(false);
    const {isLoading} = useContext(AppContext);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query === '') {
            setEmpty(true);
            setTimeout(() => {
                setEmpty(false);
            }, 1500);
        }
        else {
            if (moviePath === URLS.SAVEDMOVIES) {
                savedChangeQuery(query);
            } else {
                changeQuery(query);
            }
        }
    };

    const handleSwitch = (switchNow) => {
        if (moviePath === URLS.MOVIES) {
            setswitchOn(switchNow);
            localStorage.setItem('switchOn', switchNow);
            compareQuery(query, movieQuery);
        } else {
            setSavedSwitchOn(switchNow);
            isSaveCheckBox && localStorage.setItem('savedSwitchOn', switchNow);
            compareQuery(query, savedMovieQuery);
        }
    }

    return (
        <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form__search-box'>
                <div className='search-form__inputs-box'>
                    <input
                        className='search-form__input'
                        placeholder='Фильм'
                        type='text' value={query}
                        onChange={handleInputChange}
                    >
                    </input>
                    <span className={`search-form__error ${isEmpty ? ' search-form__error_visible' : ''}`}>Нужно ввести ключевое слово</span>
                </div>
                    <button className='search-form__button' type='submit' disabled={isLoading}>Найти</button>
            </div>
            <div className='search-form__switch-box'>
                <p className='search-form__switch-text'>Короткометражки</p>
                <FilterCheckbox switchBox={moviePath === URLS.MOVIES ? switchOn : savedSwitchOn} handleSwitch={handleSwitch}/>
            </div>
        </form>
    );
}

export default SearchForm;