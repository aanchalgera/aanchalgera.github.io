// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { TextField } from 'material-ui';

import { InputEvent } from 'lib/flowTypes';
import configParams from 'config/configs';
import { PopoverToolbar, ImageToolbar } from '.';
import {
  changeLayout,
  deleteSection,
  changeCurrentIndex,
  openImagePanel,
  editImage
} from 'actions/post';

const normalCaption = 'caption-img';

type Props = {
  alt: string,
  src: string,
  extension: string,
  index: number,
  layout: string,
  align: string,
  height: number,
  width: number,
  caption: string,
  caption_text: string,
  editImage: (image: any) => void,
  changeCurrentIndex: (index: number) => void,
  openImagePanel: (actionName: string) => void,
  deleteSection: (index: number, maxId: number) => void,
  changeLayout: (index: number, layout: string, align: string) => void,
  maxId: number
};
type State = {
  openToolbar: boolean,
  imageEl: any,
  captionText: string,
  className: string
};

class Image extends React.PureComponent<Props, State> {
  state = {
    openToolbar: false,
    imageEl: {},
    captionText: this.props.caption_text,
    className: ''
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ captionText: nextProps.caption_text });
  }

  changeCurrentIndex = () => {
    this.props.changeCurrentIndex(this.props.index);
  };

  handleToolbar = (event: SyntheticEvent<HTMLImageElement>) => {
    this.setState(
      {
        openToolbar: true,
        imageEl: event.currentTarget.parentNode,
        className: 'img-container'
      },
      this.changeCurrentIndex
    );
  };

  closeToolbar = () => {
    this.setState({
      openToolbar: false,
      className: ''
    });
  };

  onCaptionChange = (e: InputEvent, captionText: string) =>
    this.setState({ captionText });

  submitCaption = () => {
    const { index, editImage } = this.props;

    editImage({
      index,
      caption: normalCaption,
      caption_text: this.state.captionText
    });
  };

  handleDelete = () => {
    const { deleteSection, index, maxId } = this.props;
    deleteSection(index, maxId);
  };

  changeLayout = (layout, align) => {
    const { index, changeLayout } = this.props;
    changeLayout(index, layout, align);
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
      openImagePanel
    } = this.props;
    const url = `${src}/original.${extension}`;
    const showCaption = configParams.version > 1 && ['normal', 'large'].includes(layout);

    return (
      <div className={`${layout}-${align}`}>
        <div className="node-wrapper">
          <img
            src={url}
            alt={alt}
            onClick={this.handleToolbar}
            className={this.state.className}
          />
          {showCaption && (
            <TextField
              name="imageCaption"
              hintText="Pie de foto(opcional)"
              value={this.state.captionText}
              onChange={this.onCaptionChange}
              onBlur={this.submitCaption}
              fullWidth
            />
          )}
        </div>
        <PopoverToolbar
          imageEl={this.state.imageEl}
          open={this.state.openToolbar}
          closeToolbar={this.closeToolbar}
          toolbarIcons={
            <ImageToolbar
              index={index}
              closeToolbar={this.closeToolbar}
              selectedKey={`${layout}-${align}`}
              maxId={maxId}
              handleDelete={this.handleDelete}
              changeLayout={this.changeLayout}
              openImagePanel={openImagePanel}
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
  editImage,
  changeLayout,
  deleteSection,
  changeCurrentIndex,
  openImagePanel
})(Image);
