import React from 'react';
import { Image } from 'react-bootstrap';
import { RiSendPlaneFill } from 'react-icons/ri';
import './Socials.css';

const SocialCard = (props) => {

    const social = props.social;

    return (
        <div className="rounded bg-black m-auto py-1 my-3 socialCard">
            <div className="mx-auto my-2 d-flex">
                <Image src={social.profilePhoto} className='w-50 h-auto rounded-circle mx-auto my-2'/>
            </div>
            <div className='m-auto d-flex justify-content-center align-items-center'>
                <span>{social.platform}</span>
                <button className='visitBtn border-none pe-auto text-light mx-2 my-auto'>
                    <a href={social.url} target="_blank" rel="noreferrer" className='text-light text-decoration-none'>Visit<RiSendPlaneFill className='visit my-auto mx-2'/></a>
                </button>
            </div>
        </div>
    );
};

export default SocialCard;