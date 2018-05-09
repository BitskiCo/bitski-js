import { UserManagerSettings } from 'oidc-client';

/**
 * Settings for configuring Bitski.
 */
export class BitskiProviderSettings implements UserManagerSettings {
  /**
   * OAuth provider URL
   */
  public authority: string;

  /**
   * Your client application's identifier as registered with Bitski.
   */
  /* tslint:disable:variable-name */
  public client_id: string;

  /**
   * The type of response desired from the provider.
   */
  public response_type: string = 'token id_token';

  /**
   * The OAuth scope being requested from Bitski.
   */
  public scope: string = 'openid';

  /**
   * The redirect URI of your client application to receive the OAuth response
   * from the Bitski.
   */
  /* tslint:disable:variable-name */
  public redirect_uri: string;

  /**
   * The post-logout redirect URI.
   */
  /* tslint:disable:variable-name */
  public post_logout_redirect_uri: string;

  /**
   * The URL for the page containing the call to `signinPopupCallback` to
   * handle the callback from Bitski.
   */
  /* tslint:disable:variable-name */
  public popup_redirect_uri: string = this.redirect_uri;

  /**
   * The post-logout redirect URI for the popup method.
   */
  public popup_post_logout_redirect_uri: string = this.popup_post_logout_redirect_uri;

  /**
   * The URL for the page containing the code handling the silent renew.
   */
  public silent_redirect_uri: string = this.silent_redirect_uri;

  /**
   * Flag to indicate if there should be an automatic attempt to renew the
   * access token prior to its expiration. The attempt is made as a result
   * of the `accessTokenExpiring` event being raised.
   */
  public automaticSilentRenew: boolean = true;

  /**
   * Number of milliseconds to wait for the silent renew to return before
   * assuming it has failed or timed out.
   */
  public silentRequestTimeout: number = 10000;

  /**
   * Should OIDC protocol claims be removed from profile.
   */
  public filterProtocolClaims: boolean = true;

  /**
   * Flag to control if additional identity data is loaded from the user
   * info endpoint in order to populate the user's profile.
   */
  public loadUserInfo: boolean = true;

  /**
   * Features used to style and configure the popup window
   */
  public popupWindowFeatures: string = 'location=no,toolbar=no,width=490,height=380,left=100,top=100;';

  /**
   * Flag to control whether or not to include id_token_hint as a parameter when refreshing your access token.
   * id_token_hint is currently not supported by Bitski.
   */
  public includeIdTokenInSilentRenew: boolean = false;

  /**
   * Pre populated metata so that we don't need an extra API call
   */
  public metadata?: { [key: string]: any; };

  /**
   * Create new instance of BitskiProviderSettings
   * @param authority Bitski OAuth URL
   * @param client_id Your application's Bitski client ID
   * @param redirect_uri URL to redirect to after log in
   * @param post_logout_redirect_uri URL to redirect to after log out
   * @param metadata Metadata to use instead of making a request to /.well-known/openid-configuration
   */
  /* tslint:disable:variable-name */
  constructor(authority: string, client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string, metadata?: { [key: string]: any; }) {
    this.authority = authority;
    this.client_id = client_id;

    this.redirect_uri = redirect_uri || window.location.href;
    this.popup_redirect_uri = redirect_uri || window.location.href;
    this.silent_redirect_uri = redirect_uri || window.location.href;

    this.post_logout_redirect_uri = post_logout_redirect_uri || window.location.href;
    this.popup_post_logout_redirect_uri = post_logout_redirect_uri || window.location.href;

    this.metadata = metadata;
  }
}
