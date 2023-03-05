import React, { useEffect } from 'react';

const Report = () => {

  const goToTop = () => {
    window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
  };

  useEffect(()=> {
    goToTop();
  },[]);

  return (
    <div>Report</div>
  );
};

export default Report;