import AuthForm from '../AuthForm/AuthForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { Link } from 'react-router-dom';
import { URLS, PATERN_EMAIL } from '../../utils/constants';
import Header from '../Header/Header';
import {useContext, useEffect} from 'react';
import { AppContext } from '../../contexts/AppContext';

function Register({ handleRegister }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const {errorMessage} = useContext(AppContext);

  useEffect(() => {
    resetForm();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    handleRegister({ name, email, password });
  }
 
  return (
    <>
    <Header />
    <main>
    <AuthForm
      name="register"
      title="Добро пожаловать!"
      submitText="Зарегистрироваться"
      onSubmit={handleSubmit}
      isValid={isValid}
      errorAuth={errorMessage}
    >
      <div className="auth-form__input-block">
        <label className="auth-form__label">Имя</label>
        <input className="auth-form__input"
          name="name" type="text"
          minLength="2" maxLength="22"
          value={values.name || ''} onChange={handleChange}
          placeholder='Введите имя'
          required
        />
        {!isValid && (
          <span className="auth-form__input-error">
            {errors.name}
          </span>
        )}
      </div>
      <div className="auth-form__input-block">
        <label className="auth-form__label">E-mail</label>
        <input
          name="email" type="email"
          className="auth-form__input"
          minLength="5"
          value={values.email || ''} onChange={handleChange}
          placeholder='Введите почту'
          pattern={PATERN_EMAIL}
          required
        />
        {!isValid && (
          <span className="auth-form__input-error">
            {errors.email}
          </span>
        )}
      </div>
      <div className="auth-form__input-block">
        <label className="auth-form__label">Пароль</label>
        <input
          name="password" type="password"
          className="auth-form__input"
          minLength="8" maxLength="200"
          value={values.password || ''} onChange={handleChange}
          placeholder='&bull;&bull;&bull;&bull;&bull;&bull;'
          required
        />
        {!isValid && (
          <span className="auth-form__input-error">
            {errors.password}
          </span>
        )}
      </div>
    </AuthForm>
    <p className='reg-text'>Уже зарегистрированы? <Link to={URLS.SIGNIN} className='reg-link'>Войти</Link></p>
    </main>
    </>
  )
}

export default Register; 