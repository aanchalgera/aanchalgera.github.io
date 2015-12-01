import React from 'react'
import jquery from 'jquery';
import axios from 'axios';

class PreviewOnSite extends React.Component{
  submitPost() {
    var data = {
      id : this.props.state.id,
      title : this.props.state.value,
      sections : this.props.state.fields,
      page: "preview",
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
      }
    })
    .catch(function (response) {
      console.log('error : ',response);
    });
  }
  savePost(response) {
    var content = response.parsedData;
    var metadata = response.meta;
    content = content.replace(/(\r\n|\n|\r)/gm,"");
    var data = {
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
      "postStatus": "draft",
      "page": "preview"
    }
    var postType = 'POST';
    var postUrl = 'posts.json';
    if (this.props.state.postId != undefined && this.props.state.postId != '') {
      var postType = 'PUT';
      var postUrl = "posts/" + this.props.state.postId + ".json";
      successMessage = 'Changes has been saved.';
      data.id = this.props.state.postId;
    }
    var self = this;
    jquery.ajax({
      url: "http://testing.xataka.com/admin/"+postUrl,
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
     this.props.setState({postId: result.id, postHash: result.post_hash});
     var sitePreviewUrl = SITE_DOMAIN+"preview-main/" +result.id+'/'+result.post_hash;
     window.open(sitePreviewUrl);
    });
  }
  render(){
    var previewButton = '';
    if (this.props.state.id && (this.props.state.status == undefined || this.props.state.status != 'publish')) {
      previewButton = <button className="btn btn-primary" onClick={this.submitPost.bind(this)}>Preview on Site (Not yet working)</button>
    }
    return (
      <span>{previewButton}</span>
    );
  }
}

export default PreviewOnSite;
