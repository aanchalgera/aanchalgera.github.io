import React from 'react';
import { connect } from 'react-redux';
import { EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import markdown from 'marked';
import Editor from 'draft-js-plugins-editor';
import { plugins } from '../Common/DraftJSToolbar';
import { changeContent, changePosition } from 'actions/post';

type Props = {
  text: string,
  id: number,
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
    const selectionState = editorState.getSelection();
    if (selectionState.getHasFocus()) {
      const currentBlockKey = selectionState.getStartKey();
      const currentContent = editorState.getCurrentContent();
      const splitPosition = currentContent
        .getBlockMap()
        ._map.get(currentBlockKey);
      const length = currentContent.getBlockForKey(currentBlockKey).getLength();
      const isAtFirstPosition = length === 0 ? true : false;

      const caretPosition = document.querySelector(
        '#section-' +
          this.props.index +
          ' span[data-offset-key="' +
          currentBlockKey +
          '-0-0"]'
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
  }

  plugins = plugins();
  InlineToolbar = this.plugins[0].InlineToolbar;

  focus() {
    this._editor.focus();
  }

  onChange = editorState => {
    const currentContentState = this.state.editorState.getCurrentContent();
    const newContentState = editorState.getCurrentContent();
    if (currentContentState !== newContentState) {
      const value = markdown(stateToHTML(newContentState));
      this.props.changeContent(this.props.index, value);
    }
    this.setState({ editorState });
  };

  getVariables() {
    const { id, text } = this.props;
    const placeHolder = id === 1 ? 'Empieza a escribir aquí...' : '';
    const className =
      id === 1 && (text === '<p><br></p>' || text === '')
        ? 'first-paragraph'
        : 'paragraph';

    return { placeHolder, className };
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    const { placeHolder, className } = this.getVariables();
    return (
      <div
        id={'section-' + this.props.index}
        onClick={() => this._editor.focus()}
        className={className}
      >
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={this.plugins}
          ref={element => {
            this._editor = element;
          }}
          stripPastedStyles
          placeholder={placeHolder}
          handleKeyCommand={this.handleKeyCommand}
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
