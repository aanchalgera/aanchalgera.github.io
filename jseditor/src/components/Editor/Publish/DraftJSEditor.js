import React from 'react';
import { EditorState, CompositeDecorator } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import markdown from 'marked';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import { LinkDecorator } from '../DraftJSEditor/Controls/Link';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];

type Props = {
  value: string,
  minimal?: boolean,
  dataId?: number,
  updateResource: Function
};

export default class DraftJSEditor extends React.Component {
  constructor(props) {
    super(props);
    const decorator = new CompositeDecorator([LinkDecorator]);
    const contentState = stateFromHTML(markdown(this.props.value));
    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator)
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
