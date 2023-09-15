import './ProfileForm.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProfileForm({
                isValid,
                submitText,
                children,
                handleLogout,
                setReadOnly,
                isReadOnly,
                onSubmit}) {

    const [isSubmitVisible, setSubmitVisible] = useState(false);
    const displaySubmit = () => {
        setSubmitVisible(!isSubmitVisible);
        setReadOnly(!isReadOnly);
    }
    useEffect(() => {
        setSubmitVisible(false);
    }, [])
          
    return (
        <form name="profile-form" className="profile-form" onSubmit={onSubmit} noValidate>
            <div className="profile-form__inputs">
                {children}
            </div>
            <div className="profile-form__buttons">
                <span className="profile-form__feedback">Данные пользователя обновлены</span>
            <button
                type="submit"
                className=
                        {`profile-form__submit${!isValid
                        ?
                        " profile-form__submit_inactive"
                        :
                        ''}
                        ${isSubmitVisible ? " profile-form__submit_visible" : ''}`}
                onClick={displaySubmit}
                disabled={!isValid}>
                    {submitText}
            </button>
            <button className={`profile-form__save-link ${isSubmitVisible ? 'profile-form__save-link_invisible' : ''}`}
                    onClick={displaySubmit}
                    type='button'>Редактировать</button>
            <Link to='/'
                    className={`profile-form__bottom-link ${isSubmitVisible ? 'profile-form__save-link_invisible' : ''}`}
                    onClick={handleLogout}>Выйти из аккаунта</Link>
            </div>
        </form>
    );
}

export default ProfileForm;