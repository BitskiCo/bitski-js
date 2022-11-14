import type { AuthenticationStatus, OAuthSignInMethod } from '../constants';
import type { SignInOptions } from './oauth-manager';
import type { User } from './user';

export interface AuthProvider {
  getAuthStatus(): Promise<AuthenticationStatus>;
  signIn(method: OAuthSignInMethod, opts?: SignInOptions): Promise<User>;
  connect(): Promise<User>;
  signInOrConnect(signInMethod?: OAuthSignInMethod, opts?: SignInOptions): Promise<User>;
  getUser(): Promise<User>;
  redirectCallback(): Promise<User>;
  signOut(): Promise<User>;
}
