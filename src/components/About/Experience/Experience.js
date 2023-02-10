import React from 'react';
import { Container } from 'react-bootstrap';
import ExperienceItem from './ExperienceItem';

const Experience = () => {
  return (
    <div id="experience">
      <Container>
        <div className="experience">
          <h2>Experience</h2>
          <div className="experience__content">

            <ExperienceItem
              company="Google Developer Student Club - LPU"
              companyImgUrl="https://pbs.twimg.com/profile_images/1425284890799460354/phO6uvw5_400x400.jpg"
              type="Volunteering"
              position="Team Member"
              startDate="Mar 2022"
              endDate="Present"
            />
            <div className="line"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Experience;