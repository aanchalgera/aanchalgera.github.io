//@flow
import * as React from 'react';
import { connect } from 'react-redux';

import { Image } from 'lib/flowTypes';
import { getImages } from './lib/imageUploadService';
import * as actions from './actions';
import { ImagePanel, S3Uploader, ImageAltTextPopover } from '.';

type Props = {
  imageUrls: Array<Image>,
  id: string,
  site: string,
  isImagePanelOpen: boolean,
  isUploaderOpen: boolean,
  isAltPanelOpen: boolean,
  openImagePanel: () => void,
  openUploader: () => void,
  closeDialog: () => void,
  receiveImages: (images: Array<Image>) => void,
  openAltPanel: () => void,
  imageToEmbed: Image,
  addImage: (image: Object) => void
};

class ImageUploader extends React.PureComponent<Props> {
  componentWillMount() {
    getImages(this.props.id, this.props.receiveImages);
  }

  render() {
    const {
      openImagePanel,
      openUploader,
      closeDialog,
      imageUrls,
      id,
      site,
      isUploaderOpen,
      isImagePanelOpen,
      isAltPanelOpen,
      openAltPanel,
      imageToEmbed,
      addImage
    } = this.props;

    return (
      <div>
        <ImagePanel
          open={isImagePanelOpen}
          images={imageUrls}
          openUploader={openUploader}
          closeDialog={closeDialog}
          openAltPanel={openAltPanel}
        />
        <S3Uploader
          open={isUploaderOpen}
          id={id}
          openImagePanel={openImagePanel}
          closeDialog={closeDialog}
          site={site}
        />
        <ImageAltTextPopover
          open={isAltPanelOpen}
          imageToEmbed={imageToEmbed}
          addImage={addImage}
          closeDialog={closeDialog}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.images;
}

export default connect(mapStateToProps, actions)(ImageUploader);
