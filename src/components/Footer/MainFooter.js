import React from 'react';
import { FaDev } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsTwitter, BsGithub, BsMedium, BsLinkedin } from 'react-icons/bs';

const MainFooter = () => {

    const style = {
        fontSize:"25px",
        cursor:"pointer",
        color:"white"
    };

    return (
        <div className='text-light bg-black p-3 p-md-5'>
            <div className="w-75 d-flex justify-content-between m-auto flex-column flex-md-row">
                <div className="">
                    <h1>Let's Connect</h1>
                    <p>Visits : <Badge bg="warning" text="dark">12345</Badge></p>
                </div>
                <div className="d-flex m-md-auto py-3">
                    <a href="https://www.linkedin.com/in/anand-pothraj-599910195" target="_blank" rel="noreferrer"><BsLinkedin className="m-2" style={style}/></a>
                    <a href="https://github.com/anandpothraj" target="_blank" rel="noreferrer"><BsGithub className="m-2" style={style}/></a>
                    <a href='https://twitter.com/PothrajAnand' target="_blank" rel="noreferrer"><BsTwitter className="m-2" style={style}/></a>
                    <a href="https://dev.to/anandpothraj" target="_blank" rel="noreferrer"><FaDev className="m-2" style={style}/></a>
                    <a href="https://medium.com/@anandpothraj11052001" target="_blank" rel="noreferrer"><BsMedium className="m-2" style={style}/></a>
                </div>
            </div>
            <hr className='w-75 m-auto text-white'/>
            <div className="w-75 mx-auto my-2">
                <p><Link to="/report" className='text-decoration-none text-light'>Report</Link></p>
                <p><Link to="/feedback" className='text-decoration-none text-light'>Feedback</Link></p>
                <p><Link to="/privacy-policy" className='text-decoration-none text-light'>Privacy Policy</Link></p>
            </div>
        </div>
    );
};

export default MainFooter;