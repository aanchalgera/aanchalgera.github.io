import React from 'react';

class PreviewOnSite extends React.Component{
  submitPost() {
    const sitePreviewUrl = this.props.blogUrl + '/preview-longform/' + this.props.postId;
    window.open(sitePreviewUrl, 'Site Preview');
  }

  render() {
    return <button
        className="btn btn-primary btn-nav"
        onClick={this.submitPost.bind(this)}>
        <span className = "glyphicon glyphicon-certificate"></span>Preview on Site
    </button>;
  }
}

export default PreviewOnSite;
