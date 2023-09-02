import './Promo.css';
import promoLogo from '../../../images/landing-logo.svg';

function Promo() {
    return (
      <section className="promo">
            <img src={promoLogo} alt='Планета слов' className='promo__logo'></img>
            <div className='promo__text-block'>
                <h1 className='promo__title'>Учебный проект студента факультета < nobr>Веб-разработки.</nobr></h1>
                <p className='promo__paragraph'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a href='#about-project'><button className='promo__button'>Узнать больше</button></a>
            </div>
      </section>
    );
  }
  
  export default Promo;