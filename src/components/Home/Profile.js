import './Home.css';
import React from 'react';
import { FaDev } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import data from '../../SourceData/data.json';
import { Button, Image } from 'react-bootstrap';
import TypeWriterEffect from 'react-typewriter-effect';
import Resume from '../../assets/documents/Anand_Pothraj_Resume.pdf';
import { BsTwitter, BsGithub, BsMedium, BsLinkedin, BsLink45Deg, BsDownload } from 'react-icons/bs';

const Profile = () => {

  return (
    <>
      <div className='m-auto col-12 col-md-9 d-flex text-light flex-column-reverse flex-md-row py-1 py-md-5'>
        <div className="w-100 w-md-50 m-auto p-2">
          <div className="center">
            <h5 className='my-2'>Hey!</h5>
            <h1 className='my-2'>I'm <b className='primaryOrange'>{data.home.profile.name}</b></h1>
            <div className="d-flex m-auto">
            <div className='my-2 primaryBlue d-inline-flex mx-auto mx-md-0'>
              <TypeWriterEffect
                startDelay={1000}
                cursorColor="#84a1ff"
                multiText={data.home.profile.designation}
                multiTextDelay={1000}
                typeSpeed={60}
                multiTextLoop
              />
            </div>
            </div>
            <p className='my-2 text-secondary font-weight-normal'>{data.home.profile.introBio}</p>
          </div>
          <div className="my-3 center">
            <p className='knowMore'>
              <Link to='/about' className='text-decoration-none'>
                <span className='primaryOrange'>Know more</span>
                <BsLink45Deg className='primaryOrange logo'/>
              </Link>
              <span className='text-secondary'>about me</span>
            </p>
            <div className="my-1 my-md-4">
                <h5 className='d-md-inline follow'>Follow Me</h5>
                <a href={data.home.profile.socials.linkedIn} target="_blank" rel="noreferrer"><BsLinkedin className="m-2 socialIcon"/></a>
                <a href={data.home.profile.socials.github} target="_blank" rel="noreferrer"><BsGithub className="m-1 m-md-2 socialIcon"/></a>
                <a href={data.home.profile.socials.twitter} target="_blank" rel="noreferrer"><BsTwitter className="m-2 socialIcon"/></a>
                <a href={data.home.profile.socials.devCommunity} target="_blank" rel="noreferrer"><FaDev className="m-2 socialIcon"/></a>
                <a href={data.home.profile.socials.medium} target="_blank" rel="noreferrer"><BsMedium className="m-2 socialIcon"/></a>
            </div>
          </div>
          <div className="my-3 p-1 btnDiv mx-auto mx-md-0">
              <Button className='emailBtn btn-sm' href={data.home.profile.mailTo}><FiMail className='mx-1 logo2'/>Email Me</Button>
              <Button className='resumeBtn btn-sm mx-0 mx-md-3' href={Resume} target="_blank" rel="noopener noreferrer"><BsDownload className='mx-1 logo2'/>Resume</Button>
              <button id="kollect-pay-btn" style={{padding:'5px 20px', borderRadius:'7px'}}>Pay using Kollect</button>
          </div>
        </div>
        <div className="w-75 w-md-50 m-auto my-1">
          <Image src={data.home.profile.images.avatar1} fluid alt="avatar1" className='d-block m-auto'/>
        </div>
      </div>
    </>
  );
};

export default Profile;