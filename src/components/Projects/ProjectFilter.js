import React from 'react';
import { Form } from 'react-bootstrap';

const ProjectFilter = ({ sortBy, setSortBy, projectType, setProjectType, projectKind, setProjectKind }) => {
  return (
    <div className="col-12 col-md-8 d-flex flex-wrap gap-3 justify-content-between project-filters">
      <div className='d-flex flex-grow-1 align-items-center justify-content-between'>
          <label htmlFor="sortBy">Sort By : </label>
          <Form.Select className='w-50 w-md-50' size="sm" name="sortBy" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
            <option value="new">New</option>
            <option value="old">Old</option>
          </Form.Select>
      </div>
      <div className='d-flex flex-grow-1 align-items-center justify-content-between'>
          <label htmlFor="type">Stack : </label>
          <Form.Select className='w-50 w-md-50' size="sm" name="type" value={projectType} onChange={(e)=>setProjectType(e.target.value)}>
            <option value="all">All</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullStack">Full Stack</option>
          </Form.Select>
      </div>
      <div className='d-flex flex-grow-1 align-items-center justify-content-between'>
          <label htmlFor="kind">Type : </label>
          <Form.Select className='w-50 w-md-50' size="sm" name="kind" value={projectKind} onChange={(e)=>setProjectKind(e.target.value)}>
            <option value="all">All</option>
            <option value="personal">Personal</option>
            <option value="professional">Professional</option>
          </Form.Select>
      </div>
    </div>
  );
};

export default ProjectFilter;