import './Techs.css';

function Techs() {
    return (
      <section className="techs">
        <h2 className='techs__title'>Технологии</h2>
        <div className='techs__content-block'>
            <h3 className='techs__sub-title'>7 технологий</h3>
            <p className='techs__paragraph'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className='techs__cubs'>
                <li className='techs__cub'>HTML</li>
                <li className='techs__cub'>CSS</li>
                <li className='techs__cub'>JS</li>
                <li className='techs__cub'>React</li>
                <li className='techs__cub'>Git</li>
                <li className='techs__cub'>Express.js</li>
                <li className='techs__cub'>mongoDB</li>
            </ul>
        </div>
      </section>
    );
  }
  
  export default Techs;