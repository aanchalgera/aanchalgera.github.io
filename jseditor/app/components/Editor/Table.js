import React from 'react';
import MoreOptions from './MoreOptions';
import DraftJSEditor from './DraftJSEditor/DraftJSEditor';
import Video from './Video';
import RichContent from './RichContent';
import Summary from './Summary';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.data, {
      rows: props.data.rows || [
        [{ type: 'none' }, { type: 'none' }],
        [{ type: 'none' }, { type: 'none' }]
      ]
    });

    this.addCellContent = this.addCellContent.bind(this);
    this.updateCellContent = this.updateCellContent.bind(this);
  }

  focus() {
    this.refs.field.focus();
  }

  update(params) {
    this.setState(params, () => this.props.update(this.state));
  }

  add(e, type) {
    e.preventDefault();
    let { rows } = this.state, count = 0, newRows;
    const totalColumns = rows[0].length;

    switch(type) {
      case 'column':
        count = this.refs.addColumns.value;
        rows = rows.map(row => {
          for (let i = 0; i < count; i++) {
            row.push({ type: 'none' });
          }
          return row;
        });
        break;

      case 'row':
        newRows = [];
        count = this.refs.addRows.value;
        for (let i = 0; i < count; i++) {
          newRows[i] = [];
          for (let j = 0; j < totalColumns; j++) {
            newRows[i][j] = { type: 'none' };
          }
        }
        rows.push(...newRows);
        break;
    }

    this.update({ rows });
  }

  move(e, type, index) {
    e.preventDefault();
    let { rows } = this.state;

    switch(type) {
      case 'left':
        rows.forEach(row => row[index - 1] = row.splice(index, 1, row[index - 1])[0]);
        break;

      case 'right':
        rows.forEach(row => row[index + 1] = row.splice(index, 1, row[index + 1])[0]);
        break;

      case 'up':
        rows[index - 1] = rows.splice(index, 1, rows[index - 1])[0];
        break;

      case 'down':
        rows[index + 1] = rows.splice(index, 1, rows[index + 1])[0];
        break;
    }

    this.update({ rows });
  }

  delete(e, type, index) {
    e.preventDefault();
    let { rows } = this.state;

    switch(type) {
      case 'column':
        rows.forEach(row => row.splice(index, 1));
        break;

      case 'row':
        rows.splice(index, 1);
        break;
    }

    this.update({ rows });
  }

  addCellContent({ row, column }, type) {
    const { rows } = this.state;
    switch(type) {
      case 'content':
      case 'summary':
      case 'richContent':
        rows[row][column] = { type, text: '' };
        break;
      case 'video':
        rows[row][column] = { type, url: '' };
        break;
    }

    this.update({ rows });
  }

  inflate(row, rowIndex) {
    return row.map((cell, columnIndex) => {
      let Component, dataId = {row: rowIndex, column: columnIndex};
      switch(cell.type) {
        case 'content':
          Component = DraftJSEditor;
          break;
        case 'summary':
          Component = Summary;
          break;
        case 'richContent':
          Component = RichContent;
          break;
        case 'video':
          Component = Video;
          break;

        default:
          return (
            <td key={columnIndex}>
              <MoreOptions
                addTextArea={(dataId, type) => this.addCellContent(dataId, type)}
                openResourcePanel={() => {}}
                addResource={({currentIndex, type}) => this.addCellContent(currentIndex, type)}
                dataId={dataId}
                show2column={false}
                show3column={false}
                showTableButton={false}
              />
            </td>
          );
      }

      return (
        <td key={columnIndex}>
          <Component
            dataId={dataId}
            data={cell}
            value={cell.text}
            updateText={(dataId, text) => this.updateCellContent(dataId, { text })}
            updateVideo={(dataId, url) => this.updateCellContent(dataId, { url })}
          />
        </td>
      );
    });
  }

  updateCellContent({ row, column }, data) {
    const { rows } = this.state;
    Object.assign(rows[row][column], data);
    this.update({ rows });
  }

  render() {
    const { rows } = this.state;
    const totalRows = rows.length, totalColumns = rows[0].length;

    const controls = [<td key="0"></td>];
    for (let i = 0; i < totalColumns; i++) {
      controls.push(
        <td key={i + 1}>
          <div className="btn-group btn-group-xs">
            {
              (i == 0 || totalColumns == 1) ? null :
                <button className="btn btn-default" title="Move column left" onClick={e => this.move(e, 'left', i)}>
                  <span className="glyphicon glyphicon-arrow-left"></span>
                </button>
            }
            {
              (i == totalColumns - 1) ? null :
                <button className="btn btn-default" title="Move column right" onClick={e => this.move(e, 'right', i)}>
                  <span className="glyphicon glyphicon-arrow-right"></span>
                </button>
            }
            {
              (totalColumns == 1) ? null :
                <button className="btn btn-default" title="Delete column" onClick={e => this.delete(e, 'column', i)}>
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
            }
          </div>
        </td>
      );
    }

    const table = (
      <table className="table-data">
        <tbody>
          <tr className="columns-control">{controls}</tr>
          {
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
                          <button className="btn btn-default" title="Delete row" onClick={e => this.delete(e, 'row', i)}>
                            <span className="glyphicon glyphicon-trash"></span>
                          </button>
                      }
                    </div>
                  </td>
                  {this.inflate(row, i)}
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );

    return (
      <div className="table-data-container">
        <div className={'asset-size-' + this.props.data.layout}>
          <div className="form-group">
            <label>Table title</label>
            <span className="hint"> (Optional)</span>
            <input ref="field" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Table summary</label>
            <span className="hint"> (Optional, this field improves accesibility, but not displayed at sight.)</span>
            <textarea className="form-control" />
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
          <div className="table-add-more clearfix add-more-columns">
            <div className="form-group pull-right">
              <label>Add more columns</label>
              <input type="number" ref="addColumns" defaultValue="1" min="1" className="form-control input-sm" />
              <button type="submit" className="btn btn-default btn-sm" onClick={e => this.add(e, 'column')}>
                <span className="glyphicon glyphicon-plus"></span>
              </button>
            </div>
          </div>
          {table}
          <div className="table-add-more clearfix add-more-rows">
            <div className="form-group pull-left">
              <label>Add more rows</label>
              <input type="number" ref="addRows" defaultValue="1" min="1" className="form-control input-sm" />
              <button type="submit" className="btn btn-default btn-sm" onClick={e => this.add(e, 'row')}>
                <span className="glyphicon glyphicon-plus"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}