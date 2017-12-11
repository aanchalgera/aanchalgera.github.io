import React, { PureComponent } from 'react';

import { InputEvent, Image } from 'lib/flowTypes';

const thumbnailDimension = 'original';

type Props = {
  image: Image,
  handleClick: (e: InputEvent) => void
};

export function Thumbnail(props: Props) {
  const { image: { src, extension, height, width }, handleClick } = props;

  return (
    <div className="panel-img-container">
      <img
        src={`${src}/${thumbnailDimension}.${extension}`}
        data-src={src}
        data-extension={extension}
        data-height={height}
        data-width={width}
        alt=""
        onClick={handleClick}
      />
    </div>
  );
}
