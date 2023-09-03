import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
      <main className="not-found">
            <p className="not-found__code">404</p>
            <h1 className="not-found__title">Страница не найдена</h1>
        <p className='reg-text'><Link to="/" className='reg-link'>Назад</Link></p>
      </main>
    );
  }
  
  export default NotFound;