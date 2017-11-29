//@flow
import * as React from 'react';
import { connect } from 'react-redux';

import { Image, Action } from 'lib/flowTypes';
import { getImages } from './lib/imageUploadService';
import { receiveImages } from './actions';
import { ImagePanel, S3Uploader } from '.';

type Props = {
  imageUrls: Array<Image>,
  id: string,
  open: true,
  dispatch: (action: Action) => void
};

type State = {};

class ImageUploader extends React.PureComponent<Props, State> {
  async init() {
    const { id, dispatch } = this.props;
    const images = await getImages(id);

    dispatch(receiveImages(images));
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
