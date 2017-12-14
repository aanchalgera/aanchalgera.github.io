/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import markdown from 'marked';
import Editor from 'draft-js-plugins-editor';
import { plugins } from '../Common/DraftJSToolbar';
import { changeContent, changePosition } from 'actions/post';

type Props = {
  text: string,
  index: number,
  changeContent: Function,
  changePosition: Function
};

class Content extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    const contentState = stateFromHTML(markdown(this.props.text));
    this.state = {
      editorState: EditorState.createWithContent(contentState)
    };
  }

  componentDidUpdate() {
    const { editorState } = this.state;
    const currentBlockKey = editorState.getSelection().getStartKey();

    const currentContent = editorState.getCurrentContent();
    const splitPosition = currentContent
      .getBlockMap()
      .keySeq()
      .findIndex(k => k === currentBlockKey);
    const length = currentContent.getBlocksAsArray()[splitPosition].getLength();
    const isAtFirstPosition = length === 0 ? true : false;

    const caretPosition = document.querySelector(
      'span[data-offset-key="' + currentBlockKey + '-0-0"]'
    );
    if (caretPosition) {
      const coordinates = {
        top: caretPosition.offsetTop - caretPosition.offsetHeight,
        left: caretPosition.offsetLeft
      };
      this.props.changePosition(
        this.props.index,
        splitPosition,
        coordinates,
        isAtFirstPosition
      );
    }
  }

  plugins = plugins();
  InlineToolbar = this.plugins[0].InlineToolbar;

  focus() {
    this._editor.focus();
  }

  onChange = editorState => {
    const currentContent = editorState.getCurrentContent();
    this.setState({ editorState }, () => {
      const value = markdown(stateToHTML(currentContent));
      this.props.changeContent(this.props.index, value);
    });
  };

  render() {
    return (
      <div
        onClick={() => this._editor.focus()}
        id={'section-' + this.props.index}
      >
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

export default connect(mapStateToProps, { changeContent, changePosition })(
  Content
);
