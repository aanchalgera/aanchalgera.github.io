import React from 'react';

class MoreOptions extends React.Component {
  render() {
    const twoColumnButton = (
      <button
        type="button"
        className="btn"
        onClick={() => this.props.groupSections(this.props.dataId, 2)}
        title="2 Columns"
      >
        {' '}
        2 Columns
      </button>
    );
    const threeColumnButton = (
      <button
        type="button"
        className="btn"
        onClick={() => this.props.groupSections(this.props.dataId, 3)}
        title="3 Columns"
      >
        {' '}
        3 Columns
      </button>
    );
    const tableButton = (
      <button
        type="button"
        className="btn fa fa-table"
        onClick={() => this.props.addTable(this.props.dataId)}
        title="Add Tables"
      />
    );
    const fichaDeReviewButton = (
      <button
        type="button"
        className="btn fa fa-star-half-empty"
        onClick={() =>
          this.props.addResource({
            type: 'fichaReview',
            currentIndex: this.props.dataId
          })}
        title="Add Ficha de review"
      />
    );
    const fichaTechnicaButton = (
      <button
        type="button"
        className="btn fa fa-folder-o"
        onClick={() =>
          this.props.addResource({
            type: 'ficha',
            currentIndex: this.props.dataId
          })}
        title="Add Ficha tecnica"
      />
    );
    const textButton = (
      <button
        type="button"
        className="btn glyphicon glyphicon-text"
        onClick={() =>
          this.props.addResource({
            type: 'content',
            currentIndex: this.props.dataId
          })}
        title="Add new section"
      >
        T
      </button>
    );
    const imageButton = (
      <button
        type="button"
        className="btn glyphicon glyphicon-picture"
        onClick={() =>
          this.props.openResourcePanel('image', this.props.dataId, '', false)}
        title="Add Image"
      />
    );
    const summaryButton = (
      <button
        type="button"
        className="btn glyphicon glyphicon-file"
        onClick={() =>
          this.props.addResource({
            type: 'summary',
            currentIndex: this.props.dataId
          })}
        title="Add Summary"
      />
    );
    const videoButton = (
      <button
        type="button"
        className="btn glyphicon glyphicon-facetime-video"
        onClick={() =>
          this.props.addResource({
            type: 'video',
            currentIndex: this.props.dataId
          })}
        title="Add Video"
      />
    );
    const galleryButton = (
      <button
        type="button"
        className="btn glyphicon glyphicon-camera"
        onClick={() =>
          this.props.openResourcePanel(
            'image',
            this.props.dataId,
            'gallery',
            false
          )}
        title="Add Gallery"
      />
    );
    const richContentButton = (
      <button
        type="button"
        className="btn glyphicon glyphicon-console"
        onClick={() =>
          this.props.addResource({
            type: 'richContent',
            currentIndex: this.props.dataId
          })}
        title="Add rich content snippet"
      />
    );
    const sliderButton = (
      <button
        type="button"
        className="btn glyphicon glyphicon-tasks"
        onClick={() =>
          this.props.openResourcePanel(
            'image',
            this.props.dataId,
            'slider',
            false
          )}
        title="Add Slider"
      />
    );
    const gifButton = (
      <button
        type="button"
        className="btn"
        onClick={() =>
          this.props.addResource({
            type: 'giphy',
            currentIndex: this.props.dataId
          })}
        title="Add Giphy content"
      >
        GIF
      </button>
    );
    const infogramButton = (
      <button
        type="button"
        className="btn glyphicon glyphicon-stats"
        onClick={() =>
          this.props.addResource({
            type: 'infogram',
            currentIndex: this.props.dataId
          })}
        title="Add Infogram/Datawrapper content"
      />
    );
    const sectionModuleButton = (
      <button
        type="button"
        className="btn glyphicon glyphicon-flash"
        onClick={() =>
          this.props.addResource({
            type: 'sectionModule',
            currentIndex: this.props.dataId
          })}
        title="Add Section Module"
      />
    );
    return (
      <div className="add-more-options">
        <button
          type="button"
          className="btn glyphicon glyphicon-plus"
          title="Add image, video, slider, new section"
        />
        <span className="add-options">
          {this.props.showTextButton === false ? null : textButton}
          {this.props.showImageButton === false ? null : imageButton}
          {this.props.showSummaryButton === false ? null : summaryButton}
          {this.props.showVideoButton === false ? null : videoButton}
          {this.props.showGalleryButton === false ? null : galleryButton}
          {this.props.showRichContentButton === false
            ? null
            : richContentButton}
          {this.props.showSliderButton === false ? null : sliderButton}
          {this.props.showGifButton === false ? null : gifButton}
          {this.props.showInfogramButton === false ? null : infogramButton}
          {this.props.showTableButton === false ? null : tableButton}
          {this.props.showReviewButton === false ? null : fichaDeReviewButton}
          {this.props.showTechnicaButton === false ? null : fichaTechnicaButton}
          {sectionModuleButton}
          {this.props.show2column ? twoColumnButton : ''}
          {this.props.show3column ? threeColumnButton : ''}
        </span>
        <span className="hint">Add images, video, slider and new section.</span>
      </div>
    );
  }
}

export default MoreOptions;
