import { AuthProvider } from '../auth/auth-provider';
import { OAuthSignInMethod, SignInOptions } from '../bitski';

/**
 * Sizing options for the Bitski connect button.
 */
export enum ConnectButtonSize {
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE',
}

/**
 * Options for the connect button component
 */
export interface ConnectButtonOptions {
  // The auth method to use (popup or redirect). Defaults to popup.
  authMethod?: OAuthSignInMethod;
  // Additional sign in options (login_hint) to call sign in with.
  signInOptions?: SignInOptions;
  // Existing HTML element to embed the Bitski connect button in.
  container?: HTMLElement;
  // The size for the button. Defaults to medium.
  size?: ConnectButtonSize;
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
  private signInOptions: SignInOptions;

  /**
   * @param bitskiInstance An instance of Bitski to sign into
   * @param existingDiv An existing div to turn into a connect button
   */
  constructor(
    authProvider: AuthProvider,
    options?: ConnectButtonOptions,
    callback?: (error?: Error, user?: any) => void,
  ) {
    // Set options to object if undefined
    options = options || {};

    // Configure instance
    this.authProvider = authProvider;
    this.size = options.size || ConnectButtonSize.Medium;
    this.authIntegrationType = options.authMethod || OAuthSignInMethod.Popup;
    this.callback = callback;
    this.signInOptions = options.signInOptions || {};

    // Create the element
    this.element = document.createElement('button');
    this.configureElement();
    this.element.addEventListener('click', this.signin.bind(this));

    // Embed if needed
    if (options.container) {
      options.container.appendChild(this.element);
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
    this.authProvider.signInOrConnect(this.authIntegrationType, this.signInOptions).then((user) => {
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
