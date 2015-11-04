import React, { PropTypes } from 'react'

class AutoplaySlideButton extends React.Component {
  toggleAutoplaySlider(event) {
    event.preventDefault();
    debugger
    var autoplay = !!event.currentTarget.dataset.autoplay;
    this.props.setAutoPlaySlider(event, autoplay);
    debugger
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.autoplay == this.props.autoplay) {
      return false;
    }
  }
  render () {
    console.log(this.props.autoplay);
    return (
      <div>
        <h5>Autoplay</h5>
        <ul className="list-background">
          <li>
            <button
              className={"btn btn-default "+(this.props.autoplay != undefined && this.props.autoplay == true ? "active" : "")}
              data-id={this.props.dataId}
              data-autoplay={this.props.autoplay != undefined ? this.props.autoplay : false}
              onClick={this.toggleAutoplaySlider.bind(this)}>Autoplay</button>
          </li>
      	</ul>
      </div>
    )
  }
}

export default AutoplaySlideButton;
