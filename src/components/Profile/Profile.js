import './Profile.css';
import ProfileForm from '../ProfileForm/ProfileForm';
import Header from '../Header/Header';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { PATERN_EMAIL } from '../../utils/constants';
import { AppContext } from '../../contexts/AppContext';

function Profile({handleLogout, onUpdateUser, userFeedback}) {
  const [isReadOnly, setReadOnly] = useState(true);
  const user = useContext(CurrentUserContext);
  const {errorMessage} = useContext(AppContext);
  const { values, handleChange, errors, isValid, setValues, setIsValid } = useFormAndValidation();

  useEffect(() => {
    setValues(user);
  }, [user, errorMessage]);

  useEffect(() => {
    if (values.name === user.name && values.email === user.email) {
      setIsValid(false);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values.name, values.email);
  }

  return (
    <>
    <Header />
    <main>
    <section className='profile'>
      <h1 className='profile__title'>Привет, {user.name}!</h1>
      <ProfileForm
        submitText="Сохранить"
        setReadOnly={setReadOnly}
        handleLogout={handleLogout}
        onSubmit={handleSubmit}
        isReadOnly={isReadOnly}
        isValid={isValid}
        userFeedback={userFeedback}
        errorMessage={errorMessage}
      >
      <div className="profile-form__input-block">
        <label className="profile-form__label">Имя</label>
        <input
          name="name" type="text"
          className="profile-form__input"
          minLength="2" maxLength="22"
          required
          placeholder="Введите имя"
          value={values.name || ''}
          onChange={handleChange}
          readOnly={isReadOnly}
        />
        {!isValid && (
          <span className="profile-form__input-error">
            {errors.name}
          </span>
        )}    
      </div>
      <div className="profile-form__input-block">
        <label className="profile-form__label">E-mail</label>
        <input
          name="email" type="email"
          className="profile-form__input"
          minLength="2"
          required
          placeholder="Введите почту"
          value={values.email || ''}
          onChange={handleChange}
          readOnly={isReadOnly}
          pattern={PATERN_EMAIL}
        />
        {!isValid && (
          <span className="profile-form__input-error">
            {errors.email}
          </span>
        )}
      </div>
    </ProfileForm>
    </section>
    </main>
    </>
  )
}

export default Profile; 