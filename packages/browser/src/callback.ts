import { processCallback } from './utils/callback';

// Call the callback immediately
try {
  processCallback();
} catch (error) {
  console.error('Error logging in: ' + error); // tslint:disable-line
}
