import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__paragraph">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__lower">
        <ul className='footer__links'>
          <li className='footer__link'>
            <a href='https://practicum.yandex.ru/' target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className='footer__link'>
            <a href='https://github.com/' target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
        <p className="footer__copyright">&copy; 2020</p>
      </div>
    </footer>
  );
}

export default Footer;