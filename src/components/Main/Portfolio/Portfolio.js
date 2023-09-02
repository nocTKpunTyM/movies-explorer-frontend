import { Link } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
    return (
      <section className="portfolio">
        <h2 className='portfolio__title'>Портфолио</h2>
        <div className='portfolio__flex'>
            <p className='portfolio__project-name'>Статичный сайт</p>
            <Link to='https://github.com/nocTKpunTyM/how-to-learn' target="_blank"><button className='portfolio__project-button'></button></Link>
        </div>
        <div className='portfolio__flex'>
            <p className='portfolio__project-name'>Адаптивный сайт</p>
            <Link to='https://github.com/nocTKpunTyM/russian-travel' target="_blank"><button className='portfolio__project-button'></button></Link>
        </div>
        <div className='portfolio__flex'>
            <p className='portfolio__project-name'>Одностраничное приложение</p>
            <Link to='https://github.com/nocTKpunTyM/express-mesto-gha' target="_blank"><button className='portfolio__project-button'></button></Link>
        </div>
      </section>
    );
  }
  
  export default Portfolio;