import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
// import jquery from 'jquery';
import moment from 'moment-timezone';
import SlotWidget from './SlotWidget';
import RepostBlogsFormOptions from './RepostBlogsFormOptions';
import CountriesFormOptions from './CountriesFormOptions';

moment.tz.setDefault(configParams.timezone);
var chooseSlotMsg = "Select slot";
var successMessage = '';
const SITE_DOMAIN = configParams.blogUrl;

class Publish extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fields: [],
      value : moment().format('DD/MM/YYYY HH:mm'),
      status: 'publish',
      postRepostBlogNames: [],
      publishRegion: [],
      postId : '',
      postHash: ''
    };
  }
  componentDidMount(){
    this.init();
  }
  init(){
    this.postname = this.router.getCurrentParams().postname;
    if (undefined != this.postname) {
      this.props.base.fetch('posts', {
        context: this,
        asArray: true,
        queries: {
          orderByChild: 'status',
          equalTo: 'publish'
        },
        then(data){
          if (null != data) {
            var scheduledPosts = {};
            data.forEach(function(result,b){
              var formatDate = moment(result.publishData.postDate, 'DD/MM/YYYY H:00:00').format('YYYY-MM-DD H:00:00');
              scheduledPosts[formatDate] = {'id' : result.id, 'status': result.status, 'date': result.date, 'title' : result.title}
            })
            this.setState({
              futureProgrammedPosts: scheduledPosts
            });
          }
        }
      });
      this.props.base.fetch("posts/" + this.postname, {
        context: this,
        then(data){
          if (null != data) {
            this.setState({
              id : data.id,
              fields: data.sections != undefined ? data.sections : [],
              title: data.title,
              meta: data.meta != undefined ? data.meta : {index : '',homepage : {content:'',sponsor:''}, seo:{}},
              maxId : data.maxId,
              status: data.publishData.postStatus != undefined ? data.publishData.postStatus : "publish",
              value: data.publishData.postDate != undefined ? data.publishData.postDate : moment().format('DD/MM/YYYY HH:mm'),
              postRepostBlogNames: data.publishData.postRepostBlogNames,
              publishRegion: data.publishData.publishRegion,
              postId : data.publishData.postId != undefined ? data.publishData.postId : '',
              postHash : data.publishData.postHash != undefined ? data.publishData.postHash : ''
            });
          }
        }
      });
    }
  }
  componentWillMount(){
    this.router = this.context.router;
  }
  submitPost() {
    var data = {
      id : this.postname,
      title : this.state.title,
      meta : this.state.meta,
      sections : this.state.fields,
      page: "publish"
    };
    data = JSON.stringify(data);
    var self = this;
    axios({
      url : configParams.host + ':81/parse',
      method: 'POST',
      data : data
    })
    .then(function (response) {
      console.log(response);
      if (response.data.status == "success") {
        self.saveData(JSON.parse(response.data.response))
      }
    })
    .catch(function (response) {
      console.log('error : ',response);
    });
  }
  saveData(response) {
    var content = response.parsedData;
    var metadata = response.meta ? response.meta : 'placeholder metadata';
    if (this.postname == undefined) return;
    if (!this.validate()) return;
    content = content.replace(/(\r\n|\n|\r)/gm,"");
    var countries = document.querySelectorAll('#countries input[type=checkbox]:checked');
    var repostBlogs = document.querySelectorAll('#repost-blogs input[type=checkbox]:checked');
    var publishRegion = [];
    var postRepostBlogNames = [];
    for (var i = 0;i < countries.length ;i++) {
      publishRegion.push(countries[i].value);
    }
    for (var i = 0;i < repostBlogs.length ;i++) {
      postRepostBlogNames.push(repostBlogs[i].value);
    }

    var data = {
      categoryId: "-1",
      post_title: this.state.title,
      comment_status: "open",
      post_type: "normal",
      post_content: content,
      postExcerpt: JSON.stringify({'meta': metadata}),
      post_abstract: "",
      post_extended_title: "",
      post_visibility: 0,
      posts_galleries: "",
      post_subtype: 13,
      postDate: this.state.value,
      "publish-region": publishRegion,
      postStatus: this.state.status,
      postRepostBlogNames: postRepostBlogNames,
      page: "publish"
    }
    var formData = {
      "id" : this.state.id,
      "title" : this.state.title,
      "sections" : this.state.fields,
      "maxId" : this.state.maxId,
      "status": this.state.status,
      "publishData" : {
        "postDate": this.state.value,
        "publishRegion": publishRegion,
        "postStatus": this.state.status,
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
/////////////////////////////
    axios({
      url : SITE_DOMAIN+"admin/"+postUrl,
      method: postType,
      // headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
      withCredentials: true,
      // data : 'categoryId=-1&post_title=hello+hello+hello+hello+hello+hello&comment_status=open&post_type=normal&post_content=%3Cmain%3E++++%3Carticle+class%3D%22article+article-longform%22%3E++++++++%3Cheader+class%3D%22article-header+article-longform-header%22%3E++++++++++++%3Cdiv+class%3D%22module+module-type-text+module-layout-single%22+style%3D%22%22%3E++++%3Cdiv+class%3D%22module-content%22%3E++++++++%3Cp%3Ehello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+hello+%3C%2Fp%3E++++%3C%2Fdiv%3E%3C%2Fdiv%3E++++++++%3C%2Fheader%3E++++++++%3Cdiv+class%3D%22article-metadata-container+m-in-longform%22%3E++++++++++++%3Cdiv+class%3D%22article-metadata%22%3E++++++++++++%3Ctime+class%3D%22article-date%22+datetime%3D%22%23DATETIME%23%22+data-format%3D%22DD+MMMM+YYYY+HH%3Amm%22%3E%3C%2Ftime%3E++++++++++++%3C%2Fdiv%3E++++++++%3C%2Fdiv%3E++++++++%3Cdiv+class%3D%22article-social-share+m-in-longform%22%3E++++++++++++%3Cp%3ECompartir%3C%2Fp%3E++++++++++++%3Cul%3E++++++++++++++++%3Cli%3E%3Ca+class%3D%22btn-facebook%22+data-social%3D%22facebook%22%3EFacebook%3C%2Fa%3E%3C%2Fli%3E++++++++++++++++%3Cli%3E%3Ca+class%3D%22btn-twitter%22+data-social%3D%22twitter%22%3ETwitter%3C%2Fa%3E%3C%2Fli%3E++++++++++++++++%3Cli%3E%3Ca+class%3D%22btn-email%22+data-social%3D%22email%22%3EEmail%3C%2Fa%3E%3C%2Fli%3E++++++++++++%3C%2Ful%3E++++++++%3C%2Fdiv%3E++++++++%3Cdiv+class%3D%22article-content%22%3E++++++++++++++++++++%3C%2Fdiv%3E++++%3C%2Farticle%3E%3C%2Fmain%3E&postExcerpt=%7B%22meta%22%3A%7B%22homepage%22%3A%7B%22content%22%3A%22%22%2C%22sponsor%22%3A%22%22%7D%2C%22index%22%3A%22%22%7D%7D&post_abstract=&post_extended_title=&post_visibility=0&posts_galleries=&post_subtype=13&postDate=04%2F12%2F2015+7%3A00&publish-region%5B%5D=ES&publish-region%5B%5D=US&publish-region%5B%5D=MX&publish-region%5B%5D=PE&publish-region%5B%5D=ROW&postStatus=publish&page=publish'
      data : data
    })
    .then(function (result) {
      if (result.id != undefined) {
        formData.publishData.postId = result.id;
        formData.publishData.postHash = result.post_hash;
      }
      self.props.base.post(
        'posts/' + self.state.id, {
        data: formData,
        then(data) {
          if (result.id != undefined) {
            document.getElementById('schedule-success').style.display = 'block';
            setTimeout(function() {
              document.getElementById('schedule-success').style.display = 'none';
            }, 7000);
            self.setState({postId: result.id, postHash: result.post_hash});
          }
        }
      });
    })
    .catch(function (response) {
      console.log('error : ',response);
    });    
/////////////////////////////    
  }
  onChange (ev) {
    ev.preventDefault()
    this.setState({value: ev.currentTarget.value});
  }
  onSchedule(ev) {
    ev.preventDefault();
    if (!this.validate()) return;
    this.submitPost();
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
    if (this.state.postId != undefined && this.state.postId != '') {
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
Publish.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Publish;
