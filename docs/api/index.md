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



<a id="browser.connectbuttonsize"></a>

####  ConnectButtonSize


Sizing options for the Bitski connect button.






<a id="browser.connectbuttonsize.large"></a>

####  LARGE


```javascript
var LARGE: 
```
<small>*Defined in [browser/src/components/connect-button.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L10)*</small>





<a id="browser.connectbuttonsize.medium"></a>

####  MEDIUM


```javascript
var MEDIUM: 
```
<small>*Defined in [browser/src/components/connect-button.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L9)*</small>





<a id="browser.connectbuttonsize.small"></a>

####  SMALL


```javascript
var SMALL: 
```
<small>*Defined in [browser/src/components/connect-button.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L8)*</small>







<a id="browser.oauthproviderintegrationtype"></a>

####  OAuthProviderIntegrationType





<a id="browser.oauthproviderintegrationtype.iframe"></a>

####  IFRAME


```javascript
var IFRAME: 
```
<small>*Defined in [browser/src/auth/auth-provider.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L4)*</small>





<a id="browser.oauthproviderintegrationtype.popup"></a>

####  POPUP


```javascript
var POPUP: 
```
<small>*Defined in [browser/src/auth/auth-provider.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L6)*</small>





<a id="browser.oauthproviderintegrationtype.redirect"></a>

####  REDIRECT


```javascript
var REDIRECT: 
```
<small>*Defined in [browser/src/auth/auth-provider.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L5)*</small>





<a id="browser.oauthproviderintegrationtype.silent"></a>

####  SILENT


```javascript
var SILENT: 
```
<small>*Defined in [browser/src/auth/auth-provider.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L7)*</small>








<a id="browser.authenticatedcachesubprovider"></a>

##  AuthenticatedCacheSubprovider


<a id="browser.authenticatedcachesubprovider.constructor"></a>
### constructor
```typescript
new AuthenticatedCacheSubprovider(authProvider: any): AuthenticatedCacheSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authProvider | `any`   |  - |



##### Return Value
[AuthenticatedCacheSubprovider](#browser.authenticatedcachesubprovider)





---

### Properties
<a id="browser.authenticatedcachesubprovider.authprovider"></a>

#### authProvider
```javascript
private var authProvider: AuthProvider
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L10)*</small>


<a id="browser.authenticatedcachesubprovider.cachedvalues"></a>

#### cachedValues
```javascript
private var cachedValues: Map<string, any>
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L11)*</small>




---

### Methods
<a id="browser.authenticatedcachesubprovider.checkcachedvalues"></a>

#### checkCachedValues




##### Declaration


```typescript
private function checkCachedValues(methodName: string): Promise<any>
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:49](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L49)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| methodName | `string`   |  - |



##### Return Value
`Promise<any>`







<a id="browser.authenticatedcachesubprovider.getaccounts"></a>

#### getAccounts




##### Declaration


```typescript
private function getAccounts(): Promise<[string]>
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:63](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L63)*</small>



##### Return Value
`Promise<[string]>`







<a id="browser.authenticatedcachesubprovider.handlerequest"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any): any
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L19)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |



##### Return Value
`any`







<a id="browser.authenticatedcachesubprovider.supportscache"></a>

#### supportsCache




##### Declaration


```typescript
private function supportsCache(methodName: string): boolean
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:45](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L45)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| methodName | `string`   |  - |



##### Return Value
`boolean`









---


### Relationships
##### Extends
* any

---

<a id="browser.authorizationhandler"></a>

##  AuthorizationHandler


