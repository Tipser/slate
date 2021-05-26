#Components

## initialize()

The `initialize` function is used to configure and bootstrap Tipser Script. Until it's called, no HTML replacements will be performed. It accepts two arguments:

```ts
tipserScript.initialize(posId: string, config?: object)
```

- `posId` (**required**) - a unique Tipser publisher identifier. Must be specified in order to show your personalized store, show discounted product prices according to your current campaigns and - most important of all - grant you commissions for every purchase on your site! If you are not sure where to get it from, contact your account manager.
- `config` - allows you to specify how Tipser Script will look and behave on your site. See the [Configuration](#configuration) section that describes most common configuration options you need to know, while the complete index of all the supported configuration options can be found further in the <a href="https://developers.tipser.com/rest-api" target="_blank">API reference</a>.

<aside class="notice">
Please, make sure, that <code>tipserScript.initialize()</code> function is called only once, after the page is loaded. If you need to use the Tipser Script instance in several places in your code, feel free
to assign it to a variable (even a global one, if needed) and refer to it further in the code.
</aside>

For example:

```js
window.tipserScriptInstance = tipserScript.initialize(YOUR_POS_ID);
```

And then at some other place in the code:

```js
const onButtonClicked = () => {
    window.tipserScriptInstance.goToProduct(productId);
}
```

In most cases, however, initializing Tipser Script in-place (without assigning it to a variable) will be just enough!

---

## Store

The store component, activated by `data-tipser-store` tag, is the best way to present a group of collections. We recommend placing it on a dedicated page where sufficient space is available but the store component will try to adapt to the available space.

Before you insert the store on your page, make sure there is at least one collection created in your store, otherwise no content will be rendered. The store collections can be created using the <a href="https://app.tipser.com/" target="_blank">app.tipser.com</a>.

Insert the following HTML snippet in the place where you want the store to be rendered.

```html
<div data-tipser-store></div>
```

<aside class="notify">The <code>Store</code> element is best inserted as a top-level element on a separate page and should take the full content area for the optimal shopping experience.</aside>

### Store menu display

You can choose between two ways of displaying the store menu on the mobile screens. The default one is a native dropdown. If you prefer to use the inline menu instead (the same one as is displayed on other screen sizes), add `data-tipser-inline-mobile-menu` attribute to the HTML snippet:

```html
<div data-tipser-store data-tipser-inline-mobile-menu></div>
```

### Updating the browser's URL

By default, the store component saves the active collection in the browser's URL hash part (everything after the `#` symbol in the URL). It allows the users to bookmark the store page or share the URL with others (the same collection will be active in the store when opening the link). To opt-out of this behaviour (e.g. because it interferes with the routing system of your site), add the `data-tipser-disable-deep-linking` attribute.

```html
<div data-tipser-store data-tipser-disable-deep-linking></div>
```

---

## Product

In order to insert a `Product` Element in your content, insert the following code snippet in your content:

```html
<div data-tipser-product-listing data-tipser-product-id="5ba2334a781baa0001ccdf61"></div>
```

Elements with attribute `data-tipser-product-listing` will be replaced with the `product` element. Product ID is taken from the value of the `data-tipser-product-id` attribute. The code snippet for a certain product can be generated in <a href="https://app.tipser.com/" target="_blank">app.tipser.com</a>.
It will render a full inline product component (with product details and variant selection).

[![](full-product.png)](/images/full-product.png)

---

To display a product tile with just a basic product info (image, title and price), use the `data-tipser-product-tile` attribute instead.

```html
<div
  data-tipser-product-tile
  data-tipser-product-id="57233dac89862012f8ec1001"
></div>
```

[![](compact-product.png)](/images/compact-product.png)

To display a list of products (rendered as small product tiles), add `data-tipser-pids` attribute to the snippet together with the `productId`s of the products you would like to display.

```html
<div
  data-tipser-product-list data-tipser-product-ids="5a8ac10d9d2580326ca4cf47,5a9735d99d25801620c3d3fc,5a8af4909d2580132ca4c1f9"
></div>
```

[![](product-list.png)](/images/product-list.png)

---

## Modular Product

A modular product is a product that can be constructed from lower level components.

Below is an example HTML snippet that renders a modular product with an image, title, price and variant selector and buy button.

```html
<div
  data-tipser-modular-product-id="5bc6e1c7df2ac60001158814"
>
  <div data-tipser-modular-product-image></div>
  <div data-tipser-modular-product-title></div>
  <div data-tipser-modular-product-price></div>
  <div data-tipser-modular-product-variant-selector></div>
  <div data-tipser-modular-product-buy-button></div>
</div>
```

The complete list of HTML attributes related to modular product:

- data-tipser-modular-product-id="..." - the top level element providing the context (all the other elements need to be nested below it)
- data-tipser-modular-product-title
- data-tipser-modular-product-buy-button
- data-tipser-modular-product-price
- data-tipser-modular-product-image
- data-tipser-modular-product-thumbnails
- data-tipser-modular-product-availability-info
- data-tipser-modular-product-variant-selector
- data-tipser-modular-product-description
- data-tipser-modular-product-similar-products
- data-tipser-modular-product-style-with-products
- data-tipser-modular-product-color-relations

### Product Image

Displays the full-size version of the currently selected product image.

<aside class="notice">
The tag with <code>data-tipser-modular-product-image</code> attribute must have fixed width and height specified.
</aside>

```html
<div
  data-tipser-modular-product-id="5bc6e1c7df2ac60001158814"
>
  <div data-tipser-modular-product-image style=“width:400px,height:500px”></div>
</div>
```

| Attribute                                                        | Type                                                                                                                           | Description                                                 | Default |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | ------- |
| <code style="font-size: 10px">data-tipser-enable-swipe</code>    | <a href="https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes" target="_blank">HTML boolean</a> | enables swipe functionality (recommended for touch devices) | false   |
| <code style="font-size: 10px">data-tipser-enable-arrows</code>   | <a href="https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes" target="_blank">HTML boolean</a> | show left and right arrows for changing images              | false   |
| <code style="font-size: 10px">data-tipser-enable-dots</code>     | <a href="https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes" target="_blank">HTML boolean</a> | show slider bullet dots                                     | false   |
| <code style="font-size: 10px">data-tipser-class-name</code>      | string                                                                                                                         | custom CSS class name to apply                              | none    |

### Product Thumbnails

Displays the product thumbnails.

<aside class="notice">
The tag with <code>data-tipser-modular-product-thumbnails</code> attribute must have fixed width and height specified.
</aside>

```html
<div
  data-tipser-modular-product-id="5bc6e1c7df2ac60001158814"
>
  <div data-tipser-modular-product-thumbnails style=“width:400px,height:500px”></div>
</div>
```

| Attribute                                                   | Type   | Possible values                | Description                                         | Default      |
| ----------------------------------------------------------- | ------ | ------------------------------ | --------------------------------------------------- | ------------ |
| <code style="font-size: 10px">data-tipser-image-fit</code>  | string | 'contain' &#124; 'cover'       | changes the background-size property                | 'cover'      |
| <code style="font-size: 10px">data-tipser-direction</code>  | string | 'vertical' &#124; 'horizontal' | changes the orientation of the thumbnails container | 'horizontal' |
| <code style="font-size: 10px">data-tipser-class-name</code> | string |                                | custom CSS class name to apply                      | none         |

## Product page

A full-sized product component to be used on a dedicated page.

```html
<div 
    data-tipser-product-page
    data-tipser-product-id="5bc6e1c7df2ac60001158814">
</div>
```

Tags with attribute `data-tipser-product-page` will be replaced with the product page element. The value of the `data-tipser-product-id` attribute for a certain product can obtained from <a href="https://app.tipser.com/" target="_blank">app.tipser.com</a>.

_Example:_

[![](modular-product/modular_product_default.png)](/images/modular-product/modular_product_default.png)

<aside class="notice">
This component renders the same product view that is displayed inside the product modal.
</aside>

---

## Collection

`Collection` is a group of simple product tiles. Clicking on any title displays a product dialog with more product details and add to cart button. Products displayed in a collection are defined in <a href="https://app.tipser.com/" target="_blank">app.tipser.com</a>.

```html
<div data-tipser-collection
    data-tipser-collection-id="5b2788909d25801adcb23f4f">
</div>
```

Tags with attribute `data-tipser-cid` will be replaced with `collection` component of given id (specified by the `data-tipser-collection-id` attribute).

[![](collection.png)](/images/collection.png)

To make the collection items smaller / larger use the `data-tipser-img-size` attribute with values `small` for smaller and `large` for lager product tiles. The default value for `data-tipser-img-size` attribute is `medium`. When changing the value to `small` you get slightly smaller product-cards:

[![](collection-imgSize.png)](/images/collection-imgSize.png)

```html
<div
  data-tipser-collection
  data-tipser-collection-id="5b2788909d25801adcb23f4f"
  data-tipser-img-size="small"
></div>
```

If you'd like the collection of more than several products to take less space, you can display it as one-row only carousel component. To do that, please use `data-tipser-carousel` attribute.

[![](collection-carousel.png)](/images/colltion-carousel.png)

> <a href="https://codepen.io/tipser-tech/pen/oNZbWxX" target="_blank">Open this snippet on Code Pen</a>

```html
<div
  data-tipser-collection
  data-tipser-collection-id="5b2788909d25801adcb23f4f"
  data-tipser-carousel
></div>
```

---

## Cart icon

To keep the user informed about the state of their shopping cart and make it possible to finalize the checkout process at any time, you can attach a live shopping cart icon on your page.

```html
<div data-tipser-cart-icon></div>
```

By default the cart icon position is static. One common use case that we know about is "sticky" cart icon (that stays on the screen when scrolling), you can use the following CSS style to get this behavior:

```css
.cart-icon {
  position: fixed;
  right: 0;
  top: 121px;
  background: #fff;
  padding: 10px;
  box-shadow: -2px 2px 7px rgba(0, 0, 0, 0.3);
  z-index: 10;
}
```

---
## Cart page

To display the contents of the shopping cart you can use the cart page component.

```html
<div data-tipser-cart-page></div>
```

<aside class="notice">To provide a path to your custom cart page, please define the <a href="#custom-urls">cartUrl</a> key in the <code>customUrls</code> config option.</aside>

<aside class="info">
This component takes up a large part of the page, so it is recommended to place it on a dedicated subpage.
</aside>

---

## Checkout

Then use this HTML tag to render checkout on your page.

```html
<div data-tipser-checkout-page></div>
```

<aside class="notice">To provide a path to your custom checkout page, please define the <a href="#custom-urls">checkoutUrl and checkoutConfirmation</a> key in the <code>customUrls</code> config option.</aside>

<aside class="info">
This component takes up a large part of the page, so it is recommended to place it on a dedicated subpage.
</aside>

---

## Modular Checkout

If you need more flexibility, you can use `data-tipser-modular-checkout` tag. The children of this element will define a set of checkout modules to be displayed. For example, a children element with `data-tipser-modular-checkout-cart-products` attribute (nested under the master element with `data-tipser-modular-checkout` attribute) will render the list of items that
are being purchased by the user.

A working example of the checkout view consisting of: items list, delivery address form and the payment form:

```html
<div data-tipser-modular-checkout>
  <div data-tipser-modular-checkout-product-list></div>
  <div data-tipser-modular-checkout-customer-address-delivery></div>
  <div data-tipser-modular-checkout-payment></div>
</div>
```

Following modules can be nested within `<div data-tipser-modular-checkout></div>`:

### Checkout cart products

This section displays a list of items in the current checkout.

```html
<div data-tipser-modular-checkout-product-list></div>
```

### Checkout customer delivery address form

This form accepts user's delivery address details.

<aside class="info">This component is only available for integrations using Stripe as the payment provider. In case of Klarna, <code>data-tipser-modular-checkout-payment</code> contains its own fields for entering delivery and billing address</aside>

```html
<div data-tipser-modular-checkout-customer-address-delivery></div>
```

Attributes:

| name                                                                                  | description                                                                          | type                                                                                                                           | values             | default value |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ------------- |
| <code style="font-size: 10px">data-tipser-hide-submit-button</code>                   | hides the "submit" button that collapses the form after filling it with correct data | <a href="https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes" target="_blank">HTML boolean</a> |                    |
| <code style="font-size: 10px">data-tipser-submit-behaviour</code>                     | the behaviour of the form after submitting it                                        | string                                                                                                                         | 'collapse', 'none' | 'collapse'    |
| <code style="font-size: 10px">data-tipser-hide-use-as-billing-address-checkbox</code> | hides the checkbox allowing to copy delivery address as billing address              | <a href="https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes" target="_blank">HTML boolean</a> |                    |

### Checkout Customer Billing Address form

This form accepts user's billing address details.

<aside class="info">This component is only available for integrations using Stripe as the payment provider. In case of Klarna, <code>data-tipser-modular-checkout-payment</code> contains its own fields for entering delivery and billing address</aside>

```html
<div data-tipser-modular-checkout-customer-address-billing></div>
```

Attributes:

| name                                                                | description                                                                          | type                                                                                                                           | values                         | default value |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ------------- |
| <code style="font-size: 10px">data-tipser-hide-submit-button</code> | hides the "submit" button that collapses the form after filling it with correct data | <a href="https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes" target="_blank">HTML boolean</a> |                                |
| <code style="font-size: 10px">data-tipser-submit-behavior</code>    | the behavior of the form after submitting it                                         | string                                                                                                                         | 'collapse', 'none'             | 'collapse'    |
| <code style="font-size: 10px">data-tipser-depends-on</code>         | lets you render the component depending on the delivery form being valid             | string                                                                                                                         | 'none', 'validDeliveryAddress' | 'none'        |

### Checkout summary

A summary of the total costs resulting from the checkout (total cost, shipping cost, taxes, discounts, etc).

```html
<div data-tipser-modular-checkout-summary></div>
```

### Checkout payment

A payment section, accepting user's payment input (e.g. credit card number). In case of Klarna integrations, this component will additionally contain delivery and billing address forms.

```html
<div data-tipser-modular-checkout-payment></div>
```

Attributes:

| name                                                             | description                                                              | type                                                                                                                           | values                         | default value |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ------------- |
| <code style="font-size: 10px">data-tipser-hide-pay-button</code> | hides the "pay" button in Stripe payment provider form                   | <a href="https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes" target="_blank">HTML boolean</a> |                                |
| <code style="font-size: 10px">data-tipser-depends-on</code>      | lets you render the component depending on the delivery form being valid | string                                                                                                                         | 'none', 'validDeliveryAddress' | 'none'        |

### Checkout promotion code

An element for entering promotion codes corresponding to Tipser campaigns (please contact your KAM to define one).

```html
<div data-tipser-modular-checkout-promo-code></div>
```

### Order Confirmation Page

A confirmation page displaying a summary of the completed order.

```html
<div data-tipser-modular-checkout-order-confirmation></div>
```

### Checkout Order Processing

A loading animation for checkout processing.

```html
<div data-tipser-modular-checkout-order-processing></div>
```

### Checkout Legal Terms

A text explaining legal terms of the purchase.

```html
<div data-tipser-modular-checkout-legal></div>
```

---

## Versioning

Tipser Script follows <a href="https://semver.org/" target="_blank">Semantic Versioning</a>. This means that an increase in the major number in our version indicates potential <b>breaking changes</b>. Please be aware of that! For the react version, it is recommended to auto-update to the latest version with the same major number (see the caret (^) character in `package.json` file described <a href="https://stackoverflow.com/a/22345808" target="_blank">here</a>).

<aside class="warning">Be aware, that <code>https://cdn.tipser.com/tipser-script/v3/tipser-script.min.js</code> distribution of Tipser Script is always using to the most recent version of the code. To avoid that, you can fix your implementation to the specific version of Tipser Script, e.g. by using URL like <code>https://cdn.tipser.com/tipser-script/v3.0.5/tipser-script.min.js</code></aside>

## Imperative script functions

In case you need to open Tipser dialogs from the code or perform operations like adding a Tipser product to cart, we provide a set of JavaScript functions that serve that purpose.

<aside class="info">Typical use case for calling the actions described here is when you want to build your own implementation of some of the components, e.g. the product tile component or the cart icon component.</aside>

All the below functions are accessible from the Tipser Script instance:

```js
const tipserScriptInstance = tipserScript.initialize(posId, options);
tipserScriptInstance.goToProduct(productId);
```

### goToProduct() function

```js
tipserScriptInstance.goToProduct(productId);
```

Opens the product modal dialog for a product with a given Tipser product id. Alternatively, redirects to the URL defined in `customUrls.baseProductUrl` configuration option if specified.

### goToCheckout() function

```js
tipserScriptInstance.goToCheckout();
```

Opens the checkout modal dialog. Alternatively, redirects to the URL defined in `customUrls.checkoutUrl` configuration option if specified.

### addToCart(productId) function

```js
tipserScriptInstance.addToCart(productId).then(() => {
 console.log("adding to cart successful");
}).catch((e) => {
 console.log("adding to cart failed", e)
});
```

Adds to cart a product with a given Tipser product id. Returns a promise that will succeed or reject depending on the status of that operation.

### removeFromCart(productId) function

```js
tipserScriptInstance.removeFromCart(productId).then(() => {
    console.log("removing from cart successful");
}).catch((e) => {
    console.log("removing from cart failed", e)
});
```

Adds to cart a product with a given Tipser product id. Returns a promise that will succeed or reject depending on the status of that operation.

### getCartItems() function

```js
tipserScriptInstance.getCartItems().then((cartItems) => {
    console.log("cart items: ", cartItems)
}).catch((e) => {
    console.log("failed to get cart items", e)
});
```

Returns a Promise that will eventually return a list of all Tipser products currently in the shopping cart.

### addToCartAndGoToCheckout(productId) function

```js
tipserScriptInstance.addToCartAndGoToCheckout(productId).then(() => {
    console.log("add to cart and go to checkout successful");
}).catch((e) => {
    console.log("add to cart and go to checkout  failed", e)
});
```

Adds to cart a product with a given Tipser product id and then opens the checkout modal dialog. Alternatively, redirects to the URL defined in `customUrls.checkoutUrl` configuration option if specified. Returns a promise that will succeed or reject depending on the status of that operation.
  

## API reference

All configuration supported by Tipser Script is listed below.

| Parameter               | Default   | Description                                                                                                                                                                                    | Example                                   |
| ----------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------    |
| lang                    | `'en-US'` | a locale to be used by the Tipser content. Possible values: `'en-US'`, `'de-DE'`, `'fr-FR'` and `'sv-SE'`. More info at [Language and locale](#language-and-locale)[Environment](#environment) | `'de-DE'`                                 |
| env                     | `'prod'`  | Tipser environment to be used by the Tipser content. Possible values: `'stage'` and `'prod'`. More info at [Environment](#environment)                                                         | `'stage'`                                 |
| defaultAddedToCartPopup | `true`    | Controls default Added To Cart Popup. It appears when user adds a product to the cart. It improves UX by highlighting the action and allowing to navigate quickly to the cart modal window.    | `true` or `false`                         |
| useDefaultErrorHandler  | `true`    | when set to false and error happens, default message won't be displayed                                                                                                                        | see [Adding onError handler](#onerror)    |
| eventsHandlers          | `{}`      | the object of event handlers. See [Event handlers](#event-handlers)                                                                                                                            | `{ onError: console.error.bind(console) }`|
| modalUi                 | `{}`      | Customization of Tipser Dialog. More info at [Parameters for modal customization](#parameters-for-modal-customization)                                                                       | `{ hideSimilarProducts : true}`           |
| primaryColor            | `#333`    | Hex color code, affecting eg. buy-button color and Cart indicator                                                                                                                              | #5F9F9F                                   |
| disableAnalytics        | `false`   | If set to `true`, all Tipser analytics requests will be blocked (no events to Analytics and stats.tipser.com will be sent)                                                                     | `true`                                    |

---

### Event handlers

Event handlers can be passed as part of configuration. There is a number of event exposed by the Tipser Script that can be listened to programatically, such as technical events, shopping behavior, errors and analytics. You may hook in your event listener into Tipser Script via `eventsHandlers` option.

```js
tipserScript.initialize("posId", {
  eventsHandlers: {
    onAddToCart: (payload) => {
      console.log("Hurray, you have added item to cart. ", payload.product);
      console.log("Your cart size is now. ", payload.cartSize);
    },
  },
});
```

Whenever an event occurs, Tipser Script will call your event listener, passing only one argument - `payload` - which will hold event data (different to each event type). Above example demonstrates how to listen to the add to cart event and log current cart size and newly added product. Currently supported handlers are: `onAddToCart` and `onError`.

---

#### onAddToCart

```
onAddToCart: (cartSize: number, product: TipserProductModel)
```

- `cartSize`- property contains the cart size **after a product has been added to the cart**
- `product` - is an object as well and representing the product which has been added to cart. The model of the `product` field is as follows.

`TipserProductModel` interface is as follows:

```ts
interface TipserProductModel {
  id: string;
  title: string;
  description: string;
  brand: string;
  images: any[];
  isInStock: boolean;
  deliveryTime: string;
  priceIncVat: PriceModel;
  deliveryCost: PriceModel;
  variants: TipserProductModel[];
  discountPriceIncVat: PriceModel;
  freeReturn: boolean;
}
```

---

#### onError

By default, in case of an unexpected error happening (connection issues or unhandled runtime exceptions), an error popup appears. If you want to disable that default error popup, set `useDefaultErrorHandler` option to `false`, and replace it by your own error handling by listening to error messages via `onError` event handler.

```js
tipserScript.initialize("posId", {
  useDefaultErrorHandler: true,
  eventsHandlers: {
    onError: (error) => {
      console.log(error);
    },
  },
});
```

The payload of `error` event is as follows:

- `type`: `TipserElementError` object

- `id`: string

- `message`: error message

- `stack`: typical error stack of js error

The `onError` event handler is used with `useDefaultErrorHandler` config option. When that option is set to false (default to true) the error will not be shown on the screen.

<aside class="warning">This section requires simplification. It isn't clear how to use event handler with combination of this configuration</aside>

#### onStockCountChange

This handler takes care of the edge case, when while in the checkout process and before payment, the stock count of an item in the cart becomes lower than the number of items in the cart. By default, in such a situation, we display an overlay with an information about the stock count change and the button for reloading the checkout. If you wish to customize this behaviour, you can use a callback `onStockCountChange(items: CartItemModel[]) => void`, which will prevent the default behavior.

## Customizing the styles

Our e-commerce components are the "building blocks" designed to fit your page as much as possible. We created the styling in a way that delivers a nice look & feel from the start, but also allows you to change them easily to fit your unique sense of style. For example, all elements' `font-family` and `font-size` attributes are set to inherit them from the host page. If you need to change some other styles, please overwrite the CSS classes corresponding to the elements that you customize (listed below).

### Product Card

The Product Card is an item used for displaying a single tile in a `Collection` or `Store` component, among others. The font-family used in the description section of the Product Card is inherited from your website's styles, and the font-size is expressed in the relative `em` units controlled in `.te-product-card` class. The default value used there is `12px`, which you can easily change by adding to your CSS the following style:

```css
.te-product-card {
  font-size: 14px;
}
```

All the description elements (product name, brand and price) will become bigger / smaller according to the value you specify in the `px` unit. If you wish to change single description element, please use its specific class names:

`.te-product-card-name` <br/>
`.te-product-card-brand`<br/>
`.te-product-card-price`<br/>
and:<br/>
`.te-product-card-sales-price`<br/>
`.te-product-card-price-regular-price`<br/>
for products on sale.

### Cart

The Cart component with the cart icon can be placed anywhere on your website. (It is highly advisable to place it in your navigation element among other icons such as search, home etc.) However, if you want to keep it visible at all times, attached to the right side of the viewport, you can use these styles:

```css
.cart-icon {
  position: fixed;
  right: 0;
  top: 121px;
  background: #fff;
  padding: 10px;
  box-shadow: -2px 2px 7px rgba(0, 0, 0, 0.3);
  z-index: 10;
}
```

### Adding Primary color

If you'd like to unify our design with your own color-theme, you can use our primary-color [configuration option](#primary-color). If your primary color is a bright one, you might also want to change the text color of the elements that use the primary color as the background, e.g. add to cart buttons. For example in buttons by default the color we use is white.

```css
/* if your primary color is bright,
    you may also consider changing the text color for elements like buttons: */
.te-button-text {
  color: #333;
}
```

If you'd like to change other elements' color as well, please use specific classes to override the styles.

## Starter projects

A working example of a page based on Tipser Elements can be found under <a href="https://tipser.github.io/tipser-widget-bootstrap/" target="_blank">Tipser Script Bootstrap page</a>..

The code of that page is available as a GitHub repo: <a href="https://github.com/Tipser/tipser-widget-bootstrap" target="_blank">Tipser Script Bootstrap project</a>. Feel free to clone it and run it locally!
  


