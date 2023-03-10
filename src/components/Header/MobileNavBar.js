import React from 'react';
import './MobileNavBar.css';
import data from '../../SourceData/data.json';
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
      <ul className='m-auto text-center d-flex flex-column p-0' style={{maxHeight:"80vh"}}>
        {data.header.navLink.map((link, i) => {
          return(
            <li className='my-4 m-auto' key={i} style={location.pathname === link.path ? active : linkCss} onClick={()=>navigateLinks(link.navigate)}>{link.title}</li>
          )
        })}
      </ul>
    </div>
  );
};

export default MobileNavBar;