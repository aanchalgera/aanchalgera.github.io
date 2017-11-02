/*@flow*/
import React from 'react';
import CropWidget from './CropWidget';
import { Row, Col } from 'react-flexbox-grid';

type Props = {
  imageSrc: string,
  crop: Object,
  onCropChange: (shape: string, crop: string) => void,
  onCropValidate: (shape: string, validate: boolean) => void
};

export class ImageCropper extends React.Component {
  style = {
    img: {
      width: '100%'
    }
  };

  props: Props;

  render() {
    const { crop, ...props } = this.props;
    return (
      <Row>
        <Col sm={3}>
          <p>
            <label className="caption-default">Imagen principal:</label>
          </p>
          <div>
            <img src={props.imageSrc} style={this.style.img} alt="" />
          </div>
        </Col>
        <Col sm={3}>
          <p>
            <label className="caption-default">
              Recorte para portada móvil, crosspost, Instagram:
            </label>
          </p>
          <CropWidget {...props} crop={crop.square} shape="square" />
        </Col>
        <Col sm={3}>
          <p>
            <label className="caption-default">
              Recorte para portada escritorio, Twitter, Facebook:
            </label>
          </p>
          <CropWidget {...props} crop={crop.golden} shape="golden" />
        </Col>
        <Col sm={3}>
          <p>
            <label className="caption-default">
              Recorte para top story, destacados:
            </label>
          </p>
          <CropWidget {...props} crop={crop.panoramic} shape="panoramic" />
        </Col>
      </Row>
    );
  }
}
