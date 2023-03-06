import React, { useState, useEffect } from 'react';
import '../components/Contact/Contact.css';
import Twitter from '../components/Contact/Twitter';
import ContactForm from '../components/Contact/ContactForm';
import Meet from '../components/Contact/Meet';
import Success from '../components/Success/Success';
import PhoneCall from '../components/Contact/PhoneCall';

const Contact = () => {
  const [ contacted, setContacted ] = useState(true);

  const goToTop = () => {
    window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
  };

  useEffect(()=> {
    goToTop();
  },[]);

  return (
    <div className='contactBg col-11 col-md-9 m-auto rounded px-2 py-3 p-md-5 text-light my-2 my-md-5'>
      {
        contacted ? 
        <Success 
          thankyouText={"Thanks for reaching out to me!"} 
          subText={"It was a pleasure to receive your response. I will get back to you as soon as possible."}
        /> :
        <>
          <Twitter/>
          <div className="d-flex w-100 flexColumn m-auto">
            <ContactForm setContacted={setContacted}/>
            <div className="d-flex flex-column">
              <PhoneCall/>
              <Meet/>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default Contact;