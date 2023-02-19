import React from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { BsInfoCircleFill } from 'react-icons/bs';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';

const ProjectItem = (props) => {
  return (
    <div className="rounded shadow-lg bg-black m-auto my-3 w-75">
      <Image src={props.image} className='w-100 h-auto rounded-top'/>
      <div className='w-100 d-flex p-2 p-md-3'>
        <p className='w-50 my-auto'><b>{props.title}</b></p>
        <div className='w-50 d-flex justify-content-around'>
          {
            props.tech.map((tech) => (
              <OverlayTrigger
                key={tech.title}
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-top`}>{tech.title}</Tooltip>
                }
              >
              <img
                style={{ background: `${tech.bg}` }}
                src={tech.url}
                alt={tech.title}
                loading="lazy"
                className='techImage'
              />
              </OverlayTrigger>
            ))
          }
        </div>
      </div>
      <div className="w-100 d-flex p-2 p-md-3">
        <div className='w-50 d-flex'>
            <a href={props.repoName} target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><BsInfoCircleFill className='mx-2 logo2'/>Details</a>
        </div>
        <div className='w-50 d-flex'>
            <a href={props.liveUrl} target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><IoEyeSharp className='mx-2 logo2'/>Preview</a>
        </div>
      </div>
  </div>
  );
};

export default ProjectItem;