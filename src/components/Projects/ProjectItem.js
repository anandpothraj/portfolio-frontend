import { BsGithub } from 'react-icons/bs';
import { IoEyeSharp } from 'react-icons/io5';
import { PiPlantFill } from "react-icons/pi";
import React, { useRef, useState } from 'react';
import { Image, OverlayTrigger, Tooltip, Badge } from 'react-bootstrap';

const ProjectItem = (props) => {

  const hoverRef = useRef(null);
  const [ hovered, setHovered ] = useState(false);
  const [ showDesc, setShowDesc ] = useState(false);

  const handleMouseEnter = () => {
    setShowDesc(true);
    setHovered(true);
  };
  
  const handleMouseLeave = () => {
    setShowDesc(false);
    setHovered(false);
  };
  
  
  return (
    <div 
      ref={hoverRef} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{cursor:"pointer", position: 'relative'}} 
      className="rounded shadow-lg bg-black m-auto projectItem"
    >
      {
        showDesc && <div className='projectItemDesc' style={{color:"white"}}>
          <Badge className='my-2' bg="warning" text="dark">Description</Badge>
          <br/>
          <b>{props.title} </b> 
          {props.desc}
        </div>
      }
      <div className='position-relative'>
        <Image 
          src={props.image} 
          className={`w-100 h-auto rounded-top projectItemImage ${hovered ? 'hovered' : ''}`} 
        />
        {props.type && (
          <div className='position-absolute top-0 end-0 m-2' style={{ backgroundColor: 'black', borderRadius: '8px', padding: '2px 6px' }}>
            <div
              style={{
                color: props.type === 'professional' ? '#28e745' : '#ffc107',
                borderRadius: '6px',
                padding: '2px 8px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'capitalize'
              }}
            >
              {props.type}
            </div>
          </div>
        )}
      </div>

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
                className='techStackImage'
              />
              </OverlayTrigger>
            ))
          }
        </div>
      </div>
      <div className="w-100 d-flex p-2 p-md-3">
        <div className='w-50 d-flex'>
          {props.type === 'personal' && (
            <a href={props.repoName} target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><BsGithub className='mx-2 logo2'/>Code</a>
          )}
          {props.type === 'professional' && (
            <a href={props.repoName} target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><PiPlantFill className='mx-2 logo2'/>Source</a>
          )}
        </div>
        <div className='w-50 d-flex'>
          <a href={props.liveUrl} target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><IoEyeSharp className='mx-2 logo2'/>Preview</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;