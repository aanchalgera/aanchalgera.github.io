import React from 'react';

class Css extends React.Component {
  render () {
    return (
      <div className="modules module-seo">
        <h4 onClick={this.props.onArticleMetaToggle.bind(this)}>
          CSS
          <span className="glyphicon glyphicon-plus pull-right" ref={(c) => this._glyphiconClass = c}></span>
        </h4>
        <div className="collapsed-content" ref={(c) => this._articleMetaPanel = c}>
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
