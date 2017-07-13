import React from 'react';
import jquery from 'jquery';
import moment from 'moment-timezone';
import Snackbar from 'material-ui/Snackbar';
import { Row, Col } from 'react-flexbox-grid';

import SchedulePost from '../components/Editor/Publish/SchedulePost';
import HomePage from '../components/Editor/Publish/HomePage';
import Seo from '../components/Editor/Publish/Seo';
import Social from '../components/Editor/Publish/Social';
import CountriesFormOptions from '../components/Editor/Publish/CountriesFormOptions';
import AdvancedOptions from '../components/Editor/Publish/AdvancedOptions';
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
        },
        comment: { allowed: true, status: 'open' },
      },
      isSensitive: false,
      specialPost:false,
      buttonDisabled: true,
      loaded: false,
      isError: false,
      message: '',
      publishedDate: null,
      snackbarOpen: false
    };
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
              userId: data.user_id,
              specialPost: data.specialPost || false,
              isSensitive: data.isSensitive || false,
            });
          }
        }
      });
    }
  }

  submitPost(date) {
    let publishRegion = this.state.publishRegion;
    let postRepostBlogNames = this.state.postRepostBlogNames;

    let backendData = {
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
      isSensitive: this.state.isSensitive,
      specialPost: this.state.specialPost,
    };
    let postType = 'POST';
    let postUrl = 'postpage';
    if (this.state.postId != undefined && this.state.postId != '') {
      postType = 'PUT';
      postUrl = 'postpage/' + this.state.postId;
      successMessage = 'Changes has been saved.';
    }
    return jquery.ajax({
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

  setPostMeta = (key, value) => {
    let meta = this.state.meta;
    meta[key] = value;
    this.setState({meta});
  }

  setPostAuthor = (userId) => {
    this.setState({userId});

  onChange (ev) {
    ev.preventDefault();
    this.setState({date: ev.currentTarget.value});
  }

  handleSensitivePost = (e, isSensitive) => {
    this.setState({isSensitive});
  }

  handleSpecialPost = (e, specialPost) => {
    this.setState({specialPost});
  }

  onSchedule(date) {
    if (this.isValid()) {
      return this.submitPost(date);
    }
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

    this.setMessage(isError, message);
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

  updateSeoTitle = (event) => {
    this.state.meta.seo = this.state.meta.seo ? this.state.meta.seo : {};
    this.state.meta.seo.title = event.target.value;
    this.setState({ meta: this.state.meta });
  }

  updateSeoDescription = (event) => {
    this.state.meta.seo = this.state.meta.seo ? this.state.meta.seo : {};
    this.state.meta.seo.description = event.target.value;
    this.setState({ meta: this.state.meta });

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
          buttonDisabled={this.state.buttonDisabled}
          value={this.state.date}
          base={this.props.base}
          onSchedule={this.onSchedule.bind(this)}
          onInvalidDate={this.onInvalidDate.bind(this)}
        />
        <div>
          <h4>portada y redes sociales</h4>
          <Divider />
          <Row>
            <Col xs={6}>
              <HomePage
                homepage={this.state.meta.homepage}
                updateHomepageContent={this.updateHomepageContent}
              />
            </Col>
            <Col xs ={6}>
              <Social
                twitter={this.state.meta.social.twitter}
                facebook={this.state.meta.social.facebook}
                updateSocialFacebookText={this.updateSocialFacebookText}
                updateSocialTwitterText={this.updateSocialTwitterText}
              />
            </Col>
          </Row>
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
