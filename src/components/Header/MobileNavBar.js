import React from 'react';
import './MobileNavBar.css';

const MobileNavBar = () => {
  return (
    <div className='mobileNavBar d-flex justify-content-center'>
      <ul className='m-auto text-center d-flex flex-column p-0'>
        <li className='my-5 m-auto w-100'><a href="/projects" className='text-white text-decoration-none'>Projects</a></li>
        <li className='my-5 m-auto w-100'><a href="/blogs" className='text-white text-decoration-none'>Blogs</a></li>
        <li className='my-5 m-auto w-100'><a href="/about" className='text-white text-decoration-none'>About</a></li>
        <li className='my-5 m-auto w-100'><a href="/contact" className='text-white text-decoration-none'>Contact</a></li>
      </ul>
    </div>
  );
};

export default MobileNavBar;