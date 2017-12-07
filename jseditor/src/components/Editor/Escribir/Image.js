import * as React from 'react';

type Props = {
  alt: string,
  url: string,
  src: string,
  extension: string
};

export class Image extends React.Component<Props> {
  handleDelete = () => {};

  handleEdit = () => {};

  getToolBar = () => {};

  render() {
    const { alt, src, extension } = this.props;
    const url = `${src}/original.${extension}`;
    return <img src={url} alt={alt} />;
  }
}
