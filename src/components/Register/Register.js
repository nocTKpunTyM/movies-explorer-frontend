import AuthForm from '../AuthForm/AuthForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { Link } from 'react-router-dom';
import { urls } from '../../utils/constants';
import Header from '../Header/Header';

function Register() {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  return (
    <>
    <Header />
    <AuthForm
      title="Добро пожаловать!"
      submitText="Зарегистрироваться"
    >
      <div className="auth-form__input-block">
        <label className="auth-form__label">Имя</label>
        <input className="auth-form__input"
          name="name" type="name"
          minLength="2"
          value={values.name || ''} onChange={handleChange}
          required
        />
        {!isValid && (
          <span className="auth-form__error">
            {errors.name}
          </span>
        )}
      </div>
      <div className="auth-form__input-block">
        <label className="auth-form__label">E-mail</label>
        <input
          name="email" type="email"
          className="auth-form__input"
          minLength="2"
          value={values.email || ''} onChange={handleChange}
          required
        />
        {!isValid && (
          <span className="auth-form__error">
            {errors.email}
          </span>
        )}
      </div>
      <div className="auth-form__input-block">
        <label className="auth-form__label">Пароль</label>
        <input
          name="password" type="password"
          className="auth-form__input"
          minLength="2" maxLength="200"
          value={values.password || ''} onChange={handleChange}
          required
        />
        {!isValid && (
          <span className="auth-form__error">
            {errors.password}
          </span>
        )}
      </div>
    </AuthForm>
    <p className='reg-text'>Уже зарегистрированы? <Link to={urls.signin} className='reg-link'>Войти</Link></p>
    </>
  )
}

export default Register; 