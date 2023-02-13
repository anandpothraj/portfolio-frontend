import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const Hamburger = () => {

  const [ showNavbar, setShowNavbar ] = useState(false);

  const toggleNavbar = () => {
    console.log(showNavbar);
    setShowNavbar(true);
  }

  return (
    <span className='hamburger' onClick={toggleNavbar}><GiHamburgerMenu className='text-white m-auto'/></span>
  );
};

export default Hamburger;