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
          return loginMenu();
      } else {
      return notLoginMenu();
    }
  }

  const loginMenu = () => {
    return (
      <>
        <div className='menu-desktop'>
            < ProfileButton isLand={isLand} />
        </div>
        <button
          className={`menu-burger ${isLand ? 'menu-burger_white' : 'menu-burger_black'}`}
          onClick={handleOpenMenu}
          type='button'>
        </button>
      </>
    )
  }

  const notLoginMenu = () => {
    return (
      <div className='menu-two-buttons'>
        <Link to={urls.signup} className='menu-two-buttons__button-reg'>Регистрация</Link>
        <Link to={urls.signin} className='menu-two-buttons__button-login'>Войти</Link>
      </div>
    )
  }

  return displayMenu();
}

export default HeaderMenu;