export interface AccessTokenProvider {
  getAccessToken(): Promise<string>;
  invalidateToken(): Promise<void>;
}
