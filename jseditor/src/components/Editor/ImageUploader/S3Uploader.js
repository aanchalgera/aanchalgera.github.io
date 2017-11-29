//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton } from 'material-ui';
import { FileFileUpload } from 'material-ui/svg-icons';

import { InputEvent, Action } from 'lib/flowTypes';
import {
  postImages as postImagesToS3
} from './lib/s3ImageUploadService';
import { openImagePanel, closeDialog } from './actions';
import { CloseButton, Label } from '.';

type Props = {
  open: boolean,
  dispatch: (action: Action) => void
};

export class S3Uploader extends PureComponent<Props> {
  handleCloseDialog = () => {
    this.props.dispatch(closeDialog());
  };

  uploadToFirebase = () => {
    // To be added
  };

  selectImages = async (e: InputEvent) => {
    // const imageUrl = await postImagesToS3({
    //   site: this.props.site,
    //   file: e.target.files[0]
    // });
    // await this.uploadToFirebase();

    this.props.dispatch(openImagePanel());
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
