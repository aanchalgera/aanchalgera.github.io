//@flow
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton, IconButton } from 'material-ui';
import Close from 'material-ui/svg-icons/navigation/close';
import FileUpload from 'material-ui/svg-icons/file/file-upload';

type Props = {
  open: boolean,
  images: Array<string>,
  handleSelection: (data: string) => void,
  openCloudinaryUploader: () => void
};

export default class ImagePanel extends PureComponent {
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
    this.props.openCloudinaryUploader();
  };

  onSelection = (imageSrc: string) => {
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
        contentClassName="modal-content"
        actionsContainerClassName="modal-actions"
      >
        <Row>
          <Col sm={11} className="start-sm">
            <h3 className="type-title-dark">
              Elige la imagen que quieres insertar
            </h3>
          </Col>
          <Col sm={1} className="end-sm">
            <IconButton onClick={this.handleCloseDialog}>
              <Close className="btn-close" color="black" />
            </IconButton>
          </Col>
        </Row>
        <Row>
          {this.props.images.map((imageSrc: string, index: number) => {
            return (
              <Col key={index} sm={2}>
                <div className="img-container">
                  <img
                    src={imageSrc}
                    style={{ width: '100%' }}
                    onClick={() => this.onSelection(imageSrc)}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      </Dialog>
    );
  }
}
