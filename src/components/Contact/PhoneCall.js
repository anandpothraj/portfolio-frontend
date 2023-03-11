import React from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlinePhone } from 'react-icons/ai';

const PhoneCall = () => {
  return (
    <div className='h-50 d-flex justify-content-center align-items-center flex-column'>
      <p className='text-center' style={{fontWeight:"bold"}} >Make a phone call</p>
      <Button variant="outline-warning" className='phoneBtn' size='sm'>
        <a href="tel:8291229434" className='text-decoration-none text-warning phoneUrl'>
          Call <AiOutlinePhone className='phoneIcon'/>
        </a>
      </Button>
    </div>
  );
};

export default PhoneCall;