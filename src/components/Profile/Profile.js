import './Profile.css';
import ProfileForm from '../ProfileForm/ProfileForm';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { useState, useEffect } from 'react';

function Profile() {
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
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <ProfileForm
        submitText="Сохранить"
        isSubmitVisible={isSubmitVisible}
        displaySubmit={displaySubmit}
      >
      <div className="profile-form__input-block">
        <label className="profile-form__label">Имя</label>
        <input
          name="name" type="text"
          className="profile-form__input"
          minLength="2" maxLength="200"
          required
          value="Виталий"
        />    
      </div>
      <div className="profile-form__input-block">
        <label className="profile-form__label">E-mail</label>
        <input
          name="email" type="email"
          className="profile-form__input"
          minLength="2"
          required
          value="pochta@yandex.ru"
        />
      </div>
    </ProfileForm>
    {!isSubmitVisible ? <button className='profile__save-link' onClick={displaySubmit}>Редактировать</button> : ''}
    {!isSubmitVisible ? <Link to="/sign-up" className='profile__bottom-link'>Выйти из аккаунта</Link> : ''}
    </section>
    </>
  )
}

export default Profile; 