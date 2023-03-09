import { FaDev } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import data from '../../SourceData/data.json';
import React, { useState, useEffect } from 'react';
import { BsTwitter, BsGithub, BsMedium, BsLinkedin } from 'react-icons/bs';

const MainFooter = () => {

    const [ siteVisits, setSiteVisits ] = useState(1105);

    const style = {
        fontSize:"25px",
        cursor:"pointer",
        color:"white"
    };

    const getsiteVisits = () => {
        console.log("getSiteVisits : ", siteVisits);
    }

    const updateSiteVisits = () => {
        setSiteVisits(siteVisits + 1);
    }

    useEffect(() => {
        getsiteVisits();
        updateSiteVisits();
        console.log("updateSiteVisits : ", siteVisits);
        // eslint-disable-next-line
    },[])

    return (
        <div className='text-light bg-black p-3 p-md-5'>
            <div className="w-75 d-flex justify-content-between m-auto flex-column flex-md-row">
                <div className="">
                    <h1>Let's Connect</h1>
                    <p>Visits : <Badge bg="warning" text="dark">{siteVisits}</Badge></p>
                </div>
                <div className="d-flex m-md-auto py-3">
                    <a href={data.footer.socials.linkedIn} target="_blank" rel="noreferrer"><BsLinkedin className="m-2" style={style}/></a>
                    <a href={data.footer.socials.github} target="_blank" rel="noreferrer"><BsGithub className="m-2" style={style}/></a>
                    <a href={data.footer.socials.twitter} target="_blank" rel="noreferrer"><BsTwitter className="m-2" style={style}/></a>
                    <a href={data.footer.socials.devCommunity} target="_blank" rel="noreferrer"><FaDev className="m-2" style={style}/></a>
                    <a href={data.footer.socials.medium} target="_blank" rel="noreferrer"><BsMedium className="m-2" style={style}/></a>
                </div>
            </div>
            <hr className='w-75 m-auto text-white'/>
            <div className="w-75 mx-auto my-2">
                {
                    data.footer.footerLink.map((link, i) => {
                        return(
                            <p key={i}><Link to={link.path} className='text-decoration-none text-light'>{link.title}</Link></p>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default MainFooter;