<a id="browser.authorizationhandler.constructor-1"></a>
### constructor
```typescript
new AuthorizationHandler(opts?: any): AuthorizationHandler
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| opts _(Optional)_ | `any`   |  - |



##### Return Value
[AuthorizationHandler](#browser.authorizationhandler)





---

### Properties
<a id="browser.authorizationhandler.authorizedmethods"></a>

#### authorizedMethods
```javascript
private var authorizedMethods: [string]
```
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L11)*</small>




---

### Methods
<a id="browser.authorizationhandler.handleauthorization"></a>

#### handleAuthorization




##### Declaration


```typescript
function handleAuthorization(payload: any, next: any, end: any)
```
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L26)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="browser.authorizationhandler.handlerequest-1"></a>

#### handleRequest




##### Declaration


```typescript
function handleRequest(payload: any, next: any, end: any)
```
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L18)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="browser.authorizationhandler.requiresauthorization"></a>

#### requiresAuthorization




##### Declaration


```typescript
private function requiresAuthorization(method: string): boolean
```
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:31](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L31)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |  - |



##### Return Value
`boolean`









---


### Relationships
##### Extends
* any

---

<a id="browser.bitski"></a>

##  Bitski


Bitski SDK



<a id="browser.bitski.constructor-2"></a>
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
[Bitski](#browser.bitski)





---

### Properties
<a id="browser.bitski.authprovider-1"></a>

#### authProvider
```javascript
private var authProvider: OpenidAuthProvider
```
<small>*Defined in [browser/src/bitski.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L15)*</small>


<a id="browser.bitski.clientid"></a>

#### clientId
```javascript
private var clientId: string
```
<small>*Defined in [browser/src/bitski.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L14)*</small>


<a id="browser.bitski.engines"></a>

#### engines
```javascript
private var engines: Map<string, BitskiEngine> =  new Map<string, BitskiEngine>()
```
<small>*Defined in [browser/src/bitski.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L13)*</small>




---

### Methods
<a id="browser.bitski.assumedcallbacktype"></a>

#### assumedCallbackType




##### Declaration


```typescript
private function assumedCallbackType(w: Window): OAuthProviderIntegrationType
```
<small>*Defined in [browser/src/bitski.ts:130](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L130)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| w | `Window`   |  - |



##### Return Value
[OAuthProviderIntegrationType](#browser.oauthproviderintegrationtype)







<a id="browser.bitski.getconnectbutton"></a>

#### getConnectButton



Creates a sign in with bitski button to add to your app. If an HTML element is passed in as the first parameter, it will automatically add it to the DOM inside that element. Make sure to add a callback to get notified of login events.




##### Declaration


```typescript
function getConnectButton(existingDiv?: HTMLElement, size?: ConnectButtonSize, authMethod?: OAuthProviderIntegrationType, callback?: undefined | function): ConnectButton
```
<small>*Defined in [browser/src/bitski.ts:75](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L75)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| existingDiv _(Optional)_ | `HTMLElement`  | - |   Existing element to turn into a Bitski connect button |
| size | [ConnectButtonSize](#browser.connectbuttonsize)  |  ConnectButtonSize.MEDIUM |   Size of button to generate. Defaults to medium. |
| authMethod | [OAuthProviderIntegrationType](#browser.oauthproviderintegrationtype)  |  OAuthProviderIntegrationType.POPUP |   Login method to use. Defaults to popup. |
| callback _(Optional)_ | `undefined          ⎮function`  | - |   Post-login callback. Called when sign in is complete. Not applicable for redirect login method. |



##### Return Value
[ConnectButton](#browser.connectbutton)







<a id="browser.bitski.getprovider"></a>

#### getProvider



Returns a new web3 provider for a given network.




##### Declaration


```typescript
function getProvider(networkName?: undefined | string, options?: any): BitskiEngine
```
<small>*Defined in [browser/src/bitski.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L34)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| networkName _(Optional)_ | `undefined          ⎮string`   |  optional name of the network to use, or host for a local provider. Defaults to mainnet. |
| options _(Optional)_ | `any`   |  options for the provider |



##### Return Value
`BitskiEngine`







<a id="browser.bitski.getuser"></a>

#### getUser



Gets the current signed in user. Will return an error if we are not signed in.




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:62](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L62)*</small>



##### Return Value
`Promise<User>`







<a id="browser.bitski.getuserorsignin"></a>

#### getUserOrSignIn



Gets the current user if it exists. If not, signs in. Unlike `getUser` this will never return an expired user or null.




##### Declaration


```typescript
function getUserOrSignIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:96](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L96)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#browser.oauthproviderintegrationtype)   |  Optionally specify an integration type. Defaults to REDIRECT. |



##### Return Value
`Promise<User>`







<a id="browser.bitski.setlogger"></a>

#### setLogger



Set logger and log level for debugging purposes




##### Declaration


```typescript
function setLogger(logger: any, level?: undefined | number)
```
<small>*Defined in [browser/src/bitski.ts:123](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L123)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| logger | `any`   |  The logger to use (i.e. console). Must support methods info(), warn(), and error(). |
| level _(Optional)_ | `undefined          ⎮number`   |  The desired log level.Use 0 for none (the default), 1 for errors, 2 for warnings, 3 for info, and 4 for debug. |








<a id="browser.bitski.signin"></a>

#### signIn



Starts sign in flow.




##### Declaration


