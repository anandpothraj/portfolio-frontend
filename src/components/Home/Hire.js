import React from 'react';
import { Image } from 'react-bootstrap';
import data from '../../SourceData/data.json';

const Hire = () => {
  return (
    <div className='text-light col-12 col-md-9 m-auto p-0 py-md-3'>
      <h1 className='text-center hireText py-2'>Why Hire Me<span className='primaryOrange'>?</span></h1>
      <div className="d-flex flex-column flex-md-row text-center">
        {
          data.home.hire.strength.map((skills,i) => {
            return (
              <div className={skills.show?"w-75 m-auto m-md-2":"w-75 m-auto m-md-2 d-block d-md-none"} key={i}>
                <Image src={skills.image} fluid className='w-75 h-auto rounded'/>
                <div>
                  <h3 className='primaryBlue my-3'>{skills.title}</h3>
                  <p className='text-secondary'>{skills.subTitle}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Hire;