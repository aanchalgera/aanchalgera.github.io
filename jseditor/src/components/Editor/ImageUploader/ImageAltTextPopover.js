//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, TextField, RaisedButton } from 'material-ui';

import { InputEvent, Image } from 'lib/flowTypes';
import { CloseButton, Label } from '.';

const imageDimension = 'original';

type ImageData = {
  alt: string,
  src: string,
  extension: string,
  height: number,
  width: number,
  index: number
};

type Props = {
  open: boolean,
  imageToEmbed: Image,
  addImage: (imageData: ImageData, mode: string) => void,
  closeDialog: () => void,
  index: number,
  mode: string
};

type State = {
  altText: string
};

export class ImageAltTextPopover extends PureComponent<Props, State> {
  state = {
    altText: ''
  };

  onTextChange = (e: InputEvent, value: string) => {
    this.setState({ altText: value.trim() });
  };

  onKeyPress = (e: InputEvent) => {
    const key = e.which || e.keyCode;

    if ('' !== this.state.altText && 13 === key) {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const {
      imageToEmbed: { src, extension, height, width },
      index,
      addImage,
      mode
    } = this.props;

    const image = {
      alt: this.state.altText,
      src,
      extension,
      height,
      width,
      index,
      layout: 'normal',
      align: 'center'
    };

    addImage(image, mode);
    this.handleCloseDialog();
  };

  handleCloseDialog = () => {
    this.props.closeDialog();
    this.setState({ altText: '' });
  };

  getTitle = () => (
    <div className="modal-title">
      <Row className="m-no-margin">
        <Col sm={11} className="start-sm">
          <Label label="Insertar imagen en el artículo" />
        </Col>
        <Col sm={1} className="end-sm">
          <CloseButton handleClose={this.handleCloseDialog} />
        </Col>
      </Row>
    </div>
  );

  getDialogActions = () => {
    return (
      <div className="modal-actions">
        <Row className="m-no-margin">
          <Col sm={12} className="end-sm">
            <RaisedButton
              label="Insertar imagen"
              primary
              disabled={'' === this.state.altText}
              onClick={this.handleSubmit}
            />
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    const { imageToEmbed: { src, extension }, open } = this.props;
    const imageSrc = `${src}/${imageDimension}.${extension}`;

    return (
      <Dialog
        actions={this.getDialogActions()}
        open={open}
        title={this.getTitle()}
        onRequestClose={this.handleCloseDialog}
        contentStyle={{ width: '95%', maxWidth: 'none' }}
        autoScrollBodyContent
      >
        <Row className="m-no-margin">
          <Col sm={4}>
            <div className="img-container">
              <img src={imageSrc} alt="" />
            </div>
          </Col>
          <Col sm={8}>
            <TextField
              hintText="Descripción de lo que aparece en la imagen"
              floatingLabelText="Texto alternativo"
              floatingLabelFixed
              onChange={this.onTextChange}
              onKeyPress={this.onKeyPress}
              fullWidth
              autoFocus
            />
          </Col>
        </Row>
      </Dialog>
    );
  }
}
