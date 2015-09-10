import React from 'react';
import Thumbnail from './Thumbnail';

class ResourcePanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      imageList: []
    };
  }
  componentWillReceiveProps(nextProps){
    if (this.props.images.length > 0) {
      if (nextProps.images.length > 0) {
        this.setState({imageList: nextProps.images})
      } else {
        this.setState({imageList: this.props.images})
      }
    }
  }
  closePanel(event) {
    event.preventDefault();
    document.getElementById('resourcePanel').style.display = 'none';
  }
  render () {
    var images = [];
    var images = this.state.imageList.map((data, i) => {
      return (
        <Thumbnail
          key={data.public_id}
          data={data}
          addImage={this.props.addImage}
        />
      )
    });
    return (
      <div className="modal fade" id="resourcePanel" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{display: "none"}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" id="closePanel" onClick={this.closePanel.bind(this)} className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 className="modal-title" id="myModalLabel">Resources</h4>
            </div>
            <div className="modal-body">
             <div className="resources-panel-images">
               <ul>{images}</ul>
             </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default ResourcePanel;
