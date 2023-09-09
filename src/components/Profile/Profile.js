import './Profile.css';
import ProfileForm from '../ProfileForm/ProfileForm';
import Header from '../Header/Header';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Profile({handleLogout}) {
  const user = useContext(CurrentUserContext);
  const { handleChange } = useFormAndValidation();

  const [isSubmitVisible, setSubmitVisible] = useState(false);
  const displaySubmit = () => {
    setSubmitVisible(!isSubmitVisible);
  }
  useEffect(() => {
    setSubmitVisible(false);
  }, [])

  return (
    <>
    <Header />
    <main>
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <ProfileForm
        submitText="Сохранить"
        isSubmitVisible={isSubmitVisible}
        displaySubmit={displaySubmit}
        handleLogout={handleLogout}
      >
      <div className="profile-form__input-block">
        <label className="profile-form__label">Имя</label>
        <input
          name="name" type="text"
          className="profile-form__input"
          minLength="2" maxLength="22"
          required
          placeholder="Введите имя"
          value={user.name}
          onChange={handleChange}
        />    
      </div>
      <div className="profile-form__input-block">
        <label className="profile-form__label">E-mail</label>
        <input
          name="email" type="email"
          className="profile-form__input"
          minLength="2"
          required
          placeholder="Введите почту"
          value={user.email}
          onChange={handleChange}
        />
      </div>
    </ProfileForm>
    </section>
    </main>
    </>
  )
}

export default Profile; 