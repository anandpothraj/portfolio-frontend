import React from "react";
import ExperienceItem from "./ExperienceItem";
import data from '../../../SourceData/data.json';

const Experience = () => {
  let experienceArray = data.about.experience.ExperienceDetails;
  return (
    <div className="my-2 my-md-5">
      <h2 className="colorOffWhite my-4 textCenter">Experience</h2>
      <div className="my-2 my-md-5">
        {experienceArray.map((data, index) => (
          <div key={index}>
            <ExperienceItem props={data} />
            {index === experienceArray.length - 1 ? null : (
              <div className="lineMark"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;