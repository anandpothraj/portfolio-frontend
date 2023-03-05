import React, { useEffect } from 'react';
import '../components/About/About.css';
import Bio from '../components/About/Bio';
// import Stats from '../components/About/Stats';
import Services from '../components/About/Services';
import AboutInfo from '../components/About/AboutInfo';
import Experience from '../components/About/Experience/Experience';
import Technology from '../components/About/Technology/Technology';
import ContributionsGraph from '../components/About/ContributionGraph';
import Support from '../components/About/Support';

const About = () => {

  const goToTop = () => {
    window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
  };

  useEffect(()=> {
    goToTop();
  },[]);

  return (
    <div className='col-11 col-md-9 m-auto text-light'>
      <AboutInfo/>
      <hr/>
      <Bio/>
      <ContributionsGraph/>
      {/* <Stats/> */}
      <Experience/>
      <Technology/>
      <Services/>
      <Support/>
    </div>
  );
};

export default About;