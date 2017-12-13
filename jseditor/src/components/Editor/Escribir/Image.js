import * as React from 'react';
import { connect } from 'react-redux';

type Props = {
  alt: string,
  url: string,
  src: string,
  extension: string,
  index: number,
  openImageToolbar: (event: SyntheticEvent<HTMLImageElement>) => {}
};

export const Image = ({ alt, src, extension, openImageToolbar }: Props) => {
  const url = `${src}/original.${extension}`;
  return (
    <React.Fragment>
      <img src={url} alt={alt} onClick={openImageToolbar} />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Image);
