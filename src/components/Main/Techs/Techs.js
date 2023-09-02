import './Techs.css';

function Techs() {
    return (
      <section className="techs">
        <h2 className='techs__title'>Технологии</h2>
        <div className='techs__content-block'>
            <h3 className='techs__sub-title'>7 технологий</h3>
            <p className='techs__paragraph'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className='techs__cubs'>
                <div className='techs__cub'>HTML</div>
                <div className='techs__cub'>CSS</div>
                <div className='techs__cub'>JS</div>
                <div className='techs__cub'>React</div>
                <div className='techs__cub'>Git</div>
                <div className='techs__cub'>Express.js</div>
                <div className='techs__cub'>mongoDB</div>
            </div>
        </div>
      </section>
    );
  }
  
  export default Techs;