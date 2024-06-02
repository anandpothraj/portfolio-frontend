import data from '../SourceData/data.json';
import '../components/Projects/Projects.css';
import { GrPowerReset } from "react-icons/gr";
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import ProjectItem from '../components/Projects/ProjectItem';
import ProjectFilter from '../components/Projects/ProjectFilter';

const Projects = () => {

  const [ sortBy, setSortBy ] = useState("new");
  const [ projectType, setProjectType ] = useState("all");
  const [ projects, setProjects ] = useState(data.projects);

  const goToTop = () => {
    window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
  };

  const onFilterChange = () => {
    if (data.projects) {
      let filteredProjects = data.projects.filter((project) => {
        return projectType === "all" || project.type === projectType;
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
  }
  
  useEffect(() => {
    onFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ sortBy, projectType])

  useEffect(()=> {
    goToTop();
  },[]);

  return (
    <div className='col-11 col-md-9 my-3 mx-auto text-light'>
      <div className="d-block d-md-flex mb-3 mb-md-0">
        <h1 className='col-12 col-md-4 mb-3 mb-md-0'>Projects</h1>
        <ProjectFilter projects={projects} setProjects={setProjects} sortBy={sortBy} setSortBy={setSortBy} projectType={projectType} setProjectType={setProjectType}/>
        <Button className='d-none d-md-block' variant='warning' onClick={resetFilter}><GrPowerReset color='white'/></Button>
      </div>
      <div>
        <Row>
          { 
            projects.length > 0 ? 
            projects && projects.map((project, i) => {
                return (
                  <Col key={i} className="mt-3 mt-md-5" sm={6} md={6}>
                    <ProjectItem
                      title={project.title}
                      image={project.image}
                      repoName={project.repoName}
                      liveUrl={project.liveUrl}
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