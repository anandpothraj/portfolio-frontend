import React from 'react';
import { Image } from 'react-bootstrap';
import Workaholic from '../../assets/images/Workaholic.gif';
import Communicative from '../../assets/images/Communicative.gif';
import Collaborative from '../../assets/images/Collaborative.gif';
import SelfMotivated from '../../assets/images/SelfMotivated.gif';

const Hire = () => {
  return (
    <div className='text-light col-12 col-md-9 m-auto p-0 py-md-3'>
      <h1 className='text-center hireText py-2'>Why Hire Me<span className='primaryOrange'>?</span></h1>
      <div className="d-flex flex-column flex-md-row text-center">
        <div className="w-75 m-auto m-md-4">
          <Image src={Communicative} fluid className='w-75 h-auto rounded'/>
          <div>
            <h3 className='primaryBlue my-3'>Communicative</h3>
            <p className='text-secondary'>I balance talking and listening hence ensuring effective communication.</p>
          </div>
        </div>
        <div className="w-75 m-auto m-md-4">
          <Image src={Collaborative} fluid className='w-75 h-auto rounded'/>
          <div>
            <h3 className='primaryBlue my-3'>Collaborative</h3>
            <p className='text-secondary'>Teamwork makes the dream work. Collaboration first, then work.</p>
          </div>
        </div>
        <div className="w-75 m-auto m-md-4 d-block d-md-none">
          <Image src={Workaholic} fluid className='w-75 h-auto rounded'/>
          <div>
            <h3 className='primaryBlue my-3'>Workaholic</h3>
            <p className='text-secondary'>I don't wait for deadlines, deadlines wait for me.</p>
          </div>
        </div>
        <div className="w-75 m-auto m-md-4">
          <Image src={SelfMotivated} fluid className='w-75 h-auto rounded'/>
          <div>
            <h3 className='primaryBlue my-3'>Self Motivated</h3>
            <p className='text-secondary'>I put myself into action to achieve my goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hire;