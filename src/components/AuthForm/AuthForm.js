import './AuthForm.css';

function AuthForm({ name, title, submitText, isValid, onSubmit, children, errorAuth }) {

    return (
            <section className="auth-form">
                <h1 className='auth-form__title'>{title}</h1>
                <form name={name} className="auth-form__form" onSubmit={onSubmit} noValidate>
                    <div className="auth-form__inputs">
                        {children}
                    </div>
                    <div className='auth-form__buttons'>
                        {errorAuth ? <span className='auth-form__error'>{errorAuth}</span> : ''}
                        <button
                            type='submit'
                            className={`auth-form__submit${!isValid ? " auth-form__submit_inactive" : ""}`}
                            disabled={!isValid}
                            >{submitText}
                        </button>
                    </div>
                </form>
            </section>
    );
}

export default AuthForm;