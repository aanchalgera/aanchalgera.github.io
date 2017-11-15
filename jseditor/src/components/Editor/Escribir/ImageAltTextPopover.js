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
  handleSubmit: (data: string) => void
};

export default class ImageAltTextPopover extends PureComponent {
  props: Props;

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
              <img src={imageSrc} alt="" />
            </div>
          </Col>
          <Col sm={8}>
            <TextField
              hintText="Descripción de lo que aparece en la imagen"
              floatingLabelText="Texto alternativo"
              floatingLabelFixed={true}
              onChange={this.onTextChange}
              style={{ width: '95%', paddingLeft: '24px' }}
            />
          </Col>
        </Row>
      </Dialog>
    );
  }
}
