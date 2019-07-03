import { ServerError } from 'bitski-provider';
import { ParseError } from '../errors/parse-error';

/**
 * Parses a Fetch Response to extract either the result or the error
 * @param response the fetch response to parse
 */
export function parseResponse<T>(response: Response): Promise<T> {
  return response.json().catch(() => {
    throw ParseError.InvalidJSON();
  }).then((json) => {
    if (response.status >= 200 && response.status < 300) {
      return json as T;
    } else {
      if (json && json.error && json.error.message) {
        throw new ServerError(json.error.message, response.status, response.url);
      } else if (json && json.error) {
        throw new ServerError(json.error, response.status, response.url);
      } else {
        throw ParseError.UnknownError();
      }
    }
  });
}
