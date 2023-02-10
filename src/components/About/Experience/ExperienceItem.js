import React from 'react';
import { Stack } from 'react-bootstrap';

const ExperienceItem = (props) => {
    return (
        <div className="experience__content__item">
          <Stack direction="horizontal" gap={5}>
            <div className="experience__content__item__img">
              <img
                src={props.companyImgUrl}
                alt={props.company}
              />
            </div>
            <div className="experience__content__item__details mt-3">
              <h3>{props.company}</h3>
              <h5>{props.position}</h5>
              <span className="type">
                <span
                  style={{
                    backgroundColor:
                      props.endDate === 'Present' ? 'rgb(51, 255, 0)' : '#ff0000'
                  }}
                />{' '}
                {props.type}
              </span>
              <p>
                {props.startDate} - {props.endDate}
              </p>
            </div>
          </Stack>
        </div>
      );
}

export default ExperienceItem;