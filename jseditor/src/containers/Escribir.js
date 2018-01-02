import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import debounce from 'lodash.debounce';
import { Col, Row } from 'react-flexbox-grid';

import {
  listenToPost,
  submitPostToBackend,
  savePostFromEscribirPage,
  updatePost
} from './lib/service';
import { ImageUploader } from 'components/Editor/ImageUploader';
import { Node, MoreOptions, Title } from 'components/Editor/Escribir';
import * as actions from 'actions/post';

const UPDATED_MESSAGE = 'Todo guardado';

type Props = {
  match: { params: Object },
  blogName: string,
  blogUrl: string,
  title: string,
  handleStatus: (status: string, date: string) => void,
  onRef: Function,
  id: string,
  postId: number,
  maxId: number,
  receivePost: (post: Object) => void,
  addImage: (image: Object) => void,
  openImagePanel: () => void,
  fields: [],
  postType: string,
  currentIndex: number,
  splitPosition: number,
  editImage: (image: Object) => void
};

class Escribir extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.props.onRef(this);
  }

  componentDidMount() {
    this.init();
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
      image.id = this.props.maxId;
      this.props.addImage(image, this.props.splitPosition);
    }
  };

  savePostToBackend = async () => {
    if (5 < this.props.title.length) {
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

  render() {
    const sections = this.props.fields;
    const { postType, id, blogName } = this.props;

    if ('longform' === postType || 'brandedLongform' === postType) {
      return <Redirect to={'/edit/post/' + id + '?blog=' + blogName} />;
    }

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
            <Title
              text={this.props.title}
              handleBlur={this.savePostToBackend}
            />
            <Row className="m-no-margin">
              <Col xs={2} />
              <Col xs={8}>{nodes}</Col>
              <Col xs={2} />
            </Row>
            <ImageUploader
              id={this.props.id}
              site={this.props.blogName}
              addImage={this.addImage}
            />
            <MoreOptions />
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
