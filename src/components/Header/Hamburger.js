import React, { useState, useRef } from 'react';

const Hamburger = () => {

  const Hamburger = useRef();
  const [ showNavbar, setShowNavbar ] = useState(false);

  const toggleNavbar = () => {
    if(!showNavbar){
      Hamburger.current.classList.add("open");
      setShowNavbar(true);
    }else{
      Hamburger.current.classList.remove("open");
      setShowNavbar(false);
    }
  }

  return (
    <div className='hamburger' ref={Hamburger} onClick={toggleNavbar}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Hamburger;