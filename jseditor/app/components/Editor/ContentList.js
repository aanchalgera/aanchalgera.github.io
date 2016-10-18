import React from 'react';
import Resource from './Resource';
import MoreOptions from './MoreOptions';

class ContentList extends React.Component{
  isGroupable(type){
    if (type == 'table' || type == 'grouped') {
      return false;
    } else {
      return true;
    }
  }

  render(){
    var {fields,...other} = this.props;
    var totalElements = this.props.fields.length;
    for (var i=0; i<totalElements-1;i++) {
      if (this.isGroupable(fields[i].type) && this.isGroupable(fields[i+1].type)) {
        fields[i]['show2column'] = true;
        if (i+2<fields.length && this.isGroupable(fields[i+2].type)) {
          fields[i]['show3column'] = true;
        } else {
          fields[i]['show3column'] = false;
        }
      }
      else {
        fields[i]['show2column'] = false;
        fields[i]['show3column'] = false;
      }
    }
    if (totalElements > 0) {
      fields[fields.length-1]['show2column'] = false;
      fields[fields.length-1]['show3column'] = false;
    }
    var fieldsHtml = fields.map((field, i) => {
      if ('title' == field.type) {
        return null;
      }
      var index = 'text-area' + field.id;
      return (
        <Resource key={index}
          field={field}
          i={i}
          totalElements={totalElements}
          {...other}
        />
      );
    });
    return (
      <div className="col-sm-12 content-area container-ul" id="main-container">
        <ul id ="myList">{fieldsHtml}</ul>
          <MoreOptions
            openResourcePanel={this.props.openResourcePanel}
            addImageCaption={this.props.addImageCaption.bind(this)}
            addTextArea={this.props.addTextArea}
            addVideo={this.props.addVideo}
            addResource={this.props.addResource}
            addTable={this.props.addTable}
            addReview={this.props.addReview}
            dataId={fieldsHtml.length}
            key={fieldsHtml.length}
            groupSections={this.props.groupSections}
            show2column={false}
            show3column={false}
          />
      </div>
    );
  }
}

export default ContentList;
