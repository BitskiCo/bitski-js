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

####  Approved


```javascript
var Approved:  = "APPROVED"
```
<small>*Defined in [browser/src/bitski.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L11)*</small>





<a id="undefined"></a>

####  Connected


```javascript
var Connected:  = "CONNECTED"
```
<small>*Defined in [browser/src/bitski.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L10)*</small>





<a id="undefined"></a>

####  NotConnected


```javascript
var NotConnected:  = "NOT_CONNECTED"
```
<small>*Defined in [browser/src/bitski.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L12)*</small>







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

### Properties
<a id="undefined"></a>

#### authProvider
```javascript
private var authProvider: AuthProvider
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L10)*</small>


<a id="undefined"></a>

#### cachedValues
```javascript
private var cachedValues: Map<string, any>
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L11)*</small>




---

### Methods
<a id="undefined"></a>

#### checkCachedValues




##### Declaration


```typescript
private function checkCachedValues(methodName: string): Promise<any>
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:49](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L49)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| methodName | `string`   |   |



##### Return Value
`Promise<any>`







<a id="undefined"></a>

#### getAccounts




##### Declaration


```typescript
private function getAccounts(): Promise<[string]>
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:63](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L63)*</small>



##### Return Value
`Promise<[string]>`







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







<a id="undefined"></a>

#### supportsCache




##### Declaration


```typescript
private function supportsCache(methodName: string): boolean
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:45](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L45)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| methodName | `string`   |   |



##### Return Value
`boolean`









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

### Properties
<a id="undefined"></a>

#### authorizedMethods
```javascript
private var authorizedMethods: [string]
```
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L11)*</small>




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








<a id="undefined"></a>

#### requiresAuthorization




##### Declaration


```typescript
private function requiresAuthorization(method: string): boolean
```
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:31](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L31)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |   |



##### Return Value
`boolean`









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

### Properties
<a id="undefined"></a>

#### authProvider
```javascript
private var authProvider: OpenidAuthProvider
```
<small>*Defined in [browser/src/bitski.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L21)*</small>


<a id="undefined"></a>

#### clientId
```javascript
private var clientId: string
```
<small>*Defined in [browser/src/bitski.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L20)*</small>


<a id="undefined"></a>

#### engines
```javascript
private var engines: Map<string, BitskiEngine> =  new Map<string, BitskiEngine>()
```
<small>*Defined in [browser/src/bitski.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L19)*</small>




---

### Methods
<a id="undefined"></a>

#### callback








##### Declaration


```typescript
function callback()
```
<small>*Defined in [browser/src/bitski.ts:151](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L151)*</small>








<a id="undefined"></a>

#### connect








##### Declaration


```typescript
function connect(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:115](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L115)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### getAuthStatus








##### Declaration


```typescript
function getAuthStatus(): Promise<AuthenticationStatus>
```
<small>*Defined in [browser/src/bitski.ts:94](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L94)*</small>



##### Return Value
`Promise<AuthenticationStatus>`







<a id="undefined"></a>

#### getConnectButton








##### Declaration


```typescript
function getConnectButton(options?: any, callback?: undefined | function): ConnectButton
```
<small>*Defined in [browser/src/bitski.ts:72](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L72)*</small>



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
<small>*Defined in [browser/src/bitski.ts:39](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L39)*</small>



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
<small>*Defined in [browser/src/bitski.ts:108](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L108)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### redirectCallback








##### Declaration


```typescript
function redirectCallback(url?: undefined | string): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:144](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L144)*</small>



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
<small>*Defined in [browser/src/bitski.ts:173](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L173)*</small>



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
<small>*Defined in [browser/src/bitski.ts:101](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L101)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### signInRedirect








##### Declaration


```typescript
function signInRedirect(redirectUri?: undefined | string)
```
<small>*Defined in [browser/src/bitski.ts:130](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L130)*</small>



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
<small>*Defined in [browser/src/bitski.ts:162](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L162)*</small>



##### Return Value
`Promise<void>`







<a id="undefined"></a>

#### start








##### Declaration


```typescript
function start(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:87](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L87)*</small>



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
<a id="undefined"></a>

