import React from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import markdown from 'marked';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
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
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, linkPlugin];

type Props = {
  value: string,
  minimal?: boolean,
  dataId?: number,
  updateResource: Function
};

export default class DraftJSEditor extends React.Component {
  constructor(props) {
    super(props);
    const contentState = stateFromHTML(markdown(this.props.value));
    this.state = {
      editorState: EditorState.createWithContent(contentState)
    };
  }

  props: Props;

  focus() {
    this._editor.focus();
  }

  onChange = editorState => {
    this.setState({ editorState }, () => {
      const value = markdown(stateToHTML(editorState.getCurrentContent()));
      this.props.updateResource(value);
    });
  };

  render() {
    return (
      <div onClick={() => this._editor.focus()}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={element => {
            this._editor = element;
          }}
          stripPastedStyles={true}
          placeholder="..."
        />
        <InlineToolbar />
      </div>
    );
  }
}
