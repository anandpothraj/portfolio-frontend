import React from 'react';
import { FaDev } from 'react-icons/fa';
import { Button, Image } from 'react-bootstrap';
import { BsTwitter, BsGithub, BsMedium, BsLinkedin } from 'react-icons/bs';
import Avatar from '../../assets/images/Third.png';
import { Link } from 'react-router-dom';

const AboutInfo = () => {
  return (
    <div className='d-flex my-2 flex-column flex-md-row textCenter'>
        <div className="w-100 w-md-50 m-auto">
          <Image src={Avatar} fluid alt="avatar1" className='d-block m-auto h-100 imgWidth'/>
        </div>
        <div className="w-100 w-md-50 m-auto p-2 p-md-4">
            <div className='my-1 my-md-2'>
                <h1>Anand Pothraj</h1>
                <p className='text-secondary font-weight-normal'>Full Stack Developer, technical writer, and a passionate learner.
                </p>
            </div>
            <div className='my-1 my-md-2'>
                <h6>Email Me</h6>
                <Button className='btn-sm bgBlueGreen border-none rounded' href="mailto:pothrajanand@gmail.com">pothrajanand@gmail.com</Button>  
            </div>
            <div className='my-2 my-md-4 w-75 d-flex flex-md-row mx-auto mx-md-0 flex-column'>
                <div className='d-flex justify-content-center'>
                    <Link to='/projects' className='my-auto'>
                        <Button className='btn-sm px-2 py-1 bgOrange border-none rounded my-1 mx-2'>Projects</Button>
                    </Link>
                    <Link to='/blogs' className='my-auto '>
                        <Button className='btn-sm px-2 py-1 bgLightBlue border-none rounded my-1 mx-2'>Blogs</Button>
                    </Link>
                </div>
                <div className='d-flex justify-content-center'>
                    <Link to='/contact' className='my-auto'>
                        <Button className='btn-sm px-2 py-1 bgYellow border-none rounded my-1 mx-2'>Contact</Button>
                    </Link><Link to='/profiles' className='my-auto'>
                        <Button className='btn-sm px-2 py-1 bgBlueGreen border-none rounded my-1 mx-2'>Profiles</Button>
                    </Link>
                </div>
            </div>
            <div className="my-1 my-md-4 d-flex mAuto">
                <h5 className='d-none d-md-block d-md-inline follow my-auto'>Follow Me</h5>
                <a href="https://www.linkedin.com/in/anand-pothraj-599910195" target="_blank" rel="noreferrer"><BsLinkedin className="m-2 socialIcon"/></a>
                <a href="https://github.com/anandpothraj" target="_blank" rel="noreferrer"><BsGithub className="m-2 socialIcon"/></a>
                <a href='https://twitter.com/PothrajAnand' target="_blank" rel="noreferrer"><BsTwitter className="m-2 socialIcon"/></a>
                <a href="https://dev.to/anandpothraj" target="_blank" rel="noreferrer"><FaDev className="m-2 socialIcon"/></a>
                <a href="https://medium.com/@anandpothraj11052001" target="_blank" rel="noreferrer"><BsMedium className="m-2 socialIcon"/></a>
            </div>
        </div>
    </div>
  )
}

export default AboutInfo;