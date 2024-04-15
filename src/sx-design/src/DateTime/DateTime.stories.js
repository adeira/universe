// @flow

import DateTime from './DateTime';

export default {
  component: DateTime,
  title: 'Components/DateTime',
  tags: ['autodocs'],
};

export const Default = {
  args: {
    value: '2022-04-21T01:00:00Z',
  },
};

export const WithFormatOptions = {
  args: {
    value: '2022-04-21T01:00:00Z',
    formatOptions: {
      weekday: 'long',
      era: 'long',
      year: 'numeric',
      month: 'long',
      timeZoneName: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
};
