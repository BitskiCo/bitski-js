---
---



#  Bitski.js

## Index

### External modules

* [browser](#browser)
* [provider](#provider)



---

<a id="browser"></a>


# Bitski JS

This is our browser SDK package.



<a id="browser.authenticationerrorcode"></a>

####  AuthenticationErrorCode





<a id="browser.authenticationerrorcode.invalidconfiguration"></a>

####  InvalidConfiguration


```javascript
var InvalidConfiguration:  = 1005
```
<small>*Defined in [browser/src/errors/authentication-error.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L14)*</small>





<a id="browser.authenticationerrorcode.norefreshtoken"></a>

####  NoRefreshToken


```javascript
var NoRefreshToken:  = 1002
```
<small>*Defined in [browser/src/errors/authentication-error.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L8)*</small>





<a id="browser.authenticationerrorcode.notsignedin"></a>

####  NotSignedIn


```javascript
var NotSignedIn:  = 1000
```
<small>*Defined in [browser/src/errors/authentication-error.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L4)*</small>





<a id="browser.authenticationerrorcode.popupblocked"></a>

####  PopupBlocked


```javascript
var PopupBlocked:  = 1006
```
<small>*Defined in [browser/src/errors/authentication-error.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L16)*</small>





<a id="browser.authenticationerrorcode.servererror"></a>

####  ServerError


```javascript
var ServerError:  = 1004
```
<small>*Defined in [browser/src/errors/authentication-error.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L12)*</small>





<a id="browser.authenticationerrorcode.unsupportedauthenticationmethod"></a>

####  UnsupportedAuthenticationMethod


```javascript
var UnsupportedAuthenticationMethod:  = 1003
```
<small>*Defined in [browser/src/errors/authentication-error.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L10)*</small>





<a id="browser.authenticationerrorcode.usercancelled"></a>

####  UserCancelled


```javascript
var UserCancelled:  = 1001
```
<small>*Defined in [browser/src/errors/authentication-error.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L6)*</small>







<a id="browser.authenticationstatus"></a>

####  AuthenticationStatus





<a id="browser.authenticationstatus.connected"></a>

####  Connected


```javascript
var Connected:  = "CONNECTED"
```
<small>*Defined in [browser/src/bitski.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L21)*</small>





<a id="browser.authenticationstatus.expired"></a>

####  Expired


```javascript
var Expired:  = "EXPIRED"
```
<small>*Defined in [browser/src/bitski.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L22)*</small>





<a id="browser.authenticationstatus.notconnected"></a>

####  NotConnected


```javascript
var NotConnected:  = "NOT_CONNECTED"
```
<small>*Defined in [browser/src/bitski.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L23)*</small>







<a id="browser.connectbuttonsize"></a>

####  ConnectButtonSize


Sizing options for the Bitski connect button.






<a id="browser.connectbuttonsize.large"></a>

####  Large


```javascript
var Large:  = "LARGE"
```
<small>*Defined in [browser/src/components/connect-button.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L11)*</small>





<a id="browser.connectbuttonsize.medium"></a>

####  Medium


```javascript
var Medium:  = "MEDIUM"
```
<small>*Defined in [browser/src/components/connect-button.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L10)*</small>





<a id="browser.connectbuttonsize.small"></a>

####  Small


```javascript
var Small:  = "SMALL"
```
<small>*Defined in [browser/src/components/connect-button.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L9)*</small>







<a id="browser.oauthsigninmethod"></a>

####  OAuthSignInMethod





<a id="browser.oauthsigninmethod.popup"></a>

####  Popup


```javascript
var Popup:  = "POPUP"
```
<small>*Defined in [browser/src/bitski.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L16)*</small>





<a id="browser.oauthsigninmethod.redirect"></a>

####  Redirect


```javascript
var Redirect:  = "REDIRECT"
```
<small>*Defined in [browser/src/bitski.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L15)*</small>





<a id="browser.oauthsigninmethod.silent"></a>

####  Silent


```javascript
var Silent:  = "SILENT"
```
<small>*Defined in [browser/src/bitski.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L17)*</small>







<a id="browser.parseerrorcode"></a>

####  ParseErrorCode





<a id="browser.parseerrorcode.invalidjson"></a>

####  InvalidJSON


```javascript
var InvalidJSON:  = 2000
```
<small>*Defined in [browser/src/errors/parse-error.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/parse-error.ts#L4)*</small>





<a id="browser.parseerrorcode.noerrorbody"></a>

####  NoErrorBody


```javascript
var NoErrorBody:  = 2001
```
<small>*Defined in [browser/src/errors/parse-error.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/parse-error.ts#L7)*</small>







<a id="browser.signererrorcode"></a>

####  SignerErrorCode





<a id="browser.signererrorcode.missingfrom"></a>

####  MissingFrom


```javascript
var MissingFrom:  = 3004
```
<small>*Defined in [browser/src/errors/signer-error.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L14)*</small>





<a id="browser.signererrorcode.missingmessage"></a>

####  MissingMessage


```javascript
var MissingMessage:  = 3003
```
<small>*Defined in [browser/src/errors/signer-error.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L12)*</small>





<a id="browser.signererrorcode.missingtransaction"></a>

####  MissingTransaction


```javascript
var MissingTransaction:  = 3002
```
<small>*Defined in [browser/src/errors/signer-error.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L9)*</small>





<a id="browser.signererrorcode.missingtypeddata"></a>

####  MissingTypedData


```javascript
var MissingTypedData:  = 3005
```
<small>*Defined in [browser/src/errors/signer-error.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L17)*</small>





<a id="browser.signererrorcode.unsupportedmethod"></a>

####  UnsupportedMethod


```javascript
var UnsupportedMethod:  = 3000
```
<small>*Defined in [browser/src/errors/signer-error.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L4)*</small>





<a id="browser.signererrorcode.usercancelled-1"></a>

####  UserCancelled


```javascript
var UserCancelled:  = 3001
```
<small>*Defined in [browser/src/errors/signer-error.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L6)*</small>







<a id="browser.transactionkind"></a>

####  TransactionKind





<a id="browser.transactionkind.sendtransaction"></a>

####  SendTransaction


```javascript
var SendTransaction:  = "ETH_SEND_TRANSACTION"
```
<small>*Defined in [browser/src/subproviders/signature.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L12)*</small>





<a id="browser.transactionkind.sign"></a>

####  Sign


```javascript
var Sign:  = "ETH_SIGN"
```
<small>*Defined in [browser/src/subproviders/signature.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L14)*</small>





<a id="browser.transactionkind.signtransaction"></a>

####  SignTransaction


```javascript
var SignTransaction:  = "ETH_SIGN_TRANSACTION"
```
<small>*Defined in [browser/src/subproviders/signature.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L13)*</small>





<a id="browser.transactionkind.signtypeddata"></a>

####  SignTypedData


```javascript
var SignTypedData:  = "ETH_SIGN_TYPED_DATA"
```
<small>*Defined in [browser/src/subproviders/signature.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L15)*</small>








<a id="browser.accesstoken"></a>

##  AccessToken


Represents a Bitski access token



<a id="browser.accesstoken.constructor"></a>
### constructor
```typescript
new AccessToken(token: string, expiresAt?: undefined | number, scope?: undefined | string): AccessToken
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| token | `string`   |  the access token |
| expiresAt _(Optional)_ | `undefined          ⎮number`   |  the token expiration date (in seconds) (optional) |
| scope _(Optional)_ | `undefined          ⎮string`   |  the scopes this token represents (optional) |



##### Return Value
[AccessToken](#browser.accesstoken)





---

### Properties
<a id="browser.accesstoken.expiresat"></a>

#### expiresAt

When the token expires (in seconds)


```javascript
var expiresAt: undefined | number
```
<small>*Defined in [browser/src/auth/access-token.ts:44](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/access-token.ts#L44)*</small>


<a id="browser.accesstoken.scope"></a>

#### scope

Scopes this token has access to


```javascript
var scope: undefined | string
```
<small>*Defined in [browser/src/auth/access-token.ts:49](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/access-token.ts#L49)*</small>


<a id="browser.accesstoken.token"></a>

#### token

The actual access token


```javascript
var token: string
```
<small>*Defined in [browser/src/auth/access-token.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/access-token.ts#L39)*</small>




---

<a id="browser.accesstoken.expired-1"></a>

####  expired


Calculates if the token is still active




getexpired(): boolean
##### Return Value
`boolean`







---

### Methods
<a id="browser.accesstoken.tostoragestring"></a>

#### toStorageString



Returns a JSON string suitable for writing in local storage




##### Declaration


```typescript
function toStorageString(): string
```
<small>*Defined in [browser/src/auth/access-token.ts:78](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/access-token.ts#L78)*</small>



##### Return Value
`string`







<a id="browser.accesstoken.fromstring"></a>

#### fromString



Creates a token from a storage string




##### Declaration


```typescript
function fromString(s: string): AccessToken | undefined
```
<small>*Defined in [browser/src/auth/access-token.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/access-token.ts#L23)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| s | `string`   |  JSON string representing the token |



##### Return Value
`AccessToken          ⎮undefined`







<a id="browser.accesstoken.fromtokenresponse"></a>

#### fromTokenResponse



Creates a token from a TokenResponse object




##### Declaration


```typescript
function fromTokenResponse(tokenResponse: TokenResponse): AccessToken
```
<small>*Defined in [browser/src/auth/access-token.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/access-token.ts#L11)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| tokenResponse | `TokenResponse`   |  The token response object to build a token from |



##### Return Value
[AccessToken](#browser.accesstoken)









---



---

<a id="browser.authenticatedcachesubprovider"></a>

##  AuthenticatedCacheSubprovider


<a id="browser.authenticatedcachesubprovider.constructor-1"></a>
### constructor
```typescript
new AuthenticatedCacheSubprovider(authProvider: AuthProvider): AuthenticatedCacheSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authProvider | [AuthProvider](#browser.authprovider)   |  - |



##### Return Value
[AuthenticatedCacheSubprovider](#browser.authenticatedcachesubprovider)





---

### Properties



---

### Methods





<a id="browser.authenticatedcachesubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any): any
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L18)*</small>



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

<a id="browser.authenticationerror"></a>

##  AuthenticationError


Represents an error that is thrown during the authentication process



<a id="browser.authenticationerror.constructor-2"></a>
### constructor
```typescript
new AuthenticationError(message: string, code: AuthenticationErrorCode): AuthenticationError
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string`   |  - |
| code | [AuthenticationErrorCode](#browser.authenticationerrorcode)   |  - |



##### Return Value
[AuthenticationError](#browser.authenticationerror)





---

### Properties
<a id="browser.authenticationerror.code"></a>

#### code
```javascript
var code: AuthenticationErrorCode
```
<small>*Defined in [browser/src/errors/authentication-error.ts:63](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L63)*</small>


<a id="browser.authenticationerror.description"></a>

#### description
```javascript
var description: undefined | string
```
<small>*Defined in [browser/src/errors/authentication-error.ts:64](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L64)*</small>



<a id="browser.authenticationerror.name"></a>

#### name
```javascript
var name: string = "AuthenticationError"
```
<small>*Defined in [browser/src/errors/authentication-error.ts:62](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L62)*</small>



<a id="browser.authenticationerror.error"></a>

#### Error
```javascript
var Error: ErrorConstructor
```
<small>*Defined in [/Users/ptescher/Development/BitskiCo/bitski-js/node_modules/typescript/lib/lib.es5.d.ts:974](https://github.com/BitskiCo/bitski-js/blob/master/packages//Users/ptescher/Development/BitskiCo/bitski-js/node_modules/typescript/lib/lib.es5.d.ts#L974)*</small>




---

### Methods
<a id="browser.authenticationerror.invalidconfiguration-1"></a>

#### InvalidConfiguration




##### Declaration


```typescript
function InvalidConfiguration(reason: string): AuthenticationError
```
<small>*Defined in [browser/src/errors/authentication-error.ts:58](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L58)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| reason | `string`   |  - |



##### Return Value
[AuthenticationError](#browser.authenticationerror)







<a id="browser.authenticationerror.norefreshtoken-1"></a>

#### NoRefreshToken




##### Declaration


```typescript
function NoRefreshToken(): AuthenticationError
```
<small>*Defined in [browser/src/errors/authentication-error.ts:35](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L35)*</small>



##### Return Value
[AuthenticationError](#browser.authenticationerror)







<a id="browser.authenticationerror.notsignedin-1"></a>

#### NotSignedIn




##### Declaration


```typescript
function NotSignedIn(): AuthenticationError
```
<small>*Defined in [browser/src/errors/authentication-error.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L25)*</small>



##### Return Value
[AuthenticationError](#browser.authenticationerror)







<a id="browser.authenticationerror.popupblocked-1"></a>

#### PopupBlocked




##### Declaration


```typescript
function PopupBlocked(baseUrl: string): AuthenticationError
```
<small>*Defined in [browser/src/errors/authentication-error.ts:45](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L45)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| baseUrl | `string`   |  - |



##### Return Value
[AuthenticationError](#browser.authenticationerror)







<a id="browser.authenticationerror.servererror-1"></a>

#### ServerError




##### Declaration


```typescript
function ServerError(message: string, description?: undefined | string): AuthenticationError
```
<small>*Defined in [browser/src/errors/authentication-error.ts:51](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L51)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string`   |  - |
| description _(Optional)_ | `undefined          ⎮string`   |  - |



##### Return Value
[AuthenticationError](#browser.authenticationerror)







<a id="browser.authenticationerror.unsupportedauthenticationmethod-1"></a>

#### UnsupportedAuthenticationMethod




##### Declaration


```typescript
function UnsupportedAuthenticationMethod(): AuthenticationError
```
<small>*Defined in [browser/src/errors/authentication-error.ts:40](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L40)*</small>



##### Return Value
[AuthenticationError](#browser.authenticationerror)







<a id="browser.authenticationerror.usercancelled-2"></a>

#### UserCancelled




##### Declaration


```typescript
function UserCancelled(): AuthenticationError
```
<small>*Defined in [browser/src/errors/authentication-error.ts:30](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/authentication-error.ts#L30)*</small>



##### Return Value
[AuthenticationError](#browser.authenticationerror)









---


### Relationships
##### Extends
* Error

---

<a id="browser.bitski"></a>

##  Bitski


Bitski SDK



<a id="browser.bitski.constructor-3"></a>
### constructor
```typescript
new Bitski(clientId: string, redirectUri?: undefined | string, additionalScopes?: string[], options?: BitskiSDKOptions): Bitski
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |  OAuth Client ID |
| redirectUri _(Optional)_ | `undefined          ⎮string`   |  Redirect uri, defaults to the current url. This should be the location of your callback html file. |
| additionalScopes _(Optional)_ | `string[]`   |  To use custom scopes, add them here. The default value is ['offline'].Note: Make sure your app is approved for the scopes you are requesting first. |
| options _(Optional)_ | [BitskiSDKOptions](#browser.bitskisdkoptions)   |  Other OAuth settings. Don't change these unless you know what you are doing. |



##### Return Value
[Bitski](#browser.bitski)





---

<a id="browser.bitski.authstatus"></a>

####  authStatus


Check the logged in state of the user




getauthStatus(): AuthenticationStatus
##### Return Value
[AuthenticationStatus](#browser.authenticationstatus)







---

### Methods
<a id="browser.bitski.addsignouthandler"></a>

#### addSignOutHandler



Register a callback to be called on sign out. This is a good practice, since there may be situations where you are signed out unexpectedly.




##### Declaration


```typescript
function addSignOutHandler(fn: function)
```
<small>*Defined in [browser/src/bitski.ts:215](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L215)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  Your callback function |








<a id="browser.bitski.connect"></a>

#### connect



Connects to bitski to get a valid access token if possible.




##### Declaration


```typescript
function connect(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:176](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L176)*</small>



##### Return Value
`Promise<User>`







<a id="browser.bitski.getconnectbutton"></a>

#### getConnectButton



Creates a sign in with bitski button to add to your app. If an HTML element is passed in as the first parameter, it will automatically add it to the DOM inside that element. Make sure to add a callback to get notified of login events.




##### Declaration


```typescript
function getConnectButton(options?: ConnectButtonOptions, callback?: undefined | function): ConnectButton
```
<small>*Defined in [browser/src/bitski.ts:130](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L130)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options _(Optional)_ | [ConnectButtonOptions](#browser.connectbuttonoptions)   |  Optional configuration for the button |
| callback _(Optional)_ | `undefined          ⎮function`   |  Post-login callback. Called when sign in is complete. Not applicable for redirect login method. |



##### Return Value
[ConnectButton](#browser.connectbutton)







<a id="browser.bitski.getcurrentaccesstoken"></a>

#### getCurrentAccessToken



Retrieves the current access token for the user, if logged in.




##### Declaration


```typescript
function getCurrentAccessToken(): Promise<string>
```
<small>*Defined in [browser/src/bitski.ts:198](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L198)*</small>



##### Return Value
`Promise<string>`







<a id="browser.bitski.getcurrentrefreshtoken"></a>

#### getCurrentRefreshToken



Retrieves the current refresh token for the user, if logged in. Requires that the user has approved your application for offline access.




##### Declaration


```typescript
function getCurrentRefreshToken(): Promise<string>
```
<small>*Defined in [browser/src/bitski.ts:206](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L206)*</small>



##### Return Value
`Promise<string>`







<a id="browser.bitski.getprovider"></a>

#### getProvider



Returns a new web3 provider for a given network.




##### Declaration


```typescript
function getProvider(options?: ProviderOptions | string): BitskiEngine
```
<small>*Defined in [browser/src/bitski.ts:104](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L104)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options _(Optional)_ | `ProviderOptions          ⎮string`   |  options for the provider, or a network name |



##### Return Value
`BitskiEngine`







<a id="browser.bitski.getuser"></a>

#### getUser



Gets the current signed in user. Will reject if we are not signed in.




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:169](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L169)*</small>



##### Return Value
`Promise<User>`







<a id="browser.bitski.redirectcallback"></a>

#### redirectCallback



Call from your oauth redirect page.




##### Declaration


```typescript
function redirectCallback(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:191](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L191)*</small>



##### Return Value
`Promise<User>`







<a id="browser.bitski.removesignouthandler"></a>

#### removeSignOutHandler



Remove a registered signout callback




##### Declaration


```typescript
function removeSignOutHandler(fn: function)
```
<small>*Defined in [browser/src/bitski.ts:223](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L223)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  Your callback function |








<a id="browser.bitski.signin"></a>

#### signIn



Starts the sign in flow. Will trigger a popup window over your app, so it must be called within a user interaction handler such as a click.




##### Declaration


```typescript
function signIn(options?: SignInOptions): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:162](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L162)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options _(Optional)_ | [SignInOptions](#browser.signinoptions-1)   |  Optionally provide additional options for the sign in request.You can use the options parameter to request that we show the sign up form instead of the sign in form:`javascriptimport { LOGIN_HINT_SIGNUP } from 'bitski';await bitski.signIn({ login_hint: LOGIN_HINT_SIGNUP });` |



##### Return Value
`Promise<User>`







<a id="browser.bitski.signinredirect"></a>

#### signInRedirect



Starts redirect sign in flow. This is an alternative flow to the popup that all takes place in the same browser window.




##### Declaration


```typescript
function signInRedirect(options?: SignInOptions)
```
<small>*Defined in [browser/src/bitski.ts:184](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L184)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options _(Optional)_ | [SignInOptions](#browser.signinoptions-1)   |  Optionally provide additional options for the sign in request. See signIn() for more info. |








<a id="browser.bitski.signout"></a>

#### signOut



Sign the current user out of your application.




##### Declaration


```typescript
function signOut(): Promise<void>
```
<small>*Defined in [browser/src/bitski.ts:233](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L233)*</small>



##### Return Value
`Promise<void>`







<a id="browser.bitski.start"></a>

#### start



Signs in or connects to bitski depending on the user's auth state. Since it may open a popup, this method must be called from user interaction handler, such as a click or tap handler.




##### Declaration


```typescript
function start(options?: SignInOptions): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:140](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L140)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options _(Optional)_ | [SignInOptions](#browser.signinoptions-1)   |  Provide SignInOptions for the sign in request. See signIn() for more info. |



##### Return Value
`Promise<User>`







<a id="browser.bitski.callback"></a>

#### callback



Alternative to using our static callback.html file. Call this from your own redirect page.




##### Declaration


```typescript
function callback()
```
<small>*Defined in [browser/src/bitski.ts:69](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L69)*</small>










---



---

<a id="browser.bitskibrowserengine"></a>

##  BitskiBrowserEngine


<a id="browser.bitskibrowserengine.constructor-4"></a>
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
| options | [ProviderOptions](#browser.provideroptions)  |  {} |   - |



##### Return Value
[BitskiBrowserEngine](#browser.bitskibrowserengine)





---

### Properties




---

### Methods



























---


### Relationships
##### Extends
* BitskiEngine

---

<a id="browser.bitskitransactionsigner"></a>

##  BitskiTransactionSigner


This class is responsible for signing transactions. It only knows about Bitski's proprietary transaction objects. It is also the only class that knows about the iframe signing implementation.



<a id="browser.bitskitransactionsigner.constructor-5"></a>
### constructor
```typescript
new BitskiTransactionSigner(webBaseUrl: string, apiBaseUrl: string, defaultHeaders: any): BitskiTransactionSigner
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| webBaseUrl | `string`   |  - |
| apiBaseUrl | `string`   |  - |
| defaultHeaders | `any`   |  - |



##### Return Value
[BitskiTransactionSigner](#browser.bitskitransactionsigner)





---

### Methods
<a id="browser.bitskitransactionsigner.sign-1"></a>

#### sign




##### Declaration


```typescript
function sign(transaction: Transaction, accessToken: string): Promise<string>
```
<small>*Defined in [browser/src/signing/transaction-signer.ts:41](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/signing/transaction-signer.ts#L41)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| transaction | [Transaction](#browser.transaction-1)   |  - |
| accessToken | `string`   |  - |



##### Return Value
`Promise<string>`









---



---

<a id="browser.connectbutton"></a>

##  ConnectButton


A button used to connect to Bitski.



<a id="browser.connectbutton.constructor-6"></a>
### constructor
```typescript
new ConnectButton(authProvider: AuthProvider, options?: ConnectButtonOptions, callback?: undefined | function): ConnectButton
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authProvider | [AuthProvider](#browser.authprovider)   |  An instance of an AuthProvider to process sign in requests. |
| options _(Optional)_ | [ConnectButtonOptions](#browser.connectbuttonoptions)   |  Optional ConnectButtonOptions to configure your button. |
| callback _(Optional)_ | `undefined          ⎮function`   |  Optional callback to be called after successful or failed log in attempt.You can also set this directly later with the `callback` property. |



##### Return Value
[ConnectButton](#browser.connectbutton)





---

### Properties
<a id="browser.connectbutton.callback-1"></a>

#### callback
```javascript
var callback: undefined | function
```
<small>*Defined in [browser/src/components/connect-button.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L39)*</small>


<a id="browser.connectbutton.element"></a>

#### element
```javascript
var element: HTMLElement
```
<small>*Defined in [browser/src/components/connect-button.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L33)*</small>


<a id="browser.connectbutton.oncancel"></a>

#### onCancel
```javascript
var onCancel: undefined | function
```
<small>*Defined in [browser/src/components/connect-button.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L42)*</small>


<a id="browser.connectbutton.size"></a>

#### size
```javascript
var size: ConnectButtonSize
```
<small>*Defined in [browser/src/components/connect-button.ts:36](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L36)*</small>




---

### Methods
<a id="browser.connectbutton.remove"></a>

#### remove



Removes the button from the page




##### Declaration


```typescript
function remove()
```
<small>*Defined in [browser/src/components/connect-button.ts:83](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L83)*</small>










---



---

<a id="browser.dialog"></a>

##  Dialog


Basic modal dialog



<a id="browser.dialog.constructor-7"></a>
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
[Dialog](#browser.dialog)





---

### Properties
<a id="browser.dialog.onclose"></a>

#### onClose
```javascript
var onClose: undefined | function
```
<small>*Defined in [browser/src/components/dialog.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L12)*</small>




---

### Methods
<a id="browser.dialog.close"></a>

#### close



Cancels the dialog by dismissing and triggering the close handler.




##### Declaration


```typescript
function close()
```
<small>*Defined in [browser/src/components/dialog.ts:69](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L69)*</small>








<a id="browser.dialog.dismiss"></a>

#### dismiss



Dismisses the dialog without triggering the close handler.




##### Declaration


```typescript
function dismiss()
```
<small>*Defined in [browser/src/components/dialog.ts:60](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L60)*</small>








<a id="browser.dialog.hide"></a>

#### hide



Hides the dialog, but does not remove




##### Declaration


```typescript
function hide()
```
<small>*Defined in [browser/src/components/dialog.ts:53](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L53)*</small>








<a id="browser.dialog.setloading"></a>

#### setLoading



Show or hide the loading indicator




##### Declaration


```typescript
function setLoading(loading: boolean)
```
<small>*Defined in [browser/src/components/dialog.ts:80](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L80)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| loading | `boolean`   |  Whether or not to display the spinner |








<a id="browser.dialog.show"></a>

#### show



Show the dialog




##### Declaration


```typescript
function show()
```
<small>*Defined in [browser/src/components/dialog.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L47)*</small>










---



---

<a id="browser.localstoragestore"></a>

##  LocalStorageStore


<a id="browser.localstoragestore.constructor-8"></a>
### constructor
```typescript
new LocalStorageStore(storage?: Storage): LocalStorageStore
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| storage | `Storage`  |  localStorage |   - |



##### Return Value
[LocalStorageStore](#browser.localstoragestore)





---

### Methods
<a id="browser.localstoragestore.clear"></a>

#### clear




##### Declaration


```typescript
function clear()
```
<small>*Defined in [browser/src/utils/localstorage-store.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/utils/localstorage-store.ts#L13)*</small>








<a id="browser.localstoragestore.clearitem"></a>

#### clearItem




##### Declaration


```typescript
function clearItem(key: string)
```
<small>*Defined in [browser/src/utils/localstorage-store.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/utils/localstorage-store.ts#L25)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `string`   |  - |








<a id="browser.localstoragestore.getitem"></a>

#### getItem




##### Declaration


```typescript
function getItem(key: string): any
```
<small>*Defined in [browser/src/utils/localstorage-store.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/utils/localstorage-store.ts#L17)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `string`   |  - |



##### Return Value
`any`







<a id="browser.localstoragestore.setitem"></a>

#### setItem




##### Declaration


```typescript
function setItem(key: string, value: any)
```
<small>*Defined in [browser/src/utils/localstorage-store.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/utils/localstorage-store.ts#L21)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `string`   |  - |
| value | `any`   |  - |










---


### Relationships
##### Implements
* [browser](#browser).[Store](#browser.store-1)

---

<a id="browser.nohashquerystringutils"></a>

##  NoHashQueryStringUtils


### Methods
<a id="browser.nohashquerystringutils.parse"></a>

#### parse




##### Declaration


```typescript
function parse(input: LocationLike, useHash?: undefined | false | true): StringMap
```
<small>*Defined in [browser/src/utils/no-hash-query-string-utils.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/utils/no-hash-query-string-utils.ts#L8)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| input | `LocationLike`   |  - |
| useHash _(Optional)_ | `undefined          ⎮false          ⎮true`   |  - |



##### Return Value
`StringMap`











---


### Relationships
##### Extends
* BasicQueryStringUtils
##### Implements
* QueryStringUtils

---

<a id="browser.oauthmanager"></a>

##  OAuthManager


Responsible for submitting requests to our OAuth server.



<a id="browser.oauthmanager.constructor-9"></a>
### constructor
```typescript
new OAuthManager(options: OAuthManagerOptions): OAuthManager
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [OAuthManagerOptions](#browser.oauthmanageroptions)   |  Settings object |



##### Return Value
[OAuthManager](#browser.oauthmanager)





---

### Properties
<a id="browser.oauthmanager.configuration"></a>

#### configuration
```javascript
var configuration: AuthorizationServiceConfiguration
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:44](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L44)*</small>




---

### Methods
<a id="browser.oauthmanager.redirectcallback-1"></a>

#### redirectCallback



Attempt to finalize auth request from a redirect flow. Called from your redirect url once you've been redirected back.




##### Declaration


```typescript
function redirectCallback(): Promise<TokenResponse>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:112](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L112)*</small>



##### Return Value
`Promise<TokenResponse>`







<a id="browser.oauthmanager.refreshaccesstoken"></a>

#### refreshAccessToken



Request a new access token from a previous refresh token




##### Declaration


```typescript
function refreshAccessToken(refreshToken: string): Promise<TokenResponse>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:137](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L137)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| refreshToken | `string`   |  The refresh token to use for authorization |



##### Return Value
`Promise<TokenResponse>`







<a id="browser.oauthmanager.requestaccesstoken"></a>

#### requestAccessToken



Exchange an authorization code for an access token




##### Declaration


```typescript
function requestAccessToken(code: string): Promise<TokenResponse>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:128](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L128)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| code | `string`   |  The authorization code to exchange |



##### Return Value
`Promise<TokenResponse>`







<a id="browser.oauthmanager.requestsignout"></a>

#### requestSignOut



Submit a sign out request on the oauth endpoint




##### Declaration


```typescript
function requestSignOut(accessToken: string): Promise<any>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:146](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L146)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `string`   |  The access token to sign out with |



##### Return Value
`Promise<any>`







<a id="browser.oauthmanager.requestuserinfo"></a>

#### requestUserInfo



Request a user's profile from the oauth server




##### Declaration


```typescript
function requestUserInfo(accessToken: string): Promise<UserInfoResponse>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:163](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L163)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `string`   |  The access token for the user |



##### Return Value
`Promise<UserInfoResponse>`







<a id="browser.oauthmanager.signinpopup"></a>

#### signInPopup



Trigger a popup sign in flow (the default)




##### Declaration


```typescript
function signInPopup(opts?: SignInOptions): Promise<TokenResponse>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:77](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L77)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| opts _(Optional)_ | [SignInOptions](#browser.signinoptions-1)   |  - |



##### Return Value
`Promise<TokenResponse>`







<a id="browser.oauthmanager.signinredirect-1"></a>

#### signInRedirect



Trigger a redirect sign in flow. Promise should never fulfill, as you will be redirected.




##### Declaration


```typescript
function signInRedirect(opts?: SignInOptions): Promise<AuthorizationResponse>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:94](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L94)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| opts _(Optional)_ | [SignInOptions](#browser.signinoptions-1)   |  - |



##### Return Value
`Promise<AuthorizationResponse>`









---



---

<a id="browser.openidauthprovider"></a>

##  OpenidAuthProvider


<a id="browser.openidauthprovider.constructor-10"></a>
### constructor
```typescript
new OpenidAuthProvider(clientId: string, redirectUri: string, additionalScopes?: string[], opts?: BitskiSDKOptions): OpenidAuthProvider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |  - |
| redirectUri | `string`   |  - |
| additionalScopes _(Optional)_ | `string[]`   |  - |
| opts _(Optional)_ | [BitskiSDKOptions](#browser.bitskisdkoptions)   |  - |



##### Return Value
[OpenidAuthProvider](#browser.openidauthprovider)





---

### Properties
<a id="browser.openidauthprovider.oauthmanager-1"></a>

#### oauthManager
```javascript
var oauthManager: OAuthManager
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L12)*</small>


<a id="browser.openidauthprovider.signoutcallback"></a>

#### signOutCallback
```javascript
var signOutCallback: undefined | function
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L15)*</small>


<a id="browser.openidauthprovider.tokenstore"></a>

#### tokenStore
```javascript
var tokenStore: TokenStore
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L13)*</small>


<a id="browser.openidauthprovider.userstore"></a>

#### userStore
```javascript
var userStore: UserStore
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L14)*</small>




---

<a id="browser.openidauthprovider.authstatus-1"></a>

####  authStatus



getauthStatus(): AuthenticationStatus
##### Return Value
[AuthenticationStatus](#browser.authenticationstatus)







---

### Methods
<a id="browser.openidauthprovider.connect-1"></a>

#### connect




##### Declaration


```typescript
function connect(): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:108](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L108)*</small>



##### Return Value
`Promise<User>`







<a id="browser.openidauthprovider.getaccesstoken"></a>

#### getAccessToken




##### Declaration


```typescript
function getAccessToken(): Promise<string>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L42)*</small>



##### Return Value
`Promise<string>`







<a id="browser.openidauthprovider.getrefreshtoken"></a>

#### getRefreshToken




##### Declaration


```typescript
function getRefreshToken(): Promise<string>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:52](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L52)*</small>



##### Return Value
`Promise<string>`







<a id="browser.openidauthprovider.getuser-1"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:114](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L114)*</small>



##### Return Value
`Promise<User>`







<a id="browser.openidauthprovider.invalidatetoken"></a>

#### invalidateToken




##### Declaration


```typescript
function invalidateToken(): Promise<void>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:64](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L64)*</small>



##### Return Value
`Promise<void>`







<a id="browser.openidauthprovider.redirectcallback-2"></a>

#### redirectCallback




##### Declaration


```typescript
function redirectCallback(): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:129](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L129)*</small>



##### Return Value
`Promise<User>`







<a id="browser.openidauthprovider.refreshaccesstoken-1"></a>

#### refreshAccessToken




##### Declaration


```typescript
function refreshAccessToken(): Promise<string>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:74](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L74)*</small>



##### Return Value
`Promise<string>`







<a id="browser.openidauthprovider.signin-1"></a>

#### signIn




##### Declaration


```typescript
function signIn(method: OAuthSignInMethod, opts?: SignInOptions): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:89](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L89)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | [OAuthSignInMethod](#browser.oauthsigninmethod)   |  - |
| opts _(Optional)_ | [SignInOptions](#browser.signinoptions-1)   |  - |



##### Return Value
`Promise<User>`







<a id="browser.openidauthprovider.signinorconnect"></a>

#### signInOrConnect




##### Declaration


```typescript
function signInOrConnect(signInMethod?: OAuthSignInMethod, opts?: SignInOptions): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:118](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L118)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| signInMethod | [OAuthSignInMethod](#browser.oauthsigninmethod)  |  OAuthSignInMethod.Popup |   - |
| opts _(Optional)_ | [SignInOptions](#browser.signinoptions-1)  | - |   - |



##### Return Value
`Promise<User>`







<a id="browser.openidauthprovider.signout-1"></a>

#### signOut




##### Declaration


```typescript
function signOut(): Promise<any>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:136](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L136)*</small>



##### Return Value
`Promise<any>`









---


### Relationships
##### Implements
* AccessTokenProvider
* [browser](#browser).[AuthProvider](#browser.authprovider)

---

<a id="browser.parseerror"></a>

##  ParseError


Represents an error that is thrown during decoding



<a id="browser.parseerror.constructor-11"></a>
### constructor
```typescript
new ParseError(message: string, code: ParseErrorCode): ParseError
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string`   |  - |
| code | [ParseErrorCode](#browser.parseerrorcode)   |  - |



##### Return Value
[ParseError](#browser.parseerror)





---

### Properties
<a id="browser.parseerror.code-1"></a>

#### code
```javascript
var code: ParseErrorCode
```
<small>*Defined in [browser/src/errors/parse-error.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/parse-error.ts#L23)*</small>



<a id="browser.parseerror.name-1"></a>

#### name
```javascript
var name: string = "ParseError"
```
<small>*Defined in [browser/src/errors/parse-error.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/parse-error.ts#L22)*</small>



<a id="browser.parseerror.error-1"></a>

#### Error
```javascript
var Error: ErrorConstructor
```
<small>*Defined in [/Users/ptescher/Development/BitskiCo/bitski-js/node_modules/typescript/lib/lib.es5.d.ts:974](https://github.com/BitskiCo/bitski-js/blob/master/packages//Users/ptescher/Development/BitskiCo/bitski-js/node_modules/typescript/lib/lib.es5.d.ts#L974)*</small>




---

### Methods
<a id="browser.parseerror.invalidjson-1"></a>

#### InvalidJSON




##### Declaration


```typescript
function InvalidJSON(): ParseError
```
<small>*Defined in [browser/src/errors/parse-error.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/parse-error.ts#L14)*</small>



##### Return Value
[ParseError](#browser.parseerror)







<a id="browser.parseerror.unknownerror"></a>

#### UnknownError




##### Declaration


```typescript
function UnknownError(): ParseError
```
<small>*Defined in [browser/src/errors/parse-error.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/parse-error.ts#L18)*</small>



##### Return Value
[ParseError](#browser.parseerror)









---


### Relationships
##### Extends
* Error

---

<a id="browser.popupblockederror"></a>

##  PopupBlockedError


<a id="browser.popupblockederror.constructor-12"></a>
### constructor
```typescript
new PopupBlockedError(): PopupBlockedError
```
##### Return Value
[PopupBlockedError](#browser.popupblockederror)





---

### Properties






---

### Methods



---


### Relationships
##### Extends
* AuthorizationError

---

<a id="browser.popupclosederror"></a>

##  PopupClosedError


<a id="browser.popupclosederror.constructor-13"></a>
### constructor
```typescript
new PopupClosedError(): PopupClosedError
```
##### Return Value
[PopupClosedError](#browser.popupclosederror)





---

### Properties






---

### Methods



---


### Relationships
##### Extends
* AuthorizationError

---

<a id="browser.popuprequesthandler"></a>

##  PopupRequestHandler


<a id="browser.popuprequesthandler.constructor-14"></a>
### constructor
```typescript
new PopupRequestHandler(utils?: BasicQueryStringUtils, crypto?: DefaultCrypto): PopupRequestHandler
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| utils | `BasicQueryStringUtils`  |  new BasicQueryStringUtils() |   - |
| crypto | `DefaultCrypto`  |  new DefaultCrypto() |   - |



##### Return Value
[PopupRequestHandler](#browser.popuprequesthandler)





---

### Properties



---

### Methods
<a id="browser.popuprequesthandler.callback-2"></a>

#### callback




##### Declaration


```typescript
function callback(url: Location)
```
<small>*Defined in [browser/src/auth/popup-handler.ts:105](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/popup-handler.ts#L105)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| url | `Location`   |  - |








<a id="browser.popuprequesthandler.completeauthorizationrequest"></a>

#### completeAuthorizationRequest




##### Declaration


```typescript
function completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null>
```
<small>*Defined in [browser/src/auth/popup-handler.ts:119](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/popup-handler.ts#L119)*</small>



##### Return Value
`Promise<AuthorizationRequestResponse          ⎮null>`







<a id="browser.popuprequesthandler.completeauthorizationrequestifpossible"></a>

#### completeAuthorizationRequestIfPossible




##### Declaration


```typescript
function completeAuthorizationRequestIfPossible(): Promise<void>
```
<small>*Defined in [browser/src/auth/popup-handler.ts:111](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/popup-handler.ts#L111)*</small>



##### Return Value
`Promise<void>`







<a id="browser.popuprequesthandler.performauthorizationrequest"></a>

#### performAuthorizationRequest




##### Declaration


```typescript
function performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest)
```
<small>*Defined in [browser/src/auth/popup-handler.ts:85](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/popup-handler.ts#L85)*</small>



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

<a id="browser.popupvalidator"></a>

##  PopupValidator


A simple utility class that will check to see if a popup is blocked. Derived from info and examples on this page: [https://stackoverflow.com/questions/2914/how-can-i-detect-if-a-browser-is-blocking-a-popup](https://stackoverflow.com/questions/2914/how-can-i-detect-if-a-browser-is-blocking-a-popup)



<a id="browser.popupvalidator.constructor-15"></a>
### constructor
```typescript
new PopupValidator(errorHandler: function): PopupValidator
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| errorHandler | `function`   |  - |



##### Return Value
[PopupValidator](#browser.popupvalidator)





---

### Methods
<a id="browser.popupvalidator.check"></a>

#### check




##### Declaration


```typescript
function check(popup: Window | null)
```
<small>*Defined in [browser/src/utils/popup-validator.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/utils/popup-validator.ts#L17)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| popup | `Window          ⎮null`   |  - |










---



---

<a id="browser.remoteaccountsubprovider"></a>

##  RemoteAccountSubprovider





---

### Properties



---

### Methods






<a id="browser.remoteaccountsubprovider.handlerequest-1"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [browser/src/subproviders/remote-accounts.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/remote-accounts.ts#L7)*</small>



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

<a id="browser.signaturesubprovider"></a>

##  SignatureSubprovider


A Subprovider that manages the interface between JSON-RPC and Bitski's proprietary transaction signing flow. This class is responsible for transforming the JSON-RPC request into a Transaction object that the Bitski signer understands. Also responsible for submitting the transaction to the network, and converting the response back into an RPC response.

Important: this class assumes the transaction has all the necessary fields populated. The TransactionValidatorSubprovider should be placed in front of this subprovider.



<a id="browser.signaturesubprovider.constructor-17"></a>
### constructor
```typescript
new SignatureSubprovider(network: Network, signer: BitskiTransactionSigner, tokenProvider: AccessTokenProvider, signatureMethods?: string[]): SignatureSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| network | `Network`   |  - |
| signer | [BitskiTransactionSigner](#browser.bitskitransactionsigner)   |  - |
| tokenProvider | `AccessTokenProvider`   |  - |
| signatureMethods _(Optional)_ | `string[]`   |  - |



##### Return Value
[SignatureSubprovider](#browser.signaturesubprovider)





---

### Properties



---

### Methods





<a id="browser.signaturesubprovider.handlerequest-2"></a>

#### handleRequest



Handle RPC request from engine (called by)




##### Declaration


```typescript
function handleRequest(payload: JSONRPCRequestPayload, next: function, end: JSONRPCResponseHandler)
```
<small>*Defined in [browser/src/subproviders/signature.ts:136](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L136)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JSONRPCRequestPayload`   |  RPC request payload |
| next | `function`   |  Callback to skip handling this request |
| end | [JSONRPCResponseHandler](#browser.jsonrpcresponsehandler)   |  Completion handler |








<a id="browser.signaturesubprovider.handlesignaturerequest"></a>

#### handleSignatureRequest



Called when a payload is received that needs a signature




##### Declaration


```typescript
function handleSignatureRequest(payload: JSONRPCRequestPayload, callback: JSONRPCResponseHandler): Promise<void>
```
<small>*Defined in [browser/src/subproviders/signature.ts:149](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L149)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JSONRPCRequestPayload`   |  The JSON-RPC request |
| callback | [JSONRPCResponseHandler](#browser.jsonrpcresponsehandler)   |  The callback to call when the request has been handled |



##### Return Value
`Promise<void>`






















---


### Relationships
##### Extends
* Subprovider

---

<a id="browser.signererror"></a>

##  SignerError


<a id="browser.signererror.constructor-18"></a>
### constructor
```typescript
new SignerError(message: string, code: SignerErrorCode): SignerError
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string`   |  - |
| code | [SignerErrorCode](#browser.signererrorcode)   |  - |



##### Return Value
[SignerError](#browser.signererror)





---

### Properties
<a id="browser.signererror.code-2"></a>

#### code
```javascript
var code: SignerErrorCode
```
<small>*Defined in [browser/src/errors/signer-error.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L47)*</small>



<a id="browser.signererror.name-2"></a>

#### name
```javascript
var name: string = "TransactionError"
```
<small>*Defined in [browser/src/errors/signer-error.ts:46](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L46)*</small>



<a id="browser.signererror.error-4"></a>

#### Error
```javascript
var Error: ErrorConstructor
```
<small>*Defined in [/Users/ptescher/Development/BitskiCo/bitski-js/node_modules/typescript/lib/lib.es5.d.ts:974](https://github.com/BitskiCo/bitski-js/blob/master/packages//Users/ptescher/Development/BitskiCo/bitski-js/node_modules/typescript/lib/lib.es5.d.ts#L974)*</small>




---

### Methods
<a id="browser.signererror.missingfrom-1"></a>

#### MissingFrom




##### Declaration


```typescript
function MissingFrom(): SignerError
```
<small>*Defined in [browser/src/errors/signer-error.ts:38](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L38)*</small>



##### Return Value
[SignerError](#browser.signererror)







<a id="browser.signererror.missingmessage-1"></a>

#### MissingMessage




##### Declaration


```typescript
function MissingMessage(): SignerError
```
<small>*Defined in [browser/src/errors/signer-error.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L34)*</small>



##### Return Value
[SignerError](#browser.signererror)







<a id="browser.signererror.missingtransaction-1"></a>

#### MissingTransaction




##### Declaration


```typescript
function MissingTransaction(): SignerError
```
<small>*Defined in [browser/src/errors/signer-error.ts:30](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L30)*</small>



##### Return Value
[SignerError](#browser.signererror)







<a id="browser.signererror.missingtypeddata-1"></a>

#### MissingTypedData




##### Declaration


```typescript
function MissingTypedData(): SignerError
```
<small>*Defined in [browser/src/errors/signer-error.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L42)*</small>



##### Return Value
[SignerError](#browser.signererror)







<a id="browser.signererror.unsupportedmethod-1"></a>

#### UnsupportedMethod




##### Declaration


```typescript
function UnsupportedMethod(): SignerError
```
<small>*Defined in [browser/src/errors/signer-error.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L22)*</small>



##### Return Value
[SignerError](#browser.signererror)







<a id="browser.signererror.usercancelled-3"></a>

#### UserCancelled




##### Declaration


```typescript
function UserCancelled(): SignerError
```
<small>*Defined in [browser/src/errors/signer-error.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/errors/signer-error.ts#L26)*</small>



##### Return Value
[SignerError](#browser.signererror)









---


### Relationships
##### Extends
* Error

---

<a id="browser.tokenstore-1"></a>

##  TokenStore


<a id="browser.tokenstore-1.constructor-19"></a>
### constructor
```typescript
new TokenStore(clientId: string, store?: Store): TokenStore
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |  - |
| store _(Optional)_ | [Store](#browser.store-1)   |  - |



##### Return Value
[TokenStore](#browser.tokenstore-1)





---

<a id="browser.tokenstore-1.currenttoken"></a>

####  currentToken



getcurrentToken(): string | undefined
##### Return Value
`string          ⎮undefined`





<a id="browser.tokenstore-1.refreshtoken"></a>

####  refreshToken



getrefreshToken(): string | undefined
##### Return Value
`string          ⎮undefined`







---

### Methods
<a id="browser.tokenstore-1.clear-1"></a>

#### clear




##### Declaration


```typescript
function clear()
```
<small>*Defined in [browser/src/auth/token-store.ts:61](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/token-store.ts#L61)*</small>








<a id="browser.tokenstore-1.invalidatecurrenttoken"></a>

#### invalidateCurrentToken




##### Declaration


```typescript
function invalidateCurrentToken()
```
<small>*Defined in [browser/src/auth/token-store.ts:56](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/token-store.ts#L56)*</small>








<a id="browser.tokenstore-1.persisttokenresponse"></a>

#### persistTokenResponse




##### Declaration


```typescript
function persistTokenResponse(response: TokenResponse)
```
<small>*Defined in [browser/src/auth/token-store.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/token-store.ts#L47)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| response | `TokenResponse`   |  - |










---



---

<a id="browser.user"></a>

##  User


<a id="browser.user.constructor-20"></a>
### constructor
```typescript
new User(id: string, accounts?: string[], email?: undefined | string, emailVerified?: undefined | false | true, phone?: undefined | string, phoneNumberVerified?: undefined | false | true): User
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |  - |
| accounts _(Optional)_ | `string[]`   |  - |
| email _(Optional)_ | `undefined          ⎮string`   |  - |
| emailVerified _(Optional)_ | `undefined          ⎮false          ⎮true`   |  - |
| phone _(Optional)_ | `undefined          ⎮string`   |  - |
| phoneNumberVerified _(Optional)_ | `undefined          ⎮false          ⎮true`   |  - |



##### Return Value
[User](#browser.user)





---

### Properties
<a id="browser.user.accounts"></a>

#### accounts
```javascript
var accounts: string[]
```
<small>*Defined in [browser/src/auth/user.ts:30](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L30)*</small>


<a id="browser.user.email"></a>

#### email
```javascript
var email: undefined | string
```
<small>*Defined in [browser/src/auth/user.ts:31](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L31)*</small>


<a id="browser.user.emailverified"></a>

#### emailVerified
```javascript
var emailVerified: undefined | false | true
```
<small>*Defined in [browser/src/auth/user.ts:32](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L32)*</small>


<a id="browser.user.id"></a>

#### id
```javascript
var id: string
```
<small>*Defined in [browser/src/auth/user.ts:29](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L29)*</small>


<a id="browser.user.phonenumber"></a>

#### phoneNumber
```javascript
var phoneNumber: undefined | string
```
<small>*Defined in [browser/src/auth/user.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L33)*</small>


<a id="browser.user.phonenumberverified"></a>

#### phoneNumberVerified
```javascript
var phoneNumberVerified: undefined | false | true
```
<small>*Defined in [browser/src/auth/user.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L34)*</small>




---

### Methods
<a id="browser.user.tostoragestring-1"></a>

#### toStorageString




##### Declaration


```typescript
function toStorageString(): string
```
<small>*Defined in [browser/src/auth/user.ts:45](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L45)*</small>



##### Return Value
`string`







<a id="browser.user.fromjson"></a>

#### fromJson




##### Declaration


```typescript
function fromJson(json: UserInfoResponse): User
```
<small>*Defined in [browser/src/auth/user.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L12)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| json | [UserInfoResponse](#browser.userinforesponse)   |  - |



##### Return Value
[User](#browser.user)







<a id="browser.user.fromstring-1"></a>

#### fromString




##### Declaration


```typescript
function fromString(s: string): User | undefined
```
<small>*Defined in [browser/src/auth/user.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L16)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| s | `string`   |  - |



##### Return Value
`User          ⎮undefined`









---



---

<a id="browser.userstore-1"></a>

##  UserStore


<a id="browser.userstore-1.constructor-21"></a>
### constructor
```typescript
new UserStore(clientId: string, store?: Store): UserStore
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |  - |
| store _(Optional)_ | [Store](#browser.store-1)   |  - |



##### Return Value
[UserStore](#browser.userstore-1)





---

<a id="browser.userstore-1.currentuser"></a>

####  currentUser



getcurrentUser(): User | undefined
##### Return Value
`User          ⎮undefined`







---

### Methods
<a id="browser.userstore-1.clear-2"></a>

#### clear




##### Declaration


```typescript
function clear()
```
<small>*Defined in [browser/src/auth/user-store.ts:31](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user-store.ts#L31)*</small>








<a id="browser.userstore-1.set"></a>

#### set




##### Declaration


```typescript
function set(user: User | undefined)
```
<small>*Defined in [browser/src/auth/user-store.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user-store.ts#L26)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| user | `User          ⎮undefined`   |  - |










---



---


<a id="browser.authprovider"></a>

####  AuthProvider





### Properties
<a id="browser.authprovider.authstatus-2"></a>

#### authStatus
```javascript
var authStatus: AuthenticationStatus
```
<small>*Defined in [browser/src/auth/auth-provider.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L6)*</small>



### Methods
<a id="browser.authprovider.connect-2"></a>

#### connect




##### Declaration


```typescript
function connect(): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L8)*</small>



##### Return Value
`Promise<User>`







<a id="browser.authprovider.getuser-2"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L10)*</small>



##### Return Value
`Promise<User>`







<a id="browser.authprovider.redirectcallback-3"></a>

#### redirectCallback




##### Declaration


```typescript
function redirectCallback(): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L11)*</small>



##### Return Value
`Promise<User>`







<a id="browser.authprovider.signin-2"></a>

#### signIn




##### Declaration


```typescript
function signIn(method: OAuthSignInMethod, opts?: SignInOptions): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L7)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | [OAuthSignInMethod](#browser.oauthsigninmethod)   |  - |
| opts _(Optional)_ | [SignInOptions](#browser.signinoptions-1)   |  - |



##### Return Value
`Promise<User>`







<a id="browser.authprovider.signinorconnect-1"></a>

#### signInOrConnect




##### Declaration


```typescript
function signInOrConnect(signInMethod?: OAuthSignInMethod, opts?: SignInOptions): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L9)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| signInMethod _(Optional)_ | [OAuthSignInMethod](#browser.oauthsigninmethod)   |  - |
| opts _(Optional)_ | [SignInOptions](#browser.signinoptions-1)   |  - |



##### Return Value
`Promise<User>`







<a id="browser.authprovider.signout-2"></a>

#### signOut




##### Declaration


```typescript
function signOut(): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L12)*</small>



##### Return Value
`Promise<User>`









<a id="browser.bitskisdkoptions"></a>

####  BitskiSDKOptions





### Properties
<a id="browser.bitskisdkoptions.configuration-1"></a>

#### configuration
```javascript
var configuration: AuthorizationServiceConfiguration
```
<small>*Defined in [browser/src/bitski.ts:45](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L45)*</small>


<a id="browser.bitskisdkoptions.store"></a>

#### store
```javascript
var store: Store
```
<small>*Defined in [browser/src/bitski.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L47)*</small>




<a id="browser.connectbuttonoptions"></a>

####  ConnectButtonOptions


Options for the connect button component






### Properties
<a id="browser.connectbuttonoptions.authmethod"></a>

#### authMethod
```javascript
var authMethod: OAuthSignInMethod
```
<small>*Defined in [browser/src/components/connect-button.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L19)*</small>


<a id="browser.connectbuttonoptions.container"></a>

#### container
```javascript
var container: HTMLElement
```
<small>*Defined in [browser/src/components/connect-button.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L23)*</small>


<a id="browser.connectbuttonoptions.signinoptions"></a>

#### signInOptions
```javascript
var signInOptions: SignInOptions
```
<small>*Defined in [browser/src/components/connect-button.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L21)*</small>


<a id="browser.connectbuttonoptions.size-1"></a>

#### size
```javascript
var size: ConnectButtonSize
```
<small>*Defined in [browser/src/components/connect-button.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L25)*</small>




<a id="browser.jsontransactionobject"></a>

####  JSONTransactionObject





### Properties
<a id="browser.jsontransactionobject.transaction"></a>

#### transaction
```javascript
var transaction: Transaction
```
<small>*Defined in [browser/src/signing/transaction-signer.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/signing/transaction-signer.ts#L9)*</small>




<a id="browser.oauthmanageroptions"></a>

####  OAuthManagerOptions





### Properties
<a id="browser.oauthmanageroptions.additionalscopes"></a>

#### additionalScopes
```javascript
var additionalScopes: string[]
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:28](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L28)*</small>


<a id="browser.oauthmanageroptions.clientid"></a>

#### clientId
```javascript
var clientId: string
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L25)*</small>


<a id="browser.oauthmanageroptions.configuration-2"></a>

#### configuration
```javascript
var configuration: AuthorizationServiceConfiguration
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:27](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L27)*</small>


<a id="browser.oauthmanageroptions.redirecturi"></a>

#### redirectUri
```javascript
var redirectUri: string
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L26)*</small>




<a id="browser.provideroptions"></a>

####  ProviderOptions





### Properties
<a id="browser.provideroptions.additionalheaders"></a>

#### additionalHeaders
```javascript
var additionalHeaders: undefined | object
```
<small>*Defined in [browser/src/bitski.ts:57](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L57)*</small>


<a id="browser.provideroptions.apibaseurl"></a>

#### apiBaseUrl
```javascript
var apiBaseUrl: undefined | string
```
<small>*Defined in [browser/src/bitski.ts:59](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L59)*</small>


<a id="browser.provideroptions.disableblocktracking"></a>

#### disableBlockTracking
```javascript
var disableBlockTracking: undefined | false | true
```
<small>*Defined in [browser/src/bitski.ts:56](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L56)*</small>


<a id="browser.provideroptions.disablecaching"></a>

#### disableCaching
```javascript
var disableCaching: undefined | false | true
```
<small>*Defined in [browser/src/bitski.ts:54](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L54)*</small>


<a id="browser.provideroptions.disablevalidation"></a>

#### disableValidation
```javascript
var disableValidation: undefined | false | true
```
<small>*Defined in [browser/src/bitski.ts:55](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L55)*</small>


<a id="browser.provideroptions.network"></a>

#### network
```javascript
var network: Network
```
<small>*Defined in [browser/src/bitski.ts:52](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L52)*</small>


<a id="browser.provideroptions.networkname"></a>

#### networkName
```javascript
var networkName: undefined | string
```
<small>*Defined in [browser/src/bitski.ts:51](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L51)*</small>


<a id="browser.provideroptions.pollinginterval"></a>

#### pollingInterval
```javascript
var pollingInterval: undefined | number
```
<small>*Defined in [browser/src/bitski.ts:53](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L53)*</small>


<a id="browser.provideroptions.webbaseurl"></a>

#### webBaseUrl
```javascript
var webBaseUrl: undefined | string
```
<small>*Defined in [browser/src/bitski.ts:58](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L58)*</small>




<a id="browser.signinoptions-1"></a>

####  SignInOptions





### Properties
<a id="browser.signinoptions-1.login_hint"></a>

#### login_hint
```javascript
var login_hint: undefined | string
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:32](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L32)*</small>




<a id="browser.signaturepayload"></a>

####  SignaturePayload





### Properties
<a id="browser.signaturepayload.from"></a>

#### from
```javascript
var from: string
```
<small>*Defined in [browser/src/subproviders/signature.ts:32](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L32)*</small>


<a id="browser.signaturepayload.message-3"></a>

#### message
```javascript
var message: string
```
<small>*Defined in [browser/src/subproviders/signature.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L33)*</small>




<a id="browser.store-1"></a>

####  Store





### Methods
<a id="browser.store-1.clear-3"></a>

#### clear




##### Declaration


```typescript
function clear(): any
```
<small>*Defined in [browser/src/utils/store.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/utils/store.ts#L5)*</small>



##### Return Value
`any`







<a id="browser.store-1.clearitem-1"></a>

#### clearItem




##### Declaration


```typescript
function clearItem(key: any): any
```
<small>*Defined in [browser/src/utils/store.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/utils/store.ts#L14)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `any`   |  - |



##### Return Value
`any`







<a id="browser.store-1.getitem-1"></a>

#### getItem




##### Declaration


```typescript
function getItem(key: any): any
```
<small>*Defined in [browser/src/utils/store.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/utils/store.ts#L8)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `any`   |  - |



##### Return Value
`any`







<a id="browser.store-1.setitem-1"></a>

#### setItem




##### Declaration


```typescript
function setItem(key: any, value: any): any
```
<small>*Defined in [browser/src/utils/store.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/utils/store.ts#L11)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `any`   |  - |
| value | `any`   |  - |



##### Return Value
`any`









<a id="browser.transaction-1"></a>

####  Transaction





### Properties
<a id="browser.transaction-1.context"></a>

#### context
```javascript
var context: TransactionContext
```
<small>*Defined in [browser/src/subproviders/signature.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L22)*</small>


<a id="browser.transaction-1.id-1"></a>

#### id
```javascript
var id: string
```
<small>*Defined in [browser/src/subproviders/signature.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L19)*</small>


<a id="browser.transaction-1.kind"></a>

#### kind
```javascript
var kind: TransactionKind
```
<small>*Defined in [browser/src/subproviders/signature.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L20)*</small>


<a id="browser.transaction-1.payload"></a>

#### payload
```javascript
var payload: TransactionPayload | SignaturePayload
```
<small>*Defined in [browser/src/subproviders/signature.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L21)*</small>




<a id="browser.transactioncontext"></a>

####  TransactionContext





### Properties
<a id="browser.transactioncontext.chainid"></a>

#### chainId
```javascript
var chainId: undefined | number
```
<small>*Defined in [browser/src/subproviders/signature.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L26)*</small>


<a id="browser.transactioncontext.currentbalance"></a>

#### currentBalance
```javascript
var currentBalance: undefined | string
```
<small>*Defined in [browser/src/subproviders/signature.ts:27](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L27)*</small>


<a id="browser.transactioncontext.from-1"></a>

#### from
```javascript
var from: undefined | string
```
<small>*Defined in [browser/src/subproviders/signature.ts:28](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L28)*</small>




<a id="browser.transactionpayload"></a>

####  TransactionPayload





### Properties
<a id="browser.transactionpayload.data"></a>

#### data
```javascript
var data: undefined | string
```
<small>*Defined in [browser/src/subproviders/signature.ts:40](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L40)*</small>


<a id="browser.transactionpayload.from-2"></a>

#### from
```javascript
var from: string
```
<small>*Defined in [browser/src/subproviders/signature.ts:37](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L37)*</small>


<a id="browser.transactionpayload.gas"></a>

#### gas
```javascript
var gas: undefined | string
```
<small>*Defined in [browser/src/subproviders/signature.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L42)*</small>


<a id="browser.transactionpayload.gasprice"></a>

#### gasPrice
```javascript
var gasPrice: undefined | string
```
<small>*Defined in [browser/src/subproviders/signature.ts:43](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L43)*</small>


<a id="browser.transactionpayload.nonce"></a>

#### nonce
```javascript
var nonce: undefined | string
```
<small>*Defined in [browser/src/subproviders/signature.ts:41](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L41)*</small>


<a id="browser.transactionpayload.to"></a>

#### to
```javascript
var to: undefined | string
```
<small>*Defined in [browser/src/subproviders/signature.ts:38](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L38)*</small>


<a id="browser.transactionpayload.value"></a>

#### value
```javascript
var value: undefined | string
```
<small>*Defined in [browser/src/subproviders/signature.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L39)*</small>




<a id="browser.typeddatadefinition"></a>

####  TypedDataDefinition





### Properties
<a id="browser.typeddatadefinition.name-3"></a>

#### name
```javascript
var name: string
```
<small>*Defined in [browser/src/subproviders/signature.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L47)*</small>


<a id="browser.typeddatadefinition.type"></a>

#### type
```javascript
var type: string
```
<small>*Defined in [browser/src/subproviders/signature.ts:48](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L48)*</small>




<a id="browser.typeddatapayload"></a>

####  TypedDataPayload


Example usage:

    const payload: TypedDataPayload = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' }
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person' },
          { name: 'contents', type: 'string' }
        ],
      },
      primaryType: 'Mail',
      domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      },
      message: {
        from: {
          name: 'Cow',
          wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        },
        to: {
          name: 'Bob',
          wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        },
        contents: 'Hello, Bob!',
      },
    }






### Properties
<a id="browser.typeddatapayload.domain"></a>

#### domain
```javascript
var domain: object
```
<small>*Defined in [browser/src/subproviders/signature.ts:98](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L98)*</small>


<a id="browser.typeddatapayload.message-4"></a>

#### message
```javascript
var message: object
```
<small>*Defined in [browser/src/subproviders/signature.ts:100](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L100)*</small>


<a id="browser.typeddatapayload.primarytype"></a>

#### primaryType
```javascript
var primaryType: string
```
<small>*Defined in [browser/src/subproviders/signature.ts:99](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L99)*</small>


<a id="browser.typeddatapayload.types"></a>

#### types
```javascript
var types: object
```
<small>*Defined in [browser/src/subproviders/signature.ts:94](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L94)*</small>

##### Type declaration


[propName: `string`]: `TypedDataDefinition[]`





 EIP712Domain: `TypedDataDefinition[]`







<a id="browser.userinforesponse"></a>

####  UserInfoResponse





### Properties
<a id="browser.userinforesponse.accounts-1"></a>

#### accounts
```javascript
var accounts: string[]
```
<small>*Defined in [browser/src/auth/user.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L3)*</small>


<a id="browser.userinforesponse.email-1"></a>

#### email
```javascript
var email: undefined | string
```
<small>*Defined in [browser/src/auth/user.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L4)*</small>


<a id="browser.userinforesponse.email_verified"></a>

#### email_verified
```javascript
var email_verified: undefined | false | true
```
<small>*Defined in [browser/src/auth/user.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L7)*</small>


<a id="browser.userinforesponse.phone_number"></a>

#### phone_number
```javascript
var phone_number: undefined | string
```
<small>*Defined in [browser/src/auth/user.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L5)*</small>


<a id="browser.userinforesponse.phone_number_verified"></a>

#### phone_number_verified
```javascript
var phone_number_verified: undefined | false | true
```
<small>*Defined in [browser/src/auth/user.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L6)*</small>


<a id="browser.userinforesponse.sub"></a>

#### sub
```javascript
var sub: string
```
<small>*Defined in [browser/src/auth/user.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L2)*</small>





<a id="browser.jsonrpcresponsehandler"></a>

####  JSONRPCResponseHandler


```javascript
var JSONRPCResponseHandler: function
```
<small>*Defined in [browser/src/subproviders/signature.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/signature.ts#L9)*</small>

##### Type declaration
function (error?: JsonRpcError, result?: any)
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| error _(Optional)_ | `JsonRpcError`   |  - |
| result _(Optional)_ | `any`   |  - |











<a id="browser.access_token_key"></a>

#### «Const» ACCESS_TOKEN_KEY


```javascript
var ACCESS_TOKEN_KEY: "bitski.access_token" = "bitski.access_token"
```
<small>*Defined in [browser/src/constants.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L34)*</small>





<a id="browser.bitski_rpc_base_url"></a>

#### «Const» BITSKI_RPC_BASE_URL


```javascript
var BITSKI_RPC_BASE_URL: "https://api.bitski.com/v1/web3" = "https://api.bitski.com/v1/web3"
```
<small>*Defined in [browser/src/constants.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L7)*</small>





<a id="browser.bitski_transaction_api_base_url"></a>

#### «Const» BITSKI_TRANSACTION_API_BASE_URL


```javascript
var BITSKI_TRANSACTION_API_BASE_URL: "https://api.bitski.com/v1" = "https://api.bitski.com/v1"
```
<small>*Defined in [browser/src/constants.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L6)*</small>





<a id="browser.bitski_user_api_host"></a>

#### «Const» BITSKI_USER_API_HOST


```javascript
var BITSKI_USER_API_HOST: "https://www.bitski.com/v1" = "https://www.bitski.com/v1"
```
<small>*Defined in [browser/src/constants.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L5)*</small>





<a id="browser.bitski_web_base_url"></a>

#### «Const» BITSKI_WEB_BASE_URL


```javascript
var BITSKI_WEB_BASE_URL: "https://sign.bitski.com" = "https://sign.bitski.com"
```
<small>*Defined in [browser/src/constants.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L8)*</small>





<a id="browser.cached_methods"></a>

#### «Const» CACHED_METHODS


```javascript
var CACHED_METHODS: string[] =  ['eth_accounts']
```
<small>*Defined in [browser/src/constants.ts:38](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L38)*</small>





<a id="browser.check_for_popup_close_interval"></a>

#### «Const» CHECK_FOR_POPUP_CLOSE_INTERVAL


```javascript
var CHECK_FOR_POPUP_CLOSE_INTERVAL: 500 = 500
```
<small>*Defined in [browser/src/constants.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L22)*</small>





<a id="browser.default_authorized_methods"></a>

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
<small>*Defined in [browser/src/constants.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L39)*</small>





<a id="browser.default_optional_scopes"></a>

#### «Const» DEFAULT_OPTIONAL_SCOPES


```javascript
var DEFAULT_OPTIONAL_SCOPES: string[] =  ['offline']
```
<small>*Defined in [browser/src/constants.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L19)*</small>





<a id="browser.default_scopes"></a>

#### «Const» DEFAULT_SCOPES


```javascript
var DEFAULT_SCOPES: string[] =  ['openid']
```
<small>*Defined in [browser/src/constants.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L18)*</small>





<a id="browser.iframe_message_origin_includes"></a>

#### «Const» IFRAME_MESSAGE_ORIGIN_INCLUDES


```javascript
var IFRAME_MESSAGE_ORIGIN_INCLUDES: ".bitski.com" = ".bitski.com"
```
<small>*Defined in [browser/src/constants.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L9)*</small>





<a id="browser.login_hint_signup"></a>

#### «Const» LOGIN_HINT_SIGNUP


```javascript
var LOGIN_HINT_SIGNUP: "signup" = "signup"
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:36](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L36)*</small>





<a id="browser.refresh_token_key"></a>

#### «Const» REFRESH_TOKEN_KEY


```javascript
var REFRESH_TOKEN_KEY: "bitski.refresh_token" = "bitski.refresh_token"
```
<small>*Defined in [browser/src/constants.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L33)*</small>





<a id="browser.sdk_version"></a>

#### «Const» SDK_VERSION


```javascript
var SDK_VERSION: "0.10.4" = "0.10.4"
```
<small>*Defined in [browser/src/constants.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L2)*</small>





<a id="browser.template"></a>

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
<small>*Defined in [browser/src/components/dialog.ts:1](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L1)*</small>





<a id="browser.user_key"></a>

#### «Const» USER_KEY


```javascript
var USER_KEY: "bitski.user" = "bitski.user"
```
<small>*Defined in [browser/src/constants.ts:35](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L35)*</small>






### Functions
<a id="browser.createcenteredpopupfeatures"></a>

###  createCenteredPopupFeatures




##### Declaration


```typescript
function createCenteredPopupFeatures(): any
```
<small>*Defined in [browser/src/auth/popup-handler.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/popup-handler.ts#L47)*</small>



##### Return Value
`any`







<a id="browser.createpopupfeaturestring"></a>

###  createPopupFeatureString




##### Declaration


```typescript
function createPopupFeatureString(features: any): string
```
<small>*Defined in [browser/src/auth/popup-handler.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/popup-handler.ts#L33)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| features | `any`   |  - |



##### Return Value
`string`







<a id="browser.isauthprovider"></a>

###  isAuthProvider




##### Declaration


```typescript
function isAuthProvider(object: any): boolean
```
<small>*Defined in [browser/src/providers/bitski-browser-engine.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-browser-engine.ts#L11)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| object | `any`   |  - |



##### Return Value
`boolean`







<a id="browser.parseresponse"></a>

###  parseResponse



Parses a Fetch Response to extract either the result or the error




##### Declaration


```typescript
function parseResponseT(response: Response): Promise<T>
```
<small>*Defined in [browser/src/utils/request-utils.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/utils/request-utils.ts#L8)*</small>



##### Type parameters

#### T 
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| response | `Response`   |  the fetch response to parse |



##### Return Value
`Promise<T>`








<a id="browser.default_oauth_configuration"></a>

## DEFAULT_OAUTH_CONFIGURATION


<a id="browser.default_oauth_configuration.authorization_endpoint"></a>

####  authorization_endpoint


```javascript
var authorization_endpoint: string = "https://account.bitski.com/oauth2/auth"
```
<small>*Defined in [browser/src/constants.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L13)*</small>





<a id="browser.default_oauth_configuration.revocation_endpoint"></a>

####  revocation_endpoint


```javascript
var revocation_endpoint: string = ""
```
<small>*Defined in [browser/src/constants.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L14)*</small>





<a id="browser.default_oauth_configuration.token_endpoint"></a>

####  token_endpoint


```javascript
var token_endpoint: string = "https://account.bitski.com/oauth2/token"
```
<small>*Defined in [browser/src/constants.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L15)*</small>





<a id="browser.default_oauth_configuration.userinfo_endpoint"></a>

####  userinfo_endpoint


```javascript
var userinfo_endpoint: string = "https://account.bitski.com/userinfo"
```
<small>*Defined in [browser/src/constants.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L16)*</small>







<a id="browser.default_popup_features"></a>

## DEFAULT_POPUP_FEATURES


<a id="browser.default_popup_features.height"></a>

####  height


```javascript
var height: number = 500
```
<small>*Defined in [browser/src/constants.ts:27](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L27)*</small>





<a id="browser.default_popup_features.left"></a>

####  left


```javascript
var left: number = 100
```
<small>*Defined in [browser/src/constants.ts:28](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L28)*</small>





<a id="browser.default_popup_features.location"></a>

####  location


```javascript
var location: string = "no"
```
<small>*Defined in [browser/src/constants.ts:24](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L24)*</small>





<a id="browser.default_popup_features.toolbar"></a>

####  toolbar


```javascript
var toolbar: string = "no"
```
<small>*Defined in [browser/src/constants.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L25)*</small>





<a id="browser.default_popup_features.top"></a>

####  top


```javascript
var top: number = 100
```
<small>*Defined in [browser/src/constants.ts:29](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L29)*</small>





<a id="browser.default_popup_features.width"></a>

####  width


```javascript
var width: number = 500
```
<small>*Defined in [browser/src/constants.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/constants.ts#L26)*</small>









---

<a id="provider"></a>


# Bitski Provider

This package includes our base Web3 provider based on web3-provider-engine. It is intended to be extended for various platforms, as we do in bitski (our browser package), and bitski-node (our Node package).

## Installation

    npm install bitski-provider

## Usage

    import { BitskiEngine } from 'bitski-provider';



<a id="provider.providererrorcode"></a>

####  ProviderErrorCode





<a id="provider.providererrorcode.invalidrequest"></a>

####  InvalidRequest


```javascript
var InvalidRequest:  = 4001
```
<small>*Defined in [provider/src/errors/provider-error.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/errors/provider-error.ts#L5)*</small>





<a id="provider.providererrorcode.subscriptionsunavailable"></a>

####  SubscriptionsUnavailable


```javascript
var SubscriptionsUnavailable:  = 4000
```
<small>*Defined in [provider/src/errors/provider-error.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/errors/provider-error.ts#L3)*</small>








<a id="provider.accesstoken"></a>

##  AccessToken


A token that provides access to Bitski on behalf of a user.



<a id="provider.accesstoken.constructor"></a>
### constructor
```typescript
new AccessToken(token: string, expiresIn?: undefined | number): AccessToken
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| token | `string`   |  - |
| expiresIn _(Optional)_ | `undefined          ⎮number`   |  - |



##### Return Value
[AccessToken](#provider.accesstoken)





---

### Properties
<a id="provider.accesstoken.expiresat"></a>

#### expiresAt
```javascript
var expiresAt: undefined | number =  undefined
```
<small>*Defined in [provider/src/auth/access-token.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/auth/access-token.ts#L6)*</small>


<a id="provider.accesstoken.token"></a>

#### token
```javascript
var token: string
```
<small>*Defined in [provider/src/auth/access-token.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/auth/access-token.ts#L5)*</small>




---

<a id="provider.accesstoken.expired"></a>

####  expired



getexpired(): boolean
##### Return Value
`boolean`







---



---

<a id="provider.authenticatedfetchsubprovider"></a>

##  AuthenticatedFetchSubprovider


<a id="provider.authenticatedfetchsubprovider.constructor-1"></a>
### constructor
```typescript
new AuthenticatedFetchSubprovider(rpcUrl: string, debug: boolean, accessTokenProvider: AccessTokenProvider, defaultHeaders?: object): AuthenticatedFetchSubprovider
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| rpcUrl | `string`  | - |   - |
| debug | `boolean`  | - |   - |
| accessTokenProvider | [AccessTokenProvider](#provider.accesstokenprovider)  | - |   - |
| defaultHeaders | `object`  |  {} |   - |



##### Return Value
[AuthenticatedFetchSubprovider](#provider.authenticatedfetchsubprovider)





---

### Properties



---

### Methods





<a id="provider.authenticatedfetchsubprovider.handleauthenticatedrequest"></a>

#### handleAuthenticatedRequest




##### Declaration


```typescript
function handleAuthenticatedRequest(payload: any, next: any, end: any)
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:30](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L30)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="provider.authenticatedfetchsubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L22)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="provider.authenticatedfetchsubprovider.handleunauthenticatedrequest"></a>

#### handleUnauthenticatedRequest




##### Declaration


```typescript
function handleUnauthenticatedRequest(payload: any, next: any, end: any)
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L39)*</small>



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

<a id="provider.bitskiengine"></a>

##  BitskiEngine


<a id="provider.bitskiengine.constructor-2"></a>
### constructor
```typescript
new BitskiEngine(options?: BitskiEngineOptions): BitskiEngine
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options _(Optional)_ | [BitskiEngineOptions](#provider.bitskiengineoptions)   |  - |



##### Return Value
[BitskiEngine](#provider.bitskiengine)





---

### Properties




---

### Methods





















<a id="provider.bitskiengine.subscribe"></a>

#### subscribe




##### Declaration


```typescript
function subscribe(subscribeMethod?: string, subscriptionMethod: string, parameters: any[]): Promise<string>
```
<small>*Defined in [provider/src/bitski-engine.ts:75](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/bitski-engine.ts#L75)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| subscribeMethod | `string`  | &quot;eth_subscribe&quot; |   - |
| subscriptionMethod | `string`  | - |   - |
| parameters | `any[]`  | - |   - |



##### Return Value
`Promise<string>`







<a id="provider.bitskiengine.supportssubscriptions"></a>

#### supportsSubscriptions




##### Declaration


```typescript
function supportsSubscriptions(): boolean
```
<small>*Defined in [provider/src/bitski-engine.ts:71](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/bitski-engine.ts#L71)*</small>



##### Return Value
`boolean`







<a id="provider.bitskiengine.unsubscribe"></a>

#### unsubscribe




##### Declaration


```typescript
function unsubscribe(subscriptionId: string, unsubscribeMethod?: string): Promise<boolean>
```
<small>*Defined in [provider/src/bitski-engine.ts:81](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/bitski-engine.ts#L81)*</small>



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

<a id="provider.noncetrackersubprovider"></a>

##  NonceTrackerSubprovider


A subprovider that tracks and automatically increments the nonce on the client. Heavily based on the provider-engine NonceTrackerSubprovider, but modified for Bitski's transaction flow.



<a id="provider.noncetrackersubprovider.constructor-3"></a>
### constructor
```typescript
new NonceTrackerSubprovider(): NonceTrackerSubprovider
```
##### Return Value
[NonceTrackerSubprovider](#provider.noncetrackersubprovider)





---

### Properties



---

### Methods





<a id="provider.noncetrackersubprovider.handlerequest-1"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [provider/src/subproviders/nonce-tracker.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/nonce-tracker.ts#L17)*</small>



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

<a id="provider.providererror"></a>

##  ProviderError


<a id="provider.providererror.constructor-4"></a>
### constructor
```typescript
new ProviderError(message: string, code: ProviderErrorCode): ProviderError
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string`   |  - |
| code | [ProviderErrorCode](#provider.providererrorcode)   |  - |



##### Return Value
[ProviderError](#provider.providererror)





---

### Properties
<a id="provider.providererror.code"></a>

#### code
```javascript
var code: ProviderErrorCode
```
<small>*Defined in [provider/src/errors/provider-error.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/errors/provider-error.ts#L19)*</small>



<a id="provider.providererror.name"></a>

#### name
```javascript
var name: string = "ProviderError"
```
<small>*Defined in [provider/src/errors/provider-error.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/errors/provider-error.ts#L18)*</small>



<a id="provider.providererror.error"></a>

#### Error
```javascript
var Error: ErrorConstructor
```
<small>*Defined in [/Users/ptescher/Development/BitskiCo/bitski-js/node_modules/typescript/lib/lib.es5.d.ts:974](https://github.com/BitskiCo/bitski-js/blob/master/packages//Users/ptescher/Development/BitskiCo/bitski-js/node_modules/typescript/lib/lib.es5.d.ts#L974)*</small>




---

### Methods
<a id="provider.providererror.invalidrequest-1"></a>

#### InvalidRequest




##### Declaration


```typescript
function InvalidRequest(reason: string): ProviderError
```
<small>*Defined in [provider/src/errors/provider-error.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/errors/provider-error.ts#L14)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| reason | `string`   |  - |



##### Return Value
[ProviderError](#provider.providererror)







<a id="provider.providererror.subscriptionsunavailable-1"></a>

#### SubscriptionsUnavailable




##### Declaration


```typescript
function SubscriptionsUnavailable(): ProviderError
```
<small>*Defined in [provider/src/errors/provider-error.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/errors/provider-error.ts#L10)*</small>



##### Return Value
[ProviderError](#provider.providererror)









---


### Relationships
##### Extends
* Error

---

<a id="provider.servererror"></a>

##  ServerError


Represents an error that is received from the server You can access the response code via the code property, and the URI from the requestURI property. The retried property will indicate whether or not the request failed after multiple tries.



<a id="provider.servererror.constructor-5"></a>
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
[ServerError](#provider.servererror)





---

### Properties
<a id="provider.servererror.code-1"></a>

#### code
```javascript
var code: number
```
<small>*Defined in [provider/src/errors/server-error.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/errors/server-error.ts#L10)*</small>



<a id="provider.servererror.name-1"></a>

#### name
```javascript
var name: string = "ServerError"
```
<small>*Defined in [provider/src/errors/server-error.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/errors/server-error.ts#L7)*</small>


<a id="provider.servererror.requesturi"></a>

#### requestURI
```javascript
var requestURI: string
```
<small>*Defined in [provider/src/errors/server-error.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/errors/server-error.ts#L16)*</small>


<a id="provider.servererror.retried"></a>

#### retried
```javascript
var retried: boolean
```
<small>*Defined in [provider/src/errors/server-error.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/errors/server-error.ts#L13)*</small>



<a id="provider.servererror.error-1"></a>

#### Error
```javascript
var Error: ErrorConstructor
```
<small>*Defined in [/Users/ptescher/Development/BitskiCo/bitski-js/node_modules/typescript/lib/lib.es5.d.ts:974](https://github.com/BitskiCo/bitski-js/blob/master/packages//Users/ptescher/Development/BitskiCo/bitski-js/node_modules/typescript/lib/lib.es5.d.ts#L974)*</small>




---


### Relationships
##### Extends
* Error

---

<a id="provider.transactionvalidatorsubprovider"></a>

##  TransactionValidatorSubprovider


A subprovider that automatically populates missing transaction details. This is needed because it has become common to submit transactions with only some of the parameters and rely on the provider or node to fill in the rest.



### Properties



---

### Methods





<a id="provider.transactionvalidatorsubprovider.handlerequest-2"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, _: any)
```
<small>*Defined in [provider/src/subproviders/transaction-validator.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/transaction-validator.ts#L10)*</small>



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

<a id="provider.typeddatasanitizersubprovider"></a>

##  TypedDataSanitizerSubprovider


### Properties



---

### Methods





<a id="provider.typeddatasanitizersubprovider.handlerequest-3"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: JSONRPCRequestPayload, next: function, end: function)
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L33)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | [JSONRPCRequestPayload](#provider.jsonrpcrequestpayload)   |  - |
| next | `function`   |  - |
| end | `function`   |  - |























---


### Relationships
##### Extends
* Subprovider

---


<a id="provider.accesstokenprovider"></a>

####  AccessTokenProvider





### Methods
<a id="provider.accesstokenprovider.getaccesstoken"></a>

#### getAccessToken




##### Declaration


```typescript
function getAccessToken(): Promise<string>
```
<small>*Defined in [provider/src/auth/access-token-provider.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/auth/access-token-provider.ts#L2)*</small>



##### Return Value
`Promise<string>`







<a id="provider.accesstokenprovider.invalidatetoken"></a>

#### invalidateToken




##### Declaration


```typescript
function invalidateToken(): Promise<void>
```
<small>*Defined in [provider/src/auth/access-token-provider.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/auth/access-token-provider.ts#L3)*</small>



##### Return Value
`Promise<void>`









<a id="provider.bitskiengineoptions"></a>

####  BitskiEngineOptions





### Properties
<a id="provider.bitskiengineoptions.disableblocktracking"></a>

#### disableBlockTracking
```javascript
var disableBlockTracking: undefined | false | true
```
<small>*Defined in [provider/src/bitski-engine.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/bitski-engine.ts#L23)*</small>


<a id="provider.bitskiengineoptions.disablecaching"></a>

#### disableCaching
```javascript
var disableCaching: undefined | false | true
```
<small>*Defined in [provider/src/bitski-engine.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/bitski-engine.ts#L19)*</small>


<a id="provider.bitskiengineoptions.disablevalidation"></a>

#### disableValidation
```javascript
var disableValidation: undefined | false | true
```
<small>*Defined in [provider/src/bitski-engine.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/bitski-engine.ts#L21)*</small>


<a id="provider.bitskiengineoptions.pollinginterval"></a>

#### pollingInterval
```javascript
var pollingInterval: undefined | number
```
<small>*Defined in [provider/src/bitski-engine.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/bitski-engine.ts#L17)*</small>




<a id="provider.jsonrpcrequestpayload"></a>

####  JSONRPCRequestPayload





### Properties
<a id="provider.jsonrpcrequestpayload.id"></a>

#### id
```javascript
var id: number
```
<small>*Defined in [provider/src/index.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/index.ts#L12)*</small>


<a id="provider.jsonrpcrequestpayload.jsonrpc"></a>

#### jsonrpc
```javascript
var jsonrpc: string
```
<small>*Defined in [provider/src/index.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/index.ts#L13)*</small>


<a id="provider.jsonrpcrequestpayload.method"></a>

#### method
```javascript
var method: string
```
<small>*Defined in [provider/src/index.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/index.ts#L11)*</small>


<a id="provider.jsonrpcrequestpayload.params"></a>

#### params
```javascript
var params: any[]
```
<small>*Defined in [provider/src/index.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/index.ts#L10)*</small>




<a id="provider.jsonrpcresponsepayload"></a>

####  JSONRPCResponsePayload





### Properties
<a id="provider.jsonrpcresponsepayload.id-1"></a>

#### id
```javascript
var id: number
```
<small>*Defined in [provider/src/index.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/index.ts#L18)*</small>


<a id="provider.jsonrpcresponsepayload.jsonrpc-1"></a>

#### jsonrpc
```javascript
var jsonrpc: string
```
<small>*Defined in [provider/src/index.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/index.ts#L19)*</small>


<a id="provider.jsonrpcresponsepayload.result"></a>

#### result
```javascript
var result: any
```
<small>*Defined in [provider/src/index.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/index.ts#L17)*</small>




<a id="provider.network"></a>

####  Network





### Properties
<a id="provider.network.chainid"></a>

#### chainId
```javascript
var chainId: number
```
<small>*Defined in [provider/src/network.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/network.ts#L3)*</small>


<a id="provider.network.rpcurl"></a>

#### rpcUrl
```javascript
var rpcUrl: string
```
<small>*Defined in [provider/src/network.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/network.ts#L2)*</small>




<a id="provider.propertydef"></a>

####  PropertyDef





### Properties
<a id="provider.propertydef.name-2"></a>

#### name
```javascript
var name: string
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L7)*</small>


<a id="provider.propertydef.type"></a>

#### type
```javascript
var type: string
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L8)*</small>




<a id="provider.typemapping"></a>

####  TypeMapping


```javascript
var TypeMapping: 
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L25)*</small>





<a id="provider.typeddata"></a>

####  TypedData





### Properties
<a id="provider.typeddata.domain"></a>

#### domain
```javascript
var domain: any
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L20)*</small>


<a id="provider.typeddata.message-2"></a>

#### message
```javascript
var message: any
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L22)*</small>


<a id="provider.typeddata.primarytype"></a>

#### primaryType
```javascript
var primaryType: string
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L21)*</small>


<a id="provider.typeddata.types"></a>

#### types
```javascript
var types: TypedDataTypes
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L19)*</small>




<a id="provider.typeddatatypes"></a>

####  TypedDataTypes





### Properties
<a id="provider.typeddatatypes.eip712domain"></a>

#### EIP712Domain
```javascript
var EIP712Domain: TypeDefinition
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L14)*</small>





<a id="provider.typedefinition"></a>

####  TypeDefinition


```javascript
var TypeDefinition: PropertyDef[]
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L11)*</small>






<a id="provider.authenticated_methods"></a>

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
<small>*Defined in [provider/src/constants.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/constants.ts#L2)*</small>





<a id="provider.retriable_errors"></a>

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
<small>*Defined in [provider/src/constants.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/constants.ts#L12)*</small>





<a id="provider.unauthorized_errors"></a>

#### «Const» UNAUTHORIZED_ERRORS


```javascript
var UNAUTHORIZED_ERRORS: string[] =  [
  'Missing auth', // No token sent
  'Invalid client id', // Wrong client id, or invalid access token
  'Not Authorized',
]
```
<small>*Defined in [provider/src/constants.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/constants.ts#L26)*</small>






### Functions
<a id="provider.createtypemapping"></a>

###  createTypeMapping



Maps the type definitions from the typed data for easy look-up. Top level keys represent the structs defined, while top-level values are an object keyed by property with string values of the type name.

For example: { EIP712Domain: { name: 'string', version: 'string', chainId: 'uint256' } }




##### Declaration


```typescript
function createTypeMapping(typedData: TypedData): TypeMapping
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:181](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L181)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| typedData | [TypedData](#provider.typeddata)   |  The TypedData to map |



##### Return Value
[TypeMapping](#provider.typemapping)


the mapped data schema






<a id="provider.encodenumber"></a>

###  encodeNumber



encodeNumber Takes a decimal string, hex string, regular number, or BN instance and returns a hex string in the specified format. Typically these conversions are done in web3, but until web3 adds direct support, this is necessary for normalizing numbers eth_signTypedData payloads.




##### Declaration


```typescript
function encodeNumber(num: string | number | BN, type: string, compact?: boolean): string
```
<small>*Defined in [provider/src/utils/parse-utils.ts:53](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/utils/parse-utils.ts#L53)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| num | `string          ⎮number          ⎮BN`  | - |   The value to convert |
| type | `string`  | - |   The solidity ABI type to format the data as (eg. uint256, int8, etc). Only supports int and uint variants. |
| compact | `boolean`  | false |   boolean (default false). Whether to use compact encoding for uints, or pad with zeroes. |



##### Return Value
`string`


A hex string formatted as the specified type.






<a id="provider.isarray"></a>

###  isArray



Returns true if type name indicates that an array




##### Declaration


```typescript
function isArray(typeName: string): boolean
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:158](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L158)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| typeName | `string`   |  solidity type name |



##### Return Value
`boolean`







<a id="provider.parsebitwidth"></a>

###  parseBitWidth




##### Declaration


```typescript
function parseBitWidth(type: string, offset: number): number
```
<small>*Defined in [provider/src/utils/parse-utils.ts:30](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/utils/parse-utils.ts#L30)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  - |
| offset | `number`   |  - |



##### Return Value
`number`







<a id="provider.parsenumber"></a>

###  parseNumber



parseNumber Converts a value that represents a number into a hex value.




##### Declaration


```typescript
function parseNumber(arg: string | number | BN): BN
```
<small>*Defined in [provider/src/utils/parse-utils.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/utils/parse-utils.ts#L12)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| arg | `string          ⎮number          ⎮BN`   |  A number value to convert to hex.Can be a regular number, base-10 string, base-16 string, or BN instance. |



##### Return Value
`BN`


BN instance representing the number

(Adapted from ethereumjs-abi)






<a id="provider.sanitizedomain"></a>

###  sanitizeDomain



Sanitizes the `domain` values from the TypedData




##### Declaration


```typescript
function sanitizeDomain(typedData: TypedData, typeMapping: TypeMapping)
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:77](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L77)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| typedData | [TypedData](#provider.typeddata)   |  TypedData payload |
| typeMapping | [TypeMapping](#provider.typemapping)   |  a TypeMapping pre-generated from the TypedData |








<a id="provider.sanitizemessage"></a>

###  sanitizeMessage



Sanitizes the `message` values from the TypedData




##### Declaration


```typescript
function sanitizeMessage(typedData: TypedData, typeMapping: TypeMapping)
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:93](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L93)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| typedData | [TypedData](#provider.typeddata)   |  TypedData payload |
| typeMapping | [TypeMapping](#provider.typemapping)   |  a TypeMapping pre-generated from the TypedData |








<a id="provider.sanitizetype"></a>

###  sanitizeType



Recursively examines each value and determines type from the type mapping to format and sanitize the value if needed.

Currently this will only convert number values into a consistent hex format, but in the future additional transformations may be necessary.




##### Declaration


```typescript
function sanitizeType(typeName: string, values: any, typeMapping: TypeMapping)
```
<small>*Defined in [provider/src/subproviders/typed-data.ts:114](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/typed-data.ts#L114)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| typeName | `string`   |  Name of the type we are starting from |
| values | `any`   |  The root object containing the keys and values |
| typeMapping | [TypeMapping](#provider.typemapping)   |  The type mapping that represents this data |









<a id="provider.kovan"></a>

## Kovan


<a id="provider.kovan.chainid-1"></a>

####  chainId


```javascript
var chainId: number = 42
```
<small>*Defined in [provider/src/network.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/network.ts#L17)*</small>





<a id="provider.kovan.rpcurl-1"></a>

####  rpcUrl


```javascript
var rpcUrl: string = "https://api.bitski.com/v1/web3/kovan"
```
<small>*Defined in [provider/src/network.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/network.ts#L18)*</small>







<a id="provider.mainnet"></a>

## Mainnet


<a id="provider.mainnet.chainid-2"></a>

####  chainId


```javascript
var chainId: number = 1
```
<small>*Defined in [provider/src/network.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/network.ts#L7)*</small>





<a id="provider.mainnet.rpcurl-2"></a>

####  rpcUrl


```javascript
var rpcUrl: string = "https://api.bitski.com/v1/web3/mainnet"
```
<small>*Defined in [provider/src/network.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/network.ts#L8)*</small>







<a id="provider.rinkeby"></a>

## Rinkeby


<a id="provider.rinkeby.chainid-3"></a>

####  chainId


```javascript
var chainId: number = 4
```
<small>*Defined in [provider/src/network.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/network.ts#L12)*</small>





<a id="provider.rinkeby.rpcurl-3"></a>

####  rpcUrl


```javascript
var rpcUrl: string = "https://api.bitski.com/v1/web3/rinkeby"
```
<small>*Defined in [provider/src/network.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/network.ts#L13)*</small>











