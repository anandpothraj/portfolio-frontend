import { BsGithub } from 'react-icons/bs';
import { IoEyeSharp } from 'react-icons/io5';
import { PiPlantFill } from "react-icons/pi";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import React, { useRef, useState } from 'react';
import { Image, OverlayTrigger, Tooltip, Badge, Button } from 'react-bootstrap';

const ProjectItem = (props) => {

  const hoverRef = useRef(null);
  const [ hovered, setHovered ] = useState(false);
  const [ showDesc, setShowDesc ] = useState(false);
  const [ showAllTech, setShowAllTech ] = useState(false);

  const handleMouseEnter = () => {
    setShowDesc(true);
    setHovered(true);
  };
  
  const handleMouseLeave = () => {
    setShowDesc(false);
    setHovered(false);
  };

  const getCompanyName = (companyUrl) => {
    let companyName = companyUrl;
    if (companyName.includes('://')) {
      companyName = companyName.split('://')[1];
    }
    if (companyName.startsWith('www.')) {
      companyName = companyName.substring(4);
    }
    companyName = companyName.split('.')[0];

    companyName = companyName
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    return companyName;
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

      <div className='w-100 p-2 p-md-3'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <p className='mb-0'><b>{props.title}</b></p>
          {props.tech.length > 5 && (
            <Button
              variant="outline-light"
              size="sm"
              className="tech-show-more-btn"
              onClick={() => setShowAllTech(!showAllTech)}
              style={{ 
                fontSize: '10px', 
                padding: '4px 8px',
                minWidth: 'auto',
                border: '1px solid rgba(255,255,255,0.3)',
                background: 'transparent'
              }}
            >
              {showAllTech ? (
                <>
                  <FaChevronUp size={8} className="me-1" />
                  Less
                </>
              ) : (
                <>
                  <FaChevronDown size={8} className="me-1" />
                  +{props.tech.length - 5}
                </>
              )}
            </Button>
          )}
        </div>
        <div className='tech-stack-grid mt-2'>
          {
            (showAllTech ? props.tech : props.tech.slice(0, 5)).map((tech) => (
              <OverlayTrigger
                key={tech.title}
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-top`}>{tech.title}</Tooltip>
                }
              >
                <div className='tech-icon-wrapper'>
                  <img
                    style={{ background: `${tech.bg}` }}
                    src={tech.url}
                    alt={tech.title}
                    loading="lazy"
                    className='tech-stack-icon'
                  />
                </div>
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
            <a href={props.repoName} target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><PiPlantFill className='mx-2 logo2'/>Associated with {getCompanyName(props.repoName)}</a>
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