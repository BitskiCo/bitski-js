/**
 * Automatically handles finalizing the oauth sign in process with the Bitski SDK
 */
function processCallback() {
  if (window.opener) {
    notifyOpener(window.location.href);
  } else if (window.parent && window.parent !== window) {
    notifyParent(window.location.href);
  } else {
    throw new Error('Callback opened on invalid window');
  }
}

/**
 * Extracts query params from the hash of the url
 * @param url the url to parse
 */
function parseUrlParams(url: string): any {
  if (!url.includes('#')) { throw new Error('No params found in result'); }

  const params = url.split('#').pop();

  if (!params) { throw new Error('No params found in result'); }

  return params.split('&').reduce((prev, item) => {
    const [key, value] = item.split('=');
    if (key && value) {
      prev[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return prev;
  }, {});
}

/**
 * Notifies the parent window when in an iframe
 * @param url the url that contains the query params
 */
function notifyParent(url: string): void {
  if (window.parent && window !== window.parent) {
    window.parent.postMessage(url, location.protocol + '//' + location.host);
  } else {
    throw new Error('Could not notify parent');
  }
}

/**
 * Notifies the opener when in a popup
 * @param url the url that contains the query params
 */
function notifyOpener(url: string): void {
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

// Call the callback immediately
try {
  processCallback();
} catch (error) {
  console.error('Error logging in: ' + error); // tslint:disable-line
}
