/*eslint-disable */
import React from 'react';

import ContentList from 'components/Editor/ContentList';
import PostTitle from 'components/Editor/PostTitle';
import CloudinaryUploader from 'components/Editor/CloudinaryUploader';
import Metadata from 'components/Editor/Metadata/Metadata';
import configParams from 'config/configs.js';
import { getPostType } from './lib/helpers';
import { initialMeta } from 'lib/constants';
import {
  savePostsList,
  getPost,
  savePostFromEscribirPage
} from './lib/service';
import { init as initCheck, isValidUser } from 'lib/check';

const CAPTION_WARNING = 'Anchor tag is not allowed in image captions';
const UPDATED_MESSAGE = 'Todo guardado';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.props.onRef(this);
    this.state = {
      maxId: 0,
      title: '',
      isError: false,
      isSubmit: false,
      message: '',
      imageFunction: '',
      addImageModule: '',
      addMoreImages: false,
      orderMode: false,
      fields: [],
      meta: null,
      isCloudinaryUploaderOpen: false
    };
    this.addImages = this.addImages.bind(this);
    this.addResource = this.addResource.bind(this);
    this.toggleFooter = this.toggleFooter.bind(this);
    this.toggleSummarySocialShareButtons = this.toggleSummarySocialShareButtons.bind(
      this
    );
  }

  async init() {
    const postname = this.props.match.params.postname;
    const data = await getPost(postname);
    if (data.hasOwnProperty('id')) {
      initCheck(data.postType, this.props.userRole);
      if (!isValidUser()) {
        this.props.history.push('/notAuthorized');
        return;
      }

      this.setState({
        id: data.id,
        postType: data.postType || getPostType(this.props.userRole),
        fields: data.sections || [],
        title: data.title || '',
        maxId: data.maxId || 0,
        status: data.status || 'draft',
        userId: data.user_id,
        meta: data.meta || initialMeta
      });
    } else {
      console.log('Should never be here');
      this.setState({
        id: postname,
        meta: initialMeta
      });
    }
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
    if (undefined != event) {
      event.preventDefault();
    }
    this.resourcePanelOpenedBy = currentIndex;
    this.setState({
      imageFunction: imageFunction,
      addImageModule: addImageModule,
      addMoreImages: addMoreImages
    });
    document.getElementById('resourcePanel').style.display = 'block';
    document.getElementById('resourcePanel').classList.add('in');
  };

  getField(currentIndex) {
    currentIndex = currentIndex.toString();
    let { fields } = this.state,
      indexes,
      altered,
      componentIndexes;

    let delimiterIndex = currentIndex.indexOf('#');
    if (delimiterIndex >= 0) {
      indexes = currentIndex.substr(0, delimiterIndex).split('-');
      componentIndexes = currentIndex.substr(delimiterIndex + 1).split('-');
      altered =
        fields[indexes[0]].rows[componentIndexes[0]][componentIndexes[1]];
    } else {
      indexes = currentIndex.split('-');
      if (indexes[1]) {
        altered = fields[indexes[0]].columns[indexes[1]];
      } else {
        altered = fields[indexes[0]];
      }
    }

    let original = fields.splice(indexes[0], 1)[0];
    return { indexes, original, altered };
  }

  isRootComponent(currentIndex) {
    return /^\d+$/.test(currentIndex);
  }

  addResource({ type, currentIndex }) {
    this.state.maxId++;
    let attributes = {
      id: this.state.maxId,
      type: type
    };
    switch (type) {
      case 'content':
      case 'richContent':
        attributes['text'] = '';
        break;
      case 'summary':
        attributes['layout'] = 'normal';
        attributes['text'] = '';
        attributes['showSummarySocialShareButtons'] = false;
        break;
      case 'giphy':
      case 'infogram':
        attributes['layout'] = 'normal';
        attributes['description'] = '';
        break;
      case 'video':
        attributes['layout'] = 'normal';
        attributes['url'] = '';
        break;
      case 'sectionModule':
        attributes['selected'] = 'category';
        attributes['layout'] = 'normal';
        break;
    }
    if (this.isRootComponent(currentIndex)) {
      this.state.fields.splice(currentIndex, 0, attributes);
    } else {
      return this.updateResource(currentIndex, attributes);
    }

    this.setState(
      {
        fields: this.state.fields,
        maxId: this.state.maxId
      },
      this.saveData()
    );
  }

  addImage(image) {
    let currentIndex = this.resourcePanelOpenedBy;
    if (this.state.imageFunction == 'backgroundImage') {
      let field = this.getField(currentIndex);
      field.altered.backgroundImage = image.url;
      field.altered.backgroundImageName = image.original_filename;
      //  field.altered.backgroundImageHeight = image.height;
      this.state.fields.splice(field.indexes[0], 0, field.original);
    } else if (this.state.imageFunction == 'image') {
      this.state.maxId++;
      const attributes = {
        id: this.state.maxId,
        type: 'image',
        url: image.url,
        height: image.height || '',
        width: image.width || '',
        alt: image.alt || '',
        banner: false,
        parallax: false,
        align: '',
        layout: 'normal'
      };

      if (this.isRootComponent(currentIndex)) {
        this.state.fields.splice(currentIndex, 0, attributes);
      } else {
        return this.updateResource(currentIndex, attributes);
      }
    } else if (this.state.imageFunction == 'homepage') {
      this.state.meta.homepage.image = {
        url: image.url,
        height: image.height || '',
        width: image.width || '',
        alt: image.alt || '',
        name: image.original_filename
      };
    } else if (
      'otherImage' == this.state.imageFunction ||
      'productImage' == this.state.imageFunction
    ) {
      let field = this.getField(currentIndex);
      field.altered[this.state.imageFunction] = image;
      this.state.fields.splice(field.indexes[0], 0, field.original);
    }

    this.setState(
      {
        fields: this.state.fields,
        maxId: this.state.maxId,
        meta: this.state.meta,
        addImageModule: '',
        imageFunction: ''
      },
      this.saveData()
    );
  }

  addImageCaption(imageId, caption, currentIndex) {
    let field = this.getField(currentIndex);
    if (field.altered.images != undefined) {
      let imageSet = field.altered.images;
      if (imageSet.length > 0) {
        for (let image of imageSet) {
          if (image.spid == imageId) {
            image.description = caption;
          }
        }

        this.state.fields.splice(field.indexes[0], 0, field.original);
        this.setState(
          {
            fields: this.state.fields
          },
          this.saveData()
        );
      }
    } else {
      field.altered.description = caption;
      this.state.fields.splice(field.indexes[0], 0, field.original);
      this.setState(
        {
          fields: this.state.fields
        },
        this.saveData()
      );
    }
  }

  addImageCaptionOverlay(imageId, captionOverlay, currentIndex) {
    let field = this.getField(currentIndex);
    field.altered.captionOverlay = captionOverlay;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState(
      {
        fields: this.state.fields
      },
      this.saveData()
    );
  }

  addImageCaptionOverlayPosition(imageId, captionPosition, currentIndex) {
    let field = this.getField(currentIndex);
    field.altered.captionPosition = captionPosition;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState(
      {
        fields: this.state.fields
      },
      this.saveData()
    );
  }

  addImageCaptionOverlayBackground(imageId, captionBackground, currentIndex) {
    let field = this.getField(currentIndex);
    field.altered.captionBackground = captionBackground;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState(
      {
        fields: this.state.fields
      },
      this.saveData()
    );
  }

  addImages(images, moduleType) {
    let addMoreImages = this.state.addMoreImages;
    let currentIndex = this.resourcePanelOpenedBy;
    if (!addMoreImages) {
      this.state.maxId++;
      let attributes = {
        id: this.state.maxId,
        type: moduleType,
        layout: 'normal',
        images
      };
      if (this.isRootComponent(currentIndex)) {
        this.state.fields.splice(currentIndex, 0, attributes);
      } else {
        return this.updateResource(currentIndex, attributes);
      }
    } else {
      let field = this.getField(currentIndex);
      for (let i = 0; i < images.length; i++) {
        field.altered.images.push(images[i]);
      }

      this.state.fields.splice(field.indexes[0], 0, field.original);
    }

    this.setState(
      {
        fields: this.state.fields,
        maxId: this.state.maxId,
        addMoreImages: false,
        addImageModule: '',
        imageFunction: ''
      },
      this.saveData()
    );
  }

  editImages(images) {
    let currentIndex = this.resourcePanelOpenedBy.currentIndex;
    let imageIndex = this.resourcePanelOpenedBy.imageIndex;

    let field = this.getField(currentIndex);
    switch (typeof imageIndex) {
      case 'string':
        field.altered[imageIndex] = images[0];
        break;
      case 'number':
        field.altered.images.splice(imageIndex, 1, ...images);
        break;
      default:
        field.altered.url = images[0].url;
        field.altered.alt = images[0].alt;
    }
    this.state.fields.splice(field.indexes[0], 0, field.original);

    this.setState(
      {
        fields: this.state.fields,
        addMoreImages: false,
        addImageModule: ''
      },
      this.saveData()
    );
  }

  addTable(currentIndex) {
    this.state.maxId++;
    this.state.fields.splice(currentIndex, 0, {
      id: this.state.maxId,
      type: 'table',
      layout: 'normal'
    });
    this.setState(
      {
        fields: this.state.fields,
        maxId: this.state.maxId
      },
      this.saveData()
    );
  }

  parentDiv(el) {
    while (el && el.parentNode) {
      el = el.parentNode;
      if (el.tagName && el.tagName.toLowerCase() == 'div') {
        return el;
      }
    }
  }

  handleChange = ev => {
    this.setState({
      title: ev.currentTarget.value
    });
  };

  handleBlur = ev => {
    let title = ev.currentTarget.value.trim();

    if (this.state.fields.length < 2) {
      this.addResource({ type: 'content', currentIndex: 1 });
    }

    this.setState(
      {
        title: title
      },
      this.saveData()
    );
  };

  isValid() {
    if (!this.state.title) {
      return false;
    }
    if (!this.isValidFieldCaptions(this.state.fields)) {
      this.setMessage(true, CAPTION_WARNING);
      return false;
    }

    this.setMessage(false);
    return true;
  }

  isValidFieldCaptions(fields) {
    let validCaptions = true;
    fields.forEach(field => {
      switch (field.type) {
        case 'grouped':
          if (!this.isValidFieldCaptions(field.columns)) {
            validCaptions = false;
          }
          break;

        case 'gallery':
        case 'slider':
          field.images.forEach(({ description }) => {
            if (description && !this.isValidCaption(description)) {
              validCaptions = false;
            }
          });
          break;
      }
    });

    return validCaptions;
  }

  isValidCaption(caption) {
    return !/\<(?=(a[\s\>]))[\w\d]+[^\>]*\>/.test(caption);
  }

  saveData = () => {
    if (!this.isValid()) {
      return;
    }
    try {
      savePostsList(this.state, this.props.blogName);
      savePostFromEscribirPage(this.state);
      this.props.handleStatus(UPDATED_MESSAGE);
    } catch (e) {
      //      Rollbar.critical('Error occured on saving data to Firebase', e);
      let errorMessage = e.message.substring(0, 100);
      this.setMessage(true, errorMessage);
    }
  };

  setMessage(isError = false, message) {
    this.setState({
      isError: isError,
      message: message
    });
  }

  addBackgroundOptionToResource = (property, value, event) => {
    event.preventDefault();
    let currentIndex = this.parentDiv(event.target).dataset.id;
    let field = this.getField(currentIndex);
    switch (property) {
      case 'backgroundClass':
        field.altered.backgroundClass =
          field.altered.backgroundClass == value ? '' : value;
        break;
      case 'foregroundColor':
        field.altered.foregroundColor =
          field.altered.foregroundColor == value ? '' : value;
        break;
      case 'parallax':
        field.altered.parallax = !field.altered.parallax;
        event.target.className = 'active';
        break;
      case 'backgroundRepeat':
        field.altered.backgroundRepeat = !field.altered.backgroundRepeat;
        break;
      case 'backgroundFade':
        field.altered.backgroundFade = !field.altered.backgroundFade;
        break;
      case 'removeBackgroundImage':
        field.altered.backgroundImage = '';
        field.altered.backgroundFade = '';
        field.altered.backgroundRepeat = '';
        field.altered.backgroundFullscreen = '';
        break;
      case 'backgroundFullscreen':
        field.altered.backgroundFullscreen = !field.altered
          .backgroundFullscreen;
        break;
      case 'actualizacion':
        field.altered.actualizacion = !field.altered.actualizacion;
        event.target.className = 'active';
        break;
    }
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  };

  deleteResource(event) {
    event.preventDefault();
    //    TODO: fix
    //    if (confirm(DELETE_SECTION_WARNING)) {
    let currentIndex = this.parentDiv(event.target).dataset.id;
    this.state.fields.splice(currentIndex, 1);
    this.setState({ fields: this.state.fields }, this.saveData());
    //    }
  }

  groupSections(currentIndex, group) {
    this.state.maxId++;
    let objects = this.state.fields.splice(currentIndex, group);
    for (let object of objects) {
      switch (object.type) {
        case 'image':
        case 'video':
        case 'gallery':
        case 'slider':
        case 'giphy':
        case 'infogram':
        case 'datawrapper':
          object.backgroundFade = '';
          object.backgroundRepeat = '';
          object.backgroundFullscreen = '';
          object.backgroundClass = '';
          object.backgroundImage = '';
          object.parallax = '';
          break;
      }
    }

    this.state.fields.splice(currentIndex, 0, {
      id: this.state.maxId,
      type: 'grouped',
      length: group,
      columns: objects
    });
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  ungroupSections(currentIndex) {
    let obj = this.state.fields.splice(currentIndex, 1)[0];
    if (obj.length == 2) {
      this.state.fields.splice(currentIndex, 0, obj.columns[0], obj.columns[1]);
    } else if (obj.length == 3) {
      this.state.fields.splice(
        currentIndex,
        0,
        obj.columns[0],
        obj.columns[1],
        obj.columns[2]
      );
    }

    this.setState({ fields: this.state.fields }, this.saveData());
  }

  updateResource(currentIndex, attributes) {
    let field = this.getField(currentIndex);
    Object.assign(field.altered, attributes);
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  updateText(currentIndex, value) {
    let field = this.getField(currentIndex);
    field.altered.text = value;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  updateRichContent(currentIndex, event) {
    let field = this.getField(currentIndex);
    field.altered.text = event.target.textContent;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  addLayoutToResource = event => {
    event.preventDefault();
    let currentIndex = this.parentDiv(event.target).dataset.id;
    let value = event.target.dataset.layout;
    let field = this.getField(currentIndex);
    field.altered.layout = value;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  };

  addGroupToResource(event) {
    event.preventDefault();
    let currentIndex = this.parentDiv(event.target).dataset.id;
    let value = event.target.dataset.group;
    let field = this.getField(currentIndex);
    field.altered.group = field.altered.group == value ? '' : value;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  moveResourceDown(currentIndex) {
    let obj = this.state.fields.splice(currentIndex, 1);
    this.state.fields.splice(currentIndex + 1, 0, obj[0]);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  moveResourceUp(currentIndex) {
    let obj = this.state.fields.splice(currentIndex, 1);
    this.state.fields.splice(currentIndex - 1, 0, obj[0]);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  toggleOrderMode = event => {
    event.preventDefault();
    this.setState({ orderMode: !this.state.orderMode });
  };

  setAutoPlaySlider(event, value) {
    event.preventDefault();
    let currentIndex = event.currentTarget.dataset.id;
    let field = this.getField(currentIndex);
    field.altered.autoplay = value;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  updateIndexMetadata(event) {
    this.state.meta.index = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateFooterCredits(event) {
    this.state.meta.footer.content = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateMicrositeName(event) {
    this.state.meta.microsite.name = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateMicrositeGASnippet(event) {
    this.state.meta.microsite.gaSnippet = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateMicrositeCookiePage(event) {
    this.state.meta.microsite.cookiePage = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  toggleSocialSharing(event) {
    this.state.meta.microsite.showSocialButtons = event.target.checked;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  toggleWSLLogo(event) {
    this.state.meta.microsite.showWSLLogo = event.target.checked;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  deleteHomepageImage() {
    this.state.meta.homepage.image = null;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateCssSkinName(event) {
    this.state.meta.css.skinName = event.target.value.trim();
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  toggleFooter() {
    this.state.meta.footer.hideFooter = !this.state.meta.footer.hideFooter;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  toggleSummarySocialShareButtons(event) {
    event.preventDefault();
    let currentIndex = event.target.dataset.id;
    let field = this.getField(currentIndex);
    field.altered.showSummarySocialShareButtons = event.target.checked;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  deleteImage({ sectionIndex, imageIndex }, event) {
    event.preventDefault();
    let field = this.getField(sectionIndex);
    switch (typeof imageIndex) {
      case 'number':
        field.altered.images.splice(imageIndex, 1);
        break;
      case 'string':
        field.altered[imageIndex] = '';
    }
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  isEmptyfield(fields) {
    let isEmpty = true;
    fields.forEach(field => {
      switch (field.type) {
        case 'grouped':
          if (!this.isEmptyfield(field.columns)) {
            isEmpty = false;
          }
          break;

        case 'content':
        case 'richContent':
        case 'summary':
          if (field.text != '') {
            isEmpty = false;
          }
          break;
        case 'video':
        case 'giphy':
        case 'infogram':
          if (field.url != '') {
            isEmpty = false;
          }
          break;
        case 'image':
        case 'gallery':
        case 'slider':
          isEmpty = false;
          break;
      }
    });
    return isEmpty;
  }

  moveImage({ sectionIndex, imageIndex, direction }, event) {
    event.preventDefault();
    let field = this.getField(sectionIndex);

    if (direction == 'right') {
      var moveToIndex = imageIndex + 1;
    } else {
      moveToIndex = imageIndex - 1;
    }

    // Normal swapping
    let temp = field.altered.images[imageIndex];
    field.altered.images[imageIndex] = field.altered.images[moveToIndex];
    field.altered.images[moveToIndex] = temp;

    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  toggleCloudinaryUploader(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      isCloudinaryUploaderOpen: !this.state.isCloudinaryUploaderOpen
    });
  }

  handleRequestClose = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    if (!this.state.id) {
      return 'Loading...';
    }
    let errorField = '';
    if (this.state.isError) {
      errorField = (
        <div className="top-messages">
          <div className="alert alert-danger">
            <span>{this.state.message}</span>
          </div>
        </div>
      );
    }

    let metadata = (
      <Metadata
        meta={this.state.meta}
        updateIndexMetadata={this.updateIndexMetadata.bind(this)}
        updateFooterCredits={this.updateFooterCredits.bind(this)}
        updateCssSkinName={this.updateCssSkinName.bind(this)}
        deleteHomepageImage={this.deleteHomepageImage.bind(this)}
        openResourcePanel={this.openResourcePanel}
        updateMicrositeName={this.updateMicrositeName.bind(this)}
        updateMicrositeGASnippet={this.updateMicrositeGASnippet.bind(this)}
        updateMicrositeCookiePage={this.updateMicrositeCookiePage.bind(this)}
        toggleWSLLogo={this.toggleWSLLogo.bind(this)}
        toggleSocialSharing={this.toggleSocialSharing.bind(this)}
        deleteImage={this.deleteImage.bind(this)}
        toggleFooter={this.toggleFooter}
      />
    );

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
    return (
      <div className={this.state.orderMode ? 'bgbody' : ''}>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
        />
        {errorField}
        <div className="form-group">
          <PostTitle
            data={this.state.fields[0]}
            value={this.state.title}
            handleBlur={this.handleBlur}
            handleChange={this.handleChange}
            openResourcePanel={this.openResourcePanel}
            addLayoutToResource={this.addLayoutToResource}
            addBackgroundOptionToResource={this.addBackgroundOptionToResource}
          />

          <ContentList
            fields={this.state.fields}
            addBackgroundOptionToResource={this.addBackgroundOptionToResource}
            updateText={this.updateText.bind(this)}
            updateRichContent={this.updateRichContent.bind(this)}
            updateResource={this.updateResource.bind(this)}
            openResourcePanel={this.openResourcePanel}
            addResource={this.addResource}
            addTable={this.addTable.bind(this)}
            deleteResource={this.deleteResource.bind(this)}
            addLayoutToResource={this.addLayoutToResource}
            addGroupToResource={this.addGroupToResource.bind(this)}
            groupSections={this.groupSections.bind(this)}
            ungroupSections={this.ungroupSections.bind(this)}
            moveResourceDown={this.moveResourceDown.bind(this)}
            moveResourceUp={this.moveResourceUp.bind(this)}
            orderMode={this.state.orderMode}
            addImageCaption={this.addImageCaption.bind(this)}
            addImageCaptionOverlay={this.addImageCaptionOverlay.bind(this)}
            addImageCaptionOverlayPosition={this.addImageCaptionOverlayPosition.bind(
              this
            )}
            addImageCaptionOverlayBackground={this.addImageCaptionOverlayBackground.bind(
              this
            )}
            setAutoPlaySlider={this.setAutoPlaySlider.bind(this)}
            deleteImage={this.deleteImage.bind(this)}
            moveImage={this.moveImage.bind(this)}
            toggleSummarySocialShareButtons={
              this.toggleSummarySocialShareButtons
            }
            siteUrl={this.props.blogUrl}
            postType={this.state.postType}
          />
        </div>
        {this.state.meta ? metadata : ''}
        <CloudinaryUploader
          cloudName={configParams.cloudName}
          uploadPreset={configParams.uploadPreset}
          folder={configParams.folder}
          addImage={this.addImage.bind(this)}
          addImages={this.addImages}
          editImages={this.editImages.bind(this)}
          slug={this.state.id}
          addImageModule={this.state.addImageModule}
          imageFunction={this.state.imageFunction}
          isCloudinaryUploaderOpen={this.state.isCloudinaryUploaderOpen}
          toggleCloudinaryUploader={this.toggleCloudinaryUploader.bind(this)}
          ref="resourcePanel"
        />
        <div id="preview" />
      </div>
    );
  }
}

export default Editor;
