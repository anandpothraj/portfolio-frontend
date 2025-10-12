import './Home.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import apiConfig from '../../config/api.json';
import { Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getServerUrl } from '../../config/env';
import { BsInfoCircleFill } from 'react-icons/bs';
import { PiPlantFill } from "react-icons/pi";

const RecentProjects = () => {

  const serverUrl = getServerUrl();
  const [ projectType, setProjectType ] = useState('all');
  const [ recentProfessional, setRecentProfessional ] = useState([]);
  const [ recentPersonal, setRecentPersonal ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ showAllTech, setShowAllTech ] = useState({});

  const toggleShowAllTech = (projectId) => {
    setShowAllTech(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
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

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const url = `${serverUrl}${apiConfig.api.projects.FETCH_RECENTS_PROJECTS}`;
        const response = await axios.get(url);
        if (response.status === 200) {
          const payload = response.data;
          if (Array.isArray(payload)) {
            // If API ever returns a flat array, keep first 4
            setRecentProfessional(payload.filter(p => p.type === 'professional').slice(0,2));
            setRecentPersonal(payload.filter(p => p.type === 'personal').slice(0,2));
          } else if (payload && Array.isArray(payload.projects)) {
            const arr = payload.projects || [];
            setRecentProfessional(arr.filter(p => p.type === 'professional').slice(0,2));
            setRecentPersonal(arr.filter(p => p.type === 'personal').slice(0,2));
          } else if (payload && typeof payload === 'object') {
            const professionalList = Array.isArray(payload.professional)
              ? payload.professional
              : payload.professional
              ? [payload.professional]
              : [];
            const personalList = Array.isArray(payload.personal)
              ? payload.personal
              : payload.personal
              ? [payload.personal]
              : [];
            const professionalTwo = professionalList.slice(0,2);
            const personalTwo = personalList.slice(0,2);
            setRecentProfessional(professionalTwo);
            setRecentPersonal(personalTwo);
          } else {
            setRecentProfessional([]);
            setRecentPersonal([]);
          }
        } else {
          setRecentProfessional([]);
          setRecentPersonal([]);
        }
      } catch (e) {
        setRecentProfessional([]);
        setRecentPersonal([]);
      } finally {
        setIsLoading(false);
      }
    };
    // fetchRecent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProjects = (() => {
    if (projectType === 'professional') return recentProfessional; // up to 2
    if (projectType === 'personal') return recentPersonal; // up to 2
    // 'all' => exactly 1 professional + 1 personal when available
    const oneProfessional = recentProfessional[0] ? [recentProfessional[0]] : [];
    const onePersonal = recentPersonal[0] ? [recentPersonal[0]] : [];
    return [...oneProfessional, ...onePersonal];
  })();

  return (
    <div className='text-light col-11 col-md-9 m-auto py-1'>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 my-1 my-md-4 recent-header">
            <h1 className='primaryLightBlue flex-grow-1 mb-0'>Recent Projects</h1>
            <div className="d-flex align-items-center gap-2 recent-type order-2 order-md-1">
                <label htmlFor="projectType" className="my-auto">Type:</label>
                <select
                    id="projectType"
                    className="form-select form-select-sm"
                    value={projectType}
                    onChange={e => setProjectType(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="professional">Professional</option>
                    <option value="personal">Personal</option>
                </select>
            </div>
            <Link to='/projects' className='my-auto order-3'>
                <Button className='btn-sm px-3 py-2 px-md-3 py-md-2' size='sm' variant='outline-warning'>View More</Button>
            </Link>
        </div>
        <div className="my-3 rounded py-1 d-flex flex-column flex-md-row">
            {
                isLoading ? (
                  <p className='text-secondary m-auto'>Loading...</p>
                ) : filteredProjects.length === 0 ? (
                  <p className='text-secondary m-auto'>No recent projects found.</p>
                ) : filteredProjects.map(( project, i) => {
                    return (
                        <div className="col-12 col-md-5 rounded shadow-lg bg-black m-auto my-3 recent-card" key={i}>
                            <div className='position-relative overflow-hidden rounded-top'>
                                <Image src={project.image} className='w-100 h-auto'/>
                                <div className='position-absolute top-0 end-0 m-2 project-badge'>
                                  <div className='position-absolute top-0 end-0 m-2' style={{ backgroundColor: 'black', borderRadius: '8px', padding: '2px 6px' }}>
                                    <div
                                      style={{
                                        color: project.type === 'professional' ? '#28e745' : '#ffc107',
                                        borderRadius: '6px',
                                        padding: '2px 8px',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        textTransform: 'capitalize'
                                      }}
                                    >
                                      {project.type}
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div className='w-100 p-2 p-md-3'>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <p className='mb-0'><b>{project.title}</b></p>
                                    {project.techs.length > 5 && (
                                        <Button
                                            variant="outline-light"
                                            size="sm"
                                            className="tech-show-more-btn"
                                            onClick={() => toggleShowAllTech(project._id)}
                                            style={{ 
                                                fontSize: '10px', 
                                                padding: '4px 8px',
                                                minWidth: 'auto',
                                                border: '1px solid rgba(255,255,255,0.3)',
                                                background: 'transparent'
                                            }}
                                        >
                                            {showAllTech[project._id] ? (
                                                <>
                                                    <FaChevronUp size={8} className="me-1" />
                                                    Less
                                                </>
                                            ) : (
                                                <>
                                                    <FaChevronDown size={8} className="me-1" />
                                                    +{project.techs.length - 5}
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                                <div className='tech-stack-grid'>
                                    {
                                        (showAllTech[project._id] ? project.techs : project.techs.slice(0, 5)).map((tech, i) => {
                                            return (
                                                <OverlayTrigger
                                                    key={tech.title}
                                                    placement="top"
                                                    overlay={
                                                    <Tooltip id={`tooltip-top`}>{tech.title}</Tooltip>
                                                    }
                                                >
                                                    <div className='tech-icon-wrapper'>
                                                        <img
                                                            src={tech.url}
                                                            alt={tech.title}
                                                            loading="lazy"
                                                            className='tech-stack-icon'
                                                        />
                                                    </div>
                                                </OverlayTrigger>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="w-100 d-flex p-2 p-md-3">
                                <div className='w-50 d-flex'>
                                    {project.type === 'personal' && (
                                        <a href={project.repoName} target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><BsInfoCircleFill className='mx-2 logo2'/>Details</a>
                                    )}
                                    {project.type === 'professional' && (
                                        <a href={project.repoName} target="_blank" rel="noopener noreferrer" className='mx-auto text-decoration-none text-light'><PiPlantFill className='mx-2 logo2'/>Associated with {getCompanyName(project.repoName)}</a>
                                    )}
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