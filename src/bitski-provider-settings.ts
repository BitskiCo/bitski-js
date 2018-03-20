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
    public clientId: string;

    /**
     * The type of response desired from the provider.
     */
    public responseType: string = 'token id_token';

    /**
     * The OAuth scope being requested from Bitski.
     */
    public scope: string = 'openid';

    /**
     * The redirect URI of your client application to receive the OAuth response
     * from the Bitski.
     */
    public redirectUri: string;

    /**
     * The post-logout redirect URI.
     */
    public postLogoutRedirectUri: string;

    /**
     * The URL for the page containing the call to `signinPopupCallback` to
     * handle the callback from Bitski.
     */
    public popupRedirectUri: string = this.redirectUri;

    /**
     * The post-logout redirect URI for the popup method.
     */
    public popupPostLogoutRedirectUri: string = this.popupPostLogoutRedirectUri;

    /**
     * The URL for the page containing the code handling the silent renew.
     */
    public silentRedirectUri: string = this.silentRedirectUri;

    /**
     * Flag to indicate if there should be an automatic attempt to renew the
     * access token prior to its expiration. The attempt is made as a result
     * of the `accessTokenExpiring` event being raised.
     */
    public automaticSilentRenew: boolean =  true;

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
    public loadUserInfo: boolean =  true;

    /**
     * Features used to style and configure the popup window
     */
    public popupWindowFeatures: string = 'location=no,toolbar=no,width=360,height=340,left=100,top=100;';

    /**
     * Create new instance of BitskiProviderSettings
     * @param authority Bitski OAuth URL
     * @param clientId Your application's Bitski client ID
     * @param redirectUri URL to redirect to after log in
     * @param postLogoutRedirectUri URL to redirect to after log out
     */
    constructor(authority: string, clientId: string, redirectUri?: string, postLogoutRedirectUri?: string) {
        this.authority = authority;
        this.clientId = clientId;

        this.redirectUri = redirectUri || window.location.href;
        this.popupRedirectUri = redirectUri || window.location.href;
        this.silentRedirectUri = redirectUri || window.location.href;

        this.postLogoutRedirectUri = postLogoutRedirectUri || window.location.href;
        this.popupPostLogoutRedirectUri = postLogoutRedirectUri || window.location.href;
    }
}
