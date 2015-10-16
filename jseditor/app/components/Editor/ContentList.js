import React from 'react';
import Resource from './Resource';
import MoreOptions from './MoreOptions';

class ContentList extends React.Component{
  getStyleText(data) {
    var backgroundColor = '', backgroundImage = '';
      backgroundColor = data.backgroundColor;

      backgroundImage = data.backgroundImage ? "url('"+data.backgroundImage+"')" : '';
      if (data.backgroundRepeat == true) {
        var repeatOrCover = ';background-repeat:repeat'
      } else {
        var repeatOrCover = ';background-size:cover'
      }
    return 'background-color:'+backgroundColor+';color:'+data.foregroundColor+';background-image:'+backgroundImage+repeatOrCover;
  }
  isGroupable(type){
    var groupable = {'content':true,'gallery':false,'video':true,'summary':true,'richContent':true,'image':true,'grouped':false};
    return groupable[type];
  }
  render(){
    var {fields,...other} = this.props;
    var totalElements = this.props.fields.length;
    for (var i=0; i<totalElements-1;i++) {
      if (this.isGroupable(this.props.fields[i].type) && this.isGroupable(this.props.fields[i+1].type)) {
        this.props.fields[i]['show2column'] = true;
        if (i+2<this.props.fields.length && this.isGroupable(this.props.fields[i+2].type)) {
          this.props.fields[i]['show3column'] = true;
        } else {
          this.props.fields[i]['show3column'] = false;
        }
      }
      else {
        this.props.fields[i]['show2column'] = false;
        this.props.fields[i]['show3column'] = false;
      }
    }
    if (totalElements > 0) {
      this.props.fields[this.props.fields.length-1]['show2column'] = false;
      this.props.fields[this.props.fields.length-1]['show3column'] = false;
    }
    var fields = this.props.fields.map((field, i) => {
      var index = "text-area" + field.id;

      return (
        <Resource key={index}
          field={field}
          i={i}
          totalElements={totalElements}
          {...other}
          />
      )
    });
    return (
      <div className="col-sm-12 content-area container-ul" id="main-container">
        <ul id ="myList">{fields}</ul>
          <MoreOptions
            openResourcePanel={this.props.openResourcePanel}
            addTextArea={this.props.addTextArea}
            addVideo={this.props.addVideo}
            dataId={fields.length}
            key={fields.length}
            groupSections={this.props.groupSections}
            show2column={false}
            show3column={false}
          />
      </div>
    )
  }
};

export default ContentList;
