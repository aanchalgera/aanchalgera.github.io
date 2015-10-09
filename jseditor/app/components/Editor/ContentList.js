import React from 'react';
import Content from './Content';
import MoreOptions from './MoreOptions';

class ContentList extends React.Component{
  render(){
    var previousAlign = '', alignError = '';
    var {dragOver,fields,...other} = this.props;
    var fields = this.props.fields.map((field, i) => {
    var index = "text-area" + field.id;

    var moreOptions = <MoreOptions
          openResourcePanel={this.props.openResourcePanel}
          addTextArea={this.props.addTextArea}
          addVideo={this.props.addVideo}
          dataId={i}
      />;

      return (
        <div key={index} className={"container-data " + field.align}>
          {moreOptions}
          <Content
            dataId={i}
            type={field.type}
            data={field}
            index={index}
            {...other}
          />
      </div>
      )
    });
    return (
      <div className="col-sm-12 content-area container-ul" id="main-container">
        <ul id ="myList" onDragOver={this.props.dragOver.bind(this)} >{fields}</ul>
          <MoreOptions
            openResourcePanel={this.props.openResourcePanel}
            addTextArea={this.props.addTextArea}
            addVideo={this.props.addVideo}
            dataId={fields.length}
            key={fields.length}
          />
      </div>
    )
  }
};

export default ContentList;
