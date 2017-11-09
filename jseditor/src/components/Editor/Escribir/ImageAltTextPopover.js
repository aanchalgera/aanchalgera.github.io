import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {
  Dialog,
  TextField,
  RaisedButton,
  Divider,
  IconButton
} from 'material-ui';
import Close from 'material-ui/svg-icons/navigation/close';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

type Props = {
  imageSrc: string,
  openDialog: boolean,
  goBack: () => void,
  handleCloseDialog: () => void,
  handleSubmit: (data: string) => void
};

export default class ImageAltTextPopover extends PureComponent {
  state = {
    altText: ''
  };

  onTextChange = (value: string) => {
    this.setState({ altText: value });
  };

  getTitle = () => {
    return [
      <span key="title">Insertar imagen en el articulo</span>,
      <IconButton key="close" onClick={this.props.handleCloseDialog}>
        <Close color="black" />
      </IconButton>
    ];
  };

  getDialogActions = () => {
    return [
      <RaisedButton
        label="Volver a elegir"
        icon={<ArrowBack />}
        onClick={this.props.goBack}
      />,
      <RaisedButton
        label="Insertar imagen"
        primary={true}
        disabled={'' == this.state.altText}
        onClick={() => this.props.handleSubmit(this.state.altText)}
      />
    ];
  };

  render() {
    const { imageSrc, openDialog } = this.props;

    return (
      <Dialog
        title={this.getTitle()}
        actions={this.getDialogActions()}
        modal={true}
        open={openDialog}
      >
        <Row>
          <Col sm={5}>
            <img src={imageSrc} alt="" />
          </Col>
          <Col sm={7}>
            <TextField
              hintText="Descripcion de lo que aparece en la imagen"
              floatingLabelText="Texto alternativo"
              floatingLabelFixed={true}
              onChange={this.onTextChange}
            />
          </Col>
        </Row>
        <Divider />
      </Dialog>
    );
  }
}
