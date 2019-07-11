/**
 * A simple utility class that will check to see if a popup is blocked.
 * Derived from info and examples on this page:
 * https://stackoverflow.com/questions/2914/how-can-i-detect-if-a-browser-is-blocking-a-popup
 */
export class PopupValidator {
  // Will be called if the popup is blocked
  protected errorHandler: () => void;

  constructor(errorHandler: () => void) {
    this.errorHandler = errorHandler;
  }

  // Check a popup window to see if it has been blocked.
  // The error handler will be called asynchronously if
  // the window has been detected to have been blocked.
  public check(popup: Window | null) {
    if (popup) {
      if (/chrome/.test(navigator.userAgent.toLowerCase())) {
        setTimeout(() => {
          this.isPopupBlocked(popup);
        }, 200);
      } else {
        popup.onload = () => {
          this.isPopupBlocked(popup);
        };
      }
    } else {
        this.handleBlocked();
    }
  }

  protected isPopupBlocked(popup: Window) {
    if ((popup.innerHeight > 0) === false) {
      this.handleBlocked();
    }
  }

  protected handleBlocked() {
    this.errorHandler();
  }
}
