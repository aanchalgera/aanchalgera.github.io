import React from 'react';

class Seo extends React.Component{
  render () {
    return (
      <div className="modules module-seo">
        <h4>SEO</h4>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Page Title</label>
          <input type="text" className="form-control" defaultValue={this.props.seo.title} onBlur={this.props.updateSeoTitle}/>
        </div>
        <div className="form-group">
          <label htmlFor>Page Description</label>
          <textarea className="form-control" placeholder="Add your text here...." defaultValue={this.props.seo.description} onBlur={this.props.updateSeoDescription} />
        </div>
      </div>
    );
  }
}

export default Seo  ;
