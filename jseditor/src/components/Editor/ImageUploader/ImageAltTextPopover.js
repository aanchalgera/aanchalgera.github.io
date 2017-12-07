//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, TextField, RaisedButton } from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import { Image } from 'lib/flowTypes';
import { CloseButton, Label } from '.';

const imageDimension = 'original';

type Props = {
  open: boolean,
  imageToEmbed: Image,
  addImage: () => void,
  closeDialog: () => void,
  index: number
};

type State = {
  altText: string
};

export class ImageAltTextPopover extends PureComponent<Props, State> {
  state = {
    altText: ''
  };

  onTextChange = (value: string) => {
    this.setState({ altText: value });
  };

  handleSubmit = () => {
    const { imageToEmbed: { src, extension, height, width }, index, addImage, closeDialog } = this.props;

    const image = {
      alt: this.state.altText,
      src,
      extension,
      height,
      width,
      index
    };

    addImage(image);
    closeDialog();
  };

  getDialogActions = () => {
    return (
      <div className="modal-actions">
        <Row>
          <Col sm={6} className="start-sm">
            <RaisedButton
              label="Volver a elegir"
              icon={<ArrowBack />}
              onClick={this.props.goBack}
            />
          </Col>
          <Col sm={6} className="end-sm">
            <RaisedButton
              label="Insertar imagen"
              primary={true}
              disabled={'' === this.state.altText}
              onClick={this.handleSubmit}
            />
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    const { imageToEmbed: { src, extension }, open, closeDialog } = this.props;
    const imageSrc = `${src}/${imageDimension}.${extension}`;

    return (
      <Dialog
        actions={this.getDialogActions()}
        modal={true}
        open={open}
        contentStyle={{ width: '95%', maxWidth: 'none', marginTop: '-100px' }}
      >
        <Row>
          <Col sm={11} className="start-sm">
            <Label label="Insertar imagen en el artículo" />
          </Col>
          <Col sm={1} className="end-sm">
            <CloseButton handleClose={closeDialog} />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <div className="img-container">
              <img src={imageSrc} alt="" />
            </div>
          </Col>
          <Col sm={8}>
            <TextField
              hintText="Descripción de lo que aparece en la imagen"
              floatingLabelText="Texto alternativo"
              floatingLabelFixed={true}
              onChange={this.onTextChange}
              fullWidth={true}
            />
          </Col>
        </Row>
      </Dialog>
    );
  }
}
