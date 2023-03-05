import React, { useEffect } from "react";
import Hire from "../components/Home/Hire";
import Work from "../components/Home/Work";
import Profile from '../components/Home/Profile';
import Interested from "../components/Home/Interested";
import Testimonial from '../components/Home/Testimonial';
import RecentProjects from "../components/Home/RecentProjects";

const Home = () => {

  const goToTop = () => {
    window.scrollTo({ top : 0, left: 0, behavior: "smooth"});
  };

  useEffect(()=> {
    goToTop();
  },[]);

  return (
    <div>
      <Profile/>
      <Work/>
      <RecentProjects/>
      <Hire/>
      <Testimonial/>
      <Interested/>
    </div>
  );
};

export default Home;