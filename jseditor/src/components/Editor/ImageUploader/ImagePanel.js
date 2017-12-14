//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton } from 'material-ui';
import { FileFileUpload } from 'material-ui/svg-icons';

import { InputEvent, Image } from 'lib/flowTypes';
import { CloseButton, Thumbnail, Label } from '.';

type Props = {
  open: boolean,
  images: Array<Image>,
  openUploader: () => void,
  closeDialog: () => void,
  openAltPanel: (image: Image) => void
};

export class ImagePanel extends PureComponent<Props> {
  getDialogActions = () => {
    return (
      <div className="modal-actions">
        <RaisedButton
          label="Subir más imágenes"
          icon={<FileFileUpload className="btn-upload-icon" />}
          onClick={this.props.openUploader}
        />
      </div>
    );
  };

  render() {
    const { open, images, closeDialog, openAltPanel } = this.props;

    return (
      <Dialog
        actions={this.getDialogActions()}
        open={open}
        contentStyle={{ width: '95%', maxWidth: 'none' }}
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
                <Thumbnail
                  image={image}
                  handleClick={(e: InputEvent) =>
                    openAltPanel(e.currentTarget.dataset)
                  }
                />
              </Col>
            );
          })}
        </Row>
      </Dialog>
    );
  }
}
