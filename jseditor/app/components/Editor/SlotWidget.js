import React, { PropTypes } from 'react';
import moment from 'moment';

var timeStamp = moment().locale('es').format('X');
var nextDayTimeStamp = moment.unix(timeStamp).add(1, 'day').locale('es').format('dddd DD');
var currentMonth = moment().locale('es').format('MMMM');

class SlotWidget extends React.Component {
  openSlotWidget(ev) {
    ev.preventDefault();
    var visible = document.getElementById('publish-slots').style.display;
    document.getElementById('publish-slots').style.display = visible == 'none'? 'block': 'none';
  }  
  render () {
    var tablehead = [];
    var tablerows = [];
    var td = [];
    var tr = '';
    for (var i = 0; i < 7; i++) {
      if (i == 0) {
        var currentDay = moment.unix(timeStamp).locale('es').format('dddd DD')
        tablehead.push(React.createElement('th', {}, React.createElement('strong', {}, "»"+currentDay.toLowerCase())));
      } else {
        var nextDayTimeStamp = moment.unix(timeStamp).add(i, 'day').locale('es').format('dddd DD');
        tablehead.push(React.createElement('th', {}, nextDayTimeStamp.toLowerCase()));
      }
    }
    for (var j = 7; j < 24; j++) {
      for (var k = 0; k < 7; k++) {
        var slot = '';
        var msg = '';
        var dateTime = moment().add(k, 'day').format('YYYY-MM-DD') + ' ' + j + ':00:00';
        var fomattedDateTime = moment(dateTime).format('DD/MM/YYYY HH:mm');
        if (timeStamp > moment(dateTime).format('X')) {
          var slot = 'slot-past';
          var msg = 'Pasado';
        } else if (this.props.futureProgrammedPosts != undefined && this.props.futureProgrammedPosts[dateTime] != undefined) {
          var slot = 'slot-busy';
          var msg = 'Ocupado';
        } else {
          var slot = 'slot-free';
          var msg = 'Libre';
        }
        td.push(React.createElement('td', {}, React.createElement('a', {className: slot,'data-date': fomattedDateTime, href: 'javascript:void(0)', onClick: this.props.onPickSlot.bind(this)}, msg)));
      }
      if (j % 2 == 0) {
        tr = React.createElement('tr', {className: 'even'}, React.createElement('th', {}, j), td);
      } else {
        tr = React.createElement('tr', {}, React.createElement('th', {}, j), td);
      }
      tablerows.push(React.createElement('div',{},tr));
      td = [];
    }
    return(
      <div className="form-group">
        <fieldset className="date-time">
          <legend>Date and time</legend>
          <p className="non-published-state">
            <input type="text" size="20" value={this.props.value} onChange={this.props.onChange.bind(this)} name="postDate" id="publish-date-old" />
            <a className="btn btn-primary" href="#" id="toggle-publish-slots" onClick={this.openSlotWidget.bind(this)}>Select now</a>
            <a className="btn btn-warning" onClick={this.props.onSchedule.bind(this)} href="#" id="schedule-future-top">Schedule</a>
          </p>
          <div className="publish-slots" id="publish-slots" style={{display: 'none'}}>
            <span className="hint">Selecciona un hueco, o pon la fecha que quieras en el cuadro de &lt;em&gt;fecha y hora&lt;/em&gt;</span>
            <table summary="Huecos disponibles para publicar">
              <thead>
                <tr id="table-head">
                  <th><em>{currentMonth.toLowerCase()}</em></th>
                  {tablehead.map(function(result, i) {
                    return result;
                  })}
                </tr>
              </thead>
              <tbody id="table-rows">
                {tablerows.map(function(result, i) {
                  return result;
                })}
              </tbody>
        </table>
        </div>
       </fieldset>
      </div>
    )
  }
}

export default SlotWidget;
