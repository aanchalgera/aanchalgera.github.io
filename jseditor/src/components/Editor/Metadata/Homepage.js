import React from 'react';

class Homepage extends React.Component {
  componentDidMount() {
    this._articleMetaPanel.classList.add('collapsed-content');
  }

  render() {
    var image;
    if (
      this.props.homepage.image === '' ||
      this.props.homepage.image === undefined
    ) {
      image = (
        <div className="homepage-image-container">
          <label>Add image</label>
          <button
            className="btn"
            onClick={this.props.openResourcePanel.bind(
              this,
              'homepage',
              'homepage',
              '',
              false
            )}
          >
            Choose from gallery
          </button>
        </div>
      );
    } else {
      image = (
        <div className="homepage-image-container">
          <a href={this.props.homepage.image.url} target="_blank">
            {this.props.homepage.image.name}
          </a>
          <div
            aria-label="Extra-small button group"
            role="group"
            className="btn-group btn-group-xs pull-right"
          >
            <button
              className="btn btn-default"
              type="button"
              title="Change Image"
              onClick={this.props.openResourcePanel.bind(
                this,
                'homepage',
                'homepage',
                '',
                false
              )}
            >
              <span className="glyphicon glyphicon-edit" />
            </button>
            <button
              className="btn btn-default"
              type="button"
              title="Remove Image"
              onClick={this.props.deleteHomepageImage}
            >
              <span className="glyphicon glyphicon-remove" />
            </button>
          </div>
          <img
            alt={this.props.homepage.image.alt}
            src={this.props.homepage.image.url}
          />
        </div>
      );
    }
    return (
      <div className="modules module-home">
        <h4 onClick={this.props.onArticleMetaToggle.bind(this)}>
          Homepage Content
          <span
            className="glyphicon glyphicon-plus pull-right"
            ref={c => (this._glyphiconClass = c)}
          />
        </h4>
        <div ref={c => (this._articleMetaPanel = c)}>
          <div className="form-group">
            {image}
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
