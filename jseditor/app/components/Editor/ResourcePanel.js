import React from 'react';
import Thumbnail from './Thumbnail';

class ResourcePanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      imageList: [
        {
          public_id: 1,
          thumbnail_url: 'http://res.cloudinary.com/realarpit/image/upload/c_limit,h_60,w_90/v1441111242/csu1meovl9wjvy9zsxwq.png',
        },
        {
          public_id: 2,
          thumbnail_url: 'http://res.cloudinary.com/realarpit/image/upload/c_limit,h_60,w_90/v1441111242/csu1meovl9wjvy9zsxwq.png',
        },
        {
          public_id: 3,
          thumbnail_url: 'http://res.cloudinary.com/realarpit/image/upload/c_limit,h_60,w_90/v1441111242/csu1meovl9wjvy9zsxwq.png',
        }
      ]
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length > 0) {
      nextProps.data.forEach((value, index) => {
        this.state.imageList.push(value);
      });
      this.setState({
        imageList : this.state.imageList
      });
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
