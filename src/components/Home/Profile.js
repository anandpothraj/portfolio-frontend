import './Home.css';
import React from 'react';
import { FaDev } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import TypeWriterEffect from 'react-typewriter-effect';
import Avatar2 from '../../assets/images/Secondary.png';
import Resume from '../../assets/documents/Anand_Pothraj_Resume.pdf';
import { BsTwitter, BsGithub, BsMedium, BsLinkedin, BsLink45Deg, BsDownload } from 'react-icons/bs';

const Profile = () => {

  return (
    <>
      <div className='m-auto col-12 col-md-9 d-flex text-light flex-column-reverse flex-md-row py-1 py-md-5'>
        <div className="w-100 w-md-50 m-auto p-2">
          <div className="center">
            <h5 className='my-2'>Hey!</h5>
            <h1 className='my-2'>I'm <b className='primaryOrange'>Anand Pothraj</b></h1>
            <div className="d-flex m-auto">
            <div className='my-2 primaryBlue d-inline-flex mx-auto mx-md-0'>
              <TypeWriterEffect
                className="Anand"
                startDelay={1000}
                cursorColor="#84a1ff"
                multiText={[
                  "Full Stack Developer",
                  "OS Contributer",
                  "MERN Stack Developer"
                ]}
                multiTextDelay={1000}
                typeSpeed={60}
                multiTextLoop
              />
            </div>
            </div>
            <p className='my-2 text-secondary font-weight-normal'>I have a passion for technology</p>
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
                <a href="https://www.linkedin.com/in/anand-pothraj-599910195" target="_blank" rel="noreferrer"><BsLinkedin className="m-2 socialIcon"/></a>
                <a href="https://github.com/anandpothraj" target="_blank" rel="noreferrer"><BsGithub className="m-1 m-md-2 socialIcon"/></a>
                <a href='https://twitter.com/PothrajAnand' target="_blank" rel="noreferrer"><BsTwitter className="m-2 socialIcon"/></a>
                <a href="https://dev.to/anandpothraj" target="_blank" rel="noreferrer"><FaDev className="m-2 socialIcon"/></a>
                <a href="https://medium.com/@anandpothraj11052001" target="_blank" rel="noreferrer"><BsMedium className="m-2 socialIcon"/></a>
            </div>
          </div>
          <div className="my-3 p-1 btnDiv mx-auto mx-md-0">
              <Button className='emailBtn btn-sm' href="mailto:pothrajanand@gmail.com"><FiMail className='mx-1 logo2'/>Email Me</Button>
              <Button className='resumeBtn btn-sm mx-0 mx-md-3' href={Resume} target="_blank" rel="noopener noreferrer"><BsDownload className='mx-1 logo2'/>Resume</Button>
          </div>
        </div>
        <div className="w-75 w-md-50 m-auto my-1">
          <Image src={Avatar2} fluid alt="avatar1" className='d-block m-auto'/>
        </div>
      </div>
    </>
  );
};

export default Profile;