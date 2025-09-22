import './Home.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';
import data from '../../SourceData/data.json';
import { Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsInfoCircleFill } from 'react-icons/bs';

const RecentProjects = () => {

  const [ projectType, setProjectType ] = useState('professional');

  // Filter projects based on selected type and limit to 2
  const filteredProjects = data.projects
    .filter(project => project.type === projectType)
    .slice(0, 2);

  return (
    <div className='text-light col-11 col-md-9 m-auto py-1'>
        <div className="d-flex justify-content-between my-1 my-md-4">
            <h1 className='primaryLightBlue w-50'>Recent Projects</h1>
            <div className="d-flex align-items-center">
                <label htmlFor="projectType" className="me-2 my-auto">Type:</label>
                <select
                    id="projectType"
                    className="form-select form-select-sm"
                    style={{ width: '130px' }}
                    value={projectType}
                    onChange={e => setProjectType(e.target.value)}
                >
                    <option value="professional">Professional</option>
                    <option value="personal">Personal</option>
                </select>
            </div>
            <Link to='/projects' className='my-auto'>
                <Button className='btn-sm px-md-3 py-md-2' variant='outline-warning'>View More</Button>
            </Link>
        </div>
        <div className="my-3 rounded py-1 d-flex flex-column flex-md-row">
            {
                filteredProjects.map(( project, i) => {
                    return (
                        <div className="col-11 col-md-5 rounded shadow-lg bg-black m-auto my-3" key={i}>
                            <Image src={project.image} className='w-100 h-auto rounded-top'/>
                            <div className='w-100 d-flex p-2 p-md-3'>
                                <p className='w-50'><b>{project.title}</b></p>
                                <div className='w-50 d-flex justify-content-around'>
                                    {
                                        project.techs.map((tech, i) => {
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
                                    <a href={project.repoName} target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><BsInfoCircleFill className='mx-2 logo2'/>Details</a>
                                </div>
                                <div className='w-50 d-flex'>
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><IoEyeSharp className='mx-2 logo2'/>Preview</a>
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