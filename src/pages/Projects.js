import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../components/Projects/Projects.css';
import ProjectItem from '../components/Projects/ProjectItem';

const Projects = () => {

  const projects = [
    {
      "title":"NewsHut",
      "image":"https://res.cloudinary.com/de3bkua6f/image/upload/v1676723121/gxorvwgsbdpjolcivtpp.png",
      "repoName":"https://github.com/anandpothraj/newshut",
      "liveUrl":"https://anand-newshut.netlify.app/",
      "techs": [
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          title: "React",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
          title: "Bootstrap",
        },
      ]
    },
    {
      "title":"Crypto Switch",
      "image":"https://res.cloudinary.com/de3bkua6f/image/upload/v1676723074/htpyrnd1lyylgfijomz5.png",
      "repoName":"https://github.com/anandpothraj/cryptoswitch",
      "liveUrl":"https://anand-cryptoswitch.netlify.app/",
      "techs": [
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          title: "React",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
          title: "Bootstrap",
        },
      ] 
    },
    {
      "title":"Todo",
      "image":"https://res.cloudinary.com/de3bkua6f/image/upload/v1676723687/mrpedgodcxlqkhhuklbc.png",
      "repoName":"https://github.com/anandpothraj/todo",
      "liveUrl":"https://anand-todo.netlify.app/",
      "techs": [
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          title: "React",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
          title: "Bootstrap",
        },
      ]        
    },
  ];

  return (
    <div className='col-11 col-md-9 my-3 mx-auto text-light'>
      <h1 className='textCenter'>Projects</h1>
      <div>
        <Row>
        {projects &&
          projects.map((project, i) => {
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