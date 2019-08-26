#Tipser Elements

Tipser Elements is a set of shoppable elements built on top of Tipser REST API and Tipser SDK:

* **Product** - product display with variant selector and add to cart button
* **Collection** - a group of products
* **Store** - shop with collections, products and menu navigation
* **Cart** - cart icon with an easy access to the cart and checkout

![Tipser Elements](https://images.ctfassets.net/i8t5uby4h6ds/5PibEm4ryfOXZHxZtZDEXd/f604521da24ce17b93bfd3c24a87e619/collection-small.png)

***


## Quick start
This quick guide explains how to intialize and render Tipser Elements on your page. It requires you to have a publisher account created in order to get the `posId`, as well as have some collections created in your shop. For a guide how to manage your collections, check the **Tipser Tools** tutorial.

If you're all set up, follow this three steps to install Tipser Elements on your site!

***

### Installation of Tipser Elements

To use Tipser Elements on your site, add following script on your pages. This is an entry point to Tipser Elements that exposes a global `tipser` object, that you will use later to initialize Elements and customize its behavior.

```html
<script src="https://cdn.tipser.com/tipser-script/latest.js"></script>
```
<aside class="notice">
Make sure, that Tipser Elements script is <strong>loaded only once on your page</strong>. Additionally, it is recommended to load any scripts at the end of the <code>body</code> tag of your page so that the rendering is not blocked by JavaScript parsing. 
</aside>

***

### Inserting Tipser Element

Insert below HTML on your page in the place where you want the `Store` element to be rendered. Typically, this can be a new blank subpage created in your CMS as the `Store` is best displayed in the full page mode.

```html
<div id="tipser_store"></div>
```

<aside class="notice">Tipser Elements works by scanning your HTML and replacing special tags into shoppable elements - even if these special tags are added dynamically, thanks to the usage of <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver">MutationObserver API</a>.</aside>
***

### Initialize Tipser Elements
Finally, initialize Tipser Elements.

```js
tipser.elements('posId')
```

Make sure that the `posId` is replaced with the actual id. 

Complete working example could look like:

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="tipser_store"></div>
    <script src="https://cdn.tipser.com/tipser-script/latest.js"></script>
    <script>
      tipser.elements('5075d7715c3d090a90585e87')
    </script>
  </body>
</html>
```


If everything was setup correctly, you should see the `Store` element with all your collections in the place where the tag `<div id="tipser_store">` was initially. 

[![](tipser_elements_store.png)](/images/tipser_elements_store.png)

> [Open this snippet on Code Pen](https://codepen.io/tipser-tech/pen/YMMKMp)


<aside class="success">Congratulations! You have successfully integrated and setup Tipser Elements on your site.</aside>

***

## Configuration

Main Tipser Elements function has two arguments.

```ts
tipser.elements(posId: string, config?: TipserElementsConfig)
```
- `posId` - **required** - unique POS identifier. Must be specified in order to show your personalized store, handle campaigns and commissions. If you are not sure where to get it from, contact your account manager. 
- `config` - allows you to specify how Tipser Elements will look and behave on your site. See the [customization](#configuration-options) section that describes most common configuration options you need to know, while the complete index of all the supported configuration options can be found further in the [API reference](#api-reference) section.

***


## `Store` Element

Before you insert Store on your page, make sure there is at least one collection created in your store, otherwise no content will be rendered if your shop is empty.

Insert below HTML on your page in the place where you want the `Store` element to be rendered.

```html
<div id="tipser_store"></div>
```

<aside class="notify"><code>Store</code> Element is best inserted as a top level Element on a separate page and should contain the full content area for the best shopping experience.</aside>

## `Product` Element
In order to insert a `Product` Element in your content, insert below code in your content.

```html
<div data-tipser-pid="5ba2334a781baa0001ccdf61" />
```

Elements with attribute `data-tipser-pid` will be replaced with `Product` Element. Product ID is taken from the value of the attribute. By default a full inline product component is displayed (with product details, unique selling points and variant selection)

[![](full-product.png)](/images/full-product.png)

***

To display `Product` in a compact view, add the `data-tipser-view="compact"` attribute to above tag.

```html
<div data-tipser-pid="57233dac89862012f8ec1001" data-tipser-view="compact" />
```

[![](compact-product.png)](/images/compact-product.png)

<aside class="success">All Elements are mobile first. This means, that even if you insert a regular `Product` Element, it will be rendered as a compact product on the mobile devices for better experience.</aside>

***


## `Collection` Element

You can your store in collections. Each collection however can be rendered separately as a get the look widget or a simple product group, depending on your needs. It is all possible through `Collection` Element.

```html
<p name="My collection" data-tipser-cid="5b2788909d25801adcb23f4f" />
<p name="My collection" data-tipser-cid="5b2788909d25801adcb23f4f" data-tipser-imgsize="1.2" />
```

Elements with attribute `data-tipser-cid` will be replaced with `Collection` element of given id (value of `data-tipser-cid`). To make the collection items smaller / larger use the `data-tipser-imgsize` attribute with values `0.8` for smaller  and `1.2` for lager product tiles. The default value for imgSize parameter is `1`.

> [Open this snippet on Code Pen](https://codepen.io/tipser-tech/pen/YMMKMp)

***

## `Cart` Element

To keep the user informed about the state of his shopping cart and make it possible to finalize the checkout process at any time, Tipser Widget can attach a live shopping cart icon on your page.

```js
tipser.elements('posId')
      .mountCart('.my-cart-container');
```



To activate the Cart, you need to dedicate an element on your page to host a shopping cart and pass a CSS selector to that element to `mountCart` function, as in the example snippet.

The cart icon can be placed anywhere on your website. If you want to keep it visible at all times please follow the [instructions](#cart).




## API reference

All configuration supported by Tipser Elements is listed below.

Parameter | Default | Description | Example
--------- | ------- | ----------- | -------
lang | `'en'` | a locale to be used by the Tipser content. Possible values: `'en'`, `'de'`, `'fr'` and `'sv'`. | `'de'` 
env | `'prod'` | Tipser environment to be used by the Tipser content. Possible values: `'stage'` and `'prod'`. | `'stage'`
disableDomReplacement | `false` | Advanced setting. Set to true in case for some reason you don't wish any tag replacement to happen (see: [Replacing elements on your page](#replacing-elements-on-your-page) ). | true
defaultAddedToCartPopup | `true` | Controls default Added To Cart Popup. It appears when user adds a product to the cart. It improves UX by highlighting the action and allowing to navigate quickly to the cart modal window.  | `true` or `false` 
useDefaultErrorHandler | `true` | when set to false and error happens, default message won't be displayed | see [Adding event handlers](#adding-event-handlers)
eventsHandlers | `object` | `null` | the object of event handlers | see [Adding event handlers](#adding-event-handlers)

In addition to the options described above all the configuration options supported by Tipser Elements library are supported.

***

### Environment

It is possible to use Tipser Elements in a sandbox environment (also known as _staging_ or _test_ environment) to be able to do test checkouts without charging actual money. The environment can be specified using the `env` configuration option.

```js
  tipser.elements('posId', {
    env: 'stage'
  })
```


Supported values are `stage` and `prod`. This configuration option is optional, default env is `prod`, which means actual production environment.

***

### Event handlers

Event handlers can be passed as part of configuration. There is a number of event exposed by the Tipser Elements that can be listened to programatically, such as technical events, shopping behavior, errors and analytics. You may hook in your event listener into Tipser Elements via `eventsHandlers` option.

```js
 tipser.elements('posId', { 
    eventsHandlers: {
      onAddToCart: payload => {
          console.log('Hurray, you have added item to cart. ', payload.product);
          console.log('Your cart size is now. ', payload.cartSize);
      }
    }
  })
```

Whenever an event occurs, Tipser Elements will call your event listener, passing only one argument - `payload` - which will hold event data (different to each event type). Above example demonstrates how to listen to the add to cart event and log current cart size and newly added product. Currently supported handlers are:  `onAddToCart` and `onError`.

***

#### addToCart

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

***

#### error

By default, in case of an unexpected error happening (connection issues or unhandled runtime exceptions), an error popup will appear. If you want to disable the deafult error messages, set `useDefaultErrorHandler` option to `false`, and listen to error messages via `onError` event handler.

```js
 tipser.elements('posId', { 
    useDefaultErrorHandler: true, 
    eventsHandlers: {
      onError: error => {
          console.log(error);
      }
    }
  })
```

The payload of `error` event is as follows:

- `type`: `TipserElementError` object 

- `id`: string

- `message`: error message

- `stack`: typical error stack of js error

The `onError` event handler is used with `useDefaultErrorHandler` config option. When that option is set to false (default to true) the error will not be shown on the screen.

<aside class="warning">This section requires simplification. It isn't clear how to use event handler with combination of this configuration</aside>

   

## Starter projects

A working examples of page based on Tipser Widget can be found on [Tipser Widget Bootstrap page](https://tipser.github.io/tipser-widget-bootstrap/).

The code of that page is available as a GitHub [Tipser Widget Bootstrap project](https://github.com/Tipser/tipser-widget-bootstrap). Feel free to checkout it and play with it on your local machine!


## _Bonus:_ Displaying CMS content on page

```js
tipser.elements('myPosId')
  .mountContent("3UvCQHKV7gmMdcegDHSr5B", ".shopping-zone .store-container");
```

> Make sure to replace the value for `myPosId` and parameters of `mountContent` function.

> [Open this snippet on Code Pen](https://codepen.io/tipser-tech/pen/RONrZv)

Instead of (or in addition to) replacing elements marked by attribute, you may want to import content from Tipser's CMS (Contentful) to your page with `.mountContent` function.

_Prerequisites:_ you need to have a Contentful content created and configured (which is typically done by Tipser staff) and dedicate part of your page to inject that content.

`mountContent` function accepts two parameters:

`contentId`: the id of the content in the CMS <br>
`target`: It is a [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) pointing to the element on your page where the CMS content will be injected.

## _Bonus:_ Displaying several pieces of CMS content and cart icon

```js
tipser.elements('myPosId')
  .mountContent("3UvCQHKV7gmMdcegDHSr5B", ".shopping-zone .content-container1")
  .mountContent("3UvCQHKV7gmMdcegDHSr5C", ".shopping-zone .content-container2")
  .mountCart(".shopping-zone .cart-container");
```

It is possible to combine multiple invocations of `mountContent()` with zero or one invocations of `mountCart()` as presented in the code snippet. That will lead to multiple pieces of content
AND a cart icon being displayed on the page.
