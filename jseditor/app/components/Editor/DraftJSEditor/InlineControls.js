import React from 'react';

const CONTROLS = [
  {style: 'BOLD', icon: 'fa-bold'},
  {style: 'ITALIC', icon: 'fa-italic'},
  {style: 'STRIKETHROUGH', icon: 'fa-strikethrough'}
];

export default function InlineControls(props) {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <span>
      {
        CONTROLS.map((control, index) => (
          <a
            key={index}
            className={'fa ' + control.icon + (currentStyle.has(control.style) ? ' active' : '')}
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
