import React from "react";
import ExperienceItem from "./ExperienceItem";
import { ExperienceDetails } from "./ExperienceDetails";

const Experience = () => {
  return (
    <div className="my-2 my-md-5">
      <h2 className="colorOffWhite my-4 textCenter">Experience</h2>
      <div className="my-2 my-md-5">
        {ExperienceDetails.map((data, index) => (
          <div key={index}>
            <ExperienceItem props={data} />
            {index === ExperienceDetails.length - 1 ? null : (
              <div className="lineMark"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;