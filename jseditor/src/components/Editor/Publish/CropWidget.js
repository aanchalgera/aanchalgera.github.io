import React from 'react';
import ReactCrop from 'react-image-crop';
import RaisedButton from 'material-ui/RaisedButton';
import 'react-image-crop/dist/ReactCrop.css';

const CropWidget = ({ imageSrc, crop, shape, onCropChange, onCropValidate }) => (
  <div>
    <ReactCrop
      src={ imageSrc }
      crop={ crop }
      disabled={ crop.validate }
      keepSelection={true}
      onChange={cropImage => onCropChange(shape, cropImage)}
    />
    {
      crop.validate 
      ? (
        <div>
          <RaisedButton
            label="GUARDADO"
            disabled={true}
          />
          <RaisedButton
            label="EDITAR"
            onClick={e => {
              e.preventDefault();
              onCropValidate(shape, false);
            }}
          />
        </div>
      )
      :  <RaisedButton
          label="VALIDAR"
          onClick={e => {
            e.preventDefault();
            onCropValidate(shape, true);
          }}
        />
    }
  </div>
);

export default CropWidget;
