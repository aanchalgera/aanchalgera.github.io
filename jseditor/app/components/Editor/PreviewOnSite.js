import React from 'react';

class PreviewOnSite extends React.Component{
  submitPost() {
    const sitePreviewUrl = configParams.blogUrl + 'preview-longform/' + this.props.postId;
    window.open(sitePreviewUrl);
  }

  render() {
    return <span>
      <button
        className="btn btn-primary"
        onClick={this.submitPost.bind(this)}>Preview on Site</button>
      </span>;
  }
}

export default PreviewOnSite;
