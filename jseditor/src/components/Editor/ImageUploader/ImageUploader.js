//@flow
import * as React from 'react';
import { connect } from 'react-redux';

import { Image } from 'lib/flowTypes';
import { getImages } from './lib/imageUploadService';
import * as actions from './actions';
import { ImagePanel, S3Uploader } from '.';

type Props = {
  imageUrls: Array<Image>,
  id: string,
  site: string,
  isImagePanelOpen: boolean,
  isUploaderOpen: boolean,
  openImagePanel: () => void,
  openUploader: () => void,
  closeDialog: () => void,
  receiveImages: (images: Array<Image>) => void,
};

class ImageUploader extends React.PureComponent<Props> {
  async init() {
    const { id, receiveImages } = this.props;
    const images = await getImages(id);

    receiveImages(images);
  }

  componentWillMount() {
    this.init();
  }

  render() {
    const { openImagePanel, openUploader, closeDialog, imageUrls, id, site, isUploaderOpen, isImagePanelOpen } = this.props;

    return (
      <div>
        <ImagePanel open={isImagePanelOpen} images={imageUrls} openUploader={openUploader} closeDialog={closeDialog} />
        <S3Uploader open={isUploaderOpen} id={id} openImagePanel={openImagePanel} closeDialog={closeDialog} site={site} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.images;
}

export default connect(mapStateToProps, actions)(ImageUploader);
