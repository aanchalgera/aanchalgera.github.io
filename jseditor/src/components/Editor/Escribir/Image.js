// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { PopoverToolbar, ImageToolbar } from '.';
import {
  deleteSection,
  changeCurrentIndex,
  openImagePanel
} from 'actions/post';

type Props = {
  alt: string,
  url: string,
  src: string,
  extension: string,
  index: number,
  deleteSection: (index: number) => void,
  changeCurrentIndex: (index: number) => void,
  openImagePanel: (actionName: string) => void
};

type State = {
  openImageToolbar: boolean,
  imageEl: SyntheticEvent<HTMLImageElement>
};

class Image extends React.PureComponent<Props, State> {
  state = {
    openImageToolbar: false,
    imageEl: {},
    className: ''
  };

  handleDelete = () => {
    this.props.deleteSection(this.props.index);
  };

  handleEdit = () => {
    this.props.changeCurrentIndex(this.props.index);
    this.props.openImagePanel('edit');
  };

  openImageToolbar = (event: SyntheticEvent<HTMLImageElement>) => {
    this.setState({
      openImageToolbar: true,
      imageEl: event.currentTarget,
      className: 'img-container'
    });
  };

  closeImageToolbar = () => {
    this.setState({ openImageToolbar: false, className: '' });
  };

  render() {
    const { alt, src, extension } = this.props;
    const url = `${src}/original.${extension}`;
    return (
      <React.Fragment>
        <img
          src={url}
          alt={alt}
          onClick={this.openImageToolbar}
          className={this.state.className}
        />
        <PopoverToolbar
          imageEl={this.state.imageEl}
          open={this.state.openImageToolbar}
          closeImageToolbar={this.closeImageToolbar}
          toolbarIcons={<ImageToolbar />}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  deleteSection,
  changeCurrentIndex,
  openImagePanel
})(Image);
