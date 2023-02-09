import React from 'react';
import '../components/About/About.css';
import Bio from '../components/About/Bio';
import AboutInfo from '../components/About/AboutInfo';
import ContributionsGraph from '../components/About/ContributionGraph';

const About = () => {
  return (
    <div className='col-11 col-md-9 m-auto text-light'>
      <AboutInfo/>
      <hr/>
      <Bio/>
      <ContributionsGraph/>
    </div>
  );
};

export default About;