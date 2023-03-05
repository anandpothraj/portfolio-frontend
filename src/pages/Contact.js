import React, { useState, useEffect } from 'react';
import '../components/Contact/Contact.css';
import Twitter from '../components/Contact/Twitter';
import ContactForm from '../components/Contact/ContactForm';
import Meet from '../components/Contact/Meet';
import ContactedSuccess from '../components/Contact/ContactedSuccess';

const Contact = () => {
  const [ contacted, setContacted ] = useState(false);

  const goToTop = () => {
    window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
  };

  useEffect(()=> {
    goToTop();
  },[]);

  return (
    <div className='contactBg col-11 col-md-9 m-auto rounded px-2 py-3 p-md-5 text-light my-2 my-md-5'>
      {
        contacted ? <ContactedSuccess/> :
        <>
          <Twitter/>
          <div className="d-flex w-100 flexColumn m-auto">
            <ContactForm setContacted={setContacted}/>
            <Meet/>
          </div>
        </>
      }
    </div>
  );
};

export default Contact;