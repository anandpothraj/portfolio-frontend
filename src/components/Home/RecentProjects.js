import './Home.css';
import React from 'react';
import { TbApi } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';
import { Button, Image } from 'react-bootstrap';
import { FaReact, FaBootstrap } from 'react-icons/fa';
import RecentProject1 from '../../assets/images/RecentProject1.png';
import RecentProject2 from '../../assets/images/RecentProject2.png';
import { BsFillBarChartFill, BsInfoCircleFill } from 'react-icons/bs';

const RecentProjects = () => {
    
  return (
    <div className='text-light col-11 col-md-9 m-auto py-1'>
        <div className="d-flex justify-content-between my-1 my-md-4">
            <h1 className='primaryLightBlue w-50'>Recent Projects</h1>
            <Link to='/projects' className='my-auto'>
                <Button className='btn-sm px-md-3 py-md-2' variant='outline-warning'>View More</Button>
            </Link>
        </div>
        <div className="my-3 rounded py-1 d-flex flex-column flex-md-row">
            <div className="col-11 col-md-5 rounded shadow-lg bg-black m-auto my-3">
                <Image src={RecentProject1} className='w-100 h-auto rounded-top'/>
                <div className='w-100 d-flex p-2 p-md-3'>
                    <p className='w-50'><b>CryptoSwitch</b></p>
                    <div className='w-50 d-flex justify-content-around'>
                        <FaReact className='socialIcon'/>
                        <BsFillBarChartFill className='socialIcon'/>
                        <TbApi className='socialIcon'/>
                        <FaBootstrap className='socialIcon'/>
                    </div>
                </div>
                <div className="w-100 d-flex p-2 p-md-3">
                    <div className='w-50 d-flex'>
                        <a href="https://github.com/anandpothraj/CryptoSwitch" target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><BsInfoCircleFill className='mx-2 logo2'/>Details</a>
                    </div>
                    <div className='w-50 d-flex'>
                        <a href="https://anand-cryptoswitch.netlify.app/" target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><IoEyeSharp className='mx-2 logo2'/>Preview</a>
                    </div>
                </div>
            </div>
            <div className="col-11 col-md-5 rounded shadow-lg bg-black m-auto my-3">
                <Image src={RecentProject2} className='w-100 h-auto rounded-top'/>
                <div className='w-100 d-flex p-2 p-md-3'>
                    <p className='w-50'><b>NewsHut</b></p>
                    <div className='w-50 d-flex justify-content-around'>
                        <FaReact className='socialIcon'/>
                        <TbApi className='socialIcon'/>
                        <FaBootstrap className='socialIcon'/>
                    </div>
                </div>
                <div className="w-100 d-flex p-2 p-md-3">
                    <div className='w-50 d-flex'>
                        <a href="https://github.com/anandpothraj/newshut" target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><BsInfoCircleFill className='mx-2 logo2'/>Details</a>
                    </div>
                    <div className='w-50 d-flex'>
                        <a href="https://anand-newshut.netlify.app/" target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><IoEyeSharp className='mx-2 logo2'/>Preview</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RecentProjects;