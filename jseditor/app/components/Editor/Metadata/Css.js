import React from 'react';

class Css extends React.Component {
  onToggle(e) {
    e.preventDefault();
    this.props.onArticleMetaToggle({
      glyphiconClass: this.refs.glyphiconClass,
      articleMetaPannel: this.refs.articleMetaPannel
    });
  }

  render () {
    return (
      <div className="modules module-seo">
        <h4 onClick={this.onToggle.bind(this)}>
          CSS
          <span className="glyphicon glyphicon-plus pull-right" ref="glyphiconClass"></span>
        </h4>
        <div className="collapsed-content" ref="articleMetaPannel">
          <div className="form-group">
            <label>CSS Skinname</label>
            <input
              type="text"
              className="form-control sponsor-field"
              defaultValue= {this.props.css.skinName}
              onBlur={this.props.updateCssSkinName} />
          </div>
        </div>
      </div>
    );
  }
}

export default Css;
