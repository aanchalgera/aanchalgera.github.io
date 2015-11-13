import React from 'react';

class Index extends React.Component{
  componentDidMount() {
    this.initializeEditor();
  }
  initializeEditor() {
    var editor = new SimpleMDE({ element: document.getElementById('index-metadata'),
      spellChecker : false,
      toolbar: ["bold", "italic", "strikethrough", "|", "heading-1", "heading-2", "heading-3", "|", "quote", "ordered-list", "unordered-list", "link"]
    });
    editor.render();
    var updateIndexMetadata = this.props.updateIndexMetadata;
    editor.codemirror.on("blur", function(event){
      updateIndexMetadata(editor.value());
    });
  }
  render () {
    var abc = this.props.index;
    return (
        <div className="modules">
          <h4>Index</h4>
          <div className="form-group">
            <label>Add your html</label>
            <textarea id="index-metadata" defaultValue={abc} className="form-control" />
          </div>
        </div>
    )
  }
}

export default Index;
