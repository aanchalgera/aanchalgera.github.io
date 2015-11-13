import React from 'react';
import Index from './Index';
import Footer from './Footer';
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
        <Footer
          footer={this.props.meta.footer}
          updateFooterCredits={this.props.updateFooterCredits}
        />
        <Homepage
          homepage={this.props.meta.homepage}
          updateHomepageContent={this.props.updateHomepageContent}
          updateHomepageSponsor={this.props.updateHomepageSponsor}
          deleteHomepageImage={this.props.deleteHomepageImage}
          openResourcePanel={this.props.openResourcePanel}
        />
        <Seo
          seo={this.props.meta.seo ? this.props.meta.seo : {title:'', description:''} }
          updateSeoTitle={this.props.updateSeoTitle}
          updateSeoDescription={this.props.updateSeoDescription}
        />
      </div>
    )
  }
}

export default Metadata;
