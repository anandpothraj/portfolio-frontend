import React from 'react';
import SubFooter from '../components/Footer/SubFooter';
import MainFooter from '../components/Footer/MainFooter';

const Footer = () => {
  return (
    <div className='bg-dark'>
      <div className='py-4 bg-black'>
        <MainFooter/>
      </div>
      <SubFooter/>
    </div>
  );
};

export default Footer;