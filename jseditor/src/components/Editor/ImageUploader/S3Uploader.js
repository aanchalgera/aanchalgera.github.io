//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton } from 'material-ui';
import { FileFileUpload } from 'material-ui/svg-icons';

import configParams from 'config/configs';
import { InputEvent, S3ImageLocation } from 'lib/flowTypes';
import {
  postImages as postImagesToS3
} from './lib/s3ImageUploadService';
import {
  postImages as postImagesToFirebase
} from './lib/imageUploadService';
import { CloseButton, Label } from '.';

type Props = {
  id: string,
  open: boolean,
  site: string,
  openImagePanel: () => void,
  closeDialog: () => void
};

export class S3Uploader extends PureComponent<Props> {
  uploadToFirebase = ({ location, extension }: S3ImageLocation) => {
    const { id, openImagePanel } = this.props;
    const imageUrl = `${configParams.s3ImageUrl}/${unescape(location)}/image_dimension.${extension}`;

    postImagesToFirebase(id, { url: imageUrl });
    openImagePanel();
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
    const { closeDialog } = this.props;

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
            <CloseButton handleClose={closeDialog} />
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
