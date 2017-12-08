import React from 'react';
import { connect } from 'react-redux';

import {
  getPost,
  savePostsList,
  savePostFromEscribirPage
} from './lib/service';
import { ImageUploader } from 'components/Editor/ImageUploader';
import { Node } from 'components/Editor/Escribir';
import { Action } from 'lib/flowTypes';
import * as actions from 'actions/post';
import { openImagePanel } from '../actions/post';

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
  receivePost: (post: Object) => void,
  addImage: (image: Object) => void
};

class Escribir extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.props.onRef(this);
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    const postname = this.props.match.params.postname;
    const post = await getPost(postname);
    this.props.receivePost(post);
  }

  openResourcePanel = (currentIndex: number) => {
    this.resourcePanelOpenedBy = currentIndex;
    this.props.openImagePanel();
  };

  addImage = image => {
    image.id = this.props.maxId;
    this.props.addImage(image);
  };

  saveData = () => {
    savePostsList(this.props, this.props.blogName);
    savePostFromEscribirPage(this.props);
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
        <div className="container-fluid">
          <div className="grid-wrapper grid-l">
            {nodes}
            <ImageUploader
              id={this.props.id}
              site={this.props.blogName}
              addImage={this.addImage}
            />
          </div>
        </div>
      );
    } else return 'Loading';
  }
}

const mapStateToProps = state => {
  return { ...state.post, fields: state.sections };
};

export default connect(mapStateToProps, actions)(Escribir);
