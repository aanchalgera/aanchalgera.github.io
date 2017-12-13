import * as React from 'react';
import { connect } from 'react-redux';
import { ImageToolbar } from '.';
import { deleteSection } from 'actions/post';

type Props = {
  alt: string,
  url: string,
  src: string,
  extension: string,
  index: number,
  deleteSection: (index: number) => void
};

type State = {
  openImageToolbar: boolean,
  imageEl: SyntheticEvent<HTMLImageElement>
};

class Image extends React.PureComponent<Props, State> {
  state = {
    openImageToolbar: false,
    imageEl: {}
  };

  handleDelete = () => {
    this.props.deleteSection(this.props.index);
  };

  openImageToolbar = (event: SyntheticEvent<HTMLImageElement>) => {
    this.setState({ openImageToolbar: true, imageEl: event.currentTarget });
  };

  closeImageToolbar = () => {
    this.setState({ openImageToolbar: false });
  };

  render() {
    const { alt, src, extension } = this.props;
    const url = `${src}/original.${extension}`;
    return (
      <React.Fragment>
        <img src={url} alt={alt} onClick={this.openImageToolbar} />
        <ImageToolbar
          handleDelete={this.handleDelete}
          open={this.state.openImageToolbar}
          imageEl={this.state.imageEl}
          closeImageToolbar={this.closeImageToolbar}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { deleteSection })(Image);
