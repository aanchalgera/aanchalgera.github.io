import React, { PropTypes } from 'react'

class Css extends React.Component {
  render () {
    return (
      <div className="modules module-seo">
        <h4>CSS</h4>
        <div className="form-group">
          <label htmlFor>CSS  Skinname</label>
          <input
            type="text"
            className="form-control sponsor-field"
            defaultValue= {this.props.css.skinname}
            onBlur={this.props.updateCssSkinname} />
        </div>
      </div>
    )
  }
}

export default Css;
