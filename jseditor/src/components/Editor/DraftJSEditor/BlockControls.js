import React from 'react';

const CONTROLS = [
  {style: 'header-two', icon: 'fa-header fa-header-x fa-header-2', hint: 'H2'},
  {style: 'header-three', icon: 'fa-header fa-header-x fa-header-3', hint: 'H3'},
  {style: 'blockquote', icon: 'fa-quote-left', hint: 'Quote'},
  {style: 'ordered-list-item', icon: 'fa-list-ol', hint: 'Ordered List'},
  {style: 'unordered-list-item', icon: 'fa-list-ul', hint: 'Unordered List'}
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
            title={control.hint}
            className={'fa ' + control.icon + (control.style == blockType ? ' active' : '')}
            onClick={(e) => {
              e.preventDefault();
              props.onToggle('toggleBlockType', control.style);
            }}
          >
          </a>
        ))
      }
    </span>
  );
}
