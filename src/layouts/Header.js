import React, { useState } from 'react';
import MobileNavBar from '../components/Header/MobileNavBar';
import ContactPrompt from '../components/Header/ContactPrompt';
import NavigationBar from '../components/Header/NavigationBar';

const Header = () => {

  const [ showMenuBar, setShowMenuBar ] = useState(false);

  return (
    <div>
      <ContactPrompt/>
      <NavigationBar showMenuBar={showMenuBar} setShowMenuBar={setShowMenuBar}/>
      {showMenuBar ? <MobileNavBar/> : null} 
    </div>
  );
};

export default Header;