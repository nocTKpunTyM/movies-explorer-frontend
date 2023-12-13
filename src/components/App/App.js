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
import { API_URL_IMG, ERR_API } from '../../utils/constants';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setLogin] = useState(localStorage.getItem('isLogin') || false);
  const [isLoading, setLoading] = useState(false);
  const [userFeedback, setUserFeedback] = useState();
  const [errorMessage, setErrorMessage] = useState('');

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


// ДАЛЕЕ ЗАПРОСЫ ДЛЯ РАБОТЫ С ПОЛЬЗОВАТЕЛЕМ
  function toAuthRegister({ name, email, password }) {
    mainApi.register({ name, email, password })
      .then((data) => {
        toAuthLogin({email, password});
      })
      .then(() => {
        console.log('excess then');
        navigate(URLS.MOVIES, { replace: true });
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {    
          setErrorMessage('Пользователь с таким email уже существует.');
        } else {
          setErrorMessage('При регистрации пользователя произошла ошибка.');
        }
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
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
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 401' || err === 'Ошибка: 400') {    
          setErrorMessage('Вы ввели неправильный логин или пароль.');
        } else {
          setErrorMessage('На сервере произошла ошибка.');
        }  
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      })
  }

  function onUpdateUser(name, email) {
    mainApi.updateUser({ token, name, email })
    .then((user) => {
      setCurrentUser(user);
      setUserFeedback(true);
      setTimeout(() => {
        setUserFeedback(false);
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
      if (err === 'Ошибка: 409') {    
        setErrorMessage('Пользователь с таким email уже существует.');
      } else {
        setErrorMessage('При обновлении профиля произошла ошибка.');
      }
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    })
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
      .catch((err) => {
        setErrorMessage(ERR_API);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      })
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
                                    isLoading,
                                    errorMessage }}>
        <CurrentUserContext.Provider value={currentUser}>
          <MobileMenu />   
          <Routes>
            <Route path="/" element={ <Main /> } />
            <Route path={URLS.SIGNUP}
              element={ !isLogin ?
                        <Register handleRegister={toAuthRegister}/> :
                        <Navigate to={URLS.MOVIES} replace/>}
            />
            <Route path={URLS.SIGNIN}
              element={ !isLogin ?
                        <Login handleLogin={toAuthLogin}/> :
                        <Navigate to={URLS.MOVIES} replace/>}
            />
            <Route path={URLS.PROFILE}
              element={<ProtectedRoute
                element={Profile}
                isLogin={isLogin}
                handleLogout={handleLogout}
                onUpdateUser={onUpdateUser}
                userFeedback={userFeedback}
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