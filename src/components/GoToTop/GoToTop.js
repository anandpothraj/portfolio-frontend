import React, { useState, useEffect } from 'react';
import './GoToTop.css';
import { FaArrowUp } from 'react-icons/fa';

const GoToTop = () => {

    const [isVisible, setIsVisible ] = useState(false);

    const goToTop = () => {
        window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
        return () => window.removeEventListener("scroll", listenToScroll);
    };

    const listenToScroll = () => {
        let heightToHidden = 500;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        winScroll>heightToHidden?setIsVisible(true):setIsVisible(false);
    };

    useEffect(() => {
        window.addEventListener("scroll",listenToScroll);
    },[]);

    return (<>{isVisible && (<button className='top-btn' onClick={goToTop}><FaArrowUp className='top-btn-icon'/></button>)}</>);
};

export default GoToTop;