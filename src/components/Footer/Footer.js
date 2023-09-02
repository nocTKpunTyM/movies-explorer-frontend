import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__paragraph">Учебный проект Яндекс.Практикум х BeatFilm.</p>
    
        <div className="footer__lower">
          <div className='footer__links'>
            <Link to='https://practicum.yandex.ru/'  target="_blank" className='footer__link'>Яндекс.Практикум</Link>
            <Link to='https://github.com/'  target="_blank" className='footer__link'>Github</Link>
          </div>
          <p className="footer__copyright">&copy; 2020</p>
   
      </div>
    </footer>
  );
}

export default Footer;