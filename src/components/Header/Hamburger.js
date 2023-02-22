import React, { useRef } from 'react';

const Hamburger = (props) => {

  const Hamburger = useRef();

  const toggleNavbar = () => {
    if(!props.showMenuBar){
      Hamburger.current.classList.add("open");
      props.setShowMenuBar(true);
    }else{
      Hamburger.current.classList.remove("open");
      props.setShowMenuBar(false);
    }
  }

  return (
    <div className='hamburger' id='hamburger' ref={Hamburger} onClick={toggleNavbar}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Hamburger;