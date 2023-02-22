import React from 'react';
import data from '../../SourceData/data.json';

const Bio = () => {
  return (
    <div>
        <p className="bioText">{data.about.bio.bioWelcomeText} <br/>
        I'm <a href={data.about.bio.bioLinkedIn} target="_blank" rel="noreferrer" className='colorOrange text-decoration-none'>{data.about.bio.bioName}</a> , {data.about.bio.bioIntroText} <a href={data.about.bio.collegeLink} rel="noreferrer" className='colorOrange text-decoration-none'>{data.about.bio.bioCollegeName}</a>  in {data.about.bio.passoutYear}. {data.about.bio.bioText}</p>
    </div>
  )
}

export default Bio;