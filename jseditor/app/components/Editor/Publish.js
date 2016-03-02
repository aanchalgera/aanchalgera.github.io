import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import jquery from 'jquery';
import moment from 'moment-timezone';
import SlotWidget from './SlotWidget';
import RepostBlogsFormOptions from './RepostBlogsFormOptions';
import CountriesFormOptions from './CountriesFormOptions';

moment.tz.setDefault(configParams.timezone);
var chooseSlotMsg = 'Select slot ';
var successMessage = '';
const SITE_DOMAIN = configParams.blogUrl;

class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      value: moment().format('DD/MM/YYYY HH:mm'),
      status: '',
      postRepostBlogNames: [],
      publishRegion: [],
      postId: '',
      postHash: '',
      buttonDisabled: true,
    };
  }

  componentDidMount() {
    this.init();
  }

  init() {
    this.postname = this.props.routeParams.postname;
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
            });
          }
        },
      });
    }
  }

  submitPost() {
    var data = {
      id: this.postname,
      title: this.state.title,
      meta: this.state.meta,
      sections: this.state.fields,
      page: "publish"
    };
    data = JSON.stringify(data);
    var self = this;
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
        Rollbar.critical('Problem in parsing data', response);
      }
    })
    .catch(function (response) {
      console.log('error : ', response);
      self.toggleButton();
      Rollbar.critical('Problem in parsing data', response);
    });
  }

  saveData(response) {
    var content = response.parsedData;
    var metadata = response.meta;
    if (this.postname == undefined) return;
    if (!this.validate()) return;
    content = content.replace(/(\r\n|\n|\r)/gm, '');
    var countries = document.querySelectorAll('#countries input[type=checkbox]:checked');
    var repostBlogs = document.querySelectorAll('#repost-blogs input[type=checkbox]:checked');
    var publishRegion = [];
    var postRepostBlogNames = [];
    for (var i = 0; i < countries.length; i++) {
      publishRegion.push(countries[i].value);
    }

    for (var i = 0; i < repostBlogs.length; i++) {
      postRepostBlogNames.push(repostBlogs[i].value);
    }

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

    var formData = {
      "id" : this.state.id,
      "title" : this.state.title,
      "sections" : this.state.fields,
      "maxId" : this.state.maxId,
      "status": "publish",
      "publishData" : {
        "postDate": this.state.value,
        "publishRegion": publishRegion,
        "postStatus": "publish",
        "postRepostBlogNames": postRepostBlogNames
      },
      "meta" : this.state.meta
    };
    var postType = 'POST';
    var postUrl = 'posts.json';
    if (this.state.postId != undefined && this.state.postId != '') {
      var postType = 'PUT';
      var postUrl = "posts/" + this.state.postId + ".json";
      successMessage = 'Changes has been saved.';
      data.id = this.state.postId;
    }
    var self = this;
    jquery.ajax({
      url: SITE_DOMAIN+'admin/'+postUrl,
      type: postType,
      dataType: "json",
      data: data,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
    .success(function(result, status) {
     console.log(result, status);
     if (result.id != undefined) {
       formData.publishData.postId = result.id;
       formData.publishData.postHash = result.post_hash;
     }
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
           self.toggleButton();
         }
       }
     });
    });
  }

  onChange (ev) {
    ev.preventDefault()
    this.setState({value: ev.currentTarget.value});
  }
  onSchedule(ev) {
    ev.preventDefault();
    if (!this.validate()) return;
    this.toggleButton();
    this.submitPost();
  }
  toggleButton() {
    this.setState({
      buttonDisabled : !this.state.buttonDisabled
    });
  }
  validate() {
    document.getElementById('date-error').style.display = 'none';
    if ('publish' == this.state.status) {
      if (moment(moment(this.state.value, "DD/MM/YYYY HH:mm:ss").format('YYYY-MM-DD HH:mm:ss')).isBefore(moment().format('YYYY-MM-DD HH:mm:ss'))) {
        document.getElementById('date-error').style.display = 'block';
        return;
      }
    }
    return true;
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
  render () {
    var sitePreviewLink = '';
    var sitePreviewUrl = '';
    if (this.state.postId != undefined && this.state.postId != '' && this.state.status == 'publish') {
      sitePreviewUrl = SITE_DOMAIN+"preview-main/" +this.state.postId+'/'+this.state.postHash;
      sitePreviewLink = <a id="site-preview" target={sitePreviewUrl} href={sitePreviewUrl} className="btn btn-primary">Go to Site Preview</a>
    }
    return(
      <div>
        <div className="preview-nav">
          <Link to={"/edit/post/"+this.postname} className="btn btn-primary">Back to editing</Link>
          {sitePreviewLink}
        </div>
        <form className="post-publish" ref="publish-form">
          <div className="publish-headers">
            <h3>Publish your post</h3>
          </div>
          <div className="published-messages error" style={{display: 'none'}} id="date-error">Please select a valid date, future date</div>
          <div className="published-messages success" style={{display: 'none'}} ref="scheduleSuccess" id="schedule-success">{successMessage} Post scheduled for {moment(this.state.value, "DD-MM-YYYY HH:mm").format('LLLL')}</div>
          <SlotWidget
            buttonDisabled={this.state.buttonDisabled}
            value={this.state.value}
            futureProgrammedPosts={this.state.futureProgrammedPosts}
            onChange={this.onChange.bind(this)}
            onPickSlot={this.onPickSlot.bind(this)}
            onSchedule={this.onSchedule.bind(this)}
            openSlotWidget={this.openSlotWidget.bind(this)} />
          <CountriesFormOptions publishRegions={this.state.publishRegion} />
          <RepostBlogsFormOptions repostBlogs={this.state.postRepostBlogNames} />
        </form>
      </div>
    )
  }
}

export default Publish;
