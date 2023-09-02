import ProfileButton from '../../ProfileButton/ProfileButton';
import './HeaderMenu.css';
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import { AppContext } from '../../../contexts/AppContext';

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
      <div className='header-menu__one-button'>
            < ProfileButton isLand={isLand} />
      </div>
    )
  }

  const loginMobileMenu = () => {
    return (
      <button className={`header-menu${isLand ? ' header-menu_type_dark' : ''}`} onClick={handleOpenMenu}></button>
    )
  }

  const notLoginMenu = () => {
    return (
      <div className='header-menu__buttons'>
        <Link to='/sign-up' className='header-menu__button header-menu__button_reg'>Регистрация</Link>
        <Link to='/sign-in'><button className='header-menu__button_login header-menu__button'>Войти</button></Link>
      </div>
    )
  }

  return displayMenu();
}

export default HeaderMenu;