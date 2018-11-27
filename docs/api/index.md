---
---



#  Bitski.js

## Index

### External modules

* ["access-token"](#_access_token_)
* ["auth/auth-provider"](#_auth_auth_provider_)
* ["auth/openid-auth-provider"](#_auth_openid_auth_provider_)
* ["bitski"](#_bitski_)
* ["components/connect-button"](#_components_connect_button_)
* ["components/dialog"](#_components_dialog_)
* ["subproviders/authenticated-cache"](#_subproviders_authenticated_cache_)
* ["subproviders/authenticated-fetch"](#_subproviders_authenticated_fetch_)
* ["subproviders/authorization-handler"](#_subproviders_authorization_handler_)
* ["subproviders/iframe"](#_subproviders_iframe_)
* ["subproviders/local-dialog"](#_subproviders_local_dialog_)



---

<a id="_access_token_"></a>


<a id="_access_token_.accesstoken"></a>

##  AccessToken


A token that provides access to Bitski on behalf of a user.



<a id="_access_token_.accesstoken.constructor"></a>
### constructor
```typescript
new AccessToken(token: string, expiresAt?: undefined | number): AccessToken
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| token | `string`   |  - |
| expiresAt _(Optional)_ | `undefined          ⎮number`   |  - |



##### Return Value
[AccessToken](#_access_token_.accesstoken)





---

### Properties
<a id="_access_token_.accesstoken.expiresat"></a>

#### expiresAt
```javascript
var expiresAt: undefined | number =  undefined
```
<small>*Defined in [access-token.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/src/access-token.ts#L6)*</small>


<a id="_access_token_.accesstoken.token"></a>

#### token
```javascript
var token: string
```
<small>*Defined in [access-token.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/src/access-token.ts#L5)*</small>




---

<a id="_access_token_.accesstoken.expired"></a>

####  expired



getexpired(): boolean
##### Return Value
`boolean`







---



---



---

<a id="_auth_auth_provider_"></a>


<a id="_auth_auth_provider_.oauthproviderintegrationtype"></a>

####  OAuthProviderIntegrationType





<a id="_auth_auth_provider_.oauthproviderintegrationtype.iframe"></a>

####  IFRAME


```javascript
var IFRAME: 
```
<small>*Defined in [auth/auth-provider.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/auth-provider.ts#L4)*</small>





<a id="_auth_auth_provider_.oauthproviderintegrationtype.popup"></a>

####  POPUP


```javascript
var POPUP: 
```
<small>*Defined in [auth/auth-provider.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/auth-provider.ts#L6)*</small>





<a id="_auth_auth_provider_.oauthproviderintegrationtype.redirect"></a>

####  REDIRECT


```javascript
var REDIRECT: 
```
<small>*Defined in [auth/auth-provider.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/auth-provider.ts#L5)*</small>





<a id="_auth_auth_provider_.oauthproviderintegrationtype.silent"></a>

####  SILENT


```javascript
var SILENT: 
```
<small>*Defined in [auth/auth-provider.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/auth-provider.ts#L7)*</small>








<a id="_auth_auth_provider_.authprovider"></a>

####  AuthProvider





### Methods
<a id="_auth_auth_provider_.authprovider.getaccesstoken"></a>

#### getAccessToken




##### Declaration


```typescript
function getAccessToken(): Promise<string>
```
<small>*Defined in [auth/auth-provider.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/auth-provider.ts#L11)*</small>



##### Return Value
`Promise<string>`







<a id="_auth_auth_provider_.authprovider.getuser"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [auth/auth-provider.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/auth-provider.ts#L13)*</small>



##### Return Value
`Promise<User>`







<a id="_auth_auth_provider_.authprovider.getuserorsignin"></a>

#### getUserOrSignIn




##### Declaration


```typescript
function getUserOrSignIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [auth/auth-provider.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/auth-provider.ts#L16)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  - |



##### Return Value
`Promise<User>`







<a id="_auth_auth_provider_.authprovider.signin"></a>

#### signIn




##### Declaration


```typescript
function signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [auth/auth-provider.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/auth-provider.ts#L12)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  - |



##### Return Value
`Promise<User>`







<a id="_auth_auth_provider_.authprovider.signincallback"></a>

#### signInCallback




##### Declaration


```typescript
function signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType, url?: undefined | string): Promise<User>
```
<small>*Defined in [auth/auth-provider.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/auth-provider.ts#L14)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  - |
| url _(Optional)_ | `undefined          ⎮string`   |  - |



##### Return Value
`Promise<User>`







<a id="_auth_auth_provider_.authprovider.signout"></a>

#### signOut




##### Declaration


```typescript
function signOut(): Promise<any>
```
<small>*Defined in [auth/auth-provider.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/auth-provider.ts#L15)*</small>



##### Return Value
`Promise<any>`











---

<a id="_auth_openid_auth_provider_"></a>


<a id="_auth_openid_auth_provider_.openidauthprovider"></a>

##  OpenidAuthProvider


<a id="_auth_openid_auth_provider_.openidauthprovider.constructor"></a>
### constructor
```typescript
new OpenidAuthProvider(clientId: string, redirectUri?: undefined | string, postLogoutRedirectUri?: undefined | string, otherSettings?: undefined | object): OpenidAuthProvider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |  - |
| redirectUri _(Optional)_ | `undefined          ⎮string`   |  - |
| postLogoutRedirectUri _(Optional)_ | `undefined          ⎮string`   |  - |
| otherSettings _(Optional)_ | `undefined          ⎮object`   |  - |



##### Return Value
[OpenidAuthProvider](#_auth_openid_auth_provider_.openidauthprovider)





---

### Properties
<a id="_auth_openid_auth_provider_.openidauthprovider.timeout"></a>

#### timeout
```javascript
var timeout: number = 5000
```
<small>*Defined in [auth/openid-auth-provider.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L7)*</small>


<a id="_auth_openid_auth_provider_.openidauthprovider.usermanager"></a>

#### userManager
```javascript
var userManager: UserManager
```
<small>*Defined in [auth/openid-auth-provider.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L9)*</small>




---

### Methods
<a id="_auth_openid_auth_provider_.openidauthprovider.getaccesstoken"></a>

#### getAccessToken




##### Declaration


```typescript
function getAccessToken(): Promise<string>
```
<small>*Defined in [auth/openid-auth-provider.ts:37](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L37)*</small>



##### Return Value
`Promise<string>`







<a id="_auth_openid_auth_provider_.openidauthprovider.getuser"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [auth/openid-auth-provider.ts:78](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L78)*</small>



##### Return Value
`Promise<User>`







<a id="_auth_openid_auth_provider_.openidauthprovider.getuserorsignin"></a>

#### getUserOrSignIn




##### Declaration


```typescript
function getUserOrSignIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [auth/openid-auth-provider.ts:96](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L96)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  - |



##### Return Value
`Promise<User>`







<a id="_auth_openid_auth_provider_.openidauthprovider.requestsignout"></a>

#### requestSignOut




##### Declaration


```typescript
private function requestSignOut(accessToken: string): Promise<any>
```
<small>*Defined in [auth/openid-auth-provider.ts:144](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L144)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `string`   |  - |



##### Return Value
`Promise<any>`







<a id="_auth_openid_auth_provider_.openidauthprovider.sendrequest"></a>

#### sendRequest




##### Declaration


```typescript
private function sendRequest(request: any): Promise<any>
```
<small>*Defined in [auth/openid-auth-provider.ts:154](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L154)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| request | `any`   |  - |



##### Return Value
`Promise<any>`







<a id="_auth_openid_auth_provider_.openidauthprovider.signin"></a>

#### signIn




##### Declaration


```typescript
function signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [auth/openid-auth-provider.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L47)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  - |



##### Return Value
`Promise<User>`







<a id="_auth_openid_auth_provider_.openidauthprovider.signincallback"></a>

#### signInCallback




##### Declaration


```typescript
function signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType, url?: undefined | string): Promise<User>
```
<small>*Defined in [auth/openid-auth-provider.ts:107](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L107)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  - |
| url _(Optional)_ | `undefined          ⎮string`   |  - |



##### Return Value
`Promise<User>`







<a id="_auth_openid_auth_provider_.openidauthprovider.signout"></a>

#### signOut




##### Declaration


```typescript
function signOut(): Promise<any>
```
<small>*Defined in [auth/openid-auth-provider.ts:129](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L129)*</small>



##### Return Value
`Promise<any>`









---


### Relationships
##### Implements
* [&quot;auth/auth-provider&quot;](#_auth_auth_provider_).[AuthProvider](#_auth_auth_provider_.authprovider)

---


<a id="_auth_openid_auth_provider_.bitski_user_api_host"></a>

#### «Const» BITSKI_USER_API_HOST


```javascript
var BITSKI_USER_API_HOST: "https://www.bitski.com/v1" = "https://www.bitski.com/v1"
```
<small>*Defined in [auth/openid-auth-provider.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L4)*</small>







---

<a id="_bitski_"></a>


<a id="_bitski_.bitski"></a>

##  Bitski


Bitski SDK



<a id="_bitski_.bitski.constructor"></a>
### constructor
```typescript
new Bitski(clientId: string, redirectUri?: undefined | string, postLogoutRedirectUri?: undefined | string, otherSettings?: undefined | object): Bitski
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |  OAuth Client ID |
| redirectUri _(Optional)_ | `undefined          ⎮string`   |  Redirect URL, defaults to window.URL |
| postLogoutRedirectUri _(Optional)_ | `undefined          ⎮string`   |  Post logout redirect URL, defaults to window.URL |
| otherSettings _(Optional)_ | `undefined          ⎮object`   |  Other OAuth settings. Don't change these unless you know what you are doing. |



##### Return Value
[Bitski](#_bitski_.bitski)





---

### Properties
<a id="_bitski_.bitski.authprovider"></a>

#### authProvider
```javascript
private var authProvider: AuthProvider
```
<small>*Defined in [bitski.ts:29](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L29)*</small>


<a id="_bitski_.bitski.clientid"></a>

#### clientId
```javascript
private var clientId: string
```
<small>*Defined in [bitski.ts:28](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L28)*</small>


<a id="_bitski_.bitski.engines"></a>

#### engines
```javascript
private var engines: Map<string, any> =  new Map<string, ProviderEngine>()
```
<small>*Defined in [bitski.ts:27](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L27)*</small>




---

### Methods
<a id="_bitski_.bitski.adddefaultsubproviders"></a>

#### addDefaultSubproviders




##### Declaration


```typescript
private function addDefaultSubproviders(engine: ProviderEngine, enableCache?: boolean)
```
<small>*Defined in [bitski.ts:165](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L165)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| engine | `ProviderEngine`  | - |   - |
| enableCache | `boolean`  |  ENABLE_CACHE |   - |








<a id="_bitski_.bitski.assumedcallbacktype"></a>

#### assumedCallbackType




##### Declaration


```typescript
private function assumedCallbackType(w: Window): OAuthProviderIntegrationType
```
<small>*Defined in [bitski.ts:138](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L138)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| w | `Window`   |  - |



##### Return Value
[OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)







<a id="_bitski_.bitski.createbitskiengine"></a>

#### createBitskiEngine




##### Declaration


```typescript
private function createBitskiEngine(networkName?: undefined | string, options?: any): ProviderEngine
```
<small>*Defined in [bitski.ts:190](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L190)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| networkName _(Optional)_ | `undefined          ⎮string`   |  - |
| options _(Optional)_ | `any`   |  - |



##### Return Value
`ProviderEngine`







<a id="_bitski_.bitski.createengine"></a>

#### createEngine




##### Declaration


```typescript
private function createEngine(subproviders: Subprovider[], options?: any): ProviderEngine
```
<small>*Defined in [bitski.ts:147](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L147)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| subproviders | `Subprovider[]`   |  - |
| options _(Optional)_ | `any`   |  - |



##### Return Value
`ProviderEngine`







<a id="_bitski_.bitski.createthirdpartyengine"></a>

#### createThirdPartyEngine




##### Declaration


```typescript
private function createThirdPartyEngine(rpcUrl: string, options?: any): ProviderEngine
```
<small>*Defined in [bitski.ts:203](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L203)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| rpcUrl | `string`   |  - |
| options _(Optional)_ | `any`   |  - |



##### Return Value
`ProviderEngine`







<a id="_bitski_.bitski.getconnectbutton"></a>

#### getConnectButton



Creates a sign in with bitski button to add to your app. If an HTML element is passed in as the first parameter, it will automatically add it to the DOM inside that element. Make sure to add a callback to get notified of login events.




##### Declaration


```typescript
function getConnectButton(existingDiv?: HTMLElement, size?: ConnectButtonSize, authMethod?: OAuthProviderIntegrationType, callback?: undefined | function): ConnectButton
```
<small>*Defined in [bitski.ts:87](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L87)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| existingDiv _(Optional)_ | `HTMLElement`  | - |   Existing element to turn into a Bitski connect button |
| size | [ConnectButtonSize](#_components_connect_button_.connectbuttonsize)  |  ConnectButtonSize.MEDIUM |   Size of button to generate. Defaults to medium. |
| authMethod | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)  |  OAuthProviderIntegrationType.POPUP |   Login method to use. Defaults to popup. |
| callback _(Optional)_ | `undefined          ⎮function`  | - |   Post-login callback. Called when sign in is complete. Not applicable for redirect login method. |



##### Return Value
[ConnectButton](#_components_connect_button_.connectbutton)







<a id="_bitski_.bitski.getprovider"></a>

#### getProvider



Returns a new web3 provider for a given network.




##### Declaration


```typescript
function getProvider(networkName?: undefined | string, options?: any): ProviderEngine
```
<small>*Defined in [bitski.ts:48](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L48)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| networkName _(Optional)_ | `undefined          ⎮string`   |  optional name of the network to use, or host for a local provider. Defaults to mainnet. |
| options _(Optional)_ | `any`   |  options for the provider |



##### Return Value
`ProviderEngine`







<a id="_bitski_.bitski.getuser"></a>

#### getUser



Gets the current signed in user. Will return an error if we are not signed in.




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [bitski.ts:74](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L74)*</small>



##### Return Value
`Promise<User>`







<a id="_bitski_.bitski.getuserorsignin"></a>

#### getUserOrSignIn



Gets the current user if it exists. If not, signs in. Unlike `getUser` this will never return an expired user or null.




##### Declaration


```typescript
function getUserOrSignIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [bitski.ts:104](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L104)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  Optionally specify an integration type. Defaults to REDIRECT. |



##### Return Value
`Promise<User>`







<a id="_bitski_.bitski.setlogger"></a>

#### setLogger



Set logger and log level for debugging purposes




##### Declaration


```typescript
function setLogger(logger: any, level?: undefined | number)
```
<small>*Defined in [bitski.ts:131](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L131)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| logger | `any`   |  The logger to use (i.e. console). Must support methods info(), warn(), and error(). |
| level _(Optional)_ | `undefined          ⎮number`   |  The desired log level.Use 0 for none (the default), 1 for errors, 2 for warnings, 3 for info, and 4 for debug. |








<a id="_bitski_.bitski.signin"></a>

#### signIn



Starts sign in flow.




##### Declaration


```typescript
function signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [bitski.ts:95](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L95)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  - |



##### Return Value
`Promise<User>`







<a id="_bitski_.bitski.signincallback"></a>

#### signInCallback



Called from your oauth redirect page.




##### Declaration


```typescript
function signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType, url?: undefined | string): Promise<User>
```
<small>*Defined in [bitski.ts:113](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L113)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  Log in method used. Must match the method actually used when logging in. |
| url _(Optional)_ | `undefined          ⎮string`   |  Optionally provide the full callback url including the query params in cases when it cannot be automatically detected |



##### Return Value
`Promise<User>`







<a id="_bitski_.bitski.signout"></a>

#### signOut



Sign the current user out of your application.




##### Declaration


```typescript
function signOut(): Promise<void>
```
<small>*Defined in [bitski.ts:120](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L120)*</small>



##### Return Value
`Promise<void>`









---



---


<a id="_bitski_.enable_cache"></a>

#### «Const» ENABLE_CACHE


```javascript
var ENABLE_CACHE: true = true
```
<small>*Defined in [bitski.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L21)*</small>







---

<a id="_components_connect_button_"></a>


<a id="_components_connect_button_.connectbuttonsize"></a>

####  ConnectButtonSize


Sizing options for the Bitski connect button.






<a id="_components_connect_button_.connectbuttonsize.large"></a>

####  LARGE


```javascript
var LARGE: 
```
<small>*Defined in [components/connect-button.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L10)*</small>





<a id="_components_connect_button_.connectbuttonsize.medium"></a>

####  MEDIUM


```javascript
var MEDIUM: 
```
<small>*Defined in [components/connect-button.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L9)*</small>





<a id="_components_connect_button_.connectbuttonsize.small"></a>

####  SMALL


```javascript
var SMALL: 
```
<small>*Defined in [components/connect-button.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L8)*</small>








<a id="_components_connect_button_.connectbutton"></a>

##  ConnectButton


A button used to connect to Bitski.



<a id="_components_connect_button_.connectbutton.constructor"></a>
### constructor
```typescript
new ConnectButton(authProvider: AuthProvider, existingDiv?: HTMLElement, size?: ConnectButtonSize, authIntegrationType?: OAuthProviderIntegrationType, callback?: undefined | function): ConnectButton
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| authProvider | [AuthProvider](#_auth_auth_provider_.authprovider)  | - |   - |
| existingDiv _(Optional)_ | `HTMLElement`  | - |   An existing div to turn into a connect button |
| size | [ConnectButtonSize](#_components_connect_button_.connectbuttonsize)  |  ConnectButtonSize.MEDIUM |   - |
| authIntegrationType | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)  |  OAuthProviderIntegrationType.POPUP |   - |
| callback _(Optional)_ | `undefined          ⎮function`  | - |   - |



##### Return Value
[ConnectButton](#_components_connect_button_.connectbutton)





---

### Properties
<a id="_components_connect_button_.connectbutton.activecolor"></a>

#### activeColor
```javascript
private var activeColor: string = "#1A7CE6"
```
<small>*Defined in [components/connect-button.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L23)*</small>


<a id="_components_connect_button_.connectbutton.authintegrationtype"></a>

#### authIntegrationType
```javascript
private var authIntegrationType: OAuthProviderIntegrationType
```
<small>*Defined in [components/connect-button.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L21)*</small>


<a id="_components_connect_button_.connectbutton.authprovider"></a>

#### authProvider
```javascript
private var authProvider: AuthProvider
```
<small>*Defined in [components/connect-button.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L20)*</small>


<a id="_components_connect_button_.connectbutton.callback"></a>

#### callback
```javascript
var callback: undefined | function
```
<small>*Defined in [components/connect-button.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L19)*</small>


<a id="_components_connect_button_.connectbutton.defaultcolor"></a>

#### defaultColor
```javascript
private var defaultColor: string = "#298FFF"
```
<small>*Defined in [components/connect-button.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L22)*</small>


<a id="_components_connect_button_.connectbutton.element"></a>

#### element
```javascript
var element: HTMLElement
```
<small>*Defined in [components/connect-button.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L17)*</small>


<a id="_components_connect_button_.connectbutton.size"></a>

#### size
```javascript
var size: ConnectButtonSize
```
<small>*Defined in [components/connect-button.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L18)*</small>




---

### Methods
<a id="_components_connect_button_.connectbutton.blur"></a>

#### blur




##### Declaration


```typescript
private function blur()
```
<small>*Defined in [components/connect-button.ts:80](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L80)*</small>








<a id="_components_connect_button_.connectbutton.configureforlarge"></a>

#### configureForLarge




##### Declaration


```typescript
private function configureForLarge()
```
<small>*Defined in [components/connect-button.ts:152](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L152)*</small>








<a id="_components_connect_button_.connectbutton.configureformedium"></a>

#### configureForMedium




##### Declaration


```typescript
private function configureForMedium()
```
<small>*Defined in [components/connect-button.ts:136](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L136)*</small>








<a id="_components_connect_button_.connectbutton.configureforsmall"></a>

#### configureForSmall




##### Declaration


```typescript
private function configureForSmall()
```
<small>*Defined in [components/connect-button.ts:120](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L120)*</small>








<a id="_components_connect_button_.connectbutton.focus"></a>

#### focus




##### Declaration


```typescript
private function focus()
```
<small>*Defined in [components/connect-button.ts:76](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L76)*</small>








<a id="_components_connect_button_.connectbutton.remove"></a>

#### remove



Removes the button from the page




##### Declaration


```typescript
function remove()
```
<small>*Defined in [components/connect-button.ts:58](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L58)*</small>








<a id="_components_connect_button_.connectbutton.setattributes"></a>

#### setAttributes




##### Declaration


```typescript
private function setAttributes(attributes: object)
```
<small>*Defined in [components/connect-button.ts:112](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L112)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| attributes | `object`   |  - |








<a id="_components_connect_button_.connectbutton.setdefaultstyle"></a>

#### setDefaultStyle




##### Declaration


```typescript
private function setDefaultStyle()
```
<small>*Defined in [components/connect-button.ts:84](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L84)*</small>








<a id="_components_connect_button_.connectbutton.signin"></a>

#### signin




##### Declaration


```typescript
private function signin()
```
<small>*Defined in [components/connect-button.ts:64](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L64)*</small>










---



---



---

<a id="_components_dialog_"></a>


<a id="_components_dialog_.dialog"></a>

##  Dialog


<a id="_components_dialog_.dialog.constructor"></a>
### constructor
```typescript
new Dialog(content: any, width?: undefined | number, height?: undefined | number): Dialog
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| content | `any`   |  - |
| width _(Optional)_ | `undefined          ⎮number`   |  - |
| height _(Optional)_ | `undefined          ⎮number`   |  - |



##### Return Value
[Dialog](#_components_dialog_.dialog)





---

### Properties
<a id="_components_dialog_.dialog.body"></a>

#### body
```javascript
private var body: HTMLElement
```
<small>*Defined in [components/dialog.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L7)*</small>


<a id="_components_dialog_.dialog.closebutton"></a>

#### closeButton
```javascript
private var closeButton: HTMLElement
```
<small>*Defined in [components/dialog.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L9)*</small>


<a id="_components_dialog_.dialog.container"></a>

#### container
```javascript
private var container: HTMLElement
```
<small>*Defined in [components/dialog.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L6)*</small>


<a id="_components_dialog_.dialog.content"></a>

#### content
```javascript
private var content: any
```
<small>*Defined in [components/dialog.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L5)*</small>


<a id="_components_dialog_.dialog.dialog-1"></a>

#### dialog
```javascript
private var dialog: HTMLElement
```
<small>*Defined in [components/dialog.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L8)*</small>


<a id="_components_dialog_.dialog.height"></a>

#### height
```javascript
private var height: number
```
<small>*Defined in [components/dialog.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L12)*</small>


<a id="_components_dialog_.dialog.resizelistener"></a>

#### resizeListener
```javascript
private var resizeListener: any
```
<small>*Defined in [components/dialog.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L10)*</small>


<a id="_components_dialog_.dialog.width"></a>

#### width
```javascript
private var width: number
```
<small>*Defined in [components/dialog.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L11)*</small>




---

### Methods
<a id="_components_dialog_.dialog.addchildren"></a>

#### addChildren




##### Declaration


```typescript
private function addChildren()
```
<small>*Defined in [components/dialog.ts:51](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L51)*</small>








<a id="_components_dialog_.dialog.createbody"></a>

#### createBody




##### Declaration


```typescript
private function createBody(): HTMLElement
```
<small>*Defined in [components/dialog.ts:125](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L125)*</small>



##### Return Value
`HTMLElement`







<a id="_components_dialog_.dialog.createclosebutton"></a>

#### createCloseButton




##### Declaration


```typescript
private function createCloseButton(): HTMLElement
```
<small>*Defined in [components/dialog.ts:58](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L58)*</small>



##### Return Value
`HTMLElement`







<a id="_components_dialog_.dialog.createcontainer"></a>

#### createContainer




##### Declaration


```typescript
private function createContainer(): HTMLElement
```
<small>*Defined in [components/dialog.ts:110](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L110)*</small>



##### Return Value
`HTMLElement`







<a id="_components_dialog_.dialog.createdialog"></a>

#### createDialog




##### Declaration


```typescript
private function createDialog(): HTMLElement
```
<small>*Defined in [components/dialog.ts:85](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L85)*</small>



##### Return Value
`HTMLElement`







<a id="_components_dialog_.dialog.dismiss"></a>

#### dismiss




##### Declaration


```typescript
function dismiss()
```
<small>*Defined in [components/dialog.ts:46](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L46)*</small>








<a id="_components_dialog_.dialog.isdocumentloaded"></a>

#### isDocumentLoaded




##### Declaration


```typescript
function isDocumentLoaded(): boolean
```
<small>*Defined in [components/dialog.ts:38](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L38)*</small>



##### Return Value
`boolean`







<a id="_components_dialog_.dialog.render"></a>

#### render




##### Declaration


```typescript
private function render(): HTMLElement
```
<small>*Defined in [components/dialog.ts:151](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L151)*</small>



##### Return Value
`HTMLElement`







<a id="_components_dialog_.dialog.resize"></a>

#### resize




##### Declaration


```typescript
private function resize()
```
<small>*Defined in [components/dialog.ts:156](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L156)*</small>








<a id="_components_dialog_.dialog.shouldrenderfullscreen"></a>

#### shouldRenderFullScreen




##### Declaration


```typescript
function shouldRenderFullScreen(): boolean
```
<small>*Defined in [components/dialog.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L42)*</small>



##### Return Value
`boolean`







<a id="_components_dialog_.dialog.stylebody"></a>

#### styleBody




##### Declaration


```typescript
private function styleBody(body: HTMLElement)
```
<small>*Defined in [components/dialog.ts:132](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L132)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| body | `HTMLElement`   |  - |








<a id="_components_dialog_.dialog.styledialog"></a>

#### styleDialog




##### Declaration


```typescript
private function styleDialog(dialog: HTMLElement)
```
<small>*Defined in [components/dialog.ts:92](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L92)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| dialog | `HTMLElement`   |  - |










---



---


<a id="_components_dialog_.default_dialog_height"></a>

#### «Const» DEFAULT_DIALOG_HEIGHT


```javascript
var DEFAULT_DIALOG_HEIGHT: 420 = 420
```
<small>*Defined in [components/dialog.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L2)*</small>





<a id="_components_dialog_.default_dialog_width"></a>

#### «Const» DEFAULT_DIALOG_WIDTH


```javascript
var DEFAULT_DIALOG_WIDTH: 490 = 490
```
<small>*Defined in [components/dialog.ts:1](https://github.com/BitskiCo/bitski-js/blob/master/src/components/dialog.ts#L1)*</small>







---

<a id="_subproviders_authenticated_cache_"></a>


<a id="_subproviders_authenticated_cache_.authenticatedcachesubprovider"></a>

##  AuthenticatedCacheSubprovider


<a id="_subproviders_authenticated_cache_.authenticatedcachesubprovider.constructor"></a>
### constructor
```typescript
new AuthenticatedCacheSubprovider(authProvider: any): AuthenticatedCacheSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authProvider | `any`   |  - |



##### Return Value
[AuthenticatedCacheSubprovider](#_subproviders_authenticated_cache_.authenticatedcachesubprovider)





---

### Properties
<a id="_subproviders_authenticated_cache_.authenticatedcachesubprovider.authprovider"></a>

#### authProvider
```javascript
private var authProvider: AuthProvider
```
<small>*Defined in [subproviders/authenticated-cache.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-cache.ts#L10)*</small>


<a id="_subproviders_authenticated_cache_.authenticatedcachesubprovider.cachedvalues"></a>

#### cachedValues
```javascript
private var cachedValues: Map<string, any>
```
<small>*Defined in [subproviders/authenticated-cache.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-cache.ts#L11)*</small>




---

### Methods
<a id="_subproviders_authenticated_cache_.authenticatedcachesubprovider.checkcachedvalues"></a>

#### checkCachedValues




##### Declaration


```typescript
private function checkCachedValues(methodName: string): Promise<any>
```
<small>*Defined in [subproviders/authenticated-cache.ts:49](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-cache.ts#L49)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| methodName | `string`   |  - |



##### Return Value
`Promise<any>`







<a id="_subproviders_authenticated_cache_.authenticatedcachesubprovider.getaccounts"></a>

#### getAccounts




##### Declaration


```typescript
private function getAccounts(): Promise<[string]>
```
<small>*Defined in [subproviders/authenticated-cache.ts:63](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-cache.ts#L63)*</small>



##### Return Value
`Promise<[string]>`







<a id="_subproviders_authenticated_cache_.authenticatedcachesubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any): any
```
<small>*Defined in [subproviders/authenticated-cache.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-cache.ts#L19)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |



##### Return Value
`any`







<a id="_subproviders_authenticated_cache_.authenticatedcachesubprovider.supportscache"></a>

#### supportsCache




##### Declaration


```typescript
private function supportsCache(methodName: string): boolean
```
<small>*Defined in [subproviders/authenticated-cache.ts:45](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-cache.ts#L45)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| methodName | `string`   |  - |



##### Return Value
`boolean`









---


### Relationships
##### Extends
* [&quot;subproviders/authenticated-cache&quot;](#_subproviders_authenticated_cache_).[AuthenticatedCacheSubprovider](#_subproviders_authenticated_cache_.authenticatedcachesubprovider)

---


<a id="_subproviders_authenticated_cache_.cached_methods"></a>

#### «Const» CACHED_METHODS


```javascript
var CACHED_METHODS: string[] =  ['eth_accounts']
```
<small>*Defined in [subproviders/authenticated-cache.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-cache.ts#L4)*</small>







---

<a id="_subproviders_authenticated_fetch_"></a>


<a id="_subproviders_authenticated_fetch_.authenticatedfetchsubprovider"></a>

##  AuthenticatedFetchSubprovider


<a id="_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.constructor"></a>
### constructor
```typescript
new AuthenticatedFetchSubprovider(rpcUrl: string, debug: boolean, authProvider: AuthProvider, defaultHeaders?: object): AuthenticatedFetchSubprovider
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| rpcUrl | `string`  | - |   - |
| debug | `boolean`  | - |   - |
| authProvider | [AuthProvider](#_auth_auth_provider_.authprovider)  | - |   - |
| defaultHeaders | `object`  |  {} |   - |



##### Return Value
[AuthenticatedFetchSubprovider](#_subproviders_authenticated_fetch_.authenticatedfetchsubprovider)





---

### Properties
<a id="_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.authprovider"></a>

#### authProvider
```javascript
private var authProvider: AuthProvider
```
<small>*Defined in [subproviders/authenticated-fetch.ts:31](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L31)*</small>


<a id="_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.defaultheaders"></a>

#### defaultHeaders
```javascript
private var defaultHeaders: object
```
<small>*Defined in [subproviders/authenticated-fetch.ts:32](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L32)*</small>




---

### Methods
<a id="_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.generateparameters"></a>

#### generateParameters




##### Declaration


```typescript
private function generateParameters(payload: any, accessToken?: undefined | string): object
```
<small>*Defined in [subproviders/authenticated-fetch.ts:66](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L66)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| accessToken _(Optional)_ | `undefined          ⎮string`   |  - |



##### Return Value
`object`







<a id="_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.handleauthenticatedrequest"></a>

#### handleAuthenticatedRequest




##### Declaration


```typescript
function handleAuthenticatedRequest(payload: any, next: any, end: any)
```
<small>*Defined in [subproviders/authenticated-fetch.ts:48](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L48)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [subproviders/authenticated-fetch.ts:40](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L40)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.handleunauthenticatedrequest"></a>

#### handleUnauthenticatedRequest




##### Declaration


```typescript
function handleUnauthenticatedRequest(payload: any, next: any, end: any)
```
<small>*Defined in [subproviders/authenticated-fetch.ts:57](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L57)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.requiresauthentication"></a>

#### requiresAuthentication




##### Declaration


```typescript
private function requiresAuthentication(payload: any): boolean
```
<small>*Defined in [subproviders/authenticated-fetch.ts:62](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L62)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |



##### Return Value
`boolean`







<a id="_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.sendrequest"></a>

#### sendRequest




##### Declaration


```typescript
private function sendRequest(parameters: object, next: any, end: any)
```
<small>*Defined in [subproviders/authenticated-fetch.ts:97](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L97)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| parameters | `object`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |










---


### Relationships
##### Extends
* [&quot;subproviders/authenticated-fetch&quot;](#_subproviders_authenticated_fetch_).[AuthenticatedFetchSubprovider](#_subproviders_authenticated_fetch_.authenticatedfetchsubprovider)

---


<a id="_subproviders_authenticated_fetch_.authenticated_methods"></a>

#### «Const» AUTHENTICATED_METHODS


```javascript
var AUTHENTICATED_METHODS: string[] =  [
    "eth_accounts",
    "eth_sendTransaction",
    "eth_sign",
]
```
<small>*Defined in [subproviders/authenticated-fetch.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L16)*</small>





<a id="_subproviders_authenticated_fetch_.retriable_errors"></a>

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
<small>*Defined in [subproviders/authenticated-fetch.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L7)*</small>






### Functions
<a id="_subproviders_authenticated_fetch_.iserrorretriable"></a>

###  isErrorRetriable




##### Declaration


```typescript
function isErrorRetriable(err: any): boolean
```
<small>*Defined in [subproviders/authenticated-fetch.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L22)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| err | `any`   |  - |



##### Return Value
`boolean`









---

<a id="_subproviders_authorization_handler_"></a>


<a id="_subproviders_authorization_handler_.authorizationhandler"></a>

##  AuthorizationHandler


<a id="_subproviders_authorization_handler_.authorizationhandler.constructor"></a>
### constructor
```typescript
new AuthorizationHandler(opts?: any): AuthorizationHandler
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| opts _(Optional)_ | `any`   |  - |



##### Return Value
[AuthorizationHandler](#_subproviders_authorization_handler_.authorizationhandler)





---

### Properties
<a id="_subproviders_authorization_handler_.authorizationhandler.authorizedmethods"></a>

#### authorizedMethods
```javascript
private var authorizedMethods: [string]
```
<small>*Defined in [subproviders/authorization-handler.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authorization-handler.ts#L11)*</small>




---

### Methods
<a id="_subproviders_authorization_handler_.authorizationhandler.handleauthorization"></a>

#### handleAuthorization




##### Declaration


```typescript
function handleAuthorization(payload: any, next: any, end: any)
```
<small>*Defined in [subproviders/authorization-handler.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authorization-handler.ts#L26)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="_subproviders_authorization_handler_.authorizationhandler.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [subproviders/authorization-handler.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authorization-handler.ts#L18)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="_subproviders_authorization_handler_.authorizationhandler.requiresauthorization"></a>

#### requiresAuthorization




##### Declaration


```typescript
private function requiresAuthorization(method: string): boolean
```
<small>*Defined in [subproviders/authorization-handler.ts:31](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authorization-handler.ts#L31)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |  - |



##### Return Value
`boolean`









---


### Relationships
##### Extends
* [&quot;subproviders/authorization-handler&quot;](#_subproviders_authorization_handler_).[AuthorizationHandler](#_subproviders_authorization_handler_.authorizationhandler)

---


<a id="_subproviders_authorization_handler_.default_authorized_methods"></a>

#### «Const» DEFAULT_AUTHORIZED_METHODS


```javascript
var DEFAULT_AUTHORIZED_METHODS: string[] =  ['eth_sendTransaction', 'eth_sign', 'eth_signTypedData', 'personal_sign']
```
<small>*Defined in [subproviders/authorization-handler.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authorization-handler.ts#L4)*</small>







---

<a id="_subproviders_iframe_"></a>


<a id="_subproviders_iframe_.iframesubprovider"></a>

##  IFrameSubprovider


<a id="_subproviders_iframe_.iframesubprovider.constructor"></a>
### constructor
```typescript
new IFrameSubprovider(webBaseUrl: string, networkName: string, authProvider: AuthProvider): IFrameSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| webBaseUrl | `string`   |  - |
| networkName | `string`   |  - |
| authProvider | [AuthProvider](#_auth_auth_provider_.authprovider)   |  - |



##### Return Value
[IFrameSubprovider](#_subproviders_iframe_.iframesubprovider)





---

### Properties
<a id="_subproviders_iframe_.iframesubprovider.authprovider"></a>

#### authProvider
```javascript
private var authProvider: AuthProvider
```
<small>*Defined in [subproviders/iframe.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L15)*</small>


<a id="_subproviders_iframe_.iframesubprovider.currentrequest"></a>

#### currentRequest
```javascript
private var currentRequest: Request
```
<small>*Defined in [subproviders/iframe.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L16)*</small>


<a id="_subproviders_iframe_.iframesubprovider.currentrequestdialog"></a>

#### currentRequestDialog
```javascript
var currentRequestDialog: Dialog
```
<small>*Defined in [subproviders/iframe.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L12)*</small>


<a id="_subproviders_iframe_.iframesubprovider.networkname"></a>

#### networkName
```javascript
private var networkName: string
```
<small>*Defined in [subproviders/iframe.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L14)*</small>


<a id="_subproviders_iframe_.iframesubprovider.webbaseurl"></a>

#### webBaseUrl
```javascript
private var webBaseUrl: string
```
<small>*Defined in [subproviders/iframe.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L13)*</small>




---

### Methods
<a id="_subproviders_iframe_.iframesubprovider.handleauthorization"></a>

#### handleAuthorization




##### Declaration


```typescript
function handleAuthorization(payload: any, _: any, end: any)
```
<small>*Defined in [subproviders/iframe.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L26)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| _ | `any`   |  - |
| end | `any`   |  - |









<a id="_subproviders_iframe_.iframesubprovider.receivemessage"></a>

#### receiveMessage




##### Declaration


```typescript
function receiveMessage(event: MessageEvent)
```
<small>*Defined in [subproviders/iframe.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L34)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `MessageEvent`   |  - |








<a id="_subproviders_iframe_.iframesubprovider.showauthorizationmodal"></a>

#### showAuthorizationModal




##### Declaration


```typescript
private function showAuthorizationModal(element: any, payload: any, end: any)
```
<small>*Defined in [subproviders/iframe.ts:98](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L98)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| element | `any`   |  - |
| payload | `any`   |  - |
| end | `any`   |  - |








<a id="_subproviders_iframe_.iframesubprovider.showbitskimodal"></a>

#### showBitskiModal




##### Declaration


```typescript
private function showBitskiModal(accessToken: any, payload: any, end: any)
```
<small>*Defined in [subproviders/iframe.ts:75](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L75)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `any`   |  - |
| payload | `any`   |  - |
| end | `any`   |  - |








<a id="_subproviders_iframe_.iframesubprovider.urlformethod"></a>

#### urlForMethod




##### Declaration


```typescript
private function urlForMethod(method: string): string | undefined
```
<small>*Defined in [subproviders/iframe.ts:64](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L64)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |  - |



##### Return Value
`string          ⎮undefined`









---


### Relationships
##### Extends
* [&quot;subproviders/authorization-handler&quot;](#_subproviders_authorization_handler_).[AuthorizationHandler](#_subproviders_authorization_handler_.authorizationhandler)

---


<a id="_subproviders_iframe_.request"></a>

####  Request


```javascript
var Request: [any, any]
```
<small>*Defined in [subproviders/iframe.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L6)*</small>







---

<a id="_subproviders_local_dialog_"></a>


<a id="_subproviders_local_dialog_.localdialogsubprovider"></a>

##  LocalDialogSubprovider


<a id="_subproviders_local_dialog_.localdialogsubprovider.constructor"></a>
### constructor
```typescript
new LocalDialogSubprovider(opts?: any): LocalDialogSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| opts _(Optional)_ | `any`   |  - |



##### Return Value
[LocalDialogSubprovider](#_subproviders_local_dialog_.localdialogsubprovider)





---

### Properties
<a id="_subproviders_local_dialog_.localdialogsubprovider.currentdialog"></a>

#### currentDialog
```javascript
private var currentDialog: Dialog
```
<small>*Defined in [subproviders/local-dialog.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/local-dialog.ts#L12)*</small>


<a id="_subproviders_local_dialog_.localdialogsubprovider.currentrequest"></a>

#### currentRequest
```javascript
private var currentRequest: Request
```
<small>*Defined in [subproviders/local-dialog.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/local-dialog.ts#L13)*</small>


<a id="_subproviders_local_dialog_.localdialogsubprovider.transactionwindow"></a>

#### transactionWindow
```javascript
private var transactionWindow: any
```
<small>*Defined in [subproviders/local-dialog.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/local-dialog.ts#L14)*</small>




---

### Methods
<a id="_subproviders_local_dialog_.localdialogsubprovider.createdefinition"></a>

#### createDefinition




##### Declaration


```typescript
private function createDefinition(label: any, value: any): HTMLDListElement
```
<small>*Defined in [subproviders/local-dialog.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/local-dialog.ts#L47)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| label | `any`   |  - |
| value | `any`   |  - |



##### Return Value
`HTMLDListElement`







<a id="_subproviders_local_dialog_.localdialogsubprovider.createtransactionwindow"></a>

#### createTransactionWindow




##### Declaration


```typescript
private function createTransactionWindow(payload: any, submitHandler: any, cancelHandler: any): any
```
<small>*Defined in [subproviders/local-dialog.ts:70](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/local-dialog.ts#L70)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| submitHandler | `any`   |  - |
| cancelHandler | `any`   |  - |



##### Return Value
`any`







<a id="_subproviders_local_dialog_.localdialogsubprovider.displaymodal"></a>

#### displayModal




##### Declaration


```typescript
private function displayModal(element: any, payload: any, end: any)
```
<small>*Defined in [subproviders/local-dialog.ts:151](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/local-dialog.ts#L151)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| element | `any`   |  - |
| payload | `any`   |  - |
| end | `any`   |  - |








<a id="_subproviders_local_dialog_.localdialogsubprovider.handleauthorization"></a>

#### handleAuthorization




##### Declaration


```typescript
function handleAuthorization(payload: any, next: any, end: any)
```
<small>*Defined in [subproviders/local-dialog.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/local-dialog.ts#L20)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |









<a id="_subproviders_local_dialog_.localdialogsubprovider.showtransactionmodal"></a>

#### showTransactionModal




##### Declaration


```typescript
private function showTransactionModal(payload: any, next: any, end: any)
```
<small>*Defined in [subproviders/local-dialog.ts:24](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/local-dialog.ts#L24)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |










---


### Relationships
##### Extends
* [&quot;subproviders/authorization-handler&quot;](#_subproviders_authorization_handler_).[AuthorizationHandler](#_subproviders_authorization_handler_.authorizationhandler)

---


<a id="_subproviders_local_dialog_.request"></a>

####  Request


```javascript
var Request: [any, any]
```
<small>*Defined in [subproviders/local-dialog.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/local-dialog.ts#L5)*</small>









