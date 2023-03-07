import '../components/Contact/Contact.css';
import Meet from '../components/Contact/Meet';
import React, { useState, useEffect } from 'react';
import Success from '../components/Success/Success';
import Twitter from '../components/Contact/Twitter';
import PhoneCall from '../components/Contact/PhoneCall';
import FormComponent from '../components/Form/FormComponent';

const Contact = () => {
  const [ showSuccess, setShowSuccess ] = useState(false);

  const goToTop = () => {
    window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
  };

  useEffect(()=> {
    goToTop();
  },[]);

  return (
    <div className='contactBg col-11 col-md-9 m-auto rounded px-2 py-3 p-md-5 text-light my-2 my-md-5'>
      {
        showSuccess ? 
        <Success 
          thankyouText={"Thanks for reaching out to me!"} 
          subText={"It was a pleasure to receive your response. I will get back to you as soon as possible."}
        /> :
        <>
          <Twitter messageType={"I'd love to hear from you."}/>
          <div className="d-flex w-100 flexColumn m-auto">
            <FormComponent setShowSuccess={setShowSuccess} btnText={"Send Message"} btnVariant="outline-warning" placeholderText={"Message"} formType={"Message"} textColor={"text-danger"}/>
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