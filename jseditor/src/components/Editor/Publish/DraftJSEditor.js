import React from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import Editor from 'draft-js-plugins-editor';
import { plugins } from '../Common/DraftJSToolbar';
const MAX_LENGTH = 240;

type Props = {
  value: string,
  updateResource: Function,
  updateLength: (length: number) => void
};

export default class DraftJSEditor extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    const contentState = stateFromHTML(this.props.value);
    this.state = {
      editorState: EditorState.createWithContent(contentState)
    };
    this.props.updateLength(MAX_LENGTH - this.currentLength());
  }
  plugins = plugins();
  InlineToolbar = this.plugins[1].InlineToolbar;

  focus() {
    this._editor.focus();
  }

  onChange = editorState => {
    this.setState({ editorState }, () => {
      const value = stateToHTML(editorState.getCurrentContent());
      this.props.updateResource(value);
      this.props.updateLength(MAX_LENGTH - this.currentLength());
    });
  };

  _handleBeforeInput = () => {
    const currentContentLength = this.currentLength();

    if (currentContentLength > MAX_LENGTH - 1) {
      console.log('you can type max ' + MAX_LENGTH + ' characters');
      return 'handled';
    }
  };

  _handlePastedText = pastedText => {
    const currentContentLength = this.currentLength();
    if (currentContentLength + pastedText.length > MAX_LENGTH) {
      console.log('you can type max ten characters');
      return 'handled';
    }
  };

  currentLength = () => {
    return this.state.editorState.getCurrentContent().getPlainText('').length;
  };

  render() {
    return (
      <div onClick={() => this._editor.focus()}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleReturn={this._handleBeforeInput}
          handleBeforeInput={this._handleBeforeInput}
          handlePastedText={this._handlePastedText}
          plugins={this.plugins}
          ref={element => {
            this._editor = element;
          }}
          stripPastedStyles
          placeholder="..."
        />
        <this.InlineToolbar />
      </div>
    );
  }
}
