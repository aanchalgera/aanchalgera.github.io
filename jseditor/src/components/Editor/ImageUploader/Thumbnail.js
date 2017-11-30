import React, { PureComponent } from 'react';

import { InputEvent, Image } from 'lib/flowTypes';

type Props = {
  image: Image,
  handleClick: (e: InputEvent) => void
};

export class Thumbnail extends PureComponent {
  props: Props;

  render() {
    const { image: { custom_url }, handleClick } = this.props;

    return (
      <div className="panel-img-container">
        <img
          src={custom_url.replace('image_dimension', '75_75')}
          data-src={custom_url.replace('image_dimension', 'original')}
          alt=""
          onClick={handleClick}
        />
      </div>
    );
  }
}
