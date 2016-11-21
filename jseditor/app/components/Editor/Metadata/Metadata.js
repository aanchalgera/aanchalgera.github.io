import React from 'react';
import Index from './Index';
import Footer from './Footer';
import Seo from './Seo';
import Homepage from './Homepage';
import Sponsor from './Sponsor';
import Css from './Css';
import Microsite from './Microsite';
import Author from './Author';

class Metadata extends React.Component{
  onArticleMetaToggle (e) {
    e.preventDefault();
    this._glyphiconClass.classList.toggle('glyphicon-minus');
    this._articleMetaPanel.classList.toggle('collapsed-content');
  }

  render () {
    let author = <Author
      author={this.props.meta.author}
      userId={this.props.userId}
      blogUrl={this.props.blogUrl}
      toggleAuthorInfo={this.props.toggleAuthorInfo}
      editAuthorInfo={this.props.editAuthorInfo}
      onArticleMetaToggle={this.onArticleMetaToggle}
    />;

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
        <Seo
          seo={this.props.meta.seo ? this.props.meta.seo : {title:'', description:''} }
          updateSeoTitle={this.props.updateSeoTitle}
          updateSeoDescription={this.props.updateSeoDescription}
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
        {this.props.blogUrl ? author : ''}
      </div>
    );
  }
}

export default Metadata;
