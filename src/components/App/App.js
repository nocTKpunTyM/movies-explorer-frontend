import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { URLS } from '../../utils/constants';
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setLogin] = useState(localStorage.getItem('isLogin') || false);
  const [isLoading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    setCurrentUser('');
    setLogin(false);
    setMovies([]);
    setSavedMovies([]);
    localStorage.clear();
  }
  
  const tokenCheck = () => {     
    if (token) {  
      mainApi.getContent(token)
        .then((user) => {       
          setCurrentUser(user);
          setLogin(true);
          localStorage.setItem('isLogin', true);
        })
        .catch(console.error)
    }
  }
  
  useEffect(() => {
    tokenCheck();
  }, [isLogin])


  function toAuthRegister({ name, email, password }) {
    mainApi.register({ name, email, password })
      .then(() => {
        setLogin(true);
        localStorage.setItem('isLogin', true);
      })
      .then(() => {
        console.log(isLogin);
        navigate(URLS.MOVIES, { replace: true });
      })
      .catch(console.error);
  }

  function toAuthLogin({ email, password }) {
    mainApi.authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLogin(true);
          localStorage.setItem('isLogin', true);
          navigate(URLS.MOVIES);
        }
      })
      .catch(console.error);
  }

  function onUpdateUser(name, email) {
    mainApi.updateUser({ token, name, email })
    .then(setCurrentUser)
    .catch(console.error);
  }

  const [isMenuOpen, setMenuOpen] = useState(false);
  function handleOpenMenu () {
    setMenuOpen(!isMenuOpen);
  }
  
// ДАЛЕЕ ЗАПРОСЫ ДЛЯ РАБОТЫ С КАРТОЧКАМИ ФИЛЬМОВ
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) || []);

  function toTakeLike (movie) {
    if (Object.keys(savedMovies).length !== 0) {
      return savedMovies.some((item)=> item.movieId === movie.id);
    }
  }

  let isLiked = false;
  let moviesFromApi = {};
  function toGetMovies() {
    setLoading(true);
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
        console.log('ПОЛУЧИЛ 100 ФИЛЬМОВ ИЗ АПИ - АПИ - АПИ - МОЖНО ТОЛЬКО ОДИН РАЗ!');
        localStorage.setItem('movies', JSON.stringify(moviesFromApi));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
function toGetSavedMovies() {
  setLoading(true);
  mainApi.getSavedMovies(token)
    .then((data) => {
      setSavedMovies(data);
      console.log(`ПОЛУЧИЛ СОХРАНЕННЫЕ ИЗ БД - ${Object.keys(savedMovies).length}`);
      localStorage.setItem('savedMovies', JSON.stringify(data));
    })
    .catch(console.error)
    .finally(() => setLoading(false));
}

function toSaveMovie(movie) {
  const token = localStorage.getItem('token');
  mainApi.saveMovie({token, currentUser, movie})
    .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
        localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, movie]));
        if (Object.keys(movies).length !== 0) {
          const movieForlike = movies.find((item)=> item.movieId === movie.movieId);
          movieForlike.isLiked = true;
        }

    })
    .catch(console.error);
}

function toDeleteMovie(movie) {
  mainApi.deleteMovie(token, movie)
    .then(() => {
      setSavedMovies(savedMovies.filter((item) => item._id !== movie._id));
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies.filter((item) => item._id !== movie._id)));
      if (Object.keys(movies).length !== 0) {
        const movieForDislike = movies.find((item)=> item.movieId === movie.movieId);
        movieForDislike.isLiked = false;
      }
    })
    .catch(console.error);
}

  return (
    <div className="page">
      <AppContext.Provider value={{ isMenuOpen,
                                    handleOpenMenu,
                                    isLogin,
                                    currentUser,
                                    savedMovies,
                                    setSavedMovies,
                                    toGetSavedMovies,
                                    toSaveMovie,
                                    toDeleteMovie,
                                    isLoading }}>
        <CurrentUserContext.Provider value={currentUser}>
          <MobileMenu />   
          <Routes>
            <Route path="/" element={ <Main /> } />
            <Route path={URLS.SIGNUP} element={ !isLogin ? <Register handleRegister={toAuthRegister}/> : <Navigate to={URLS.MOVIES} replace/> } />
            <Route path={URLS.SIGNIN} element={ !isLogin ? <Login handleLogin={toAuthLogin}/> : <Navigate to={URLS.MOVIES} replace/> } />

            <Route path={URLS.PROFILE}
              element={<ProtectedRoute
                element={Profile}
                isLogin={isLogin}
                handleLogout={handleLogout}
                onUpdateUser={onUpdateUser}
              />}
            />
            <Route path={URLS.MOVIES}
              element={<ProtectedRoute
                element={Movies}
                isLogin={isLogin}
                toGetMovies={toGetMovies}
                movies={movies}
                setMovies={setMovies}
                toTakeLike={toTakeLike}
              />}
            />
            <Route path={URLS.SAVEDMOVIES}
              element={<ProtectedRoute
                element={SavedMovies}
                isLogin={isLogin}
              />}
            />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  )
}

export default App;