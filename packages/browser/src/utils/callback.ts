/**
 * Automatically handles finalizing the oauth sign in process with the Bitski SDK
 */
export function processCallback() {
  if (window.opener) {
    notifyOpener(window.location);
  } else {
    throw new Error('Parent window could not be found');
  }
}

/**
 * Notifies the opener when in a popup
 * @param url the url that contains the query params
 */
function notifyOpener(url: Location): void {
  if (window.opener) {
    if (url) {
      // parse url to get state
      const data = parseUrlParams(url);
      if (data.state) {
        const name = `popupCallback_${data.state}`;
        const callback = window.opener[name];
        if (callback) {
          callback(url);
        } else {
          throw new Error('No callback found on opener');
        }
      } else {
        throw new Error('No state found in response');
      }
    }
  } else {
    throw new Error('No window.opener');
  }
}

/**
 * Extracts query params from the hash of the url
 * @param url the url to parse
 */
export function parseUrlParams(url: Location): any {
  let params: string | undefined;

  if (url.href.includes('#')) {
    params = extractQuery(url.hash);
  } else if (url.href.includes('?')) {
    params = url.search.split('?').pop();
  }

  if (!params) { throw new Error('No params found in result'); }

  return params.split('&').reduce((prev, item) => {
    const [key, value] = item.split('=');
    if (key && value) {
      prev[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return prev;
  }, {});
}

function extractQuery(url): string {
  if (!url.includes('#')) { throw new Error('No params found in result'); }
  return url.split('#').pop();
}
