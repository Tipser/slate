#Tipser SDK

Tipser SDK is a modular version of the Tipser script that provides only the core functionality necessary for integration with Tipser, specifically built for customers who have their own development resources and plan to build their shopping experience on their own.
## Installation

###Using npm or yarn
You can add the Tipser SDK to your project by adding it through npm or yarn.

**Yarn:** 

`yarn add @tipser/tipser-sdk`

**NPM:**

`npm install --save @tipser/tipser-sdk`


[Package instructions](https://www.npmjs.com/package/@tipser/tipser-sdk)

###Using a script tag on your page

> Add a script to your page:

```javascript
<script src="https://tipser.com/widget/sdk.js"></script>
```

> You may also want to use the test version of the Tipser SDK (to simulate the payment without actual money transfer)

```javascript
<script src="https://t3-stage.tipser.com/widget/sdk.js"></script>
```

You need to add a script to your HTML source.

<aside class="success">
Congratulations! Now Tipser is part of your website
</aside>

##Initialization

To initialize you need to create a tipser const.

```typescript
const tipser = TipserSDK(posId: string, options: TipserSdkConfig): TipserSDKInstance;
```
*Arguments:*

**posId** (string) - id of shop's account in Tipser (required)

**options** (object) - an object of options (optional). The same options are supported as for Tipser Widget ([docs](#tipser-widget)), except of `posId` option that is provided as a first argument here

*Returns:*

Initialized Tipser SDK object that can be used to perform API calls further in this document.

*Example:*

```javascript
const tipser = TipserSDK("59e86b79b8f3f60a94ecd26a", {primaryColor: "#FFFF00"});
```
The example connects Tipser SDK with Tipser shop and sets primary color to yellow.

For configuration options see [configuration](#configuration-options) chapter of our documentation.
