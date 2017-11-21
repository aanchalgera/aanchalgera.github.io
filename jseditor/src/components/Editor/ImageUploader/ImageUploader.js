//@flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Image } from 'lib/flowTypes';
import { getImages } from './lib/imageUploadService';
import { REQUEST_IMAGES } from './actions';
import { ImagePanel } from '.';

type Props = {
  imageUrls: Array<Image>
};

class ImageUploader extends PureComponent {
  props: Props;

  async componentWillMount() {
    const { id, base, dispatch } = this.props;
    let requestImagesAction = {
      type: REQUEST_IMAGES,
      images: []
    };

    if (id !== undefined && id !== '') {
      requestImagesAction.images = await getImages(base, id);
    }

    dispatch(requestImagesAction);
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
