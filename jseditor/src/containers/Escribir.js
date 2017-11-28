import React from 'react';
import { connect } from 'react-redux';

import {
  savePostsList,
  getPost,
  savePostFromEscribirPage
} from './lib/service';
import ImageUploader from 'components/Editor/ImageUploader/ImageUploader';
import { init as initCheck } from 'lib/check';
import { Title, MoreOptions } from 'components/Editor/Escribir';
import { receivePost, receiveTitle } from 'actions/post';

const UPDATED_MESSAGE = 'Todo guardado';

type Props = {
  match: { params: Object },
  blogUrl: string,
  blogName: string,
  userRole: string,
  handleStatus: (status: string, date: string) => void,
  dispatch: (action: RequestImagesAction) => void
};

class Escribir extends React.Component {
  constructor(props: Props) {
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
    initCheck(this.props.postType, this.props.userRole);
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

  addResource({ type, currentIndex }) {
    this.maxId++;
    let attributes = {
      id: this.maxId,
      type: type
    };
    switch (type) {
      case 'content':
      case 'richContent':
        attributes['text'] = '';
        break;
      default:
        break;
    }
    this.props.fields.splice(currentIndex, 0, attributes);

    this.setState(
      {
        fields: this.props.fields
      },
      this.saveData()
    );
  }

  addImage(image) {
    let currentIndex = this.resourcePanelOpenedBy;
    this.maxId++;
    const attributes = {
      id: this.maxId,
      type: 'image',
      url: image.url,
      alt: image.alt || '',
      banner: false,
      parallax: false,
      align: '',
      layout: 'normal'
    };
    this.props.fields.splice(currentIndex, 0, attributes);

    this.setState(
      {
        fields: this.props.fields
      },
      this.saveData()
    );
  }

  handleChange = ev => {
    const title = ev.currentTarget.value;
    this.props.dispatch(receiveTitle(title));
  };

  handleBlur = ev => {
    let title = ev.currentTarget.value.trim();

    if (this.props.fields.length < 2) {
      this.addResource({ type: 'content', currentIndex: 1 });
      if (
        undefined == this.state.fields[0] ||
        'title' != this.state.fields[0].type
      ) {
        this.state.fields.splice(0, 0, {
          id: ++this.state.maxId,
          type: 'title',
          layout: 'big',
          backgroundClass: 'module-bg-color-neutral-light',
          foregroundColor: null,
          text: this.state.title
        });
      } else {
        this.state.fields[0].text = this.state.title;
      }
    }

    this.setState(
      {
        title: title
      },
      this.saveData()
    );
  };

  saveData = () => {
    savePostsList(this.props, this.props.blogName);
    savePostFromEscribirPage(this.props);
    this.props.handleStatus(UPDATED_MESSAGE);
  };

  deleteResource(event) {
    event.preventDefault();
    //    TODO: fix
    //    if (confirm(DELETE_SECTION_WARNING)) {
    let currentIndex = this.parentDiv(event.target).dataset.id;
    this.props.fields.splice(currentIndex, 1);
    this.setState({ fields: this.props.fields }, this.saveData());
    //    }
  }

  render() {
    return (
      <div className="container-fluid" style={{ paddingTop: '112px' }}>
        <Title
          title={this.props.title}
          handleBlur={this.handleBlur}
          handleChange={this.handleChange}
        />
        <MoreOptions openResourcePanel={this.openResourcePanel} />
        {this.props.id && (
          <ImageUploader
            id={this.props.id}
            open={this.state.openImagePanel}
            addImage={this.addImage}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.post;
}

export default connect(mapStateToProps)(Escribir);
