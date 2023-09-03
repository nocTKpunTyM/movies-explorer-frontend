import './ProfileButton.css';
import { Link } from 'react-router-dom';
import { urls } from '../../utils/constants';

function ProfileButton ({isLand, handleOpenMenu}) {

    return (
        <Link to={urls.profile} className={`profile-button${isLand ? ' profile-button_dark' : ''}`} onClick={handleOpenMenu && handleOpenMenu}></Link>
    )
}

export default ProfileButton;