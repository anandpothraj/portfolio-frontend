import React, { useEffect } from 'react';
import GithubCalendar from 'github-calendar';
import 'github-calendar/dist/github-calendar-responsive.css';
import 'github-calendar/dist/github-calendar.min.js';

const ContributionsGraph = () => {
  useEffect(() => {
    GithubCalendar('.calendar', 'anandpothraj', {
      tooltips: true
    });
  }, []);

  return (
      <div className="contributions-graph my-2 my-md-5">
        <h2 className='colorLightBlue my-4 textCenter'>OSS Contributions</h2>
        <div className="calendar rounded-3" style={{border:"none",background:"#2f2f2f"}} />
      </div>
  );
};

export default ContributionsGraph;