//@flow
import React, { PureComponent, Fragment } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton, CircularProgress, TextField } from 'material-ui';
import { NavigationArrowBack } from 'material-ui/svg-icons';

import { InputEvent } from 'lib/flowTypes';
import { withUploadHandler } from './WithUploadHandler';

type Props = {
  id: string,
  open: boolean,
  site: string,
  mode: string,
  title: string,
  showProgress: boolean,
  errorMessage: string,
  openImagePanel: (mode?: string) => void,
  closeDialog: () => void,
  openUploader: () => void,
  setErrorMessage: (errorMessage: string) => void,
  uploadImageToDb: (data: FormData) => void,
};

type State = {
  url: string,
};

class UrlUploader extends PureComponent<Props, State> {
  state = {
    url: '',
  };

  componentWillReceiveProps() {
    this.setState({
      url: '',
    });
  }

  selectImage = () => {
    if (!this.state.url) {
      return;
    }

    let data = new FormData();
    data.append('url', this.state.url);
    this.props.uploadImageToDb(data);
  };

  onUrlChange = (e: InputEvent, url: string) => this.setState({ url });

  goBack = () => this.props.openUploader();

  getDialogActions = () => (
    <div className="modal-actions">
      <Row className="m-no-margin">
        <Col sm className="start-sm">
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
      <div className="error">{this.props.errorMessage}</div>
    </Fragment>
  );

  render() {
    const { open, title, showProgress, closeDialog } = this.props;
    const contents = showProgress ? (
      <CircularProgress />
    ) : (
      this.getUrlField()
    );

    return (
      <Dialog
        open={open}
        title={title}
        actions={this.getDialogActions()}
        onRequestClose={closeDialog}
        contentStyle={{ width: '95%', maxWidth: 'none' }}
      >
        <div className="uploader">{contents}</div>
      </Dialog>
    );
  }
}

export default withUploadHandler(UrlUploader);
