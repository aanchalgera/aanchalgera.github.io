import * as React from 'react';
import { connect } from 'react-redux';
import { ImageToolbar } from '.';
import { deleteSection } from 'actions/post';

type Props = {
  alt: string,
  url: string,
  src: string,
  extension: string,
  index: number,
  deleteSection: (index: number) => void
};

const Image = (props: Props) => {
  const handleDelete = () => {
    props.deleteSection(props.index);
  };

  const handleEdit = () => {};

  const { alt, src, extension } = props;
  const url = `${src}/original.${extension}`;
  return (
    <React.Fragment>
      <img src={url} alt={alt} />
      <ImageToolbar handleEdit={handleEdit} handleDelete={handleDelete} />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { deleteSection })(Image);
