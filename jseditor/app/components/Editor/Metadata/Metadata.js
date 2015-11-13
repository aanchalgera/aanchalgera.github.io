import React from 'react';
import Index from './Index';
import Seo from './Seo';
import Homepage from './Homepage';

class Metadata extends React.Component{
  render () {
    return (
      <div className="article-metadata-container">
        <h3>Article Metadata</h3>
        <Index
          index={this.props.meta.index}
          updateIndexMetadata={this.props.updateIndexMetadata}
        />
        <Homepage
          homepage={this.props.meta.homepage}
          updateHomepageContent={this.props.updateHomepageContent}
          updateHomepageSponsor={this.props.updateHomepageSponsor}
          openResourcePanel={this.props.openResourcePanel}
        />
      </div>

    )
  }
}

export default Metadata;
