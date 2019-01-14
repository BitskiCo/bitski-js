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
<small>*Defined in [browser/src/bitski.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L11)*</small>





<a id="undefined"></a>

####  Expired


```javascript
var Expired:  = "EXPIRED"
```
<small>*Defined in [browser/src/bitski.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L12)*</small>





<a id="undefined"></a>

####  NotConnected


```javascript
var NotConnected:  = "NOT_CONNECTED"
```
<small>*Defined in [browser/src/bitski.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L13)*</small>







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
<small>*Defined in [browser/src/auth/auth-provider.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L6)*</small>





<a id="undefined"></a>

####  Redirect


```javascript
var Redirect:  = "REDIRECT"
```
<small>*Defined in [browser/src/auth/auth-provider.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L5)*</small>





<a id="undefined"></a>

####  Silent


```javascript
var Silent:  = "SILENT"
```
<small>*Defined in [browser/src/auth/auth-provider.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L7)*</small>








<a id="undefined"></a>

##  AuthenticatedCacheSubprovider


<a id="undefined"></a>
### constructor
```typescript
new AuthenticatedCacheSubprovider(authProvider: any): AuthenticatedCacheSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authProvider | `any`   |   |



##### Return Value
[AuthenticatedCacheSubprovider](#)





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
* any

---

<a id="undefined"></a>

##  AuthorizationHandler


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

### Methods
<a id="undefined"></a>

#### handleAuthorization




##### Declaration


```typescript
function handleAuthorization(payload: any, next: any, end: any)
```
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L26)*</small>



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
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L18)*</small>



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

##  Bitski






<a id="undefined"></a>
### constructor
```typescript
new Bitski(clientId: string, redirectUri?: undefined | string, options?: any): Bitski
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |   |
| redirectUri _(Optional)_ | `undefined          ⎮string`   |   |
| options _(Optional)_ | `any`   |   |



##### Return Value
[Bitski](#)





---

### Methods
<a id="undefined"></a>

#### callback








##### Declaration


```typescript
function callback()
```
<small>*Defined in [browser/src/bitski.ts:160](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L160)*</small>








<a id="undefined"></a>

#### connect








##### Declaration


```typescript
function connect(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:124](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L124)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### getAuthStatus








##### Declaration


```typescript
function getAuthStatus(): Promise<AuthenticationStatus>
```
<small>*Defined in [browser/src/bitski.ts:103](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L103)*</small>



##### Return Value
`Promise<AuthenticationStatus>`







<a id="undefined"></a>

#### getConnectButton








##### Declaration


```typescript
function getConnectButton(options?: any, callback?: undefined | function): ConnectButton
```
<small>*Defined in [browser/src/bitski.ts:81](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L81)*</small>



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
function getProvider(networkName?: undefined | string, options?: any): BitskiEngine
```
<small>*Defined in [browser/src/bitski.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L47)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| networkName _(Optional)_ | `undefined          ⎮string`   |   |
| options _(Optional)_ | `any`   |   |



##### Return Value
`BitskiEngine`







<a id="undefined"></a>

#### getUser








##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:117](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L117)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### redirectCallback








##### Declaration


```typescript
function redirectCallback(url?: undefined | string): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:153](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L153)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| url _(Optional)_ | `undefined          ⎮string`   |   |



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### setLogger








##### Declaration


```typescript
function setLogger(logger: any, level?: undefined | number)
```
<small>*Defined in [browser/src/bitski.ts:182](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L182)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| logger | `any`   |   |
| level _(Optional)_ | `undefined          ⎮number`   |   |








<a id="undefined"></a>

#### signIn








##### Declaration


```typescript
function signIn(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:110](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L110)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signInRedirect








##### Declaration


```typescript
function signInRedirect(redirectUri?: undefined | string)
```
<small>*Defined in [browser/src/bitski.ts:139](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L139)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| redirectUri _(Optional)_ | `undefined          ⎮string`   |   |








<a id="undefined"></a>

#### signOut








##### Declaration


```typescript
function signOut(): Promise<void>
```
<small>*Defined in [browser/src/bitski.ts:171](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L171)*</small>



##### Return Value
`Promise<void>`







<a id="undefined"></a>

#### start








##### Declaration


```typescript
function start(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:96](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L96)*</small>



##### Return Value
`Promise<User>`









---



---

<a id="undefined"></a>

##  BitskiBrowserEngine


<a id="undefined"></a>
### constructor
```typescript
new BitskiBrowserEngine(clientId: string, authProvider: OpenidAuthProvider, networkName?: undefined | string, options?: any): BitskiBrowserEngine
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |   |
| authProvider | [OpenidAuthProvider](#)   |   |
| networkName _(Optional)_ | `undefined          ⎮string`   |   |
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

##  OpenidAuthProvider


<a id="undefined"></a>
### constructor
```typescript
new OpenidAuthProvider(clientId: string, redirectUri: string, opts?: any): OpenidAuthProvider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |   |
| redirectUri | `string`   |   |
| opts _(Optional)_ | `any`   |   |



##### Return Value
[OpenidAuthProvider](#)





---

### Properties
<a id="undefined"></a>

#### timeout
```javascript
var timeout: number = 5000
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L22)*</small>


<a id="undefined"></a>

#### userManager
```javascript
var userManager: UserManager
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L23)*</small>




---

### Methods
<a id="undefined"></a>

#### getAccessToken




##### Declaration


```typescript
function getAccessToken(): Promise<string>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:70](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L70)*</small>



