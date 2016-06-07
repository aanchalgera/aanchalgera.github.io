import React from 'react';
import Index from './Index';
import Footer from './Footer';
import Seo from './Seo';
import Homepage from './Homepage';
import Sponsor from './Sponsor';
import Css from './Css';
import Microsite from './Microsite';

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
          updateSponsorImage={this.props.updateSponsorImage}
          deleteHomepageImage={this.props.deleteHomepageImage}
          openResourcePanel={this.props.openResourcePanel}
        />
        <Seo
          seo={this.props.meta.seo ? this.props.meta.seo : {title:'', description:''} }
          updateSeoTitle={this.props.updateSeoTitle}
          updateSeoDescription={this.props.updateSeoDescription}
        />
        <Sponsor
          sponsor={this.props.meta.sponsor}
          updateSponsorName={this.props.updateSponsorName}
          updateSponsorImage={this.props.updateSponsorImage}
          updateSponsorTracker={this.props.updateSponsorTracker}
        />
        <Css
          css={this.props.meta.css}
          updateCssSkinName={this.props.updateCssSkinName.bind(this)}
        />
        <Microsite
          microsite={this.props.meta.microsite}
          updateMicrositeName={this.props.updateMicrositeName}
          updateMicrositeGASnippet={this.props.updateMicrositeGASnippet}
          toggleWSLLogo={this.props.toggleWSLLogo}
          toggleSocialSharing={this.props.toggleSocialSharing}
        />
      </div>
    )
  }
}

export default Metadata;
