global.fetch = require('jest-fetch-mock');
jest.setMock('cross-fetch', global.fetch);
