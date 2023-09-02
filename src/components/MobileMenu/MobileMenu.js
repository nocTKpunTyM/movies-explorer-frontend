import './MobileMenu.css';
import {useContext} from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Link, NavLink } from 'react-router-dom';

function MobileMenu() {
  const {isMenuOpen, handleOpenMenu} = useContext(AppContext);

  return (
    <section className={`mobile-menu${isMenuOpen ? ' mobile-menu_opened' : ''}`}>
      <div className='mobile-menu__white-board'>
      <div className='mobile-menu__btn-close-box'>
            <button className='mobile-menu__btn_close' onClick={handleOpenMenu}></button>
        </div>
        <div className='mobile-menu__nav-box'>
            <ul className='mobile-menu__nav'>
              <NavLink to='/' className={({isActive}) => 
                  `mobile-menu__nav-link${isActive ? " mobile-menu__nav-link_active" : ""}`}>
                <li className='mobile-menu__nav-row' onClick={handleOpenMenu}>
                    Главная
                </li>
              </NavLink>
              <NavLink to='/movies' className={({isActive}) => 
                  `mobile-menu__nav-link${isActive ? " mobile-menu__nav-link_active" : ""}`}>
                <li className='mobile-menu__nav-row' onClick={handleOpenMenu}>
                    Фильмы
                </li>
              </NavLink>
              <NavLink to='/saved-movies' className={({isActive}) => 
                  `mobile-menu__nav-link${isActive ? " mobile-menu__nav-link_active" : ""}`}>
                <li className='mobile-menu__nav-row' onClick={handleOpenMenu}>
                    Сохраненные фильмы
                </li>
              </NavLink>
            </ul>
        </div>
        <Link to='/me'><button className='mobile-menu__btn_profile' onClick={handleOpenMenu}></button></Link>
        
      </div>
    </section>
  );
}

export default MobileMenu;