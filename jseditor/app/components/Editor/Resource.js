import React from 'react';
import Content from './Content';
import ContentGrouped from './ContentGrouped';
import MoveControls from './MoveControls';
import MoreOptions from './MoreOptions';

class Resource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimize:true
    };
  }
  toggleMaximize() {
    this.setState({minimize:!this.state.minimize})
  }
  getStyleText(data) {
    var backgroundClass = '', backgroundImage = '', backgroundImageHeight = '';
      backgroundClass = data.backgroundClass;
      backgroundImage = data.backgroundImage ? "url('"+data.backgroundImage+"')" : '';
      if (data.backgroundRepeat == true) {
        var repeatOrCover = ';background-repeat:repeat'
      } else {
        var repeatOrCover = ';background-size:cover'
      }
      if (data.backgroundFullscreen && data.backgroundImageHeight) {
        backgroundImageHeight = ";height:"+data.backgroundImageHeight+"px";
      }
    return 'background-image:'+backgroundImage+repeatOrCover+backgroundImageHeight;
  }
  render() {
    var {field,i,totalElements,...other} = this.props;
    var index = "text-area" + field.id;
    var moreOptions = <MoreOptions
      openResourcePanel={this.props.openResourcePanel}
      addTextArea={this.props.addTextArea}
      addVideo={this.props.addVideo}
      groupSections={this.props.groupSections}
      show2column={field.show2column}
      show3column={field.show3column}
      dataId={i}
    />;
    if (field.type == 'grouped') {
      var content = <ContentGrouped
        dataId={i}
        data={field}
        index={index}
        getStyleText={this.getStyleText}
        minimize={this.state.minimize}
        {...other}
        ></ContentGrouped>
    } else {
      var content = <Content
        dataId={i}
        data={field}
        index={index}
        getStyleText={this.getStyleText}
        minimize={this.state.minimize}
        {...other}
      />
    }
    var moveControls = <MoveControls
      dataId={i}
      totalElements={totalElements}
      moveResourceDown={this.props.moveResourceDown}
      moveResourceUp={this.props.moveResourceUp}
      toggleMaximize={this.toggleMaximize.bind(this)}
      minimize={this.state.minimize}
      />
    return (
      <div key={index} className="container-data">
        {this.props.orderMode ? moveControls: ''}
        {moreOptions}
        {content}
      </div>
    )
  }
}

export default Resource;
