import './AboutMe.css';
import avatar from '../../../images/avatar.png';
import { Link } from 'react-router-dom';

function AboutMe() {
    return (
      <section className="about-me">
        <h2 className='about-me__title'>Студент</h2>
        <div className='about-me__content-block'>
            <img src={avatar} alt='Фронтенд-разработчик Максим' className='about-me__avatar'></img>
            <div className='about-me__text-block'>
                <h3 className='about-me__sub-title'>Виталий</h3>
                <h4 className='about-me__codicil'>Фронтенд-разработчик, 30 лет</h4>
                <div className='about-me__flex'>
                    <p className='about-me__paragraph'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <Link to='https://github.com/nocTKpunTyM?tab=repositories' target="_blank" className='about-me__link'>Github</Link>
                </div>
            </div>
        </div>
      </section>
    );
  }
  
  export default AboutMe;