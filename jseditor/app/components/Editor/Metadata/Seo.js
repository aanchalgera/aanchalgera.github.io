import React from 'react';
import Index from './Index';

class Metadata extends React.Component{
  render () {
    return (
      <div className="modules module-seo">
        <h4>SEO</h4>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Page Title</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor>Page Description</label>
          <textarea className="form-control" placeholder="Add your text here...." />
        </div>
      </div>
    )
  }
}

export default Metadata;
