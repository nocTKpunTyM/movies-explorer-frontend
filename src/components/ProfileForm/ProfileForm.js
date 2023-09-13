import './ProfileForm.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { urls } from '../../utils/constants';

function ProfileForm({
                isValid,
                submitText,
                children,
                handleLogout,
                setReadOnly,
                onSubmit}) {

    const [isSubmitVisible, setSubmitVisible] = useState(false);
    const displaySubmit = () => {
        setSubmitVisible(!isSubmitVisible);
        setReadOnly(false);
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
            <button
                type="submit"
                className=
                        {`profile-form__submit${!isValid ? " profile-form__submit_inactive" : ''}${isSubmitVisible ? " profile-form__submit_visible" : ''}`}
                onClick={displaySubmit}>
                    {submitText}
            </button>
            {!isSubmitVisible ? <button className='profile-form__save-link' onClick={displaySubmit} type='button'>Редактировать</button> : ''}
            {!isSubmitVisible ? <Link to='/' className='profile-form__bottom-link' onClick={handleLogout}>Выйти из аккаунта</Link> : ''}
            </div>
        </form>
    );
}

export default ProfileForm;