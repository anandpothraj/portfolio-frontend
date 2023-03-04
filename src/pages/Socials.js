import React from 'react';
import '../components/Socials/SocialCard';
import SocialCard from '../components/Socials/SocialCard';
import data from '../SourceData/data.json';
import { Row, Col } from 'react-bootstrap';

const Socials = () => {
    const socials = data.socials;

    return (
        <div className='col-11 col-md-9 my-3 mx-auto text-light'>
            <h1 className='textCenter'>Want to connect me?</h1>
            <p className='textCenter'>Please follow the links.</p>
            <div className="py-3 socialContainer h-100">
                <Row>
                {
                    socials.map((social, i) => {
                        return (
                            <Col  key={i}>
                                <SocialCard social={social} className="my-1"/>
                            </Col>
                        );
                    })
                }
                </Row>
            </div>
        </div>
    );
};

export default Socials;