import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { URLS } from '../../utils/constants';

function Navigation({isLand}) {
  
  return (
    <nav className='navigation'>
        <ul className='navigation__ul'>
          
            <li className='navigation__line'>
              <NavLink 
                to={URLS.MOVIES}
                className={({isActive}) => 
                  `navigation__link${isActive ? " navigation__link_active" : ""}${isLand ? ' navigation__link_land' : ''}`}>
                Фильмы
              </NavLink>
            </li>

            <li className='navigation__line'>
              <NavLink
                to={URLS.SAVEDMOVIES}
                className={({isActive}) => 
                  `navigation__link${isActive ? " navigation__link_active" : ""}${isLand ? ' navigation__link_land' : ''}`}>
                Сохраненные фильмы
              </NavLink>
            </li>

        </ul>
    </nav>
  );
}

export default Navigation;