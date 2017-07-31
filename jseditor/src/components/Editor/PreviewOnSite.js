import React from 'react';
import { Link } from 'react-router-dom';

export default function PreviewOnSite(props) {
  return (
    <Link className="glyphicon glyphicon-certificate" target="LFE Preview" to={props.blogUrl + '/preview-longform/' + props.postId}>
      <span>Preview on Site</span>
    </Link>
  );
}
