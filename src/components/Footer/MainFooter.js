import axios from 'axios';
import { FaDev } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import data from '../../SourceData/data.json';
import apiConfig from '../../config/api.json';
import React, { useState, useEffect } from 'react';
import { getServerUrl } from '../../config/env';
import { BsTwitter, BsGithub, BsMedium, BsLinkedin } from 'react-icons/bs';

const MainFooter = () => {

    const serverUrl = getServerUrl();
    
    const [ siteVisits, setSiteVisits ] = useState(0);

    const style = {
        fontSize:"25px",
        cursor:"pointer",
        color:"white"
    };

    const updateSiteVisits = async (pastVisits) => {
        try {
            const config = {"Content-type": "application/json"};
            const response = await axios.post(`${serverUrl}${apiConfig.api.visits.UPDATE_SITE_VISITS}`,{"visitsCount": pastVisits+1},{ headers: config });
            if (response.status === 201) {
                setSiteVisits(pastVisits+1);
            } else {
                console.log("Unable to update the site count");
            }
        } catch (e) {
            if (e.response && e.response.status !== 201) {
                console.log("Unable to update the site count");
            } else {
                console.log("Something went wrong, please try again later.");
            }
        }
    }

    const getsiteVisits = async () => {
        try {
            const response = await axios.get(`${serverUrl}${apiConfig.api.visits.FETCH_SITE_VISITS}`);
            if (response.status === 200) {
                updateSiteVisits(response.data.visitsCount);
            } else {
              console.log("Unable to fetch site visits");
            }
          } catch (e) {
            if (e.response && e.response.status !== 200) {
                console.log("Unable to fetch site visits");
            } else {
              console.log("Something went wrong, please try again later.");
            }
          }
    }

    useEffect(() => {
        getsiteVisits();
        // eslint-disable-next-line
    },[])

    return (
        <div className='text-light bg-black p-3 p-md-5'>
            <div className="w-75 d-flex justify-content-between m-auto flex-column flex-md-row">
                <div className="">
                    <h1>Let's Connect</h1>
                    <p>Visits : <Badge bg="warning" text="dark">{siteVisits?siteVisits:"Fetching..."}</Badge></p>
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