import React, { PureComponent } from 'react';

type Props = {
  label: string
};

export class Label extends PureComponent {
  props: Props;

  render() {
    return <h2 className="type-title-dark">{this.props.label}</h2>;
  }
}
