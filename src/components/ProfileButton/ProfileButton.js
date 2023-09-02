import './ProfileButton.css';
import { Link } from 'react-router-dom';

function ProfileButton ({isLand}) {

    return (
        <Link to='/me' className={`profile-button${isLand ? ' profile-button_dark' : ''}`}></Link>
    )
}

export default ProfileButton;