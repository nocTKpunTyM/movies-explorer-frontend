import './Navigation.css';
import { NavLink } from 'react-router-dom';

function Navigation({isLand}) {
  
  return (
    <div className='navigation'>
        <ul className='navigation__ul'>
          
            <li className='navigation__line'>
              <NavLink 
                to='/movies'
                className={({isActive}) => 
                  `navigation__link${isActive ? " navigation__link_active" : ""}${isLand ? ' navigation__link_land' : ''}`}>
                Фильмы
              </NavLink>
            </li>

            <li className='navigation__line'>
              <NavLink
                to='/saved-movies'
                className={({isActive}) => 
                                        `navigation__link
                                        ${isActive && "navigation__link_active"}
                                        ${isLand && 'navigation__link_land'}`}
              >
                Сохраненные фильмы
              </NavLink>
            </li>

        </ul>
    </div>
  );
}

export default Navigation;