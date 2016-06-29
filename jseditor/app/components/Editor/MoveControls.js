import React from 'react';

class MoveControls extends React.Component {
  render() {
    var moveUp = <button onClick={this.props.moveResourceUp.bind(this,this.props.dataId)} type="button" className="btn btn-info btn-sm glyphicon glyphicon-arrow-up" title="Move up" />;
    var moveResourceDown= <button onClick={this.props.moveResourceDown.bind(this,this.props.dataId)} type="button" className="btn btn-info btn-sm glyphicon glyphicon-arrow-down" title="Move down" />;
    var maximize = <button onClick={this.props.toggleMaximize.bind(this)} type="button" className="btn btn-info btn-sm glyphicon glyphicon-plus" title="Move own" />;
    var minimize = <button onClick={this.props.toggleMaximize.bind(this)} className="btn btn-info btn-sm glyphicon glyphicon-minus" type="button" title="Move own" />;
    return (
      <div className="move-controls btn-group-vertical visible">
          {this.props.dataId > 0? moveUp : ''}
          {this.props.dataId < this.props.totalElements-1 ? moveResourceDown : ''}
          {this.props.minimize == true ? maximize : minimize}
      </div>
    );
  }
}

export default MoveControls;
