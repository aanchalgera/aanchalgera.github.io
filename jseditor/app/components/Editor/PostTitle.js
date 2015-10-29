import React from 'react';
import PropertyButtonContent from './PropertyButtonContent';

class PostTitle extends React.Component{
  constructor(props){
    super(props);
    this.state = {box : 'close'};
  }

  toggleBox() {
    this.setState({box:this.state.box=='open' ? 'close' : 'open'});
  }
  closeBox() {
    this.setState({box:'close'});
  }
  getStyle(data) {
    var backgroundImage = data.backgroundImage ? "url('"+data.backgroundImage+"')" : '';
    var divStyle = {
      color: data.foregroundColor,
      backgroundImage: backgroundImage
    };
    return divStyle;
  }
  render(){
    var closeStyle='', expandStyle = '', selected='';
    if (this.state.box == 'open') {
      closeStyle = {display : 'none'}
      expandStyle = {display : 'block'}
      selected="selected";
    } else {
      closeStyle = {display : 'block'}
      expandStyle = {display : 'none'}
    }
    var backgroundClass = this.props.title?(this.props.title.backgroundClass ? this.props.title.backgroundClass : '') : '';
    return (
      <div className="col-sm-12 marbot50 input-title">
        <div data-id='title' style={this.getStyle(this.props.title)} className={"properties " + backgroundClass}>
          <ul className="nav-pills2"><li>
            <button onClick={this.toggleBox.bind(this)} type="button" className="btn btn-default glyphicon glyphicon-cog"></button>
          </li></ul>
          <span className="properties-container js-properties-container" style={expandStyle} onMouseLeave={this.closeBox.bind(this)}>
            <PropertyButtonContent
              addBackgroundOptionToResource={this.props.addBackgroundOptionToResource}
              data={this.props.title}
              openResourcePanel={this.props.openResourcePanel}
            />
          </span>
        </div>
        <input type="text" className="form-control" value={this.props.title.text} onChange={this.props.handleChange.bind(this)} onBlur={this.props.handleBlur.bind(this)} />
      </div>
    );
  }
}

export default PostTitle;
