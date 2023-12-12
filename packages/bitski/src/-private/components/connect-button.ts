import { SignInOptions, USER_CANCELLED_MESSAGE } from '../auth/oauth-manager';
import type { BitskiSDK } from '../sdk';
import { OAuthSignInMethod } from '../constants';
import type { BitskiProviderShim } from '../../provider-shim';

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
  // Additional sign in options (login_hint, prompt) to call sign in with.
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
  // The actual button element to be created
  public element: HTMLElement;

  // The configured size of the button.
  public size: ConnectButtonSize;

  // The callback for a typical response
  public callback?: (error?: Error, user?: any) => void;

  // Set this directly to handle cancellation
  public onCancel?: () => void;

  private loadSDK: () => Promise<Pick<BitskiSDK, 'signInOrConnect'> | null>;
  private authIntegrationType: OAuthSignInMethod;
  private signInOptions: SignInOptions;

  /**
   * @param authProvider An instance of an AuthProvider to process sign in requests.
   * @param options Optional ConnectButtonOptions to configure your button.
   * @param callback Optional callback to be called after successful or failed log in attempt.
   * You can also set this directly later with the `callback` property.
   */
  constructor(
    loadSDK: () => Promise<Pick<BitskiSDK, 'signInOrConnect'> | null>,
    options?: ConnectButtonOptions,
    callback?: (error?: Error, user?: any) => void,
    private getProvider?: () => BitskiProviderShim,
  ) {
    // Set options to object if undefined
    options = options || {};

    // Configure instance
    this.loadSDK = loadSDK;
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

  private async signin() {
    const sdk = await this.loadSDK();

    if (sdk === null) {
      throw new Error('Bitski SDK is not available');
    }

    try {
      const user = await sdk.signInOrConnect(this.authIntegrationType, this.signInOptions);

      if (this.getProvider) {
        (window as any).ethereum = this.getProvider();
      }

      if (this.callback) {
        this.callback(undefined, user);
      }
    } catch (error) {
      // Check for cancellation
      if (error instanceof Error && error.message === USER_CANCELLED_MESSAGE) {
        // Not a real error, the user just cancelled. Trigger cancellation callback.
        if (this.onCancel) {
          this.onCancel();
        }
      } else if (this.callback) {
        // Real error. Forward to main callback.
        this.callback(error as Error, undefined);
      }
    }
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
