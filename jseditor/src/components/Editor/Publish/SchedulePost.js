// @flow
import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import Apps from 'material-ui/svg-icons/navigation/apps';

import Scheduler from './Scheduler';
import { InputEvent } from 'lib/flowTypes';

type Props = {
  base: Object,
  date: string,
  updateParent: (data: Object) => void,
  showCalendar?: boolean,
  date: string
};

export class SchedulePost extends React.PureComponent {
  state = {
    schedulerOpened: false,
    anchorEl: null,
    focussed: false
  };
  static defaultProps = {
    showCalendar: true
  };
  props: Props;

  onChange = (e: InputEvent) => {
    const dateString = e.currentTarget.value;
    this.props.updateParent({ publishedDate: dateString });
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

  onFocus = () => {
    this.setState({
      focussed: true
    });
  };

  onBlur = () => {
    this.setState({
      focussed: false
    });
  };

  render() {
    return [
      <TextField
        className="datepicker"
        floatingLabelText="Fecha y hora"
        value={this.props.date}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        disabled={!this.props.showCalendar}
        key="1"
      />,
      this.props.showCalendar || this.state.focussed ? (
        <RaisedButton
          label={this.state.schedulerOpened ? 'CERRAR' : 'ELEGIR HUECO'}
          icon={<Apps />}
          onClick={this.toggleScheduler}
          key="2"
          className="btn-align"
        />
      ) : (
        ''
      ),
      <Scheduler
        key="3"
        {...this.props}
        schedulerOpened={this.state.schedulerOpened}
        anchorEl={this.state.anchorEl}
        toggleScheduler={this.toggleScheduler}
        onPickSlot={this.onPickSlot}
      />
    ];
  }
}
