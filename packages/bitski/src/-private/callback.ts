import { processCallback } from './utils/callback';

// Call the callback immediately
try {
  processCallback();
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('Error logging in: ' + error); // tslint:disable-line
}
