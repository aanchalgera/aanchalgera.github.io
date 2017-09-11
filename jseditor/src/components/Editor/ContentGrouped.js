/* eslint-disable */
import React from 'react';
import Content from './Content';
import PropertyButton from './PropertyButton';

class ContentGrouped extends React.Component {
  componentDidMount() {
    var element = '#div-' + this.props.index;
    document
      .querySelector(element)
      .setAttribute('style', this.props.getStyleText(this.props.data));
    document
      .querySelector(element)
      .classList.add(this.props.data.backgroundClass);
  }

  componentDidUpdate() {
    var element = '#div-' + this.props.index;
    document
      .querySelector(element)
      .setAttribute('style', this.props.getStyleText(this.props.data));
    document
      .querySelector(element)
      .classList.add(this.props.data.backgroundClass);
  }

  render() {
    var groupedClass = 'conatiner-columns-' + this.props.data.length;
    var _this = this;
    var { data, index, ...other } = this.props;
    var fields = data.columns.map(function(field, i) {
      var index = 'text-area' + field.id;
      return (
        <div key={i} className="column-1">
          <Content
            data={field}
            {...other}
            grouped="true"
            index={index}
            dataId={_this.props.dataId + '-' + i}
          />
        </div>
      );
    });

    var minimized =
      this.props.orderMode && this.props.minimize ? 'minimised' : '';
    return (
      <div
        className={
          'container-ul-inner ' +
          groupedClass +
          ' ' +
          minimized +
          ' ' +
          data.backgroundClass +
          ' ' +
          (this.props.data.backgroundFullscreen ? 'fullscreen-background' : '')
        }
        id={'div-' + index}
        data-id={this.props.dataId}
        key={data.key}
      >
        <div
          className={
            this.props.data.backgroundFade == true ? 'module-bg-fade ' : ''
          }
        >
          <div
            className={
              this.props.data.backgroundFade == true ? 'module-content' : ''
            }
          >
            {fields}
          </div>
        </div>
        <PropertyButton
          align={data.align}
          layout={data.layout}
          addBackgroundOptionToResource={
            this.props.addBackgroundOptionToResource
          }
          openResourcePanel={this.props.openResourcePanel}
          deleteResource={this.props.deleteResource}
          data={data}
          dataId={this.props.dataId}
          addLayoutToResource={this.props.addLayoutToResource}
          addGroupToResource={this.props.addGroupToResource}
          groupSections={this.props.groupSections}
          ungroupSections={this.props.ungroupSections}
          updateResource={this.props.updateResource}
          toggleSummarySocialShareButtons={
            this.props.toggleSummarySocialShareButtons
          }
        />
      </div>
    );
  }
}

export default ContentGrouped;
