//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton, CircularProgress } from 'material-ui';
import { FileFileUpload } from 'material-ui/svg-icons';

import { InputEvent, S3Image } from 'lib/flowTypes';
import { postImages as postImagesToS3 } from './lib/s3ImageUploadService';
import { postImages as postImagesToFirebase } from './lib/imageUploadService';
import { CloseButton, Label } from '.';

type Props = {
  id: string,
  open: boolean,
  site: string,
  openImagePanel: () => void,
  closeDialog: () => void
};

type State = {
  showProgress: boolean
};

export class S3Uploader extends PureComponent<Props, State> {
  state = {
    showProgress: false
  };

  uploadToFirebase = (image: S3Image) => {
    const { id, openImagePanel } = this.props;

    postImagesToFirebase(id, image);
    openImagePanel();
  };

  selectImages = async (e: InputEvent) => {
    this.showProgressBar(true);

    const file = e.target.files[0];
    let data = new FormData();
    data.append('file', file);

    const image = await postImagesToS3(this.props.site, data);
    if (image.src) {
      this.uploadToFirebase(image);
    }

    this.showProgressBar(false);
  };

  showProgressBar = (showProgress: boolean) => {
    this.setState({
      showProgress
    });
  };

  render() {
    const { showProgress } = this.state;
    const { closeDialog } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onRequestClose={closeDialog}
        contentStyle={{ width: '95%', maxWidth: 'none' }}
      >
        <Row className="m-no-margin">
          <Col sm={11}>
            <Label
              label="Sube una o varias imágenes"
              hint="Máximo 8MB cada imagen"
            />
          </Col>
          <Col sm={1} className="end-sm">
            <CloseButton handleClose={closeDialog} />
          </Col>
        </Row>
        <div className="uploader">
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
          {showProgress && <div><CircularProgress /></div>}
        </div>
      </Dialog>
    );
  }
}
