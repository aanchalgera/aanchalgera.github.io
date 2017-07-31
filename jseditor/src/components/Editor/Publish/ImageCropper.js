import React from 'react';
import CropWidget from './CropWidget';
import { Row, Col } from 'react-flexbox-grid';
import { grey400 } from 'material-ui/styles/colors';

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);

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
              crop={this.props.crop.square}
              shape="square"
              onCropChange={this.props.onCropChange}
              onCropValidate={this.props.onCropValidate}
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
              crop={this.props.crop.golden}
              shape="golden"
              onCropChange={this.props.onCropChange}
              onCropValidate={this.props.onCropValidate}
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
              crop={this.props.crop.panoramic}
              shape="panoramic"
              onCropChange={this.props.onCropChange}
              onCropValidate={this.props.onCropValidate}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export default ImageCropper;
