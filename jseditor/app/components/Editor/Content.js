import React from 'react';
import PropertyButton from './PropertyButton';
import EditButton from './EditButton';
import Image from './Image';
import Gallery from './Gallery';
import Slider from './Slider';
import Giphy from './Giphy';
import Chart from './Chart';
import Table from './Table';
import Video from './Video';
import RichContent from './RichContent';
import FichaDeReview from './FichaDeReview';
import FichaTechnica from './FichaTechnica';
import DraftJSEditor from './DraftJSEditor/DraftJSEditor';

class Content extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
    this.updateResource = this.updateResource.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
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
      case 'fichaReview':
      case 'ficha':
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
      case 'fichaReview':
      case 'ficha':
        document.querySelector('#div-'+this.props.index).setAttribute('style',this.props.getStyleText(this.props.data));
        break;
    }
  }

  toggleEditMode() {
    this.setState({ edit: !this.state.edit });
  }

  getAttributes(type, value) {
    if (type == 'text') {
      return { text: value };
    }
    if ('' != value) {
      let matches;
      if(type == 'giphy') {
        matches = value.match(/(\/\/)?(giphy)\.com.+?([^\/\-]+)$/i);
      } else if(type == 'graph') {
        matches = value.match(/(\/\/)?(infogr\.am|datawrapper)[^\/]*\/([^\/]+).*/i);
      }
      if(matches) {
        let url = '';
        if(matches[1] == '//') {
          url = matches[0];
        } else {
          url = '//' + matches[0];
        }
        let type = matches[2].replace('.', '');
        let attributes = {
          url: url,
          type: type
        };
        attributes[type+'Id'] = matches[3];
        return attributes;
      }
    }
    return {url: value};
  }

  updateResource(currentIndex, type, value) {
    if (this.props.data.type != 'table'){
      this.setState({ edit: false });
    }
    let attributes = this.getAttributes(type, value);
    this.props.updateResource(currentIndex, attributes);
  }

  render () {
    var field;
    let editButton = null;
    if('content' == this.props.data.type) {
      field = (
        <DraftJSEditor
          ref="field"
          value={this.props.data.text}
          updateResource={this.updateResource}
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
            updateResource={this.updateResource}
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
      field = <Video
        data={this.props.data}
        edit={this.state.edit}
        dataId={this.props.dataId}
        updateResource={this.updateResource}
      />;
    } else if('giphy' == this.props.data.type) {
      field = <Giphy
        data={this.props.data}
        ref="field"
        dataId={this.props.dataId}
        edit={this.state.edit}
        addImageCaption={this.props.addImageCaption}
        updateResource={this.updateResource}
      />;
    } else if ('infogram' == this.props.data.type || 'datawrapper' == this.props.data.type){
      field = <Chart
        data={this.props.data}
        ref="field"
        edit={this.state.edit}
        dataId={this.props.dataId}
        addImageCaption={this.props.addImageCaption.bind(this)}
        updateResource={this.updateResource}
      />;
    } else if('richContent' == this.props.data.type) {
      field = <RichContent
        data={this.props.data}
        dataId={this.props.dataId}
        updateResource={this.updateResource}
      />;
    } else if ('table' == this.props.data.type) {
      field = <Table
        addImageCaption={this.props.addImageCaption}
        addImageCaptionOverlay={this.props.addImageCaptionOverlay}
        addImageCaptionOverlayBackground={this.props.addImageCaptionOverlayBackground}
        addImageCaptionOverlayPosition={this.props.addImageCaptionOverlayPosition}
        addResource={this.props.addResource}
        addTextArea={this.props.addTextArea}
        data={this.props.data}
        dataId={this.props.dataId}
        deleteImage={this.props.deleteImage}
        edit={this.state.edit}
        moveImage={this.props.moveImage}
        openResourcePanel={this.props.openResourcePanel}
        ref="field"
        update={content => this.props.updateResource(this.props.dataId, content)}
        updateResource={this.updateResource}
      />;
    } else if ('fichaReview' == this.props.data.type) {
      field = <FichaDeReview
        data={this.props.data}
        dataId={this.props.dataId}
        ref="field"
        update={content => this.props.updateResource(this.props.dataId, content)}
      />;
    } else if ('ficha' == this.props.data.type) {
      field = <FichaTechnica
        data={this.props.data}
        dataId={this.props.dataId}
        ref="field"
        openResourcePanel={this.props.openResourcePanel}
        deleteImage={this.props.deleteImage}
        update={content => this.props.updateResource(this.props.dataId, content)}
      />;
    }

    switch (this.props.data.type) {
      case 'image':
      case 'video':
      case 'giphy':
      case 'infogram':
      case 'datawrapper':
      case 'table':
        editButton = <EditButton
          edit={this.state.edit}
          type={this.props.data.type}
          dataId={this.props.dataId}
          openResourcePanel={this.props.openResourcePanel}
          toggleEditMode={this.toggleEditMode}
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
      <div
        className={(this.props.grouped=='true'?'cloumn-content ':'container-ul-inner ')+minimized+' '+backgroundClass+' '+(this.props.data.backgroundFullscreen ? 'fullscreen-background' : '')}
        id={'div-'+this.props.index}
        data-id={this.props.dataId}
        key={this.props.data.key}
      >
        <div className={(this.props.data.backgroundFade == true ? 'module-bg-fade ':'')+foregroundColorClass}>
          <div className={this.props.data.backgroundFade == true ? 'module-content' : ''}>{field}</div>
        </div>
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
          updateResource={this.props.updateResource}
        />
      </div>
    );
  }
}

export default Content;
