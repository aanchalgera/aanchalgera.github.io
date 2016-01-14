import React, { PropTypes } from 'react'

class Sponsor extends React.Component {
  updateSponsorImage() {
    let sponsorImageUrl = this.refs.sponsorImage.value;
    if('' != sponsorImageUrl) {
      var isValidUrl = this.checkURL(sponsorImageUrl);
      if (isValidUrl) {
        this.props.updateSponsorImage(sponsorImageUrl);
      }
    }
  }
  checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
  render () {
    return (
      <div className="modules module-home">
        <h4>Sponsor Content</h4>
        <div className="form-group">
          <label htmlFor>Sponsor name</label>
          <input
            type="text"
            className="form-control sponsor-field"
            defaultValue= {this.props.sponsor.name}
            onBlur={this.props.updateSponsorName} />
        </div>
        <div className="form-group">
          <label htmlFor>Sponsor image URL <span className="hint">(Maximum size: 70x48)</span></label>
          <input
            ref="sponsorImage"
            type="text"
            className="form-control sponsor-field"
            defaultValue= {this.props.sponsor.image}
            onBlur={this.updateSponsorImage.bind(this)} />
        </div>
        <div className="form-group">
          <label htmlFor>Add tracker</label>
          <textarea
            ref = "trackerContent"
            className="form-control"
            placeholder="Add your tracker code here...."
            defaultValue= {this.props.sponsor.tracker}
            onBlur={this.props.updateSponsorTracker} />
        </div>
      </div>
    )
  }
}

export default Sponsor;
