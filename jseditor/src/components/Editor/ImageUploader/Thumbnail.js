import React, { PureComponent } from 'react';

import { InputEvent } from 'lib/flowTypes';

type Props = {
  image: Object,
  handleClick: (e: InputEvent) => void
};

export class Thumbnail extends PureComponent {
  props: Props;

  render() {
    const { image, handleClick } = this.props;

    return (
      <div className="panel-img-container">
        <img
          src={image.thumbnail_url}
          data-src={image.url}
          alt=""
          onClick={handleClick}
        />
      </div>
    );
  }
}
