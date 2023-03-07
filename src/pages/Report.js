import '../components/Contact/Contact.css';
import React, { useState, useEffect } from 'react';
import Twitter from '../components/Contact/Twitter';
import Success from '../components/Success/Success';
import FormComponent from '../components/Form/FormComponent';

const Report = () => {
  const [ showSuccess, setShowSuccess ] = useState(false);

  const goToTop = () => {
    window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
  };

  useEffect(()=> {
    goToTop();
  },[]);

  return (
    <div className='bg-black col-11 col-md-9 m-auto rounded px-2 py-3 p-md-5 text-light my-2 my-md-5'>
      {
        showSuccess ? 
        <Success 
          thankyouText="Thanks for Reporting an issue!"
          subText="We have recieved your issue and try to fix it as soon as possible!"
        /> :
        <>
          <Twitter messageType="Report an issue!" textColor="text-danger"/>
          <div className="d-flex w-100 flexColumn m-auto">
            <FormComponent btnText="Report Issue" btnVariant="outline-danger" placeholderText="Report Message" formType="Report" setShowSuccess={setShowSuccess} requestType="sendReport"/>
          </div>
        </>
      }
    </div>
  );
};

export default Report;