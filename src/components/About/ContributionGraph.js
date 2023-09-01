import React from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import GitHubCalendar from 'react-github-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const ContributionsGraph = () => {

  return (
      <div className="contributions-graph my-2 my-md-5">
        <h2 className='colorLightBlue my-4 textCenter'>OSS Contributions</h2>
        <div className="calendar rounded-3" style={{border:"none",background:"black", scrollbarColor: "green"}}>
          <GitHubCalendar 
            username='anandpothraj' 
            year={2023}
            labels={{
              totalCount: '{{count}} contributions in the this year!',
            }}
            colorScheme='dark'
            renderBlock={(block, activity) =>
              React.cloneElement(block, {
                'data-tooltip-id': 'react-tooltip',
                'data-tooltip-html': `${activity.count} activities on ${activity.date}`,
              })
            }
          />
          <ReactTooltip id="react-tooltip" />
        </div>
      </div>
  );
};

export default ContributionsGraph;