import React from 'react';
import { Editor, EditorState, RichUtils, CompositeDecorator } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import markdown from 'marked';
import InlineControls from '../DraftJSEditor/InlineControls';
import BlockControls from '../DraftJSEditor/BlockControls';
import CustomControls from '../DraftJSEditor/CustomControls';
import { LinkDecorator } from '../DraftJSEditor/Controls/Link';

export default class DraftJSEditor extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    minimal: React.PropTypes.bool,
    dataId: React.PropTypes.number,
    updateResource: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([LinkDecorator]);
    const contentState = stateFromHTML(markdown(this.props.value));
    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      const contentState = stateFromHTML(markdown(nextProps.value));
      this.setState({
        editorState: EditorState.createWithContent(contentState, this.decorator)
      });
    }
  }

  focus() {
    this._editor.focus();
  }

  onChange = (editorState) => {
    this.setState({ editorState }, () => {
      const value = markdown(stateToHTML(editorState.getCurrentContent()));
      this.props.updateResource(this.props.dataId, 'text', value);
    });
  }

  onControlToggle = (method, command) => {
    this.onChange(RichUtils[method](this.state.editorState, command));
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  toolBar(editorState) {
    let toolbar = null;
    if (this.props.minimal !== true) {
      toolbar = (
        <div>
          <InlineControls editorState={editorState} onToggle={this.onControlToggle} />
          <i>|</i>
          <BlockControls editorState={editorState} onToggle={this.onControlToggle} />
          <i>|</i>
          <CustomControls editorState={editorState} onToggle={this.onChange} />
        </div>
      );
    }
    return toolbar;
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        {this.toolBar(editorState)}
        <div onClick={() => this._editor.focus()}>
          <Editor
            ref={(c) => this._editor = c}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            stripPastedStyles={true}
          />
        </div>
      </div>
    );
  }
}
