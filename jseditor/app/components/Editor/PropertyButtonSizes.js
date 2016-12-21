import React from 'react';

class PropertyButtonSizes extends React.Component{
  handleClick (ev) {
    if (ev.target.dataset.layout == this.props.layout) {
      return;
    }

    this.props.addLayoutToResource(ev);
  }

  render () {
    let extraButtons = null;
    let smallButton = null;
    let showSocialShareIcon;
    if ('title' == this.props.dataType) {
      extraButtons = (
        <span>
          <p className="size-big"><button type='button' data-layout="big" onClick={this.handleClick.bind(this)} className={'btn  btn-default selected ' + (this.props.layout == 'big' ? 'active' : '')}>Big</button></p>
        </span>
      );
    } else if ('summary' != this.props.dataType) {
      extraButtons = (
        <span>
          <p className="size-big"><button type='button' data-layout="big" onClick={this.handleClick.bind(this)} className={'btn  btn-default selected ' + (this.props.layout == 'big' ? 'active' : '')}>Big</button></p>
          <p className="size-cover"><button type='button' data-layout="cover" onClick={this.handleClick.bind(this)} className={'btn btn-default selected ' + (this.props.layout == 'cover' ? 'active' : '')}>Cover</button></p>
        </span>
      );
    }
    if ('table' != this.props.dataType) {
      smallButton = <p className="size-small"><button type='button' data-layout="small" onClick={this.handleClick.bind(this)} className={'btn btn-default selected ' + (this.props.layout == 'small' ? 'active' : '')}>Small</button></p>;
    }
    if('summary' == this.props.dataType) {
      showSocialShareIcon = (
        <div>
          <h5>Share</h5>
          <li>
            <label className="full-line">
              <input type="checkbox"
                data-id={this.props.dataId}
                checked={this.props.showSummarySocialShareButtons}
                onChange={this.props.toggleSummarySocialShareButtons}
              />
              Display social sharing buttons here
            </label>
          </li>
        </div>
      );
    }
    return (
      <ul className="list-size">
        <h5>Size</h5>
        <li>
          {smallButton}
          <p className="size-normal"><button type='button' data-layout="normal" onClick={this.handleClick.bind(this)} className={'btn  btn-default selected ' + (this.props.layout == 'normal' ? 'active' : '')}>Normal</button></p>
          {extraButtons}
        </li>
        {showSocialShareIcon}
      </ul>
    );
  }
}

export default PropertyButtonSizes;
