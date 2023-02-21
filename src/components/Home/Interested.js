import React from 'react';
import './Home.css';
import { FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import data from '../../SourceData/data.json';

const Interested = () => {
  return (
    <div className='interestedBg col-11 col-md-9 mx-auto rounded d-flex text-light p-2 p-md-5 d-flex justify-content-around my-2'>
        <div className="col-5 col-md-3 d-flex"><h2 className='m-auto interestedText'>{data.home.interested.interestedText}</h2></div>
        <div className="col-6 col-md-9 d-flex flex-column flex-md-row justify-content-around">
            <Button className='bg-white text-dark border-none my-2 mx-auto m-md-auto hoverGrey' href={data.home.interested.email}><FiMail className='mx-2 logo2'/>Email Me</Button>
            <Button className='seeMoreBtn my-2 mx-auto m-md-auto'><Link to='/projects' className='text-decoration-none text-white hoverBlack'><b>See More Projects</b></Link></Button>
        </div>
    </div>
  );
};

export default Interested;