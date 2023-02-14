import React from 'react';
// import MobileNavBar from '../components/Header/MobileNavBar';
import ContactPrompt from '../components/Header/ContactPrompt';
import NavigationBar from '../components/Header/NavigationBar';

const Header = () => {
  return (
    <div>
      <ContactPrompt/>
      <NavigationBar/>
      {/* <MobileNavBar/> */}
    </div>
  );
};

export default Header;