```typescript
function signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:87](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L87)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#browser.oauthproviderintegrationtype)   |  - |



##### Return Value
`Promise<User>`







<a id="browser.bitski.signincallback"></a>

#### signInCallback



Called from your oauth redirect page.




##### Declaration


```typescript
function signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType, url?: undefined | string): Promise<User>
```
<small>*Defined in [browser/src/bitski.ts:105](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L105)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#browser.oauthproviderintegrationtype)   |  Log in method used. Must match the method actually used when logging in. |
| url _(Optional)_ | `undefined          ⎮string`   |  Optionally provide the full callback url including the query params in cases when it cannot be automatically detected |



##### Return Value
`Promise<User>`







<a id="browser.bitski.signout"></a>

#### signOut



Sign the current user out of your application.




##### Declaration


```typescript
function signOut(): Promise<void>
```
<small>*Defined in [browser/src/bitski.ts:112](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/bitski.ts#L112)*</small>



##### Return Value
`Promise<void>`









---



---

<a id="browser.bitskibrowserengine"></a>

##  BitskiBrowserEngine


<a id="browser.bitskibrowserengine.constructor-3"></a>
### constructor
```typescript
new BitskiBrowserEngine(clientId: string, authProvider: OpenidAuthProvider, networkName?: undefined | string, options?: any): BitskiBrowserEngine
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| clientId | `string`   |  - |
| authProvider | [OpenidAuthProvider](#browser.openidauthprovider)   |  - |
| networkName _(Optional)_ | `undefined          ⎮string`   |  - |
| options _(Optional)_ | `any`   |  - |



##### Return Value
[BitskiBrowserEngine](#browser.bitskibrowserengine)





---

### Properties
<a id="browser.bitskibrowserengine.authprovider-2"></a>

#### authProvider
```javascript
private var authProvider: OpenidAuthProvider
```
<small>*Defined in [browser/src/providers/bitski-browser-engine.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-browser-engine.ts#L10)*</small>


<a id="browser.bitskibrowserengine.clientid-1"></a>

#### clientId
```javascript
private var clientId: string
```
<small>*Defined in [browser/src/providers/bitski-browser-engine.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-browser-engine.ts#L11)*</small>


<a id="browser.bitskibrowserengine.networkname"></a>

#### networkName
```javascript
private var networkName: string
```
<small>*Defined in [browser/src/providers/bitski-browser-engine.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-browser-engine.ts#L8)*</small>


<a id="browser.bitskibrowserengine.rpcurl"></a>

#### rpcUrl
```javascript
private var rpcUrl: string
```
<small>*Defined in [browser/src/providers/bitski-browser-engine.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-browser-engine.ts#L9)*</small>





---

### Methods


<a id="browser.bitskibrowserengine.addsubproviders"></a>

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

<a id="browser.bitskidevelopmentengine"></a>

##  BitskiDevelopmentEngine


<a id="browser.bitskidevelopmentengine.constructor-4"></a>
### constructor
```typescript
new BitskiDevelopmentEngine(options: any, rpcUrl: any): BitskiDevelopmentEngine
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | `any`   |  - |
| rpcUrl | `any`   |  - |



##### Return Value
[BitskiDevelopmentEngine](#browser.bitskidevelopmentengine)





---

### Properties
<a id="browser.bitskidevelopmentengine.rpcurl-1"></a>

#### rpcUrl
```javascript
private var rpcUrl: string
```
<small>*Defined in [browser/src/providers/bitski-development-engine.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/providers/bitski-development-engine.ts#L7)*</small>





---

### Methods


<a id="browser.bitskidevelopmentengine.addsubproviders-1"></a>

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

<a id="browser.connectbutton"></a>

##  ConnectButton


A button used to connect to Bitski.



<a id="browser.connectbutton.constructor-5"></a>
### constructor
```typescript
new ConnectButton(authProvider: AuthProvider, existingDiv?: HTMLElement, size?: ConnectButtonSize, authIntegrationType?: OAuthProviderIntegrationType, callback?: undefined | function): ConnectButton
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| authProvider | [AuthProvider](#browser.authprovider-4)  | - |   - |
| existingDiv _(Optional)_ | `HTMLElement`  | - |   An existing div to turn into a connect button |
| size | [ConnectButtonSize](#browser.connectbuttonsize)  |  ConnectButtonSize.MEDIUM |   - |
| authIntegrationType | [OAuthProviderIntegrationType](#browser.oauthproviderintegrationtype)  |  OAuthProviderIntegrationType.POPUP |   - |
| callback _(Optional)_ | `undefined          ⎮function`  | - |   - |



##### Return Value
[ConnectButton](#browser.connectbutton)





---

### Properties
<a id="browser.connectbutton.activecolor"></a>

#### activeColor
```javascript
private var activeColor: string = "#1A7CE6"
```
<small>*Defined in [browser/src/components/connect-button.ts:23](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L23)*</small>


<a id="browser.connectbutton.authintegrationtype"></a>

#### authIntegrationType
```javascript
private var authIntegrationType: OAuthProviderIntegrationType
```
<small>*Defined in [browser/src/components/connect-button.ts:21](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L21)*</small>


<a id="browser.connectbutton.authprovider-3"></a>

#### authProvider
```javascript
private var authProvider: AuthProvider
```
<small>*Defined in [browser/src/components/connect-button.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L20)*</small>


<a id="browser.connectbutton.callback"></a>

#### callback
```javascript
var callback: undefined | function
```
<small>*Defined in [browser/src/components/connect-button.ts:19](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L19)*</small>


<a id="browser.connectbutton.defaultcolor"></a>

#### defaultColor
```javascript
private var defaultColor: string = "#298FFF"
```
<small>*Defined in [browser/src/components/connect-button.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L22)*</small>


<a id="browser.connectbutton.element"></a>

#### element
```javascript
var element: HTMLElement
```
<small>*Defined in [browser/src/components/connect-button.ts:17](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L17)*</small>


<a id="browser.connectbutton.size"></a>

#### size
```javascript
var size: ConnectButtonSize
```
<small>*Defined in [browser/src/components/connect-button.ts:18](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L18)*</small>




---

### Methods
<a id="browser.connectbutton.blur"></a>

#### blur




##### Declaration


```typescript
private function blur()
```
<small>*Defined in [browser/src/components/connect-button.ts:80](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L80)*</small>








<a id="browser.connectbutton.configureforlarge"></a>

#### configureForLarge




##### Declaration


```typescript
private function configureForLarge()
```
<small>*Defined in [browser/src/components/connect-button.ts:152](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L152)*</small>








<a id="browser.connectbutton.configureformedium"></a>

#### configureForMedium




##### Declaration


```typescript
private function configureForMedium()
```
<small>*Defined in [browser/src/components/connect-button.ts:136](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L136)*</small>








<a id="browser.connectbutton.configureforsmall"></a>

#### configureForSmall




##### Declaration


```typescript
private function configureForSmall()
```
<small>*Defined in [browser/src/components/connect-button.ts:120](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L120)*</small>








<a id="browser.connectbutton.focus"></a>

#### focus




##### Declaration


```typescript
private function focus()
```
<small>*Defined in [browser/src/components/connect-button.ts:76](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L76)*</small>








<a id="browser.connectbutton.remove"></a>

#### remove



Removes the button from the page




##### Declaration


```typescript
function remove()
```
<small>*Defined in [browser/src/components/connect-button.ts:58](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L58)*</small>








<a id="browser.connectbutton.setattributes"></a>

#### setAttributes




##### Declaration


```typescript
private function setAttributes(attributes: object)
```
<small>*Defined in [browser/src/components/connect-button.ts:112](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L112)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| attributes | `object`   |  - |








<a id="browser.connectbutton.setdefaultstyle"></a>

#### setDefaultStyle




##### Declaration


```typescript
private function setDefaultStyle()
```
<small>*Defined in [browser/src/components/connect-button.ts:84](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L84)*</small>








<a id="browser.connectbutton.signin-1"></a>

#### signin




##### Declaration


```typescript
private function signin()
```
<small>*Defined in [browser/src/components/connect-button.ts:64](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/connect-button.ts#L64)*</small>










---



---

<a id="browser.dialog"></a>

##  Dialog


<a id="browser.dialog.constructor-6"></a>
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
[Dialog](#browser.dialog)





---

### Properties
<a id="browser.dialog.body"></a>

#### body
```javascript
private var body: HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L7)*</small>


<a id="browser.dialog.closebutton"></a>

#### closeButton
```javascript
private var closeButton: HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:9](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L9)*</small>


<a id="browser.dialog.container"></a>

#### container
```javascript
private var container: HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L6)*</small>


<a id="browser.dialog.content"></a>

#### content
```javascript
private var content: any
```
<small>*Defined in [browser/src/components/dialog.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L5)*</small>


<a id="browser.dialog.dialog-1"></a>

#### dialog
```javascript
private var dialog: HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L8)*</small>


<a id="browser.dialog.height"></a>

#### height
```javascript
private var height: number
```
<small>*Defined in [browser/src/components/dialog.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L12)*</small>


<a id="browser.dialog.resizelistener"></a>

#### resizeListener
```javascript
private var resizeListener: any
```
<small>*Defined in [browser/src/components/dialog.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L10)*</small>


<a id="browser.dialog.width"></a>

#### width
```javascript
private var width: number
```
<small>*Defined in [browser/src/components/dialog.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L11)*</small>




---

### Methods
<a id="browser.dialog.addchildren"></a>

#### addChildren




##### Declaration


```typescript
private function addChildren()
```
<small>*Defined in [browser/src/components/dialog.ts:51](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L51)*</small>








<a id="browser.dialog.createbody"></a>

#### createBody




##### Declaration


```typescript
private function createBody(): HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:125](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L125)*</small>



##### Return Value
`HTMLElement`







<a id="browser.dialog.createclosebutton"></a>

#### createCloseButton




##### Declaration


```typescript
private function createCloseButton(): HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:58](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L58)*</small>



##### Return Value
`HTMLElement`







<a id="browser.dialog.createcontainer"></a>

#### createContainer




##### Declaration


```typescript
private function createContainer(): HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:110](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L110)*</small>



##### Return Value
`HTMLElement`







<a id="browser.dialog.createdialog"></a>

#### createDialog




##### Declaration


```typescript
private function createDialog(): HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:85](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L85)*</small>



##### Return Value
`HTMLElement`







<a id="browser.dialog.dismiss"></a>

#### dismiss




##### Declaration


```typescript
function dismiss()
```
<small>*Defined in [browser/src/components/dialog.ts:46](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L46)*</small>








<a id="browser.dialog.isdocumentloaded"></a>

#### isDocumentLoaded




##### Declaration


```typescript
function isDocumentLoaded(): boolean
```
<small>*Defined in [browser/src/components/dialog.ts:38](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L38)*</small>



##### Return Value
`boolean`







<a id="browser.dialog.render"></a>

#### render




##### Declaration


```typescript
private function render(): HTMLElement
```
<small>*Defined in [browser/src/components/dialog.ts:151](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L151)*</small>



##### Return Value
`HTMLElement`







<a id="browser.dialog.resize"></a>

#### resize




##### Declaration


```typescript
private function resize()
```
<small>*Defined in [browser/src/components/dialog.ts:156](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L156)*</small>








<a id="browser.dialog.shouldrenderfullscreen"></a>

#### shouldRenderFullScreen




##### Declaration


```typescript
function shouldRenderFullScreen(): boolean
```
<small>*Defined in [browser/src/components/dialog.ts:42](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L42)*</small>



##### Return Value
`boolean`







<a id="browser.dialog.stylebody"></a>

#### styleBody




##### Declaration


```typescript
private function styleBody(body: HTMLElement)
```
<small>*Defined in [browser/src/components/dialog.ts:132](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L132)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| body | `HTMLElement`   |  - |








<a id="browser.dialog.styledialog"></a>

#### styleDialog




##### Declaration


```typescript
private function styleDialog(dialog: HTMLElement)
```
<small>*Defined in [browser/src/components/dialog.ts:92](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L92)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| dialog | `HTMLElement`   |  - |










---



---

<a id="browser.iframesubprovider"></a>

##  IFrameSubprovider


<a id="browser.iframesubprovider.constructor-7"></a>
### constructor
```typescript
new IFrameSubprovider(webBaseUrl: string, networkName: string, tokenProvider: AccessTokenProvider): IFrameSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| webBaseUrl | `string`   |  - |
| networkName | `string`   |  - |
| tokenProvider | `AccessTokenProvider`   |  - |



##### Return Value
[IFrameSubprovider](#browser.iframesubprovider)





---

### Properties
<a id="browser.iframesubprovider.currentrequest"></a>

#### currentRequest
```javascript
private var currentRequest: Request
```
<small>*Defined in [browser/src/subproviders/iframe.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L16)*</small>


<a id="browser.iframesubprovider.currentrequestdialog"></a>

#### currentRequestDialog
```javascript
var currentRequestDialog: Dialog
```
<small>*Defined in [browser/src/subproviders/iframe.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L12)*</small>


<a id="browser.iframesubprovider.networkname-1"></a>

#### networkName
```javascript
private var networkName: string
```
<small>*Defined in [browser/src/subproviders/iframe.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L14)*</small>


<a id="browser.iframesubprovider.tokenprovider"></a>

#### tokenProvider
```javascript
private var tokenProvider: AccessTokenProvider
```
<small>*Defined in [browser/src/subproviders/iframe.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L15)*</small>


<a id="browser.iframesubprovider.webbaseurl"></a>

#### webBaseUrl
```javascript
private var webBaseUrl: string
```
<small>*Defined in [browser/src/subproviders/iframe.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L13)*</small>




---

### Methods
<a id="browser.iframesubprovider.handleauthorization-1"></a>

#### handleAuthorization




##### Declaration


```typescript
function handleAuthorization(payload: any, _: any, end: any)
```
<small>*Defined in [browser/src/subproviders/iframe.ts:26](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L26)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| _ | `any`   |  - |
| end | `any`   |  - |









<a id="browser.iframesubprovider.receivemessage"></a>

#### receiveMessage




##### Declaration


```typescript
function receiveMessage(event: MessageEvent)
```
<small>*Defined in [browser/src/subproviders/iframe.ts:34](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L34)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `MessageEvent`   |  - |








<a id="browser.iframesubprovider.showauthorizationmodal"></a>

#### showAuthorizationModal




##### Declaration


```typescript
private function showAuthorizationModal(element: any, payload: any, end: any)
```
<small>*Defined in [browser/src/subproviders/iframe.ts:98](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L98)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| element | `any`   |  - |
| payload | `any`   |  - |
| end | `any`   |  - |








<a id="browser.iframesubprovider.showbitskimodal"></a>

#### showBitskiModal




##### Declaration


```typescript
private function showBitskiModal(accessToken: any, payload: any, end: any)
```
<small>*Defined in [browser/src/subproviders/iframe.ts:75](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L75)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `any`   |  - |
| payload | `any`   |  - |
| end | `any`   |  - |








<a id="browser.iframesubprovider.urlformethod"></a>

#### urlForMethod




##### Declaration


```typescript
private function urlForMethod(method: string): string | undefined
```
<small>*Defined in [browser/src/subproviders/iframe.ts:64](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L64)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |  - |



##### Return Value
`string          ⎮undefined`









---


### Relationships
##### Extends
* [browser](#browser).[AuthorizationHandler](#browser.authorizationhandler)

---

<a id="browser.localdialogsubprovider"></a>

##  LocalDialogSubprovider


<a id="browser.localdialogsubprovider.constructor-8"></a>
### constructor
```typescript
new LocalDialogSubprovider(opts?: any): LocalDialogSubprovider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| opts _(Optional)_ | `any`   |  - |



##### Return Value
[LocalDialogSubprovider](#browser.localdialogsubprovider)





---

### Properties
<a id="browser.localdialogsubprovider.currentdialog"></a>

#### currentDialog
```javascript
private var currentDialog: Dialog
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L12)*</small>


<a id="browser.localdialogsubprovider.currentrequest-1"></a>

#### currentRequest
```javascript
private var currentRequest: Request
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L13)*</small>


<a id="browser.localdialogsubprovider.transactionwindow"></a>

#### transactionWindow
```javascript
private var transactionWindow: any
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L14)*</small>




---

### Methods
<a id="browser.localdialogsubprovider.createdefinition"></a>

#### createDefinition




##### Declaration


```typescript
private function createDefinition(label: any, value: any): HTMLDListElement
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:47](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L47)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| label | `any`   |  - |
| value | `any`   |  - |



##### Return Value
`HTMLDListElement`







<a id="browser.localdialogsubprovider.createtransactionwindow"></a>

#### createTransactionWindow




##### Declaration


```typescript
private function createTransactionWindow(payload: any, submitHandler: any, cancelHandler: any): any
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:70](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L70)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| submitHandler | `any`   |  - |
| cancelHandler | `any`   |  - |



##### Return Value
`any`







<a id="browser.localdialogsubprovider.displaymodal"></a>

#### displayModal




##### Declaration


```typescript
private function displayModal(element: any, payload: any, end: any)
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:151](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L151)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| element | `any`   |  - |
| payload | `any`   |  - |
| end | `any`   |  - |








<a id="browser.localdialogsubprovider.handleauthorization-2"></a>

#### handleAuthorization




##### Declaration


```typescript
function handleAuthorization(payload: any, next: any, end: any)
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:20](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L20)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |









<a id="browser.localdialogsubprovider.showtransactionmodal"></a>

#### showTransactionModal




##### Declaration


```typescript
private function showTransactionModal(payload: any, next: any, end: any)
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:24](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L24)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |










---


### Relationships
##### Extends
* [browser](#browser).[AuthorizationHandler](#browser.authorizationhandler)

---

<a id="browser.openidauthprovider"></a>

##  OpenidAuthProvider


<a id="browser.openidauthprovider.constructor-9"></a>
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
[OpenidAuthProvider](#browser.openidauthprovider)





---

### Properties
<a id="browser.openidauthprovider.timeout"></a>

#### timeout
```javascript
var timeout: number = 5000
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:8](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L8)*</small>


<a id="browser.openidauthprovider.usermanager"></a>

#### userManager
```javascript
var userManager: UserManager
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:10](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L10)*</small>




---

### Methods
<a id="browser.openidauthprovider.getaccesstoken"></a>

#### getAccessToken




##### Declaration


```typescript
function getAccessToken(): Promise<string>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:38](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L38)*</small>



##### Return Value
`Promise<string>`







<a id="browser.openidauthprovider.getuser-1"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:79](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L79)*</small>



##### Return Value
`Promise<User>`







<a id="browser.openidauthprovider.getuserorsignin-1"></a>

#### getUserOrSignIn




##### Declaration


```typescript
function getUserOrSignIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:97](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L97)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#browser.oauthproviderintegrationtype)   |  - |



##### Return Value
`Promise<User>`







<a id="browser.openidauthprovider.requestsignout"></a>

#### requestSignOut




##### Declaration


```typescript
private function requestSignOut(accessToken: string): Promise<any>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:145](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L145)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| accessToken | `string`   |  - |



##### Return Value
`Promise<any>`







<a id="browser.openidauthprovider.sendrequest"></a>

#### sendRequest




##### Declaration


```typescript
private function sendRequest(request: any): Promise<any>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:155](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L155)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| request | `any`   |  - |



##### Return Value
`Promise<any>`







<a id="browser.openidauthprovider.signin-2"></a>

#### signIn




##### Declaration


```typescript
function signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:48](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L48)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#browser.oauthproviderintegrationtype)   |  - |



##### Return Value
`Promise<User>`







<a id="browser.openidauthprovider.signincallback-1"></a>

#### signInCallback




##### Declaration


```typescript
function signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType, url?: undefined | string): Promise<User>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:108](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L108)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#browser.oauthproviderintegrationtype)   |  - |
| url _(Optional)_ | `undefined          ⎮string`   |  - |



##### Return Value
`Promise<User>`







<a id="browser.openidauthprovider.signout-1"></a>

#### signOut




##### Declaration


```typescript
function signOut(): Promise<any>
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:130](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L130)*</small>



##### Return Value
`Promise<any>`









---


### Relationships
##### Implements
* AccessTokenProvider
* [browser](#browser).[AuthProvider](#browser.authprovider-4)

---


<a id="browser.authprovider-4"></a>

####  AuthProvider





### Methods
<a id="browser.authprovider-4.getuser-2"></a>

#### getUser




##### Declaration


```typescript
function getUser(): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:12](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L12)*</small>



##### Return Value
`Promise<User>`







<a id="browser.authprovider-4.getuserorsignin-2"></a>

#### getUserOrSignIn




##### Declaration


```typescript
function getUserOrSignIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:15](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L15)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#browser.oauthproviderintegrationtype)   |  - |



##### Return Value
`Promise<User>`







<a id="browser.authprovider-4.signin-3"></a>

#### signIn




##### Declaration


```typescript
function signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:11](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L11)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#browser.oauthproviderintegrationtype)   |  - |



