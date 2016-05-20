import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import jquery from 'jquery';
import moment from 'moment-timezone';
import SlotWidget from './SlotWidget';
import RepostBlogsFormOptions from './RepostBlogsFormOptions';
import CountriesFormOptions from './CountriesFormOptions';

moment.tz.setDefault(configParams.timezone);
let chooseSlotMsg = 'Select slot ';
let successMessage = '';
const SITE_DOMAIN = configParams.blogUrl;
const VALID_DATE_WARNING = 'Please select a valid date, future date';
const PARSING_DATA_ERROR_WARNING = 'Problem in parsing data';
const SAVING_DATA_ERROR_WARNING = 'Problem in saving data';


class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      value: moment().format('DD/MM/YYYY HH:mm'),
      status: 'draft',
      postRepostBlogNames: [],
      publishRegion: [],
      postId: '',
      postHash: '',
      buttonDisabled: true,
      loaded: false,
      isError: false,
      message: '',
    };
  }

  componentDidMount() {
    this.init();
  }

  init() {
    this.postname = this.props.params.postname;
    let { query } = this.props.location;
    this.userId = parseInt(query.userid);
    if (this.postname != undefined) {
      this.props.base.fetch('posts', {
        context: this,
        asArray: true,
        queries: {
          orderByChild: 'status',
          equalTo: 'publish',
        },
        then(data) {
          if (data != null) {
            var scheduledPosts = {};
            data.forEach(function (result, b) {
              var formatDate = moment(result.publishData.postDate, 'DD/MM/YYYY H:00:00').format('YYYY-MM-DD H:00:00');
              scheduledPosts[formatDate] = {'id' : result.id, 'status': result.status, 'date': result.date, 'title' : result.title}
            });

            this.setState({
              futureProgrammedPosts: scheduledPosts,
              buttonDisabled: false,
            });
          }
        },
      });
      this.props.base.fetch('posts/' + this.postname, {
        context: this,
        then(data) {
          if (data != null) {
            this.setState({
              id: data.id,
              fields: data.sections != undefined ? data.sections : [],
              title: data.title,
              meta: data.meta != undefined ? data.meta : {index : '', homepage : {content:''}, sponsor: {name:'', image:'',tracker:''}, css:{skinName:''}, seo:{}},
              maxId: data.maxId,
              status: data.publishData.postStatus != undefined ? data.publishData.postStatus : '',
              value: data.publishData.postDate != undefined ? data.publishData.postDate : moment().format('DD/MM/YYYY HH:mm'),
              postRepostBlogNames: data.publishData.postRepostBlogNames,
              publishRegion: data.publishData.publishRegion,
              postId: data.publishData.postId != undefined ? data.publishData.postId : '',
              postHash: data.publishData.postHash != undefined ? data.publishData.postHash : '',
              buttonDisabled: false,
              loaded: true,
              userId: data.user_id != undefined ? data.user_id : 1,
            });
          }
        },
      });
    }
  }

  submitPost() {
    let data = {
      id: this.postname,
      title: this.state.title,
      meta: this.state.meta,
      sections: this.state.fields,
      page: 'publish',
    };
    data = JSON.stringify(data);
    let self = this;
    axios({
      url: configParams.host + ':81/parse',
      method: 'POST',
      data: data,
    })
    .then(function (response) {
      console.log(response);
      if (response.data.status == 'success') {
        self.saveData(JSON.parse(response.data.response));
      } else {
        self.setMessage(true, PARSING_DATA_ERROR_WARNING)
        Rollbar.critical(PARSING_DATA_ERROR_WARNING, response);
      }
    })
    .catch(function (response) {
      self.setMessage(true, PARSING_DATA_ERROR_WARNING)
      Rollbar.critical(PARSING_DATA_ERROR_WARNING, response);
    });
  }

  saveData(response) {
    let content = response.parsedData;
    let metadata = response.meta;
    if (this.postname == undefined) return;
    this.validate();
    if (this.state.isError) return;
    content = content.replace(/(\r\n|\n|\r)/gm, '');
    let publishRegion = this.state.publishRegion;
    let postRepostBlogNames = this.state.postRepostBlogNames;

    var data = {
      "categoryId":"-1",
      "post_title":this.state.title,
      "comment_status":"open",
      "post_type":"normal",
      "post_content":content,
      "postExcerpt" : JSON.stringify({'meta' : metadata}),
      "post_abstract":"",
      "post_extended_title":"",
      "post_visibility":0,
      "posts_galleries":"",
      "post_subtype" : 13,
      "postDate": this.state.value,
      "publish-region": publishRegion,
      "post_status": "publish",
      "postRepostBlogNames": postRepostBlogNames,
      "page": "publish"
    };

    let formData = {
      id: this.state.id,
      title: this.state.title,
      sections: this.state.fields,
      maxId: this.state.maxId,
      status: this.state.status,
      publishData: {
        postDate: this.state.value,
        publishRegion: publishRegion,
        postStatus: 'publish',
        postRepostBlogNames: postRepostBlogNames
      },
      meta: this.state.meta,
      user_id: this.state.userId
    };
    let postType = 'POST';
    let postUrl = 'posts.json';
    if (this.state.postId != undefined && this.state.postId != '') {
      let postType = 'PUT';
      let postUrl = 'posts/' + this.state.postId + '.json';
      successMessage = 'Changes has been saved.';
      data.id = this.state.postId;
    }
    let self = this;
    debugger
    jquery.ajax({
      url: SITE_DOMAIN + 'admin/' + postUrl,
      type: postType,
      dataType: 'json',
      data: data,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
    .fail(function(){
      self.setMessage(true, SAVING_DATA_ERROR_WARNING)
    })
    .done(function(result, status) {
     console.log(result, status);
     if (result.id != undefined) {
       formData.publishData.postId = result.id;
       formData.publishData.postHash = result.post_hash;
       self.toggleButton();
     }
     try {
       self.props.base.post(
         'posts/' + self.state.id, {
         data: formData,
         then(data) {
           if (result.id != undefined) {
             self.refs.scheduleSuccess.style.display = 'block';
             setTimeout(function() {
               self.refs.scheduleSuccess.style.display = 'none';
             }, 7000);
             self.setState({postId: result.id, postHash: result.post_hash, status: 'publish'});
           }
         }
       });
     } catch (e) {
       let errorMessage = e.substring(0, 20);
       self.setMessage({ true, errorMessage });
       Rollbar.critical(SAVING_DATA_ERROR_WARNING, e);
     }
    });
  }

  onChange (ev) {
    ev.preventDefault()
    this.setState({value: ev.currentTarget.value});
  }

  onSchedule(ev) {
    ev.preventDefault();
    this.toggleButton();
    this.validate();
    this.submitPost();
  }

  toggleButton() {
    this.setState({
      buttonDisabled : !this.state.buttonDisabled
    });
  }

  validate() {
    if ('publish' == this.state.status) {
      if (moment(moment(this.state.value, "DD/MM/YYYY HH:mm:ss").format('YYYY-MM-DD HH:mm:ss')).isBefore(moment().format('YYYY-MM-DD HH:mm:ss'))) {
        this.setMessage(true, VALID_DATE_WARNING);
      } else {
        this.setMessage(false);
      }
    }
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
    var visible = document.getElementById('publish-slots').style.display;
    document.getElementById('publish-slots').style.display = visible == 'none'? 'block': 'none';
    this.handleDatePickerText();
  }

  handleDatePickerText() {
    if (chooseSlotMsg == document.getElementById('toggle-publish-slots').text) {
      document.getElementById('toggle-publish-slots').text = "Close";
    } else {
      document.getElementById('toggle-publish-slots').text = chooseSlotMsg;
    }
  }

  onPickSlot (ev) {
    var currentTarget = ev.currentTarget;
    if (ev.currentTarget.className == 'slot-past' || ev.currentTarget.className == 'slot-busy') return
    var currentSlot = document.getElementsByClassName('slot-current')
    if (currentSlot.length > 0) {
      currentSlot[0].classList.add("slot-free")
      currentSlot[0].innerHTML = "Libre"
      currentSlot[0].classList.remove("slot-current")
    }
    currentTarget.classList.remove("slot-free")
    currentTarget.innerHTML = "Elegido"
    currentTarget.classList.add("slot-current")
    this.setState({
      value: ev.currentTarget.dataset.date
    });
    document.getElementById('publish-slots').style.display = 'none';
    this.handleDatePickerText();
  }

  setPublishRegions (newRegions) {
    this.setState({
      publishRegion: newRegions,
    })
  }

  setRepostBlogs (newBlogs) {
    this.setState({
      postRepostBlogNames: newBlogs,
    })
  }

  render () {
    let loadingMessage = '';
    let sitePreviewLink = '';
    let sitePreviewUrl = '';
    let errorField = '';
    if (!this.state.loaded) {
      loadingMessage = <p className='loader'><strong>Loading .....</strong></p>;
    }
    if (this.state.isError) {
      errorField = <div className="published-messages error">{this.state.message}</div>;
    }
    if (this.state.postId != undefined && this.state.postId != '' && this.state.status == 'publish') {
      sitePreviewUrl = SITE_DOMAIN+"preview-main/" +this.state.postId+'/'+this.state.postHash;
      sitePreviewLink = <a id="site-preview" target={sitePreviewUrl} href={sitePreviewUrl} className="btn btn-primary">Go to Site Preview</a>
    }
    return(
      <div>
        <div className="preview-nav">
          <Link to={'/edit/post/'+this.postname} className="btn btn-primary">Back to editing</Link>
          {sitePreviewLink}
        </div>
        <form className="post-publish" ref="publish-form">
          <div className="publish-headers">
            <h3>Publish your post</h3>
          </div>
          {errorField}
          <div className="published-messages success" style={{display: 'none'}} ref="scheduleSuccess" id="schedule-success">{successMessage} Post scheduled for {moment(this.state.value, "DD-MM-YYYY HH:mm").format('LLLL')}</div>
          <SlotWidget
            buttonDisabled={this.state.buttonDisabled}
            value={this.state.value}
            futureProgrammedPosts={this.state.futureProgrammedPosts}
            onChange={this.onChange.bind(this)}
            onPickSlot={this.onPickSlot.bind(this)}
            onSchedule={this.onSchedule.bind(this)}
            openSlotWidget={this.openSlotWidget.bind(this)} />
          <CountriesFormOptions setPublishRegions={this.setPublishRegions.bind(this)} publishRegions={this.state.publishRegion} />
          <RepostBlogsFormOptions setRepostBlogs={this.setRepostBlogs.bind(this)} repostBlogs={this.state.postRepostBlogNames} />
          {loadingMessage}
        </form>
      </div>
    )
  }
}

export default Publish;
