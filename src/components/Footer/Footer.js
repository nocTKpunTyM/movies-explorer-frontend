import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__paragraph">Учебный проект Яндекс.Практикум х BeatFilm.</p>
    
        <div className="footer__lower">
          <div className='footer__links'>
            <a href='https://practicum.yandex.ru/'  target="_blank" rel="noreferrer" className='footer__link'>Яндекс.Практикум</a>
            <a href='https://github.com/'  target="_blank" rel="noreferrer" className='footer__link'>Github</a>
          </div>
          <p className="footer__copyright">&copy; 2020</p>
   
      </div>
    </footer>
  );
}

export default Footer;