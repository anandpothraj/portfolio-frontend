import React from 'react';

const TechCard = (props) => {
  return (
    <div className="techCard">
      <img
        style={{ background: `${props.bg}` }}
        src={props.imageUrl}
        alt={props.title}
      />
      <h6 className="mt-2 techName">{props.title}</h6>
    </div>
  );
};

export default TechCard;