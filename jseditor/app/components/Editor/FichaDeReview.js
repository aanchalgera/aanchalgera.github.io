import React from 'react';

export default class FichaDeReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxId: 0,
      positive: props.data.positive || '',
      negative: props.data.negative || '',
      summary: props.data.summary || '',
      totalScore: props.data.totalScore || '',
      calculatePartial: props.data.calculatePartial || false,
      partialScores: props.data.partialScores || [
        [{ value: '', id: '' }, { value: '', id: '' }],
        [{ value: '', id: '' }, { value: '', id: '' }]
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
    let { partialScores } = this.state, count = 0, newScores = [];
    const totalColumns = partialScores[0].length;

    count = this.refs.addNotes.value;
    for (let i = 0; i < count; i++) {
      newScores[i] = [];
      for (let j = 0; j < totalColumns; j++) {
        newScores[i][j] = {value: '', id: ''};
      }
    }
    partialScores.push(...newScores);

    this.update({ partialScores });
  }

  move(e, type, index) {
    e.preventDefault();
    let { partialScores } = this.state;

    switch(type) {
      case 'up':
        partialScores[index - 1] = partialScores.splice(index, 1, partialScores[index - 1])[0];
        break;

      case 'down':
        partialScores[index + 1] = partialScores.splice(index, 1, partialScores[index + 1])[0];
        break;
    }

    this.update({ partialScores });
  }

  delete(e, index) {
    e.preventDefault();
    let { partialScores } = this.state;
    partialScores.splice(index, 1);

    this.update({ partialScores });
  }

  updateCell({rowIndex, columnIndex}, e) {
    e.preventDefault();
    let { partialScores } = this.state;
    partialScores[rowIndex][columnIndex].value = e.target.value;

    this.update({ partialScores });
    this.updateTotalScore();
  }

  calculatePartial(e) {
    this.update({ calculatePartial: e.target.checked });
    this.updateTotalScore();
  }

  getFloat(value) {
    let floatVal = parseFloat(value.replace(',', '.'));
    return isNaN(floatVal) ? 0 : floatVal;
  }

  updateTotalScore() {
    if (this.state.calculatePartial) {
      let { partialScores } = this.state;
      let totalScore = 0, totalRows = partialScores.length;
      for (let i = 0; i < totalRows; i++) {
        totalScore += this.getFloat(partialScores[i][1].value);
      }
      let averageScore = (totalScore / totalRows).toFixed(1);
      this.refs.field.value = averageScore;
    }
    this.update({ totalScore: this.refs.field.value });
  }

  inflate(partialScore, maxId, rowIndex) {
    return partialScore.map((cell, columnIndex) => {
      if (cell.id == '') {
        maxId++;
        cell.id = maxId;
        this.update({ maxId });
      }

      return(
        <td key={cell.id}>
          <input
            type="text"
            defaultValue={cell.value}
            className="form-control"
            onChange={e => this.updateCell({ rowIndex, columnIndex}, e)}
          />
        </td>
      );
    });
  }

  render() {
    const { partialScores, maxId } = this.state;
    const totalRows = partialScores.length;
    const table = (
      partialScores.map((partialScore, i) => {
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
            {this.inflate(partialScore, maxId, i)}
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
                <label htmlFor="exampleInputName2">Total Score:</label>
                <span className="hint"> (Always use a decimal) </span>
                <input
                  type="text"
                  className="form-control"
                  ref="field"
                  placeholder="7,0"
                  style={{width:'50px'}}
                  defaultValue={this.state.totalScore}
                  onChange={() => this.updateTotalScore()}
                />
                <input
                  type="checkbox"
                  checked={this.state.calculatePartial}
                  onChange={e => this.calculatePartial(e)}
                />
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
