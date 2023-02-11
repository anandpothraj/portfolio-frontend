import React from 'react';
import '../components/About/About.css';
import Bio from '../components/About/Bio';
// import Stats from '../components/About/Stats';
import AboutInfo from '../components/About/AboutInfo';
import Experience from '../components/About/Experience/Experience';
import ContributionsGraph from '../components/About/ContributionGraph';

const About = () => {
  return (
    <div className='col-11 col-md-9 m-auto text-light'>
      <AboutInfo/>
      <hr/>
      <Bio/>
      <ContributionsGraph/>
      {/* <Stats/> */}
      <Experience/>
    </div>
  );
};

export default About;