//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton } from 'material-ui';
import { FileFileUpload } from 'material-ui/svg-icons';

import { InputEvent } from 'lib/flowTypes';
import { CloseButton, Thumbnail, Label } from '.';

type Props = {
  open: boolean,
  images: Array<string>,
  openUploader: () => void,
  closeDialog: () => void
};

export class ImagePanel extends PureComponent<Props> {
  onSelection = (e: InputEvent) => {
    const imageSrc = e.currentTarget.dataset.src;
    this.props.closeDialog();
  };

  getDialogActions = () => {
    return (
      <RaisedButton
        label="Subir más imágenes"
        icon={<FileFileUpload className="btn-upload-icon" />}
        onClick={this.props.openUploader}
      />
    );
  };

  render() {
    const { open, images, closeDialog } = this.props;

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
            <CloseButton handleClose={closeDialog} />
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
