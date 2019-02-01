---
---



#  Bitski.js

## Index

### External modules

* [browser](#browser)
* [provider](#provider)



---

<a id="browser"></a>






<a id="undefined"></a>

####  AuthenticationStatus





<a id="undefined"></a>

####  Connected


```javascript
var Connected:  = "CONNECTED"
```
<small>*Defined in [browser/src/bitski.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L17)*</small>





<a id="undefined"></a>

####  Expired


```javascript
var Expired:  = "EXPIRED"
```
<small>*Defined in [browser/src/bitski.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L18)*</small>





<a id="undefined"></a>

####  NotConnected


```javascript
var NotConnected:  = "NOT_CONNECTED"
```
<small>*Defined in [browser/src/bitski.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L19)*</small>







<a id="undefined"></a>

####  ConnectButtonSize









<a id="undefined"></a>

####  Large


```javascript
var Large:  = "LARGE"
```
<small>*Defined in [browser/src/components/connect-button.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L10)*</small>





<a id="undefined"></a>

####  Medium


```javascript
var Medium:  = "MEDIUM"
```
<small>*Defined in [browser/src/components/connect-button.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L9)*</small>





<a id="undefined"></a>

####  Small


```javascript
var Small:  = "SMALL"
```
<small>*Defined in [browser/src/components/connect-button.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L8)*</small>







<a id="undefined"></a>

####  OAuthSignInMethod





<a id="undefined"></a>

####  Popup


```javascript
var Popup:  = "POPUP"
```
<small>*Defined in [browser/src/bitski.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L12)*</small>





<a id="undefined"></a>

####  Redirect


```javascript
var Redirect:  = "REDIRECT"
```
<small>*Defined in [browser/src/bitski.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L11)*</small>





<a id="undefined"></a>

####  Silent


```javascript
var Silent:  = "SILENT"
```
<small>*Defined in [browser/src/bitski.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L13)*</small>








<a id="undefined"></a>

##  AccessToken






<a id="undefined"></a>
### constructor
```typescript
new AccessToken(token: string, expiresAt?: undefined | number, scope?: undefined | string): AccessToken
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| token | `string`   |   |
| expiresAt _(Optional)_ | `undefined          ⎮number`   |   |
| scope _(Optional)_ | `undefined          ⎮string`   |   |



##### Return Value
[AccessToken](#)





---

### Properties
<a id="undefined"></a>

#### expiresAt




```javascript
var expiresAt: undefined | number
```
<small>*Defined in [browser/src/auth/access-token.ts:44](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/access-token.ts#L44)*</small>


<a id="undefined"></a>

#### scope




```javascript
var scope: undefined | string
```
<small>*Defined in [browser/src/auth/access-token.ts:49](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/access-token.ts#L49)*</small>


<a id="undefined"></a>

#### token




```javascript
var token: string
```
<small>*Defined in [browser/src/auth/access-token.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/access-token.ts#L39)*</small>




---

<a id="undefined"></a>

####  expired







getexpired(): boolean
##### Return Value
`boolean`







---

### Methods
<a id="undefined"></a>

#### toStorageString








##### Declaration


```typescript
function toStorageString(): string
```
<small>*Defined in [browser/src/auth/access-token.ts:78](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/access-token.ts#L78)*</small>



##### Return Value
`string`







<a id="undefined"></a>

#### fromString








##### Declaration


```typescript
function fromString(s: string): AccessToken | undefined
```
<small>*Defined in [browser/src/auth/access-token.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/access-token.ts#L23)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| s | `string`   |   |



##### Return Value
`AccessToken          ⎮undefined`







<a id="undefined"></a>

#### fromTokenResponse








##### Declaration


```typescript
function fromTokenResponse(tokenResponse: TokenResponse): AccessToken
```
<small>*Defined in [browser/src/auth/access-token.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/access-token.ts#L11)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| tokenResponse | `TokenResponse`   |   |



##### Return Value
[AccessToken](#)









---



---

<a id="undefined"></a>

##  AuthenticatedCacheSubprovider


<a id="undefined"></a>
### constructor
```typescript
new AuthenticatedCacheSubprovider(authProvider: AuthProvider): AuthenticatedCacheSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authProvider | [AuthProvider](#)   |   |



##### Return Value
[AuthenticatedCacheSubprovider](#)





---

### Properties



---

### Methods

<a id="undefined"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any): any
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L19)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |
| next | `any`   |   |
| end | `any`   |   |



##### Return Value
`any`










---


### Relationships
##### Extends
* Subprovider

---

<a id="undefined"></a>

## «Abstract» AuthorizationHandler


<a id="undefined"></a>
### constructor
```typescript
new AuthorizationHandler(opts?: any): AuthorizationHandler
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| opts _(Optional)_ | `any`   |   |



##### Return Value
[AuthorizationHandler](#)





---

### Properties



---

### Methods

<a id="undefined"></a>

#### handleAuthorization




##### Declaration


```typescript
function handleAuthorization(payload: any, next: any, end: any)
```
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L25)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |
| next | `any`   |   |
| end | `any`   |   |








<a id="undefined"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L17)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |
| next | `any`   |   |
| end | `any`   |   |











---


### Relationships
##### Extends
* Subprovider

---

<a id="undefined"></a>

##  Bitski






<a id="undefined"></a>
### constructor
```typescript
new Bitski(clientId: string, redirectUri?: undefined | string, additionalScopes?: string[], options?: any): Bitski
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |   |
| redirectUri _(Optional)_ | `undefined          ⎮string`   |   |
| additionalScopes _(Optional)_ | `string[]`   |   |
| options _(Optional)_ | `any`   |   |



##### Return Value
[Bitski](#)





---

<a id="undefined"></a>

####  authStatus







getauthStatus(): AuthenticationStatus
##### Return Value
[AuthenticationStatus](#)







---

### Methods
<a id="undefined"></a>

#### addSignOutHandler








##### Declaration


```typescript
function addSignOutHandler(fn: function)
```
<small>*Defined in [browser/src/bitski.ts:172](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L172)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |   |








<a id="undefined"></a>

#### connect








##### Declaration


```typescript
function connect(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:149](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L149)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### getAuthStatus








##### Declaration


```typescript
function getAuthStatus(): Promise<AuthenticationStatus>
```
<small>*Defined in [browser/src/bitski.ts:128](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L128)*</small>



##### Return Value
`Promise<AuthenticationStatus>`







<a id="undefined"></a>

#### getConnectButton








##### Declaration


```typescript
function getConnectButton(options?: any, callback?: undefined | function): ConnectButton
```
<small>*Defined in [browser/src/bitski.ts:98](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L98)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options _(Optional)_ | `any`   |   |
| callback _(Optional)_ | `undefined          ⎮function`   |   |



##### Return Value
[ConnectButton](#)







<a id="undefined"></a>

#### getProvider








##### Declaration


```typescript
function getProvider(options?: ProviderOptions | string): BitskiEngine
```
<small>*Defined in [browser/src/bitski.ts:74](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L74)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options _(Optional)_ | `ProviderOptions          ⎮string`   |   |



##### Return Value
`BitskiEngine`







<a id="undefined"></a>

#### getUser








##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:142](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L142)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### redirectCallback








##### Declaration


```typescript
function redirectCallback(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:163](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L163)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### removeSignOutHandler








##### Declaration


```typescript
function removeSignOutHandler(fn: function)
```
<small>*Defined in [browser/src/bitski.ts:180](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L180)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |   |








<a id="undefined"></a>

#### signIn








##### Declaration


```typescript
function signIn(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:135](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L135)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signInRedirect








##### Declaration


```typescript
function signInRedirect()
```
<small>*Defined in [browser/src/bitski.ts:156](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L156)*</small>








<a id="undefined"></a>

#### signOut








##### Declaration


```typescript
function signOut(): Promise<void>
```
<small>*Defined in [browser/src/bitski.ts:190](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L190)*</small>



##### Return Value
`Promise<void>`







<a id="undefined"></a>

#### start








##### Declaration


```typescript
function start(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:113](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L113)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### callback








##### Declaration


```typescript
function callback()
```
<small>*Defined in [browser/src/bitski.ts:38](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L38)*</small>










---



---

<a id="undefined"></a>

##  BitskiBrowserEngine


<a id="undefined"></a>
### constructor
```typescript
new BitskiBrowserEngine(clientId: string, tokenProvider: AccessTokenProvider, networkName?: undefined | string, webBaseUrl?: undefined | string, rpcUrl?: undefined | string, options?: any): BitskiBrowserEngine
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |   |
| tokenProvider | `AccessTokenProvider`   |   |
| networkName _(Optional)_ | `undefined          ⎮string`   |   |
| webBaseUrl _(Optional)_ | `undefined          ⎮string`   |   |
| rpcUrl _(Optional)_ | `undefined          ⎮string`   |   |
| options _(Optional)_ | `any`   |   |



##### Return Value
[BitskiBrowserEngine](#)





---

### Properties



---

### Methods























---


### Relationships
##### Extends
* BitskiEngine
##### Implements
* Provider

---

<a id="undefined"></a>

##  BitskiDevelopmentEngine


<a id="undefined"></a>
### constructor
```typescript
new BitskiDevelopmentEngine(options: any, rpcUrl: any): BitskiDevelopmentEngine
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | `any`   |   |
| rpcUrl | `any`   |   |



##### Return Value
[BitskiDevelopmentEngine](#)





---

### Properties



---

### Methods























---


### Relationships
##### Extends
* BitskiEngine
##### Implements
* Provider

---

<a id="undefined"></a>

##  ConnectButton






<a id="undefined"></a>
### constructor
```typescript
new ConnectButton(authProvider: AuthProvider, existingDiv?: HTMLElement, size?: ConnectButtonSize, authIntegrationType?: OAuthSignInMethod, callback?: undefined | function): ConnectButton
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| authProvider | [AuthProvider](#)  | - |    |
| existingDiv _(Optional)_ | `HTMLElement`  | - |    |
| size | [ConnectButtonSize](#)  |  ConnectButtonSize.Medium |    |
| authIntegrationType | [OAuthSignInMethod](#)  |  OAuthSignInMethod.Popup |    |
| callback _(Optional)_ | `undefined          ⎮function`  | - |    |



##### Return Value
[ConnectButton](#)





---

### Properties
<a id="undefined"></a>

#### callback
```javascript
var callback: undefined | function
```
<small>*Defined in [browser/src/components/connect-button.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L19)*</small>


<a id="undefined"></a>

#### element
```javascript
var element: HTMLElement
```
<small>*Defined in [browser/src/components/connect-button.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L17)*</small>


<a id="undefined"></a>

#### size
```javascript
var size: ConnectButtonSize
```
<small>*Defined in [browser/src/components/connect-button.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L18)*</small>




---

### Methods
<a id="undefined"></a>

#### remove








##### Declaration


```typescript
function remove()
```
<small>*Defined in [browser/src/components/connect-button.ts:51](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L51)*</small>










---



---

<a id="undefined"></a>

##  Dialog






<a id="undefined"></a>
### constructor
```typescript
new Dialog(content: HTMLElement | string, dynamicContent?: boolean): Dialog
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| content | `HTMLElement          ⎮string`  | - |    |
| dynamicContent | `boolean`  | false |    |



##### Return Value
[Dialog](#)





---

### Properties
<a id="undefined"></a>

#### onClose
```javascript
var onClose: undefined | function
```
<small>*Defined in [browser/src/components/dialog.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L12)*</small>




---

### Methods
<a id="undefined"></a>

#### close








##### Declaration


```typescript
function close()
```
<small>*Defined in [browser/src/components/dialog.ts:69](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L69)*</small>








<a id="undefined"></a>

#### dismiss








##### Declaration


```typescript
function dismiss()
```
<small>*Defined in [browser/src/components/dialog.ts:60](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L60)*</small>








<a id="undefined"></a>

#### hide








##### Declaration


```typescript
function hide()
```
<small>*Defined in [browser/src/components/dialog.ts:53](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L53)*</small>








<a id="undefined"></a>

#### setLoading








##### Declaration


```typescript
function setLoading(loading: boolean)
```
<small>*Defined in [browser/src/components/dialog.ts:80](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L80)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| loading | `boolean`   |   |








<a id="undefined"></a>

#### show








##### Declaration


```typescript
function show()
```
<small>*Defined in [browser/src/components/dialog.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L47)*</small>










---



---

<a id="undefined"></a>

##  IFrameSubprovider


<a id="undefined"></a>
### constructor
```typescript
new IFrameSubprovider(webBaseUrl: string, networkName: string, tokenProvider: AccessTokenProvider): IFrameSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| webBaseUrl | `string`   |   |
| networkName | `string`   |   |
| tokenProvider | `AccessTokenProvider`   |   |



##### Return Value
[IFrameSubprovider](#)





---

### Properties
<a id="undefined"></a>

#### currentRequestDialog
```javascript
var currentRequestDialog: Dialog
```
<small>*Defined in [browser/src/subproviders/iframe.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L12)*</small>





---

### Methods

<a id="undefined"></a>

#### handleAuthorization




##### Declaration


```typescript
function handleAuthorization(payload: any, _: any, end: any)
```
<small>*Defined in [browser/src/subproviders/iframe.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L26)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |
| _ | `any`   |   |
| end | `any`   |   |









<a id="undefined"></a>

#### receiveMessage




##### Declaration


```typescript
function receiveMessage(event: MessageEvent)
```
<small>*Defined in [browser/src/subproviders/iframe.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L34)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `MessageEvent`   |   |











---


### Relationships
##### Extends
* [browser](#browser).AuthorizationHandler

---

<a id="undefined"></a>

##  LocalDialogSubprovider


<a id="undefined"></a>
### constructor
```typescript
new LocalDialogSubprovider(opts?: any): LocalDialogSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| opts _(Optional)_ | `any`   |   |



##### Return Value
[LocalDialogSubprovider](#)





---

### Properties



---

### Methods

<a id="undefined"></a>

#### handleAuthorization




##### Declaration


```typescript
function handleAuthorization(payload: any, next: any, end: any)
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L20)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |
| next | `any`   |   |
| end | `any`   |   |












---


### Relationships
##### Extends
* [browser](#browser).AuthorizationHandler

---

<a id="undefined"></a>

##  NoHashQueryStringUtils


### Methods
<a id="undefined"></a>

#### parse




##### Declaration


```typescript
function parse(input: LocationLike, useHash?: undefined | false | true): StringMap
```
<small>*Defined in [browser/src/utils/no-hash-query-string-utils.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/utils/no-hash-query-string-utils.ts#L8)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| input | `LocationLike`   |   |
| useHash _(Optional)_ | `undefined          ⎮false          ⎮true`   |   |



##### Return Value
`StringMap`











---


### Relationships
##### Extends
* BasicQueryStringUtils
##### Implements
* QueryStringUtils

---

<a id="undefined"></a>

##  OAuthManager






<a id="undefined"></a>
### constructor
```typescript
new OAuthManager(options: any): OAuthManager
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | `any`   |   |



##### Return Value
[OAuthManager](#)





---

### Properties
<a id="undefined"></a>

#### configuration
```javascript
var configuration: AuthorizationServiceConfiguration
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L39)*</small>




---

### Methods
<a id="undefined"></a>

#### redirectCallback








##### Declaration


```typescript
function redirectCallback(): Promise<TokenResponse>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:106](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L106)*</small>



##### Return Value
`Promise<TokenResponse>`







<a id="undefined"></a>

#### refreshAccessToken








##### Declaration


```typescript
function refreshAccessToken(refreshToken: string): Promise<TokenResponse>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:131](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L131)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| refreshToken | `string`   |   |



##### Return Value
`Promise<TokenResponse>`







<a id="undefined"></a>

#### requestAccessToken








##### Declaration


```typescript
function requestAccessToken(code: string): Promise<TokenResponse>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:122](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L122)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| code | `string`   |   |



##### Return Value
`Promise<TokenResponse>`







<a id="undefined"></a>

#### requestSignOut








##### Declaration


```typescript
function requestSignOut(accessToken: string): Promise<any>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:140](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L140)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `string`   |   |



##### Return Value
`Promise<any>`







<a id="undefined"></a>

#### requestUserInfo








##### Declaration


```typescript
function requestUserInfo(accessToken: string): Promise<UserInfoResponse>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:157](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L157)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `string`   |   |



##### Return Value
`Promise<UserInfoResponse>`







<a id="undefined"></a>

#### signInPopup








##### Declaration


```typescript
function signInPopup(): Promise<TokenResponse>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:73](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L73)*</small>



##### Return Value
`Promise<TokenResponse>`







<a id="undefined"></a>

#### signInRedirect








##### Declaration


```typescript
function signInRedirect(): Promise<AuthorizationResponse>
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:89](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L89)*</small>



##### Return Value
`Promise<AuthorizationResponse>`









---



---

<a id="undefined"></a>

##  OpenidAuthProvider


<a id="undefined"></a>
### constructor
```typescript
new OpenidAuthProvider(clientId: string, redirectUri: string, additionalScopes?: string[], opts?: any): OpenidAuthProvider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |   |
| redirectUri | `string`   |   |
| additionalScopes _(Optional)_ | `string[]`   |   |
| opts _(Optional)_ | `any`   |   |



##### Return Value
[OpenidAuthProvider](#)





---

### Properties
<a id="undefined"></a>

#### oauthManager
```javascript
var oauthManager: OAuthManager
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L11)*</small>


<a id="undefined"></a>

#### signOutCallback
```javascript
var signOutCallback: undefined | function
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L14)*</small>


<a id="undefined"></a>

#### tokenStore
```javascript
var tokenStore: TokenStore
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L12)*</small>


<a id="undefined"></a>

#### userStore
```javascript
var userStore: UserStore
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L13)*</small>




---

<a id="undefined"></a>

####  authStatus



getauthStatus(): AuthenticationStatus
##### Return Value
[AuthenticationStatus](#)







---

### Methods
<a id="undefined"></a>

#### connect




##### Declaration


```typescript
function connect(): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:96](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L96)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### getAccessToken




##### Declaration


```typescript
function getAccessToken(): Promise<string>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L42)*</small>



##### Return Value
`Promise<string>`







<a id="undefined"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:102](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L102)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### invalidateToken




##### Declaration


```typescript
function invalidateToken(): Promise<void>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:52](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L52)*</small>



