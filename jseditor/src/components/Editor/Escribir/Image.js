// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { PopoverToolbar, ImageToolbar } from '.';
import { closeModal, openModal } from 'actions/modal';

const MODAL_NAME = 'image_toolbar_';
type Props = {
  alt: string,
  url: string,
  src: string,
  extension: string,
  modalName: string,
  index: number,
  openModal: (actionName: string, index: number) => void,
  closeModal: () => void
};
type State = {
  openImageToolbar: boolean,
  imageEl: SyntheticEvent<HTMLImageElement>
};

class Image extends React.PureComponent<Props, State> {
  state = {
    imageEl: {},
    className: ''
  };

  openToolbar = () => {
    this.props.openModal(MODAL_NAME, this.props.index);
  };

  handleToolbar = (event: SyntheticEvent<HTMLImageElement>) => {
    this.setState(
      {
        imageEl: event.currentTarget,
        className: 'img-container'
      },
      this.openToolbar
    );
  };

  closeImageToolbar = () => {
    this.setState({ className: '' }, this.props.closeModal);
  };

  render() {
    const { alt, src, extension, modalName, index } = this.props;
    const url = `${src}/original.${extension}`;
    return (
      <React.Fragment>
        <img
          src={url}
          alt={alt}
          onClick={this.handleToolbar}
          className={this.state.className}
        />
        <PopoverToolbar
          imageEl={this.state.imageEl}
          open={modalName === MODAL_NAME + index}
          closeImageToolbar={this.closeImageToolbar}
          toolbarIcons={<ImageToolbar index={index} />}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalName: state.modal.modalName
  };
};

export default connect(mapStateToProps, {
  openModal,
  closeModal
})(Image);
