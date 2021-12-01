---
---



#  Bitski.js

## Index

### External modules

* ["browser/src/auth/access-token"](#_browser_src_auth_access_token_)
* ["browser/src/auth/auth-provider"](#_browser_src_auth_auth_provider_)
* ["browser/src/auth/oauth-manager"](#_browser_src_auth_oauth_manager_)
* ["browser/src/auth/openid-auth-provider"](#_browser_src_auth_openid_auth_provider_)
* ["browser/src/auth/popup-handler"](#_browser_src_auth_popup_handler_)
* ["browser/src/auth/token-store"](#_browser_src_auth_token_store_)
* ["browser/src/auth/user"](#_browser_src_auth_user_)
* ["browser/src/auth/user-store"](#_browser_src_auth_user_store_)
* ["browser/src/bitski"](#_browser_src_bitski_)
* ["browser/src/callback"](#_browser_src_callback_)
* ["browser/src/components/connect-button"](#_browser_src_components_connect_button_)
* ["browser/src/components/dialog"](#_browser_src_components_dialog_)
* ["browser/src/constants"](#_browser_src_constants_)
* ["browser/src/errors/authentication-error"](#_browser_src_errors_authentication_error_)
* ["browser/src/errors/parse-error"](#_browser_src_errors_parse_error_)
* ["browser/src/errors/signer-error"](#_browser_src_errors_signer_error_)
* ["browser/src/providers/bitski-browser-engine"](#_browser_src_providers_bitski_browser_engine_)
* ["browser/src/signing/transaction-signer"](#_browser_src_signing_transaction_signer_)
* ["browser/src/subproviders/authenticated-cache"](#_browser_src_subproviders_authenticated_cache_)
* ["browser/src/subproviders/remote-accounts"](#_browser_src_subproviders_remote_accounts_)
* ["browser/src/subproviders/rest-fetch"](#_browser_src_subproviders_rest_fetch_)
* ["browser/src/subproviders/signature"](#_browser_src_subproviders_signature_)
* ["browser/src/utils/localstorage-store"](#_browser_src_utils_localstorage_store_)
* ["browser/src/utils/no-hash-query-string-utils"](#_browser_src_utils_no_hash_query_string_utils_)
* ["browser/src/utils/popup-validator"](#_browser_src_utils_popup_validator_)
* ["browser/src/utils/request-utils"](#_browser_src_utils_request_utils_)
* ["browser/src/utils/store"](#_browser_src_utils_store_)
* ["provider/src/auth/access-token"](#_provider_src_auth_access_token_)
* ["provider/src/auth/access-token-provider"](#_provider_src_auth_access_token_provider_)
* ["provider/src/bitski-engine"](#_provider_src_bitski_engine_)
* ["provider/src/constants"](#_provider_src_constants_)
* ["provider/src/errors/provider-error"](#_provider_src_errors_provider_error_)
* ["provider/src/errors/server-error"](#_provider_src_errors_server_error_)
* ["provider/src/index"](#_provider_src_index_)
* ["provider/src/network"](#_provider_src_network_)
* ["provider/src/subproviders/authenticated-fetch"](#_provider_src_subproviders_authenticated_fetch_)
* ["provider/src/subproviders/nonce-tracker"](#_provider_src_subproviders_nonce_tracker_)
* ["provider/src/subproviders/transaction-validator"](#_provider_src_subproviders_transaction_validator_)
* ["provider/src/subproviders/typed-data"](#_provider_src_subproviders_typed_data_)
* ["provider/src/utils/parse-utils"](#_provider_src_utils_parse_utils_)



---

<a id="_browser_src_auth_access_token_"></a>


<a id="_browser_src_auth_access_token_.accesstoken"></a>

##  AccessToken


<a id="_browser_src_auth_access_token_.accesstoken.constructor"></a>
### constructor
```typescript
new AccessToken(token: string, expiresAt: undefined | number, scope: undefined | string): AccessToken
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| token | `string`   |  the access token |
| expiresAt | `undefined          ⎮number`   |  the token expiration date (in seconds) (optional) |
| scope | `undefined          ⎮string`   |  the scopes this token represents (optional) |



##### Return Value
[AccessToken](#_browser_src_auth_access_token_.accesstoken)





---

### Properties
<a id="_browser_src_auth_access_token_.accesstoken.expiresat"></a>

#### expiresAt
```javascript
var expiresAt: undefined | number
```
<small>*Defined in [packages/browser/src/auth/access-token.ts:44](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/access-token.ts#L44)*</small>


<a id="_browser_src_auth_access_token_.accesstoken.scope"></a>

#### scope
```javascript
var scope: undefined | string
```
<small>*Defined in [packages/browser/src/auth/access-token.ts:49](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/access-token.ts#L49)*</small>


<a id="_browser_src_auth_access_token_.accesstoken.token"></a>

#### token
```javascript
var token: string
```
<small>*Defined in [packages/browser/src/auth/access-token.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/access-token.ts#L39)*</small>




---

<a id="_browser_src_auth_access_token_.accesstoken.expired"></a>

####  expired


```javascript
var expired: 
```
<small>*Defined in [packages/browser/src/auth/access-token.ts:54](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/access-token.ts#L54)*</small>







---

### Methods
<a id="_browser_src_auth_access_token_.accesstoken.tostoragestring"></a>

#### toStorageString




##### Declaration


```typescript
function toStorageString(): string
```
<small>*Defined in [packages/browser/src/auth/access-token.ts:78](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/access-token.ts#L78)*</small>



##### Return Value
`string`







<a id="_browser_src_auth_access_token_.accesstoken.fromstring"></a>

#### fromString




##### Declaration


```typescript
function fromString(s: string): AccessToken | undefined
```
<small>*Defined in [packages/browser/src/auth/access-token.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/access-token.ts#L23)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| s | `string`   |  JSON string representing the token |



##### Return Value
`AccessToken          ⎮undefined`







<a id="_browser_src_auth_access_token_.accesstoken.fromtokenresponse"></a>

#### fromTokenResponse




##### Declaration


```typescript
function fromTokenResponse(tokenResponse: TokenResponse): AccessToken<>
```
<small>*Defined in [packages/browser/src/auth/access-token.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/access-token.ts#L11)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| tokenResponse | `TokenResponse`   |  The token response object to build a token from |



##### Return Value
[AccessToken](#_browser_src_auth_access_token_.accesstoken)









---



---



---

<a id="_browser_src_auth_auth_provider_"></a>


<a id="_browser_src_auth_auth_provider_.authprovider"></a>

####  AuthProvider





### Properties
<a id="_browser_src_auth_auth_provider_.authprovider.authstatus"></a>

#### authStatus
```javascript
var authStatus: AuthenticationStatus
```
<small>*Defined in [packages/browser/src/auth/auth-provider.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/auth-provider.ts#L6)*</small>



### Methods
<a id="_browser_src_auth_auth_provider_.authprovider.connect"></a>

#### connect




##### Declaration


```typescript
function connect(): Promise<User>
```
<small>*Defined in [packages/browser/src/auth/auth-provider.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/auth-provider.ts#L8)*</small>



##### Return Value
`Promise<User>`







<a id="_browser_src_auth_auth_provider_.authprovider.getuser"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [packages/browser/src/auth/auth-provider.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/auth-provider.ts#L10)*</small>



##### Return Value
`Promise<User>`







<a id="_browser_src_auth_auth_provider_.authprovider.redirectcallback"></a>

#### redirectCallback




##### Declaration


```typescript
function redirectCallback(): Promise<User>
```
<small>*Defined in [packages/browser/src/auth/auth-provider.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/auth-provider.ts#L11)*</small>



##### Return Value
`Promise<User>`







<a id="_browser_src_auth_auth_provider_.authprovider.signin"></a>

#### signIn




##### Declaration


```typescript
function signIn(method: OAuthSignInMethod, opts: SignInOptions): Promise<User>
```
<small>*Defined in [packages/browser/src/auth/auth-provider.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/auth-provider.ts#L7)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | [OAuthSignInMethod](#_browser_src_bitski_.oauthsigninmethod)   |  - |
| opts | [SignInOptions](#_browser_src_auth_oauth_manager_.signinoptions)   |  - |



##### Return Value
`Promise<User>`







<a id="_browser_src_auth_auth_provider_.authprovider.signinorconnect"></a>

#### signInOrConnect




##### Declaration


```typescript
function signInOrConnect(signInMethod: OAuthSignInMethod, opts: SignInOptions): Promise<User>
```
<small>*Defined in [packages/browser/src/auth/auth-provider.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/auth-provider.ts#L9)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| signInMethod | [OAuthSignInMethod](#_browser_src_bitski_.oauthsigninmethod)   |  - |
| opts | [SignInOptions](#_browser_src_auth_oauth_manager_.signinoptions)   |  - |



##### Return Value
`Promise<User>`







<a id="_browser_src_auth_auth_provider_.authprovider.signout"></a>

#### signOut




##### Declaration


```typescript
function signOut(): Promise<User>
```
<small>*Defined in [packages/browser/src/auth/auth-provider.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/auth-provider.ts#L12)*</small>



##### Return Value
`Promise<User>`











---

<a id="_browser_src_auth_oauth_manager_"></a>


<a id="_browser_src_auth_oauth_manager_.oauthmanager"></a>

##  OAuthManager


<a id="_browser_src_auth_oauth_manager_.oauthmanager.constructor"></a>
### constructor
```typescript
new OAuthManager(options: OAuthManagerOptions): OAuthManager
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [OAuthManagerOptions](#_browser_src_auth_oauth_manager_.oauthmanageroptions)   |  Settings object |



##### Return Value
[OAuthManager](#_browser_src_auth_oauth_manager_.oauthmanager)





---

### Properties
<a id="_browser_src_auth_oauth_manager_.oauthmanager.configuration"></a>

#### configuration
```javascript
var configuration: AuthorizationServiceConfiguration
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:44](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L44)*</small>




---

### Methods
<a id="_browser_src_auth_oauth_manager_.oauthmanager.redirectcallback"></a>

#### redirectCallback




##### Declaration


```typescript
function redirectCallback(): Promise<TokenResponse>
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:112](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L112)*</small>



##### Return Value
`Promise<TokenResponse>`







<a id="_browser_src_auth_oauth_manager_.oauthmanager.refreshaccesstoken"></a>

#### refreshAccessToken




##### Declaration


```typescript
function refreshAccessToken(refreshToken: string): Promise<TokenResponse>
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:137](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L137)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| refreshToken | `string`   |  The refresh token to use for authorization |



##### Return Value
`Promise<TokenResponse>`







<a id="_browser_src_auth_oauth_manager_.oauthmanager.requestaccesstoken"></a>

#### requestAccessToken




##### Declaration


```typescript
function requestAccessToken(code: string): Promise<TokenResponse>
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:128](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L128)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| code | `string`   |  The authorization code to exchange |



##### Return Value
`Promise<TokenResponse>`







<a id="_browser_src_auth_oauth_manager_.oauthmanager.requestsignout"></a>

#### requestSignOut




##### Declaration


```typescript
function requestSignOut(accessToken: string): Promise<any>
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:146](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L146)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `string`   |  The access token to sign out with |



##### Return Value
`Promise<any>`







<a id="_browser_src_auth_oauth_manager_.oauthmanager.requestuserinfo"></a>

#### requestUserInfo




##### Declaration


```typescript
function requestUserInfo(accessToken: string): Promise<UserInfoResponse>
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:163](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L163)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `string`   |  The access token for the user |



##### Return Value
`Promise<UserInfoResponse>`







<a id="_browser_src_auth_oauth_manager_.oauthmanager.signinpopup"></a>

#### signInPopup




##### Declaration


```typescript
function signInPopup(opts: SignInOptions): Promise<TokenResponse>
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:77](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L77)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| opts | [SignInOptions](#_browser_src_auth_oauth_manager_.signinoptions)   |  - |



##### Return Value
`Promise<TokenResponse>`







<a id="_browser_src_auth_oauth_manager_.oauthmanager.signinredirect"></a>

#### signInRedirect




##### Declaration


```typescript
function signInRedirect(opts: SignInOptions): Promise<AuthorizationResponse>
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:94](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L94)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| opts | [SignInOptions](#_browser_src_auth_oauth_manager_.signinoptions)   |  - |



##### Return Value
`Promise<AuthorizationResponse>`









---



---


<a id="_browser_src_auth_oauth_manager_.oauthmanageroptions"></a>

####  OAuthManagerOptions





### Properties
<a id="_browser_src_auth_oauth_manager_.oauthmanageroptions.additionalscopes"></a>

#### additionalScopes
```javascript
var additionalScopes: string[]
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:28](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L28)*</small>


<a id="_browser_src_auth_oauth_manager_.oauthmanageroptions.clientid"></a>

#### clientId
```javascript
var clientId: string
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L25)*</small>


<a id="_browser_src_auth_oauth_manager_.oauthmanageroptions.configuration-1"></a>

#### configuration
```javascript
var configuration: AuthorizationServiceConfiguration
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:27](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L27)*</small>


<a id="_browser_src_auth_oauth_manager_.oauthmanageroptions.redirecturi"></a>

#### redirectUri
```javascript
var redirectUri: string
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L26)*</small>




<a id="_browser_src_auth_oauth_manager_.signinoptions"></a>

####  SignInOptions





### Properties
<a id="_browser_src_auth_oauth_manager_.signinoptions.login_hint"></a>

#### login_hint
```javascript
var login_hint: undefined | string
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:32](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L32)*</small>





<a id="_browser_src_auth_oauth_manager_.login_hint_signup"></a>

#### «Const» LOGIN_HINT_SIGNUP


```javascript
var LOGIN_HINT_SIGNUP: "signup" = "signup"
```
<small>*Defined in [packages/browser/src/auth/oauth-manager.ts:36](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/oauth-manager.ts#L36)*</small>







---

<a id="_browser_src_auth_openid_auth_provider_"></a>


<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider"></a>

##  OpenidAuthProvider


<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.constructor"></a>
### constructor
```typescript
new OpenidAuthProvider(clientId: string, redirectUri: string, additionalScopes: string[], opts: BitskiSDKOptions): OpenidAuthProvider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |  - |
| redirectUri | `string`   |  - |
| additionalScopes | `string[]`   |  - |
| opts | [BitskiSDKOptions](#_browser_src_bitski_.bitskisdkoptions)   |  - |



##### Return Value
[OpenidAuthProvider](#_browser_src_auth_openid_auth_provider_.openidauthprovider)





---

### Properties
<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.oauthmanager"></a>

#### oauthManager
```javascript
var oauthManager: OAuthManager
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L12)*</small>


<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.signoutcallback"></a>

#### signOutCallback
```javascript
var signOutCallback: undefined | function
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L15)*</small>


<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.tokenstore"></a>

#### tokenStore
```javascript
var tokenStore: TokenStore
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L13)*</small>


<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.userstore"></a>

#### userStore
```javascript
var userStore: UserStore
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L14)*</small>




---

<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.authstatus"></a>

####  authStatus


```javascript
var authStatus: 
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:32](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L32)*</small>







---

### Methods
<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.connect"></a>

#### connect




##### Declaration


```typescript
function connect(): Promise<User>
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:133](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L133)*</small>



##### Return Value
`Promise<User>`







<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.getaccesstoken"></a>

#### getAccessToken




##### Declaration


```typescript
function getAccessToken(): Promise<string>
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L42)*</small>



##### Return Value
`Promise<string>`







<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.getidtoken"></a>

#### getIdToken




##### Declaration


```typescript
function getIdToken(): Promise<string | undefined>
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:52](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L52)*</small>



##### Return Value
`Promise<string          ⎮undefined>`







<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.getrefreshtoken"></a>

#### getRefreshToken




##### Declaration


```typescript
function getRefreshToken(): Promise<string>
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:62](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L62)*</small>



##### Return Value
`Promise<string>`







<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.getuser"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:139](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L139)*</small>



##### Return Value
`Promise<User>`







<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.invalidatetoken"></a>

#### invalidateToken




##### Declaration


```typescript
function invalidateToken(): Promise<void>
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:74](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L74)*</small>



##### Return Value
`Promise<void>`







<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.redirectcallback"></a>

#### redirectCallback




##### Declaration


```typescript
function redirectCallback(): Promise<User>
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:154](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L154)*</small>



##### Return Value
`Promise<User>`







<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.refreshaccesstoken"></a>

#### refreshAccessToken




##### Declaration


```typescript
function refreshAccessToken(): Promise<string>
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:84](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L84)*</small>



##### Return Value
`Promise<string>`







<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.refreshidtoken"></a>

#### refreshIdToken




##### Declaration


```typescript
function refreshIdToken(): Promise<string | undefined>
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:99](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L99)*</small>



##### Return Value
`Promise<string          ⎮undefined>`







<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.signin"></a>

#### signIn




##### Declaration


```typescript
function signIn(method: OAuthSignInMethod, opts: SignInOptions): Promise<User>
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:114](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L114)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | [OAuthSignInMethod](#_browser_src_bitski_.oauthsigninmethod)   |  - |
| opts | [SignInOptions](#_browser_src_auth_oauth_manager_.signinoptions)   |  - |



##### Return Value
`Promise<User>`







<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.signinorconnect"></a>

#### signInOrConnect




##### Declaration


```typescript
function signInOrConnect(signInMethod?: OAuthSignInMethod, opts: SignInOptions): Promise<User>
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:143](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L143)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| signInMethod | [OAuthSignInMethod](#_browser_src_bitski_.oauthsigninmethod)  |  OAuthSignInMethod.Popup |   - |
| opts | [SignInOptions](#_browser_src_auth_oauth_manager_.signinoptions)  | - |   - |



##### Return Value
`Promise<User>`







<a id="_browser_src_auth_openid_auth_provider_.openidauthprovider.signout"></a>

#### signOut




##### Declaration


```typescript
function signOut(): Promise<any>
```
<small>*Defined in [packages/browser/src/auth/openid-auth-provider.ts:161](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/openid-auth-provider.ts#L161)*</small>



##### Return Value
`Promise<any>`









---


### Relationships
##### Implements
* AccessTokenProvider
* [&quot;browser/src/auth/auth-provider&quot;](#_browser_src_auth_auth_provider_).[AuthProvider](#_browser_src_auth_auth_provider_.authprovider)

---



---

<a id="_browser_src_auth_popup_handler_"></a>


<a id="_browser_src_auth_popup_handler_.popupblockederror"></a>

##  PopupBlockedError


<a id="_browser_src_auth_popup_handler_.popupblockederror.constructor"></a>
### constructor
```typescript
new PopupBlockedError(): PopupBlockedError
```
##### Return Value
[PopupBlockedError](#_browser_src_auth_popup_handler_.popupblockederror)





---

### Properties






---

### Methods



---


### Relationships
##### Extends
* AuthorizationError

---

<a id="_browser_src_auth_popup_handler_.popupclosederror"></a>

##  PopupClosedError


<a id="_browser_src_auth_popup_handler_.popupclosederror.constructor-1"></a>
### constructor
```typescript
new PopupClosedError(): PopupClosedError
```
##### Return Value
[PopupClosedError](#_browser_src_auth_popup_handler_.popupclosederror)





---

### Properties






---

### Methods



---


### Relationships
##### Extends
* AuthorizationError

---

<a id="_browser_src_auth_popup_handler_.popuprequesthandler"></a>

##  PopupRequestHandler


<a id="_browser_src_auth_popup_handler_.popuprequesthandler.constructor-2"></a>
### constructor
```typescript
new PopupRequestHandler(utils?: BasicQueryStringUtils<>, crypto?: DefaultCrypto<>): PopupRequestHandler
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| utils | `BasicQueryStringUtils`  |  new BasicQueryStringUtils() |   - |
| crypto | `DefaultCrypto`  |  new DefaultCrypto() |   - |



##### Return Value
[PopupRequestHandler](#_browser_src_auth_popup_handler_.popuprequesthandler)





---

### Properties



---

### Methods
<a id="_browser_src_auth_popup_handler_.popuprequesthandler.callback"></a>

#### callback




##### Declaration


```typescript
function callback(url: Location)
```
<small>*Defined in [packages/browser/src/auth/popup-handler.ts:105](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/popup-handler.ts#L105)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| url | `Location`   |  - |








<a id="_browser_src_auth_popup_handler_.popuprequesthandler.completeauthorizationrequest"></a>

#### completeAuthorizationRequest




##### Declaration


```typescript
function completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null>
```
<small>*Defined in [packages/browser/src/auth/popup-handler.ts:119](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/popup-handler.ts#L119)*</small>



##### Return Value
`Promise<AuthorizationRequestResponse          ⎮null>`







<a id="_browser_src_auth_popup_handler_.popuprequesthandler.completeauthorizationrequestifpossible"></a>

#### completeAuthorizationRequestIfPossible




##### Declaration


```typescript
function completeAuthorizationRequestIfPossible(): Promise<void>
```
<small>*Defined in [packages/browser/src/auth/popup-handler.ts:111](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/popup-handler.ts#L111)*</small>



##### Return Value
`Promise<void>`







<a id="_browser_src_auth_popup_handler_.popuprequesthandler.performauthorizationrequest"></a>

#### performAuthorizationRequest




##### Declaration


```typescript
function performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest)
```
<small>*Defined in [packages/browser/src/auth/popup-handler.ts:85](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/popup-handler.ts#L85)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| configuration | `AuthorizationServiceConfiguration`   |  - |
| request | `AuthorizationRequest`   |  - |











---


### Relationships
##### Extends
* AuthorizationRequestHandler

---


### Functions
<a id="_browser_src_auth_popup_handler_.createcenteredpopupfeatures"></a>

###  createCenteredPopupFeatures




##### Declaration


```typescript
function createCenteredPopupFeatures(): any
```
<small>*Defined in [packages/browser/src/auth/popup-handler.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/popup-handler.ts#L47)*</small>



##### Return Value
`any`







<a id="_browser_src_auth_popup_handler_.createpopupfeaturestring"></a>

###  createPopupFeatureString




##### Declaration


```typescript
function createPopupFeatureString(features: any): string
```
<small>*Defined in [packages/browser/src/auth/popup-handler.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/popup-handler.ts#L33)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| features | `any`   |  - |



##### Return Value
`string`









---

<a id="_browser_src_auth_token_store_"></a>


<a id="_browser_src_auth_token_store_.tokenstore"></a>

##  TokenStore


<a id="_browser_src_auth_token_store_.tokenstore.constructor"></a>
### constructor
```typescript
new TokenStore(clientId: string, store: Store): TokenStore
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |  - |
| store | [Store](#_browser_src_utils_store_.store)   |  - |



##### Return Value
[TokenStore](#_browser_src_auth_token_store_.tokenstore)





---

<a id="_browser_src_auth_token_store_.tokenstore.currentidtoken"></a>

####  currentIdToken


```javascript
var currentIdToken: 
```
<small>*Defined in [packages/browser/src/auth/token-store.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/token-store.ts#L15)*</small>





<a id="_browser_src_auth_token_store_.tokenstore.currenttoken"></a>

####  currentToken


```javascript
var currentToken: 
```
<small>*Defined in [packages/browser/src/auth/token-store.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/token-store.ts#L9)*</small>





<a id="_browser_src_auth_token_store_.tokenstore.refreshtoken"></a>

####  refreshToken


```javascript
var refreshToken: 
```
<small>*Defined in [packages/browser/src/auth/token-store.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/token-store.ts#L21)*</small>







---

### Methods
<a id="_browser_src_auth_token_store_.tokenstore.clear"></a>

#### clear




##### Declaration


```typescript
function clear()
```
<small>*Defined in [packages/browser/src/auth/token-store.ts:77](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/token-store.ts#L77)*</small>








<a id="_browser_src_auth_token_store_.tokenstore.invalidatecurrenttoken"></a>

#### invalidateCurrentToken




##### Declaration


```typescript
function invalidateCurrentToken()
```
<small>*Defined in [packages/browser/src/auth/token-store.ts:70](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/token-store.ts#L70)*</small>








<a id="_browser_src_auth_token_store_.tokenstore.persisttokenresponse"></a>

#### persistTokenResponse




##### Declaration


```typescript
function persistTokenResponse(response: TokenResponse)
```
<small>*Defined in [packages/browser/src/auth/token-store.ts:59](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/token-store.ts#L59)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| response | `TokenResponse`   |  - |










---



---



---

<a id="_browser_src_auth_user_"></a>


<a id="_browser_src_auth_user_.user"></a>

##  User


<a id="_browser_src_auth_user_.user.constructor"></a>
### constructor
```typescript
new User(id: string, accounts: string[], email: undefined | string, emailVerified: undefined | false | true, phone: undefined | string, phoneNumberVerified: undefined | false | true, preferredUsername: undefined | string): User
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |  - |
| accounts | `string[]`   |  - |
| email | `undefined          ⎮string`   |  - |
| emailVerified | `undefined          ⎮false          ⎮true`   |  - |
| phone | `undefined          ⎮string`   |  - |
| phoneNumberVerified | `undefined          ⎮false          ⎮true`   |  - |
| preferredUsername | `undefined          ⎮string`   |  - |



##### Return Value
[User](#_browser_src_auth_user_.user)





---

### Properties
<a id="_browser_src_auth_user_.user.accounts"></a>

#### accounts
```javascript
var accounts: string[]
```
<small>*Defined in [packages/browser/src/auth/user.ts:31](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L31)*</small>


<a id="_browser_src_auth_user_.user.email"></a>

#### email
```javascript
var email: undefined | string
```
<small>*Defined in [packages/browser/src/auth/user.ts:32](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L32)*</small>


<a id="_browser_src_auth_user_.user.emailverified"></a>

#### emailVerified
```javascript
var emailVerified: undefined | false | true
```
<small>*Defined in [packages/browser/src/auth/user.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L33)*</small>


<a id="_browser_src_auth_user_.user.id"></a>

#### id
```javascript
var id: string
```
<small>*Defined in [packages/browser/src/auth/user.ts:30](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L30)*</small>


<a id="_browser_src_auth_user_.user.phonenumber"></a>

#### phoneNumber
```javascript
var phoneNumber: undefined | string
```
<small>*Defined in [packages/browser/src/auth/user.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L34)*</small>


<a id="_browser_src_auth_user_.user.phonenumberverified"></a>

#### phoneNumberVerified
```javascript
var phoneNumberVerified: undefined | false | true
```
<small>*Defined in [packages/browser/src/auth/user.ts:35](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L35)*</small>


<a id="_browser_src_auth_user_.user.preferredusername"></a>

#### preferredUsername
```javascript
var preferredUsername: undefined | string
```
<small>*Defined in [packages/browser/src/auth/user.ts:36](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L36)*</small>




---

### Methods
<a id="_browser_src_auth_user_.user.tostoragestring"></a>

#### toStorageString




##### Declaration


```typescript
function toStorageString(): string
```
<small>*Defined in [packages/browser/src/auth/user.ts:48](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L48)*</small>



##### Return Value
`string`







<a id="_browser_src_auth_user_.user.fromjson"></a>

#### fromJson




##### Declaration


```typescript
function fromJson(json: UserInfoResponse): User
```
<small>*Defined in [packages/browser/src/auth/user.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L13)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| json | [UserInfoResponse](#_browser_src_auth_user_.userinforesponse)   |  - |



##### Return Value
[User](#_browser_src_auth_user_.user)







<a id="_browser_src_auth_user_.user.fromstring"></a>

#### fromString




##### Declaration


```typescript
function fromString(s: string): User | undefined
```
<small>*Defined in [packages/browser/src/auth/user.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L17)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| s | `string`   |  - |



##### Return Value
`User          ⎮undefined`









---



---


<a id="_browser_src_auth_user_.userinforesponse"></a>

####  UserInfoResponse





### Properties
<a id="_browser_src_auth_user_.userinforesponse.accounts-1"></a>

#### accounts
```javascript
var accounts: string[]
```
<small>*Defined in [packages/browser/src/auth/user.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L3)*</small>


<a id="_browser_src_auth_user_.userinforesponse.email-1"></a>

#### email
```javascript
var email: undefined | string
```
<small>*Defined in [packages/browser/src/auth/user.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L4)*</small>


<a id="_browser_src_auth_user_.userinforesponse.email_verified"></a>

#### email_verified
```javascript
var email_verified: undefined | false | true
```
<small>*Defined in [packages/browser/src/auth/user.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L7)*</small>


<a id="_browser_src_auth_user_.userinforesponse.phone_number"></a>

#### phone_number
```javascript
var phone_number: undefined | string
```
<small>*Defined in [packages/browser/src/auth/user.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L5)*</small>


<a id="_browser_src_auth_user_.userinforesponse.phone_number_verified"></a>

#### phone_number_verified
```javascript
var phone_number_verified: undefined | false | true
```
<small>*Defined in [packages/browser/src/auth/user.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L6)*</small>


<a id="_browser_src_auth_user_.userinforesponse.preferred_username"></a>

#### preferred_username
```javascript
var preferred_username: undefined | string
```
<small>*Defined in [packages/browser/src/auth/user.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L8)*</small>


<a id="_browser_src_auth_user_.userinforesponse.sub"></a>

#### sub
```javascript
var sub: string
```
<small>*Defined in [packages/browser/src/auth/user.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user.ts#L2)*</small>






---

<a id="_browser_src_auth_user_store_"></a>


<a id="_browser_src_auth_user_store_.userstore"></a>

##  UserStore


<a id="_browser_src_auth_user_store_.userstore.constructor"></a>
### constructor
```typescript
new UserStore(clientId: string, store: Store): UserStore
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |  - |
| store | [Store](#_browser_src_utils_store_.store)   |  - |



##### Return Value
[UserStore](#_browser_src_auth_user_store_.userstore)





---

<a id="_browser_src_auth_user_store_.userstore.currentuser"></a>

####  currentUser


```javascript
var currentUser: 
```
<small>*Defined in [packages/browser/src/auth/user-store.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user-store.ts#L8)*</small>







---

### Methods
<a id="_browser_src_auth_user_store_.userstore.clear"></a>

#### clear




##### Declaration


```typescript
function clear()
```
<small>*Defined in [packages/browser/src/auth/user-store.ts:31](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user-store.ts#L31)*</small>








<a id="_browser_src_auth_user_store_.userstore.set"></a>

#### set




##### Declaration


```typescript
function set(user: User | undefined)
```
<small>*Defined in [packages/browser/src/auth/user-store.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/auth/user-store.ts#L26)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| user | `User          ⎮undefined`   |  - |










---



---



---

<a id="_browser_src_bitski_"></a>


<a id="_browser_src_bitski_.authenticationstatus"></a>

####  AuthenticationStatus





<a id="_browser_src_bitski_.authenticationstatus.connected"></a>

####  Connected


```javascript
var Connected:  = "CONNECTED"
```
<small>*Defined in [packages/browser/src/bitski.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L21)*</small>





<a id="_browser_src_bitski_.authenticationstatus.expired"></a>

####  Expired


```javascript
var Expired:  = "EXPIRED"
```
<small>*Defined in [packages/browser/src/bitski.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L22)*</small>





<a id="_browser_src_bitski_.authenticationstatus.notconnected"></a>

####  NotConnected


```javascript
var NotConnected:  = "NOT_CONNECTED"
```
<small>*Defined in [packages/browser/src/bitski.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L23)*</small>







<a id="_browser_src_bitski_.oauthsigninmethod"></a>

####  OAuthSignInMethod





<a id="_browser_src_bitski_.oauthsigninmethod.popup"></a>

####  Popup


```javascript
var Popup:  = "POPUP"
```
<small>*Defined in [packages/browser/src/bitski.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L16)*</small>





<a id="_browser_src_bitski_.oauthsigninmethod.redirect"></a>

####  Redirect


```javascript
var Redirect:  = "REDIRECT"
```
<small>*Defined in [packages/browser/src/bitski.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L15)*</small>





<a id="_browser_src_bitski_.oauthsigninmethod.silent"></a>

####  Silent


```javascript
var Silent:  = "SILENT"
```
<small>*Defined in [packages/browser/src/bitski.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L17)*</small>








<a id="_browser_src_bitski_.bitski"></a>

##  Bitski


<a id="_browser_src_bitski_.bitski.constructor"></a>
### constructor
```typescript
new Bitski(clientId: string, redirectUri: undefined | string, additionalScopes: string[], options: BitskiSDKOptions): Bitski
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |  OAuth Client ID |
| redirectUri | `undefined          ⎮string`   |  Redirect uri, defaults to the current url. This should be the location of your callback html file. |
| additionalScopes | `string[]`   |  To use custom scopes, add them here. The default value is ['offline'].Note: Make sure your app is approved for the scopes you are requesting first. |
| options | [BitskiSDKOptions](#_browser_src_bitski_.bitskisdkoptions)   |  Other OAuth settings. Don't change these unless you know what you are doing. |



##### Return Value
[Bitski](#_browser_src_bitski_.bitski)





---

<a id="_browser_src_bitski_.bitski.authstatus"></a>

####  authStatus


```javascript
var authStatus: 
```
<small>*Defined in [packages/browser/src/bitski.ts:152](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L152)*</small>







---

### Methods
<a id="_browser_src_bitski_.bitski.addsignouthandler"></a>

#### addSignOutHandler




##### Declaration


```typescript
function addSignOutHandler(fn: function)
```
<small>*Defined in [packages/browser/src/bitski.ts:227](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L227)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  Your callback function |








<a id="_browser_src_bitski_.bitski.connect"></a>

#### connect




##### Declaration


```typescript
function connect(): Promise<User>
```
<small>*Defined in [packages/browser/src/bitski.ts:181](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L181)*</small>



##### Return Value
`Promise<User>`







<a id="_browser_src_bitski_.bitski.getconnectbutton"></a>

#### getConnectButton




##### Declaration


```typescript
function getConnectButton(options: ConnectButtonOptions, callback: undefined | function): ConnectButton
```
<small>*Defined in [packages/browser/src/bitski.ts:135](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L135)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [ConnectButtonOptions](#_browser_src_components_connect_button_.connectbuttonoptions)   |  Optional configuration for the button |
| callback | `undefined          ⎮function`   |  Post-login callback. Called when sign in is complete. Not applicable for redirect login method. |



##### Return Value
[ConnectButton](#_browser_src_components_connect_button_.connectbutton)







<a id="_browser_src_bitski_.bitski.getcurrentaccesstoken"></a>

#### getCurrentAccessToken




##### Declaration


```typescript
function getCurrentAccessToken(): Promise<string>
```
<small>*Defined in [packages/browser/src/bitski.ts:203](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L203)*</small>



##### Return Value
`Promise<string>`







<a id="_browser_src_bitski_.bitski.getcurrentidtoken"></a>

#### getCurrentIdToken




##### Declaration


```typescript
function getCurrentIdToken(): Promise<string | undefined>
```
<small>*Defined in [packages/browser/src/bitski.ts:210](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L210)*</small>



##### Return Value
`Promise<string          ⎮undefined>`







<a id="_browser_src_bitski_.bitski.getcurrentrefreshtoken"></a>

#### getCurrentRefreshToken




##### Declaration


```typescript
function getCurrentRefreshToken(): Promise<string>
```
<small>*Defined in [packages/browser/src/bitski.ts:218](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L218)*</small>



##### Return Value
`Promise<string>`







<a id="_browser_src_bitski_.bitski.getprovider"></a>

#### getProvider




##### Declaration


```typescript
function getProvider(options: ProviderOptions | string): BitskiEngine
```
<small>*Defined in [packages/browser/src/bitski.ts:106](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L106)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | `ProviderOptions          ⎮string`   |  options for the provider, or a network name |



##### Return Value
`BitskiEngine`







<a id="_browser_src_bitski_.bitski.getuser"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [packages/browser/src/bitski.ts:174](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L174)*</small>



##### Return Value
`Promise<User>`







<a id="_browser_src_bitski_.bitski.redirectcallback"></a>

#### redirectCallback




##### Declaration


```typescript
function redirectCallback(): Promise<User>
```
<small>*Defined in [packages/browser/src/bitski.ts:196](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L196)*</small>



##### Return Value
`Promise<User>`







<a id="_browser_src_bitski_.bitski.removesignouthandler"></a>

#### removeSignOutHandler




##### Declaration


```typescript
function removeSignOutHandler(fn: function)
```
<small>*Defined in [packages/browser/src/bitski.ts:235](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L235)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  Your callback function |








<a id="_browser_src_bitski_.bitski.signin"></a>

#### signIn




##### Declaration


```typescript
function signIn(options: SignInOptions): Promise<User>
```
<small>*Defined in [packages/browser/src/bitski.ts:167](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L167)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [SignInOptions](#_browser_src_auth_oauth_manager_.signinoptions)   |  Optionally provide additional options for the sign in request.You can use the options parameter to request that we show the sign up form instead of the sign in form:`javascriptimport { LOGIN_HINT_SIGNUP } from 'bitski';await bitski.signIn({ login_hint: LOGIN_HINT_SIGNUP });` |



##### Return Value
`Promise<User>`







<a id="_browser_src_bitski_.bitski.signinredirect"></a>

#### signInRedirect




##### Declaration


```typescript
function signInRedirect(options: SignInOptions)
```
<small>*Defined in [packages/browser/src/bitski.ts:189](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L189)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [SignInOptions](#_browser_src_auth_oauth_manager_.signinoptions)   |  Optionally provide additional options for the sign in request. See signIn() for more info. |








<a id="_browser_src_bitski_.bitski.signout"></a>

#### signOut




##### Declaration


```typescript
function signOut(): Promise<void>
```
<small>*Defined in [packages/browser/src/bitski.ts:245](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L245)*</small>



##### Return Value
`Promise<void>`







<a id="_browser_src_bitski_.bitski.start"></a>

#### start




##### Declaration


```typescript
function start(options: SignInOptions): Promise<User>
```
<small>*Defined in [packages/browser/src/bitski.ts:145](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L145)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [SignInOptions](#_browser_src_auth_oauth_manager_.signinoptions)   |  Provide SignInOptions for the sign in request. See signIn() for more info. |



##### Return Value
`Promise<User>`







<a id="_browser_src_bitski_.bitski.callback"></a>

#### callback




##### Declaration


```typescript
function callback()
```
<small>*Defined in [packages/browser/src/bitski.ts:71](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L71)*</small>










---



---


<a id="_browser_src_bitski_.bitskisdkoptions"></a>

####  BitskiSDKOptions





### Properties
<a id="_browser_src_bitski_.bitskisdkoptions.configuration"></a>

#### configuration
```javascript
var configuration: AuthorizationServiceConfiguration
```
<small>*Defined in [packages/browser/src/bitski.ts:45](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L45)*</small>


<a id="_browser_src_bitski_.bitskisdkoptions.store"></a>

#### store
```javascript
var store: Store
```
<small>*Defined in [packages/browser/src/bitski.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L47)*</small>




<a id="_browser_src_bitski_.provideroptions"></a>

####  ProviderOptions





### Properties
<a id="_browser_src_bitski_.provideroptions.additionalheaders"></a>

#### additionalHeaders
```javascript
var additionalHeaders: undefined | object
```
<small>*Defined in [packages/browser/src/bitski.ts:57](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L57)*</small>


<a id="_browser_src_bitski_.provideroptions.apibaseurl"></a>

#### apiBaseUrl
```javascript
var apiBaseUrl: undefined | string
```
<small>*Defined in [packages/browser/src/bitski.ts:59](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L59)*</small>


<a id="_browser_src_bitski_.provideroptions.callbackurl"></a>

#### callbackURL
```javascript
var callbackURL: undefined | string
```
<small>*Defined in [packages/browser/src/bitski.ts:61](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L61)*</small>


<a id="_browser_src_bitski_.provideroptions.disableblocktracking"></a>

#### disableBlockTracking
```javascript
var disableBlockTracking: undefined | false | true
```
<small>*Defined in [packages/browser/src/bitski.ts:56](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L56)*</small>


<a id="_browser_src_bitski_.provideroptions.disablecaching"></a>

#### disableCaching
```javascript
var disableCaching: undefined | false | true
```
<small>*Defined in [packages/browser/src/bitski.ts:54](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L54)*</small>


<a id="_browser_src_bitski_.provideroptions.disablevalidation"></a>

#### disableValidation
```javascript
var disableValidation: undefined | false | true
```
<small>*Defined in [packages/browser/src/bitski.ts:55](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L55)*</small>


<a id="_browser_src_bitski_.provideroptions.mingasprice"></a>

#### minGasPrice
```javascript
var minGasPrice: undefined | number
```
<small>*Defined in [packages/browser/src/bitski.ts:60](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L60)*</small>


<a id="_browser_src_bitski_.provideroptions.network"></a>

#### network
```javascript
var network: Network
```
<small>*Defined in [packages/browser/src/bitski.ts:52](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L52)*</small>


<a id="_browser_src_bitski_.provideroptions.networkname"></a>

#### networkName
```javascript
var networkName: undefined | string
```
<small>*Defined in [packages/browser/src/bitski.ts:51](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L51)*</small>


<a id="_browser_src_bitski_.provideroptions.pollinginterval"></a>

#### pollingInterval
```javascript
var pollingInterval: undefined | number
```
<small>*Defined in [packages/browser/src/bitski.ts:53](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L53)*</small>


<a id="_browser_src_bitski_.provideroptions.webbaseurl"></a>

#### webBaseUrl
```javascript
var webBaseUrl: undefined | string
```
<small>*Defined in [packages/browser/src/bitski.ts:58](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/bitski.ts#L58)*</small>






---

<a id="_browser_src_callback_"></a>



---

<a id="_browser_src_components_connect_button_"></a>


<a id="_browser_src_components_connect_button_.connectbuttonsize"></a>

####  ConnectButtonSize





<a id="_browser_src_components_connect_button_.connectbuttonsize.large"></a>

####  Large


```javascript
var Large:  = "LARGE"
```
<small>*Defined in [packages/browser/src/components/connect-button.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/connect-button.ts#L11)*</small>





<a id="_browser_src_components_connect_button_.connectbuttonsize.medium"></a>

####  Medium


```javascript
var Medium:  = "MEDIUM"
```
<small>*Defined in [packages/browser/src/components/connect-button.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/connect-button.ts#L10)*</small>





<a id="_browser_src_components_connect_button_.connectbuttonsize.small"></a>

####  Small


```javascript
var Small:  = "SMALL"
```
<small>*Defined in [packages/browser/src/components/connect-button.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/connect-button.ts#L9)*</small>








<a id="_browser_src_components_connect_button_.connectbutton"></a>

##  ConnectButton


<a id="_browser_src_components_connect_button_.connectbutton.constructor"></a>
### constructor
```typescript
new ConnectButton(authProvider: AuthProvider, options: ConnectButtonOptions, callback: undefined | function): ConnectButton
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authProvider | [AuthProvider](#_browser_src_auth_auth_provider_.authprovider)   |  An instance of an AuthProvider to process sign in requests. |
| options | [ConnectButtonOptions](#_browser_src_components_connect_button_.connectbuttonoptions)   |  Optional ConnectButtonOptions to configure your button. |
| callback | `undefined          ⎮function`   |  Optional callback to be called after successful or failed log in attempt.You can also set this directly later with the `callback` property. |



##### Return Value
[ConnectButton](#_browser_src_components_connect_button_.connectbutton)





---

### Properties
<a id="_browser_src_components_connect_button_.connectbutton.callback"></a>

#### callback
```javascript
var callback: undefined | function
```
<small>*Defined in [packages/browser/src/components/connect-button.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/connect-button.ts#L39)*</small>


<a id="_browser_src_components_connect_button_.connectbutton.element"></a>

#### element
```javascript
var element: HTMLElement
```
<small>*Defined in [packages/browser/src/components/connect-button.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/connect-button.ts#L33)*</small>


<a id="_browser_src_components_connect_button_.connectbutton.oncancel"></a>

#### onCancel
```javascript
var onCancel: undefined | function
```
<small>*Defined in [packages/browser/src/components/connect-button.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/connect-button.ts#L42)*</small>


<a id="_browser_src_components_connect_button_.connectbutton.size"></a>

#### size
```javascript
var size: ConnectButtonSize
```
<small>*Defined in [packages/browser/src/components/connect-button.ts:36](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/connect-button.ts#L36)*</small>




---

### Methods
<a id="_browser_src_components_connect_button_.connectbutton.remove"></a>

#### remove




##### Declaration


```typescript
function remove()
```
<small>*Defined in [packages/browser/src/components/connect-button.ts:83](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/connect-button.ts#L83)*</small>










---



---


<a id="_browser_src_components_connect_button_.connectbuttonoptions"></a>

####  ConnectButtonOptions





### Properties
<a id="_browser_src_components_connect_button_.connectbuttonoptions.authmethod"></a>

#### authMethod
```javascript
var authMethod: OAuthSignInMethod
```
<small>*Defined in [packages/browser/src/components/connect-button.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/connect-button.ts#L19)*</small>


<a id="_browser_src_components_connect_button_.connectbuttonoptions.container"></a>

#### container
```javascript
var container: HTMLElement
```
<small>*Defined in [packages/browser/src/components/connect-button.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/connect-button.ts#L23)*</small>


<a id="_browser_src_components_connect_button_.connectbuttonoptions.signinoptions"></a>

#### signInOptions
```javascript
var signInOptions: SignInOptions
```
<small>*Defined in [packages/browser/src/components/connect-button.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/connect-button.ts#L21)*</small>


<a id="_browser_src_components_connect_button_.connectbuttonoptions.size-1"></a>

#### size
```javascript
var size: ConnectButtonSize
```
<small>*Defined in [packages/browser/src/components/connect-button.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/connect-button.ts#L25)*</small>






---

<a id="_browser_src_components_dialog_"></a>


<a id="_browser_src_components_dialog_.dialog"></a>

##  Dialog


<a id="_browser_src_components_dialog_.dialog.constructor"></a>
### constructor
```typescript
new Dialog(content: HTMLElement | string, dynamicContent?: boolean): Dialog
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| content | `HTMLElement          ⎮string`  | - |   The content (HTMLElement, selector, or text) to embed in the dialog |
| dynamicContent | `boolean`  | false |   Set to true to show loading state |



##### Return Value
[Dialog](#_browser_src_components_dialog_.dialog)





---

### Properties
<a id="_browser_src_components_dialog_.dialog.onclose"></a>

#### onClose
```javascript
var onClose: undefined | function
```
<small>*Defined in [packages/browser/src/components/dialog.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/dialog.ts#L12)*</small>




---

### Methods
<a id="_browser_src_components_dialog_.dialog.close"></a>

#### close




##### Declaration


```typescript
function close()
```
<small>*Defined in [packages/browser/src/components/dialog.ts:69](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/dialog.ts#L69)*</small>








<a id="_browser_src_components_dialog_.dialog.dismiss"></a>

#### dismiss




##### Declaration


```typescript
function dismiss()
```
<small>*Defined in [packages/browser/src/components/dialog.ts:60](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/dialog.ts#L60)*</small>








<a id="_browser_src_components_dialog_.dialog.hide"></a>

#### hide




##### Declaration


```typescript
function hide()
```
<small>*Defined in [packages/browser/src/components/dialog.ts:53](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/dialog.ts#L53)*</small>








<a id="_browser_src_components_dialog_.dialog.setloading"></a>

#### setLoading




##### Declaration


```typescript
function setLoading(loading: boolean)
```
<small>*Defined in [packages/browser/src/components/dialog.ts:80](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/dialog.ts#L80)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| loading | `boolean`   |  Whether or not to display the spinner |








<a id="_browser_src_components_dialog_.dialog.show"></a>

#### show




##### Declaration


```typescript
function show()
```
<small>*Defined in [packages/browser/src/components/dialog.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/dialog.ts#L47)*</small>










---



---


<a id="_browser_src_components_dialog_.template"></a>

#### «Const» TEMPLATE


```javascript
var TEMPLATE: "
  <div class='bitski-dialog'>
      <button class='bitski-close-button'>Close</button>
      <div class='bitski-dialog-body'></div>
  </div>
" =  `
  <div class='bitski-dialog'>
      <button class='bitski-close-button'>Close</button>
      <div class='bitski-dialog-body'></div>
  </div>
`
```
<small>*Defined in [packages/browser/src/components/dialog.ts:1](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/components/dialog.ts#L1)*</small>







---

<a id="_browser_src_constants_"></a>


<a id="_browser_src_constants_.access_token_key"></a>

#### «Const» ACCESS_TOKEN_KEY


```javascript
var ACCESS_TOKEN_KEY: "bitski.access_token" = "bitski.access_token"
```
<small>*Defined in [packages/browser/src/constants.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L34)*</small>





<a id="_browser_src_constants_.bitski_rpc_base_url"></a>

#### «Const» BITSKI_RPC_BASE_URL


```javascript
var BITSKI_RPC_BASE_URL: "https://api.bitski.com/v1/web3" = "https://api.bitski.com/v1/web3"
```
<small>*Defined in [packages/browser/src/constants.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L7)*</small>





<a id="_browser_src_constants_.bitski_transaction_api_base_url"></a>

#### «Const» BITSKI_TRANSACTION_API_BASE_URL


```javascript
var BITSKI_TRANSACTION_API_BASE_URL: "https://api.bitski.com/v1" = "https://api.bitski.com/v1"
```
<small>*Defined in [packages/browser/src/constants.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L6)*</small>





<a id="_browser_src_constants_.bitski_user_api_host"></a>

#### «Const» BITSKI_USER_API_HOST


```javascript
var BITSKI_USER_API_HOST: "https://www.bitski.com/v1" = "https://www.bitski.com/v1"
```
<small>*Defined in [packages/browser/src/constants.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L5)*</small>





<a id="_browser_src_constants_.bitski_web_base_url"></a>

#### «Const» BITSKI_WEB_BASE_URL


```javascript
var BITSKI_WEB_BASE_URL: "https://sign.bitski.com" = "https://sign.bitski.com"
```
<small>*Defined in [packages/browser/src/constants.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L8)*</small>





<a id="_browser_src_constants_.cached_methods"></a>

#### «Const» CACHED_METHODS


```javascript
var CACHED_METHODS: string[] =  ['eth_accounts']
```
<small>*Defined in [packages/browser/src/constants.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L39)*</small>





<a id="_browser_src_constants_.check_for_popup_close_interval"></a>

#### «Const» CHECK_FOR_POPUP_CLOSE_INTERVAL


```javascript
var CHECK_FOR_POPUP_CLOSE_INTERVAL: 500 = 500
```
<small>*Defined in [packages/browser/src/constants.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L22)*</small>





<a id="_browser_src_constants_.default_authorized_methods"></a>

#### «Const» DEFAULT_AUTHORIZED_METHODS


```javascript
var DEFAULT_AUTHORIZED_METHODS: string[] =  [
  'eth_sendTransaction',
  'eth_signTransaction',
  'eth_sign',
  'personal_sign',
  'eth_signTypedData',
  'eth_signTypedData_v3', // For metamask compatibility
]
```
<small>*Defined in [packages/browser/src/constants.ts:40](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L40)*</small>





<a id="_browser_src_constants_.default_optional_scopes"></a>

#### «Const» DEFAULT_OPTIONAL_SCOPES


```javascript
var DEFAULT_OPTIONAL_SCOPES: string[] =  ['offline']
```
<small>*Defined in [packages/browser/src/constants.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L19)*</small>





<a id="_browser_src_constants_.default_scopes"></a>

#### «Const» DEFAULT_SCOPES


```javascript
var DEFAULT_SCOPES: string[] =  ['openid']
```
<small>*Defined in [packages/browser/src/constants.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L18)*</small>





<a id="_browser_src_constants_.id_token_key"></a>

#### «Const» ID_TOKEN_KEY


```javascript
var ID_TOKEN_KEY: "bitski.id_token" = "bitski.id_token"
```
<small>*Defined in [packages/browser/src/constants.ts:35](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L35)*</small>





<a id="_browser_src_constants_.iframe_message_origin_includes"></a>

#### «Const» IFRAME_MESSAGE_ORIGIN_INCLUDES


```javascript
var IFRAME_MESSAGE_ORIGIN_INCLUDES: ".bitski.com" = ".bitski.com"
```
<small>*Defined in [packages/browser/src/constants.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L9)*</small>





<a id="_browser_src_constants_.refresh_token_key"></a>

#### «Const» REFRESH_TOKEN_KEY


```javascript
var REFRESH_TOKEN_KEY: "bitski.refresh_token" = "bitski.refresh_token"
```
<small>*Defined in [packages/browser/src/constants.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L33)*</small>





<a id="_browser_src_constants_.sdk_version"></a>

#### «Const» SDK_VERSION


```javascript
var SDK_VERSION: "0.11.0-beta.4" = "0.11.0-beta.4"
```
<small>*Defined in [packages/browser/src/constants.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L2)*</small>





<a id="_browser_src_constants_.user_key"></a>

#### «Const» USER_KEY


```javascript
var USER_KEY: "bitski.user" = "bitski.user"
```
<small>*Defined in [packages/browser/src/constants.ts:36](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L36)*</small>






<a id="_browser_src_constants_.default_oauth_configuration"></a>

## DEFAULT_OAUTH_CONFIGURATION


<a id="_browser_src_constants_.default_oauth_configuration.authorization_endpoint"></a>

####  authorization_endpoint


```javascript
var authorization_endpoint: string = "https://account.bitski.com/oauth2/auth"
```
<small>*Defined in [packages/browser/src/constants.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L13)*</small>





<a id="_browser_src_constants_.default_oauth_configuration.revocation_endpoint"></a>

####  revocation_endpoint


```javascript
var revocation_endpoint: string = ""
```
<small>*Defined in [packages/browser/src/constants.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L14)*</small>





<a id="_browser_src_constants_.default_oauth_configuration.token_endpoint"></a>

####  token_endpoint


```javascript
var token_endpoint: string = "https://account.bitski.com/oauth2/token"
```
<small>*Defined in [packages/browser/src/constants.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L15)*</small>





<a id="_browser_src_constants_.default_oauth_configuration.userinfo_endpoint"></a>

####  userinfo_endpoint


```javascript
var userinfo_endpoint: string = "https://account.bitski.com/userinfo"
```
<small>*Defined in [packages/browser/src/constants.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L16)*</small>







<a id="_browser_src_constants_.default_popup_features"></a>

## DEFAULT_POPUP_FEATURES


<a id="_browser_src_constants_.default_popup_features.height"></a>

####  height


```javascript
var height: number = 500
```
<small>*Defined in [packages/browser/src/constants.ts:27](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L27)*</small>





<a id="_browser_src_constants_.default_popup_features.left"></a>

####  left


```javascript
var left: number = 100
```
<small>*Defined in [packages/browser/src/constants.ts:28](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L28)*</small>





<a id="_browser_src_constants_.default_popup_features.location"></a>

####  location


```javascript
var location: string = "no"
```
<small>*Defined in [packages/browser/src/constants.ts:24](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L24)*</small>





<a id="_browser_src_constants_.default_popup_features.toolbar"></a>

####  toolbar


```javascript
var toolbar: string = "no"
```
<small>*Defined in [packages/browser/src/constants.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L25)*</small>





<a id="_browser_src_constants_.default_popup_features.top"></a>

####  top


```javascript
var top: number = 100
```
<small>*Defined in [packages/browser/src/constants.ts:29](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L29)*</small>





<a id="_browser_src_constants_.default_popup_features.width"></a>

####  width


```javascript
var width: number = 500
```
<small>*Defined in [packages/browser/src/constants.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/constants.ts#L26)*</small>









---

<a id="_browser_src_errors_authentication_error_"></a>


<a id="_browser_src_errors_authentication_error_.authenticationerrorcode"></a>

####  AuthenticationErrorCode





<a id="_browser_src_errors_authentication_error_.authenticationerrorcode.invalidconfiguration"></a>

####  InvalidConfiguration


```javascript
var InvalidConfiguration:  = 1005
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L14)*</small>





<a id="_browser_src_errors_authentication_error_.authenticationerrorcode.norefreshtoken"></a>

####  NoRefreshToken


```javascript
var NoRefreshToken:  = 1002
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L8)*</small>





<a id="_browser_src_errors_authentication_error_.authenticationerrorcode.notsignedin"></a>

####  NotSignedIn


```javascript
var NotSignedIn:  = 1000
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L4)*</small>





<a id="_browser_src_errors_authentication_error_.authenticationerrorcode.popupblocked"></a>

####  PopupBlocked


```javascript
var PopupBlocked:  = 1006
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L16)*</small>





<a id="_browser_src_errors_authentication_error_.authenticationerrorcode.servererror"></a>

####  ServerError


```javascript
var ServerError:  = 1004
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L12)*</small>





<a id="_browser_src_errors_authentication_error_.authenticationerrorcode.unsupportedauthenticationmethod"></a>

####  UnsupportedAuthenticationMethod


```javascript
var UnsupportedAuthenticationMethod:  = 1003
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L10)*</small>





<a id="_browser_src_errors_authentication_error_.authenticationerrorcode.usercancelled"></a>

####  UserCancelled


```javascript
var UserCancelled:  = 1001
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L6)*</small>








<a id="_browser_src_errors_authentication_error_.authenticationerror"></a>

##  AuthenticationError


<a id="_browser_src_errors_authentication_error_.authenticationerror.constructor"></a>
### constructor
```typescript
new AuthenticationError(message: string, code: AuthenticationErrorCode): AuthenticationError
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string`   |  - |
| code | [AuthenticationErrorCode](#_browser_src_errors_authentication_error_.authenticationerrorcode)   |  - |



##### Return Value
[AuthenticationError](#_browser_src_errors_authentication_error_.authenticationerror)





---

### Properties
<a id="_browser_src_errors_authentication_error_.authenticationerror.code"></a>

#### code
```javascript
var code: AuthenticationErrorCode
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:63](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L63)*</small>


<a id="_browser_src_errors_authentication_error_.authenticationerror.description"></a>

#### description
```javascript
var description: undefined | string
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:64](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L64)*</small>



<a id="_browser_src_errors_authentication_error_.authenticationerror.name"></a>

#### name
```javascript
var name: string = "AuthenticationError"
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:62](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L62)*</small>



<a id="_browser_src_errors_authentication_error_.authenticationerror.error"></a>

#### Error
```javascript
var Error: ErrorConstructor
```
<small>*Defined in [node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:984](https://github.com/BitskiCo/bitski-js/blob/master/packages/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts#L984)*</small>




---

### Methods
<a id="_browser_src_errors_authentication_error_.authenticationerror.invalidconfiguration-1"></a>

#### InvalidConfiguration




##### Declaration


```typescript
function InvalidConfiguration(reason: string): AuthenticationError<>
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:58](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L58)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| reason | `string`   |  - |



##### Return Value
[AuthenticationError](#_browser_src_errors_authentication_error_.authenticationerror)







<a id="_browser_src_errors_authentication_error_.authenticationerror.norefreshtoken-1"></a>

#### NoRefreshToken




##### Declaration


```typescript
function NoRefreshToken(): AuthenticationError<>
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:35](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L35)*</small>



##### Return Value
[AuthenticationError](#_browser_src_errors_authentication_error_.authenticationerror)







<a id="_browser_src_errors_authentication_error_.authenticationerror.notsignedin-1"></a>

#### NotSignedIn




##### Declaration


```typescript
function NotSignedIn(): AuthenticationError<>
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L25)*</small>



##### Return Value
[AuthenticationError](#_browser_src_errors_authentication_error_.authenticationerror)







<a id="_browser_src_errors_authentication_error_.authenticationerror.popupblocked-1"></a>

#### PopupBlocked




##### Declaration


```typescript
function PopupBlocked(baseUrl: string): AuthenticationError<>
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:45](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L45)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| baseUrl | `string`   |  - |



##### Return Value
[AuthenticationError](#_browser_src_errors_authentication_error_.authenticationerror)







<a id="_browser_src_errors_authentication_error_.authenticationerror.servererror-1"></a>

#### ServerError




##### Declaration


```typescript
function ServerError(message: string, description: undefined | string): AuthenticationError<>
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:51](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L51)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string`   |  - |
| description | `undefined          ⎮string`   |  - |



##### Return Value
[AuthenticationError](#_browser_src_errors_authentication_error_.authenticationerror)







<a id="_browser_src_errors_authentication_error_.authenticationerror.unsupportedauthenticationmethod-1"></a>

#### UnsupportedAuthenticationMethod




##### Declaration


```typescript
function UnsupportedAuthenticationMethod(): AuthenticationError<>
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:40](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L40)*</small>



##### Return Value
[AuthenticationError](#_browser_src_errors_authentication_error_.authenticationerror)







<a id="_browser_src_errors_authentication_error_.authenticationerror.usercancelled-1"></a>

#### UserCancelled




##### Declaration


```typescript
function UserCancelled(): AuthenticationError<>
```
<small>*Defined in [packages/browser/src/errors/authentication-error.ts:30](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/authentication-error.ts#L30)*</small>



##### Return Value
[AuthenticationError](#_browser_src_errors_authentication_error_.authenticationerror)









---


### Relationships
##### Extends
* Error

---



---

<a id="_browser_src_errors_parse_error_"></a>


<a id="_browser_src_errors_parse_error_.parseerrorcode"></a>

####  ParseErrorCode





<a id="_browser_src_errors_parse_error_.parseerrorcode.invalidjson"></a>

####  InvalidJSON


```javascript
var InvalidJSON:  = 2000
```
<small>*Defined in [packages/browser/src/errors/parse-error.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/parse-error.ts#L4)*</small>





<a id="_browser_src_errors_parse_error_.parseerrorcode.noerrorbody"></a>

####  NoErrorBody


```javascript
var NoErrorBody:  = 2001
```
<small>*Defined in [packages/browser/src/errors/parse-error.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/parse-error.ts#L7)*</small>








<a id="_browser_src_errors_parse_error_.parseerror"></a>

##  ParseError


<a id="_browser_src_errors_parse_error_.parseerror.constructor"></a>
### constructor
```typescript
new ParseError(message: string, code: ParseErrorCode): ParseError
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string`   |  - |
| code | [ParseErrorCode](#_browser_src_errors_parse_error_.parseerrorcode)   |  - |



##### Return Value
[ParseError](#_browser_src_errors_parse_error_.parseerror)





---

### Properties
<a id="_browser_src_errors_parse_error_.parseerror.code"></a>

#### code
```javascript
var code: ParseErrorCode
```
<small>*Defined in [packages/browser/src/errors/parse-error.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/parse-error.ts#L23)*</small>



<a id="_browser_src_errors_parse_error_.parseerror.name"></a>

#### name
```javascript
var name: string = "ParseError"
```
<small>*Defined in [packages/browser/src/errors/parse-error.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/parse-error.ts#L22)*</small>



<a id="_browser_src_errors_parse_error_.parseerror.error"></a>

#### Error
```javascript
var Error: ErrorConstructor
```
<small>*Defined in [node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:984](https://github.com/BitskiCo/bitski-js/blob/master/packages/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts#L984)*</small>




---

### Methods
<a id="_browser_src_errors_parse_error_.parseerror.invalidjson-1"></a>

#### InvalidJSON




##### Declaration


```typescript
function InvalidJSON(): ParseError<>
```
<small>*Defined in [packages/browser/src/errors/parse-error.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/parse-error.ts#L14)*</small>



##### Return Value
[ParseError](#_browser_src_errors_parse_error_.parseerror)







<a id="_browser_src_errors_parse_error_.parseerror.unknownerror"></a>

#### UnknownError




##### Declaration


```typescript
function UnknownError(): ParseError<>
```
<small>*Defined in [packages/browser/src/errors/parse-error.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/parse-error.ts#L18)*</small>



##### Return Value
[ParseError](#_browser_src_errors_parse_error_.parseerror)









---


### Relationships
##### Extends
* Error

---



---

<a id="_browser_src_errors_signer_error_"></a>


<a id="_browser_src_errors_signer_error_.signererrorcode"></a>

####  SignerErrorCode





<a id="_browser_src_errors_signer_error_.signererrorcode.missingfrom"></a>

####  MissingFrom


```javascript
var MissingFrom:  = 3004
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L14)*</small>





<a id="_browser_src_errors_signer_error_.signererrorcode.missingmessage"></a>

####  MissingMessage


```javascript
var MissingMessage:  = 3003
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L12)*</small>





<a id="_browser_src_errors_signer_error_.signererrorcode.missingtransaction"></a>

####  MissingTransaction


```javascript
var MissingTransaction:  = 3002
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L9)*</small>





<a id="_browser_src_errors_signer_error_.signererrorcode.missingtypeddata"></a>

####  MissingTypedData


```javascript
var MissingTypedData:  = 3005
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L17)*</small>





<a id="_browser_src_errors_signer_error_.signererrorcode.unsupportedmethod"></a>

####  UnsupportedMethod


```javascript
var UnsupportedMethod:  = 3000
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L4)*</small>





<a id="_browser_src_errors_signer_error_.signererrorcode.usercancelled"></a>

####  UserCancelled


```javascript
var UserCancelled:  = 3001
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L6)*</small>








<a id="_browser_src_errors_signer_error_.signererror"></a>

##  SignerError


<a id="_browser_src_errors_signer_error_.signererror.constructor"></a>
### constructor
```typescript
new SignerError(message: string, code: SignerErrorCode): SignerError
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string`   |  - |
| code | [SignerErrorCode](#_browser_src_errors_signer_error_.signererrorcode)   |  - |



##### Return Value
[SignerError](#_browser_src_errors_signer_error_.signererror)





---

### Properties
<a id="_browser_src_errors_signer_error_.signererror.code"></a>

#### code
```javascript
var code: SignerErrorCode
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L47)*</small>



<a id="_browser_src_errors_signer_error_.signererror.name"></a>

#### name
```javascript
var name: string = "TransactionError"
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:46](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L46)*</small>



<a id="_browser_src_errors_signer_error_.signererror.error"></a>

#### Error
```javascript
var Error: ErrorConstructor
```
<small>*Defined in [node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:984](https://github.com/BitskiCo/bitski-js/blob/master/packages/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts#L984)*</small>




---

### Methods
<a id="_browser_src_errors_signer_error_.signererror.missingfrom-1"></a>

#### MissingFrom




##### Declaration


```typescript
function MissingFrom(): SignerError<>
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:38](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L38)*</small>



##### Return Value
[SignerError](#_browser_src_errors_signer_error_.signererror)







<a id="_browser_src_errors_signer_error_.signererror.missingmessage-1"></a>

#### MissingMessage




##### Declaration


```typescript
function MissingMessage(): SignerError<>
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L34)*</small>



##### Return Value
[SignerError](#_browser_src_errors_signer_error_.signererror)







<a id="_browser_src_errors_signer_error_.signererror.missingtransaction-1"></a>

#### MissingTransaction




##### Declaration


```typescript
function MissingTransaction(): SignerError<>
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:30](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L30)*</small>



##### Return Value
[SignerError](#_browser_src_errors_signer_error_.signererror)







<a id="_browser_src_errors_signer_error_.signererror.missingtypeddata-1"></a>

#### MissingTypedData




##### Declaration


```typescript
function MissingTypedData(): SignerError<>
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L42)*</small>



##### Return Value
[SignerError](#_browser_src_errors_signer_error_.signererror)







<a id="_browser_src_errors_signer_error_.signererror.unsupportedmethod-1"></a>

#### UnsupportedMethod




##### Declaration


```typescript
function UnsupportedMethod(): SignerError<>
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L22)*</small>



##### Return Value
[SignerError](#_browser_src_errors_signer_error_.signererror)







<a id="_browser_src_errors_signer_error_.signererror.usercancelled-1"></a>

#### UserCancelled




##### Declaration


```typescript
function UserCancelled(): SignerError<>
```
<small>*Defined in [packages/browser/src/errors/signer-error.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/errors/signer-error.ts#L26)*</small>



##### Return Value
[SignerError](#_browser_src_errors_signer_error_.signererror)









---


### Relationships
##### Extends
* Error

---



---

<a id="_browser_src_providers_bitski_browser_engine_"></a>


<a id="_browser_src_providers_bitski_browser_engine_.bitskibrowserengine"></a>

##  BitskiBrowserEngine


<a id="_browser_src_providers_bitski_browser_engine_.bitskibrowserengine.constructor"></a>
### constructor
```typescript
new BitskiBrowserEngine(clientId: string, tokenProvider: AccessTokenProvider, sdkVersion: string, network: Network, options?: ProviderOptions): BitskiBrowserEngine
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| clientId | `string`  | - |   - |
| tokenProvider | `AccessTokenProvider`  | - |   - |
| sdkVersion | `string`  | - |   - |
| network | `Network`  | - |   - |
| options | [ProviderOptions](#_browser_src_bitski_.provideroptions)  |  {} |   - |



##### Return Value
[BitskiBrowserEngine](#_browser_src_providers_bitski_browser_engine_.bitskibrowserengine)





---

### Properties




---

### Methods




























---


### Relationships
##### Extends
* BitskiEngine

---


### Functions
<a id="_browser_src_providers_bitski_browser_engine_.isauthprovider"></a>

###  isAuthProvider




##### Declaration


```typescript
function isAuthProvider(object: any): object is AuthProvider
```
<small>*Defined in [packages/browser/src/providers/bitski-browser-engine.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/providers/bitski-browser-engine.ts#L12)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| object | `any`   |  - |



##### Return Value
`object`









---

<a id="_browser_src_signing_transaction_signer_"></a>


<a id="_browser_src_signing_transaction_signer_.bitskitransactionsigner"></a>

##  BitskiTransactionSigner


<a id="_browser_src_signing_transaction_signer_.bitskitransactionsigner.constructor"></a>
### constructor
```typescript
new BitskiTransactionSigner(webBaseUrl: string, apiBaseUrl: string, defaultHeaders: any, callbackURL: string | undefined): BitskiTransactionSigner
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| webBaseUrl | `string`   |  - |
| apiBaseUrl | `string`   |  - |
| defaultHeaders | `any`   |  - |
| callbackURL | `string          ⎮undefined`   |  - |



##### Return Value
[BitskiTransactionSigner](#_browser_src_signing_transaction_signer_.bitskitransactionsigner)





---

### Methods
<a id="_browser_src_signing_transaction_signer_.bitskitransactionsigner.sign"></a>

#### sign




##### Declaration


```typescript
function sign(transaction: Transaction, accessToken: string): Promise<string>
```
<small>*Defined in [packages/browser/src/signing/transaction-signer.ts:46](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/signing/transaction-signer.ts#L46)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| transaction | [Transaction](#_browser_src_subproviders_signature_.transaction)   |  - |
| accessToken | `string`   |  - |



##### Return Value
`Promise<string>`









---



---


<a id="_browser_src_signing_transaction_signer_.jsontransactionobject"></a>

####  JSONTransactionObject





### Properties
<a id="_browser_src_signing_transaction_signer_.jsontransactionobject.transaction"></a>

#### transaction
```javascript
var transaction: Transaction
```
<small>*Defined in [packages/browser/src/signing/transaction-signer.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/signing/transaction-signer.ts#L10)*</small>






---

<a id="_browser_src_subproviders_authenticated_cache_"></a>


<a id="_browser_src_subproviders_authenticated_cache_.authenticatedcachesubprovider"></a>

##  AuthenticatedCacheSubprovider


<a id="_browser_src_subproviders_authenticated_cache_.authenticatedcachesubprovider.constructor"></a>
### constructor
```typescript
new AuthenticatedCacheSubprovider(authProvider: AuthProvider, engine: Web3ProviderEngine): AuthenticatedCacheSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authProvider | [AuthProvider](#_browser_src_auth_auth_provider_.authprovider)   |  - |
| engine | `Web3ProviderEngine`   |  - |



##### Return Value
[AuthenticatedCacheSubprovider](#_browser_src_subproviders_authenticated_cache_.authenticatedcachesubprovider)





---

### Properties



---

### Methods





<a id="_browser_src_subproviders_authenticated_cache_.authenticatedcachesubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any): any
```
<small>*Defined in [packages/browser/src/subproviders/authenticated-cache.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/authenticated-cache.ts#L21)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |



##### Return Value
`any`
























---


### Relationships
##### Extends
* Subprovider

---



---

<a id="_browser_src_subproviders_remote_accounts_"></a>


<a id="_browser_src_subproviders_remote_accounts_.remoteaccountsubprovider"></a>

##  RemoteAccountSubprovider





---

### Properties



---

### Methods






<a id="_browser_src_subproviders_remote_accounts_.remoteaccountsubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [packages/browser/src/subproviders/remote-accounts.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/remote-accounts.ts#L7)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |


























---


### Relationships
##### Extends
* AuthenticatedFetchSubprovider

---



---

<a id="_browser_src_subproviders_rest_fetch_"></a>


<a id="_browser_src_subproviders_rest_fetch_.restfetchsubprovider"></a>

##  RestFetchSubprovider


<a id="_browser_src_subproviders_rest_fetch_.restfetchsubprovider.constructor"></a>
### constructor
```typescript
new RestFetchSubprovider(opts: RestFetchSubproviderOptions): RestFetchSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| opts | [RestFetchSubproviderOptions](#_browser_src_subproviders_rest_fetch_.restfetchsubprovideroptions)   |  - |



##### Return Value
[RestFetchSubprovider](#_browser_src_subproviders_rest_fetch_.restfetchsubprovider)





---

### Properties



---

### Methods





<a id="_browser_src_subproviders_rest_fetch_.restfetchsubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: JSONRPCRequest, next: NextHandler, end: CompletionHandler)
```
<small>*Defined in [packages/browser/src/subproviders/rest-fetch.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/rest-fetch.ts#L39)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JSONRPCRequest`   |  - |
| next | `NextHandler`   |  - |
| end | `CompletionHandler`   |  - |

























---


### Relationships
##### Extends
* Subprovider

---


<a id="_browser_src_subproviders_rest_fetch_.restfetchsubprovideroptions"></a>

####  RestFetchSubproviderOptions





### Properties
<a id="_browser_src_subproviders_rest_fetch_.restfetchsubprovideroptions.defaultheaders"></a>

#### defaultHeaders
```javascript
var defaultHeaders: undefined | object
```
<small>*Defined in [packages/browser/src/subproviders/rest-fetch.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/rest-fetch.ts#L22)*</small>


<a id="_browser_src_subproviders_rest_fetch_.restfetchsubprovideroptions.originhttpheaderkey"></a>

#### originHttpHeaderKey
```javascript
var originHttpHeaderKey: undefined | string
```
<small>*Defined in [packages/browser/src/subproviders/rest-fetch.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/rest-fetch.ts#L23)*</small>


<a id="_browser_src_subproviders_rest_fetch_.restfetchsubprovideroptions.rpcurl"></a>

#### rpcUrl
```javascript
var rpcUrl: string
```
<small>*Defined in [packages/browser/src/subproviders/rest-fetch.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/rest-fetch.ts#L21)*</small>





<a id="_browser_src_subproviders_rest_fetch_.matching_methods"></a>

#### «Const» MATCHING_METHODS


```javascript
var MATCHING_METHODS: string[] =  ['eth_getBlockByNumber', 'eth_blockNumber', 'net_Version', 'eth_getLogs']
```
<small>*Defined in [packages/browser/src/subproviders/rest-fetch.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/rest-fetch.ts#L18)*</small>





<a id="_browser_src_subproviders_rest_fetch_.retriable_errors"></a>

#### «Const» RETRIABLE_ERRORS


```javascript
var RETRIABLE_ERRORS: string[] =  [
  // ignore server overload errors
  'Gateway timeout',
  'ETIMEDOUT',
  // ignore server sent html error pages
  // or truncated json responses
  'SyntaxError',
]
```
<small>*Defined in [packages/browser/src/subproviders/rest-fetch.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/rest-fetch.ts#L9)*</small>






### Functions
<a id="_browser_src_subproviders_rest_fetch_.createratelimiterror"></a>

###  createRatelimitError




##### Declaration


```typescript
function createRatelimitError(): any
```
<small>*Defined in [packages/browser/src/subproviders/rest-fetch.ts:135](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/rest-fetch.ts#L135)*</small>



##### Return Value
`any`







<a id="_browser_src_subproviders_rest_fetch_.createtimeouterror"></a>

###  createTimeoutError




##### Declaration


```typescript
function createTimeoutError(): any
```
<small>*Defined in [packages/browser/src/subproviders/rest-fetch.ts:141](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/rest-fetch.ts#L141)*</small>



##### Return Value
`any`







<a id="_browser_src_subproviders_rest_fetch_.iserrorretriable"></a>

###  isErrorRetriable




##### Declaration


```typescript
function isErrorRetriable(err: any): boolean
```
<small>*Defined in [packages/browser/src/subproviders/rest-fetch.ts:130](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/rest-fetch.ts#L130)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| err | `any`   |  - |



##### Return Value
`boolean`









---

<a id="_browser_src_subproviders_signature_"></a>


<a id="_browser_src_subproviders_signature_.transactionkind"></a>

####  TransactionKind





<a id="_browser_src_subproviders_signature_.transactionkind.sendtransaction"></a>

####  SendTransaction


```javascript
var SendTransaction:  = "ETH_SEND_TRANSACTION"
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L12)*</small>





<a id="_browser_src_subproviders_signature_.transactionkind.sign"></a>

####  Sign


```javascript
var Sign:  = "ETH_SIGN"
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L14)*</small>





<a id="_browser_src_subproviders_signature_.transactionkind.signtransaction"></a>

####  SignTransaction


```javascript
var SignTransaction:  = "ETH_SIGN_TRANSACTION"
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L13)*</small>





<a id="_browser_src_subproviders_signature_.transactionkind.signtypeddata"></a>

####  SignTypedData


```javascript
var SignTypedData:  = "ETH_SIGN_TYPED_DATA"
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L15)*</small>








<a id="_browser_src_subproviders_signature_.signaturesubprovider"></a>

##  SignatureSubprovider


<a id="_browser_src_subproviders_signature_.signaturesubprovider.constructor"></a>
### constructor
```typescript
new SignatureSubprovider(network: Network, signer: BitskiTransactionSigner, tokenProvider: AccessTokenProvider, signatureMethods: string[]): SignatureSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| network | `Network`   |  - |
| signer | [BitskiTransactionSigner](#_browser_src_signing_transaction_signer_.bitskitransactionsigner)   |  - |
| tokenProvider | `AccessTokenProvider`   |  - |
| signatureMethods | `string[]`   |  - |



##### Return Value
[SignatureSubprovider](#_browser_src_subproviders_signature_.signaturesubprovider)





---

### Properties



---

### Methods





<a id="_browser_src_subproviders_signature_.signaturesubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: JSONRPCRequestPayload, next: function, end: JSONRPCResponseHandler)
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:136](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L136)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JSONRPCRequestPayload`   |  RPC request payload |
| next | `function`   |  Callback to skip handling this request |
| end | [JSONRPCResponseHandler](#_browser_src_subproviders_signature_.jsonrpcresponsehandler)   |  Completion handler |








<a id="_browser_src_subproviders_signature_.signaturesubprovider.handlesignaturerequest"></a>

#### handleSignatureRequest




##### Declaration


```typescript
function handleSignatureRequest(payload: JSONRPCRequestPayload, callback: JSONRPCResponseHandler): Promise<void>
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:149](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L149)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JSONRPCRequestPayload`   |  The JSON-RPC request |
| callback | [JSONRPCResponseHandler](#_browser_src_subproviders_signature_.jsonrpcresponsehandler)   |  The callback to call when the request has been handled |



##### Return Value
`Promise<void>`
























---


### Relationships
##### Extends
* Subprovider

---


<a id="_browser_src_subproviders_signature_.signaturepayload"></a>

####  SignaturePayload





### Properties
<a id="_browser_src_subproviders_signature_.signaturepayload.from"></a>

#### from
```javascript
var from: string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:32](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L32)*</small>


<a id="_browser_src_subproviders_signature_.signaturepayload.message"></a>

#### message
```javascript
var message: string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L33)*</small>




<a id="_browser_src_subproviders_signature_.transaction"></a>

####  Transaction





### Properties
<a id="_browser_src_subproviders_signature_.transaction.context"></a>

#### context
```javascript
var context: TransactionContext
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L22)*</small>


<a id="_browser_src_subproviders_signature_.transaction.id"></a>

#### id
```javascript
var id: string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L19)*</small>


<a id="_browser_src_subproviders_signature_.transaction.kind"></a>

#### kind
```javascript
var kind: TransactionKind
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L20)*</small>


<a id="_browser_src_subproviders_signature_.transaction.payload"></a>

#### payload
```javascript
var payload: TransactionPayload | SignaturePayload
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L21)*</small>




<a id="_browser_src_subproviders_signature_.transactioncontext"></a>

####  TransactionContext





### Properties
<a id="_browser_src_subproviders_signature_.transactioncontext.chainid"></a>

#### chainId
```javascript
var chainId: undefined | number
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L26)*</small>


<a id="_browser_src_subproviders_signature_.transactioncontext.currentbalance"></a>

#### currentBalance
```javascript
var currentBalance: undefined | string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:27](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L27)*</small>


<a id="_browser_src_subproviders_signature_.transactioncontext.from-1"></a>

#### from
```javascript
var from: undefined | string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:28](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L28)*</small>




<a id="_browser_src_subproviders_signature_.transactionpayload"></a>

####  TransactionPayload





### Properties
<a id="_browser_src_subproviders_signature_.transactionpayload.data"></a>

#### data
```javascript
var data: undefined | string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:40](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L40)*</small>


<a id="_browser_src_subproviders_signature_.transactionpayload.from-2"></a>

#### from
```javascript
var from: string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:37](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L37)*</small>


<a id="_browser_src_subproviders_signature_.transactionpayload.gas"></a>

#### gas
```javascript
var gas: undefined | string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L42)*</small>


<a id="_browser_src_subproviders_signature_.transactionpayload.gasprice"></a>

#### gasPrice
```javascript
var gasPrice: undefined | string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:43](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L43)*</small>


<a id="_browser_src_subproviders_signature_.transactionpayload.nonce"></a>

#### nonce
```javascript
var nonce: undefined | string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:41](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L41)*</small>


<a id="_browser_src_subproviders_signature_.transactionpayload.to"></a>

#### to
```javascript
var to: undefined | string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:38](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L38)*</small>


<a id="_browser_src_subproviders_signature_.transactionpayload.value"></a>

#### value
```javascript
var value: undefined | string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L39)*</small>




<a id="_browser_src_subproviders_signature_.typeddatadefinition"></a>

####  TypedDataDefinition





### Properties
<a id="_browser_src_subproviders_signature_.typeddatadefinition.name"></a>

#### name
```javascript
var name: string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L47)*</small>


<a id="_browser_src_subproviders_signature_.typeddatadefinition.type"></a>

#### type
```javascript
var type: string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:48](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L48)*</small>




<a id="_browser_src_subproviders_signature_.typeddatapayload"></a>

####  TypedDataPayload





### Properties
<a id="_browser_src_subproviders_signature_.typeddatapayload.domain"></a>

#### domain
```javascript
var domain: object
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:98](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L98)*</small>


<a id="_browser_src_subproviders_signature_.typeddatapayload.message-1"></a>

#### message
```javascript
var message: object
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:100](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L100)*</small>


<a id="_browser_src_subproviders_signature_.typeddatapayload.primarytype"></a>

#### primaryType
```javascript
var primaryType: string
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:99](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L99)*</small>


<a id="_browser_src_subproviders_signature_.typeddatapayload.types"></a>

#### types
```javascript
var types: object
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:94](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L94)*</small>

##### Type declaration


[propName: `string`]: `TypedDataDefinition[]`





 EIP712Domain: `TypedDataDefinition[]`








<a id="_browser_src_subproviders_signature_.jsonrpcresponsehandler"></a>

####  JSONRPCResponseHandler


```javascript
var JSONRPCResponseHandler: function
```
<small>*Defined in [packages/browser/src/subproviders/signature.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/subproviders/signature.ts#L9)*</small>

##### Type declaration
function (error: JsonRpcError, result: any)
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| error | `JsonRpcError`   |  - |
| result | `any`   |  - |












---

<a id="_browser_src_utils_localstorage_store_"></a>


<a id="_browser_src_utils_localstorage_store_.localstoragestore"></a>

##  LocalStorageStore


<a id="_browser_src_utils_localstorage_store_.localstoragestore.constructor"></a>
### constructor
```typescript
new LocalStorageStore(storage?: Storage): LocalStorageStore
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| storage | `Storage`  |  localStorage |   - |



##### Return Value
[LocalStorageStore](#_browser_src_utils_localstorage_store_.localstoragestore)





---

### Methods
<a id="_browser_src_utils_localstorage_store_.localstoragestore.clear"></a>

#### clear




##### Declaration


```typescript
function clear()
```
<small>*Defined in [packages/browser/src/utils/localstorage-store.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/utils/localstorage-store.ts#L13)*</small>








<a id="_browser_src_utils_localstorage_store_.localstoragestore.clearitem"></a>

#### clearItem




##### Declaration


```typescript
function clearItem(key: string)
```
<small>*Defined in [packages/browser/src/utils/localstorage-store.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/utils/localstorage-store.ts#L25)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `string`   |  - |








<a id="_browser_src_utils_localstorage_store_.localstoragestore.getitem"></a>

#### getItem




##### Declaration


```typescript
function getItem(key: string): any
```
<small>*Defined in [packages/browser/src/utils/localstorage-store.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/utils/localstorage-store.ts#L17)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `string`   |  - |



##### Return Value
`any`







<a id="_browser_src_utils_localstorage_store_.localstoragestore.setitem"></a>

#### setItem




##### Declaration


```typescript
function setItem(key: string, value: any)
```
<small>*Defined in [packages/browser/src/utils/localstorage-store.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/utils/localstorage-store.ts#L21)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `string`   |  - |
| value | `any`   |  - |










---


### Relationships
##### Implements
* [&quot;browser/src/utils/store&quot;](#_browser_src_utils_store_).[Store](#_browser_src_utils_store_.store)

---



---

<a id="_browser_src_utils_no_hash_query_string_utils_"></a>


<a id="_browser_src_utils_no_hash_query_string_utils_.nohashquerystringutils"></a>

##  NoHashQueryStringUtils


### Methods
<a id="_browser_src_utils_no_hash_query_string_utils_.nohashquerystringutils.parse"></a>

#### parse




##### Declaration


```typescript
function parse(input: LocationLike, useHash: undefined | false | true): StringMap
```
<small>*Defined in [packages/browser/src/utils/no-hash-query-string-utils.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/utils/no-hash-query-string-utils.ts#L8)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| input | `LocationLike`   |  - |
| useHash | `undefined          ⎮false          ⎮true`   |  - |



##### Return Value
`StringMap`











---


### Relationships
##### Extends
* BasicQueryStringUtils
##### Implements
* QueryStringUtils

---



---

<a id="_browser_src_utils_popup_validator_"></a>


<a id="_browser_src_utils_popup_validator_.popupvalidator"></a>

##  PopupValidator


<a id="_browser_src_utils_popup_validator_.popupvalidator.constructor"></a>
### constructor
```typescript
new PopupValidator(errorHandler: function): PopupValidator
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| errorHandler | `function`   |  - |



##### Return Value
[PopupValidator](#_browser_src_utils_popup_validator_.popupvalidator)





---

### Methods
<a id="_browser_src_utils_popup_validator_.popupvalidator.check"></a>

#### check




##### Declaration


```typescript
function check(popup: Window | null)
```
<small>*Defined in [packages/browser/src/utils/popup-validator.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/utils/popup-validator.ts#L17)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| popup | `Window          ⎮null`   |  - |










---



---



---

<a id="_browser_src_utils_request_utils_"></a>


### Functions
<a id="_browser_src_utils_request_utils_.parseresponse"></a>

###  parseResponse




##### Declaration


```typescript
function parseResponseT(response: Response): Promise<T>
```
<small>*Defined in [packages/browser/src/utils/request-utils.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/utils/request-utils.ts#L8)*</small>



##### Type parameters

#### T 
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| response | `Response`   |  the fetch response to parse |



##### Return Value
`Promise<T>`









---

<a id="_browser_src_utils_store_"></a>


<a id="_browser_src_utils_store_.store"></a>

####  Store





### Methods
<a id="_browser_src_utils_store_.store.clear"></a>

#### clear




##### Declaration


```typescript
function clear(): any
```
<small>*Defined in [packages/browser/src/utils/store.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/utils/store.ts#L5)*</small>



##### Return Value
`any`







<a id="_browser_src_utils_store_.store.clearitem"></a>

#### clearItem




##### Declaration


```typescript
function clearItem(key: any): any
```
<small>*Defined in [packages/browser/src/utils/store.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/utils/store.ts#L14)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `any`   |  - |



##### Return Value
`any`







<a id="_browser_src_utils_store_.store.getitem"></a>

#### getItem




##### Declaration


```typescript
function getItem(key: any): any
```
<small>*Defined in [packages/browser/src/utils/store.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/utils/store.ts#L8)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `any`   |  - |



##### Return Value
`any`







<a id="_browser_src_utils_store_.store.setitem"></a>

#### setItem




##### Declaration


```typescript
function setItem(key: any, value: any): any
```
<small>*Defined in [packages/browser/src/utils/store.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/browser/src/utils/store.ts#L11)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `any`   |  - |
| value | `any`   |  - |



##### Return Value
`any`











---

<a id="_provider_src_auth_access_token_"></a>


<a id="_provider_src_auth_access_token_.accesstoken"></a>

##  AccessToken


<a id="_provider_src_auth_access_token_.accesstoken.constructor"></a>
### constructor
```typescript
new AccessToken(token: string, expiresIn: undefined | number): AccessToken
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| token | `string`   |  - |
| expiresIn | `undefined          ⎮number`   |  - |



##### Return Value
[AccessToken](#_provider_src_auth_access_token_.accesstoken)





---

### Properties
<a id="_provider_src_auth_access_token_.accesstoken.expiresat"></a>

#### expiresAt
```javascript
var expiresAt: undefined | number =  undefined
```
<small>*Defined in [packages/provider/src/auth/access-token.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/auth/access-token.ts#L6)*</small>


<a id="_provider_src_auth_access_token_.accesstoken.token"></a>

#### token
```javascript
var token: string
```
<small>*Defined in [packages/provider/src/auth/access-token.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/auth/access-token.ts#L5)*</small>




---

<a id="_provider_src_auth_access_token_.accesstoken.expired"></a>

####  expired


```javascript
var expired: 
```
<small>*Defined in [packages/provider/src/auth/access-token.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/auth/access-token.ts#L8)*</small>







---



---



---

<a id="_provider_src_auth_access_token_provider_"></a>


<a id="_provider_src_auth_access_token_provider_.accesstokenprovider"></a>

####  AccessTokenProvider





### Methods
<a id="_provider_src_auth_access_token_provider_.accesstokenprovider.getaccesstoken"></a>

#### getAccessToken




##### Declaration


```typescript
function getAccessToken(): Promise<string>
```
<small>*Defined in [packages/provider/src/auth/access-token-provider.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/auth/access-token-provider.ts#L2)*</small>



##### Return Value
`Promise<string>`







<a id="_provider_src_auth_access_token_provider_.accesstokenprovider.invalidatetoken"></a>

#### invalidateToken




##### Declaration


```typescript
function invalidateToken(): Promise<void>
```
<small>*Defined in [packages/provider/src/auth/access-token-provider.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/auth/access-token-provider.ts#L3)*</small>



##### Return Value
`Promise<void>`











---

<a id="_provider_src_bitski_engine_"></a>


<a id="_provider_src_bitski_engine_.bitskiengine"></a>

##  BitskiEngine


<a id="_provider_src_bitski_engine_.bitskiengine.constructor"></a>
### constructor
```typescript
new BitskiEngine(options: BitskiEngineOptions): BitskiEngine
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [BitskiEngineOptions](#_provider_src_bitski_engine_.bitskiengineoptions)   |  - |



##### Return Value
[BitskiEngine](#_provider_src_bitski_engine_.bitskiengine)





---

### Properties




---

### Methods






















<a id="_provider_src_bitski_engine_.bitskiengine.subscribe"></a>

#### subscribe




##### Declaration


```typescript
function subscribe(subscribeMethod?: string, subscriptionMethod: string, parameters: any[]): Promise<string>
```
<small>*Defined in [packages/provider/src/bitski-engine.ts:77](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/bitski-engine.ts#L77)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| subscribeMethod | `string`  | &quot;eth_subscribe&quot; |   - |
| subscriptionMethod | `string`  | - |   - |
| parameters | `any[]`  | - |   - |



##### Return Value
`Promise<string>`







<a id="_provider_src_bitski_engine_.bitskiengine.supportssubscriptions"></a>

#### supportsSubscriptions




##### Declaration


```typescript
function supportsSubscriptions(): boolean
```
<small>*Defined in [packages/provider/src/bitski-engine.ts:73](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/bitski-engine.ts#L73)*</small>



##### Return Value
`boolean`







<a id="_provider_src_bitski_engine_.bitskiengine.unsubscribe"></a>

#### unsubscribe




##### Declaration


```typescript
function unsubscribe(subscriptionId: string, unsubscribeMethod?: string): Promise<boolean>
```
<small>*Defined in [packages/provider/src/bitski-engine.ts:83](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/bitski-engine.ts#L83)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| subscriptionId | `string`  | - |   - |
| unsubscribeMethod | `string`  | &quot;eth_unsubscribe&quot; |   - |



##### Return Value
`Promise<boolean>`










---


### Relationships
##### Extends
* Web3ProviderEngine

---


<a id="_provider_src_bitski_engine_.bitskiengineoptions"></a>

####  BitskiEngineOptions





### Properties
<a id="_provider_src_bitski_engine_.bitskiengineoptions.disableblocktracking"></a>

#### disableBlockTracking
```javascript
var disableBlockTracking: undefined | false | true
```
<small>*Defined in [packages/provider/src/bitski-engine.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/bitski-engine.ts#L23)*</small>


<a id="_provider_src_bitski_engine_.bitskiengineoptions.disablecaching"></a>

#### disableCaching
```javascript
var disableCaching: undefined | false | true
```
<small>*Defined in [packages/provider/src/bitski-engine.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/bitski-engine.ts#L19)*</small>


<a id="_provider_src_bitski_engine_.bitskiengineoptions.disablevalidation"></a>

#### disableValidation
```javascript
var disableValidation: undefined | false | true
```
<small>*Defined in [packages/provider/src/bitski-engine.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/bitski-engine.ts#L21)*</small>


<a id="_provider_src_bitski_engine_.bitskiengineoptions.mingasprice"></a>

#### minGasPrice
```javascript
var minGasPrice: undefined | number
```
<small>*Defined in [packages/provider/src/bitski-engine.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/bitski-engine.ts#L25)*</small>


<a id="_provider_src_bitski_engine_.bitskiengineoptions.pollinginterval"></a>

#### pollingInterval
```javascript
var pollingInterval: undefined | number
```
<small>*Defined in [packages/provider/src/bitski-engine.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/bitski-engine.ts#L17)*</small>






---

<a id="_provider_src_constants_"></a>


<a id="_provider_src_constants_.authenticated_methods"></a>

#### «Const» AUTHENTICATED_METHODS


```javascript
var AUTHENTICATED_METHODS: string[] =  [
  'eth_accounts',
  'eth_sendTransaction',
  'eth_signTransaction',
  'eth_signTypedData',
  'personal_sign',
  'eth_sign',
]
```
<small>*Defined in [packages/provider/src/constants.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/constants.ts#L2)*</small>





<a id="_provider_src_constants_.retriable_errors"></a>

#### «Const» RETRIABLE_ERRORS


```javascript
var RETRIABLE_ERRORS: string[] =  [
  // ignore server overload errors
  'Gateway timeout',
  'ETIMEDOUT',
  'ENOTFOUND', // DNS error
  // ignore server sent html error pages
  // or truncated json responses
  'SyntaxError',
  'ECONNRESET',
  'EHOSTUNREACH',
  'Timeout out while waiting for response', // Actix timeout
]
```
<small>*Defined in [packages/provider/src/constants.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/constants.ts#L12)*</small>





<a id="_provider_src_constants_.unauthorized_errors"></a>

#### «Const» UNAUTHORIZED_ERRORS


```javascript
var UNAUTHORIZED_ERRORS: string[] =  [
  'Missing auth', // No token sent
  'Invalid client id', // Wrong client id, or invalid access token
  'Not Authorized',
]
```
<small>*Defined in [packages/provider/src/constants.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/constants.ts#L26)*</small>







---

<a id="_provider_src_errors_provider_error_"></a>


<a id="_provider_src_errors_provider_error_.providererrorcode"></a>

####  ProviderErrorCode





<a id="_provider_src_errors_provider_error_.providererrorcode.invalidrequest"></a>

####  InvalidRequest


```javascript
var InvalidRequest:  = 4001
```
<small>*Defined in [packages/provider/src/errors/provider-error.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/errors/provider-error.ts#L5)*</small>





<a id="_provider_src_errors_provider_error_.providererrorcode.subscriptionsunavailable"></a>

####  SubscriptionsUnavailable


```javascript
var SubscriptionsUnavailable:  = 4000
```
<small>*Defined in [packages/provider/src/errors/provider-error.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/errors/provider-error.ts#L3)*</small>








<a id="_provider_src_errors_provider_error_.providererror"></a>

##  ProviderError


<a id="_provider_src_errors_provider_error_.providererror.constructor"></a>
### constructor
```typescript
new ProviderError(message: string, code: ProviderErrorCode): ProviderError
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string`   |  - |
| code | [ProviderErrorCode](#_provider_src_errors_provider_error_.providererrorcode)   |  - |



##### Return Value
[ProviderError](#_provider_src_errors_provider_error_.providererror)





---

### Properties
<a id="_provider_src_errors_provider_error_.providererror.code"></a>

#### code
```javascript
var code: ProviderErrorCode
```
<small>*Defined in [packages/provider/src/errors/provider-error.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/errors/provider-error.ts#L19)*</small>



<a id="_provider_src_errors_provider_error_.providererror.name"></a>

#### name
```javascript
var name: string = "ProviderError"
```
<small>*Defined in [packages/provider/src/errors/provider-error.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/errors/provider-error.ts#L18)*</small>



<a id="_provider_src_errors_provider_error_.providererror.error"></a>

#### Error
```javascript
var Error: ErrorConstructor
```
<small>*Defined in [node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:984](https://github.com/BitskiCo/bitski-js/blob/master/packages/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts#L984)*</small>




---

### Methods
<a id="_provider_src_errors_provider_error_.providererror.invalidrequest-1"></a>

#### InvalidRequest




##### Declaration


```typescript
function InvalidRequest(reason: string): ProviderError<>
```
<small>*Defined in [packages/provider/src/errors/provider-error.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/errors/provider-error.ts#L14)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| reason | `string`   |  - |



##### Return Value
[ProviderError](#_provider_src_errors_provider_error_.providererror)







<a id="_provider_src_errors_provider_error_.providererror.subscriptionsunavailable-1"></a>

#### SubscriptionsUnavailable




##### Declaration


```typescript
function SubscriptionsUnavailable(): ProviderError<>
```
<small>*Defined in [packages/provider/src/errors/provider-error.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/errors/provider-error.ts#L10)*</small>



##### Return Value
[ProviderError](#_provider_src_errors_provider_error_.providererror)









---


### Relationships
##### Extends
* Error

---



---

<a id="_provider_src_errors_server_error_"></a>


<a id="_provider_src_errors_server_error_.servererror"></a>

##  ServerError


<a id="_provider_src_errors_server_error_.servererror.constructor"></a>
### constructor
```typescript
new ServerError(message: string, code: number, requestURI: string, retried?: boolean): ServerError
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| message | `string`  | - |   - |
| code | `number`  | - |   - |
| requestURI | `string`  | - |   - |
| retried | `boolean`  | false |   - |



##### Return Value
[ServerError](#_provider_src_errors_server_error_.servererror)





---

### Properties
<a id="_provider_src_errors_server_error_.servererror.code"></a>

#### code
```javascript
var code: number
```
<small>*Defined in [packages/provider/src/errors/server-error.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/errors/server-error.ts#L10)*</small>



<a id="_provider_src_errors_server_error_.servererror.name"></a>

#### name
```javascript
var name: string = "ServerError"
```
<small>*Defined in [packages/provider/src/errors/server-error.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/errors/server-error.ts#L7)*</small>


<a id="_provider_src_errors_server_error_.servererror.requesturi"></a>

#### requestURI
```javascript
var requestURI: string
```
<small>*Defined in [packages/provider/src/errors/server-error.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/errors/server-error.ts#L16)*</small>


<a id="_provider_src_errors_server_error_.servererror.retried"></a>

#### retried
```javascript
var retried: boolean
```
<small>*Defined in [packages/provider/src/errors/server-error.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/errors/server-error.ts#L13)*</small>



<a id="_provider_src_errors_server_error_.servererror.error"></a>

#### Error
```javascript
var Error: ErrorConstructor
```
<small>*Defined in [node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:984](https://github.com/BitskiCo/bitski-js/blob/master/packages/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts#L984)*</small>




---


### Relationships
##### Extends
* Error

---



---

<a id="_provider_src_index_"></a>


<a id="_provider_src_index_.jsonrpcrequestpayload"></a>

####  JSONRPCRequestPayload





### Properties
<a id="_provider_src_index_.jsonrpcrequestpayload.id"></a>

#### id
```javascript
var id: number
```
<small>*Defined in [packages/provider/src/index.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/index.ts#L12)*</small>


<a id="_provider_src_index_.jsonrpcrequestpayload.jsonrpc"></a>

#### jsonrpc
```javascript
var jsonrpc: string
```
<small>*Defined in [packages/provider/src/index.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/index.ts#L13)*</small>


<a id="_provider_src_index_.jsonrpcrequestpayload.method"></a>

#### method
```javascript
var method: string
```
<small>*Defined in [packages/provider/src/index.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/index.ts#L11)*</small>


<a id="_provider_src_index_.jsonrpcrequestpayload.params"></a>

#### params
```javascript
var params: any[]
```
<small>*Defined in [packages/provider/src/index.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/index.ts#L10)*</small>




<a id="_provider_src_index_.jsonrpcresponsepayload"></a>

####  JSONRPCResponsePayload





### Properties
<a id="_provider_src_index_.jsonrpcresponsepayload.id-1"></a>

#### id
```javascript
var id: number
```
<small>*Defined in [packages/provider/src/index.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/index.ts#L18)*</small>


<a id="_provider_src_index_.jsonrpcresponsepayload.jsonrpc-1"></a>

#### jsonrpc
```javascript
var jsonrpc: string
```
<small>*Defined in [packages/provider/src/index.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/index.ts#L19)*</small>


<a id="_provider_src_index_.jsonrpcresponsepayload.result"></a>

#### result
```javascript
var result: any
```
<small>*Defined in [packages/provider/src/index.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/index.ts#L17)*</small>






---

<a id="_provider_src_network_"></a>


<a id="_provider_src_network_.network"></a>

####  Network





### Properties
<a id="_provider_src_network_.network.chainid"></a>

#### chainId
```javascript
var chainId: number
```
<small>*Defined in [packages/provider/src/network.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/network.ts#L3)*</small>


<a id="_provider_src_network_.network.rpcurl"></a>

#### rpcUrl
```javascript
var rpcUrl: string
```
<small>*Defined in [packages/provider/src/network.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/network.ts#L2)*</small>





<a id="_provider_src_network_.polygon"></a>

## Polygon


<a id="_provider_src_network_.polygon.chainid-1"></a>

####  chainId


```javascript
var chainId: number = 42
```
<small>*Defined in [packages/provider/src/network.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/network.ts#L17)*</small>





<a id="_provider_src_network_.polygon.rpcurl-1"></a>

####  rpcUrl


```javascript
var rpcUrl: string = "https://api.bitski.com/v1/web3/polygon"
```
<small>*Defined in [packages/provider/src/network.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/network.ts#L18)*</small>







<a id="_provider_src_network_.mainnet"></a>

## Mainnet


<a id="_provider_src_network_.mainnet.chainid-2"></a>

####  chainId


```javascript
var chainId: number = 1
```
<small>*Defined in [packages/provider/src/network.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/network.ts#L7)*</small>





<a id="_provider_src_network_.mainnet.rpcurl-2"></a>

####  rpcUrl


```javascript
var rpcUrl: string = "https://api.bitski.com/v1/web3/mainnet"
```
<small>*Defined in [packages/provider/src/network.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/network.ts#L8)*</small>







<a id="_provider_src_network_.rinkeby"></a>

## Rinkeby


<a id="_provider_src_network_.rinkeby.chainid-3"></a>

####  chainId


```javascript
var chainId: number = 4
```
<small>*Defined in [packages/provider/src/network.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/network.ts#L12)*</small>





<a id="_provider_src_network_.rinkeby.rpcurl-3"></a>

####  rpcUrl


```javascript
var rpcUrl: string = "https://api.bitski.com/v1/web3/rinkeby"
```
<small>*Defined in [packages/provider/src/network.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/network.ts#L13)*</small>









---

<a id="_provider_src_subproviders_authenticated_fetch_"></a>


<a id="_provider_src_subproviders_authenticated_fetch_.authenticatedfetchsubprovider"></a>

##  AuthenticatedFetchSubprovider


<a id="_provider_src_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.constructor"></a>
### constructor
```typescript
new AuthenticatedFetchSubprovider(rpcUrl: string, debug: boolean, accessTokenProvider: AccessTokenProvider, defaultHeaders?: object): AuthenticatedFetchSubprovider
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| rpcUrl | `string`  | - |   - |
| debug | `boolean`  | - |   - |
| accessTokenProvider | [AccessTokenProvider](#_provider_src_auth_access_token_provider_.accesstokenprovider)  | - |   - |
| defaultHeaders | `object`  |  {} |   - |



##### Return Value
[AuthenticatedFetchSubprovider](#_provider_src_subproviders_authenticated_fetch_.authenticatedfetchsubprovider)





---

### Properties



---

### Methods





<a id="_provider_src_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.handleauthenticatedrequest"></a>

#### handleAuthenticatedRequest




##### Declaration


```typescript
function handleAuthenticatedRequest(payload: any, next: any, end: any)
```
<small>*Defined in [packages/provider/src/subproviders/authenticated-fetch.ts:30](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/authenticated-fetch.ts#L30)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="_provider_src_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [packages/provider/src/subproviders/authenticated-fetch.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/authenticated-fetch.ts#L22)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="_provider_src_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.handleunauthenticatedrequest"></a>

#### handleUnauthenticatedRequest




##### Declaration


```typescript
function handleUnauthenticatedRequest(payload: any, next: any, end: any)
```
<small>*Defined in [packages/provider/src/subproviders/authenticated-fetch.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/authenticated-fetch.ts#L39)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |

























---


### Relationships
##### Extends
* FetchSubprovider

---



---

<a id="_provider_src_subproviders_nonce_tracker_"></a>


<a id="_provider_src_subproviders_nonce_tracker_.noncetrackersubprovider"></a>

##  NonceTrackerSubprovider


<a id="_provider_src_subproviders_nonce_tracker_.noncetrackersubprovider.constructor"></a>
### constructor
```typescript
new NonceTrackerSubprovider(): NonceTrackerSubprovider
```
##### Return Value
[NonceTrackerSubprovider](#_provider_src_subproviders_nonce_tracker_.noncetrackersubprovider)





---

### Properties



---

### Methods





<a id="_provider_src_subproviders_nonce_tracker_.noncetrackersubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [packages/provider/src/subproviders/nonce-tracker.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/nonce-tracker.ts#L17)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |

























---


### Relationships
##### Extends
* Subprovider

---



---

<a id="_provider_src_subproviders_transaction_validator_"></a>


<a id="_provider_src_subproviders_transaction_validator_.transactionvalidatorsubprovider"></a>

##  TransactionValidatorSubprovider


<a id="_provider_src_subproviders_transaction_validator_.transactionvalidatorsubprovider.constructor"></a>
### constructor
```typescript
new TransactionValidatorSubprovider(minGasPrice?: number): TransactionValidatorSubprovider
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| minGasPrice | `number`  | 0 |   - |



##### Return Value
[TransactionValidatorSubprovider](#_provider_src_subproviders_transaction_validator_.transactionvalidatorsubprovider)





---

### Properties



---

### Methods





<a id="_provider_src_subproviders_transaction_validator_.transactionvalidatorsubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, _: any)
```
<small>*Defined in [packages/provider/src/subproviders/transaction-validator.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/transaction-validator.ts#L16)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| _ | `any`   |  - |

























---


### Relationships
##### Extends
* Subprovider

---



---

<a id="_provider_src_subproviders_typed_data_"></a>


<a id="_provider_src_subproviders_typed_data_.typeddatasanitizersubprovider"></a>

##  TypedDataSanitizerSubprovider


### Properties



---

### Methods





<a id="_provider_src_subproviders_typed_data_.typeddatasanitizersubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: JSONRPCRequestPayload, next: function, end: function)
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L33)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | [JSONRPCRequestPayload](#_provider_src_index_.jsonrpcrequestpayload)   |  - |
| next | `function`   |  - |
| end | `function`   |  - |

























---


### Relationships
##### Extends
* Subprovider

---


<a id="_provider_src_subproviders_typed_data_.propertydef"></a>

####  PropertyDef





### Properties
<a id="_provider_src_subproviders_typed_data_.propertydef.name"></a>

#### name
```javascript
var name: string
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L7)*</small>


<a id="_provider_src_subproviders_typed_data_.propertydef.type"></a>

#### type
```javascript
var type: string
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L8)*</small>




<a id="_provider_src_subproviders_typed_data_.typemapping"></a>

####  TypeMapping


```javascript
var TypeMapping: 
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L25)*</small>





<a id="_provider_src_subproviders_typed_data_.typeddata"></a>

####  TypedData





### Properties
<a id="_provider_src_subproviders_typed_data_.typeddata.domain"></a>

#### domain
```javascript
var domain: any
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L20)*</small>


<a id="_provider_src_subproviders_typed_data_.typeddata.message"></a>

#### message
```javascript
var message: any
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L22)*</small>


<a id="_provider_src_subproviders_typed_data_.typeddata.primarytype"></a>

#### primaryType
```javascript
var primaryType: string
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L21)*</small>


<a id="_provider_src_subproviders_typed_data_.typeddata.types"></a>

#### types
```javascript
var types: TypedDataTypes
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L19)*</small>




<a id="_provider_src_subproviders_typed_data_.typeddatatypes"></a>

####  TypedDataTypes





### Properties
<a id="_provider_src_subproviders_typed_data_.typeddatatypes.eip712domain"></a>

#### EIP712Domain
```javascript
var EIP712Domain: TypeDefinition
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L14)*</small>





<a id="_provider_src_subproviders_typed_data_.typedefinition"></a>

####  TypeDefinition


```javascript
var TypeDefinition: PropertyDef[]
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L11)*</small>






### Functions
<a id="_provider_src_subproviders_typed_data_.createtypemapping"></a>

###  createTypeMapping




##### Declaration


```typescript
function createTypeMapping(typedData: TypedData): TypeMapping
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:182](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L182)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| typedData | [TypedData](#_provider_src_subproviders_typed_data_.typeddata)   |  The TypedData to map |



##### Return Value
[TypeMapping](#_provider_src_subproviders_typed_data_.typemapping)


the mapped data schema






<a id="_provider_src_subproviders_typed_data_.isarray"></a>

###  isArray




##### Declaration


```typescript
function isArray(typeName: string): boolean
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:159](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L159)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| typeName | `string`   |  solidity type name |



##### Return Value
`boolean`







<a id="_provider_src_subproviders_typed_data_.sanitizedomain"></a>

###  sanitizeDomain




##### Declaration


```typescript
function sanitizeDomain(typedData: TypedData, typeMapping: TypeMapping)
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:77](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L77)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| typedData | [TypedData](#_provider_src_subproviders_typed_data_.typeddata)   |  TypedData payload |
| typeMapping | [TypeMapping](#_provider_src_subproviders_typed_data_.typemapping)   |  a TypeMapping pre-generated from the TypedData |








<a id="_provider_src_subproviders_typed_data_.sanitizemessage"></a>

###  sanitizeMessage




##### Declaration


```typescript
function sanitizeMessage(typedData: TypedData, typeMapping: TypeMapping)
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:93](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L93)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| typedData | [TypedData](#_provider_src_subproviders_typed_data_.typeddata)   |  TypedData payload |
| typeMapping | [TypeMapping](#_provider_src_subproviders_typed_data_.typemapping)   |  a TypeMapping pre-generated from the TypedData |








<a id="_provider_src_subproviders_typed_data_.sanitizetype"></a>

###  sanitizeType




##### Declaration


```typescript
function sanitizeType(typeName: string, values: any, typeMapping: TypeMapping)
```
<small>*Defined in [packages/provider/src/subproviders/typed-data.ts:114](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/subproviders/typed-data.ts#L114)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| typeName | `string`   |  Name of the type we are starting from |
| values | `any`   |  The root object containing the keys and values |
| typeMapping | [TypeMapping](#_provider_src_subproviders_typed_data_.typemapping)   |  The type mapping that represents this data |










---

<a id="_provider_src_utils_parse_utils_"></a>


### Functions
<a id="_provider_src_utils_parse_utils_.encodenumber"></a>

###  encodeNumber




##### Declaration


```typescript
function encodeNumber(num: string | number | BN, type: string, compact?: boolean): string
```
<small>*Defined in [packages/provider/src/utils/parse-utils.ts:53](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/utils/parse-utils.ts#L53)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| num | `string          ⎮number          ⎮BN`  | - |   The value to convert |
| type | `string`  | - |   The solidity ABI type to format the data as (eg. uint256, int8, etc). Only supports int and uint variants. |
| compact | `boolean`  | false |   boolean (default false). Whether to use compact encoding for uints, or pad with zeroes. |



##### Return Value
`string`


A hex string formatted as the specified type.






<a id="_provider_src_utils_parse_utils_.parsebitwidth"></a>

###  parseBitWidth




##### Declaration


```typescript
function parseBitWidth(type: string, offset: number): number
```
<small>*Defined in [packages/provider/src/utils/parse-utils.ts:30](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/utils/parse-utils.ts#L30)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  - |
| offset | `number`   |  - |



##### Return Value
`number`







<a id="_provider_src_utils_parse_utils_.parsenumber"></a>

###  parseNumber




##### Declaration


```typescript
function parseNumber(arg: string | number | BN): BN
```
<small>*Defined in [packages/provider/src/utils/parse-utils.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/packages/provider/src/utils/parse-utils.ts#L12)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| arg | `string          ⎮number          ⎮BN`   |  A number value to convert to hex.Can be a regular number, base-10 string, base-16 string, or BN instance. |



##### Return Value
`BN`


BN instance representing the number

(Adapted from ethereumjs-abi)










