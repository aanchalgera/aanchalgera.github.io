// @flow
import moment from 'moment-timezone';
import configParams from 'config/configs.js';

moment.tz.setDefault(configParams.timezone);

export const currentHour = () => {
  return moment()
    .add(1, 'hours')
    .format('DD/MM/YYYY HH:00');
};

export const currentTime = () => {
  return moment().format('DD/MM/YYYY H:mm');
};

export const isFuture = date => {
  return date >= currentTime();
};

export const isValidDate = date => {
  return moment(date, 'DD/MM/YYYY H:mm', true).isValid();
};
