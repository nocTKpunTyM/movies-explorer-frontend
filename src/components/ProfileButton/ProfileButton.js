import './ProfileButton.css';
import { Link } from 'react-router-dom';
import { urls } from '../../utils/constants';
import imgUser from '../../images/man.svg';

function ProfileButton ({isLand, handleOpenMenu}) {

    return (
        <Link
            to={urls.profile}
            className={`profile-button${isLand ? ' profile-button_dark' : ''}`} onClick={handleOpenMenu && handleOpenMenu}>
                <p className='profile-button__text'>Аккаунт</p>
                <div className='profile-button__circle'>
                    <img className='profile-button__man' src={imgUser} alt='Пользователь'></img>
                </div>
        </Link>
    )
}

export default ProfileButton;