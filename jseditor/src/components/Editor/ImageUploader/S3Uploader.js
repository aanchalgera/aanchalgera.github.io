//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton } from 'material-ui';
import { FileFileUpload } from 'material-ui/svg-icons';

import configParams from 'config/configs';
import { InputEvent, Action, Image, S3ImageLocation } from 'lib/flowTypes';
import {
  postImages as postImagesToS3
} from './lib/s3ImageUploadService';
import {
  postImages as postImagesToFirebase
} from './lib/imageUploadService';
import { openImagePanel, closeDialog } from './actions';
import { CloseButton, Label } from '.';

type Props = {
  id: string,
  open: boolean,
  site: string,
  images: Array<Image>,
  dispatch: (action: Action) => void
};

export class S3Uploader extends PureComponent<Props> {
  handleCloseDialog = () => {
    this.props.dispatch(closeDialog());
  };

  getNewImageData = ({ location, extension }: S3ImageLocation) => {
    const baseUrl = `${configParams.s3ImageUrl}/${unescape(location)}/image_dimension.${extension}`;

    return {
      custom_url: baseUrl,
      url: baseUrl.replace('image_dimension', 'original'),
      thumbnail_url: baseUrl.replace('image_dimension', '75_75')
    };
  };

  uploadToFirebase = (imageLocation: S3ImageLocation) => {
    const { id, images, dispatch } = this.props;

    postImagesToFirebase(
      id,
      [...images, this.getNewImageData(imageLocation)]
    );
    dispatch(openImagePanel());
  };

  selectImages = async (e: InputEvent) => {
    const file = e.target.files[0];
    let data = new FormData();

    data.append('site', this.props.site);
    data.append('file', file);

    const image = await postImagesToS3(data);
    if (image.location) {
      this.uploadToFirebase(image);
    }
  };

  render () {
    return (
      <Dialog
        open={this.props.open}
        modal={true}
        contentStyle={{ width: '95%', maxWidth: 'none', marginTop: '-100px' }}
      >
        <Row>
          <Col sm={11}>
            <Label
              label="Sube una o varias imágenes"
              hint="Máximo 8MB cada imagen, puedes subir un archivo ZIP y se añadirán todas"
            />
          </Col>
          <Col sm={1} className="end-sm">
            <CloseButton handleClose={this.handleCloseDialog} />
          </Col>
        </Row>
        <div className="div-uploader">
          <span>
            Puedes arrastrar aqui las imágenes<br />
            o un archivo ZIP para subirlas<br />
            o<br />
          </span>
          <RaisedButton
            className="btn-image-select"
            label="Seleccionar en tu ordenador"
            icon={<FileFileUpload />}
            containerElement="label"
          >
            <input
              type="file"
              onChange={this.selectImages}
              className="file-select-hidden"
            />
          </RaisedButton>
        </div>
      </Dialog>
    );
  }
}
