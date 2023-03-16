import './Contact.css';
import React from 'react';
import data from '../../SourceData/data.json';

const Twitter = (props) => {
  return (
    <div className='text-center'>
      <h1 className={props.textColor}>{props.messageType}</h1>
      <p className='mt-4'>Just a quick chat? - DM me on Twitter 
        <a href={data.contact.twitterLink} target="_blank" rel="noreferrer" className='twitterId'>
          {data.contact.twitterUserName}
        </a>
      </p>
    </div>
  );
};

export default Twitter;