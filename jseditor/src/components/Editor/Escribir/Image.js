// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { PopoverToolbar, ImageToolbar } from '.';
import { changeCurrentIndex } from 'actions/post';

type Props = {
  alt: string,
  url: string,
  src: string,
  extension: string,
  index: number,
  changeCurrentIndex: (index: number) => void
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

  render() {
    const { alt, src, extension, index } = this.props;
    const url = `${src}/original.${extension}`;
    return (
      <React.Fragment>
        <div className="node-wrapper">
          <img
            src={url}
            alt={alt}
            onClick={this.handleToolbar}
            className={this.state.className}
          />
        </div>
        <PopoverToolbar
          imageEl={this.state.imageEl}
          open={this.state.openImageToolbar}
          closeImageToolbar={this.closeImageToolbar}
          toolbarIcons={
            <ImageToolbar
              index={index}
              closeImageToolbar={this.closeImageToolbar}
            />
          }
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  changeCurrentIndex
})(Image);
