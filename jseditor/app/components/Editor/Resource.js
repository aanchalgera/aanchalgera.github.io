import React from 'react';
import Content from './Content';
import ContentGrouped from './ContentGrouped';
import MoveControls from './MoveControls';
import MoreOptions from './MoreOptions';

export default class Resource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimize:true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderMode == false && this.props.orderMode == true) {
      this.setState({
        minimize : true
      });
    }
  }

  toggleMaximize() {
    this.setState({minimize:!this.state.minimize});
  }
  getStyleText(data) {
    var backgroundImage = '', backgroundImageHeight = '', repeatOrCover;
    backgroundImage = data.backgroundImage ? 'url("' + data.backgroundImage + '")' : '';
    if (data.backgroundRepeat == true) {
      repeatOrCover = ';background-repeat:repeat';
    } else {
      repeatOrCover = ';background-size:cover';
    }
    return 'background-image:' + backgroundImage + repeatOrCover + backgroundImageHeight;
  }
  render() {
    var {field,i,totalElements,...other} = this.props;
    var index = 'text-area' + field.id;
    var moreOptions = <MoreOptions
      openResourcePanel={this.props.openResourcePanel}
      addTextArea={this.props.addTextArea}
      addVideo={this.props.addVideo}
      addResource={this.props.addResource}
      addTable={this.props.addTable}
      addReview={this.props.addReview}
      groupSections={this.props.groupSections}
      show2column={field.show2column}
      show3column={field.show3column}
      dataId={i}
    />;

    var content;
    if (field.type == 'grouped') {
      content = (
        <ContentGrouped
          dataId={i}
          data={field}
          index={index}
          getStyleText={this.getStyleText}
          minimize={this.state.minimize}
          {...other}>
        </ContentGrouped>
      );
    } else {
      content = (
        <Content
          dataId={i}
          data={field}
          index={index}
          getStyleText={this.getStyleText}
          minimize={this.state.minimize}
          {...other}
        />
      );
    }
    var moveControls = (
      <MoveControls
        dataId={i}
        totalElements={totalElements}
        moveResourceDown={this.props.moveResourceDown}
        moveResourceUp={this.props.moveResourceUp}
        toggleMaximize={this.toggleMaximize.bind(this)}
        minimize={this.state.minimize}
      />
    );

    return (
      <div key={index} className="container-data">
        {this.props.orderMode ? moveControls: ''}
        {moreOptions}
        {content}
      </div>
    );
  }
}
