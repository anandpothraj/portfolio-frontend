import React from 'react';

const TechCard = (props) => {
  return (
    <div className="techCard rounded">
      <img
        alt={props.title}
        src={props.imageUrl}
        className="techImage"
        style={{ background: `${props.bg}` }}
      />
      <h6 className="mt-2 techName">{props.title}</h6>
    </div>
  );
};

export default TechCard;