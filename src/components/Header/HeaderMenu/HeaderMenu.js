import ProfileButton from '../../ProfileButton/ProfileButton';
import './HeaderMenu.css';
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import { AppContext } from '../../../contexts/AppContext';

import { urls } from '../../../utils/constants';

function HeaderMenu({isLand}) {
  const {handleOpenMenu, isLogin} = useContext(AppContext);

  const displayMenu = () => {
    if(isLogin) {
      if (window.innerWidth > 1279) {
          return loginDescMenu();
      } else {
          return loginMobileMenu();
      }
    }
    if (isLand) {
      return notLoginMenu();
    }
    return '';
  }

  const loginDescMenu = () => {
    return (
      <div className='header-menu header-menu_profile'>
            < ProfileButton isLand={isLand} />
      </div>
    )
  }

  const loginMobileMenu = () => {
    return (
      <div className='header-menu'>
        <button
          className={`header-menu__button${isLand ? ' header-menu__button_white' : ' header-menu__button_black'}`}
          onClick={handleOpenMenu}
          type='button'>
        </button>
      </div>
      
    )
  }

  const notLoginMenu = () => {
    return (
      <div className='header-menu header-menu_two-buttons'>
        <Link to={urls.signup} className='header-menu__button-reg'>Регистрация</Link>
        <Link to={urls.signin} className='header-menu__button-login'>Войти</Link>
      </div>
    )
  }

  return displayMenu();
}

export default HeaderMenu;