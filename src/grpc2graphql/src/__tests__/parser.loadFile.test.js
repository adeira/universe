// @flow

import protobuf from 'protobufjs';

import { loadFile } from '../parser';

jest.mock('protobufjs', () => ({
  load: jest.fn(),
}));

describe('Parser', () => {
  it('format graphql options', async () => {
    protobuf.load.mockImplementationOnce(() => {
      return {
        toJSON: () => ({
          options: {
            '(graphql_field).name': 'greeting',
          },
        }),
      };
    });

    const parsed = await loadFile('some.proto');

    expect(parsed).toEqual({
      options: {
        graphql: {
          name: 'greeting',
        },
      },
    });
  });

  it('format nested graphql options', async () => {
    protobuf.load.mockImplementationOnce(() => {
      return {
        toJSON: () => ({
          message: {
            type: 'string',
            id: 1,
            options: {
              '(graphql_field).name': 'greeting',
            },
          },
        }),
      };
    });

    const parsed = await loadFile('some.proto');

    expect(parsed).toEqual({
      message: {
        type: 'string',
        id: 1,
        options: {
          graphql: {
            name: 'greeting',
          },
        },
      },
    });
  });
});
