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
import { getMovies } from '../../utils/MoviesApi';
import { API_URL_IMG } from '../../utils/constants';

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
  const [movies, setMovies] = useState({});

  function toTakeLike (movie) {
    if (Object.keys(savedMovies).length !== 0) {
      return savedMovies.some((item)=> item.movieId === movie.id);
    }
  }

  let isLiked = false;
  let moviesFromApi = {};
  function toGetMovies() {
    getMovies()
      .then((data) => { 
        moviesFromApi = data.map((movie) => {
          isLiked = toTakeLike(movie);
          return {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: API_URL_IMG + movie.image.url,
            trailerLink: movie.trailerLink,
            thumbnail: API_URL_IMG + movie.image.formats.thumbnail.url,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            isLiked: isLiked
          };
        })
        setMovies(moviesFromApi);
        console.log('ПОЛУЧИЛ 100 ФИЛЬМОВ ИЗ АПИ');
        localStorage.setItem('movies', JSON.stringify(moviesFromApi));
      })
      .catch(console.error);
  }

const [savedMovies, setSavedMovies] = useState([]);
function toGetSavedMovies() {
  mainApi.getSavedMovies(token)
    .then((data) => {
      setSavedMovies(data);
      console.log(`ПОЛУЧИЛ СОХРАНЕННЫЕ ИЗ БД - ${Object.keys(savedMovies).length}`);
    })
    .catch(console.error);
}

function toSaveMovie(movie) {
  const token = localStorage.getItem('token');
  mainApi.saveMovie({token, currentUser, movie})
    .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
    })
    .catch(console.error);
}

function toDeleteMovie(movie) {
  mainApi.deleteMovie(token, movie)
    .then(() => {
      setSavedMovies(savedMovies.filter((item) => item._id !== movie._id));
      if (Object.keys(movies).length !== 0) {
        const movieForDislike = movies.find((item)=> item.movieId === movie.movieId);
        movieForDislike.isLiked = false;
      }
    })
    .catch(console.error);
}


  return (
    <div className="page">
      <AppContext.Provider value={{ isMenuOpen, handleOpenMenu, isLogin, currentUser, savedMovies, setSavedMovies, toGetSavedMovies, toSaveMovie, toDeleteMovie }}>
        <CurrentUserContext.Provider value={currentUser}>
          <MobileMenu />   
          <Routes>
            <Route path="/" element={ <Main /> } />
            <Route path={urls.signup} element={ <Register handleRegister={toAuthRegister} /> } />
            <Route path={urls.signin} element={ <Login handleLogin={toAuthLogin} /> } />
            <Route path={urls.profile} element={ <Profile handleLogout={handleLogout}/> } />
              <Route path={urls.movies} element={ <Movies toGetMovies={toGetMovies} movies={movies} setMovies={setMovies} toTakeLike={toTakeLike}/> } />
            <Route path={urls.savedMovies} element={ <SavedMovies /> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  )
}

export default App;