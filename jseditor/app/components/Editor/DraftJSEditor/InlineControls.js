import React from 'react';

const CONTROLS = [
  {style: 'BOLD', icon: 'fa-bold', hint: 'Bold (Ctrl-B)'},
  {style: 'ITALIC', icon: 'fa-italic', hint: 'Italic (Ctrl-I)'},
  {style: 'STRIKETHROUGH', icon: 'fa-strikethrough', hint: 'Strike'}
];

export default function InlineControls(props) {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <span>
      {
        CONTROLS.map((control, index) => (
          <a
            key={index}
            title={control.hint}
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
