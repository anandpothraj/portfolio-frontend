import React from 'react';
import data from '../../SourceData/data.json';

const Services = () => {
  return (
    <div className='my-3 my-md-5'>
        <h2 className='textCenter colorOrange'>Services</h2>
        <div className="d-flex flex-column my-2 my-md-4">
          {
            data.about.services.map((service, i) => {
              return (
                <div className="w-100 w-md-75 rounded mx-auto my-md-3 my-1 py-3 skillDiv" key={i}>
                  <h3 className='text-center'>{service}</h3>
              </div>
              )
            })
          }
        </div>
    </div>
  );
};

export default Services;