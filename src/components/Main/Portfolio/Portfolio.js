import './Portfolio.css';

function Portfolio() {
    return (
      <section className="portfolio">
        <h2 className='portfolio__title'>Портфолио</h2>
        <a href='https://github.com/nocTKpunTyM/how-to-learn' target="_blank" rel="noreferrer" className='portfolio__flex'>
            <p className='portfolio__project-name'>Статичный сайт</p>
            <button className='portfolio__project-button'></button>
        </a>
        <a href='https://github.com/nocTKpunTyM/russian-travel' target="_blank" rel="noreferrer" className='portfolio__flex'>
            <p className='portfolio__project-name'>Адаптивный сайт</p>
            <button className='portfolio__project-button'></button>
        </a>
        <a href='https://github.com/nocTKpunTyM/express-mesto-gha' target="_blank" rel="noreferrer" className='portfolio__flex'>
            <p className='portfolio__project-name'>Одностраничное приложение</p>
            <button className='portfolio__project-button'></button>
        </a>
      </section>
    );
  }
  
  export default Portfolio;