import './Home.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';
import data from '../../SourceData/data.json';
import { Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsInfoCircleFill } from 'react-icons/bs';

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
            {
                data.home.recentProjects.projects.map(( project, i) => {
                    return (
                        <div className="col-11 col-md-5 rounded shadow-lg bg-black m-auto my-3" key={i}>
                            <Image src={project.projectImage} className='w-100 h-auto rounded-top'/>
                            <div className='w-100 d-flex p-2 p-md-3'>
                                <p className='w-50'><b>{project.projectName}</b></p>
                                <div className='w-50 d-flex justify-content-around'>
                                    {
                                        project.techStack.map((tech, i) => {
                                            return (
                                                <OverlayTrigger
                                                    key={tech.title}
                                                    placement="top"
                                                    overlay={
                                                    <Tooltip id={`tooltip-top`}>{tech.title}</Tooltip>
                                                    }
                                                >
                                                <img
                                                    src={tech.url}
                                                    alt={tech.title}
                                                    loading="lazy"
                                                    className='techStackImage'
                                                />
                                                </OverlayTrigger>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="w-100 d-flex p-2 p-md-3">
                                <div className='w-50 d-flex'>
                                    <a href={project.projectRepo} target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><BsInfoCircleFill className='mx-2 logo2'/>Details</a>
                                </div>
                                <div className='w-50 d-flex'>
                                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><IoEyeSharp className='mx-2 logo2'/>Preview</a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  );
};

export default RecentProjects;