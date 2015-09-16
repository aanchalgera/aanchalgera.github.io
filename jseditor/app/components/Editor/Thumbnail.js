import React from 'react/addons';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class Thumbnail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checked: null
    };
  }
  handleChange() {
    this.setState({checked: !this.state.checked})
  }
  render () {
    return (
      <li>
        <ReactCSSTransitionGroup transitionName="carousel">
          <label htmlFor={this.props.key}>
          <img
            src={this.props.data.thumbnail_url}
            draggable="false"
            onClick={this.props.addImage.bind(this, this.props.data)}
          />
        </label>
        <input data-image={JSON.stringify(this.props.data)} type={this.props.addgallery} className="chk " name="imagecheckboxes" checked={this.state.checked ? 'checked': null} onChange={this.handleChange} value="0" />
        </ReactCSSTransitionGroup>
      </li>
    )
  }
}
