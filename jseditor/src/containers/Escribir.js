import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { Check, init as initCheck, isValidUser } from 'lib/check';
import { ImageUploader } from 'components/Editor/ImageUploader';

import {
  listenToPost,
  submitPostToBackend,
  savePostFromEscribirPage,
  updatePost
} from './lib/service';
import {
  Node,
  MoreOptions,
  Title,
  Warning,
  SnackbarPopover,
  News,
  EditWarning,
  SummaryModal
} from 'components/Editor/Escribir';
import * as actions from 'actions/post';
import { openModal } from 'actions/modal';

const UPDATED_MESSAGE = 'Guardando...';

type Props = {
  match: { params: Object },
  blogName: string,
  blogUrl: string,
  title: string,
  status: string,
  handleStatus: (status: string, date: string) => void,
  onRef: Function,
  id: string,
  postId: number,
  maxId: number,
  receivePost: (post: Object) => void,
  addImage: (image: Object) => void,
  addSection: (section: Object, position: number) => void,
  editSection: (section: Object) => void,
  openImagePanel: () => void,
  fields: [],
  postType: string,
  currentIndex: number,
  splitPosition: number,
  editImage: (image: Object) => void,
  userRole: string,
  userId: number,
  status: string,
  currentUser: number,
  openModal: (modalName: string) => void,
  history: () => void
};

class Escribir extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.props.onRef(this);
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postType !== this.props.postType) {
      initCheck(nextProps.postType, this.props.userRole);
      if (!isValidUser()) {
        this.props.history.push('/notAuthorized');
      }
    }
    if (nextProps.userId !== this.props.userId) {
      this.openModal(nextProps.currentUser, nextProps.userId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.fields !== this.props.fields) {
      debounce(this.saveData, 2000)();
    }
  }

  init() {
    const postname = this.props.match.params.postname;
    listenToPost(postname, this.props.receivePost);
  }

  addImage = (image, mode) => {
    image.index = this.props.currentIndex;

    if ('edit' === mode) {
      this.props.editImage(image);
    } else {
      const imgAttributes = {
        ...image,
        id: this.props.maxId,
        type: 'image',
        layout: 'normal',
        align: 'center'
      };

      this.props.addImage(imgAttributes, this.props.splitPosition);
    }
  };

  addSection = (section, mode) => {
    const {
      currentIndex,
      maxId,
      addSection,
      editSection,
      splitPosition
    } = this.props;
    section.index = currentIndex;
    if ('edit' === mode) {
      editSection(section);
    } else {
      section.id = maxId;
      addSection(section, splitPosition);
    }
  };

  savePostToBackend = async () => {
    if (this.props.status === 'draft' && this.props.title.trim().length > 1) {
      const result = await submitPostToBackend(
        { ...this.props },
        this.props.blogUrl
      );
      const publishData = {
        postId: result.id,
        postHash: result.post_hash
      };
      updatePost(this.props.id, publishData);
    }
  };

  saveData = () => {
    savePostFromEscribirPage(this.props);
    this.props.handleStatus(UPDATED_MESSAGE);
  };

  openModal = (currentUser, userId) => {
    if (currentUser !== userId) {
      this.props.openModal('EditWarning');
    }
  };

  render() {
    const sections = this.props.fields;
    const { blogUrl } = this.props;

    if (this.props.id) {
      var nodes = [];
      for (let i = 1; i <= sections.length - 1; i++) {
        nodes.push(
          <Node index={i} key={sections[i].id} maxId={this.props.maxId} />
        );
      }
      return (
        <div className="outer-wrapper">
          <div className="grid-l grid-wrapper">
            <div className="module-title-container">
              <Title
                text={this.props.title}
                handleBlur={this.savePostToBackend}
              />
            </div>
            <div className="module-container">{nodes}</div>
            <ImageUploader
              id={this.props.id}
              site={this.props.blogName}
              addImage={this.addImage}
            />
            <MoreOptions />
          </div>
          <Warning blogUrl={blogUrl} />
          <Check childName="EditWarning">
            {this.props.userId !== this.props.currentUser ? (
              <EditWarning />
            ) : null}
          </Check>
          <SnackbarPopover />
          <News />
          <SummaryModal addSection={this.addSection} />
        </div>
      );
    } else return 'Loading';
  }
}

const mapStateToProps = state => {
  return { ...state.post, fields: state.sections };
};

export default connect(mapStateToProps, { ...actions, openModal })(Escribir);
