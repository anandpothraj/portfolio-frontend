import React from 'react';

const TechCard = (props) => {
  const isWhiteBg = props.bg === '#FFFFFF' || props.bg === '#ffffff' || props.bg === 'white';
  
  return (
    <div className="techCard rounded">
      <div 
        className={`techImageContainer ${isWhiteBg ? 'whiteBg' : ''}`}
        style={{ background: `${props.bg}` }}
      >
        <img
          alt={props.title}
          src={props.imageUrl}
          className="techImage"
        />
      </div>
      <h6 className="mt-2 techName">{props.title}</h6>
    </div>
  );
};

export default TechCard;