#### authProvider
```javascript
private var authProvider: OpenidAuthProvider
```
<small>*Defined in [browser/src/providers/bitski-browser-engine.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-browser-engine.ts#L10)*</small>


<a id="undefined"></a>

#### clientId
```javascript
private var clientId: string
```
<small>*Defined in [browser/src/providers/bitski-browser-engine.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-browser-engine.ts#L11)*</small>


<a id="undefined"></a>

#### networkName
```javascript
private var networkName: string
```
<small>*Defined in [browser/src/providers/bitski-browser-engine.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-browser-engine.ts#L8)*</small>


<a id="undefined"></a>

#### rpcUrl
```javascript
private var rpcUrl: string
```
<small>*Defined in [browser/src/providers/bitski-browser-engine.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-browser-engine.ts#L9)*</small>





---

### Methods


<a id="undefined"></a>

#### addSubproviders




##### Declaration


```typescript
protected function addSubproviders()
```
<small>*Defined in [browser/src/providers/bitski-browser-engine.ts:29](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-browser-engine.ts#L29)*</small>





























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
<a id="undefined"></a>

#### rpcUrl
```javascript
private var rpcUrl: string
```
<small>*Defined in [browser/src/providers/bitski-development-engine.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-development-engine.ts#L7)*</small>





---

### Methods


<a id="undefined"></a>

#### addSubproviders




##### Declaration


```typescript
protected function addSubproviders()
```
<small>*Defined in [browser/src/providers/bitski-development-engine.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-development-engine.ts#L15)*</small>





























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

#### activeColor
```javascript
private var activeColor: string = "#1A7CE6"
```
<small>*Defined in [browser/src/components/connect-button.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L23)*</small>


<a id="undefined"></a>

#### authIntegrationType
```javascript
private var authIntegrationType: OAuthSignInMethod
```
<small>*Defined in [browser/src/components/connect-button.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L21)*</small>


<a id="undefined"></a>

#### authProvider
```javascript
private var authProvider: AuthProvider
```
<small>*Defined in [browser/src/components/connect-button.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L20)*</small>


<a id="undefined"></a>

#### callback
```javascript
var callback: undefined | function
```
<small>*Defined in [browser/src/components/connect-button.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L19)*</small>


<a id="undefined"></a>

#### defaultColor
```javascript
private var defaultColor: string = "#298FFF"
```
<small>*Defined in [browser/src/components/connect-button.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L22)*</small>


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

#### blur




##### Declaration


```typescript
private function blur()
```
<small>*Defined in [browser/src/components/connect-button.ts:80](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L80)*</small>








<a id="undefined"></a>

#### configureForLarge




##### Declaration


```typescript
private function configureForLarge()
```
<small>*Defined in [browser/src/components/connect-button.ts:152](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L152)*</small>








<a id="undefined"></a>

#### configureForMedium




##### Declaration


```typescript
private function configureForMedium()
```
<small>*Defined in [browser/src/components/connect-button.ts:136](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L136)*</small>








<a id="undefined"></a>

#### configureForSmall




##### Declaration


```typescript
private function configureForSmall()
```
<small>*Defined in [browser/src/components/connect-button.ts:120](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L120)*</small>








<a id="undefined"></a>

#### focus




##### Declaration


```typescript
private function focus()
```
<small>*Defined in [browser/src/components/connect-button.ts:76](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L76)*</small>








<a id="undefined"></a>

#### remove








##### Declaration


```typescript
function remove()
```
<small>*Defined in [browser/src/components/connect-button.ts:58](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L58)*</small>








<a id="undefined"></a>

#### setAttributes




##### Declaration


```typescript
private function setAttributes(attributes: object)
```
<small>*Defined in [browser/src/components/connect-button.ts:112](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L112)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| attributes | `object`   |   |








<a id="undefined"></a>

#### setDefaultStyle




##### Declaration


```typescript
private function setDefaultStyle()
```
<small>*Defined in [browser/src/components/connect-button.ts:84](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L84)*</small>








<a id="undefined"></a>

#### signin




##### Declaration


```typescript
private function signin()
```
<small>*Defined in [browser/src/components/connect-button.ts:64](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L64)*</small>










---



---

<a id="undefined"></a>

##  Dialog


<a id="undefined"></a>
### constructor
```typescript
new Dialog(content: any, width?: undefined | number, height?: undefined | number): Dialog
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| content | `any`   |   |
| width _(Optional)_ | `undefined          ⎮number`   |   |
| height _(Optional)_ | `undefined          ⎮number`   |   |



##### Return Value
[Dialog](#)





---

### Properties
<a id="undefined"></a>

#### body
```javascript
private var body: HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L7)*</small>


<a id="undefined"></a>

#### closeButton
```javascript
private var closeButton: HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L9)*</small>


<a id="undefined"></a>

#### container
```javascript
private var container: HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L6)*</small>


<a id="undefined"></a>

#### content
```javascript
private var content: any
```
<small>*Defined in [browser/src/components/dialog.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L5)*</small>


<a id="undefined"></a>

#### dialog
```javascript
private var dialog: HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L8)*</small>


<a id="undefined"></a>

#### height
```javascript
private var height: number
```
<small>*Defined in [browser/src/components/dialog.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L12)*</small>


<a id="undefined"></a>

#### resizeListener
```javascript
private var resizeListener: any
```
<small>*Defined in [browser/src/components/dialog.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L10)*</small>


<a id="undefined"></a>

#### width
```javascript
private var width: number
```
<small>*Defined in [browser/src/components/dialog.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L11)*</small>




---

### Methods
<a id="undefined"></a>

#### addChildren




##### Declaration


```typescript
private function addChildren()
```
<small>*Defined in [browser/src/components/dialog.ts:51](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L51)*</small>








<a id="undefined"></a>

#### createBody




##### Declaration


```typescript
private function createBody(): HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:125](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L125)*</small>



##### Return Value
`HTMLElement`







<a id="undefined"></a>

#### createCloseButton




##### Declaration


```typescript
private function createCloseButton(): HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:58](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L58)*</small>



##### Return Value
`HTMLElement`







<a id="undefined"></a>

#### createContainer




##### Declaration


```typescript
private function createContainer(): HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:110](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L110)*</small>



##### Return Value
`HTMLElement`







<a id="undefined"></a>

#### createDialog




##### Declaration


```typescript
private function createDialog(): HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:85](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L85)*</small>



##### Return Value
`HTMLElement`







<a id="undefined"></a>

#### dismiss




##### Declaration


```typescript
function dismiss()
```
<small>*Defined in [browser/src/components/dialog.ts:46](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L46)*</small>








<a id="undefined"></a>

#### isDocumentLoaded




##### Declaration


```typescript
function isDocumentLoaded(): boolean
```
<small>*Defined in [browser/src/components/dialog.ts:38](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L38)*</small>



##### Return Value
`boolean`







<a id="undefined"></a>

#### render




##### Declaration


```typescript
private function render(): HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:151](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L151)*</small>



##### Return Value
`HTMLElement`







<a id="undefined"></a>

#### resize




##### Declaration


```typescript
private function resize()
```
<small>*Defined in [browser/src/components/dialog.ts:156](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L156)*</small>








<a id="undefined"></a>

#### shouldRenderFullScreen




##### Declaration


```typescript
function shouldRenderFullScreen(): boolean
```
<small>*Defined in [browser/src/components/dialog.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L42)*</small>



##### Return Value
`boolean`







<a id="undefined"></a>

#### styleBody




##### Declaration


```typescript
private function styleBody(body: HTMLElement)
```
<small>*Defined in [browser/src/components/dialog.ts:132](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L132)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| body | `HTMLElement`   |   |








<a id="undefined"></a>

#### styleDialog




##### Declaration


```typescript
private function styleDialog(dialog: HTMLElement)
```
<small>*Defined in [browser/src/components/dialog.ts:92](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L92)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| dialog | `HTMLElement`   |   |










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

#### currentRequest
```javascript
private var currentRequest: Request
```
<small>*Defined in [browser/src/subproviders/iframe.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L16)*</small>


<a id="undefined"></a>

#### currentRequestDialog
```javascript
var currentRequestDialog: Dialog
```
<small>*Defined in [browser/src/subproviders/iframe.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L12)*</small>


<a id="undefined"></a>

#### networkName
```javascript
private var networkName: string
```
<small>*Defined in [browser/src/subproviders/iframe.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L14)*</small>


<a id="undefined"></a>

#### tokenProvider
```javascript
private var tokenProvider: AccessTokenProvider
```
<small>*Defined in [browser/src/subproviders/iframe.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L15)*</small>


<a id="undefined"></a>

#### webBaseUrl
```javascript
private var webBaseUrl: string
```
<small>*Defined in [browser/src/subproviders/iframe.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L13)*</small>




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








<a id="undefined"></a>

#### showAuthorizationModal




##### Declaration


```typescript
private function showAuthorizationModal(element: any, payload: any, end: any)
```
<small>*Defined in [browser/src/subproviders/iframe.ts:98](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L98)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| element | `any`   |   |
| payload | `any`   |   |
| end | `any`   |   |








<a id="undefined"></a>

#### showBitskiModal




##### Declaration


```typescript
private function showBitskiModal(accessToken: any, payload: any, end: any)
```
<small>*Defined in [browser/src/subproviders/iframe.ts:75](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L75)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `any`   |   |
| payload | `any`   |   |
| end | `any`   |   |








<a id="undefined"></a>

#### urlForMethod




##### Declaration


```typescript
private function urlForMethod(method: string): string | undefined
```
<small>*Defined in [browser/src/subproviders/iframe.ts:64](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L64)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |   |



##### Return Value
`string          ⎮undefined`









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
<a id="undefined"></a>

#### currentDialog
```javascript
private var currentDialog: Dialog
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L12)*</small>


<a id="undefined"></a>

#### currentRequest
```javascript
private var currentRequest: Request
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L13)*</small>


<a id="undefined"></a>

#### transactionWindow
```javascript
private var transactionWindow: any
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L14)*</small>




---

### Methods
<a id="undefined"></a>

#### createDefinition




##### Declaration


```typescript
private function createDefinition(label: any, value: any): HTMLDListElement
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L47)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| label | `any`   |   |
| value | `any`   |   |



