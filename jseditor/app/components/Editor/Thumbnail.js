import React from 'react/addons';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class Thumbnail extends React.Component {
  selectImage(data, e) {
    if (!this.props.addgallery) {
      this.props.addImage(data);
      return
    }
    e.currentTarget.className = e.currentTarget.className == 'active' ? '' : 'active'
  }
  render () {
    return (
      <li>
        <ReactCSSTransitionGroup transitionName="carousel">
          <img
            src={this.props.data.thumbnail_url}
            draggable="false"
            onClick={this.selectImage.bind(this, this.props.data)}
            data-image={JSON.stringify(this.props.data)}
          />
        </ReactCSSTransitionGroup>
      </li>
    )
  }
}