##### Return Value
`Promise<void>`







<a id="undefined"></a>

#### redirectCallback




##### Declaration


```typescript
function redirectCallback(): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:120](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L120)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### refreshAccessToken




##### Declaration


```typescript
function refreshAccessToken(): Promise<string>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:62](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L62)*</small>



##### Return Value
`Promise<string>`







<a id="undefined"></a>

#### signIn




##### Declaration


```typescript
function signIn(method: OAuthSignInMethod): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:77](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L77)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | [OAuthSignInMethod](#)   |   |



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signInOrConnect




##### Declaration


```typescript
function signInOrConnect(signInMethod?: OAuthSignInMethod): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:106](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L106)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| signInMethod | [OAuthSignInMethod](#)  |  OAuthSignInMethod.Popup |    |



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signOut




##### Declaration


```typescript
function signOut(): Promise<any>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:127](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L127)*</small>



##### Return Value
`Promise<any>`









---


### Relationships
##### Implements
* AccessTokenProvider
* [browser](#browser).AuthProvider

---

<a id="undefined"></a>

##  PopupRequestHandler


<a id="undefined"></a>
### constructor
```typescript
new PopupRequestHandler(utils?: BasicQueryStringUtils, crypto?: DefaultCrypto): PopupRequestHandler
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| utils | `BasicQueryStringUtils`  |  new BasicQueryStringUtils() |    |
| crypto | `DefaultCrypto`  |  new DefaultCrypto() |    |



##### Return Value
[PopupRequestHandler](#)





---

### Properties



---

### Methods
<a id="undefined"></a>

#### callback




##### Declaration


```typescript
function callback(url: Location)
```
<small>*Defined in [browser/src/auth/popup-handler.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/popup-handler.ts#L42)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| url | `Location`   |   |








<a id="undefined"></a>

#### completeAuthorizationRequest




##### Declaration


```typescript
function completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null>
```
<small>*Defined in [browser/src/auth/popup-handler.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/popup-handler.ts#L47)*</small>



##### Return Value
`Promise<AuthorizationRequestResponse          ⎮null>`








<a id="undefined"></a>

#### performAuthorizationRequest




##### Declaration


```typescript
function performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest)
```
<small>*Defined in [browser/src/auth/popup-handler.ts:30](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/popup-handler.ts#L30)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| configuration | `AuthorizationServiceConfiguration`   |   |
| request | `AuthorizationRequest`   |   |











---


### Relationships
##### Extends
* AuthorizationRequestHandler

---

<a id="undefined"></a>

##  TokenStore


<a id="undefined"></a>
### constructor
```typescript
new TokenStore(clientId: string): TokenStore
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |   |



##### Return Value
[TokenStore](#)





---

<a id="undefined"></a>

####  currentToken



getcurrentToken(): string | undefined
##### Return Value
`string          ⎮undefined`





<a id="undefined"></a>

####  refreshToken



getrefreshToken(): string | undefined
##### Return Value
`string          ⎮undefined`







---

### Methods
<a id="undefined"></a>

#### clear




##### Declaration


```typescript
function clear()
```
<small>*Defined in [browser/src/auth/token-store.ts:60](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/token-store.ts#L60)*</small>








<a id="undefined"></a>

#### invalidateCurrentToken




##### Declaration


```typescript
function invalidateCurrentToken()
```
<small>*Defined in [browser/src/auth/token-store.ts:55](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/token-store.ts#L55)*</small>








<a id="undefined"></a>

#### persistTokenResponse




##### Declaration


```typescript
function persistTokenResponse(response: TokenResponse)
```
<small>*Defined in [browser/src/auth/token-store.ts:46](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/token-store.ts#L46)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| response | `TokenResponse`   |   |










---



---

<a id="undefined"></a>

##  User


<a id="undefined"></a>
### constructor
```typescript
new User(id: string, accounts?: string[], email?: undefined | string, emailVerified?: undefined | false | true, phone?: undefined | string, phoneNumberVerified?: undefined | false | true): User
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |   |
| accounts _(Optional)_ | `string[]`   |   |
| email _(Optional)_ | `undefined          ⎮string`   |   |
| emailVerified _(Optional)_ | `undefined          ⎮false          ⎮true`   |   |
| phone _(Optional)_ | `undefined          ⎮string`   |   |
| phoneNumberVerified _(Optional)_ | `undefined          ⎮false          ⎮true`   |   |



##### Return Value
[User](#)





---

### Properties
<a id="undefined"></a>

#### accounts
```javascript
var accounts: string[]
```
<small>*Defined in [browser/src/auth/user.ts:30](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L30)*</small>


<a id="undefined"></a>

#### email
```javascript
var email: undefined | string
```
<small>*Defined in [browser/src/auth/user.ts:31](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L31)*</small>


<a id="undefined"></a>

#### emailVerified
```javascript
var emailVerified: undefined | false | true
```
<small>*Defined in [browser/src/auth/user.ts:32](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L32)*</small>


<a id="undefined"></a>

#### id
```javascript
var id: string
```
<small>*Defined in [browser/src/auth/user.ts:29](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L29)*</small>


<a id="undefined"></a>

#### phoneNumber
```javascript
var phoneNumber: undefined | string
```
<small>*Defined in [browser/src/auth/user.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L33)*</small>


<a id="undefined"></a>

#### phoneNumberVerified
```javascript
var phoneNumberVerified: undefined | false | true
```
<small>*Defined in [browser/src/auth/user.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L34)*</small>




---

### Methods
<a id="undefined"></a>

#### toStorageString




##### Declaration


```typescript
function toStorageString(): string
```
<small>*Defined in [browser/src/auth/user.ts:45](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L45)*</small>



##### Return Value
`string`







<a id="undefined"></a>

#### fromJson




##### Declaration


```typescript
function fromJson(json: UserInfoResponse): User
```
<small>*Defined in [browser/src/auth/user.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L12)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| json | [UserInfoResponse](#)   |   |



##### Return Value
[User](#)







<a id="undefined"></a>

#### fromString




##### Declaration


```typescript
function fromString(s: string): User | undefined
```
<small>*Defined in [browser/src/auth/user.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L16)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| s | `string`   |   |



##### Return Value
`User          ⎮undefined`









---



---

<a id="undefined"></a>

##  UserStore


<a id="undefined"></a>
### constructor
```typescript
new UserStore(clientId: string): UserStore
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |   |



##### Return Value
[UserStore](#)





---

<a id="undefined"></a>

####  currentUser



getcurrentUser(): User | undefined
##### Return Value
`User          ⎮undefined`







---

### Methods
<a id="undefined"></a>

#### clear




##### Declaration


```typescript
function clear()
```
<small>*Defined in [browser/src/auth/user-store.ts:28](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user-store.ts#L28)*</small>








<a id="undefined"></a>

#### set




##### Declaration


```typescript
function set(user: User | undefined)
```
<small>*Defined in [browser/src/auth/user-store.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user-store.ts#L23)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| user | `User          ⎮undefined`   |   |










---



---


<a id="undefined"></a>

####  AuthProvider





### Properties
<a id="undefined"></a>

#### authStatus
```javascript
var authStatus: AuthenticationStatus
```
<small>*Defined in [browser/src/auth/auth-provider.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L5)*</small>



### Methods
<a id="undefined"></a>

#### connect




##### Declaration


```typescript
function connect(): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L7)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L9)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### redirectCallback




##### Declaration


```typescript
function redirectCallback(): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L10)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signIn




##### Declaration


```typescript
function signIn(method: OAuthSignInMethod): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L6)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | [OAuthSignInMethod](#)   |   |



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signInOrConnect




##### Declaration


```typescript
function signInOrConnect(signInMethod?: OAuthSignInMethod): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L8)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| signInMethod _(Optional)_ | [OAuthSignInMethod](#)   |   |



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signOut




##### Declaration


```typescript
function signOut(): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L11)*</small>



##### Return Value
`Promise<User>`









<a id="undefined"></a>

####  ProviderOptions





### Properties
<a id="undefined"></a>

#### networkName
```javascript
var networkName: undefined | string
```
<small>*Defined in [browser/src/bitski.ts:25](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L25)*</small>


<a id="undefined"></a>

#### pollingInterval
```javascript
var pollingInterval: undefined | number
```
<small>*Defined in [browser/src/bitski.ts:28](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L28)*</small>


<a id="undefined"></a>

#### rpcUrl
```javascript
var rpcUrl: undefined | string
```
<small>*Defined in [browser/src/bitski.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L26)*</small>


<a id="undefined"></a>

#### webBaseUrl
```javascript
var webBaseUrl: undefined | string
```
<small>*Defined in [browser/src/bitski.ts:27](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L27)*</small>




<a id="undefined"></a>

####  UserInfoResponse





### Properties
<a id="undefined"></a>

#### accounts
```javascript
var accounts: string[]
```
<small>*Defined in [browser/src/auth/user.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L3)*</small>


<a id="undefined"></a>

#### email
```javascript
var email: undefined | string
```
<small>*Defined in [browser/src/auth/user.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L4)*</small>


<a id="undefined"></a>

#### email_verified
```javascript
var email_verified: undefined | false | true
```
<small>*Defined in [browser/src/auth/user.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L7)*</small>


<a id="undefined"></a>

#### phone_number
```javascript
var phone_number: undefined | string
```
<small>*Defined in [browser/src/auth/user.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L5)*</small>


<a id="undefined"></a>

#### phone_number_verified
```javascript
var phone_number_verified: undefined | false | true
```
<small>*Defined in [browser/src/auth/user.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L6)*</small>


<a id="undefined"></a>

#### sub
```javascript
var sub: string
```
<small>*Defined in [browser/src/auth/user.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user.ts#L2)*</small>





<a id="undefined"></a>

####  Request


```javascript
var Request: [any, any]
```
<small>*Defined in [browser/src/subproviders/iframe.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L6)*</small>





<a id="undefined"></a>

####  Request


```javascript
var Request: [any, any]
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L5)*</small>






<a id="undefined"></a>

#### «Const» ACCESS_TOKEN_KEY


```javascript
var ACCESS_TOKEN_KEY: "bitski.access_token" = "bitski.access_token"
```
<small>*Defined in [browser/src/auth/token-store.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/token-store.ts#L5)*</small>





<a id="undefined"></a>

#### «Const» BITSKI_USER_API_HOST


```javascript
var BITSKI_USER_API_HOST: "https://www.bitski.com/v1" = "https://www.bitski.com/v1"
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L22)*</small>





<a id="undefined"></a>

#### «Const» CACHED_METHODS


```javascript
var CACHED_METHODS: string[] =  ['eth_accounts']
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L4)*</small>





<a id="undefined"></a>

#### «Const» CheckForPopupClosedInterval


```javascript
var CheckForPopupClosedInterval: 500 = 500
```
<small>*Defined in [browser/src/auth/popup-handler.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/popup-handler.ts#L14)*</small>





<a id="undefined"></a>

#### «Const» DEFAULT_AUTHORIZED_METHODS


```javascript
var DEFAULT_AUTHORIZED_METHODS: string[] =  ['eth_sendTransaction', 'eth_sign', 'eth_signTypedData', 'personal_sign']
```
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L3)*</small>





<a id="undefined"></a>

#### «Const» DEFAULT_CONFIGURATION


```javascript
var DEFAULT_CONFIGURATION: AuthorizationServiceConfiguration =  new AuthorizationServiceConfiguration({
  authorization_endpoint: 'https://account.bitski.com/oauth2/auth',
  revocation_endpoint: '',
  token_endpoint: 'https://account.bitski.com/oauth2/token',
  userinfo_endpoint: 'https://account.bitski.com/userinfo',
})
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:24](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L24)*</small>





<a id="undefined"></a>

#### «Const» DEFAULT_SCOPES


```javascript
var DEFAULT_SCOPES: string[] =  ['openid']
```
<small>*Defined in [browser/src/auth/oauth-manager.ts:31](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/oauth-manager.ts#L31)*</small>





<a id="undefined"></a>

#### «Const» DefaultPopupFeatures


```javascript
var DefaultPopupFeatures: "location=no,toolbar=no,width=500,height=500,left=100,top=100;" = "location=no,toolbar=no,width=500,height=500,left=100,top=100;"
```
<small>*Defined in [browser/src/auth/popup-handler.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/popup-handler.ts#L15)*</small>





<a id="undefined"></a>

#### «Const» REFRESH_TOKEN_KEY


```javascript
var REFRESH_TOKEN_KEY: "bitski.refresh_token" = "bitski.refresh_token"
```
<small>*Defined in [browser/src/auth/token-store.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/token-store.ts#L4)*</small>





<a id="undefined"></a>

#### «Const» TEMPLATE


```javascript
var TEMPLATE: "
  <div class='bitski-dialog'>
      <button class='close-button'>Close</button>
      <div class='bitski-dialog-body'></div>
  </div>
" =  `
  <div class='bitski-dialog'>
      <button class='close-button'>Close</button>
      <div class='bitski-dialog-body'></div>
  </div>
`
```
<small>*Defined in [browser/src/components/dialog.ts:1](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L1)*</small>





<a id="undefined"></a>

#### «Const» USER_KEY


```javascript
var USER_KEY: "bitski.user" = "bitski.user"
```
<small>*Defined in [browser/src/auth/user-store.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/user-store.ts#L3)*</small>






### Functions
<a id="undefined"></a>

###  isAuthProvider




##### Declaration


```typescript
function isAuthProvider(object: any): boolean
```
<small>*Defined in [browser/src/providers/bitski-browser-engine.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-browser-engine.ts#L7)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| object | `any`   |   |



##### Return Value
`boolean`









---

<a id="provider"></a>


<a id="undefined"></a>

##  AccessToken






<a id="undefined"></a>
### constructor
```typescript
new AccessToken(token: string, expiresIn?: undefined | number): AccessToken
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| token | `string`   |   |
| expiresIn _(Optional)_ | `undefined          ⎮number`   |   |



##### Return Value
[AccessToken](#)





---

### Properties
<a id="undefined"></a>

#### expiresAt
```javascript
var expiresAt: undefined | number =  undefined
```
<small>*Defined in [provider/src/auth/access-token.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/auth/access-token.ts#L6)*</small>


<a id="undefined"></a>

#### token
```javascript
var token: string
```
<small>*Defined in [provider/src/auth/access-token.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/auth/access-token.ts#L5)*</small>




---

<a id="undefined"></a>

####  expired



getexpired(): boolean
##### Return Value
`boolean`







---



---

<a id="undefined"></a>

##  AuthenticatedFetchSubprovider


<a id="undefined"></a>
### constructor
```typescript
new AuthenticatedFetchSubprovider(rpcUrl: string, debug: boolean, accessTokenProvider: AccessTokenProvider, defaultHeaders?: object): AuthenticatedFetchSubprovider
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| rpcUrl | `string`  | - |    |
| debug | `boolean`  | - |    |
| accessTokenProvider | [AccessTokenProvider](#)  | - |    |
| defaultHeaders | `object`  |  {} |    |



##### Return Value
[AuthenticatedFetchSubprovider](#)





---

### Methods
<a id="undefined"></a>

#### handleAuthenticatedRequest




##### Declaration


```typescript
function handleAuthenticatedRequest(payload: any, next: any, end: any)
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:59](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L59)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |
| next | `any`   |   |
| end | `any`   |   |








<a id="undefined"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:51](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L51)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |
| next | `any`   |   |
| end | `any`   |   |








<a id="undefined"></a>

#### handleUnauthenticatedRequest




##### Declaration


```typescript
function handleUnauthenticatedRequest(payload: any, next: any, end: any)
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:68](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L68)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |
| next | `any`   |   |
| end | `any`   |   |










---


### Relationships
##### Extends
* any

---

<a id="undefined"></a>

##  BitskiEngine


<a id="undefined"></a>
### constructor
```typescript
new BitskiEngine(options: any): BitskiEngine
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | `any`   |   |



##### Return Value
[BitskiEngine](#)





---

### Properties



---

### Methods















<a id="undefined"></a>

#### send




##### Declaration


```typescript
function send(payload: JSONRPCRequestPayload)
```
<small>*Defined in [provider/src/bitski-engine.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/bitski-engine.ts#L34)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JSONRPCRequestPayload`   |   |















---


### Relationships
##### Extends
* Web3ProviderEngine
##### Implements
* Provider

---

<a id="undefined"></a>

##  NonceTrackerSubprovider






<a id="undefined"></a>
### constructor
```typescript
new NonceTrackerSubprovider(): NonceTrackerSubprovider
```
##### Return Value
[NonceTrackerSubprovider](#)





---

### Properties



---

### Methods

<a id="undefined"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [provider/src/subproviders/nonce-tracker.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/nonce-tracker.ts#L17)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |
| next | `any`   |   |
| end | `any`   |   |











---


### Relationships
##### Extends
* Subprovider

---

<a id="undefined"></a>

##  TransactionValidatorSubprovider






### Properties



---

### Methods

<a id="undefined"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [provider/src/subproviders/transaction-validator.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/transaction-validator.ts#L10)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |
| next | `any`   |   |
| end | `any`   |   |











---


### Relationships
##### Extends
* Subprovider

---


<a id="undefined"></a>

####  AccessTokenProvider





### Methods
<a id="undefined"></a>

#### getAccessToken




##### Declaration


```typescript
function getAccessToken(): Promise<string>
```
<small>*Defined in [provider/src/auth/access-token-provider.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/auth/access-token-provider.ts#L2)*</small>



##### Return Value
`Promise<string>`







<a id="undefined"></a>

#### invalidateToken




##### Declaration


```typescript
function invalidateToken(): Promise<void>
```
<small>*Defined in [provider/src/auth/access-token-provider.ts:3](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/auth/access-token-provider.ts#L3)*</small>



##### Return Value
`Promise<void>`










<a id="undefined"></a>

#### «Const» AUTHENTICATED_METHODS


```javascript
var AUTHENTICATED_METHODS: string[] =  [
    'eth_accounts',
    'eth_sendTransaction',
    'eth_sign',
]
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L17)*</small>





<a id="undefined"></a>

#### «Const» RETRIABLE_ERRORS


```javascript
var RETRIABLE_ERRORS: string[] =  [
    // ignore server overload errors
    'Gateway timeout',
    'ETIMEDOUT',
    // ignore server sent html error pages
    // or truncated json responses
    'SyntaxError',
    'ECONNRESET',
]
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L7)*</small>





<a id="undefined"></a>

#### «Const» UNAUTHORIZED_ERRORS


```javascript
var UNAUTHORIZED_ERRORS: string[] =  [
    'Missing auth', // No token sent
    'Invalid client id', // Wrong client id, or invalid access token
    'Not Authorized',
]
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L23)*</small>






### Functions
<a id="undefined"></a>

###  isErrorRetriable




##### Declaration


```typescript
function isErrorRetriable(err: any): boolean
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:29](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L29)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| err | `any`   |   |



##### Return Value
`boolean`







<a id="undefined"></a>

###  isUnauthorizedError




##### Declaration


```typescript
function isUnauthorizedError(err: Error): boolean
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L34)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| err | `Error`   |   |



##### Return Value
`boolean`











