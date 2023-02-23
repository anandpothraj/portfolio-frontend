import React from 'react';
import { Image } from 'react-bootstrap';
import { GrSend } from 'react-icons/gr';

const Socials = () => {
  return (
    <div className='col-11 col-md-9 my-3 mx-auto text-light bg-primary'>
        <h1>Want to connect me?</h1>
        <p>Please follow the links.</p>
        <div className="col-11 col-md-6 rounded bg-secondary d-flex m-auto py-1 my-3">
            <div className="w-25 d-flex">
                <Image src='https://res.cloudinary.com/de3bkua6f/image/upload/v1677071293/75027034_epigx7.png' className='w-75 h-auto rounded-circle m-auto'/>
            </div>
            <div className="w-75 m-auto">
            <h5 class="text-center">Anand Pothraj</h5>
                <div className='d-flex justify-content-center align-items-center'>
                    <span>LinkedIn</span>
                    <button><GrSend/></button>
                </div>
            </div>
        </div>
        <div className="col-11 col-md-6 rounded bg-secondary d-flex m-auto py-1 my-3">
            <div className="w-25 d-flex">
                <Image src='https://res.cloudinary.com/de3bkua6f/image/upload/v1677071293/75027034_epigx7.png' className='w-75 h-auto rounded-circle m-auto'/>
            </div>
            <div className="w-75 m-auto">
            <h5 class="text-center">Anand Pothraj</h5>
                <div className='d-flex justify-content-center align-items-center'>
                    <span>LinkedIn</span>
                    <button><GrSend/></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Socials;