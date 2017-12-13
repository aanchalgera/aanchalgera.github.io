import React from 'react';
import { connect } from 'react-redux';

import {
  getPost,
  savePostsList,
  savePostFromEscribirPage
} from './lib/service';
import { ImageUploader } from 'components/Editor/ImageUploader';
import { Node, MoreOptions } from 'components/Editor/Escribir';
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
  receivePost: (post: Object) => void,
  addImage: (image: Object) => void,
  openImagePanel: () => void,
  fields: [],
  currentIndex: number
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

  openResourcePanel = () => {
    this.props.openImagePanel();
  };

  addImage = image => {
    image.index = this.props.currentIndex;
    image.id = this.props.maxId;
    this.props.addImage(image, this.props.currentPosition);
  };

  saveData = () => {
    savePostsList(this.props, this.props.blogName);
    savePostFromEscribirPage(this.props);
    this.props.handleStatus(UPDATED_MESSAGE);
  };

  render() {
    const sections = this.props.fields;
    if (this.props.id) {
      var nodes = [];
      for (let i = 0; i <= sections.length - 1; i++) {
        nodes.push(
          <Node
            index={i}
            saveData={this.saveData}
            key={sections[i].id}
            openResourcePanel={this.openResourcePanel}
          />
        );
      }
      return (
        <div className="container-fluid" style={{ paddingTop: '112px' }}>
          {nodes}
          {this.props.currentLength === 0 && (
            <MoreOptions openResourcePanel={this.openResourcePanel} />
          )}
          <ImageUploader
            id={this.props.id}
            site={this.props.blogName}
            addImage={this.addImage}
          />
        </div>
      );
    } else return 'Loading';
  }
}

const mapStateToProps = state => {
  return { ...state.post, fields: state.sections };
};

export default connect(mapStateToProps, actions)(Escribir);
