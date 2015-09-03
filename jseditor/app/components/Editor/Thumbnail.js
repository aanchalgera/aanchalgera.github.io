import React from 'react/addons';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class Thumbnail extends React.Component {
  render () {
    return (
      <li>
        <ReactCSSTransitionGroup transitionName="carousel">
          <img
            src={this.props.data.thumbnail_url}
            draggable="false"
            onClick={this.props.addImage.bind(this, this.props.data)}
          />
        <ReactCSSTransitionGroup />
      </li>
    )
  }
}
