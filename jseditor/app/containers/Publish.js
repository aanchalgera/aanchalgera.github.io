import React from 'react';
import jquery from 'jquery';
import moment from 'moment-timezone';
import Snackbar from 'material-ui/Snackbar';
import { Row, Col } from 'react-flexbox-grid';

import SchedulePost from '../components/Editor/Publish/SchedulePost';
import FbTwitterHomePageContent from '../components/Editor/Publish/FbTwitterHomePageContent';
import CountriesFormOptions from '../components/Editor/Publish/CountriesFormOptions';
import AdvancedOptions from '../components/Editor/Publish/AdvancedOptions';

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

  handleHomePageTwitterChanges(event) {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    let meta = this.state.meta;
    switch(name) {
      case 'facebook':
        meta.social.facebook = value;
        this.setState({meta: meta});
        break;
      case 'homePage':
        meta.homepage.content = value;
        this.setState({meta: meta});
        break;
      case 'twitter':
        meta.social.twitter = value;
        this.setState({meta: meta});
        break;
    }
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
        <CountriesFormOptions
          setPublishRegions={this.setPublishRegions.bind(this)}
          publishRegions={this.state.publishRegion}
        />
        <FbTwitterHomePageContent
          homePage={this.state.meta.homepage.content}
          twitter={this.state.meta.social.twitter}
          facebook={this.state.meta.social.facebook}
          homePageTwitterFbChange={this.handleHomePageTwitterChanges.bind(this)}
        />
        <Row>
          <Col xs>
            Seo place holder
          </Col>
          <Col xs>
            Pulicar place holder
          </Col>
          <Col xs>
            <AdvancedOptions />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Publish;
