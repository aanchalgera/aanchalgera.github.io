//@flow
import * as React from 'react';
import { connect } from 'react-redux';

import { Image } from 'lib/flowTypes';
import configParams from 'config/configs';
import { getImages } from './lib/imageUploadService';
import * as actions from './actions';
import { ImagePanel, S3Uploader, ImageAltTextPopover, UrlUploader } from '.';

type Props = {
  imageUrls: Array<Image>,
  id: string,
  site: string,
  modelOpen: string,
  openImagePanel: () => void,
  openUploader: () => void,
  openUploaderWithUrl: () => void,
  closeDialog: () => void,
  receiveImages: (images: Array<Image>) => void,
  openAltPanel: () => void,
  imageToEmbed: Image,
  addImage: (image: Object) => void,
  mode: string
};

class ImageUploader extends React.Component<Props> {
  componentWillMount() {
    getImages(this.props.id, this.props.receiveImages);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { imageUrls, modelOpen, openUploader } = nextProps;
    if ('imagePanel' === modelOpen && 0 === imageUrls.length) {
      openUploader();
      return false;
    }
    return true;
  }

  render() {
    const {
      openImagePanel,
      openUploader,
      openUploaderWithUrl,
      closeDialog,
      imageUrls,
      id,
      site,
      modelOpen,
      openAltPanel,
      imageToEmbed,
      addImage,
      mode
    } = this.props;

    return (
      <div>
        <ImagePanel
          open={'imagePanel' === modelOpen}
          images={imageUrls}
          openUploader={openUploader}
          closeDialog={closeDialog}
          openAltPanel={openAltPanel}
        />
        <S3Uploader
          open={'imageUploader' === modelOpen}
          id={id}
          openImagePanel={openImagePanel}
          mode={mode}
          closeDialog={closeDialog}
          site={site}
          totalImages={imageUrls.length}
          openUploaderWithUrl={openUploaderWithUrl}
        />
        {configParams.version > 1 && <UrlUploader
          open={'uploaderWithUrl' === modelOpen}
          id={id}
          openImagePanel={openImagePanel}
          mode={mode}
          closeDialog={closeDialog}
          site={site}
          openUploader={openUploader}
        />}
        <ImageAltTextPopover
          open={'imageAltDialog' === modelOpen}
          imageToEmbed={imageToEmbed}
          addImage={addImage}
          closeDialog={closeDialog}
          mode={mode}
          openImagePanel={openImagePanel}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.images;
}

export default connect(mapStateToProps, actions)(ImageUploader);
