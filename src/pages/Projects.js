import axios from 'axios';
import data from '../SourceData/data.json';
import '../components/Projects/Projects.css';
import { GrPowerReset } from "react-icons/gr";
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import ProjectItem from '../components/Projects/ProjectItem';
import ProjectFilter from '../components/Projects/ProjectFilter';
import apiConfig from '../config/api.json';
import { getServerUrl } from '../config/env';

const Projects = () => {

  const serverUrl = getServerUrl();
  const [ sortBy, setSortBy ] = useState("new");
  const [ projectType, setProjectType ] = useState("all");
  const [ projectKind, setProjectKind ] = useState("all");
  const [ projects, setProjects ] = useState([]);
  const [ allProjects, setAllProjects ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  const goToTop = () => {
    window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
  };

  const onFilterChange = () => {
    if (allProjects) {
      let filteredProjects = allProjects.filter((project) => {
        const stackMatches = projectType === "all" || project.stack === projectType;
        const typeMatches = projectKind === "all" || project.type === projectKind;
        return stackMatches && typeMatches;
      });
      if(sortBy === "old"){
        filteredProjects = filteredProjects.slice().reverse();
      }
      setProjects(filteredProjects);
    }
  };

  const resetFilter = () => {
    setSortBy("new");
    setProjectType("all");
    setProjectKind("all");
  }
  
  useEffect(() => {
    onFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ sortBy, projectType, projectKind, allProjects])

  useEffect(()=> {
    goToTop();
  },[]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const url = `${serverUrl}${apiConfig.api.projects.FETCH_ALL_PROJECTS}`;
        const response = await axios.get(url);
        if (response.status === 200 && Array.isArray(response.data)) {
          setAllProjects(response.data);
          setProjects(response.data);
        } else if (response.status === 200 && response.data && Array.isArray(response.data.projects)) {
          setAllProjects(response.data.projects);
          setProjects(response.data.projects);
        } else {
          setAllProjects(data.projects || []);
          setProjects(data.projects || []);
        }
      } catch (e) {
        setAllProjects(data.projects || []);
        setProjects(data.projects || []);
      } finally {
        setIsLoading(false);
      }
    };
    // fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='col-11 col-md-9 my-3 mx-auto text-light'>
      <div className="d-flex align-items-center justify-content-between flex-nowrap mb-3 mb-md-0">
        <h1 className='mb-3 mb-md-0'>Projects</h1>
        <ProjectFilter projects={projects} setProjects={setProjects} sortBy={sortBy} setSortBy={setSortBy} projectType={projectType} setProjectType={setProjectType} projectKind={projectKind} setProjectKind={setProjectKind}/>
        <Button className='d-none d-md-block mx-2' variant='warning' onClick={resetFilter}><GrPowerReset color='white'/></Button>
      </div>
      <div>
        <Row>
          { 
            isLoading ? (
              <Container className='my-5'><p className='text-secondary'>Loading projects...</p></Container>
            ) : projects.length > 0 ? 
            projects && projects.map((project, i) => {
                return (
                  <Col key={i} className="mt-3 mt-md-5" sm={6} md={6}>
                    <ProjectItem
                      title={project.title}
                      image={project.image}
                      repoName={project.repoName}
                      liveUrl={project.liveUrl}
                      type={project.type}
                      tech={project.techs}
                      desc={project.desc}
                    />
                  </Col>
                );
            }) 
            :
            <Container className='my-5'>
              <h1 className='text-warning'>No results for {projectType} projects!</h1>
              <hr/>
              <Button variant="outline-success" className='my-2' size='sm' onClick={resetFilter}>Explore other projects</Button>
            </Container>
          }
        </Row>
      </div>
    </div>
  );
};

export default Projects;