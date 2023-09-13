import './Profile.css';
import ProfileForm from '../ProfileForm/ProfileForm';
import Header from '../Header/Header';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Profile({handleLogout, onUpdateUser}) {
  const [isReadOnly, setReadOnly] = useState(true);
  const user = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } = useFormAndValidation();

  useEffect(() => {
    setValues(user);
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values.name, values.email);
  }

  return (
    <>
    <Header />
    <main>
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <ProfileForm
        submitText="Сохранить"
        setReadOnly={setReadOnly}
        handleLogout={handleLogout}
        onSubmit={handleSubmit}
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
          <span className="title-input-error form__input-error">
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
        />
        {!isValid && (
          <span className="title-input-error form__input-error">
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