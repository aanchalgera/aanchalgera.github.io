//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, TextField, RaisedButton, IconButton } from 'material-ui';
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

  componentWillReceiveProps(nextProps: Props) {
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
      <div className="modal-footer">
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
      </div>
    );
  };

  render() {
    const { imageSrc } = this.props;

    return (
      <Dialog
        actions={this.getDialogActions()}
        modal={true}
        open={this.state.open}
        contentClassName="modal-content"
        actionsContainerClassName="modal-actions"
      >
        <Row>
          <Col sm={11} className="start-sm">
            <h3 className="type-title-dark">Insertar imagen en el artículo</h3>
          </Col>
          <Col sm={1} className="end-sm">
            <IconButton onClick={this.handleCloseDialog}>
              <Close className="btn-close" color="black" />
            </IconButton>
          </Col>
        </Row>
        <Row>
          <Col sm={5}>
            <div className="img-container">
              <img src={imageSrc} alt="" />
            </div>
          </Col>
          <Col sm={7}>
            <TextField
              className="text-container"
              hintText="Descripción de lo que aparece en la imagen"
              floatingLabelText="Texto alternativo"
              floatingLabelFixed={true}
              onChange={this.onTextChange}
            />
          </Col>
        </Row>
      </Dialog>
    );
  }
}
