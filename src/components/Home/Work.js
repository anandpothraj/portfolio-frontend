import './Home.css';
import React, { useState, useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import WorkImg from '../../assets/images/Achievement.gif';

const Work = () => {

    const [ project, setProject ] = useState("");

    useEffect(() => {
        let start = 0;
        let end = 50;
        setInterval(() => {
            if(start !== end){
                start = start + 1;
                setProject(start);
            }
        }, 100);
    },[]);

    return (
        <div className='text-light col-11 col-md-9 mx-auto bg-dark py-3' style={{backgroundColor:"#212529"}}>
            <div className="bg-black rounded">
                <Container className='d-flex flex-column flex-md-row'>
                    <div className="w-75 w-md-50 d-flex p-0 p-md-5 m-auto">
                        <Image src={WorkImg} fluid className='m-auto'/>
                    </div>
                    <div className="w-100 p-2 p-md-5 m-auto">
                        <h1 className='my-2'>{project}<b className='primaryGreen'>+</b></h1>
                        <h6 className='primaryOrange my-2'>Completed Projects</h6>
                        <h1 className='primaryBlue my-2'>Glad to work with you!</h1>
                        <p className='text-secondary my-2'>As a Software Engineer and Full Stack Developer, I'm always looking for
                            new challenges and opportunities to further improve my knowledge and skills.
                        </p>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Work;