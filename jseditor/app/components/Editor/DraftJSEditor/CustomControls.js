import React from 'react';
import Link from './Controls/Link';

export default function CustomControls(props) {
  return (
    <span>
      <Link
        editorState={props.editorState}
        onToggle={props.onToggle}
      />
    </span>
  );
}
