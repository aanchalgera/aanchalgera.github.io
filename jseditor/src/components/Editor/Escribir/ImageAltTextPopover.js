//@flow
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
  open: boolean,
  goBack: () => void,
  handleSubmit: (data: string) => void
};

export default class ImageAltTextPopover extends PureComponent {
  state = {
    open: false,
    altText: ''
  };

  componentWillMount() {
    this.setState({ open: this.props.open });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open });
  }

  onTextChange = (value: string) => {
    this.setState({ altText: value });
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
  };

  getDialogActions = () => {
    return (
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
            disabled={'' == this.state.altText}
            onClick={() => this.props.handleSubmit(this.state.altText)}
          />
        </Col>
      </Row>
    );
  };

  render() {
    const { imageSrc } = this.props;

    return (
      <div className="modal-content">
        <Dialog
          actions={this.getDialogActions()}
          modal={true}
          open={this.state.open}
        >
          <Row>
            <Col sm={11}>
              <h3>Insertar imagen en el artículo</h3>
            </Col>
            <Col sm={1}>
              <IconButton key="close" onClick={this.handleCloseDialog}>
                <Close color="black" />
              </IconButton>
            </Col>
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
          <div className="modal-footer">
            <Divider />
          </div>
        </Dialog>
      </div>
    );
  }
}
