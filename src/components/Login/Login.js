import AuthForm from '../AuthForm/AuthForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { Link } from 'react-router-dom';
import { URLS } from '../../utils/constants';
import Header from '../Header/Header';

function Login({handleLogin}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

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
    >
      <div className="auth-form__input-block">
        <label className="auth-form__label">E-mail</label>
        <input
          name="email" type="email"
          className="auth-form__input"
          minLength="2"
          value={values.email || ''} onChange={handleChange}
          placeholder='Введите свой E-mail'
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
          placeholder='Введите свой пароль'
          required
        />
        {!isValid && (
          <span className="auth-form__error">
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