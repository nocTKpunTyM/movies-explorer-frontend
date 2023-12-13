import './AboutMe.css';
import avatar from '../../../images/avatar.png';

function AboutMe() {
    return (
      <section className="about-me">
        <h2 className='about-me__title'>Студент</h2>
        <div className='about-me__content-block'>
            <img src={avatar} alt='Фронтенд-разработчик Максим' className='about-me__avatar'></img>
            <div className='about-me__text-block'>
                <h3 className='about-me__sub-title'>Андрей</h3>
                <h4 className='about-me__codicil'>Веб-разработчик, 36 лет</h4>
                <div className='about-me__flex'>
                    <p className='about-me__paragraph'>Я родился и живу в Санкт-Петербурге. У меня есть жена и два прекрасных ребенка - сын и дочь. Больше всего люблю путешествовать. Всей семьей каждое лето мы отдыхаем в кемпинге, где встречаем много интересных людей из самых различных городов нашей страны. Свой первый код на HTML я написал 12 лет назад. А год назад решил начать кодить по большому.</p>
                    <a href='https://github.com/nocTKpunTyM?tab=repositories' target="_blank" rel="noreferrer" className='about-me__link'>Github</a>
                </div>
            </div>
        </div>
      </section>
    );
  }
  
  export default AboutMe;