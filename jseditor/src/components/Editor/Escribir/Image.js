// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { TextField } from 'material-ui';

import { PopoverToolbar, ImageToolbar } from '.';
import { changeCurrentIndex, editImage } from 'actions/post';
import { InputEvent } from 'lib/flowTypes';
import configParams from 'config/configs';

type Props = {
  alt: string,
  src: string,
  extension: string,
  index: number,
  layout: string,
  align: string,
  height: number,
  width: number,
  description: string,
  editImage: (image: any) => void,
  changeCurrentIndex: (index: number) => void,
  maxId: number
};
type State = {
  openImageToolbar: boolean,
  imageEl: any,
  description: string,
  className: string
};

class Image extends React.PureComponent<Props, State> {
  state = {
    openImageToolbar: false,
    imageEl: {},
    description: '',
    className: ''
  };

  changeCurrentIndex = () => {
    this.props.changeCurrentIndex(this.props.index);
  };

  handleToolbar = (event: SyntheticEvent<HTMLImageElement>) => {
    this.setState(
      {
        openImageToolbar: true,
        imageEl: event.currentTarget.parentNode,
        className: 'img-container'
      },
      this.changeCurrentIndex
    );
  };

  closeImageToolbar = () => {
    this.setState({
      openImageToolbar: false,
      className: ''
    });
  };

  onDescriptionChange = (e: InputEvent, description: string) => this.setState({ description });

  submitDescription = () => {
    const {
      alt,
      src,
      extension,
      index,
      layout,
      align,
      height,
      width,
      editImage
    } = this.props;

    editImage({
      alt,
      src,
      extension,
      index,
      layout,
      align,
      height,
      width,
      description: this.state.description,
    });
  };

  render() {
    const {
      alt,
      src,
      extension,
      index,
      align,
      layout,
      maxId,
      description
    } = this.props;
    const url = `${src}/original.${extension}`;

    return (
      <div className={`${layout}-${align}`}>
        <div className="node-wrapper">
          <img
            src={url}
            alt={alt}
            onClick={this.handleToolbar}
            className={this.state.className}
          />
          {configParams.version > 1 && <TextField
            name="imageDescription"
            hintText="Pie de foto(opcional)"
            defaultValue={description}
            onChange={this.onDescriptionChange}
            onBlur={() => this.submitDescription()}
            fullWidth
          />}
        </div>
        <PopoverToolbar
          imageEl={this.state.imageEl}
          open={this.state.openImageToolbar}
          closeImageToolbar={this.closeImageToolbar}
          toolbarIcons={
            <ImageToolbar
              index={index}
              closeImageToolbar={this.closeImageToolbar}
              selectedKey={`${layout}-${align}`}
              maxId={maxId}
            />
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  changeCurrentIndex,
  editImage
})(Image);
