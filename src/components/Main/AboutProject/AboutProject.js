import './AboutProject.css';

function AboutProject() {
    return (
      <section className="about-project" id="about-project">
        <h2 className='about-project__title'>О проекте</h2>
        <div className='about-project__content'>
          <div className='about-project__content-block'>
              <div className='about-project__text-block'>
                  <h3 className='about-project__sub-title'>Дипломный проект включал 5 этапов</h3>
                  <p className='about-project__paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
              </div>
              <div className='about-project__text-block'>
                  <h3 className='about-project__sub-title'>На выполнение диплома ушло 5 недель</h3>
                  <p className='about-project__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
              </div>
          </div>

          <div className='about-project__period'>
              <div className='about-project__week about-project__week-green'><p className='about-project__week-text'>1 неделя</p></div>
              <div className='about-project__week about-project__week-grey'><p className='about-project__week-text'>4 недели</p></div>
              <p className='about-project__week-text about-project__week about-project__week-back'>Back-end</p>
              <p className='about-project__week-text about-project__week about-project__week-front'>Front-end</p>
          </div>
        </div>
      </section>
    );
  }
  
  export default AboutProject;