##### Return Value
`Promise<User>`







<a id="browser.authprovider-4.signincallback-2"></a>

#### signInCallback




##### Declaration


```typescript
function signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType, url?: undefined | string): Promise<User>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:13](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L13)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authenticationIntegrationType _(Optional)_ | [OAuthProviderIntegrationType](#browser.oauthproviderintegrationtype)   |  - |
| url _(Optional)_ | `undefined          ⎮string`   |  - |



##### Return Value
`Promise<User>`







<a id="browser.authprovider-4.signout-2"></a>

#### signOut




##### Declaration


```typescript
function signOut(): Promise<any>
```
<small>*Defined in [browser/src/auth/auth-provider.ts:14](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/auth-provider.ts#L14)*</small>



##### Return Value
`Promise<any>`










<a id="browser.request"></a>

####  Request


```javascript
var Request: [any, any]
```
<small>*Defined in [browser/src/subproviders/iframe.ts:6](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/iframe.ts#L6)*</small>





<a id="browser.request-1"></a>

####  Request


```javascript
var Request: [any, any]
```
<small>*Defined in [browser/src/subproviders/local-dialog.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/local-dialog.ts#L5)*</small>






<a id="browser.bitski_user_api_host"></a>

#### «Const» BITSKI_USER_API_HOST


```javascript
var BITSKI_USER_API_HOST: "https://www.bitski.com/v1" = "https://www.bitski.com/v1"
```
<small>*Defined in [browser/src/auth/openid-auth-provider.ts:5](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/auth/openid-auth-provider.ts#L5)*</small>





<a id="browser.cached_methods"></a>

#### «Const» CACHED_METHODS


```javascript
var CACHED_METHODS: string[] =  ['eth_accounts']
```
<small>*Defined in [browser/src/subproviders/authenticated-cache.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authenticated-cache.ts#L4)*</small>





<a id="browser.default_authorized_methods"></a>

#### «Const» DEFAULT_AUTHORIZED_METHODS


```javascript
var DEFAULT_AUTHORIZED_METHODS: string[] =  ['eth_sendTransaction', 'eth_sign', 'eth_signTypedData', 'personal_sign']
```
<small>*Defined in [browser/src/subproviders/authorization-handler.ts:4](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/subproviders/authorization-handler.ts#L4)*</small>





<a id="browser.default_dialog_height"></a>

#### «Const» DEFAULT_DIALOG_HEIGHT


```javascript
var DEFAULT_DIALOG_HEIGHT: 420 = 420
```
<small>*Defined in [browser/src/components/dialog.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L2)*</small>





<a id="browser.default_dialog_width"></a>

#### «Const» DEFAULT_DIALOG_WIDTH


```javascript
var DEFAULT_DIALOG_WIDTH: 490 = 490
```
<small>*Defined in [browser/src/components/dialog.ts:1](https://github.com/BitskiCo/bitski-js/blob/master/packages/browser/src/components/dialog.ts#L1)*</small>







---

<a id="provider"></a>


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
| accessTokenProvider | [AccessTokenProvider](#provider.accesstokenprovider-1)  | - |   - |
| defaultHeaders | `object`  |  {} |   - |



##### Return Value
[AuthenticatedFetchSubprovider](#provider.authenticatedfetchsubprovider)





---

### Properties
<a id="provider.authenticatedfetchsubprovider.accesstokenprovider"></a>

#### accessTokenProvider
```javascript
private var accessTokenProvider: AccessTokenProvider
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:31](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L31)*</small>


