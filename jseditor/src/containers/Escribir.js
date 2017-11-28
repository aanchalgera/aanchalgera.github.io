import React from 'react';
import { connect } from 'react-redux';

import {
  savePostsList,
  getPost,
  savePostFromEscribirPage
} from './lib/service';
import ImageUploader from 'components/Editor/ImageUploader/ImageUploader';
import { MoreOptions, Title } from 'components/Editor/Escribir';
import { receivePost } from 'actions/post';
import { Action } from 'lib/flowTypes';

const UPDATED_MESSAGE = 'Todo guardado';

type Props = {
  match: { params: Object },
  blogUrl: string,
  blogName: string,
  userRole: string,
  handleStatus: (status: string, date: string) => void,
  dispatch: (action: Action) => void,
  onRef: Function,
  id: string,
  receivePost: (post: Object) => void
};

class Escribir extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.props.onRef(this);
    this.state = {
      openImagePanel: false
    };
  }

  async init() {
    const postname = this.props.match.params.postname;
    const post = await getPost(postname);
    this.props.receivePost(post);
  }

  componentDidMount() {
    this.init();
  }

  openResourcePanel = (
    imageFunction,
    currentIndex,
    addImageModule = '',
    addMoreImages = false,
    event
  ) => {
    this.resourcePanelOpenedBy = currentIndex;
    this.setState({
      openImagePanel: true
    });
  };

  addImage(image) {}

  saveData = () => {
    savePostsList(this.props, this.props.blogName);
    savePostFromEscribirPage(this.props);
    this.props.handleStatus(UPDATED_MESSAGE);
  };

  render() {
    if (this.props.id) {
      return (
        <div className="container-fluid" style={{ paddingTop: '112px' }}>
          <Title saveData={this.saveData} />
          <MoreOptions openResourcePanel={this.openResourcePanel} />
          <ImageUploader
            id={this.props.id}
            open={this.state.openImagePanel}
            addImage={this.addImage}
          />
        </div>
      );
    } else return 'Loading';
  }
}

const mapDispatchToProps = dispatch => {
  return {
    receivePost: post => {
      dispatch(receivePost(post));
    }
  };
};

const mapStateToProps = state => {
  return state.post;
};

export default connect(mapStateToProps, mapDispatchToProps)(Escribir);
