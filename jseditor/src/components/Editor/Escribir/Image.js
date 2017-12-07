import * as React from 'react';

type Props = {
  alt: string,
  url: string
};

type State = {};

export class Image extends React.Component<Props, State> {
  handleDelete = () => {};

  handleEdit = () => {};

  getToolBar = () => {};

  render() {
    const { alt, url } = this.props;

    return <img src={url} alt={alt} />;
  }
}
