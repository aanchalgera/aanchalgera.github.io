import * as React from 'react';
import { connect } from 'react-redux';
import {
  Title,
  MoreOptions,
  Content,
  Image,
  ImageToolbar
} from 'components/Editor/Escribir';
import { deleteSection } from 'actions/post';

type Props = {
  id: number,
  type: string,
  index: number,
  openResourcePanel: Function,
  deleteSection: (index: number) => void
};

type State = {
  openImageToolbar: boolean,
  imageEl: SyntheticEvent<HTMLImageElement>
};

class Node extends React.PureComponent<Props, State> {
  state = {
    openImageToolbar: false,
    imageEl: {}
  };

  getSection = (type, props) => {
    switch (type) {
      case 'title':
        return <Title {...props} />;
      case 'content':
        return <Content {...props} />;
      case 'image':
        return <Image {...props} openImageToolbar={this.openImageToolbar} />;
      default:
        return '';
    }
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
    if (undefined === this.props.id) {
      return '';
    }
    const { id, type, openResourcePanel, ...props } = this.props;
    const section = this.getSection(type, props);
    return (
      <React.Fragment>
        {section}
        <MoreOptions
          openResourcePanel={openResourcePanel}
          dataId={this.props.index}
        />
        <ImageToolbar
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          open={this.state.openImageToolbar}
          imageEl={this.state.imageEl}
          closeImageToolbar={this.closeImageToolbar}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ...state.sections[ownProps.index] };
};

export default connect(mapStateToProps, { deleteSection })(Node);
