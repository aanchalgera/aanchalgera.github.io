import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createMarkdownPlugin from 'draft-js-markdown-plugin';

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

import configParams from 'config/configs';
import StrikeThrough from './StrikeButton';

export const plugins = () => {
  const linkPlugin = createLinkPlugin({
    placeholder: 'http://…'
  });
  let inlineToolbarPlugin = createInlineToolbarPlugin({
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
  if (configParams.version > 1) {
    inlineToolbarPlugin = createInlineToolbarPlugin({
      structure: [
        BoldButton,
        ItalicButton,
        StrikeThrough,
        HeadlineTwoButton,
        HeadlineThreeButton,
        BlockquoteButton,
        UnorderedListButton,
        OrderedListButton,
        linkPlugin.LinkButton
      ]
    });
  }
  const mdPlugin = createMarkdownPlugin();
  return [mdPlugin, inlineToolbarPlugin, linkPlugin];
};
