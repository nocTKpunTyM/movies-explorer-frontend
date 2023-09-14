import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import {useState} from 'react';
import { isSaveCheckBox } from '../../../utils/options';
import { URLS } from "../../../utils/constants";

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

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (moviePath === URLS.SAVEDMOVIES) {
            savedChangeQuery(query);
        } else {
            changeQuery(query);
        } 
    };

    const handleSwitch = (switchNow) => {
        if (moviePath === URLS.MOVIES) {
            //console.log(`В SearchForm пришел switchNow - ${switchNow}`);
            setswitchOn(switchNow);
            localStorage.setItem('switchOn', switchNow);
            //console.log(`В локальном хранилище switchOn - ${localStorage.getItem('switchOn')}`);
            //console.log(`В SearchForm сейчас query - ${query} количество символов - ${Object.keys(query).length}`);
            //console.log(`В SearchForm сейчас movieQuery - ${movieQuery}`);
            compareQuery(query, movieQuery);
        } else {
            //console.log(`В SearchForm пришел savedSwitchOn - ${switchNow}`);
            setSavedSwitchOn(switchNow);
            isSaveCheckBox && localStorage.setItem('savedSwitchOn', switchNow);
            compareQuery(query, savedMovieQuery);
        }
    }

    return (
        <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form__search-box'>
                <input className='search-form__input' placeholder='Фильм' type='text' value={query} onChange={handleInputChange} required></input>
                <button className='search-form__button' type='submit'>Найти</button>
            </div>
            <div className='search-form__switch-box'>
                <p className='search-form__switch-text'>Короткометражки</p>
                <FilterCheckbox switchBox={moviePath === URLS.MOVIES ? switchOn : savedSwitchOn} handleSwitch={handleSwitch}/>
            </div>
        </form>
    );
}

export default SearchForm;