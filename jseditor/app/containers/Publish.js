import React from 'react';
import jquery from 'jquery';
import moment from 'moment-timezone';
import Snackbar from 'material-ui/Snackbar';
import { Row, Col } from 'react-flexbox-grid';

import SchedulePost from '../components/Editor/Publish/SchedulePost';
import HomePage from '../components/Editor/Publish/HomePage';
import Social from '../components/Editor/Publish/Social';
import CountriesFormOptions from '../components/Editor/Publish/CountriesFormOptions';
import AdvancedOptions from '../components/Editor/Publish/AdvancedOptions';
import CloudinaryUploader from '../components/Editor/CloudinaryUploader';
import Divider from 'material-ui/Divider';

moment.tz.setDefault(configParams.timezone);
let chooseSlotMsg = 'ELEGIR HUECO ';
let successMessage = '';
const PUBLISH_POST_WARNING = 'You can not reschedule already published post';
const VALID_DATE_WARNING = 'Please select a valid date, future date';
const MAIN_IMAGE_WARNING = 'Add homepage image to publish this post';
const SAVING_DATA_ERROR_WARNING = 'Error occured while saving data';

class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      date: moment().format('DD/MM/YYYY HH:mm'),
      status: 'draft',
      postRepostBlogNames: [],
      publishRegion: [],
      postId: '',
      postHash: '',
      meta: {
        index: '',
        homepage: { content: '' },
        sponsor: { name: '', image: '', tracker: '' },
        css: { skinName: '' },
        seo: {},
        microsite: {
          name:'',
          gaSnippet: '',
          showWSLLogo: true,
          showSocialButtons: true
        },
        author: { showAuthorInfo: false },
        social: {
          twitter: '',
          facebook: ''
        }
      },
      buttonDisabled: true,
      loaded: false,
      isError: false,
      message: '',
      publishedDate: null,
      snackbarOpen: false
    };
    this.addImages = this.addImages.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  componentWillMount() {
    this.checkUser();
  }

  checkUser() {
    const {
      match: { params: { postname } },
      location: { search },
      history
    } = this.props;

    const query = new URLSearchParams(search);

    this.userId = query.get('userid');
    this.blogName = query.get('blog');
    let regEx = /\D/;
    if (regEx.test(this.userId)) {
      history.push('/invalidUser');
    }
    this.postname = postname;
  }

  init() {
    const { history } = this.props;

    if (this.blogName == undefined) {
      history.replace('/invalidBlog');
    } else {
      this.props.base.fetch('config', {
        context: this,
        asArray: true,
        queries: {
          orderByChild: 'site_name',
          equalTo: this.blogName
        },
        then(data) {
          if (data[0] != null) {
            this.setState({
              blogName: this.blogName,
              blogUrl: data[0].site_url
            });
          } else {
            history.replace('/invalidBlog');
          }
        }
      });
    }
    if (this.postname != undefined) {
      this.props.base.fetch('posts', {
        context: this,
        asArray: true,
        queries: {
          orderByChild: 'status',
          equalTo: 'publish'
        },
        then(data) {
          if (data != null) {
            let scheduledPosts = {};
            data.forEach(result => {
              let formatDate = moment(result.publishData.postDate, 'DD/MM/YYYY H:00:00').format('YYYY-MM-DD H:00:00');
              scheduledPosts[formatDate] = {'id' : result.id, 'status': result.status, 'date': result.date, 'title' : result.title};
            });

            this.setState({
              futureProgrammedPosts: scheduledPosts,
              buttonDisabled: false
            });
          }
        }
      });
      this.props.base.fetch('posts/' + this.postname, {
        context: this,
        then(data) {
          if (data != null) {
            this.setState({
              id: data.id,
              fields: data.sections || [],
              title: data.title,
              meta: data.meta || this.state.meta,
              maxId: data.maxId,
              status: data.status || 'draft',
              date: data.publishData.postDate || moment().format('DD/MM/YYYY HH:mm'),
              publishedDate: data.publishData.postDate || null,
              postRepostBlogNames: data.publishData.postRepostBlogNames || [],
              publishRegion: data.publishData.publishRegion,
              postId: data.publishData.postId || '',
              postHash: data.publishData.postHash || '',
              buttonDisabled: false,
              loaded: true,
              userId: data.user_id
            });
          }
        }
      });
    }
  }

  submitPost() {
    let publishRegion = this.state.publishRegion;
    let postRepostBlogNames = this.state.postRepostBlogNames;

    let backendData = {
      postform: {
        categoryId: '-1',
        post_title: this.state.title,
        comment_status: this.state.meta.comment.status,
        post_type: 'normal',
        post_content: JSON.stringify(this.state.fields),
        postExcerpt: JSON.stringify({'meta' : this.state.meta}),
        post_abstract: '',
        post_extended_title: '',
        post_visibility: 0,
        posts_galleries: '',
        post_subtype: 13,
        postDate: this.state.date,
        'publish-region': publishRegion,
        postRepostBlogNames: postRepostBlogNames,
        page: 'publish',
        firebase_id: this.state.id,
        post_status: 'future',
        user_id: this.state.userId,
        primary_image: this.state.meta.homepage.image.url
      }
    };

    let firebaseData = {
      id: this.state.id,
      title: this.state.title,
      sections: this.state.fields,
      maxId: this.state.maxId,
      blogName: this.state.blogName,
      status: 'publish',
      publishData: {
        postDate: this.state.date,
        publishRegion: publishRegion,
        postRepostBlogNames: postRepostBlogNames
      },
      meta: this.state.meta,
      user_id: this.state.userId
    };
    let postType = 'POST';
    let postUrl = 'posts.json';
    if (this.state.postId != undefined && this.state.postId != '') {
      postType = 'PUT';
      postUrl = 'posts/' + this.state.postId + '.json';
      successMessage = 'Changes has been saved.';
    }
    jquery.ajax({
      url: this.state.blogUrl + '/admin/' + postUrl,
      type: postType,
      dataType: 'json',
      data: backendData,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
    .fail(() => this.setMessage(true, SAVING_DATA_ERROR_WARNING))
    .done(result => {
      if (result.id != undefined) {
        firebaseData.publishData.postId = result.id;
        firebaseData.publishData.postHash = result.post_hash;
      }
      try {
        let postType = 'normal';
        let blogStatus = this.blogName + '_publish';
        if (this.state.meta.sponsor.image) {
          postType = 'club';
        }

        let listData = {
          id: this.state.id,
          title: this.state.title,
          status: 'publish',
          user_id: this.state.userId,
          blog_name: this.blogName,
          user_status: this.blogName + '_' + this.state.userId + '_' + 'publish',
          blog_status: blogStatus,
          blog_post_type: blogStatus + '_' + postType
        };

        this.props.base.post(
          'posts_list/' + this.state.id,
          {
            data: listData,
            then() {}
          }
        );

        this.props.base.post(
          'posts/' + this.state.id,
          {
            data: firebaseData,
            then: () => {
              if (result.id != undefined) {
                this.setState({
                  postId: result.id,
                  postHash: result.post_hash,
                  status: 'publish',
                  publishedDate: this.state.date,
                  snackbarOpen: true
                });
                this.enableButton();
              }
            }
          }
        );
      } catch (e) {
        let errorMessage = e.message.substring(0, 100);
        this.setMessage(true, errorMessage);
        this.enableButton();
        Rollbar.critical(SAVING_DATA_ERROR_WARNING, e);
      }
    });
  }

  onChange (ev) {
    ev.preventDefault();
    this.setState({date: ev.currentTarget.value});
  }

  onSchedule(ev) {
    ev.preventDefault();
    this.disableButton();
    if (this.isValid()) {
      this.submitPost();
    }
  }

  enableButton() {
    this.setState({
      buttonDisabled : false
    });
  }

  disableButton() {
    this.setState({
      buttonDisabled : true
    });
  }

  isValid() {
    let isError = false, message;
    if ('publish' == this.state.status) {
      if (moment(this.state.publishedDate, 'DD/MM/YYYY HH:mm:ss').isBefore(moment())) {
        this.setMessage(true, PUBLISH_POST_WARNING);
      } else if (moment(this.state.date, 'DD/MM/YYYY HH:mm:ss').isBefore(moment())) {
        isError = true;
        message = VALID_DATE_WARNING;
      }
    } else if (!this.state.meta.homepage.image) {
      isError = true;
      message = MAIN_IMAGE_WARNING;
    }

    this.setMessage(isError, message);
    return !isError;
  }

  setMessage(isError, message) {
    let params = {
      isError: isError,
      message: message
    };
    if (isError) {
      params.buttonDisabled = false;
    }
    this.setState(params);
  }

  openSlotWidget(ev) {
    ev.preventDefault();
    let visible = document.getElementById('publish-slots').style.display;
    document.getElementById('publish-slots').style.display = visible == 'none' ? 'block': 'none';
    chooseSlotMsg = 'Close';
    this.handleDatePickerText();
  }

  handleDatePickerText() {
    if (chooseSlotMsg == document.getElementById('toggle-publish-slots').text) {
      document.getElementById('toggle-publish-slots').text = 'ELEGIR HUECO';
    } else {
      document.getElementById('toggle-publish-slots').text = chooseSlotMsg;
    }
  }

  onPickSlot (ev) {
    let currentTarget = ev.currentTarget;
    if (ev.currentTarget.className == 'slot-past' || ev.currentTarget.className == 'slot-busy') return;
    let currentSlot = document.getElementsByClassName('slot-current');
    if (currentSlot.length > 0) {
      currentSlot[0].classList.add('slot-free');
      currentSlot[0].innerHTML = 'Libre';
      currentSlot[0].classList.remove('slot-current');
    }
    currentTarget.classList.remove('slot-free');
    currentTarget.innerHTML = 'Elegido';
    currentTarget.classList.add('slot-current');
    this.setState({
      date: ev.currentTarget.dataset.date
    });
    document.getElementById('publish-slots').style.display = 'none';
    this.handleDatePickerText();
  }

  handleRequestClose() {
    this.setState({
      snackbarOpen: false,
    });
  }

  setPublishRegions (newRegions) {
    this.setState({
      publishRegion: newRegions
    });
  }

  updateSocialFacebookText(event) {
    this.state.meta.social.facebook = event.target.value;
    this.setState({ meta: this.state.meta });
  }

  updateSocialTwitterText(event) {
    this.state.meta.social.twitter = event.target.value;
    this.setState({ meta: this.state.meta });
  }

  toggleCloudinaryUploader(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({ isCloudinaryUploaderOpen: !this.state.isCloudinaryUploaderOpen });
  }

  editImages(images) {
    const { resourcePanelOpenedBy } = this.state;
    let currentIndex = resourcePanelOpenedBy.currentIndex;
    let imageIndex = resourcePanelOpenedBy.imageIndex;

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

    this.setState({
      fields: this.state.fields,
      addMoreImages: false,
      addImageModule: ''
    });
  }

  addImages(images, moduleType) {
    let addMoreImages = this.state.addMoreImages;
    let currentIndex = this.state.resourcePanelOpenedBy;
    if (!addMoreImages) {
      this.state.maxId++;
      let attributes = { id: this.state.maxId, type: moduleType, layout: 'normal', images };
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

    this.setState({
      fields: this.state.fields,
      maxId: this.state.maxId,
      addMoreImages: false,
      addImageModule: '',
      imageFunction: ''
    });
  }

  addImage(image) {
    let currentIndex = this.state.resourcePanelOpenedBy;
    if (this.state.imageFunction == 'backgroundImage') {
      let field = this.getField(currentIndex);
      field.altered.backgroundImage = image.url;
      field.altered.backgroundImageName = image.original_filename;
      field.altered.backgroundImageHeight = image.height;
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
    } else if ('otherImage' == this.state.imageFunction || 'productImage' == this.state.imageFunction) {
      let field = this.getField(currentIndex);
      field.altered[this.state.imageFunction] = image;
      this.state.fields.splice(field.indexes[0], 0, field.original);
    }

    this.setState({
      fields: this.state.fields,
      maxId: this.state.maxId,
      meta: this.state.meta,
      addImageModule: '',
      imageFunction: ''
    });
  }

  getField(currentIndex) {
    currentIndex = currentIndex.toString();
    let { fields } = this.state, indexes, altered, componentIndexes;

    let delimiterIndex = currentIndex.indexOf('#');
    if (delimiterIndex >= 0) {
      indexes = currentIndex.substr(0, delimiterIndex).split('-');
      componentIndexes = currentIndex.substr(delimiterIndex + 1).split('-');
      altered = fields[indexes[0]].rows[componentIndexes[0]][componentIndexes[1]];
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

  updateResource(currentIndex, attributes) {
    let field = this.getField(currentIndex);
    Object.assign(field.altered, attributes);
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields });
  }

  openResourcePanel(imageFunction, currentIndex, addImageModule = '', addMoreImages = false, event) {
    if (undefined != event) {
      event.preventDefault();
    }

    this.setState({
      resourcePanelOpenedBy: currentIndex,
      imageFunction: imageFunction,
      addImageModule: addImageModule,
      addMoreImages: addMoreImages
    });
    document.getElementById('resourcePanel').style.display = 'block';
    document.getElementById('resourcePanel').classList.add('in');
  }

  updateHomepageContent(value) {
    this.state.meta.homepage.content = value;
    this.setState({ meta: this.state.meta });
  }

  deleteHomepageImage() {
    this.state.meta.homepage.image = null;
    this.setState({ meta: this.state.meta });
  }

  onArticleMetaToggle (e) {
    e.preventDefault();
    this._glyphiconClass.classList.toggle('glyphicon-minus');
    this._glyphiconClass.classList.toggle('glyphicon-plus');
    this._articleMetaPanel.classList.toggle('collapsed-content');
  }

  render () {
    return(
      <div>
        <Snackbar
          open={this.state.snackbarOpen}
          message={ successMessage + ' Post scheduled for ' + moment(this.state.date, 'DD-MM-YYYY HH:mm').format('LLLL') }
          autoHideDuration={5000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
        <SchedulePost
          openSlotWidget={this.openSlotWidget.bind(this)}
          buttonDisabled={this.state.buttonDisabled}
          value={this.state.date}
          futureProgrammedPosts={this.state.futureProgrammedPosts}
          onChange={this.onChange.bind(this)}
          onPickSlot={this.onPickSlot.bind(this)}
          onSchedule={this.onSchedule.bind(this)}
        />
        <div>
          <h4>portada y redes sociales</h4>
          <Divider />
          <Row>
            <Col xs={6}>
              <HomePage
                homepage={this.state.meta.homepage}
                updateHomepageContent={this.updateHomepageContent.bind(this)}
                deleteHomepageImage={this.deleteHomepageImage.bind(this)}
                openResourcePanel={this.openResourcePanel.bind(this)}
                onArticleMetaToggle={this.onArticleMetaToggle}
              />
            </Col>
            <Col xs ={6}>
              <Social
                twitter={this.state.meta.social.twitter}
                facebook={this.state.meta.social.facebook}
                updateSocialFacebookText={this.updateSocialFacebookText.bind(this)}
                updateSocialTwitterText={this.updateSocialTwitterText.bind(this)}
              />
            </Col>
          </Row>
        </div>
        <Row>
          <Col xs>
            Seo place holder
          </Col>
          <Col xs>
            <CountriesFormOptions
              setPublishRegions={this.setPublishRegions.bind(this)}
              publishRegions={this.state.publishRegion}
            />
          </Col>
          <Col xs>
            <AdvancedOptions />
          </Col>
        </Row>
        <CloudinaryUploader
          cloudName={configParams.cloudName}
          uploadPreset={configParams.uploadPreset}
          folder={configParams.folder}
          addImage={this.addImage.bind(this)}
          addImages={this.addImages}
          editImages={this.editImages.bind(this)}
          base={this.props.base}
          slug={this.state.id}
          addImageModule={this.state.addImageModule}
          imageFunction={this.state.imageFunction}
          isCloudinaryUploaderOpen={this.state.isCloudinaryUploaderOpen}
          toggleCloudinaryUploader={this.toggleCloudinaryUploader.bind(this)}
          ref="resourcePanel"
        />
      </div>
    );
  }
}

export default Publish;
