//@flow
import React, { PureComponent, Fragment } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton, CircularProgress } from 'material-ui';
import {
  FileFileUpload,
  NavigationArrowBack,
  FileAttachment
} from 'material-ui/svg-icons';

import configParams from 'config/configs';
import { InputEvent } from 'lib/flowTypes';
import { withUploadHandler } from './WithUploadHandler';

const MAX_FILE_SIZE = 8388608;

type Props = {
  id: string,
  open: boolean,
  site: string,
  mode: string,
  totalImages: number,
  title: string,
  showProgress: boolean,
  errorMessage: string,
  openImagePanel: (mode?: string) => void,
  openUploaderWithUrl: () => void,
  closeDialog: () => void,
  setErrorMessage: (errorMessage: string) => void,
  uploadImageToDb: (data: FormData) => void,
};

const styles = {
  dialog: {
    width: '95%',
    maxWidth: 'none'
  }
};

const S3Uploader = ({
  open,
  mode,
  totalImages,
  title,
  showProgress,
  errorMessage,
  openImagePanel,
  openUploaderWithUrl,
  closeDialog,
  setErrorMessage,
  uploadImageToDb,
}: Props) => {
  const validateImage = (file: Object) => {
    if (!file) {
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('Máximo 8MB cada imagen');
      return false;
    }

    return true;
  };

  const selectImages = (e: InputEvent) => {
    const file = e.target.files[0];

    if (!validateImage(file)) {
      return;
    }

    let data = new FormData();
    data.append('file', file);

    uploadImageToDb(data);
  };

  const goBack = () => openImagePanel(mode);

  const getUploadButton = () => (
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
          onChange={selectImages}
          className="file-select-hidden"
        />
      </RaisedButton>
      <div className="error">{errorMessage}</div>
    </Fragment>
  );

  const getDialogActions = () => (
    <div className="modal-actions">
      <Row className="m-no-margin">
        {totalImages !== 0 &&
          <Col sm className="start-sm">
            <RaisedButton
              label="Volver a elegir"
              icon={<NavigationArrowBack />}
              onClick={goBack}
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

  const contents = showProgress ? (
    <CircularProgress />
  ) : (
    getUploadButton()
  );

  return (
    <Dialog
      open={open}
      title={title}
      actions={getDialogActions()}
      onRequestClose={closeDialog}
      contentStyle={styles.dialog}
    >
      <div className="uploader">{contents}</div>
    </Dialog>
  );
}

export default withUploadHandler(S3Uploader);
