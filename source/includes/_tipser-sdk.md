#Tipser SDK

<aside class="warning">Please note, that Tipser SDK is deprecated. The following documentation is for users who are currently in transition to Tipser Elements. If you need help with choosing the right Tipser solution to fit your technology stack, please contact us at <a href="mailto:tech@tipser.com">tech@tipser.com</a></aside>

Tipser SDK is a modular version of the Tipser script that provides only the core functionality necessary for integration with Tipser, specifically built for customers who have their own development resources and plan to build their shopping experience on their own.
## Installation

###Using npm or yarn
You can add the Tipser SDK to your project by adding it through npm or yarn.

**Yarn:** 

`yarn add @tipser/tipser-sdk`

**NPM:**

`npm install --save @tipser/tipser-sdk`


<a href="https://www.npmjs.com/package/@tipser/tipser-sdk" target="_blank">Package instructions</a>

###Using a script tag in your page HTML source

> Add a script to your page:

```html
<script src="https://cdn.tipser.com/tipser-sdk/latest.js"></script>
```

<aside class="success">
Congratulations! Now Tipser is part of your website
</aside>

##Initialization

To initialize you need to create an instance of Tipser SDK:

```typescript
const tipser = TipserSDK(posId: string, options: TipserSdkConfig): TipserSDKInstance;
```
*Arguments:*

`posId` (string) - id of shop's account in Tipser (required)

`options` (object) - an object of options (optional).

*Returns:*

Initialized Tipser SDK object that can be used to perform API calls further in this document.

*Example:*

```javascript
const tipser = TipserSDK("59e86b79b8f3f60a94ecd26a", {primaryColor: "#FFFF00"});
```
The example starts Tipser SDK instance in which Tipser shop has the primary color set to yellow.

For configuration options see the [configuration](#configuration-options) chapter of our documentation.

##Customization of Tipser environment

By default, Tipser SDK connects to the production Tipser environment. Yet, if the testing environment is preferred (e.g. in order to do **test purchase**), then it can be customized with env parameter in TipserSDK options, which accepts the following values:

`prod` or production

`stage` or staging

`dev` or development


*Example:*

```javascript
var tipser = TipserSDK("5aa12d639d25800ff0e56fc5", {env: "stage"});
```


##The format of product ids

`productId`: string passed in product-related API calls. It consists of the **masterProductId** and, if the product has variants, the **variantId**, concatenated with an **underscore "_"**. Then the **productId** should look like this: 

```
<masterProductId>_<variantId>
```

##Pos data

A configuration option `posData`, `setPosData()` function and the `options` parameter in `addToCart()` and `openDirectToCheckoutDialog()` can be used to configure publisher's data to be associated with Tipser transaction. 
Please refer to [Publisher data](#publisher-data) section for a complete explanation.

##Adding product to cart

```javascript
addToCart(productId: string, options: {posData?: string}): Promise<void>
```

Adds a product with a given productId (specific to Tipser) to a cart.

`productId`: string, with the stucture described [here](#the-script-api).

`options`: currently the only supported option is [posData](#publisher-data), which is a string to be attached to a product order.

*Returns*:

A Promise that resolves to no value but gives a chance to check if the request was successful or not (using `.then()/.catch()` semantics)

*Example*:

```javascript
tipser.addToCart("5a98be67c0bdfb0c30865609_5a98be67c0bdfb0c30866509")
  .then(() => console.log("successfuly added to cart"))
  .catch((err) => console.log("failed to add to cart", err))
```

##Opening product dialog

```javascript
openProductDialog(productId: string): void
```

Opens Tipser product dialog for a product with given tipser product id.

*Example*:

```javascript
tipser.openProductDialog("5a16534aa5af9b3af450c33d_5a16537da5af9b3af450c33f");
```


##Opening purchase dialog

```javascript
openPurchaseDialog(): void
```

Opens Tipser purchase (checkout) dialog with products that are currently in the shopping cart.


##Getting cart size:

```javascript
getCurrentCartSize(): Promise<number>;
```

Returns current Tipser cart size (including items added to cart from other shops). That value can change over time, so it may be necessary to call it repeatedly (e.g. on every page load or polling with a certain interval).

*Returns*:

A Promise returning current Tipser cart size.

*Example:*

```javascript
tipser.getCurrentCartSize().then((cartSize) => {
   console.log("Tipser cart size is: ", cartSize);
   useCartSize(cartSize);
});
```


##Direct to Checkout

By using the method `Direct To Checkout`, you add a product to the cart, at the same time as you open the checkout dialog window.

```javascript
 openDirectToCheckoutDialog(productId: string, options: {posData?: string}): void
 ```
 
Adds the product with a given id to the shopping cart and then opens Tipser purchase (checkout) dialog with products that are currently in the shopping cart (including the newly added product).

`productId`: string, with the stucture described [here](#the-script-api).


`options`: currently the only supported option is [posData](#publisher-data), which is a string to be attached to a product order.

##Opening search dialog

```javascript
openSearchDialog(searchTerm: string): void
```

Opens Tipser product search dialog with using a given search term.



##Opening collection dialog
```javascript
openCollectionDialog(shopName: string, collectionName: string): void
```

Opens Tipser collection browsing dialog for a given Tipser shop name and collection name.



##Closing Tipser dialog

```javascript
closeDialog(): void
```

Closes the active Tipser dialog.


##Listening to analytics events

```javascript
addTrackEventListener(listener: (event) => void)
removeTrackEventListener(listener: (event) => void)
```

The listener callback is called every time payment analytics event (like product dialog opened or product added to cart) is fired by Tipser code.

##Listening to dialog closed event

```javascript
addDialogClosedListener(listener: (event) => void)
removeDialogClosedListener(listener: (event) => void)
```
  
The listener callback is called when every type of Tipser Dialog is closed (including "Thank You page" dialog - in this case, both dialogClosed and thankYouPageClosed listeners will be called).
  
##Listening to thank you page closed event
  
  
  ```javascript
addThankYouPageClosedListener(listener: (orderId: number) => void)
removeThankYouPageClosedListener(listener: (orderId: number) => void)
```
  
  The listener callback is called when payment confirmation dialog (thank you page) is closed by the user. orderId of the order is passed as a callback argument.
  
##Complete Tipser SDK example
  
```javascript
var tipser = TipserSDK("5aa12d639d25800ff0e56fc5", {
   primaryColor: "yellow",
   modalUi: {
      hideSearchIcon: true,
      hideFavouritesIcon: true,
      hideCartIcon: true,
      hideMoreIcon: true,
      useCustomCss: true
   }
});
tipser.getCurrentCartSize().then((cartSize) => {
   console.log("cartSize = ", cartSize);
});
tipser.openProductDialog("5a16534aa5af9b3af450c33d_5a16537da5af9b3af450c33f");

tipser.addTrackEventListener(function(evt) {
    console.log("analytics event: ", evt);
});
tipser.addThankYouPageClosedListener(function() {
    console.log("thank you page closed event");
});

setTimeout(() => {
   tipser.closeDialog();
}, 5000);
```
  
  The code snippet above initializes tipser SDK with custom primary color and some modal customizations, gets and prints the current cart size, opens a tipser dialog and then closes it after 5 seconds.
