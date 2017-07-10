import React from 'react';
import CropWidget from '../components/Editor/Publish/CropWidget';
import { Row, Col } from 'react-flexbox-grid';
import { grey400 } from 'material-ui/styles/colors';

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      square: {
        aspect: 1,
        x: 10,
        height: 100,
        validate: false
      },
      golden: {
        aspect: 1.618,
        y: 5,
        width: 100,
        validate: false
      },
      panoramic: {
        aspect: 2.618,
        y: 20,
        width: 100,
        validate: false
      }
    };

    this.style = {
      img: {
        maxWidth: '100%'
      },
      cropperWidth: {
        width: '85%'
      },
      label: {
        lineHeight: '22px',
        top: '38px',
        transformOrigin: 'left top 0px',
        color: grey400,
      }
    };
  }

  onCropChange(shape, crop) {
    this.setState({
      [shape]: crop
    });
  }

  onCropValidate(shape, validate) {
    this.setState(prevState => {
      prevState[shape]['validate'] = validate;
      return {
        [shape]: prevState[shape]
      };
    });
    this.props.onCropValidate(shape, this.state[shape]);
  }

  render() {
    return (
      <Row>
        <Col xs={3}>
          <p>
            <label style={this.style.label}>Imagen Principal</label>
          </p>
          <div style={this.style.cropperWidth}>
            <img src={this.props.imageSrc} style={this.style.img} />
          </div>
        </Col>
        <Col xs={3}>
          <p>
            <label style={this.style.label}>Recorte para portada móvil, crosspost, instagram</label>
          </p>
          <div style={this.style.cropperWidth}>
            <CropWidget
              imageSrc={this.props.imageSrc}
              crop={this.state.square}
              shape="square"
              onCropChange={this.onCropChange.bind(this)}
              onCropValidate={this.onCropValidate.bind(this)}
            />
          </div>
        </Col>
        <Col xs={3}>
          <p>
            <label style={this.style.label}>Recorte para portada escritorio, Twitter, Facebook</label>
          </p>
          <div style={this.style.cropperWidth}>
            <CropWidget
              imageSrc={this.props.imageSrc}
              crop={this.state.golden}
              shape="golden"
              onCropChange={this.onCropChange.bind(this)}
              onCropValidate={this.onCropValidate.bind(this)}
            />
          </div>
        </Col>
        <Col xs={3}>
          <p>
            <label style={this.style.label}>Recorte para top story, destacados</label>
          </p>
          <div style={this.style.cropperWidth}>
            <CropWidget
              imageSrc={this.props.imageSrc}
              crop={this.state.panoramic}
              shape="panoramic"
              onCropChange={this.onCropChange.bind(this)}
              onCropValidate={this.onCropValidate.bind(this)}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export default ImageCropper;
