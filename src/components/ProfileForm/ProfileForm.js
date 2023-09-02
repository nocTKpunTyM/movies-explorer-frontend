import './ProfileForm.css';

function ProfileForm({
                name,
                submitText,
                isValid,
                onSubmit,
                isSubmitVisible,
                displaySubmit,
                children }) {
               
    return (
        <form name={name} className="profile-form" onSubmit={onSubmit} noValidate>
            <div className="profile-form__inputs">
                {children}
            </div>
            <div className="profile-form__buttons">
            <button
                type="submit"
                className={`profile-form__submit${!isValid && " profile-form__submit_inactive"}${isSubmitVisible && " profile-form__submit_visible"}`}
                onClick={displaySubmit}>
                    {submitText}
            </button>
            </div>
        </form>
    );
}

export default ProfileForm;