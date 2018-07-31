---
---



#  Bitski.js

## Index

### External modules

* ["access-token"](#_access_token_)
* ["bitski"](#_bitski_)
* ["components/connect-button"](#_components_connect_button_)
* ["components/dialog"](#_components_dialog_)
* ["providers/bitski-provider"](#_providers_bitski_provider_)
* ["providers/bitski-provider-settings"](#_providers_bitski_provider_settings_)
* ["providers/oauth-http-provider"](#_providers_oauth_http_provider_)



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
<a id="_bitski_.bitski.cacheduser"></a>

#### cachedUser
```javascript
private var cachedUser: User
```
<small>*Defined in [bitski.ts:36](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L36)*</small>


<a id="_bitski_.bitski.clientid"></a>

#### clientId
```javascript
private var clientId: string
```
<small>*Defined in [bitski.ts:37](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L37)*</small>


<a id="_bitski_.bitski.providers"></a>

#### providers
```javascript
private var providers: Map<string, HttpProvider>
```
<small>*Defined in [bitski.ts:35](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L35)*</small>


<a id="_bitski_.bitski.settings"></a>

#### settings
```javascript
private var settings: BitskiProviderSettings
```
<small>*Defined in [bitski.ts:38](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L38)*</small>


<a id="_bitski_.bitski.timeout"></a>

#### timeout
```javascript
var timeout: number = 5000
```
<small>*Defined in [bitski.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L34)*</small>


<a id="_bitski_.bitski.usermanager"></a>

#### userManager
```javascript
var userManager: UserManager
```
<small>*Defined in [bitski.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L33)*</small>




---

### Methods
<a id="_bitski_.bitski.createprovider"></a>

#### createProvider




##### Declaration


```typescript
private function createProvider(networkName?: undefined | string): BitskiProvider
```
<small>*Defined in [bitski.ts:278](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L278)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| networkName _(Optional)_ | `undefined          ⎮string`   |  - |



##### Return Value
[BitskiProvider](#_providers_bitski_provider_.bitskiprovider)







<a id="_bitski_.bitski.didsetuser"></a>

#### didSetUser



Callback received from UserManager when the user has been set. Called in situations like access token refresh.




##### Declaration


```typescript
private function didSetUser(user: User)
```
<small>*Defined in [bitski.ts:313](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L313)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| user | `User`   |  the User object that was loaded |








<a id="_bitski_.bitski.didunsetuser"></a>

#### didUnsetUser



Callback received from UserManager when the user has been revoked. Called in situations like access token expiration.




##### Declaration


```typescript
private function didUnsetUser()
```
<small>*Defined in [bitski.ts:321](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L321)*</small>








<a id="_bitski_.bitski.getconnectbutton"></a>

#### getConnectButton



Creates a sign in with bitski button to add to your app. If an HTML element is passed in as the first parameter, it will automatically add it to the DOM inside that element. Make sure to add a callback to get notified of login events.




##### Declaration


```typescript
function getConnectButton(existingDiv?: HTMLElement, size?: ConnectButtonSize): ConnectButton
```
<small>*Defined in [bitski.ts:133](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L133)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| existingDiv _(Optional)_ | `HTMLElement`  | - |   Existing element to turn into a Bitski connect button |
| size | [ConnectButtonSize](#_components_connect_button_.connectbuttonsize)  |  ConnectButtonSize.MEDIUM |   Size of button to generate. Defaults to medium. |



##### Return Value
[ConnectButton](#_components_connect_button_.connectbutton)







<a id="_bitski_.bitski.getprovider"></a>

#### getProvider



Returns a new web3 provider for a given network.




##### Declaration


```typescript
function getProvider(networkName?: undefined | string): HttpProvider
```
<small>*Defined in [bitski.ts:74](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L74)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| networkName _(Optional)_ | `undefined          ⎮string`   |  optional name of the network to use, or host for a local provider. Defaults to mainnet. |



##### Return Value
`HttpProvider`







<a id="_bitski_.bitski.getuser"></a>

#### getUser



Gets the current signed in user. Will return an error if we are not signed in.




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [bitski.ts:117](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L117)*</small>



##### Return Value
`Promise<User>`







<a id="_bitski_.bitski.getuserorsignin"></a>

#### getUserOrSignIn



Gets the current user if it exists. If not, signs in. Unlike `getUser` this will never return an expired user or null.




##### Declaration


```typescript
function getUserOrSignIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [bitski.ts:185](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L185)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_providers_oauth_http_provider_.oauthproviderintegrationtype)   |  Optionally specify an integration type. Defaults to REDIRECT. |



##### Return Value
`Promise<User>`







<a id="_bitski_.bitski.getweb3"></a>

#### getWeb3



Returns an initialized web3 API




##### Declaration


```typescript
function getWeb3(networkName?: undefined | string): Web3
```
<small>*Defined in [bitski.ts:100](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L100)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| networkName _(Optional)_ | `undefined          ⎮string`   |  optional name of the network to use, or host for a local provider. Defaults to mainnet. |



##### Return Value
`Web3`







<a id="_bitski_.bitski.isinframe"></a>

#### isInFrame




##### Declaration


```typescript
function isInFrame(): boolean
```
<small>*Defined in [bitski.ts:236](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L236)*</small>



##### Return Value
`boolean`







<a id="_bitski_.bitski.requestsignout"></a>

#### requestSignOut




##### Declaration


```typescript
private function requestSignOut(accessToken: any): Promise<any>
```
<small>*Defined in [bitski.ts:240](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L240)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `any`   |  - |



##### Return Value
`Promise<any>`







<a id="_bitski_.bitski.sendrequest"></a>

#### sendRequest




##### Declaration


```typescript
private function sendRequest(request: any): Promise<any>
```
<small>*Defined in [bitski.ts:250](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L250)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| request | `any`   |  - |



##### Return Value
`Promise<any>`







<a id="_bitski_.bitski.setlogger"></a>

#### setLogger



Set logger and log level for debugging purposes




##### Declaration


```typescript
function setLogger(logger: any, level?: undefined | number)
```
<small>*Defined in [bitski.ts:229](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L229)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| logger | `any`   |  The logger to use (i.e. console). Must support methods info(), warn(), and error(). |
| level _(Optional)_ | `undefined          ⎮number`   |  The desired log level.Use 0 for none (the default), 1 for errors, 2 for warnings, 3 for info, and 4 for debug. |








<a id="_bitski_.bitski.setuser"></a>

#### setUser



Pass logged in user to all providers




##### Declaration


```typescript
private function setUser(user?: User)
```
<small>*Defined in [bitski.ts:291](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L291)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| user _(Optional)_ | `User`   |  User to send to cached providers |








<a id="_bitski_.bitski.signin"></a>

#### signIn



Starts sign in flow.




##### Declaration


```typescript
function signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [bitski.ts:141](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L141)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_providers_oauth_http_provider_.oauthproviderintegrationtype)   |  - |



##### Return Value
`Promise<User>`







<a id="_bitski_.bitski.signincallback"></a>

#### signInCallback



Called from your oauth redirect page.




##### Declaration


```typescript
function signInCallback(authenticationIntegrationType: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [bitski.ts:200](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L200)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType | [OAuthProviderIntegrationType](#_providers_oauth_http_provider_.oauthproviderintegrationtype)   |  Should match the method called when signing in. |



##### Return Value
`Promise<User>`







<a id="_bitski_.bitski.signout"></a>

#### signOut



Sign the current user out of your application.




##### Declaration


```typescript
function signOut(): Promise<any>
```
<small>*Defined in [bitski.ts:212](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L212)*</small>



##### Return Value
`Promise<any>`









---



---


<a id="_bitski_.bitski_user_api_host"></a>

#### «Const» BITSKI_USER_API_HOST


```javascript
var BITSKI_USER_API_HOST: "https://www.bitski.com/v1" = "https://www.bitski.com/v1"
```
<small>*Defined in [bitski.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L11)*</small>





<a id="_bitski_.default_bitski_oauth_host"></a>

#### «Const» DEFAULT_BITSKI_OAUTH_HOST


```javascript
var DEFAULT_BITSKI_OAUTH_HOST: "https://account.bitski.com" = "https://account.bitski.com"
```
<small>*Defined in [bitski.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L13)*</small>






<a id="_bitski_.default_bitski_metadata"></a>

## DEFAULT_BITSKI_METADATA


<a id="_bitski_.default_bitski_metadata.authorization_endpoint"></a>

####  authorization_endpoint


```javascript
var authorization_endpoint: string = "https://account.bitski.com/oauth2/auth"
```
<small>*Defined in [bitski.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L16)*</small>





<a id="_bitski_.default_bitski_metadata.claims_supported"></a>

####  claims_supported


```javascript
var claims_supported: string[] =  ['sub']
```
<small>*Defined in [bitski.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L17)*</small>





<a id="_bitski_.default_bitski_metadata.id_token_signing_alg_values_supported"></a>

####  id_token_signing_alg_values_supported


```javascript
var id_token_signing_alg_values_supported: string[] =  ['RS256']
```
<small>*Defined in [bitski.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L18)*</small>





<a id="_bitski_.default_bitski_metadata.issuer"></a>

####  issuer


```javascript
var issuer: string = "https://account.bitski.com"
```
<small>*Defined in [bitski.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L19)*</small>





<a id="_bitski_.default_bitski_metadata.jwks_uri"></a>

####  jwks_uri


```javascript
var jwks_uri: string = "https://account.bitski.com/.well-known/jwks.json"
```
<small>*Defined in [bitski.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L20)*</small>





<a id="_bitski_.default_bitski_metadata.response_types_supported"></a>

####  response_types_supported


```javascript
var response_types_supported: string[] =  ['code', 'code id_token', 'id_token', 'token id_token', 'token', 'token id_token code']
```
<small>*Defined in [bitski.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L21)*</small>





<a id="_bitski_.default_bitski_metadata.scopes_supported"></a>

####  scopes_supported


```javascript
var scopes_supported: string[] =  ['offline', 'openid']
```
<small>*Defined in [bitski.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L22)*</small>





<a id="_bitski_.default_bitski_metadata.subject_types_supported"></a>

####  subject_types_supported


```javascript
var subject_types_supported: string[] =  ['pairwise', 'public']
```
<small>*Defined in [bitski.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L23)*</small>





<a id="_bitski_.default_bitski_metadata.token_endpoint"></a>

####  token_endpoint


```javascript
var token_endpoint: string = "https://account.bitski.com/oauth2/token"
```
<small>*Defined in [bitski.ts:24](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L24)*</small>





<a id="_bitski_.default_bitski_metadata.token_endpoint_auth_methods_supported"></a>

####  token_endpoint_auth_methods_supported


```javascript
var token_endpoint_auth_methods_supported: string[] =  ['client_secret_post', 'client_secret_basic']
```
<small>*Defined in [bitski.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L25)*</small>





<a id="_bitski_.default_bitski_metadata.userinfo_endpoint"></a>

####  userinfo_endpoint


```javascript
var userinfo_endpoint: string = "https://account.bitski.com/userinfo"
```
<small>*Defined in [bitski.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L26)*</small>









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
<small>*Defined in [components/connect-button.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L12)*</small>





<a id="_components_connect_button_.connectbuttonsize.medium"></a>

####  MEDIUM


```javascript
var MEDIUM: 
```
<small>*Defined in [components/connect-button.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L11)*</small>





<a id="_components_connect_button_.connectbuttonsize.small"></a>

####  SMALL


```javascript
var SMALL: 
```
<small>*Defined in [components/connect-button.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L10)*</small>








<a id="_components_connect_button_.connectbutton"></a>

##  ConnectButton


A button used to connect to Bitski.



<a id="_components_connect_button_.connectbutton.constructor"></a>
### constructor
```typescript
new ConnectButton(bitskiInstance: Bitski, existingDiv?: HTMLElement, size?: ConnectButtonSize, authenticationMode?: OAuthProviderIntegrationType): ConnectButton
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| bitskiInstance | [Bitski](#_bitski_.bitski)  | - |   An instance of Bitski to sign into |
| existingDiv _(Optional)_ | `HTMLElement`  | - |   An existing div to turn into a connect button |
| size | [ConnectButtonSize](#_components_connect_button_.connectbuttonsize)  |  ConnectButtonSize.MEDIUM |   - |
| authenticationMode | [OAuthProviderIntegrationType](#_providers_oauth_http_provider_.oauthproviderintegrationtype)  |  OAuthProviderIntegrationType.POPUP |   - |



##### Return Value
[ConnectButton](#_components_connect_button_.connectbutton)





---

### Properties
<a id="_components_connect_button_.connectbutton.activecolor"></a>

#### activeColor
```javascript
private var activeColor: string = "#1A7CE6"
```
<small>*Defined in [components/connect-button.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L25)*</small>


<a id="_components_connect_button_.connectbutton.authenticationmode"></a>

#### authenticationMode
```javascript
private var authenticationMode: OAuthProviderIntegrationType
```
<small>*Defined in [components/connect-button.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L23)*</small>


<a id="_components_connect_button_.connectbutton.bitskiinstance"></a>

#### bitskiInstance
```javascript
private var bitskiInstance: Bitski
```
<small>*Defined in [components/connect-button.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L22)*</small>


<a id="_components_connect_button_.connectbutton.callback"></a>

#### callback
```javascript
var callback: undefined | function
```
<small>*Defined in [components/connect-button.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L21)*</small>


<a id="_components_connect_button_.connectbutton.defaultcolor"></a>

#### defaultColor
```javascript
private var defaultColor: string = "#298FFF"
```
<small>*Defined in [components/connect-button.ts:24](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L24)*</small>


<a id="_components_connect_button_.connectbutton.element"></a>

#### element
```javascript
var element: HTMLElement
```
<small>*Defined in [components/connect-button.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L19)*</small>


<a id="_components_connect_button_.connectbutton.size"></a>

#### size
```javascript
var size: ConnectButtonSize
```
<small>*Defined in [components/connect-button.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L20)*</small>




---

### Methods
<a id="_components_connect_button_.connectbutton.blur"></a>

#### blur




##### Declaration


```typescript
private function blur()
```
<small>*Defined in [components/connect-button.ts:71](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L71)*</small>








<a id="_components_connect_button_.connectbutton.configureforlarge"></a>

#### configureForLarge




##### Declaration


```typescript
private function configureForLarge()
```
<small>*Defined in [components/connect-button.ts:143](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L143)*</small>








<a id="_components_connect_button_.connectbutton.configureformedium"></a>

#### configureForMedium




##### Declaration


```typescript
private function configureForMedium()
```
<small>*Defined in [components/connect-button.ts:127](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L127)*</small>








<a id="_components_connect_button_.connectbutton.configureforsmall"></a>

#### configureForSmall




##### Declaration


```typescript
private function configureForSmall()
```
<small>*Defined in [components/connect-button.ts:111](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L111)*</small>








<a id="_components_connect_button_.connectbutton.focus"></a>

#### focus




##### Declaration


```typescript
private function focus()
```
<small>*Defined in [components/connect-button.ts:67](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L67)*</small>








<a id="_components_connect_button_.connectbutton.setattributes"></a>

#### setAttributes




##### Declaration


```typescript
private function setAttributes(attributes: object)
```
<small>*Defined in [components/connect-button.ts:103](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L103)*</small>



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
<small>*Defined in [components/connect-button.ts:75](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L75)*</small>








<a id="_components_connect_button_.connectbutton.signin"></a>

#### signin




##### Declaration


```typescript
private function signin()
```
<small>*Defined in [components/connect-button.ts:55](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L55)*</small>










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

<a id="_providers_bitski_provider_"></a>


<a id="_providers_bitski_provider_.bitskiprovider"></a>

##  BitskiProvider


A Web3 provider that connects to the Bitski service


#### Example

```javascript
let provider = new BitskiProvider('kovan');
window.web3 = new Web3(provider);
```


<a id="_providers_bitski_provider_.bitskiprovider.constructor"></a>
### constructor
```typescript
new BitskiProvider(networkName?: string, settings: BitskiProviderSettings, additionalHeaders?: [any]): BitskiProvider
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| networkName | `string`  | &quot;kovan&quot; |   Network name |
| settings | [BitskiProviderSettings](#_providers_bitski_provider_settings_.bitskiprovidersettings)  | - |   - |
| additionalHeaders _(Optional)_ | `[any]`  | - |   - |



##### Return Value
[BitskiProvider](#_providers_bitski_provider_.bitskiprovider)





---

### Properties


<a id="_providers_bitski_provider_.bitskiprovider.authorizationintegrationtype"></a>

#### authorizationIntegrationType

Determines how the authorization modals show up for eth_call and eth_sendTransaction.


```javascript
var authorizationIntegrationType: OAuthProviderIntegrationType =  OAuthProviderIntegrationType.IFRAME
```
<small>*Defined in [providers/bitski-provider.ts:27](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L27)*</small>



<a id="_providers_bitski_provider_.bitskiprovider.currenttransactiondialog"></a>

#### currentTransactionDialog
```javascript
private var currentTransactionDialog: Dialog =  undefined
```
<small>*Defined in [providers/bitski-provider.ts:45](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L45)*</small>


<a id="_providers_bitski_provider_.bitskiprovider.currenttransactionwindow"></a>

#### currentTransactionWindow
```javascript
private var currentTransactionWindow: Window =  undefined
```
<small>*Defined in [providers/bitski-provider.ts:46](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L46)*</small>



<a id="_providers_bitski_provider_.bitskiprovider.networkname"></a>

#### networkName
```javascript
private var networkName: string
```
<small>*Defined in [providers/bitski-provider.ts:44](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L44)*</small>



<a id="_providers_bitski_provider_.bitskiprovider.pendingtransactions"></a>

#### pendingTransactions
```javascript
private var pendingTransactions: JsonRPC[] =  []
```
<small>*Defined in [providers/bitski-provider.ts:43](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L43)*</small>


<a id="_providers_bitski_provider_.bitskiprovider.queuedsends"></a>

#### queuedSends

Queued requests to be sent upon logging in.


```javascript
private var queuedSends: JsonRPC[] =  []
```
<small>*Defined in [providers/bitski-provider.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L42)*</small>



<a id="_providers_bitski_provider_.bitskiprovider.settings"></a>

#### settings
```javascript
private var settings: BitskiProviderSettings
```
<small>*Defined in [providers/bitski-provider.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L47)*</small>




---

<a id="_providers_bitski_provider_.bitskiprovider.isauthenticated"></a>

####  isAuthenticated


Whether or not authenticated requests can be processed




getisAuthenticated(): boolean
##### Return Value
`boolean`







---

### Methods

<a id="_providers_bitski_provider_.bitskiprovider.flushqueuedsends"></a>

#### flushQueuedSends



Flush all queued requests. Will be ignored if the access token is not valid.




##### Declaration


```typescript
private function flushQueuedSends()
```
<small>*Defined in [providers/bitski-provider.ts:119](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L119)*</small>










<a id="_providers_bitski_provider_.bitskiprovider.receivemessage"></a>

#### receiveMessage



Handles messages sent from popup windows or iframes




##### Declaration


```typescript
function receiveMessage(event: MessageEvent)
```
<small>*Defined in [providers/bitski-provider.ts:78](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L78)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `MessageEvent`   |  The event to handle |










<a id="_providers_bitski_provider_.bitskiprovider.requiresauthentication"></a>

#### requiresAuthentication



Determines if web3 method requires authentication




##### Declaration


```typescript
private function requiresAuthentication(method: string): boolean
```
<small>*Defined in [providers/bitski-provider.ts:134](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L134)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |  a web3 method name (ex: 'eth_sign') |



##### Return Value
`boolean`







<a id="_providers_bitski_provider_.bitskiprovider.requiresauthorization"></a>

#### requiresAuthorization



Returns a boolean value that indicates whether the Web3 method can be executed without the user's explicit authorization.




##### Declaration


```typescript
private function requiresAuthorization(method: string): boolean
```
<small>*Defined in [providers/bitski-provider.ts:151](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L151)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |  a web3 method name (ex: 'eth_sign') |



##### Return Value
`boolean`








<a id="_providers_bitski_provider_.bitskiprovider.send"></a>

#### send



Sends a Web3 request. Will be deferred if authentication is requied and we're not authenticated.




##### Declaration


```typescript
function send(payload: JsonRPCRequest, callback: JsonRPCCallback)
```
<small>*Defined in [providers/bitski-provider.ts:106](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L106)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  JSON-RPC request object to send. |
| callback | `JsonRPCCallback`   |  Handler for send request. `function (e: Error, val: JSONRPCResponse) => void` |









<a id="_providers_bitski_provider_.bitskiprovider.sendauthenticated"></a>

#### sendAuthenticated



Sends a request with authentication headers.




##### Declaration


```typescript
private function sendAuthenticated(payload: JsonRPCRequest, accessToken: string, callback: JsonRPCCallback)
```
<small>*Defined in [providers/bitski-provider.ts:167](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L167)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  JSON-RPC request object to send. |
| accessToken | `string`   |  Access token to send the requests with. |
| callback | `JsonRPCCallback`   |  Handler for send request. `function (e: Error, val: JSONRPCResponse) => void` |








<a id="_providers_bitski_provider_.bitskiprovider.setaccesstoken"></a>

#### setAccessToken



Set the current access token




##### Declaration


```typescript
function setAccessToken(accessToken?: AccessToken)
```
<small>*Defined in [providers/bitski-provider.ts:69](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L69)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken _(Optional)_ | [AccessToken](#_access_token_.accesstoken)   |  Access token object to flush send queue. |








<a id="_providers_bitski_provider_.bitskiprovider.showauthorization"></a>

#### showAuthorization



Presents an authorization request to the user.




##### Declaration


```typescript
private function showAuthorization(payload: JsonRPCRequest, accessToken: string, callback: JsonRPCCallback)
```
<small>*Defined in [providers/bitski-provider.ts:181](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L181)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  JSON-RPC request object to send. |
| accessToken | `string`   |  Access token to use for the request. |
| callback | `JsonRPCCallback`   |  Handler for send request. `function (e: Error, val: JSONRPCResponse) => void` |










---


### Relationships
##### Extends
* [&quot;providers/oauth-http-provider&quot;](#_providers_oauth_http_provider_).[OAuthHttpProvider](#_providers_oauth_http_provider_.oauthhttpprovider)

---


<a id="_providers_bitski_provider_.jsonrpc"></a>

####  JsonRPC





### Properties
<a id="_providers_bitski_provider_.jsonrpc.callback"></a>

#### callback
```javascript
var callback: JsonRPCCallback
```
<small>*Defined in [providers/bitski-provider.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L12)*</small>


<a id="_providers_bitski_provider_.jsonrpc.payload"></a>

#### payload
```javascript
var payload: JsonRPCRequest
```
<small>*Defined in [providers/bitski-provider.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L11)*</small>





<a id="_providers_bitski_provider_.bitski_api_v1_host"></a>

#### «Const» BITSKI_API_V1_HOST


```javascript
var BITSKI_API_V1_HOST: "https://api.bitski.com/v1" = "https://api.bitski.com/v1"
```
<small>*Defined in [providers/bitski-provider.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L7)*</small>





<a id="_providers_bitski_provider_.bitski_web_host"></a>

#### «Const» BITSKI_WEB_HOST


```javascript
var BITSKI_WEB_HOST: "https://www.bitski.com" = "https://www.bitski.com"
```
<small>*Defined in [providers/bitski-provider.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider.ts#L8)*</small>







---

<a id="_providers_bitski_provider_settings_"></a>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings"></a>

##  BitskiProviderSettings


Settings for configuring Bitski.



<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.constructor"></a>
### constructor
```typescript
new BitskiProviderSettings(authority: string, client_id: string, redirect_uri?: undefined | string, post_logout_redirect_uri?: undefined | string, metadata?: undefined | object): BitskiProviderSettings
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authority | `string`   |  Bitski OAuth URL |
| client_id | `string`   |  Your application's Bitski client ID |
| redirect_uri _(Optional)_ | `undefined          ⎮string`   |  URL to redirect to after log in |
| post_logout_redirect_uri _(Optional)_ | `undefined          ⎮string`   |  URL to redirect to after log out |
| metadata _(Optional)_ | `undefined          ⎮object`   |  Metadata to use instead of making a request to /.well-known/openid-configuration |



##### Return Value
[BitskiProviderSettings](#_providers_bitski_provider_settings_.bitskiprovidersettings)





---

### Properties
<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.authority"></a>

#### authority

OAuth provider URL


```javascript
var authority: string
```
<small>*Defined in [providers/bitski-provider-settings.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L13)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.automaticsilentrenew"></a>

#### automaticSilentRenew

Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration. The attempt is made as a result of the `accessTokenExpiring` event being raised.


```javascript
var automaticSilentRenew: boolean = true
```
<small>*Defined in [providers/bitski-provider-settings.ts:66](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L66)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.client_id"></a>

#### client_id

Your client application's identifier as registered with Bitski.


```javascript
var client_id: string
```
<small>*Defined in [providers/bitski-provider-settings.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L19)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.filterprotocolclaims"></a>

#### filterProtocolClaims

Should OIDC protocol claims be removed from profile.


```javascript
var filterProtocolClaims: boolean = true
```
<small>*Defined in [providers/bitski-provider-settings.ts:77](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L77)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.includeidtokeninsilentrenew"></a>

#### includeIdTokenInSilentRenew

Flag to control whether or not to include id_token_hint as a parameter when refreshing your access token. id_token_hint is currently not supported by Bitski.


```javascript
var includeIdTokenInSilentRenew: boolean = false
```
<small>*Defined in [providers/bitski-provider-settings.ts:94](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L94)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.loaduserinfo"></a>

#### loadUserInfo

Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.


```javascript
var loadUserInfo: boolean = true
```
<small>*Defined in [providers/bitski-provider-settings.ts:83](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L83)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.metadata"></a>

#### metadata

Pre populated metata so that we don't need an extra API call


```javascript
var metadata: undefined | object
```
<small>*Defined in [providers/bitski-provider-settings.ts:99](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L99)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.popupwindowfeatures"></a>

#### popupWindowFeatures

Features used to style and configure the popup window


```javascript
var popupWindowFeatures: string =  `location=no,toolbar=no,width=${DEFAULT_WINDOW_WIDTH},height=${DEFAULT_WINDOW_HEIGHT},left=100,top=100,resizable=yes;`
```
<small>*Defined in [providers/bitski-provider-settings.ts:88](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L88)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.popup_post_logout_redirect_uri"></a>

#### popup_post_logout_redirect_uri

The post-logout redirect URI for the popup method.


```javascript
var popup_post_logout_redirect_uri: string =  this.popup_post_logout_redirect_uri
```
<small>*Defined in [providers/bitski-provider-settings.ts:54](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L54)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.popup_redirect_uri"></a>

#### popup_redirect_uri

The URL for the page containing the call to `signinPopupCallback` to handle the callback from Bitski.


```javascript
var popup_redirect_uri: string =  this.redirect_uri
```
<small>*Defined in [providers/bitski-provider-settings.ts:49](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L49)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.post_logout_redirect_uri"></a>

#### post_logout_redirect_uri

The post-logout redirect URI.


```javascript
var post_logout_redirect_uri: string
```
<small>*Defined in [providers/bitski-provider-settings.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L42)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.redirect_uri"></a>

#### redirect_uri

The redirect URI of your client application to receive the OAuth response from the Bitski.


```javascript
var redirect_uri: string
```
<small>*Defined in [providers/bitski-provider-settings.ts:36](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L36)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.response_type"></a>

#### response_type

The type of response desired from the provider.


```javascript
var response_type: string = "token id_token"
```
<small>*Defined in [providers/bitski-provider-settings.ts:24](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L24)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.scope"></a>

#### scope

The OAuth scope being requested from Bitski.


```javascript
var scope: string = "openid"
```
<small>*Defined in [providers/bitski-provider-settings.ts:29](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L29)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.silentrequesttimeout"></a>

#### silentRequestTimeout

Number of milliseconds to wait for the silent renew to return before assuming it has failed or timed out.


```javascript
var silentRequestTimeout: number = 10000
```
<small>*Defined in [providers/bitski-provider-settings.ts:72](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L72)*</small>


<a id="_providers_bitski_provider_settings_.bitskiprovidersettings.silent_redirect_uri"></a>

#### silent_redirect_uri

The URL for the page containing the code handling the silent renew.


```javascript
var silent_redirect_uri: string =  this.silent_redirect_uri
```
<small>*Defined in [providers/bitski-provider-settings.ts:59](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L59)*</small>




---


### Relationships
##### Implements
* UserManagerSettings

---


<a id="_providers_bitski_provider_settings_.default_window_height"></a>

#### «Const» DEFAULT_WINDOW_HEIGHT


```javascript
var DEFAULT_WINDOW_HEIGHT: 420 = 420
```
<small>*Defined in [providers/bitski-provider-settings.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L4)*</small>





<a id="_providers_bitski_provider_settings_.default_window_width"></a>

#### «Const» DEFAULT_WINDOW_WIDTH


```javascript
var DEFAULT_WINDOW_WIDTH: 490 = 490
```
<small>*Defined in [providers/bitski-provider-settings.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/bitski-provider-settings.ts#L3)*</small>







---

<a id="_providers_oauth_http_provider_"></a>


<a id="_providers_oauth_http_provider_.oauthproviderintegrationtype"></a>

####  OAuthProviderIntegrationType





<a id="_providers_oauth_http_provider_.oauthproviderintegrationtype.iframe"></a>

####  IFRAME


```javascript
var IFRAME: 
```
<small>*Defined in [providers/oauth-http-provider.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/oauth-http-provider.ts#L8)*</small>





<a id="_providers_oauth_http_provider_.oauthproviderintegrationtype.popup"></a>

####  POPUP


```javascript
var POPUP: 
```
<small>*Defined in [providers/oauth-http-provider.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/oauth-http-provider.ts#L10)*</small>





<a id="_providers_oauth_http_provider_.oauthproviderintegrationtype.redirect"></a>

####  REDIRECT


```javascript
var REDIRECT: 
```
<small>*Defined in [providers/oauth-http-provider.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/oauth-http-provider.ts#L9)*</small>





<a id="_providers_oauth_http_provider_.oauthproviderintegrationtype.silent"></a>

####  SILENT


```javascript
var SILENT: 
```
<small>*Defined in [providers/oauth-http-provider.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/oauth-http-provider.ts#L11)*</small>








<a id="_providers_oauth_http_provider_.oauthhttpprovider"></a>

##  OAuthHttpProvider


A class that extends Web3's HTTPProvider by adding OAuth to JSON-RPC calls.



<a id="_providers_oauth_http_provider_.oauthhttpprovider.constructor"></a>
### constructor
```typescript
new OAuthHttpProvider(host: string, timeout: number, additionalHeaders?: [any]): OAuthHttpProvider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| host | `string`   |  JSON-RPC endpoint |
| timeout | `number`   |  Timeout in seconds |
| additionalHeaders _(Optional)_ | `[any]`   |  Optional headers to include with every request |



##### Return Value
[OAuthHttpProvider](#_providers_oauth_http_provider_.oauthhttpprovider)





---

### Properties
<a id="_providers_oauth_http_provider_.oauthhttpprovider.accesstoken"></a>

#### accessToken

The access token for the current logged in user


```javascript
var accessToken: AccessToken =  undefined
```
<small>*Defined in [providers/oauth-http-provider.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/oauth-http-provider.ts#L21)*</small>





<a id="_providers_oauth_http_provider_.oauthhttpprovider.host"></a>

#### host

The JSON-RPC endpoint


```javascript
private var host: string
```
<small>*Defined in [providers/oauth-http-provider.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/oauth-http-provider.ts#L26)*</small>






---

### Methods
<a id="_providers_oauth_http_provider_.oauthhttpprovider._preparerequest"></a>

#### _prepareRequest



Prepares a new XMLHttpRequest with the proper headers Does not require an access token for every request, but adds one if available.




##### Declaration


```typescript
function _prepareRequest(): XMLHttpRequest
```
<small>*Defined in [providers/oauth-http-provider.ts:64](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/oauth-http-provider.ts#L64)*</small>



##### Return Value
`XMLHttpRequest`


Request object that is ready for a payload.






<a id="_providers_oauth_http_provider_.oauthhttpprovider.isconnected"></a>

#### isConnected



Check whether we are connected to the server.




##### Declaration


```typescript
function isConnected(): boolean
```
<small>*Defined in [providers/oauth-http-provider.ts:55](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/oauth-http-provider.ts#L55)*</small>



##### Return Value
`boolean`


boolean if we are connected.











<a id="_providers_oauth_http_provider_.oauthhttpprovider.sendasync"></a>

#### sendAsync



Send a web3 / JSON-RPC request asynchronously.




##### Declaration


```typescript
function sendAsync(payload: JsonRPCRequest, callback: JsonRPCCallback)
```
<small>*Defined in [providers/oauth-http-provider.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/oauth-http-provider.ts#L47)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  The JSON-RPC request object to send |
| callback | `JsonRPCCallback`   |  Handler function invoked when the request has completed. |








<a id="_providers_oauth_http_provider_.oauthhttpprovider.setaccesstoken"></a>

#### setAccessToken




##### Declaration


```typescript
function setAccessToken(accessToken?: AccessToken)
```
<small>*Defined in [providers/oauth-http-provider.ts:38](https://github.com/BitskiCo/bitski-js/blob/master/src/providers/oauth-http-provider.ts#L38)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken _(Optional)_ | [AccessToken](#_access_token_.accesstoken)   |  - |










---


### Relationships
##### Extends
* HttpProvider

---





