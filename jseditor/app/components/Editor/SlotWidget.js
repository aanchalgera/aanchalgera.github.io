import React from 'react';
import moment from 'moment-timezone';

var timeStamp = moment().format('X');
var currentMonth = moment().locale('es').format('MMMM');

class SlotWidget extends React.Component {
  render () {
    var tablehead = [], tablerows = [];
    var td = [];
    var tr = '';
    var slot, msg, dateTime, formattedDateTime;
    for (var i = 0; i < 7; i++) {
      if (i == 0) {
        var currentDay = moment.unix(timeStamp).locale('es').format('dddd DD');
        tablehead.push(<th key={i}><strong>»{currentDay.toLowerCase()}</strong></th>);
      } else {
        var nextDayTimeStamp = moment.unix(timeStamp).add(i, 'day').locale('es').format('dddd DD');
        tablehead.push(<th key={i}>{nextDayTimeStamp.toLowerCase()}</th>);
      }
    }
    for (var j = 7; j < 24; j++) {
      for (var k = 0; k < 7; k++) {
        slot = '';
        msg = '';
        dateTime = moment.unix(timeStamp).add(k, 'day').format('YYYY-MM-DD') + ' ' + j + ':00:00';
        formattedDateTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY') + ' ' + j + ':00';
        if (timeStamp > moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('X')) {
          slot = 'slot-past';
          msg = 'Pasado';
        } else if (this.props.futureProgrammedPosts != undefined && this.props.futureProgrammedPosts[dateTime] != undefined) {
          slot = 'slot-busy';
          msg = 'Ocupado';
        } else {
          slot = 'slot-free';
          msg = 'Libre';
        }
        td.push(
          <td key={j + '-' + k}>
            <a className={slot} data-date={formattedDateTime} href="javascript:void(0)" onClick={this.props.onPickSlot.bind(this)}>
              {msg}
            </a>
          </td>
        );
      }
      if (j % 2 == 0) {
        tr = <tr key={j + '-' + k} className="even"><th>{j}</th>{td}</tr>;
      } else {
        tr = <tr key={j + '-' + k}><th>{j}</th>{td}</tr>;
      }
      tablerows.push(tr);
      td = [];
    }
    return(
      <div className="form-group">
        <fieldset className="date-time">
          <legend>Fecha y hora</legend>
          <p className="non-published-state">
            <input type="text" size="20" value={this.props.value} onChange={this.props.onChange.bind(this)} name="postDate" id="publish-date-old" />
            <a className="btn btn-primary" href="#" id="toggle-publish-slots" onClick={this.props.openSlotWidget.bind(this)}>Select slot</a>
            <button className="btn btn-warning" disabled={this.props.buttonDisabled} id="schedule-future-top" onClick={this.props.onSchedule.bind(this)}>Schedule</button>
          </p>
          <div className="publish-slots" id="publish-slots" style={{display: 'none'}}>
            <span className="hint">Selecciona un hueco, o pon la fecha que quieras en el cuadro de &lt;em&gt;fecha y hora&lt;/em&gt;</span>
            <table summary="Huecos disponibles para publicar">
              <thead>
                <tr id="table-head">
                  <th><em>{currentMonth.toLowerCase()}</em></th>
                  {tablehead}
                </tr>
              </thead>
              <tbody id="table-rows">
                {tablerows}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default SlotWidget;
