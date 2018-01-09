import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createMarkdownPlugin from 'draft-js-markdown-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-anchor-plugin/lib/plugin.css';

import createLinkPlugin from 'draft-js-anchor-plugin';
import {
  ItalicButton,
  BoldButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton
} from 'draft-js-buttons';

export const plugins = () => {
  const linkPlugin = createLinkPlugin({
    placeholder: 'http://…'
  });
  const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
      BoldButton,
      ItalicButton,
      HeadlineTwoButton,
      HeadlineThreeButton,
      BlockquoteButton,
      UnorderedListButton,
      OrderedListButton,
      linkPlugin.LinkButton
    ]
  });
  const mdPlugin = createMarkdownPlugin();
  return [mdPlugin, inlineToolbarPlugin, linkPlugin];
};
