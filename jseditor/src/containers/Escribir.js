import React from 'react';
import { connect } from 'react-redux';

import {
  savePostsList,
  getPost,
  savePostFromEscribirPage
} from './lib/service';
import ImageUploader from 'components/Editor/ImageUploader/ImageUploader';
import { Title, MoreOptions } from 'components/Editor/Escribir';
import { receivePost, changeTitle } from 'actions/post';

const UPDATED_MESSAGE = 'Todo guardado';

type Props = {
  match: { params: Object },
  blogUrl: string,
  blogName: string,
  userRole: string,
  handleStatus: (status: string, date: string) => void,
  dispatch: (action: Object) => void,
  onRef: Function,
  title: string,
  id: string
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
    this.props.dispatch(receivePost(post));
    this.maxId = post.maxId || 1;
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

  changeTitle = title => {
    this.props.dispatch(changeTitle(title));
  };

  saveData = () => {
    let data = {
      ...this.props,
      maxId: this.maxId
    };
    savePostsList(this.props, this.props.blogName);
    savePostFromEscribirPage(data);
    this.props.handleStatus(UPDATED_MESSAGE);
  };

  render() {
    if (this.props.id) {
      return (
        <div className="container-fluid" style={{ paddingTop: '112px' }}>
          <Title
            title={this.props.title}
            saveData={this.saveData}
            changeTitle={this.changeTitle}
          />
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

const mapStateToProps = state => {
  return state.post;
};

export default connect(mapStateToProps)(Escribir);
