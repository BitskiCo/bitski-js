import { GlobalWithFetchMock } from 'jest-fetch-mock';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;
jest.setMock('cross-fetch', global.fetch);
jest.setMock('node-fetch', global.fetch);
jest.setMock('whatwg-fetch', global.fetch);
