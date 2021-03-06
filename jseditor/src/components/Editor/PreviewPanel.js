import React from 'react';

export default class PreviewPanel extends React.Component {
  closePanel(event) {
    event.preventDefault();
    this.refs.previewPanel.style.display = 'none';
  }

  render () {
    return (
      <div className="modal fade" ref="previewPanel" id="previewPanel" tabIndex="-1" role="dialog" aria-labelledby="myPreviewLabel" style={{display:'none'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" id="close-preview" onClick={this.closePanel.bind(this)} className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title" id="myPreviewLabel">Preview</h4>
            </div>
            <div className="modal-body">
              <iframe
                src={configParams.host+ '/posts/' + this.props.src}
                allowFullScreen="true"
                width="1080"
                height="500"
                frameBorder="0"
                allowTransparency="true">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
