import React, { useEffect } from 'react'

const Privacy = () => {

  const goToTop = () => {
    window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
  };

  useEffect(()=> {
    goToTop();
  },[]);

  return (
    <div>Privacy</div>
  );
};

export default Privacy;