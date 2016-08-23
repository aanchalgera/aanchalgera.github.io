import React from 'react';

const CONTROLS = [
  {style: 'header-one', icon: 'fa-header fa-header-x fa-header-1'},
  {style: 'header-two', icon: 'fa-header fa-header-x fa-header-2'},
  {style: 'header-three', icon: 'fa-header fa-header-x fa-header-3'},
  {style: 'blockquote', icon: 'fa-quote-left'},
  {style: 'ordered-list-item', icon: 'fa-list-ol'},
  {style: 'unordered-list-item', icon: 'fa-list-ul'}
];

export default function InlineControls(props) {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <span>
      {
        CONTROLS.map((control, index) => (
          <a
            key={index}
            className={'fa ' + control.icon + (control.style == blockType ? ' active' : '')}
            onClick={(e) => {
              e.preventDefault();
              props.onToggle(control.style);
            }}
          >
          </a>
        ))
      }
    </span>
  );
}
