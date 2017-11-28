//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton } from 'material-ui';
import { FileFileUpload } from 'material-ui/svg-icons';

import { InputEvent } from 'lib/flowTypes';
import {
  postImages as postImagesToS3
} from './lib/s3ImageUploadService';
import { IMAGEPANEL_OPEN, DIALOG_CLOSE } from './actions';
import { CloseButton, Label } from '.';

type ImagePanelAction = {
  type: string,
};

type Props = {
  open: boolean,
  dispatch: (action: ImagePanelAction) => void
};

export class S3Uploader extends PureComponent<Props> {
  handleCloseDialog = () => {
    const closeDialogAction = {
      type: DIALOG_CLOSE
    };

    this.props.dispatch(closeDialogAction);
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

    const openImagePanelAction = {
      type: IMAGEPANEL_OPEN
    };

    this.props.dispatch(openImagePanelAction);
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
