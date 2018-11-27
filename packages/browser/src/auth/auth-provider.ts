import { User } from 'oidc-client';
import { AuthenticationStatus } from '../bitski';

export enum OAuthSignInMethod {
    Redirect = 'REDIRECT',
    Popup = 'POPUP',
    Silent = 'SILENT',
}

export interface AuthProvider {
    getAuthStatus(): Promise<AuthenticationStatus>;
    signIn(method: OAuthSignInMethod, opts?: any): Promise<User>;
    signInOrConnect(signInMethod?: OAuthSignInMethod): Promise<User>;
    getUser(): Promise<User>;
    signInCallback(method: OAuthSignInMethod, url?: string): Promise<User>;
    signOut(): Promise<any>;
}
