import { AuthenticationStatus, OAuthSignInMethod } from '../bitski';
import { SignInOptions } from './oauth-manager';
import { User } from './user';

export interface AuthProvider {
    readonly authStatus: AuthenticationStatus;
    signIn(method: OAuthSignInMethod, opts?: SignInOptions): Promise<User>;
    connect(): Promise<User>;
    signInOrConnect(signInMethod?: OAuthSignInMethod, opts?: SignInOptions): Promise<User>;
    getUser(): Promise<User>;
    redirectCallback(): Promise<User>;
    signOut(): Promise<User>;
}
