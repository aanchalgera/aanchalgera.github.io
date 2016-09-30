import React from 'react';
import PropertyButton from './PropertyButton';
import EditButton from './EditButton';
import Image from './Image';
import Gallery from './Gallery';
import Slider from './Slider';
import Giphy from './Giphy';
import Chart from './Chart';
import Table from './Table';
import DraftJSEditor from './DraftJSEditor/DraftJSEditor';

class Content extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      edit: true
    };
  }

  componentDidMount() {
    switch (this.props.data.type){
      case 'richContent':
      case 'image':
      case 'video':
      case 'gallery':
      case 'slider':
      case 'giphy':
      case 'infogram':
      case 'datawrapper':
      case 'table':
        document.querySelector('#div-'+this.props.index).setAttribute('style',this.props.getStyleText(this.props.data));
        break;
      case 'summary':
        document.querySelector('#div-'+this.props.index+' .blockquote').setAttribute('style',this.props.getStyleText(this.props.data));
        break;
    }
    const field = this.refs.field;
    if (field) {
      field.focus();
    }
  }
  componentDidUpdate() {
    switch (this.props.data.type) {
      case 'content':
      case 'richContent':
      case 'image':
      case 'video':
      case 'gallery':
      case 'slider':
      case 'summary':
      case 'giphy':
      case 'infogram':
      case 'datawrapper':
      case 'table':
        document.querySelector('#div-'+this.props.index).setAttribute('style',this.props.getStyleText(this.props.data));
        break;
    }
  }

  editResource() {
    this.setState({ edit: true });
  }

  updateResource({type, currentIndex}, event) {
    this.setState({ edit: false });
    this.props.updateResource({type, currentIndex}, event);
  }

  render () {
    var field;
    let editButton = null;
    if('content' == this.props.data.type) {
      field = (
        <DraftJSEditor
          ref="field"
          value={this.props.data.text}
          updateText={this.props.updateText}
          dataId={this.props.dataId}
        />
      );
    } else if ('summary' == this.props.data.type) {
      field = (
        <div className={'asset-size-' + this.props.data.layout}>
          <label className="ptitle">Summary</label>
          <DraftJSEditor
            ref="field"
            minimal={true}
            className="form-control blockquote"
            value={this.props.data.text}
            updateText={this.props.updateText}
            dataId={this.props.dataId}
          />
        </div>
      );
    } else if('image' == this.props.data.type) {
      field = <Image {...this.props} />;
    } else if('gallery' == this.props.data.type) {
      field = <Gallery
        data={this.props.data}
        dataId={this.props.dataId}
        openResourcePanel={this.props.openResourcePanel.bind(this)}
        addImageCaption={this.props.addImageCaption.bind(this)}
        deleteImage={this.props.deleteImage.bind(this)}
        moveImage={this.props.moveImage.bind(this)}
      />;
    } else if('slider' == this.props.data.type) {
      field = <Slider
        data={this.props.data}
        dataId={this.props.dataId}
        openResourcePanel={this.props.openResourcePanel.bind(this)}
        addImageCaption={this.props.addImageCaption.bind(this)}
        deleteImage={this.props.deleteImage.bind(this)}
        moveImage={this.props.moveImage.bind(this)}
      />;
    } else if('video' == this.props.data.type) {
      if ('' == this.props.data.url || this.state.edit) {
        field = (
          <div>
            <label className="ptitle">
              URL of video <span className="hint">(Please add video url from youtube share tab.)</span>
            </label>
            <input
              type="text"
              ref="field"
              className="form-control"
              defaultValue={this.props.data.url}
              onBlur={this.updateResource.bind(this, {type: 'video', currentIndex: this.props.dataId})}
              placeholder="https://www.youtube.com/embed/azxoVRTwlNg">
            </input>
          </div>
        );
      } else {
        field = <div className={'fluid-width-video-wrapper asset-size-' + this.props.data.layout}><iframe src={this.props.data.url}></iframe></div>;
      }
    } else if('giphy' == this.props.data.type) {
      field = <Giphy
        data={this.props.data}
        ref="field"
        dataId={this.props.dataId}
        edit={this.state.edit}
        addImageCaption={this.props.addImageCaption}
        updateResource={this.updateResource.bind(this)}
      />;
    } else if ('infogram' == this.props.data.type || 'datawrapper' == this.props.data.type){
      field = <Chart
        data={this.props.data}
        ref="field"
        edit={this.state.edit}
        dataId={this.props.dataId}
        addImageCaption={this.props.addImageCaption.bind(this)}
        updateResource={this.updateResource.bind(this)}
      />;
    } else if('richContent' == this.props.data.type) {
      field = (
        <div>
          <label className="ptitle">
            Rich content snippet <span className="hint">(You can use HTML, CSS and Javascript here)</span>
          </label>
          <div
            id={this.props.index}
            className="form-control"
            ref="field"
            contentEditable="true"
            onBlur = {this.props.updateRichContent.bind(this, this.props.dataId)}
          >
            {this.props.data.text}
          </div>
        </div>
      );
    } else if ('table' == this.props.data.type) {
      field = <Table
        ref="field"
        data={this.props.data}
        dataId={this.props.dataId}
      />;
    }

    switch (this.props.data.type) {
      case 'image':
      case 'video':
      case 'giphy':
      case 'infogram':
      case 'datawrapper':
        editButton = <EditButton
          data={this.props.data}
          dataId={this.props.dataId}
          openResourcePanel={this.props.openResourcePanel.bind(this)}
          editResource={this.editResource.bind(this)}
        />;
        break;
    }

    var minimized = (this.props.orderMode && this.props.minimize) ? 'minimised' : '';
    var backgroundClass = this.props.data.backgroundClass ? this.props.data.backgroundClass : '';
    let foregroundColorClass = '';
    if (this.props.data.foregroundColor == '#FFF') {
      foregroundColorClass = 'module-fg-light';
    } else if (this.props.data.foregroundColor == '#000') {
      foregroundColorClass = 'module-fg-dark';
    }

    return (
      <div className={(this.props.grouped=='true'?'cloumn-content ':'container-ul-inner ')+minimized+' '+backgroundClass+' '+(this.props.data.backgroundFullscreen ? 'fullscreen-background' : '')}
       id={'div-'+this.props.index}
       data-id={this.props.dataId}
       key={this.props.data.key}>
         <div className={(this.props.data.backgroundFade == true ? 'module-bg-fade ':'')+foregroundColorClass}>
           <div className={this.props.data.backgroundFade == true ? 'module-content' : ''}>
           {field}
         </div></div>
         {editButton}
         <PropertyButton
           align={this.props.data.align}
           layout={this.props.data.layout}
           autoplay={this.props.data.autoplay}
           setAutoPlaySlider={this.props.setAutoPlaySlider}
           addBackgroundOptionToResource={this.props.addBackgroundOptionToResource}
           openResourcePanel={this.props.openResourcePanel}
           deleteResource={this.props.deleteResource}
           data={this.props.data}
           dataId={this.props.dataId}
           addLayoutToResource={this.props.addLayoutToResource}
           ungroupSections={this.props.ungroupSections}
           grouped={this.props.grouped}
         />
      </div>
    );
  }
}

export default Content;
