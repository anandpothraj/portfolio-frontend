import React from 'react';
import AboutInfo from '../components/About/AboutInfo';
import '../components/About/About.css';

const About = () => {
  return (
    <div className='col-11 col-md-9 m-auto text-light'>
      <AboutInfo/>
      <hr/>
    </div>
  );
};

export default About;