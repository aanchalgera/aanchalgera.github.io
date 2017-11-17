//@flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ImagePanel } from '.';

class ImageUploader extends PureComponent {
  componentWillMount() {
    //dispatch Action to fetch Images
  }

  render() {
    return <ImagePanel open={true} images={this.props.images} />;
  }
}

function mapStateToProps(state) {
  return {
    images: state.images
  };
}

export default connect(mapStateToProps)(ImageUploader);
