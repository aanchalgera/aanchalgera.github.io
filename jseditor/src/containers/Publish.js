import React from 'react';
import jquery from 'jquery';
import moment from 'moment-timezone';
import { Snackbar, Divider } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import { AdvancedOptions, Categories, ImageCropper, SchedulePost, HomePage, Seo, Twitter, Facebook, CountriesFormOptions } from '../components/Editor/Publish/index.js';
import configParams from '../config/configs.js';
import { getConfig, getPost } from './lib/service.js';

moment.tz.setDefault(configParams.timezone);
const PUBLISH_POST_WARNING = 'You can not reschedule already published post';
const VALID_DATE_WARNING = 'Please select a valid date, future date';
const MAIN_IMAGE_WARNING = 'Add homepage image to publish this post';
const SAVING_DATA_ERROR_WARNING = 'Error occured while saving data';
const IMAGE_CROP_WARNING = 'Es necesario validar los recortes de las imágenes para poder publicar';

class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      status: 'draft',
      postRepostBlogNames: [],
      publishRegion: [],
      postId: '',
      postHash: '',
      meta: {
        index: '',
        homepage: { content: null },
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
        },
        comment: { allowed: true, status: 'open' },
      },
      isSensitive: false,
      specialPost:false,
      buttonDisabled: true,
      loaded: false,
      isError: false,
      message: '',
      publishedDate: '',
      snackbarOpen: false,
      SnackbarMessage: '',
      crop: {
        square: {
          aspect: 1,
          x: 10,
          height: 100,
          validate: false
        },
        golden: {
          aspect: 1.618,
          y: 5,
          width: 100,
          validate: false
        },
        panoramic: {
          aspect: 2.618,
          y: 20,
          width: 100,
          validate: false
        }
      },
      category: -1,
    };

    this.setInitialVariables()
  }

  componentDidMount() {
    this.init();
  }

  componentWillMount() {
    this.setInitialVariables();
  }

  setInitialVariables() {
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
    getConfig(this.blogName, this.props.base)
    .then((data) => {
        if (data != null) {
          this.setState({
            blogName: this.blogName,
            blogUrl: data.site_url
          });
        } else {
          history.replace('/invalidBlog');
        }
    });

    getPost(this.postname, this.props.base)
    .then((data) => {
        if (data != null) {
          if (!data.crop) {
            data.crop = this.state.crop;
          }
          this.setState(prevState => {
            prevState.meta.homepage.content = '';
            return {
              id: data.id,
              fields: data.sections || [],
              title: data.title,
              meta: data.meta || prevState.meta,
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
              userId: data.user_id,
              category: data.category,
            };
          });
        }
    });
  }

  submitPost(date, postSchedule) {
    let publishRegion = this.state.publishRegion;
    let postRepostBlogNames = this.state.postRepostBlogNames;
    let imageValidated = {
      square: {...this.state.crop.square},
      golden: {...this.state.crop.golden},
      panoramic: {...this.state.crop.panoramic},
    };

    for (let key in imageValidated) {
      delete imageValidated[key]['validate'];
    }

    let backendData = {
      categoryId: this.state.category,
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
      postDate: date,
      'publish-region': publishRegion,
      postRepostBlogNames: postRepostBlogNames,
      page: 'publish',
      firebase_id: this.state.id,
      post_status: 'future',
      user_id: this.state.userId,
      primary_image: this.state.meta.homepage.image.url,
      is_sensitive: this.state.isSensitive,
      long_post: this.state.specialPost,
      image_validated: imageValidated,
    };

    let firebaseData = {
      id: this.state.id,
      title: this.state.title,
      sections: this.state.fields,
      maxId: this.state.maxId,
      blogName: this.state.blogName,
      status: 'publish',
      publishData: {
        postDate: date,
        publishRegion: publishRegion,
        postRepostBlogNames: postRepostBlogNames
      },
      meta: this.state.meta,
      user_id: this.state.userId,
      crop: this.state.crop,
      isSensitive: this.state.isSensitive,
      specialPost: this.state.specialPost,
    };
    let postType = 'POST';
    let postUrl = 'postpage';
    if (this.state.postId != undefined && this.state.postId != '') {
      postType = 'PUT';
      postUrl = 'postpage/' + this.state.postId;
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
                  publishedDate: date,
                  snackbarOpen: true,
                  SnackbarMessage: 'Changes has been saved. Post scheduled for ' + moment(date, 'DD-MM-YYYY HH:mm').format('LLLL')
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
  //      Rollbar.critical(SAVING_DATA_ERROR_WARNING, e);
      }
    })
    .always(postSchedule);
  }

  setPostMeta = (key, value) => {
    let meta = this.state.meta;
    meta[key] = value;
    this.setState({meta});
  }

  setPostAuthor = (userId) => {
    this.setState({userId});
  }

  handleSensitivePost = (e, isSensitive) => {
    this.setState({isSensitive});
  }

  handleSpecialPost = (e, specialPost) => {
    this.setState({specialPost});
  }

  onSchedule(date, postSchedule) {
    if (this.isValid()) {
      return this.submitPost(date, postSchedule);
    }
    postSchedule();
  }

  enableButton() {
    this.setState({
      buttonDisabled : false
    });
  }

  isValid() {
    let isError = false, message;
    if ('publish' == this.state.status) {
      if (moment(this.state.publishedDate, 'DD/MM/YYYY HH:mm:ss').isBefore(moment())) {
        this.setMessage(true, PUBLISH_POST_WARNING);
      }
    } else if (!this.state.meta.homepage.image) {
      isError = true;
      message = MAIN_IMAGE_WARNING;
    }

    for (let key in this.state.crop) {
      if (!this.state.crop[key]['validate']) {
        isError = true;
        message = IMAGE_CROP_WARNING;
      }
    }

    this.setMessage(isError, message);
    if (isError) {
      this.setState({
        snackbarOpen: true,
        SnackbarMessage: message
      });
    }
    return !isError;
  }

  onInvalidDate() {
    this.setMessage(true, VALID_DATE_WARNING);
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

  updateSeoTitle = (event) => {
    this.state.meta.seo = this.state.meta.seo ? this.state.meta.seo : {};
    this.state.meta.seo.title = event.target.value;
    this.setState({ meta: this.state.meta });
  }

  updateSeoDescription = (event) => {
    this.state.meta.seo = this.state.meta.seo ? this.state.meta.seo : {};
    this.state.meta.seo.description = event.target.value;
    this.setState({ meta: this.state.meta });
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

  updateSocialFacebookText = (event) => {
    this.state.meta.social.facebook = event.target.value;
    this.setState({ meta: this.state.meta });
  }

  updateSocialTwitterText = (event) => {
    this.state.meta.social.twitter = event.target.value;
    this.setState({ meta: this.state.meta });
  }

  updateHomepageContent = (value) => {
    this.state.meta.homepage.content = value;
    this.setState({ meta: this.state.meta });
  }

  getAdvancedOptions = () => {
    if (this.state.blogUrl == undefined) {
      return null;
    }

    return <AdvancedOptions
      blogUrl={this.state.blogUrl}
      userId={parseInt(this.state.userId)}
      setPostMeta={this.setPostMeta}
      setPostAuthor={this.setPostAuthor}
      handleSensitivePost={this.handleSensitivePost}
      handleSpecialPost={this.handleSpecialPost}
      postMeta={this.state.meta}
      specialPost={this.state.specialPost}
      isSensitive={this.state.isSensitive}
    />;
  }

  onCropChange(shape, crop) {
    this.setState(prevState => {
      prevState['crop'][shape] = crop;
      return {
        crop: prevState['crop']
      };
    });
  }

  onCropValidate(shape, validate) {
    this.setState(prevState => {
      prevState['crop'][shape]['validate'] = validate;
      return {
        crop: prevState['crop']
      };
    });
  }



  setCategory = (categorySelected) => {
    this.setState(() => {
      return {
        category: categorySelected
      };
    });
  }

  render () {
    return(
      <div>
        <Snackbar
          open={this.state.snackbarOpen}
          message={ this.state.SnackbarMessage }
          autoHideDuration={5000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
        <SchedulePost
          buttonDisabled={this.state.buttonDisabled}
          value={this.state.publishedDate}
          base={this.props.base}
          onSchedule={this.onSchedule.bind(this)}
          onInvalidDate={this.onInvalidDate.bind(this)}
        />
        <div>
          <h4>Portada y redes sociales</h4>
          <Divider />
          <Row>
            <Col xs={6}>
              <Categories
                category={this.state.category}
                setCategory={this.setCategory}
                blogUrl={this.state.blogUrl}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <HomePage
                homepage={this.state.meta.homepage}
                updateHomepageContent={this.updateHomepageContent}
              />
            </Col>
            <Col xs ={3}>
              <Twitter
                twitter={this.state.meta.social.twitter}
                updateSocialTwitterText={this.updateSocialTwitterText}
              />
              </Col>
            <Col xs ={3}>
              <Facebook
                facebook={this.state.meta.social.facebook}
                updateSocialFacebookText={this.updateSocialFacebookText}
              />
            </Col>
          </Row>
          { this.state.meta.homepage.image
            ? <ImageCropper
                imageSrc={this.state.meta.homepage.image.url}
                onCropChange={this.onCropChange.bind(this)}
                onCropValidate={this.onCropValidate.bind(this)}
                crop={this.state.crop}
              />
            : ''
          }
        </div>
        <Row>
          <Col xs>
            <Seo
              seo={this.state.meta.seo ? this.state.meta.seo : {title:'', description:''} }
              updateSeoTitle={this.updateSeoTitle}
              updateSeoDescription={this.updateSeoDescription}
            />
          </Col>
          <Col xs>
            <CountriesFormOptions
              setPublishRegions={this.setPublishRegions.bind(this)}
              publishRegions={this.state.publishRegion}
            />
          </Col>
          <Col xs>
            {this.getAdvancedOptions()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Publish;
