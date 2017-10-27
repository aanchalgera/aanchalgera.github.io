/*@flow*/
import React from 'react';
import ReactCrop from 'react-image-crop';
import RaisedButton from 'material-ui/RaisedButton';
import 'react-image-crop/dist/ReactCrop.css';

type Props = {
  imageSrc: string,
  crop: { validate: boolean },
  shape: string,
  onCropChange: (shape: string, crop: string) => void,
  onCropValidate: (shape: string, validate: boolean) => void
};

const CropWidget = ({
  imageSrc,
  crop,
  shape,
  onCropChange,
  onCropValidate
}: Props) => (
  <div>
    <ReactCrop
      src={imageSrc}
      crop={crop}
      disabled={crop.validate}
      keepSelection={true}
      onChange={cropImage => onCropChange(shape, cropImage)}
    />
    {crop.validate ? (
      <div className="btn-container">
        <RaisedButton label="GUARDADO" disabled={true} />
        <RaisedButton
          label="EDITAR"
          onClick={e => {
            e.preventDefault();
            onCropValidate(shape, false);
          }}
        />
      </div>
    ) : (
      <div className="btn-container">
        <RaisedButton
          label="VALIDAR"
          onClick={e => {
            e.preventDefault();
            onCropValidate(shape, true);
          }}
        />
      </div>
    )}
  </div>
);

export default CropWidget;
