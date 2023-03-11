import React from 'react';
import data from '../../SourceData/data.json';

const SubFooter = () => {
  return (
    <div className='text-light w-100 p-3'>
      <div className="col-11 m-auto d-flex col-md-9 justify-content-between flex-column-reverse flex-md-row">
        <p className='my-2 mx-md-auto'>{data.footer.copyright}</p>
        <p className='my-2 mx-md-auto'>Made with 💖 by Me!</p>
        <p className='my-2 mx-md-auto'>{data.footer.version}</p>
      </div>
    </div>
  );
};

export default SubFooter;