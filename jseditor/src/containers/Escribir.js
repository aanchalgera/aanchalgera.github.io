import React from 'react';
import { connect } from 'react-redux';

import { getPost } from './lib/service';
import { ImageUploader } from 'components/Editor/ImageUploader';
import { Node } from 'components/Editor/Escribir';
import { Action } from 'lib/flowTypes';
import * as actions from 'actions/post';

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
  maxId: number,
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

  componentDidMount() {
    this.init();
  }

  async init() {
    const postname = this.props.match.params.postname;
    const post = await getPost(postname);
    this.props.receivePost(post);
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
    //  savePostsList(this.props, this.props.blogName);
    //  savePostFromEscribirPage(this.props);
    this.props.handleStatus(UPDATED_MESSAGE);
  };

  render() {
    if (this.props.id) {
      var nodes = [];
      for (let i = 0; i <= this.props.maxId; i++) {
        nodes.push(
          <Node
            index={i}
            saveData={this.saveData}
            key={i}
            openResourcePanel={this.openResourcePanel}
          />
        );
      }
      return (
        <div className="container-fluid" style={{ paddingTop: '112px' }}>
          {nodes}
          <ImageUploader
            id={this.props.id}
            site={this.props.blogName}
            open={this.state.openImagePanel}
            addImage={this.addImage}
          />
        </div>
      );
    } else return 'Loading';
  }
}

const mapStateToProps = state => {
  return state.post;
};

export default connect(mapStateToProps, actions)(Escribir);
