import React from 'react';

export default class Table extends React.Component {
  focus() {
    const field = this.refs.field;
    if (field) {
      field.focus();
    }
  }

  render() {
    return(
      <div className="table-data-container">
        <div className={'asset-size-' + this.props.data.layout}>
          <div className="form-group">
            <label>Table title</label>
            <span className="hint">(Optional.)</span>
            <input
              type="text"
              className="form-control"
              ref="field"
            />
          </div>
          <div className="form-group">
            <label>Table summary</label>
            <span className="hint">(Optional, this field improves accesibility, but not displayed at sight.)</span>
            <textarea
              className="form-control"
            />
          </div>
          <div className="form-inline">
            <div className="form-group">
              <label>Table cell headers</label>
              <select className="form-control">
                <option value="row-heading">First row for table headings</option>
                <option value="column-heading">First column for table headings</option>
                <option value="row-column-heading">First row and first column for table headings</option>
                <option value="no-heading">No table headings</option>
              </select>
            </div>
          </div>
          <table className="table-data">
            <tbody>
              <tr>
                <td colSpan='3' className="table-add-more">
                  <div className="form-group pull-right">
                    <label>Add more columns</label>
                    <input
                      type="number"
                      className="form-control input-sm"
                    />
                    <button type="submit" className="btn btn-default  btn-sm">
                      <span className="glyphicon glyphicon-plus"></span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan='3' className="table-add-more">
                  <div className="form-group">
                    <label>Add more rows</label>
                    <input
                      type="number"
                      className="form-control input-sm"
                    />
                    <button type="submit" className="btn btn-default  btn-sm">
                      <span className="glyphicon glyphicon-plus"></span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
