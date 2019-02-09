import { AuthenticationStatus, OAuthSignInMethod } from '../bitski';
import { User } from './user';

export interface AuthProvider {
    readonly authStatus: AuthenticationStatus;
    signIn(method: OAuthSignInMethod): Promise<User>;
    connect(): Promise<User>;
    signInOrConnect(signInMethod?: OAuthSignInMethod): Promise<User>;
    getUser(): Promise<User>;
    redirectCallback(): Promise<User>;
    signOut(): Promise<User>;
}
