import React from 'react';
import TechCard from './TechCard';
import TechData from './TechData';
import { Row, Col } from 'react-bootstrap';

const Technology = () => {
  return (
      <div className="my-2 my-md-4">
        <div className="text-light">
          <h2 className="colorLimeYellow textCenter">
            Tools, Languages &amp; Frameworks/Libraries
          </h2>
          <div className="techContainer">
            <Row className="mt-5">
              {TechData.map((item, i) => {
                return (
                  <Col key={i}>
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
}

export default Technology