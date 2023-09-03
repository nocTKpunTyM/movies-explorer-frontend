import { Link } from 'react-router-dom';
import { urls } from '../../utils/constants';
import './AuthForm.css';

function AuthForm({ name, title, submitText, isValid, onSubmit, children }) {
    return (
            <section className="auth-form">
                <h1 className='auth-form__title'>{title}</h1>
                <form name={name} className="auth-form__form" onSubmit={onSubmit} noValidate>
                    <div className="auth-form__inputs">
                        {children}
                    </div>
                    <Link to={urls.movies} className='auth-form__submit'>{submitText}</Link>
                </form>
            </section>
    );
}

export default AuthForm;