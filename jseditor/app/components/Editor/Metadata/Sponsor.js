import React from 'react';

class Sponsor extends React.Component {
  updateSponsorImage() {
    let sponsorImageUrl = this.refs.sponsorImage.value;
    if (sponsorImageUrl == '') {
      this.props.updateSponsorImage(sponsorImageUrl);
    } else {
      var isValidUrl = this.checkURL(sponsorImageUrl);
      if (isValidUrl) {
        this.props.updateSponsorImage(sponsorImageUrl);
      }
    }
  }

  checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  onToggle(e) {
    e.preventDefault();
    this.props.onArticleMetaToggle({glyphiconClass: this.refs.glyphiconClass, articleMetaPannel: this.refs.articleMetaPannel});
  }

  render () {
    return (
      <div className="modules module-home expandmodule">
        <h4 onClick={this.onToggle.bind(this)}>
          Sponsor Content
          <span className="glyphicon glyphicon-plus pull-right" ref='glyphiconClass'></span>
        </h4>
        <div className="collapsed-content" ref='articleMetaPannel'>
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
      </div>
    );
  }
}

export default Sponsor;
