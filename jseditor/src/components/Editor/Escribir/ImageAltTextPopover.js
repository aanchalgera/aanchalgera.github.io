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
  handleSubmit: (data: string) => void
};

export default class ImageAltTextPopover extends PureComponent {
  state = {
    open: false,
    altText: ''
  };

  componentWillMount() {
    this.setState({ open: this.props.openDialog });
  }

  onTextChange = (value: string) => {
    this.setState({ altText: value });
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
  };

  getTitle = () => {
    return [
      <span key="title">Insertar imagen en el artículo</span>,
      <IconButton key="close" onClick={this.handleCloseDialog}>
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
    const { imageSrc } = this.props;

    return (
      <Dialog
        title={this.getTitle()}
        actions={this.getDialogActions()}
        modal={true}
        open={this.state.open}
      >
        <Row>
          <Col sm={5}>
            <img src={imageSrc} alt="" />
          </Col>
          <Col sm={7}>
            <TextField
              hintText="Descripción de lo que aparece en la imagen"
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