##### Return Value
`HTMLDListElement`







<a id="undefined"></a>

#### createTransactionWindow




##### Declaration


```typescript
private function createTransactionWindow(payload: any, submitHandler: any, cancelHandler: any): any
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:70](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L70)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |
| submitHandler | `any`   |   |
| cancelHandler | `any`   |   |



##### Return Value
`any`







<a id="undefined"></a>

#### displayModal




##### Declaration


```typescript
private function displayModal(element: any, payload: any, end: any)
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:151](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L151)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| element | `any`   |   |
| payload | `any`   |   |
| end | `any`   |   |








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









<a id="undefined"></a>

#### showTransactionModal




##### Declaration


```typescript
private function showTransactionModal(payload: any, next: any, end: any)
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:24](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L24)*</small>



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
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L21)*</small>


<a id="undefined"></a>

#### userManager
```javascript
var userManager: UserManager
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L22)*</small>




---

<a id="undefined"></a>

#### «Private» hasSignedIn



gethasSignedInprivate (): booleansethasSignedInprivate (newValue: boolean)
##### Return Value
`boolean`


##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| newValue | `boolean`   |   |








---

### Methods
<a id="undefined"></a>

#### getAccessToken




##### Declaration


```typescript
function getAccessToken(): Promise<string>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:58](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L58)*</small>



##### Return Value
`Promise<string>`







<a id="undefined"></a>

#### getAuthStatus




##### Declaration


```typescript
function getAuthStatus(): Promise<AuthenticationStatus>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:68](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L68)*</small>



