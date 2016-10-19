import React from 'react';

class MoreOptions extends React.Component {
  render() {
    const twoColumnButton = <button type="button" className="btn" onClick={() => this.props.groupSections(this.props.dataId, 2)} title="2 Columns"> 2 Columns</button>;
    const threeColumnButton = <button type="button" className="btn" onClick={() => this.props.groupSections(this.props.dataId, 3)} title="3 Columns"> 3 Columns</button>;
    const tableButton = <button type="button" className="btn fa fa-table" onClick={() => this.props.addTable(this.props.dataId)} title='Add Tables'></button>;
    const fichaDeReviewButton = <button type="button" className="btn fa fa-star-half-empty" onClick={() => this.props.addResource({type: 'fichaReview', currentIndex: this.props.dataId})} title='Add Ficha de review'></button>;
    const fichaTechnicaButton = <button type="button" className="btn fa fa-folder-o" onClick={() => this.props.addResource({type: 'technica', currentIndex: this.props.dataId})} title='Add Ficha tecnica'></button>;
    return (
      <div className="add-more-options">
        <button type="button" className="btn glyphicon glyphicon-plus" title="Add image, video, slider, new section" ></button>
        <span className="add-options">
          <button type="button" className="btn glyphicon glyphicon-text" onClick={() => this.props.addTextArea(this.props.dataId, 'content')} title="Add new section">T</button>
          <button type="button" className="btn glyphicon glyphicon-picture" onClick={() => this.props.openResourcePanel('image', this.props.dataId, '', false)} title="Add Image" ></button>
          <button type="button" className="btn glyphicon glyphicon-file" onClick={() => this.props.addTextArea(this.props.dataId, 'summary')} title="Add Summary"></button>
          <button type="button" className="btn glyphicon glyphicon-facetime-video" onClick={() => this.props.addResource({type: 'video', currentIndex: this.props.dataId})} title="Add Video"></button>
          <button type="button" className="btn glyphicon glyphicon-camera" onClick={() => this.props.openResourcePanel('image', this.props.dataId, 'gallery', false)} title="Add Gallery" ></button>
          <button type="button" className="btn glyphicon glyphicon-console" onClick={() => this.props.addTextArea(this.props.dataId, 'richContent')} title="Add rich content snippet"></button>
          <button type="button" className="btn glyphicon glyphicon-tasks" onClick={() => this.props.openResourcePanel('image', this.props.dataId, 'slider', false)} title="Add Slider" ></button>
          <button type="button" className="btn" onClick={() => this.props.addResource({type: 'giphy', currentIndex: this.props.dataId})} title="Add Giphy content">GIF</button>
          <button type="button" className="btn glyphicon glyphicon-stats" onClick={() => this.props.addResource({type: 'infogram', currentIndex: this.props.dataId})} title="Add Infogram/Datawrapper content"></button>
          {this.props.showTableButton === false ? null : tableButton}
          {this.props.showReviewButton === false ? null : fichaDeReviewButton}
          {this.props.showTechnicaButton === false ? null : fichaTechnicaButton}
          {this.props.show2column ? twoColumnButton : ''}
          {this.props.show3column ? threeColumnButton : ''}
        </span>
        <span className="hint">Add images, video, slider and new section.</span>
      </div>
    );
  }
}

export default MoreOptions;
