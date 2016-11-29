import React from 'react';

class Social extends React.Component {
  render () {
    return (
      <div className="modules module-home expandmodule expandmodule9">
        <h4>Twitter and Facebook publishing text <span className="glyphicon glyphicon-plus pull-right"></span></h4>
        <div>
          <div className="form-group">
            <label>Text for twitter</label>
            <textarea className="form-control"></textarea>
          </div>
          <div className="form-group">
            <label>Text for facebook</label>
            <textarea className="form-control"></textarea>
          </div>
        </div>
      </div>
    );
  }
}

export default Social;
