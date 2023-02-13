import React from 'react';
import '../components/Contact/Contact.css';
import Twitter from '../components/Contact/Twitter';
import ContactForm from '../components/Contact/ContactForm';
import Meet from '../components/Contact/Meet';

const Contact = () => {
  return (
    <div className='contactBg col-11 col-md-9 m-auto rounded px-2 py-3 p-md-5 text-light my-2 my-md-5'>
      <Twitter/>
      <div className="d-flex w-100 flexColumn m-auto">
        <ContactForm/>
        <Meet/>
      </div>
    </div>
  );
};

export default Contact;