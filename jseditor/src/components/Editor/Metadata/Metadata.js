import React from 'react';
import Index from './Index';
import Footer from './Footer';
import Seo from './Seo';
import Homepage from './Homepage';
import Sponsor from './Sponsor';
import Css from './Css';
import Microsite from './Microsite';
import Author from './Author';
import Social from './Social';
import Comments from './Comments';

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
        <Index
          index={this.props.meta.index}
          updateIndexMetadata={this.props.updateIndexMetadata}
          onArticleMetaToggle={this.onArticleMetaToggle}
        />
        <Footer
          footer={this.props.meta.footer}
          updateFooterCredits={this.props.updateFooterCredits}
          onArticleMetaToggle={this.onArticleMetaToggle}
          toggleFooter={this.props.toggleFooter}
        />
        <Microsite
          microsite={this.props.meta.microsite}
          updateMicrositeName={this.props.updateMicrositeName}
          updateMicrositeGASnippet={this.props.updateMicrositeGASnippet}
          updateMicrositeCookiePage={this.props.updateMicrositeCookiePage}
          toggleWSLLogo={this.props.toggleWSLLogo}
          toggleSocialSharing={this.props.toggleSocialSharing}
          onArticleMetaToggle={this.onArticleMetaToggle}
        />
        <Sponsor
          sponsor={this.props.meta.sponsor}
          updateSponsorName={this.props.updateSponsorName}
          updateSponsorImage={this.props.updateSponsorImage}
          updateSponsorTracker={this.props.updateSponsorTracker}
          onArticleMetaToggle={this.onArticleMetaToggle}
        />
        <Css
          css={this.props.meta.css}
          updateCssSkinName={this.props.updateCssSkinName.bind(this)}
          onArticleMetaToggle={this.onArticleMetaToggle}
        />
        <Homepage
          homepage={this.props.meta.homepage}
          updateHomepageContent={this.props.updateHomepageContent}
          updateHomepageSponsor={this.props.updateHomepageSponsor}
          updateSponsorImage={this.props.updateSponsorImage}
          deleteHomepageImage={this.props.deleteHomepageImage}
          openResourcePanel={this.props.openResourcePanel}
          onArticleMetaToggle={this.onArticleMetaToggle}
        />
        <Comments
          comment={this.props.meta.comment}
          onArticleMetaToggle={this.onArticleMetaToggle}
          toggleAllowComments={this.props.toggleAllowComments}
          toggleCommentStatus={this.props.toggleCommentStatus}
        />
      </div>
    );
  }
}

export default Metadata;
