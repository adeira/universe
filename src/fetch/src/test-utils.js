// @flow

/* eslint-disable import/no-extraneous-dependencies */

import { setupServer, type Server } from 'msw/node';

export { rest } from 'msw';

export const server: Server = setupServer();
