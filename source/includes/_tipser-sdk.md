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

```javascript
const tipser = TipserSDK(posId:string, options: object): TipserSDK;
```
*Arguments:*

**posId** (string) - id of shop's account in Tipser (required)

**options** (object) - an object of options (optional). The same options are supported as for Tipser Widget ([docs](#tipser-widget)), except of `posId` option that is provided as a first argument here

*Returns:*

Initialized Tipser SDK object that can be used to perform API calls further in this document.

*Example:*

```javascript
var tipser = TipserSDK("59e86b79b8f3f60a94ecd26a", {primaryColor: "yellow"});
```
The example connects Tipser SDK with Tipser shop and sets primary color to yellow.

##Customizing Tipser Environment

> Example:

```javascript
var tipser = TipserSDK("59e86b79b8f3f60a94ecd26a", {env: "stage"});
```

By default, Tipser SDK connects to production Tipser environment. Yet if testing environment is preferred (e.g. in order to do test purchase), then it can be customized with env parameter in TipserSDK options, which accepts the following values:

**prod** or production

**stage** or staging

**dev** or development

##Parameters for dialog customization
Sometimes Tipser dialogue styling and functionality needs to be customized. It is possible with modalUi parameters group.

> Complete example of dialog customizations:

```javascript
    var tipserOptions = {
       modalUi: {
          hideSearchIcon: true,
          hideFavouritesIcon: true,
          hideCartIcon: false,
          hideMoreIcon: true,
          hideSimilarProducts: false,
          useCustomCss: true
       }
        });
```

###Hiding icons on menu bar

The following parameters under modalUi can be used to selectively hide tipser icons on the dialog menu bar: 

`hideSearchIcon` <br> 
`hideFavouritesIcon` <br>
`hideCartIcon` <br>
`hideMoreIcon` <br>

[![](widget1.png)](/images/widget1.png)

###Hiding Similar Products Module

Similarly, `hideSimilarProducts` parameter, if set to **true**, can be used to hide Similar Products Module on product page

[![](widget2.png)](/images/widget2.png)

###Custom CSS

If there is a need to use custom css stylesheet, it may be activated in two steps:

1. set `useCustomCss` parameter to **true**
    
2. Send the custom css stylesheet to Tipser administrator in order for it to be uploaded to your account.