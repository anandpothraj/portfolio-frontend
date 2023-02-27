import React from 'react';
import TechCard from './TechCard';
import { Row, Col } from 'react-bootstrap';
import data from '../../../SourceData/data.json';

const Technology = () => {

  const TechData = data.about.technology.techData;
  
  return (
      <div className="my-2 my-md-4 techBar">
        <div className="text-light">
          <h2 className="colorLimeYellow textCenter">
            Tools, Languages &amp; Frameworks/Libraries
          </h2>
          <div className="techContainer">
            <Row className="mt-5">
              {TechData.map((item, i) => {
                return (
                  <Col key={i} className="my-1">
                    <TechCard
                      imageUrl={item.imageUrl}
                      title={item.techName}
                      bg={item.bg}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
    </div>
  )
};

export default Technology;