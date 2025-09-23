import React, { useState } from 'react';
import { Form, Button, Offcanvas } from 'react-bootstrap';

const ProjectFilter = ({ sortBy, setSortBy, projectType, setProjectType, projectKind, setProjectKind }) => {
  const [showFilters, setShowFilters] = useState(false);

  const Chip = ({ label, isActive, onClick }) => (
    <Button
      variant={isActive ? 'light' : 'dark'}
      className={`filter-chip ${isActive ? 'active' : ''}`}
      size="sm"
      onClick={onClick}
    >
      {label}
    </Button>
  );

  const resetFilter = () => {
    setSortBy("new");
    setProjectType("all");
    setProjectKind("all");
    setShowFilters(false);
  }

  return (
    <>
    {/* Desktop filters (unchanged) */}
    <div className="col-12 col-md-8 d-none d-md-flex flex-wrap gap-3 justify-content-between project-filters">
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

    {/* Mobile Filters trigger */}
    <div className="d-flex d-md-none ms-auto">
      <Button className='filter-mobile-toggle ms-auto' size='sm' variant='outline-warning' onClick={()=>setShowFilters(true)}>
        Filters
      </Button>
    </div>

    {/* Mobile Offcanvas */}
    <Offcanvas show={showFilters} onHide={()=>setShowFilters(false)} placement="end" className='filter-offcanvas d-md-none'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filters</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className='filter-section'>
          <div className='filter-section-title'>Sort By</div>
          <div className='filter-chip-row'>
            <Chip label="New" isActive={sortBy === 'new'} onClick={()=>setSortBy('new')} />
            <Chip label="Old" isActive={sortBy === 'old'} onClick={()=>setSortBy('old')} />
          </div>
        </div>

        <div className='filter-section'>
          <div className='filter-section-title'>Stack</div>
          <div className='filter-chip-row'>
            <Chip label="All" isActive={projectType === 'all'} onClick={()=>setProjectType('all')} />
            <Chip label="Frontend" isActive={projectType === 'frontend'} onClick={()=>setProjectType('frontend')} />
            <Chip label="Backend" isActive={projectType === 'backend'} onClick={()=>setProjectType('backend')} />
            <Chip label="Full Stack" isActive={projectType === 'fullStack'} onClick={()=>setProjectType('fullStack')} />
          </div>
        </div>

        <div className='filter-section'>
          <div className='filter-section-title'>Type</div>
          <div className='filter-chip-row'>
            <Chip label="All" isActive={projectKind === 'all'} onClick={()=>setProjectKind('all')} />
            <Chip label="Personal" isActive={projectKind === 'personal'} onClick={()=>setProjectKind('personal')} />
            <Chip label="Professional" isActive={projectKind === 'professional'} onClick={()=>setProjectKind('professional')} />
          </div>
        </div>

        <div className='d-flex justify-content-end mt-3'>
          <Button className='mx-2' size='sm' variant='outline-success' onClick={()=>setShowFilters(false)}>Apply</Button>
          <Button className='mx-2' size='sm' variant='outline-warning' onClick={resetFilter}>Reset</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
    </>
  );
};

export default ProjectFilter;