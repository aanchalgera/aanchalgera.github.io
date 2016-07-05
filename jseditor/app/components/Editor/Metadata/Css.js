import React from 'react';

class Css extends React.Component {
  render () {
    return (
      <div className="modules module-seo">
        <h4 onClick={this.props.onArticleMetaToggle.bind(this, this.refs)}>
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
