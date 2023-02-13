import React from 'react';

const Services = () => {
  return (
    <div className='my-3 my-md-5'>
        <h2 className='textCenter colorOrange'>Skills</h2>
        <div className="d-flex flex-column my-2 my-md-4">
            <div className="w-100 w-md-75 rounded mx-auto my-md-3 my-1 py-3 skillDiv">
                <h3 className='text-center'>Web Developer</h3>
            </div>
            <div className="w-100 w-md-75 rounded mx-auto my-md-3 my-1 py-3 skillDiv">
                <h3 className='text-center'>Technical Writer</h3>
            </div>
        </div>
    </div>
  );
};

export default Services;