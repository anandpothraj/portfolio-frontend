import '../components/Contact/Contact.css';
import React, { useState, useEffect } from 'react';
import Twitter from '../components/Contact/Twitter';
import Success from '../components/Success/Success';
import FormComponent from '../components/Form/FormComponent';

const Feedback = () => {
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
          thankyouText="Thanks for valueable feedback!"
          subText="It was a pleasure to receive your feedback. We work on your feedback as soon as!"
        /> :
        <>
          <Twitter messageType="Share your experience!" textColor="text-success"/>
          <div className="d-flex w-100 flexColumn m-auto">
            <FormComponent btnText="Send Feedback" btnVariant="outline-success" placeholderText="Feedback Message" formType="Feedback" setShowSuccess={setShowSuccess} textColor="text-light" requestType="sendFeedback"/>
          </div>
        </>
      }
    </div>
  );
};

export default Feedback;