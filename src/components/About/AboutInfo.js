import React from 'react';
import { FaDev } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import data from '../../SourceData/data.json';
import { Button, Image } from 'react-bootstrap';
import { BsTwitter, BsGithub, BsMedium, BsLinkedin } from 'react-icons/bs';

const AboutInfo = () => {
  return (
    <div className='d-flex my-2 flex-column flex-md-row textCenter'>
        <div className="w-100 w-md-50 m-auto">
          <Image src={data.about.aboutInfo.aboutImage} fluid alt="avatar1" className='d-block m-auto h-100 imgWidth'/>
        </div>
        <div className="w-100 w-md-50 m-auto p-2 p-md-4">
            <div className='my-1 my-md-2'>
                <h1>{data.about.aboutInfo.name}</h1>
                <p className='text-secondary font-weight-normal'>{data.about.aboutInfo.intro}</p>
            </div>
            <div className='my-1 my-md-2'>
                <h6>Email Me</h6>
                <Button className='btn-sm bgBlueGreen border-none rounded' href={data.about.aboutInfo.email}>pothrajanand@gmail.com</Button>  
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
                    </Link><Link to='/socials' className='my-auto'>
                        <Button className='btn-sm px-2 py-1 bgBlueGreen border-none rounded my-1 mx-2'>Socials</Button>
                    </Link>
                </div>
            </div>
            <div className="my-1 my-md-4 d-flex mAuto">
                <h5 className='d-none d-md-block d-md-inline follow my-auto'>Follow Me</h5>
                <a href={data.about.aboutInfo.socials.linkedIn} target="_blank" rel="noreferrer"><BsLinkedin className="m-2 socialIcon"/></a>
                <a href={data.about.aboutInfo.socials.github}  target="_blank" rel="noreferrer"><BsGithub className="m-2 socialIcon"/></a>
                <a href={data.about.aboutInfo.socials.twitter}  target="_blank" rel="noreferrer"><BsTwitter className="m-2 socialIcon"/></a>
                <a href={data.about.aboutInfo.socials.devCommunity}  target="_blank" rel="noreferrer"><FaDev className="m-2 socialIcon"/></a>
                <a href={data.about.aboutInfo.socials.medium}  target="_blank" rel="noreferrer"><BsMedium className="m-2 socialIcon"/></a>
            </div>
        </div>
    </div>
  )
}

export default AboutInfo;