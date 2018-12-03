export interface AccessTokenProvider {
  getAccessToken(): Promise<string>;
}
