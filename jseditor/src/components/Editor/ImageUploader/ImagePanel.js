//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton } from 'material-ui';
import { FileFileUpload } from 'material-ui/svg-icons';

import { InputEvent } from 'lib/flowTypes';
import { UPLOADER_OPEN, DIALOG_CLOSE } from './actions';
import { CloseButton, Thumbnail, Label } from '.';

type Props = {
  open: boolean,
  images: Array<string>
};

export class ImagePanel extends PureComponent<Props> {
  handleCloseDialog = () => {
    const closeDialogAction = {
      type: DIALOG_CLOSE
    };

    this.props.dispatch(closeDialogAction);
  };

  uploadMoreImages = () => {
    const openUploaderAction = {
      type: UPLOADER_OPEN
    };

    this.props.dispatch(openUploaderAction);
  };

  onSelection = (e: InputEvent) => {
    const imageSrc = e.currentTarget.dataset.src;
    this.props.handleSelection(imageSrc);
    this.handleCloseDialog();
  };

  getDialogActions = () => {
    return (
      <RaisedButton
        label="Subir más imágenes"
        icon={<FileFileUpload className="btn-upload-icon" />}
        onClick={this.uploadMoreImages}
      />
    );
  };

  render() {
    const { open, images } = this.props;

    return (
      <Dialog
        actions={this.getDialogActions()}
        modal={true}
        open={open}
        actionsContainerClassName="modal-actions"
        contentStyle={{ width: '95%', maxWidth: 'none', marginTop: '-100px' }}
      >
        <Row>
          <Col sm={11} className="start-sm">
            <Label label="Elige la imagen que quieres insertar" />
          </Col>
          <Col sm={1} className="end-sm">
            <CloseButton handleClose={this.handleCloseDialog} />
          </Col>
        </Row>
        <Row>
          {images.map((image, index: number) => {
            return (
              <Col key={index} sm={1}>
                <Thumbnail image={image} handleClick={this.onSelection} />
              </Col>
            );
          })}
        </Row>
      </Dialog>
    );
  }
}
