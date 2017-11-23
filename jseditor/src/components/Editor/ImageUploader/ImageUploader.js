//@flow
import * as React from 'react';
import { connect } from 'react-redux';

import { Image } from 'lib/flowTypes';
import { getImages } from './lib/imageUploadService';
import { REQUEST_IMAGES } from './actions';
import { ImagePanel } from '.';

type RequestImagesAction = {
  type: string,
  images: Array<Image>
};

type Props = {
  imageUrls: Array<Image>,
  id: string,
  open: true,
  dispatch: (action: RequestImagesAction) => void
};

type State = {};

class ImageUploader extends React.PureComponent<Props, State> {
  async init() {
    const { id, dispatch } = this.props;
    let requestImagesAction = {
      type: REQUEST_IMAGES,
      images: []
    };

    if (id !== undefined && id !== '') {
      requestImagesAction.images = await getImages(id);
    }

    dispatch(requestImagesAction);
  }

  componentWillMount() {
    this.init();
  }

  render() {
    const { imageUrls } = this.props;
    return <ImagePanel open={this.props.open} images={imageUrls} />;
  }
}

function mapStateToProps(state) {
  return state.images;
}

export default connect(mapStateToProps)(ImageUploader);
