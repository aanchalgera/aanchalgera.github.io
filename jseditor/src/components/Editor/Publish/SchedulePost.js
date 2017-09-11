import React from 'react';
import moment from 'moment-timezone';
import { TextField, RaisedButton } from 'material-ui';
import Apps from 'material-ui/svg-icons/navigation/apps';
import { Row, Col } from 'react-flexbox-grid';

import configParams from '../../../config/configs';
import Scheduler from './Scheduler';

moment.tz.setDefault(configParams.timezone);

export class SchedulePost extends React.Component {
  /*
  static propTypes = {
    base: PropTypes.object.isRequired,
    onInvalidDate: PropTypes.func.isRequired,
    onSchedule: PropTypes.func.isRequired,
    value: PropTypes.string,
    buttonDisabled: PropTypes.bool
  };
*/
  state = {
    schedulerOpened: false
  };

  onChange = e => {
    this.updateParent({ publishedDate: e.target.value.trim() });
  };

  onPickSlot = (x, y, e) => {
    const currentTarget = e.currentTarget;
    if (['slot-current', 'slot-free'].includes(currentTarget.className)) {
      this.setState({
        schedulerOpened: false
      });
      this.props.updateParent({ publishedDate: currentTarget.dataset.date });
    }
  };

  toggleScheduler = e => {
    this.setState({
      schedulerOpened: !this.state.schedulerOpened,
      anchorEl: e.currentTarget
    });
  };

  onSchedule() {
    const date = moment(this.props.date, 'DD/MM/YYYY HH:mm', true);
    if (!date.isValid() || date.isBefore(moment())) {
      return this.props.onInvalidDate();
    }
    this.props.onSchedule(this.props.date);
  }

  render() {
    return (
      <Row style={{ marginBottom: '0px' }}>
        <Col xs>
          <TextField
            floatingLabelText="Fecha y hora"
            value={this.props.date}
            onChange={this.onChange}
          />
        </Col>
        <Col xs>
          <RaisedButton
            label={this.state.schedulerOpened ? 'CERRAR' : 'ELEGIR HUECO'}
            icon={<Apps />}
            onClick={this.toggleScheduler}
          />
        </Col>
        <Col>
          <RaisedButton
            label="PROGRAMAR"
            disabled={this.props.buttonDisabled}
            onClick={this.onSchedule.bind(this)}
            primary={true}
          />
        </Col>

        <Scheduler
          schedulerOpened={this.state.schedulerOpened}
          base={this.props.base}
          anchorEl={this.state.anchorEl}
          toggleScheduler={this.toggleScheduler}
          onPickSlot={this.onPickSlot}
          date={this.props.date}
        />
      </Row>
    );
  }
}
