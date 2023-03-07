import React from 'react';
import { Link } from 'react-router-dom';

const Support = () => {
  return (
    <div className='my-5 textCenter text-light'>
      <h2>Want to support me?</h2>
      <p>Follow me on <span><Link to="/socials" className='colorOrange text-decoration-none'>socials</Link></span> :)</p>
    </div>
  );
};

export default Support;