<a id="provider.authenticatedfetchsubprovider.defaultheaders"></a>

#### defaultHeaders
```javascript
private var defaultHeaders: object
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:32](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L32)*</small>




---

### Methods
<a id="provider.authenticatedfetchsubprovider.generateparameters"></a>

#### generateParameters




##### Declaration


```typescript
private function generateParameters(payload: any, accessToken?: undefined | string): object
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:66](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L66)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| accessToken _(Optional)_ | `undefined          ⎮string`   |  - |



##### Return Value
`object`







<a id="provider.authenticatedfetchsubprovider.handleauthenticatedrequest"></a>

#### handleAuthenticatedRequest




##### Declaration


```typescript
function handleAuthenticatedRequest(payload: any, next: any, end: any)
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:48](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L48)*</small>



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
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:40](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L40)*</small>



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
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:57](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L57)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |








<a id="provider.authenticatedfetchsubprovider.requiresauthentication"></a>

#### requiresAuthentication




##### Declaration


```typescript
private function requiresAuthentication(payload: any): boolean
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:62](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L62)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `any`   |  - |



##### Return Value
`boolean`







<a id="provider.authenticatedfetchsubprovider.sendrequest"></a>

#### sendRequest




##### Declaration


```typescript
private function sendRequest(parameters: object, next: any, end: any)
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:97](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L97)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| parameters | `object`   |  - |
| next | `any`   |  - |
| end | `any`   |  - |










---


### Relationships
##### Extends
* any

---

<a id="provider.bitskiengine"></a>

##  BitskiEngine


<a id="provider.bitskiengine.constructor-2"></a>
### constructor
```typescript
new BitskiEngine(options: any): BitskiEngine
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| options | `any`   |  - |



