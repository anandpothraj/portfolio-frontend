import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AiOutlineClose, AiOutlineArrowRight } from 'react-icons/ai';

const ContactPrompt = () => {

    const [ showPrompt, setShowPrompt ] = useState(true);

    const style = {
        background: "#12c2e9",
        // eslint-disable-next-line no-dupe-keys
        background: "-webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9)",
        // eslint-disable-next-line no-dupe-keys
        background: "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)"
    };

    return (
        showPrompt ? 
        <div style={style} className="p-1 p-md-2 text-center d-flex text-light m-auto">
            <p className='m-auto' style={{fontSize:"15px"}}>Open to opportunities<Link to="/contact" className='p-1 text-light' style={{fontSize:"13px"}}>Contact me <AiOutlineArrowRight/></Link></p>
            <Button variant="outline-light" size="sm" onClick={()=>setShowPrompt(false)}><AiOutlineClose/></Button>
        </div> : null
    );
};

export default ContactPrompt;