import './AuthForm.css';

function AuthForm({ name, title, submitText, isValid, onSubmit, children }) {
    return (
            <section className="auth-form">
                <h1 className='auth-form__title'>{title}</h1>
                <form name={name} className="auth-form__form" onSubmit={onSubmit} noValidate>
                    <div className="auth-form__inputs">
                        {children}
                    </div>
                    <button type='submit' className='auth-form__submit'>{submitText}</button>
                </form>
            </section>
    );
}

export default AuthForm;