##### Return Value
`Promise<string>`







<a id="undefined"></a>

#### getAuthStatus




##### Declaration


```typescript
function getAuthStatus(): Promise<AuthenticationStatus>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:80](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L80)*</small>



##### Return Value
`Promise<AuthenticationStatus>`







<a id="undefined"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:118](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L118)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signIn




##### Declaration


```typescript
function signIn(method: OAuthSignInMethod, opts?: any): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:92](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L92)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | [OAuthSignInMethod](#)   |   |
| opts _(Optional)_ | `any`   |   |



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signInCallback




##### Declaration


```typescript
function signInCallback(method: OAuthSignInMethod, url?: undefined | string): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:145](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L145)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | [OAuthSignInMethod](#)   |   |
| url _(Optional)_ | `undefined          ⎮string`   |   |



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signInOrConnect




##### Declaration


```typescript
function signInOrConnect(signInMethod?: OAuthSignInMethod): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:122](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L122)*</small>



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
function signOut(): Promise<any>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:160](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L160)*</small>



##### Return Value
`Promise<any>`









---


### Relationships
##### Implements
* AccessTokenProvider
* [browser](#browser).AuthProvider

---


<a id="undefined"></a>

####  AuthProvider





### Methods
<a id="undefined"></a>

#### getAuthStatus




##### Declaration


```typescript
function getAuthStatus(): Promise<AuthenticationStatus>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L11)*</small>



##### Return Value
`Promise<AuthenticationStatus>`







<a id="undefined"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L14)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signIn




##### Declaration


```typescript
function signIn(method: OAuthSignInMethod, opts?: any): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L12)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | [OAuthSignInMethod](#)   |   |
| opts _(Optional)_ | `any`   |   |



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signInCallback




##### Declaration


```typescript
function signInCallback(method: OAuthSignInMethod, url?: undefined | string): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L15)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | [OAuthSignInMethod](#)   |   |
| url _(Optional)_ | `undefined          ⎮string`   |   |



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signInOrConnect




##### Declaration


```typescript
function signInOrConnect(signInMethod?: OAuthSignInMethod): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L13)*</small>



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
function signOut(): Promise<any>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L16)*</small>



##### Return Value
`Promise<any>`










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

#### «Const» BITSKI_IS_SIGNED_IN_KEY


```javascript
var BITSKI_IS_SIGNED_IN_KEY: "bitski.isSignedIn" = "bitski.isSignedIn"
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L7)*</small>





<a id="undefined"></a>

#### «Const» BITSKI_USER_API_HOST


```javascript
var BITSKI_USER_API_HOST: "https://www.bitski.com/v1" = "https://www.bitski.com/v1"
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L6)*</small>





<a id="undefined"></a>

#### «Const» CACHED_METHODS


```javascript
var CACHED_METHODS: string[] =  ['eth_accounts']
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L4)*</small>





<a id="undefined"></a>

#### «Const» DEFAULT_AUTHORIZED_METHODS


```javascript
var DEFAULT_AUTHORIZED_METHODS: string[] =  ['eth_sendTransaction', 'eth_sign', 'eth_signTypedData', 'personal_sign']
```
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L4)*</small>





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

## DEFAULT_SETTINGS


<a id="undefined"></a>

####  authority


```javascript
var authority: string = "https://account.bitski.com"
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L10)*</small>





<a id="undefined"></a>

####  automaticSilentRenew


```javascript
var automaticSilentRenew: boolean = true
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L11)*</small>





<a id="undefined"></a>

####  filterProtocolClaims


```javascript
var filterProtocolClaims: boolean = true
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L12)*</small>





<a id="undefined"></a>

####  includeIdTokenInSilentRenew


```javascript
var includeIdTokenInSilentRenew: boolean = false
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L13)*</small>





<a id="undefined"></a>

####  loadUserInfo


```javascript
var loadUserInfo: boolean = true
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L14)*</small>





<a id="undefined"></a>

####  response_type


```javascript
var response_type: string = "id_token token"
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L15)*</small>





<a id="undefined"></a>

####  scope


```javascript
var scope: string = "openid"
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L16)*</small>





<a id="undefined"></a>

####  userStore


```javascript
var userStore: WebStorageStateStore =  new WebStorageStateStore({ store: localStorage })
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L17)*</small>









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
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:49](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L49)*</small>



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
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:41](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L41)*</small>



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
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:58](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L58)*</small>



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
<small>*Defined in [provider/src/bitski-engine.ts:31](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/bitski-engine.ts#L31)*</small>



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






### Functions
<a id="undefined"></a>

###  isErrorRetriable




##### Declaration


```typescript
function isErrorRetriable(err: any): boolean
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L23)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| err | `any`   |   |



##### Return Value
`boolean`











