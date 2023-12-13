import AuthForm from '../AuthForm/AuthForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { Link } from 'react-router-dom';
import { URLS, PATERN_EMAIL } from '../../utils/constants';
import Header from '../Header/Header';
import {useContext, useEffect} from 'react';
import { AppContext } from '../../contexts/AppContext';

function Login({handleLogin}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const {errorMessage} = useContext(AppContext);

  useEffect(() => {
    resetForm();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    handleLogin({ email, password });
  }

  return (
    <>
    <Header />
    <main>
    <AuthForm
      title="Рады видеть!"
      submitText="Войти"
      onSubmit={handleSubmit}
      isValid={isValid}
      errorAuth={errorMessage}
    >
      <div className="auth-form__input-block">
        <label className="auth-form__label">E-mail</label>
        <input
          name="email" type="email"
          className="auth-form__input"
          minLength="5"
          value={values.email || ''} onChange={handleChange}
          placeholder='Введите свой E-mail'
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
          placeholder='Введите свой пароль'
          required
        />
        {!isValid && (
          <span className="auth-form__input-error">
            {errors.password}
          </span>
        )}
      </div>
    </AuthForm>
    <p className='reg-text'>Еще не зарегистрированы? <Link to={URLS.SIGNUP} className='reg-link'>Регистрация</Link></p>
    </main>
    </>
  )
}

export default Login; 