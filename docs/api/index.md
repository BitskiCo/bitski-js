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
* ["subproviders/authenticated-fetch"](#_subproviders_authenticated_fetch_)
* ["subproviders/iframe"](#_subproviders_iframe_)



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
function signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [auth/auth-provider.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/auth-provider.ts#L14)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  - |



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
<small>*Defined in [auth/openid-auth-provider.ts:65](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L65)*</small>



##### Return Value
`Promise<User>`







<a id="_auth_openid_auth_provider_.openidauthprovider.getuserorsignin"></a>

#### getUserOrSignIn




##### Declaration


```typescript
function getUserOrSignIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [auth/openid-auth-provider.ts:69](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L69)*</small>



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
<small>*Defined in [auth/openid-auth-provider.ts:112](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L112)*</small>



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
<small>*Defined in [auth/openid-auth-provider.ts:122](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L122)*</small>



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
function signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [auth/openid-auth-provider.ts:80](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L80)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  - |



##### Return Value
`Promise<User>`







<a id="_auth_openid_auth_provider_.openidauthprovider.signout"></a>

#### signOut




##### Declaration


```typescript
function signOut(): Promise<any>
```
<small>*Defined in [auth/openid-auth-provider.ts:102](https://github.com/BitskiCo/bitski-js/blob/master/src/auth/openid-auth-provider.ts#L102)*</small>



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
<small>*Defined in [bitski.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L26)*</small>


<a id="_bitski_.bitski.clientid"></a>

#### clientId
```javascript
private var clientId: string
```
<small>*Defined in [bitski.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L25)*</small>


<a id="_bitski_.bitski.engines"></a>

#### engines
```javascript
private var engines: Map<string, any> =  new Map<string, ProviderEngine>()
```
<small>*Defined in [bitski.ts:24](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L24)*</small>




---

### Methods
<a id="_bitski_.bitski.adddefaultsubproviders"></a>

#### addDefaultSubproviders




##### Declaration


```typescript
private function addDefaultSubproviders(engine: ProviderEngine, enableCache?: boolean)
```
<small>*Defined in [bitski.ts:150](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L150)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| engine | `ProviderEngine`  | - |   - |
| enableCache | `boolean`  |  ENABLE_CACHE |   - |








<a id="_bitski_.bitski.createbitskiengine"></a>

#### createBitskiEngine




##### Declaration


```typescript
private function createBitskiEngine(networkName?: undefined | string): ProviderEngine
```
<small>*Defined in [bitski.ts:175](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L175)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| networkName _(Optional)_ | `undefined          ⎮string`   |  - |



##### Return Value
`ProviderEngine`







<a id="_bitski_.bitski.createengine"></a>

#### createEngine




##### Declaration


```typescript
private function createEngine(fetchSubprovider: Subprovider, networkName: string): ProviderEngine
```
<small>*Defined in [bitski.ts:134](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L134)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| fetchSubprovider | `Subprovider`   |  - |
| networkName | `string`   |  - |



##### Return Value
`ProviderEngine`







<a id="_bitski_.bitski.createthirdpartyengine"></a>

#### createThirdPartyEngine




##### Declaration


```typescript
private function createThirdPartyEngine(networkName: string): ProviderEngine
```
<small>*Defined in [bitski.ts:186](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L186)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| networkName | `string`   |  - |



##### Return Value
`ProviderEngine`







<a id="_bitski_.bitski.getconnectbutton"></a>

#### getConnectButton



Creates a sign in with bitski button to add to your app. If an HTML element is passed in as the first parameter, it will automatically add it to the DOM inside that element. Make sure to add a callback to get notified of login events.




##### Declaration


```typescript
function getConnectButton(existingDiv?: HTMLElement, size?: ConnectButtonSize): ConnectButton
```
<small>*Defined in [bitski.ts:80](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L80)*</small>



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
function getProvider(networkName?: undefined | string): ProviderEngine
```
<small>*Defined in [bitski.ts:44](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L44)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| networkName _(Optional)_ | `undefined          ⎮string`   |  optional name of the network to use, or host for a local provider. Defaults to mainnet. |



##### Return Value
`ProviderEngine`







<a id="_bitski_.bitski.getuser"></a>

#### getUser



Gets the current signed in user. Will return an error if we are not signed in.




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [bitski.ts:69](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L69)*</small>



##### Return Value
`Promise<User>`







<a id="_bitski_.bitski.getuserorsignin"></a>

#### getUserOrSignIn



Gets the current user if it exists. If not, signs in. Unlike `getUser` this will never return an expired user or null.




##### Declaration


```typescript
function getUserOrSignIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [bitski.ts:97](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L97)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  Optionally specify an integration type. Defaults to REDIRECT. |



##### Return Value
`Promise<User>`







<a id="_bitski_.bitski.isinframe"></a>

#### isInFrame




##### Declaration


```typescript
function isInFrame(): boolean
```
<small>*Defined in [bitski.ts:130](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L130)*</small>



##### Return Value
`boolean`







<a id="_bitski_.bitski.setlogger"></a>

#### setLogger



Set logger and log level for debugging purposes




##### Declaration


```typescript
function setLogger(logger: any, level?: undefined | number)
```
<small>*Defined in [bitski.ts:123](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L123)*</small>



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
<small>*Defined in [bitski.ts:88](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L88)*</small>



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
function signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [bitski.ts:105](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L105)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)   |  Should match the method called when signing in. |



##### Return Value
`Promise<User>`







<a id="_bitski_.bitski.signout"></a>

#### signOut



Sign the current user out of your application.




##### Declaration


```typescript
function signOut(): Promise<void>
```
<small>*Defined in [bitski.ts:113](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L113)*</small>



##### Return Value
`Promise<void>`









---



---


<a id="_bitski_.enable_cache"></a>

#### «Const» ENABLE_CACHE


```javascript
var ENABLE_CACHE: true = true
```
<small>*Defined in [bitski.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/src/bitski.ts#L18)*</small>







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
new ConnectButton(authProvider: AuthProvider, existingDiv?: HTMLElement, size?: ConnectButtonSize, authIntegrationType?: OAuthProviderIntegrationType): ConnectButton
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| authProvider | [AuthProvider](#_auth_auth_provider_.authprovider)  | - |   - |
| existingDiv _(Optional)_ | `HTMLElement`  | - |   An existing div to turn into a connect button |
| size | [ConnectButtonSize](#_components_connect_button_.connectbuttonsize)  |  ConnectButtonSize.MEDIUM |   - |
| authIntegrationType | [OAuthProviderIntegrationType](#_auth_auth_provider_.oauthproviderintegrationtype)  |  OAuthProviderIntegrationType.POPUP |   - |



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
<small>*Defined in [components/connect-button.ts:69](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L69)*</small>








<a id="_components_connect_button_.connectbutton.configureforlarge"></a>

#### configureForLarge




##### Declaration


```typescript
private function configureForLarge()
```
<small>*Defined in [components/connect-button.ts:141](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L141)*</small>








<a id="_components_connect_button_.connectbutton.configureformedium"></a>

#### configureForMedium




##### Declaration


```typescript
private function configureForMedium()
```
<small>*Defined in [components/connect-button.ts:125](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L125)*</small>








<a id="_components_connect_button_.connectbutton.configureforsmall"></a>

#### configureForSmall




##### Declaration


```typescript
private function configureForSmall()
```
<small>*Defined in [components/connect-button.ts:109](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L109)*</small>








<a id="_components_connect_button_.connectbutton.focus"></a>

#### focus




##### Declaration


```typescript
private function focus()
```
<small>*Defined in [components/connect-button.ts:65](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L65)*</small>








<a id="_components_connect_button_.connectbutton.setattributes"></a>

#### setAttributes




##### Declaration


```typescript
private function setAttributes(attributes: object)
```
<small>*Defined in [components/connect-button.ts:101](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L101)*</small>



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
<small>*Defined in [components/connect-button.ts:73](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L73)*</small>








<a id="_components_connect_button_.connectbutton.signin"></a>

#### signin




##### Declaration


```typescript
private function signin()
```
<small>*Defined in [components/connect-button.ts:53](https://github.com/BitskiCo/bitski-js/blob/master/src/components/connect-button.ts#L53)*</small>










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
<small>*Defined in [subproviders/authenticated-fetch.ts:28](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L28)*</small>


<a id="_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.defaultheaders"></a>

#### defaultHeaders
```javascript
private var defaultHeaders: object
```
<small>*Defined in [subproviders/authenticated-fetch.ts:29](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L29)*</small>




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







<a id="_subproviders_authenticated_fetch_.authenticatedfetchsubprovider.handleathenticatedrequest"></a>

#### handleAthenticatedRequest




##### Declaration


```typescript
function handleAthenticatedRequest(payload: any, next: any, end: any)
```
<small>*Defined in [subproviders/authenticated-fetch.ts:45](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L45)*</small>



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
<small>*Defined in [subproviders/authenticated-fetch.ts:37](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L37)*</small>



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
<small>*Defined in [subproviders/authenticated-fetch.ts:54](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L54)*</small>



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
<small>*Defined in [subproviders/authenticated-fetch.ts:59](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L59)*</small>



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
<small>*Defined in [subproviders/authenticated-fetch.ts:99](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/authenticated-fetch.ts#L99)*</small>



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
<small>*Defined in [subproviders/iframe.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L12)*</small>


<a id="_subproviders_iframe_.iframesubprovider.currenttransaction"></a>

#### currentTransaction
```javascript
private var currentTransaction: Transaction
```
<small>*Defined in [subproviders/iframe.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L13)*</small>


<a id="_subproviders_iframe_.iframesubprovider.currenttransactiondialog"></a>

#### currentTransactionDialog
```javascript
var currentTransactionDialog: Dialog
```
<small>*Defined in [subproviders/iframe.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L9)*</small>


<a id="_subproviders_iframe_.iframesubprovider.networkname"></a>

#### networkName
```javascript
private var networkName: string
```
<small>*Defined in [subproviders/iframe.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L11)*</small>


<a id="_subproviders_iframe_.iframesubprovider.webbaseurl"></a>

#### webBaseUrl
```javascript
private var webBaseUrl: string
```
<small>*Defined in [subproviders/iframe.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L10)*</small>




---

### Methods
<a id="_subproviders_iframe_.iframesubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [subproviders/iframe.ts:24](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L24)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="_subproviders_iframe_.iframesubprovider.receivemessage"></a>

#### receiveMessage




##### Declaration


```typescript
function receiveMessage(event: MessageEvent)
```
<small>*Defined in [subproviders/iframe.ts:43](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L43)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `MessageEvent`   |  - |








<a id="_subproviders_iframe_.iframesubprovider.showtransactionmodal"></a>

#### showTransactionModal




##### Declaration


```typescript
private function showTransactionModal(accessToken: any, payload: any, end: any)
```
<small>*Defined in [subproviders/iframe.ts:73](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L73)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `any`   |  - |
| payload | `any`   |  - |
| end | `any`   |  - |










---


### Relationships
##### Extends
* [&quot;subproviders/iframe&quot;](#_subproviders_iframe_).[IFrameSubprovider](#_subproviders_iframe_.iframesubprovider)

---


<a id="_subproviders_iframe_.transaction"></a>

####  Transaction


```javascript
var Transaction: [any, any]
```
<small>*Defined in [subproviders/iframe.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/src/subproviders/iframe.ts#L6)*</small>









