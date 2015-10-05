import React, { PropTypes } from 'react'

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
    console.log(this.state.imageList);
    console.log(this.props);
    var images = this.state.imageList.map((image, i) => {
      return (
        <li key={i}>
          <img alt="" src={image.url} />
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
