// @flow
import moment from 'moment-timezone';
import configParams from 'config/configs.js';

moment.tz.setDefault(configParams.timezone);

export const currentHour = () => {
  return moment()
    .add(1, 'hours')
    .format('DD/MM/YYYY H:00');
};

const currentTime = () => {
  return moment();
};

export const isFuture = (date: string) => {
  return moment(date, 'DD/MM/YYYY H:mm') >= currentTime();
};

export const isValidDate = (date: string) => {
  return moment(date, 'DD/MM/YYYY H:mm', true).isValid();
};
