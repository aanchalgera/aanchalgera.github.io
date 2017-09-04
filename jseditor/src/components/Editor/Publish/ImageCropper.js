import React from 'react';
import CropWidget from './CropWidget';
import { Row, Col } from 'react-flexbox-grid';

export type Props = {};

export class ImageCropper extends React.Component {
  style = {
    img: {
      maxWidth: '100%'
    },
    cropperWidth: {
      width: '85%'
    }
  };

  props: Props;

  render() {
    return (
      <Row>
        <Col xs={3}>
          <p>
            <label className="caption-default">Imagen Principal</label>
          </p>
          <div style={this.style.cropperWidth}>
            <img src={this.props.imageSrc} style={this.style.img} alt="" />
          </div>
        </Col>
        <Col xs={3}>
          <p>
            <label style={this.style.label}>
              Recorte para portada móvil, crosspost, instagram
            </label>
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
            <label style={this.style.label}>
              Recorte para portada escritorio, Twitter, Facebook
            </label>
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
            <label style={this.style.label}>
              Recorte para top story, destacados
            </label>
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
