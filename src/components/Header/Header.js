import './Header.css';
import headerLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import {useState, useEffect, useContext} from 'react';
import { AppContext } from '../../contexts/AppContext';

function Header() {
  const path = window.location.pathname;
  const {isLogin, displaySubmit} = useContext(AppContext);
  const [isLand, setLand] = useState(false);
  useEffect(() => {
    if (window.location.pathname === '/') {
      setLand(true);
    } else {
      setLand(false);
    }
  }, [])

  let needHeaderMenu = true;
  let logoClass = 'header__logo';
  let headerClass = 'header';

  if (path === '/sign-in' || path === '/sign-up') {
    headerClass = 'header_type_auth';
    logoClass = 'header__logo_type_auth';
    needHeaderMenu = false;
  }
  else {
    if (path === '/') {
      headerClass = 'header header_type_land';
    }
  }

  return (
    <header className={headerClass}>
      <Link to="/" className={logoClass} onClick={displaySubmit}><img src={headerLogo} alt="На главную" /></Link>
      {needHeaderMenu & isLogin ? <Navigation isLand={isLand} /> : ''}
      {needHeaderMenu && <HeaderMenu isLand={isLand} />}
    </header>
  );
}

export default Header;