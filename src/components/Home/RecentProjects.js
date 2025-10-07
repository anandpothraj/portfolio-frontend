import './Home.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';
import apiConfig from '../../config/api.json';
import { Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getServerUrl } from '../../config/env';
import { BsInfoCircleFill } from 'react-icons/bs';

const RecentProjects = () => {

  const serverUrl = getServerUrl();
  const [ projectType, setProjectType ] = useState('all');
  const [ recentProfessional, setRecentProfessional ] = useState([]);
  const [ recentPersonal, setRecentPersonal ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

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