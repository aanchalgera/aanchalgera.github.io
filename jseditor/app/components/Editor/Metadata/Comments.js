import React from 'react';

class Comments extends React.Component {
  constructor (props) {
    super(props);
    this.onArticleMetaToggle = this.props.onArticleMetaToggle.bind(this);
  }

  render () {
    return (
      <div className="modules module-seo expandmodule expandmodule10">
        <h4 onClick={this.onArticleMetaToggle}>
          Comments
          <span className="glyphicon glyphicon-minus pull-right" ref={(c) => this._glyphiconClass = c}></span>
        </h4>
        <div ref={(c) => this._articleMetaPanel = c}>
          <div className="form-group">
            <label>
              <input 
                type="checkbox"
                checked={this.props.comment.allow}
                onChange={this.props.toggleAllowComments}
              />
              Allow comments
            </label>
          </div>
          <div className="form-group" style={{display: this.props.comment.allow ? 'block' : 'none'}}>
            <label>
              <input
                type="checkbox"
                onChange={this.props.toggleCommentStatus}
                checked={this.props.comment.status == 'open'}
              />
              Close comments
            </label>
            <div className="alert alert-info" style={{display: this.props.comment.status == 'open' ? 'none' : 'block'}}>Comments are closed </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
