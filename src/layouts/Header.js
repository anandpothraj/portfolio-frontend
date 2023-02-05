import React from 'react';
import ContactPrompt from '../components/Header/ContactPrompt';
import NavigationBar from '../components/Header/NavigationBar';

const Header = () => {
  return (
    <div>
      <ContactPrompt/>
      <NavigationBar/>
    </div>
  );
};

export default Header;