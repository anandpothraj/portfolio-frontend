import React from 'react';
import './Contact.css';
import data from '../../SourceData/data.json';

const Twitter = () => {
  return (
    <div className='text-center'>
       <h1>I'd love to hear from you.</h1>
       <p>Just a quick chat? - DM me on Twitter <a href={data.contact.twitterLink} target="_blank" rel="noreferrer" className='twitterId'>{data.contact.twitterUserName}</a></p>
    </div>
  );
};

export default Twitter;