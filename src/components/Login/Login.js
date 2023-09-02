import AuthForm from '../AuthForm/AuthForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

function Login() {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  return (
    <>
    <Header />
    <AuthForm
      title="Рады видеть!"
      submitText="Войти"
    >
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
    <p className='auth-form__reg-text'>Еще не зарегистрированы? <Link to="/sign-up" className='auth-form__reg-link'>Регистрация</Link></p>
    </>
  )
}

export default Login; 