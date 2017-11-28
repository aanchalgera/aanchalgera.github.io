//@flow
import * as React from 'react';
import { connect } from 'react-redux';

import { Image } from 'lib/flowTypes';
import { getImages } from './lib/imageUploadService';
import { IMAGES_RECEIVE } from './actions';
import { ImagePanel, S3Uploader } from '.';

type ReceiveImagesAction = {
  type: string,
  images: Array<Image>
};

type Props = {
  imageUrls: Array<Image>,
  id: string,
  open: true,
  dispatch: (action: ReceiveImagesAction) => void
};

type State = {};

class ImageUploader extends React.PureComponent<Props, State> {
  async init() {
    const { id, dispatch } = this.props;
    let receiveImagesAction = {
      type: IMAGES_RECEIVE,
      images: []
    };

    if (id !== undefined && id !== '') {
      receiveImagesAction.images = await getImages(id);
    }

    dispatch(receiveImagesAction);
  }

  componentWillMount() {
    this.init();
  }

  render() {
    const { openImagePanel, openUploader, imageUrls, dispatch } = this.props;

    return (
      <div>
        <ImagePanel open={openImagePanel} images={imageUrls} dispatch={dispatch} />
        <S3Uploader open={openUploader} dispatch={dispatch} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.images;
}

export default connect(mapStateToProps)(ImageUploader);
