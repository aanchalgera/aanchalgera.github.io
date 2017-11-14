import React, { PureComponent } from 'react';

import { InputEvent } from 'lib/flowTypes';

type Props = {
  src: string,
  handleClick: (e: InputEvent) => void
};

export class Thumbnail extends PureComponent {
  props: Props;

  render() {
    const { src, handleClick } = this.props;

    return (
      <div className="panel-img-container">
        <img src={src} data-src={src} alt="" onClick={handleClick} />
      </div>
    );
  }
}
