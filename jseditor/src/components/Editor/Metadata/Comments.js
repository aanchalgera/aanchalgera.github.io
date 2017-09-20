import React from 'react';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.onArticleMetaToggle = this.props.onArticleMetaToggle.bind(this);
  }

  render() {
    return (
      <div className="modules module-seo expandmodule expandmodule10">
        <h4 onClick={this.onArticleMetaToggle}>
          Comments
          <span
            className="glyphicon glyphicon-minus pull-right"
            ref={c => (this._glyphiconClass = c)}
          />
        </h4>
        <div ref={c => (this._articleMetaPanel = c)}>
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
        </div>
      </div>
    );
  }
}

export default Comments;
