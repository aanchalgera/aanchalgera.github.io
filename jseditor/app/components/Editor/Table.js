import React from 'react';
import MoreOptions from './MoreOptions';
import DraftJSEditor from './DraftJSEditor/DraftJSEditor';
import Image from './Image';
import Video from './Video';
import RichContent from './RichContent';
import Summary from './Summary';
import Gallery from './Gallery';
import Slider from './Slider';
import Giphy from './Giphy';
import Chart from './Chart';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.data.title || '',
      summary: props.data.summary || '',
      headers: props.data.headers || '',
      rows: props.data.rows || [
        [{ type: 'none' }, { type: 'none' }],
        [{ type: 'none' }, { type: 'none' }]
      ],
      useEqualWidth: props.data.useEqualWidth || false
    };
  }

  componentDidMount() {
    this.props.update(this.state);
  }

  componentWillReceiveProps(nextProps) {
    const { useEqualWidth } = nextProps.data;
    if (useEqualWidth != this.state.useEqualWidth) {
      this.setState({ useEqualWidth });
    }
  }

  focus() {
    this.refs.title.focus();
  }

  update(params) {
    this.setState(params, () => {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(() => {
        this.props.update(this.state);
      }, 1000);
    });
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

  clearCell(e, {rowIndex, columnIndex}) {
    let { rows } = this.state;
    rows[rowIndex][columnIndex] = { type: 'none' };
    this.update({ rows });
  }

  inflate(row, rowIndex) {
    return row.map((cell, columnIndex) => {
      let Component, dataId = `${this.props.dataId}#${rowIndex}-${columnIndex}`;
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
        case 'image':
          Component = Image;
          break;
        case 'gallery':
          Component = Gallery;
          break;
        case 'slider':
          Component = Slider;
          break;
        case 'giphy':
          Component = Giphy;
          break;
        case 'infogram':
        case 'datawrapper':
          Component = Chart;
          break;

        default:
          return (
            <td key={columnIndex}>
              <MoreOptions
                addResource={this.props.addResource}
                addTextArea={this.props.addTextArea}
                dataId={dataId}
                openResourcePanel={this.props.openResourcePanel}
                show2column={false}
                show3column={false}
                showTableButton={false}
                showReviewButton={false}
              />
            </td>
          );
      }

      return (
        <td key={cell.id ? cell.id : columnIndex}>
          {
            this.props.edit ?
              <div className="btn-group btn-group-xs cells-control">
                <button className="btn btn-default" title="Delete cell data" onClick={e => this.clearCell(e, {rowIndex, columnIndex})}>
                  <span aria-hidden="true" className="glyphicon glyphicon-pencil"></span>
                </button>
              </div>
            : null
          }
          <Component
            dataId={dataId}
            data={cell}
            value={cell.text}
            updateResource={this.props.updateResource}
            openResourcePanel={this.props.openResourcePanel}
            addImageCaption={this.props.addImageCaption}
            deleteImage={this.props.deleteImage}
            moveImage={this.props.moveImage}
            addImageCaptionOverlay={this.props.addImageCaptionOverlay}
            addImageCaptionOverlayPosition={this.props.addImageCaptionOverlayPosition}
            addImageCaptionOverlayBackground={this.props.addImageCaptionOverlayBackground}
          />
        </td>
      );
    });
  }

  render() {
    const { rows } = this.state;
    const totalRows = rows.length, totalColumns = rows[0].length;

    const controls = [<td key="0" className="cell-empty"></td>];
    for (let index = 0; index < totalColumns; index++) {
      controls.push(
        <td key={index + 1}>
          <div className="btn-group btn-group-xs">
            {
              (index == 0 || totalColumns == 1) ? null :
                <button className="btn btn-default" title="Move column left" onClick={e => this.move(e, 'left', index)}>
                  <span className="glyphicon glyphicon-arrow-left"></span>
                </button>
            }
            {
              (index == totalColumns - 1) ? null :
                <button className="btn btn-default" title="Move column right" onClick={e => this.move(e, 'right', index)}>
                  <span className="glyphicon glyphicon-arrow-right"></span>
                </button>
            }
            {
              (totalColumns == 1) ? null :
                <button className="btn btn-default" title="Delete column" onClick={e => this.delete(e, 'column', index)}>
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
          {this.props.edit ? <tr className="columns-control">{controls}</tr> : null}
          {
            rows.map((row, index) => {
              return (
                <tr key={index}>
                  {
                    this.props.edit ?
                      <td className="rows-control">
                        <div className="btn-group btn-group-xs btn-group-vertical">
                          {
                            (index == 0 || totalRows == 1) ? null :
                              <button className="btn btn-default" title="Move row up" onClick={e => this.move(e, 'up', index)}>
                                <span className="glyphicon glyphicon-arrow-up"></span>
                              </button>
                          }
                          {
                            (index == totalRows - 1) ? null :
                              <button className="btn btn-default" title="Move row down" onClick={e => this.move(e, 'down', index)}>
                                <span className="glyphicon glyphicon-arrow-down"></span>
                              </button>
                          }
                          {
                            (totalRows == 1) ? null :
                              <button className="btn btn-default" title="Delete row" onClick={e => this.delete(e, 'row', index)}>
                                <span className="glyphicon glyphicon-trash"></span>
                              </button>
                          }
                        </div>
                      </td>
                    : null
                  }
                  {this.inflate(row, index)}
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
            <input
              ref="title"
              type="text"
              className="form-control"
              defaultValue={this.state.title}
              onChange={() => this.update({ title: this.refs.title.value })}
            />
          </div>
          <div className="form-group">
            <label>Table summary</label>
            <span className="hint"> (Optional, this field improves accesibility, but not displayed at sight.)</span>
            <textarea
              ref="summary"
              className="form-control"
              defaultValue={this.state.summary}
              onChange={() => this.update({ summary: this.refs.summary.value })}
            />
          </div>
          <div className="form-inline">
            <div className="form-group">
              <label>Table cell headers</label>
              <select
                ref="headers"
                className="form-control"
                defaultValue={this.state.headers}
                onChange={() => this.update({ headers: this.refs.headers.value })}
              >
                <option value="row">First row for table headings</option>
                <option value="column">First column for table headings</option>
                <option value="both">First row and first column for table headings</option>
                <option value="">No table headings</option>
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
