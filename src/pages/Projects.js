import React, { useEffect } from 'react';
import data from '../SourceData/data.json';
import { Col, Row } from 'react-bootstrap';
import '../components/Projects/Projects.css';
import ProjectItem from '../components/Projects/ProjectItem';

const Projects = () => {

  const goToTop = () => {
    window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
  };

  useEffect(()=> {
    goToTop();
  },[]);

  return (
    <div className='col-11 col-md-9 my-3 mx-auto text-light'>
      <h1 className='textCenter'>Projects</h1>
      <div>
        <Row>
        {data.projects &&
          data.projects.map((project, i) => {
            return (
              <Col key={i} className="mt-3 mt-md-5" sm={6} md={6}>
                <ProjectItem
                  title={project.title}
                  image={project.image}
                  repoName={project.repoName}
                  liveUrl={project.liveUrl}
                  tech={project.techs}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Projects;