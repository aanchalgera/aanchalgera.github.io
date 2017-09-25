// @flow
import React from 'react';
import moment from 'moment-timezone';
import { TextField, RaisedButton } from 'material-ui';
import Apps from 'material-ui/svg-icons/navigation/apps';
import { Row, Col } from 'react-flexbox-grid';

import configParams from '../../../config/configs';
import Scheduler from './Scheduler';
import { InputEvent } from './lib/flowTypes';

moment.tz.setDefault(configParams.timezone);

type Props = {
  base: Object,
  date: string,
  updateParent: (data: Object) => void,
  showCalendar?: boolean,
  date: string
};

export class SchedulePost extends React.Component {
  state = {
    schedulerOpened: false,
    anchorEl: null
  };
  static defaultProps = {
    showCalendar: true
  };
  props: Props;

  onChange = (e: InputEvent) => {
    const dateString = e.currentTarget.value.trim();
    if (validateDate(dateString)) {
      this.props.updateParent({ publishedDate: dateString });
    } else {
      this.props.updateParent({ isError: true, message: 'Invalid Date' });
    }
  };

  onPickSlot = (x: number, y: number, e: InputEvent) => {
    const currentTarget = e.currentTarget;
    if (['slot-current', 'slot-free'].includes(currentTarget.className)) {
      this.setState({
        schedulerOpened: false
      });
      this.props.updateParent({ publishedDate: currentTarget.dataset.date });
    }
  };

  toggleScheduler = (e: InputEvent) => {
    this.setState({
      schedulerOpened: !this.state.schedulerOpened,
      anchorEl: e.currentTarget
    });
  };

  render() {
    const date = this.props.date || moment().format('DD/MM/YYYY HH:mm');
    return (
      <Row style={{ marginBottom: '0px' }}>
        <Col xs>
          <TextField
            floatingLabelText="Fecha y hora"
            value={date}
            onChange={this.onChange}
          />
        </Col>
        {this.props.showCalendar &&
          <Col xs>
            <RaisedButton
              label={this.state.schedulerOpened ? 'CERRAR' : 'ELEGIR HUECO'}
              icon={<Apps />}
              onClick={this.toggleScheduler}
            />
          </Col>}
        <Scheduler
          {...this.props}
          schedulerOpened={this.state.schedulerOpened}
          anchorEl={this.state.anchorEl}
          toggleScheduler={this.toggleScheduler}
          onPickSlot={this.onPickSlot}
        />
      </Row>
    );
  }
}

const validateDate = (date: string) => {
  if (null === date) {
    return false;
  }
  const dateString = moment(date, 'DD/MM/YYYY H:mm', true);
  if (!dateString.isValid()) {
    return false;
  }
  if (moment(date, 'DD/MM/YYYY H:mm:ss').isBefore(moment())) {
    return false;
  }
  return true;
};
