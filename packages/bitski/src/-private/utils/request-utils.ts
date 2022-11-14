/**
 * Parses a Fetch Response to extract either the result or the error
 * @param response the fetch response to parse
 */
export function parseResponse<T>(response: Response): Promise<T> {
  return response
    .json()
    .catch(() => {
      throw new Error('Invalid JSON response');
    })
    .then((json) => {
      if (response.status >= 200 && response.status < 300) {
        return json as T;
      } else {
        if (json && json.error && json.error.message) {
          throw new Error(json.error.message);
        } else if (json && json.error) {
          throw new Error(json.error);
        } else {
          throw new Error('Unknown error');
        }
      }
    });
}
