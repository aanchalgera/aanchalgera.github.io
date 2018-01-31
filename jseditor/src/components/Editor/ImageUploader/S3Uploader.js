//@flow
import React, { PureComponent, Fragment } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton, CircularProgress } from 'material-ui';
import { FileFileUpload, NavigationArrowBack, FileAttachment } from 'material-ui/svg-icons';

import configParams from 'config/configs';
import { InputEvent } from 'lib/flowTypes';
import { uploadImage } from './lib/helpers';
import { CloseButton, Label } from '.';

const MAX_FILE_SIZE = 8388608;

type Props = {
  id: string,
  open: boolean,
  site: string,
  mode: string,
  totalImages: number,
  openImagePanel: (mode?: string) => void,
  openUploaderWithUrl: () => void,
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

  validateImage = (size: number) => size < MAX_FILE_SIZE;

  selectImages = async (e: InputEvent) => {
    const { id, mode, site, openImagePanel } = this.props;
    const file = e.target.files[0];

    if (!file) {
      this.setErrorMessage('');
      return;
    }

    this.showProgressBar(true);

    if (this.validateImage(file.size)) {
      let data = new FormData();
      data.append('file', file);
      const response = await uploadImage({ id, site, data });

      if (response.status === 200) {
        openImagePanel(mode);
      } else {
        this.setErrorMessage('Something went wrong.');
      }
    } else {
      this.setErrorMessage('Máximo 8MB cada imagen');
    }

    this.showProgressBar(false);
  };

  showProgressBar = (showProgress: boolean) => this.setState({ showProgress });

  setErrorMessage = (errorMessage: string) => this.setState({ errorMessage });

  goBack = () => this.props.openImagePanel(this.props.mode);

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
    const { totalImages, openUploaderWithUrl } = this.props;

    return (
      <div className="modal-actions">
        <Row className="m-no-margin">
          {totalImages !== 0 &&
            <Col sm className="start-sm">
              <RaisedButton
                label="Volver a elegir"
                icon={<NavigationArrowBack />}
                onClick={this.goBack}
              />
            </Col>
          }
          {configParams.version > 1 && <Col sm className="end-sm">
            <RaisedButton
              label="Subir desde url"
              icon={<FileAttachment />}
              onClick={openUploaderWithUrl}
            />
          </Col>}
        </Row>
      </div>
    );
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
