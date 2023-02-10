import React from 'react';
import { Stack } from 'react-bootstrap';

const ExperienceItem = ({props}) => {
    return (
        <div className='text-light'>
          <Stack direction="horizontal" gap={5}>
            <div className="imageDiv">
              <img
                src={props.companyImgUrl}
                alt={props.company}
                className="w-100 h-auto"
              />
            </div>
            <div className=" mt-3">
              <h3>{props.company}</h3>
              <h5 className='colorOffWhite'>{props.position}</h5>
              <span className="type my-2">
                <span className='subType'
                  style={{
                    backgroundColor:
                      props.endDate === 'Present' ? 'rgb(51, 255, 0)' : '#ff0000'
                  }}
                />{' '}
                {props.type}
              </span>
              <p className='bioText'>
                {props.startDate} - {props.endDate}
              </p>
            </div>
          </Stack>
        </div>
      );
}

export default ExperienceItem;