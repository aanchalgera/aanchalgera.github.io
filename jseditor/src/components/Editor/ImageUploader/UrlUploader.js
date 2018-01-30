//@flow
import React, { PureComponent, Fragment } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton, CircularProgress, TextField } from 'material-ui';
import { NavigationArrowBack } from 'material-ui/svg-icons';

import { uploadImage } from './lib/helpers';
import { InputEvent } from 'lib/flowTypes';
import { CloseButton, Label } from '.';

type Props = {
  id: string,
  open: boolean,
  site: string,
  mode: string,
  openImagePanel: (mode?: string) => void,
  closeDialog: () => void,
  openUploader: () => void
};

type State = {
  url: string,
  showProgress: boolean,
  errorMessage: string
};

export class UrlUploader extends PureComponent<Props, State> {
  state = {
    url: '',
    showProgress: false,
    errorMessage: ''
  };

  componentWillReceiveProps() {
    this.setErrorMessage('');
    this.resetUrl();
  }

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

  onUrlChange = (e: InputEvent, url: string) => {
    this.setState({
      url
    });
  };

  resetUrl = () => {
    this.setState({ url: '' });
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

  selectImage = async () => {
    const { id, mode, site, openImagePanel } = this.props;

    this.showProgressBar(true);

    let data = new FormData();
    data.append('url', this.state.url);
    const response = await uploadImage({ id, site, data });

    if (response.status === 200) {
      openImagePanel(mode);
    } else {
      this.setErrorMessage('Something went wrong.');
    }

    this.showProgressBar(false);
  };

  goBack = () => {
    this.props.openUploader();
  }

  getDialogActions = () => (
    <div className="modal-actions">
      <Row className="m-no-margin">
        <Col sm>
          <RaisedButton
            label="Volver a elegir"
            icon={<NavigationArrowBack />}
            onClick={this.goBack}
          />
        </Col>
      </Row>
    </div>
  );

  getUrlField = () => (
    <Fragment>
      <TextField
        name="url"
        className="url-upload"
        value={this.state.url}
        onChange={this.onUrlChange}
      />
      <RaisedButton
        label="Upload"
        onClick={this.selectImage}
        primary
      />
      <div className="error">{this.state.errorMessage}</div>
    </Fragment>
  );

  render() {
    const { open, closeDialog } = this.props;
    const contents = this.state.showProgress ? (
      <CircularProgress />
    ) : (
      this.getUrlField()
    );

    return (
      <Dialog
        open={open}
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
