import React, { useEffect } from 'react';

const Feedback = () => {

  const goToTop = () => {
    window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
  };

  useEffect(()=> {
    goToTop();
  },[]);

  return (
    <div>Feedback</div>
  );
};

export default Feedback;