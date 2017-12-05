//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, TextField, RaisedButton } from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import { CloseButton, Label } from '.';

type Props = {
  imageSrc: string,
  open: boolean,
  goBack: () => void,
  imageToEmbed: string,
  addImage: () => void,
  maxId: number,
  closeDialog: () => void,
  index: number
};

type State = {
  open: boolean,
  altText: string
};

export class ImageAltTextPopover extends PureComponent<Props, State> {
  state = {
    open: false,
    altText: ''
  };

  componentWillMount() {
    this.setState({ open: this.props.open });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ open: nextProps.open });
  }

  onTextChange = (value: string) => {
    this.setState({ altText: value });
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.props.closeDialog();
    const image = {
      id: this.props.maxId,
      alt: this.state.altText,
      url: this.props.imageToEmbed,
      index: this.props.index
    };
    this.props.addImage(image);
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
              onClick={() => this.handleSubmit()}
            />
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    const { imageToEmbed } = this.props;
    return (
      <Dialog
        actions={this.getDialogActions()}
        modal={true}
        open={this.state.open}
        contentStyle={{ width: '95%', maxWidth: 'none', marginTop: '-100px' }}
      >
        <Row>
          <Col sm={11} className="start-sm">
            <Label label="Insertar imagen en el artículo" />
          </Col>
          <Col sm={1} className="end-sm">
            <CloseButton handleClose={this.handleCloseDialog} />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <div className="img-container">
              <img src={imageToEmbed} alt="" />
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
