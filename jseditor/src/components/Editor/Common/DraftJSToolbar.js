import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
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
  const mdPlugin = createMarkdownShortcutsPlugin();
  return [inlineToolbarPlugin, linkPlugin, mdPlugin];
};
