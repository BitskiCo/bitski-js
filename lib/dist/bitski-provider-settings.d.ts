import { UserManagerSettings } from 'oidc-client';
/**
 * Settings for configuring Bitski.
 */
export declare class BitskiProviderSettings implements UserManagerSettings {
    /**
     * OAuth provider URL
     */
    authority: string;
    /**
     * Your client application's identifier as registered with Bitski.
     */
    client_id: string;
    /**
     * The type of response desired from the provider.
     */
    response_type: string;
    /**
     * The OAuth scope being requested from Bitski.
     */
    scope: string;
    /**
     * The redirect URI of your client application to receive the OAuth response
     * from the Bitski.
     */
    redirect_uri: string;
    /**
     * The post-logout redirect URI.
     */
    post_logout_redirect_uri: string;
    /**
     * The URL for the page containing the call to `signinPopupCallback` to
     * handle the callback from Bitski.
     */
    popup_redirect_uri: string;
    /**
     * The post-logout redirect URI for the popup method.
     */
    popup_post_logout_redirect_uri: string;
    /**
     * The URL for the page containing the code handling the silent renew.
     */
    silent_redirect_uri: string;
    /**
     * Flag to indicate if there should be an automatic attempt to renew the
     * access token prior to its expiration. The attempt is made as a result
     * of the `accessTokenExpiring` event being raised.
     */
    automaticSilentRenew: boolean;
    /**
     * Number of milliseconds to wait for the silent renew to return before
     * assuming it has failed or timed out.
     */
    silentRequestTimeout: number;
    /**
     * Should OIDC protocol claims be removed from profile.
     */
    filterProtocolClaims: boolean;
    /**
     * Flag to control if additional identity data is loaded from the user
     * info endpoint in order to populate the user's profile.
     */
    loadUserInfo: boolean;
    /**
     * Features used to style and configure the popup window
     */
    popupWindowFeatures: string;
    /**
     * Create new instance of BitskiProviderSettings
     * @param authority Bitski OAuth URL
     * @param client_id Your application's Bitski client ID
     * @param redirect_uri URL to redirect to after log in
     * @param post_logout_redirect_uri URL to redirect to after log out
     */
    constructor(authority: string, client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string);
}
