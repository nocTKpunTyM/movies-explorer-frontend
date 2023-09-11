import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import {useContext, useEffect, useState} from 'react';

function SearchForm({movieQuery, changeQuery}) {

    function toMakeQuery () {
        changeQuery('cIty');
        console.log('city');
    }


    return (
        <form className='search-form'>
            <div className='search-form__search-box'>
                <input className='search-form__input' placeholder='Фильм' type='text' required></input>
                <button className='search-form__button' type='submit' onClick={toMakeQuery}>Найти</button>
            </div>
            <div className='search-form__switch-box'>
                <p className='search-form__switch-text'>Короткометражки</p>
                <FilterCheckbox />
            </div>
        </form>
    );
}

export default SearchForm;