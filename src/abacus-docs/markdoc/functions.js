// @flow

export const upper = {
  transform(parameters: $FlowFixMe): $FlowFixMe {
    const string = parameters[0];

    return typeof string === 'string' ? string.toUpperCase() : string;
  },
};
