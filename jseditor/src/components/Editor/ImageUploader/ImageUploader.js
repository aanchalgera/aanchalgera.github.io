//@flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getImages } from './lib/imageUploadService';
import { SET_IMAGES } from './actions';
import { ImagePanel } from '.';

class ImageUploader extends PureComponent {
  async componentWillMount() {
    const { slug, base, dispatch } = this.props;
    let setImagesAction = {
      type: SET_IMAGES,
      images: []
    };

    if (slug !== undefined && slug !== '') {
      setImagesAction.images = await getImages(base, slug);
    }

    dispatch(setImagesAction);
  }

  render() {
    const { imageUrls } = this.props;

    return <ImagePanel open={true} images={imageUrls} />;
  }
}

function mapStateToProps(state) {
  return state.images;
}

export default connect(mapStateToProps)(ImageUploader);
