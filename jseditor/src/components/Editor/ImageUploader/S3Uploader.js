//@flow
import React, { PureComponent, Fragment } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton, CircularProgress } from 'material-ui';
import { FileFileUpload, NavigationArrowBack } from 'material-ui/svg-icons';

import { InputEvent, S3Image } from 'lib/flowTypes';
import { postImage as postImageToS3 } from 'lib/s3ImageUploadService';
import { postImages as postImagesToFirebase } from './lib/imageUploadService';
import { CloseButton, Label } from '.';
import configParams from 'config/configs';

const MAX_FILE_SIZE = 8388608;

type Props = {
  id: string,
  open: boolean,
  site: string,
  mode: string,
  totalImages: number,
  openImagePanel: (mode: string) => void,
  closeDialog: () => void
};

type State = {
  showProgress: boolean,
  errorMessage: string
};

export class S3Uploader extends PureComponent<Props, State> {
  state = {
    showProgress: false,
    errorMessage: ''
  };

  componentWillReceiveProps() {
    this.setErrorMessage('');
  }

  uploadToFirebase = (image: S3Image) => {
    const { id, mode, openImagePanel } = this.props;

    postImagesToFirebase(id, image);
    openImagePanel(mode);
  };

  selectImages = async (e: InputEvent) => {
    this.showProgressBar(true);

    const file = e.target.files[0];

    if (file.size > MAX_FILE_SIZE) {
      this.setErrorMessage('Máximo 8MB cada imagen');
    } else {
      let data = new FormData();
      data.append('file', file);
      const image = await postImageToS3(this.props.site, data);
      if (image.src) {
        this.uploadToFirebase(image);
      }
    }

    this.showProgressBar(false);
  };

  showProgressBar = (showProgress: boolean) => {
    this.setState({
      showProgress
    });
  };

  setErrorMessage = (errorMessage: string) => {
    this.setState({
      errorMessage
    });
  };

  getTitle = () => (
    <div className="modal-title">
      <Row className="m-no-margin">
        <Col sm={11}>
          <Label
            label="Sube una o varias imágenes"
            hint="Máximo 8MB cada imagen"
          />
        </Col>
        <Col sm={1} className="end-sm">
          <CloseButton handleClose={this.props.closeDialog} />
        </Col>
      </Row>
    </div>
  );

  getUploadButton = () => {
    return (
      <Fragment>
        <RaisedButton
          className="btn-image-select"
          label="Seleccionar en tu ordenador"
          icon={<FileFileUpload />}
          containerElement="label"
        >
          <input
            type="file"
            accept="image/*"
            onChange={this.selectImages}
            className="file-select-hidden"
          />
        </RaisedButton>
        <div className="error">{this.state.errorMessage}</div>
      </Fragment>
    );
  };

  getDialogActions = () => {
    const { totalImages, openImagePanel } = this.props;

    if (totalImages !== 0) {
      return (
        <div className="modal-actions">
          <Row className="m-no-margin">
            <Col sm className="start-sm">
              <RaisedButton
                label="Volver a elegir"
                icon={<NavigationArrowBack />}
                onClick={openImagePanel}
              />
            </Col>
          </Row>
        </div>
      );
    }
  };

  render() {
    const { showProgress } = this.state;
    const { closeDialog } = this.props;
    const contents = showProgress ? (
      <CircularProgress />
    ) : (
      this.getUploadButton()
    );

    return (
      <Dialog
        open={this.props.open}
        title={this.getTitle()}
        actions={this.getDialogActions()}
        onRequestClose={closeDialog}
        contentStyle={{ width: '95%', maxWidth: 'none' }}
      >
        <div className="uploader">{contents}</div>
      </Dialog>
    );
  }
}
