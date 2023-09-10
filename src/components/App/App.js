import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { urls } from '../../utils/constants';
import * as mainApi from '../../utils/mainApi';

import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import MobileMenu from '../MobileMenu/MobileMenu';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { getSavedMovies, deleteMovie } from '../../utils/mainApi';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setLogin] = useState(false);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    setCurrentUser('');
    setLogin(false);
  }
  const tokenCheck = () => {     
    if (token) {  
      mainApi.getContent(token)
        .then((user) => {       
          setCurrentUser(user);
          setLogin(true);
        })
        .catch(console.error)
    }
    else {
      setLogin(false);
    }
  }
  
  useEffect(() => {
    tokenCheck();
  }, [])


  function toAuthRegister({ name, email, password }) {
    mainApi.register({ name, email, password })
      .then(() => {
        navigate('/signin', { replace: true });
      })
      .catch(console.error);
  }

  function toAuthLogin({ email, password }) {
    mainApi.authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLogin(true);
          tokenCheck();
          navigate('/movies');
        }
      })
      .catch(console.error);
  }

  const [isMenuOpen, setMenuOpen] = useState(false);
  function handleOpenMenu () {
    setMenuOpen(!isMenuOpen);
  }
  
// ДАЛЕЕ ЗАПРОСЫ ДЛЯ РАБОТЫ С КАРТОЧКАМИ ФИЛЬМОВ

const [savedMovies, setSavedMovies] = useState({});
function toGetSavedMovies() {
  getSavedMovies(token)
    .then((data) => { 
      setSavedMovies(data);
    })
    .catch(console.error);
}

function toDeleteMovie(movie) {
  deleteMovie(token, movie)
    .then(() => { 
      setSavedMovies(savedMovies.filter((item) => item._id !== movie._id));
    })
    .catch(console.error);
}


  return (
    <div className="page">
      <AppContext.Provider value={{ isMenuOpen, handleOpenMenu, isLogin, currentUser, savedMovies, setSavedMovies, toGetSavedMovies, toDeleteMovie }}>
        <CurrentUserContext.Provider value={currentUser}>
          <MobileMenu />   
          <Routes>
            <Route path="/" element={ <Main /> } />
            <Route path={urls.signup} element={ <Register handleRegister={toAuthRegister} /> } />
            <Route path={urls.signin} element={ <Login handleLogin={toAuthLogin} /> } />
            <Route path={urls.profile} element={ <Profile handleLogout={handleLogout}/> } />
              <Route path={urls.movies} element={ <Movies /> } />
            <Route path={urls.savedMovies} element={ <SavedMovies /> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  )
}

export default App;