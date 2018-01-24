import React from 'react';
import { createInlineStyleButton } from 'draft-js-buttons';

export default createInlineStyleButton({
  style: 'STRIKETHROUGH',
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="14"
      viewBox="0 0 17 14"
    >
      <defs>
        <path
          id="toolbar-strike-a"
          d="M22.5333333,31 L26.2666667,31 L26.2666667,28.2 L22.5333333,28.2 L22.5333333,31 L22.5333333,31 Z M17.8666667,17 L17.8666667,19.8 L22.5333333,19.8 L22.5333333,22.6 L26.2666667,22.6 L26.2666667,19.8 L30.9333333,19.8 L30.9333333,17 L17.8666667,17 L17.8666667,17 Z M16,26.3333333 L32.8,26.3333333 L32.8,24.4666667 L16,24.4666667 L16,26.3333333 L16,26.3333333 Z"
        />
      </defs>
      <g transform="translate(-16 -17)">
        <use xlinkHref="#toolbar-strike-a" />
      </g>
    </svg>
  )
});
