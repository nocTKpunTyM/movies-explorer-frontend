import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { urls } from '../../utils/constants';

import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import MobileMenu from '../MobileMenu/MobileMenu';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const isLogin = true; // МОЖНО ПОМЕНЯТЬ НА false ТОГДА НА ГЛАВНОЙ ПОМЕНЯЕТСЯ ШАПКА

  const [isMenuOpen, setMenuOpen] = useState(false);
  function handleOpenMenu () {
    setMenuOpen(!isMenuOpen);
  }
  
  

  return (
    <div className="page">
      <AppContext.Provider value={{ isMenuOpen, handleOpenMenu, isLogin }}>
          <MobileMenu />      
          <Routes>
            <Route path="/" element={ <Main /> } />
            <Route path={urls.signup} element={ <Register /> } />
            <Route path={urls.signin} element={ <Login /> } />
            <Route path={urls.profile} element={ <Profile /> } />
            <Route path={urls.movies} element={ <Movies /> } />
            <Route path={urls.savedMovies} element={ <SavedMovies /> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
      </AppContext.Provider>
    </div>
  )
}

export default App;