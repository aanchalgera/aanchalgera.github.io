import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import jquery from 'jquery';
import moment from 'moment';
import SlotWidget from './SlotWidget';
import RepostBlogsFormOptions from './RepostBlogsFormOptions';
import CountriesFormOptions from './CountriesFormOptions';

var utcDifference = 7200000;
var timeStamp = moment().locale('es').format('X');

class Publish extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fields: [],
      value : moment.unix(timeStamp).format('DD/MM/YYYY HH:mm'),
      status: 'draft',
      postRepostBlogNames: [],
      publishRegion: []
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
          equalTo: 'future'
        },
        then(data){
          if (null != data) {
            var scheduledPosts = {};
            data.forEach(function(result,b){
              var formatDate = moment(result.date).format('YYYY-MM-DD H:00:00');
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
              maxId : data.maxId,
              status: data.publishData.postStatus != undefined ? data.publishData.postStatus : "draft",
              value: data.publishData.postDate != undefined ? data.publishData.postDate : moment.unix(timeStamp).format('DD/MM/YYYY HH:mm'),
              postRepostBlogNames: data.publishData.postRepostBlogNames,
              publishRegion: data.publishData.publishRegion
            });
          }
        }
      });
    }
  }
  componentWillMount(){
    this.router = this.context.router;
  }
  onPublish(ev) {
    ev.preventDefault();
    var data = {
      id : this.postname,
      title : this.state.title,
      sections : this.state.fields,
      page: "publish"
    };
    data = JSON.stringify(data);
    var self = this;
    axios({
      url : 'http://52.19.39.251:81/parse',
      method: 'POST',
      data : data
    })
    .then(function (response) {
      console.log(response);
      self.saveData(response.data.response)
    })
    .catch(function (response) {
      console.log('error : ',response);
    });
  }
  saveData(content) {
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
      "categoryId":"-1",
      "post_title":this.state.title,
      "comment_status":"open",
      "postType":"normal",
      "post_content":content,
      "post_abstract":"",
      "post_extended_title":"",
      "post_visibility":0,
      "posts_galleries":"",
      "postDate": this.state.value,
      "publish-region": publishRegion,
      "postStatus": "publish",
      "postRepostBlogNames": postRepostBlogNames
    }
    var formData = {
      "id" : this.state.id,
      "title" : this.state.title,
      "sections" : this.state.fields,
      "maxId" : this.state.maxId,
      "status" : 'publish',
      "publishData" : {
        "postDate": this.state.value,
        "publishRegion": publishRegion,
        "postStatus": "publish",
        "postRepostBlogNames": postRepostBlogNames
      }
    };
    this.props.base.post(
      'posts/' + this.state.id, {
      data: formData,
      then(data) {
        console.log('saved');
      }
    });
  }
  onChange (ev) {
    ev.preventDefault()
    this.setState({value: ev.currentTarget.value});
  }
  onPickSlot (ev) {
    var currentTarget = ev.currentTarget;
    if (ev.currentTarget.className == 'slot-past' || ev.currentTarget.className == 'slot-busy') return
    if (!this.validate()) return
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
  }
  onSchedule(ev) {
    ev.preventDefault();
    if (!this.validate()) return;
    this.setState({
      status: "future"
    });
  }
  validate() {
    var errorField = document.getElementsByClassName('error');
    errorField[0].style.display = 'none';
    if ('future' == this.state.status || 'draft' == this.state.status) {
      if (this.getFutureTimeInUTC() < new Date().getTime()) {
        document.getElementById('date-error').style.display = 'block';
        return;
      }
    }
    return true;
  }
  getFutureTimeInUTC() {
    var futureDate = this.state.value.split(' ')
    var dateSplit = futureDate[0].split('/')
    var formattedFutureDate = new Date(Date.parse(dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2] + ' ' + futureDate[1] + ':00 UTC'))
    return formattedFutureDate.getTime() - utcDifference;
  }
  render () {
    return(
      <div>
        <div className="preview-nav">
          <Link to={"/edit/post/"+this.postname} className="btn btn-primary">Back to post</Link>
          <a className="btn btn-primary" href="#" onClick={this.onPublish.bind(this)}>Publish</a>
        </div>
        <form className="post-publish" ref="publish-form">
          <h3>Publish your post</h3>
          <div className="error alert alert-danger" id="date-error" style={{display: 'none'}}>Por favor, seleccione fecha válida</div>
          <SlotWidget
            value={this.state.value}
            futureProgrammedPosts={this.state.futureProgrammedPosts}
            onChange={this.onChange.bind(this)}
            onPickSlot={this.onPickSlot.bind(this)}
            onSchedule={this.onSchedule.bind(this)} />
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
