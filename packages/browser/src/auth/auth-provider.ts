import { User } from 'oidc-client';

export enum OAuthProviderIntegrationType {
    IFRAME,
    REDIRECT,
    POPUP,
    SILENT,
}

export interface AuthProvider {
    signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>;
    getUser(): Promise<User>;
    signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType, url?: string): Promise<User>;
    signOut(): Promise<any>;
    getUserOrSignIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>;
}
