import { AuthProvider } from '../auth/auth-provider';
import { OAuthSignInMethod } from '../bitski';

/**
 * Sizing options for the Bitski connect button.
 */
export enum ConnectButtonSize {
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE',
}

/**
 * A button used to connect to Bitski.
 */
export class ConnectButton {
  public element: HTMLElement;
  public size: ConnectButtonSize;
  public callback?: (error?: Error, user?: any) => void;
  private authProvider: AuthProvider;
  private authIntegrationType: OAuthSignInMethod;

  /**
   * @param bitskiInstance An instance of Bitski to sign into
   * @param existingDiv An existing div to turn into a connect button
   */
  constructor(
    authProvider: AuthProvider,
    existingDiv?: HTMLElement,
    size: ConnectButtonSize = ConnectButtonSize.Medium,
    authIntegrationType: OAuthSignInMethod = OAuthSignInMethod.Popup,
    callback?: (error?: Error, user?: any) => void,
  ) {
    this.authProvider = authProvider;
    this.size = size;
    this.authIntegrationType = authIntegrationType;
    this.element = document.createElement('button');
    this.callback = callback;
    this.configureElement();

    this.element.addEventListener('click', this.signin.bind(this));

    if (existingDiv) {
      existingDiv.appendChild(this.element);
    }
  }

  /**
   * Removes the button from the page
   */
  public remove() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

  private signin() {
    this.authProvider.signInOrConnect(this.authIntegrationType).then((user) => {
      if (this.callback) {
        this.callback(undefined, { expired: false });
      }
    }).catch((error: Error) => {
      if (this.callback) {
        this.callback(error, undefined);
      }
    });
  }

  private configureElement() {
    this.element.title = 'Continue with Bitski';
    this.element.innerText = 'Continue with Bitski';
    this.element.className = 'bitski-connect-button';

    let sizeClass = '';
    switch (this.size) {
      case ConnectButtonSize.Small:
        sizeClass = 'size-small';
        break;
      case ConnectButtonSize.Medium:
        sizeClass = 'size-medium';
        break;
      case ConnectButtonSize.Large:
        sizeClass = 'size-large';
        break;
    }
    this.element.classList.add(sizeClass);
  }
}
