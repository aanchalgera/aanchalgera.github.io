import React, { PropTypes } from 'react';
import ImageCaption from './ImageCaption';

class Gallery extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      imageList: []
    };
  }
  componentDidMount() {
    this.setState({imageList : this.props.data.images})
  }
  render () {
    var images = this.state.imageList.map((image, i) => {
      image.spid = image.public_id+i;
      var imageCaption = image.description != undefined ? image.description : ''
      return (
        <li key={i}>
          <img alt="" id={image.spid} src={image.url} />
          <ImageCaption
            id={image.spid}
            addImageCaption={this.props.addImageCaption.bind(this)}
            fieldId={this.props.dataId}
            imageCaption={imageCaption} />
        </li>
      )
    });
    return (
      <div className="gallery">
        <ul>
          {images}
          <li className="slider-plus"><a href="#" onClick={this.props.openResourcePanel.bind(this,'image', this.props.dataId, true, true)}><span className="glyphicon glyphicon-plus"></span><br />Add more images</a></li>
        </ul>
      </div>
    )
  }
}

export default Gallery;
