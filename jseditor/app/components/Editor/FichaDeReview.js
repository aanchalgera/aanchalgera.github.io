import React from 'react';

export default class FichaDeReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positive: props.data.positive || '',
      negative: props.data.negative || '',
      summary: props.data.summary || '',
      totalMark: props.data.totalMark || '',
      rows: props.data.rows || [
        [{ value: '' }, { value: '' }],
        [{ value: '' }, { value: '' }]
      ]
    };
  }

  focus() {
    this.refs.field.focus();
  }

  update(params) {
    this.setState(params, () => {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(() => {
        this.props.update(this.state);
      }, 1000);
    });
  }

  add(e) {
    e.preventDefault();
    let { rows } = this.state, count = 0, newRows = [];
    const totalColumns = rows[0].length;

    count = this.refs.addNotes.value;
    for (let i = 0; i < count; i++) {
      newRows[i] = [];
      for (let j = 0; j < totalColumns; j++) {
        newRows[i][j] = {value: ''};
      }
    }
    rows.push(...newRows);

    this.update({ rows });
  }

  move(e, type, index) {
    e.preventDefault();
    let { rows } = this.state;

    switch(type) {
      case 'up':
        rows[index - 1] = rows.splice(index, 1, rows[index - 1])[0];
        break;

      case 'down':
        rows[index + 1] = rows.splice(index, 1, rows[index + 1])[0];
        break;
    }

    this.update({ rows });
  }

  delete(e, index) {
    e.preventDefault();
    let { rows } = this.state;
    rows.splice(index, 1);

    this.update({ rows });
  }

  updateCell({rowIndex, columnIndex}, e) {
    e.preventDefault();
    let { rows } = this.state;
    rows[rowIndex][columnIndex].value = e.target.value;

    this.update({ rows });
  }

  inflate(row, rowIndex) {
    return row.map((cell, columnIndex) => {
      return(
        <td key={columnIndex}>
          <input
            type="text"
            defaultValue={cell.value}
            className="form-control"
            onChange={e => this.updateCell({ rowIndex, columnIndex}, e)} />
        </td>
      );
    });
  }

  render() {
    const { rows } = this.state;
    const totalRows = rows.length;
    const table = (
      rows.map((row, i) => {
        return (
          <tr key={i}>
            <td className="rows-control">
              <div className="btn-group btn-group-xs btn-group-vertical">
                {
                  (i == 0 || totalRows == 1) ? null :
                    <button className="btn btn-default" title="Move row up" onClick={e => this.move(e, 'up', i)}>
                      <span className="glyphicon glyphicon-arrow-up"></span>
                    </button>
                }
                {
                  (i == totalRows - 1) ? null :
                    <button className="btn btn-default" title="Move row down" onClick={e => this.move(e, 'down', i)}>
                      <span className="glyphicon glyphicon-arrow-down"></span>
                    </button>
                }
                {
                  (totalRows == 1) ? null :
                    <button className="btn btn-default" title="Delete row" onClick={e => this.delete(e, i)}>
                      <span className="glyphicon glyphicon-trash"></span>
                    </button>
                }
              </div>
            </td>
            {this.inflate(row, i)}
          </tr>
        );
      })
    );

    return (
      <div>
        <label className="ptitle">Ficha de review</label>
        <div className="table-data-container">
          <div className={'asset-size-' + this.props.data.layout}>
            <div className="form-inline">
              <div className="form-group">
                <label htmlFor="exampleInputName2">Total Mark:</label>
                <span className="hint"> (Always use a decimal) </span>
                <input
                  type="text"
                  className="form-control"
                  ref="field"
                  placeholder="7.0"
                  style={{width:'50px'}}
                  defaultValue={this.state.totalMark}
                  onChange={() => this.update({ totalMark: this.refs.field.value })}
                />
                <input type="checkbox" />
                Calculate partial
              </div>
            </div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th className="cell-empty"></th>
                  <th>Valued aspect</th>
                  <th>Partial note</th>
                </tr>
                {table}
              </tbody>
            </table>
            <div className="table-add-more clearfix add-more-rows">
              <div className="form-group pull-left">
                <label>Add more partial notes</label>
                <input type="number" ref="addNotes" min="1" defaultValue="1" className="form-control input-sm" />
                <button type="submit" className="btn btn-default  btn-sm" onClick={e => this.add(e)}>
                  <span className="glyphicon glyphicon-plus"></span>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Positive </label>
              <span className="hint">(One aspect per line)</span>
              <textarea
                ref="positive"
                className="form-control"
                defaultValue={this.state.positive}
                onChange={() => this.update({ positive: this.refs.positive.value })}
              />
            </div>
            <div className="form-group">
              <label>Negative</label>
              <textarea
                ref="negative"
                className="form-control"
                defaultValue={this.state.negative}
                onChange={() => this.update({ negative: this.refs.negative.value })}
              />
            </div>
            <div className="form-group">
              <label>Summary</label>
              <span className="hint">(Optional, you can use html.)</span>
              <textarea
                ref="summary"
                className="form-control"
                defaultValue={this.state.summary}
                onChange={() => this.update({ summary: this.refs.summary.value })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