##### Return Value
[BitskiEngine](#provider.bitskiengine)





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


<a id="provider.accesstokenprovider-1"></a>

####  AccessTokenProvider





### Methods
<a id="provider.accesstokenprovider-1.getaccesstoken"></a>

#### getAccessToken




##### Declaration


```typescript
function getAccessToken(): Promise<string>
```
<small>*Defined in [provider/src/auth/access-token-provider.ts:2](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/auth/access-token-provider.ts#L2)*</small>



##### Return Value
`Promise<string>`










<a id="provider.authenticated_methods"></a>

#### «Const» AUTHENTICATED_METHODS


```javascript
var AUTHENTICATED_METHODS: string[] =  [
    'eth_accounts',
    'eth_sendTransaction',
    'eth_sign',
]
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:16](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L16)*</small>





<a id="provider.retriable_errors"></a>

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
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:7](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L7)*</small>






### Functions
<a id="provider.iserrorretriable"></a>

###  isErrorRetriable




##### Declaration


```typescript
function isErrorRetriable(err: any): boolean
```
<small>*Defined in [provider/src/subproviders/authenticated-fetch.ts:22](https://github.com/BitskiCo/bitski-js/blob/master/packages/provider/src/subproviders/authenticated-fetch.ts#L22)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| err | `any`   |  - |



##### Return Value
`boolean`











