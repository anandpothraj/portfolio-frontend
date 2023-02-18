import React from 'react';
import './MobileNavBar.css';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileNavBar = (props) => {

  const navigate = useNavigate();
  const location = useLocation();

  const linkCss = {
    textDecoration:"none",
    color:"grey"
  };

  const active = {
    textDecoration:"none",
    color:"#ff5403"
  };

  const navigateLinks = (path) => {
    props.setShowMenuBar(false);
    navigate(`/${path}`);
    const hamburger = document.getElementById("hamburger");
    hamburger.classList.remove("open");
  }

  return (
    <div className='mobileNavBar'>
      <ul className='m-auto text-center d-flex flex-column p-0'>
        <li className='my-5 m-auto w-100' style={location.pathname === "/" ? active : linkCss} onClick={()=>navigateLinks("")}>Home</li>
        <li className='my-5 m-auto w-100' style={location.pathname === "/projects" ? active : linkCss} onClick={()=>navigateLinks("projects")}>Projects</li>
        {/* <li className='my-5 m-auto w-100' style={location.pathname === "/blogs" ? active : linkCss} onClick={()=>navigateLinks("blogs")}>Blogs</li> */}
        <li className='my-5 m-auto w-100' style={location.pathname === "/about" ? active : linkCss} onClick={()=>navigateLinks("about")}>About</li>
        <li className='my-5 m-auto w-100' style={location.pathname === "/contact" ? active : linkCss} onClick={()=>navigateLinks("contact")}>Contact</li>
      </ul>
    </div>
  );
};

export default MobileNavBar;