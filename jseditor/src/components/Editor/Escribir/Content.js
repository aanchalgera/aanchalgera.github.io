/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { EditorState, getVisibleSelectionRect } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import markdown from 'marked';
import Editor from 'draft-js-plugins-editor';

import { plugins } from '../Common/DraftJSToolbar';
import { changeContent } from 'actions/post';

type Props = {
  text: string,
  index: number,
  changeContent: Function
};

class Content extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    const contentState = stateFromHTML(markdown(this.props.text));
    this.state = {
      editorState: EditorState.createWithContent(contentState)
    };
  }
  plugins = plugins();
  InlineToolbar = this.plugins[0].InlineToolbar;

  focus() {
    this._editor.focus();
  }

  onChange = editorState => {
    const currentBlockKey = editorState.getSelection().getStartKey();
    const currentContent = editorState.getCurrentContent();
    const currentLine = currentContent
      .getBlockMap()
      .keySeq()
      .findIndex(k => k === currentBlockKey);
    const length = currentContent.getBlocksAsArray()[currentLine].getLength();
    const position = getVisibleSelectionRect(window);
    this.setState({ editorState }, () => {
      const value = markdown(stateToHTML(currentContent));
      this.props.changeContent(
        this.props.index,
        value,
        currentLine,
        length,
        position.top
      );
    });
  };

  render() {
    return (
      <div onClick={() => this._editor.focus()}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={this.plugins}
          ref={element => {
            this._editor = element;
          }}
          stripPastedStyles
          placeholder=""
        />
        <this.InlineToolbar />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { changeContent })(Content);