##### Return Value
`Promise<AuthenticationStatus>`







<a id="undefined"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:106](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L106)*</small>



##### Return Value
`Promise<User>`







<a id="undefined"></a>

#### requestSignOut




##### Declaration


```typescript
private function requestSignOut(accessToken: string): Promise<any>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:150](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L150)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `string`   |   |



##### Return Value
`Promise<any>`







<a id="undefined"></a>

#### sendRequest




##### Declaration


```typescript
private function sendRequest(request: any): Promise<any>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:160](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L160)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| request | `any`   |   |



##### Return Value
`Promise<any>`







<a id="undefined"></a>

#### signIn




##### Declaration


```typescript
function signIn(method: OAuthSignInMethod, opts?: any): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:80](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L80)*</small>



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
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:126](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L126)*</small>



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
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:110](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L110)*</small>



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
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:137](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L137)*</small>



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

#### «Const» DEFAULT_DIALOG_HEIGHT


```javascript
var DEFAULT_DIALOG_HEIGHT: 420 = 420
```
<small>*Defined in [browser/src/components/dialog.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L2)*</small>





<a id="undefined"></a>

#### «Const» DEFAULT_DIALOG_WIDTH


```javascript
var DEFAULT_DIALOG_WIDTH: 490 = 490
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

### Properties
<a id="undefined"></a>

#### accessTokenProvider
```javascript
private var accessTokenProvider: AccessTokenProvider
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:32](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L32)*</small>


<a id="undefined"></a>

#### defaultHeaders
```javascript
private var defaultHeaders: object
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:33](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L33)*</small>




---

### Methods
<a id="undefined"></a>

#### generateParameters




##### Declaration


```typescript
protected function generateParameters(payload: any, accessToken?: undefined | string): object
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:67](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L67)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |
| accessToken _(Optional)_ | `undefined          ⎮string`   |   |



##### Return Value
`object`







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








<a id="undefined"></a>

#### requiresAuthentication




##### Declaration


```typescript
protected function requiresAuthentication(payload: any): boolean
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:63](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L63)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |   |



##### Return Value
`boolean`







<a id="undefined"></a>

#### sendRequest




##### Declaration


```typescript
protected function sendRequest(parameters: object, next: any, end: any)
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:98](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L98)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| parameters | `object`   |   |
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











