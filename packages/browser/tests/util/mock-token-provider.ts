import { AccessTokenProvider } from 'bitski-provider';

export class MockTokenProvider implements AccessTokenProvider {

  public loggedIn: boolean = true;

  public getAccessToken(): Promise<string> {
    if (this.loggedIn) {
      return Promise.resolve('test-token');
    }
    return Promise.reject(new Error('Not logged in'));
  }

  public invalidateToken(): Promise<void> {
    this.loggedIn = false;
    return Promise.resolve();
  }

}
