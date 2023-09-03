import './MobileMenu.css';
import {useContext} from 'react';
import { AppContext } from '../../contexts/AppContext';
import { NavLink } from 'react-router-dom';
import { urls } from '../../utils/constants';
import ProfileButton from '../ProfileButton/ProfileButton';

function MobileMenu() {
  const {isMenuOpen, handleOpenMenu} = useContext(AppContext);

  return (
    <section className={`mobile-menu${isMenuOpen ? ' mobile-menu_opened' : ''}`}>
      <div className='mobile-menu__white-board'>
      <div className='mobile-menu__btn-close-box'>
            <button className='mobile-menu__btn-close' onClick={handleOpenMenu}></button>
        </div>
        <div className='mobile-menu__nav-box'>
            <ul className='mobile-menu__nav'>
              <NavLink to='/' className={({isActive}) => 
                  `mobile-menu__nav-link${isActive ? " mobile-menu__nav-link_active" : ""}`}>
                <li className='mobile-menu__nav-row' onClick={handleOpenMenu}>
                    Главная
                </li>
              </NavLink>
              <NavLink to={urls.movies} className={({isActive}) => 
                  `mobile-menu__nav-link${isActive ? " mobile-menu__nav-link_active" : ""}`}>
                <li className='mobile-menu__nav-row' onClick={handleOpenMenu}>
                    Фильмы
                </li>
              </NavLink>
              <NavLink to={urls.savedMovies} className={({isActive}) => 
                  `mobile-menu__nav-link${isActive ? " mobile-menu__nav-link_active" : ""}`}>
                <li className='mobile-menu__nav-row' onClick={handleOpenMenu}>
                    Сохраненные фильмы
                </li>
              </NavLink>
            </ul>
        </div>
        <div className='mobile-menu__btn-profile-box'>
          <ProfileButton handleOpenMenu={handleOpenMenu}/>
        </div>
      </div>
    </section>
  );
}

export default MobileMenu;