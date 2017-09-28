import React from 'react';
import Index from './Index';
import Footer from './Footer';
import Homepage from './Homepage';
import Css from './Css';
import Microsite from './Microsite';
import { Check } from '../../../containers/lib/check';

class Metadata extends React.Component {
  onArticleMetaToggle(e) {
    e.preventDefault();
    this._glyphiconClass.classList.toggle('glyphicon-minus');
    this._glyphiconClass.classList.toggle('glyphicon-plus');
    this._articleMetaPanel.classList.toggle('collapsed-content');
  }

  render() {
    return (
      <div className="article-metadata-container">
        <h3>Article Metadata</h3>
        <Check
          postType={this.props.postType}
          userRole={this.props.userRole}
          childName='Index'
        >
          <Index
            index={this.props.meta.index}
            updateIndexMetadata={this.props.updateIndexMetadata}
            onArticleMetaToggle={this.onArticleMetaToggle}
          />
        </Check>
        <Check
          postType={this.props.postType}
          userRole={this.props.userRole}
          childName='Footer'
        >
          <Footer
            footer={this.props.meta.footer}
            updateFooterCredits={this.props.updateFooterCredits}
            onArticleMetaToggle={this.onArticleMetaToggle}
            toggleFooter={this.props.toggleFooter}
          />
        </Check>
        <Microsite
          microsite={this.props.meta.microsite}
          updateMicrositeName={this.props.updateMicrositeName}
          updateMicrositeGASnippet={this.props.updateMicrositeGASnippet}
          updateMicrositeCookiePage={this.props.updateMicrositeCookiePage}
          toggleWSLLogo={this.props.toggleWSLLogo}
          toggleSocialSharing={this.props.toggleSocialSharing}
          onArticleMetaToggle={this.onArticleMetaToggle}
        />
        <Check
          postType={this.props.postType}
          userRole={this.props.userRole}
          childName='Css'
        >
          <Css
            css={this.props.meta.css}
            updateCssSkinName={this.props.updateCssSkinName.bind(this)}
            onArticleMetaToggle={this.onArticleMetaToggle}
          />
        </Check>
        <Homepage
          homepage={this.props.meta.homepage}
          updateHomepageContent={this.props.updateHomepageContent}
          updateHomepageSponsor={this.props.updateHomepageSponsor}
          updateSponsorImage={this.props.updateSponsorImage}
          deleteHomepageImage={this.props.deleteHomepageImage}
          openResourcePanel={this.props.openResourcePanel}
          onArticleMetaToggle={this.onArticleMetaToggle}
        />
      </div>
    );
  }
}

export default Metadata;
