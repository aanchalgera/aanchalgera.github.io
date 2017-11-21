//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton } from 'material-ui';
import FileUpload from 'material-ui/svg-icons/file/file-upload';

import { InputEvent } from 'lib/flowTypes';
import { CloseButton, Thumbnail, Label } from '.';

type Props = {
  open: boolean,
  images: Array<string>,
  handleSelection: (data: string) => void,
  openImageUploader: () => void
};

type State = {
  open: boolean
}

export default class ImagePanel extends PureComponent<Props, State> {
  state = {
    open: false
  };

  componentWillMount() {
    this.setState({
      open: this.props.open
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      open: nextProps.open
    });
  }

  handleCloseDialog = () => {
    this.setState({ open: false });
  };

  uploadMoreImages = () => {
    this.handleCloseDialog();
    this.props.openImageUploader();
  };

  onSelection = (e: InputEvent) => {
    const imageSrc = e.currentTarget.dataset.src;
    this.props.handleSelection(imageSrc);
    this.handleCloseDialog();
  };

  getDialogActions = () => {
    return (
      <RaisedButton
        label="Subir más imágenes"
        icon={<FileUpload className="btn-upload-icon" />}
        onClick={this.uploadMoreImages}
      />
    );
  };

  render() {
    return (
      <Dialog
        actions={this.getDialogActions()}
        modal={true}
        open={this.state.open}
        actionsContainerClassName="modal-actions"
        contentStyle={{ width: '95%', maxWidth: 'none', marginTop: '-100px' }}
      >
        <Row>
          <Col sm={11} className="start-sm">
            <Label label="Elige la imagen que quieres insertar" />
          </Col>
          <Col sm={1} className="end-sm">
            <CloseButton handleClose={this.handleCloseDialog} />
          </Col>
        </Row>
        <Row>
          {this.props.images.map((image, index: number) => {
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
