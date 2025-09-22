import React from 'react';
import { Form } from 'react-bootstrap';

const ProjectFilter = ({ sortBy, setSortBy, projectType, setProjectType }) => {
  return (
    <div className="col-12 col-md-8 d-flex flex-col justify-content-between">
      <div className='d-flex w-100 align-items-center justify-content-around'>
          <label htmlFor="sortBy">Sort By : </label>
          <Form.Select className='w-50' size="sm" name="sortBy" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
            <option value="new">New</option>
            <option value="old">Old</option>
          </Form.Select>
      </div>
      <div className='d-flex w-100 align-items-center justify-content-around'>
          <label htmlFor="type">Type : </label>
          <Form.Select className='w-50' name="type" value={projectType} onChange={(e)=>setProjectType(e.target.value)}>
            <option value="all">All</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullStack">Full Stack</option>
          </Form.Select>
      </div>
    </div>
  );
};

export default ProjectFilter;