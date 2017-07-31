import React from 'react';

class Seo extends React.Component{
  render () {
    return (
      <div className="modules module-seo">
        <h4 onClick={this.props.onArticleMetaToggle.bind(this)}>
          SEO
          <span className="glyphicon glyphicon-plus pull-right" ref={(c) => this._glyphiconClass = c}></span>
        </h4>
        <div className="collapsed-content" ref={(c) => this._articleMetaPanel = c}>
          <div className="form-group">
            <label>Page Title</label>
            <input type="text" className="form-control" defaultValue={this.props.seo.title} onBlur={this.props.updateSeoTitle}/>
          </div>
          <div className="form-group">
            <label>Page Description</label>
            <textarea className="form-control" placeholder="Add your text here...." defaultValue={this.props.seo.description} onBlur={this.props.updateSeoDescription} />
          </div>
        </div>
      </div>
    );
  }
}

export default Seo  ;
