import React from 'react';

var map = [];

class Content extends React.Component{
  init() {
    this.ref = {
        threshold : 500,
        lastKeypressTime : 0,
        counter: 0
    }
  }
  componentDidMount() {
    this.init();
    this.intializeEditor('text-area');
  }
  intializeEditor(editArea) {
    AlloyEditor.editable(editArea,{
     toolbars : {
       add: {
         buttons: ['table', 'tableColumn', 'quote', 'strike']
       },
       styles : {
         selections: [{
           name: 'text',
           buttons: ['styles', 'bold', 'italic', 'underline', 'link', 'ul', 'ol', 'color'],
           test: AlloyEditor.SelectionTest.text
         }]
       }
     }
    });
  }
  createNewTextArea(event) {
    map[event.keyCode] = event.type == 'keydown';
    if (map[91] && map[13]) {
      this.ref.counter++;
      var editArea = 'text-area' + (this.ref.counter);
      var p = React.createFactory('div');
      var parentDiv = document.getElementById('main-container');
      var nodeToInsertAfter = document.getElementById('text-area');
      var nodeToInsert = document.createElement('p');
      nodeToInsert.setAttribute('className', 'form-control-static');
      nodeToInsert.setAttribute('id', editArea);
      nodeToInsert.textContent = 'Editable content. Editable content. Editable content';
      parentDiv.insertBefore(nodeToInsert, nodeToInsertAfter.nextSibling);
      this.intializeEditor(editArea);
      map = [];
    }
  }
  render(){
    return (
        <div className="col-sm-4 content-area" id="main-container">
          <p id="text-area" className="form-control-static" onKeyDown={this.createNewTextArea.bind(this)}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div id="new-textarea"></div>
        </div>
    )
  }
};

export default Content;
