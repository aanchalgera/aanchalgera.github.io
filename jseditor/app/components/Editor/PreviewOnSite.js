import React from 'react'
import jquery from 'jquery';
import axios from 'axios';
import moment from 'moment-timezone';

const SITE_DOMAIN = configParams.blogUrl;

class PreviewOnSite extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      buttonDisabled: false
    };
  }
  submitPost() {
    this.toggleButton();
    var data = {
      id : this.props.state.id,
      title : this.props.state.value,
      sections : this.props.state.fields,
      page: "publish",
      meta : this.props.state.meta
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
        self.savePost(JSON.parse(response.data.response))
      } else {
        Rollbar.critical('Problem in parsing data', response);
      }
    })
    .catch(function (response) {
      console.log('error : ',response);
      self.toggleButton();
      Rollbar.critical('Problem in parsing data', response);
    });
  }
  savePost(response) {
    var content = response.parsedData;
    var metadata = response.meta;
    content = content.replace(/(\r\n|\n|\r)/gm,"");
    var timeStamp = moment().format('X');
    var currentDay = moment.unix(timeStamp).locale('es').format('DD/MM/YYYY HH:mm')
    var data = {
      postform: {
        "categoryId":"-1",
        "post_title":this.props.state.value,
        "comment_status":"open",
        "post_type":"normal",
        "post_content":content,
        "postExcerpt" : JSON.stringify({'meta' : metadata}),
        "post_abstract":"",
        "post_extended_title":"",
        "post_visibility":0,
        "posts_galleries":"",
        "post_subtype" : 13,
        "post_status": "draft",
        "page": "preview",
        "postDate": currentDay,
        "publish-region": "",
        "postRepostBlogNames": ""
      }
    }
    var postType = 'POST';
    var postUrl = 'posts.json';
    if (this.props.state.postId != undefined && this.props.state.postId != '') {
      var postType = 'PUT';
      var postUrl = "posts/" + this.props.state.postId + ".json";
      data.id = this.props.state.postId;
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
     self.toggleButton();
     self.props.savePreviewData(result.id, result.post_hash);
     var sitePreviewUrl = SITE_DOMAIN+"preview-main/" +result.id+'/'+result.post_hash;
     window.open(sitePreviewUrl);
    })
    .error(function(jqXHR, textStatus, errorThrown) {
      self.toggleButton();
      console.log(errorThrown);
    });
  }
  toggleButton() {
    this.setState({
      buttonDisabled : !this.state.buttonDisabled
    });
  }
  render(){
    var previewButton = '';
    if (this.props.state.id && (this.props.state.status == undefined || this.props.state.status != 'publish')) {
      previewButton = <button className="btn btn-primary" disabled={this.state.buttonDisabled} onClick={this.submitPost.bind(this)}>Preview on Site</button>
    }
    return (
      <span>{previewButton}</span>
    );
  }
}

export default PreviewOnSite;
