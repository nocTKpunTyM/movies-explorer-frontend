import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1, { replace: true });
}
    return (
      <main>
        <section className="not-found">
              <p className="not-found__code">404</p>
              <h1 className="not-found__title">Страница не найдена</h1>
          <p className='reg-text reg-link' onClick={goBack}>Назад</p>
        </section>
      </main>
    );
  }
  
  export default NotFound;