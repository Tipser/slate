#Tipser Widget

Tipser Widget is a small and handy script that you can use to embed Tipser products and shops on your page and start selling with Tipser.

## See it live! ##

A working examples of page based on Tipser Widget can be found on [Tipser Widget Bootstrap page](https://tipser.github.io/tipser-widget-bootstrap/).

The code of that page is available as a GitHub [Tipser Widget Bootstrap project](https://github.com/Tipser/tipser-widget-bootstrap). Feel free to checkout it and play with it on your local machine!

## Basic usage ##

```html
<script>
    var scriptTag = document.createElement('script');
    scriptTag.src = "https://cdn.tipser.com/tipser-script/latest.js";
    scriptTag.onload = scriptTag.onreadystatechange = function() {
        tipser.elements("myPosId")
    }
    document.body.appendChild(scriptTag);
</script>
```

To use Tipser Widget, add the following snippet to your page.

> Make sure to replace `myPosId` with your Tipser account id.

> [Open this snippet on Code Pen](https://codepen.io/tipser-tech/pen/BEyogM)

<aside class="notice">
The recommended place to add the script is the end of the <code>body</code> tag of your page.
</aside>

If you are hosting your page on a CMS like Wordpress, one common pattern to load this script is to include it in a footer element of your page. If you are hosting your page on a web server, you may need to ask you web developers to include the snippet.

The only part of the script really interesting for you is the body of the function. (The remaining code examples will only include that part).

<aside class="notice">
Make sure to replace <code>myPosId</code> with your Tipser account id. If you are not sure what to put here, please contact Tipser staff.
</aside>

## Replacing elements on your page ##

The simplest way to use Tipser Widget is to include the script described in [Basic usage](#basic-usage) and mark HTML elements on your page with special attributes `data-tipser-pid` and/or `data-tipser-cid`. 
Tipser Widget will find them and replace with Product or Collection.

_Prerequisites:_ find Tipser ids of products that you want to sell or create your own customized collections of products in your account at [www.tipser.com](www.tipser.com).

### Embedding Product on the page ###

```html
<div data-tipser-pid="5ba2334a781baa0001ccdf61" />
```

Elements with attribute `data-tipser-pid` will be replaced with Product component, using the product with Tipser id passed in the attribute. By default a full inline product component is displayed.

[![](full-product.png)](/images/full-product.png)

```html
<div data-tipser-pid="57233dac89862012f8ec1001" data-tipser-view="compact" />
```
To display a compact Product view you need to add `data-tipser-view="compact"` attribute in addition to `data-tipser-pid`.

[![](compact-product.png)](/images/compact-product.png)

### Embedding Collection on the page ###

```html
<p name="My collection" data-tipser-cid="5b2788909d25801adcb23f4f" />
<p name="My collection" data-tipser-cid="5b2788909d25801adcb23f4f" data-tipser-imgsize="1.2" />
```

Elements with attribute `data-tipser-cid` will be replaced with Collection component, using the collection with Tipser id passed in the attribute. To make the collection items smaller / larger use the `data-tipser-imgsize` attribute with values `"0.8"` for smaller  and `"1.2"` for lager product tiles. The default value for imgSize parameter is `"1"`.

### Embedding Store on the page ###

```html
<div id="tipser_store"></div>
```

> [Open this snippet on Code Pen](https://codepen.io/tipser-tech/pen/YMMKMp)

Element with id `tipser_store` will be replaced with Store component for the user whose `posId` has been passed to `tipser.elements()` call (see: [Basic Usage](#basic-usage) ).

[![](shop_component.png)](/images/shop_component.png)

Note: the Store is updating the top-level page URL (when it's tabs are clicked). For this reason, please double check if it won't interfere with your web framework. 
For the same reason, there can't be more than one Store on the page (the DOM replacement logic will replace only the last occurence of a component with `tipser_store` id).

## Displaying CMS content on page ##

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

## Displaying Cart ##

```js
tipser.elements('myPosId')
  .mountCart(".shopping-zone .cart-container");
```

To keep the user informed about the state of his shopping cart and make it possible to finalize the checkout process at any time, Tipser Widget can attach a live shopping cart icon on your page.

To activate the Cart, you need to dedicate an element on your page to host a shopping cart and pass a CSS selector to that element to `mountCart` function, as in the example snippet.

The cart icon can be placed anywhere on your website. If you want to keep it visible at all times please follow the [instructions](#cart).
## Advanced example: displaying several pieces of CMS content and cart icon ##

```js
tipser.elements('myPosId')
  .mountContent("3UvCQHKV7gmMdcegDHSr5B", ".shopping-zone .content-container1")
  .mountContent("3UvCQHKV7gmMdcegDHSr5C", ".shopping-zone .content-container2")
  .mountCart(".shopping-zone .cart-container");
```

It is possible to combine multiple invocations of `mountContent()` with zero or one invocations of `mountCart()` as presented in the code snippet. That will lead to multiple pieces of content
AND a cart icon being displayed on the page.

## Specifying a locale ##

```js
  tipser.elements("myPosId", {
    lang: 'en'
  })
```

The function `tipser.elements` accepts a second optional parameter which is an object of configuraton options.

`lang` configuration option specifies the language to be used. Supported languages are currently: `en`, `de`, `fr` and `sv`.

A complete index of all the supported configuration options can be found in [All configuration options](#all-configuration-options) section.

## Specifying an environment ##

```js
  tipser.elements("myPosId", {
    env: 'stage'
  })
```

It is possible to use Tipser Elements in test (staging) environment to be able to do test checkouts. The environment can be activated using the `env` configuration option, as in the snippet, 
where supported environments are `stage` and `prod`. This configuration option is optional and in case it is missing, `prod` environment will be used. 

## Adding event handlers ##
```js

// how to use event handlers:
 tipser.elements('5075d7715c3d090a90585e87', { //pos id (Tipser user id)
    //The configuration of tipser widget comes here
    lang: "en",
    useDefaultErrorHandler: true, // default to true, false if you dont need error message
    eventsHandlers: {
      onError: (error) => {
          console.log(error)
      },
      onAddToCart: (param) => {
          console.log('Hurray, you have added item to cart. ', param.product);
          console.log('Your cart size is now. ', param.cartSize);
      }
    }
  })
};

// product contains properties:
{
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
Event handlers may be passed as part of configuration. There is a number of events exposed for developer.

In `eventsHandler` config option you can add your own handlers for events `onError` and `onAddToCart`.

`onError` is triggered when an error appears (i.e. when adding product to the cart failed);

`onAddToCart` event is triggered when the product has been added to the cart;

<br>

The handler for `onError` takes error argument (see code example) as an object type with properties :

- `type`: `TipserElementError` object 

- `id`: string

- `message`: error message

- `stack`: typical error stack of js error

The `onError` event handler is used with `useDefaultErrorHandler` config option. When that option is set to false (default to true) the error will not be shown on the screen.
<br><br>
`onAddToCart` event handler takes an object of `{cartSize, product}` as argument:

- `cartSize` property contains the value of current cartSize after adding it to the cart 

- `product` is an object as well and representing the product which has been added to cart. 


## All configuration options ##

Tipser Widget supports following configuration options.

Parameter | Default | Description | Example
--------- | ------- | ----------- | -------
lang | `'en'` | a locale to be used by the Tipser content. Possible values: `'en'`, `'de'`, `'fr'` and `'sv'`. | `'de'` 
env | `'prod'` | Tipser environment to be used by the Tipser content. Possible values: `'stage'` and `'prod'`. | `'stage'`
disableDomReplacement | `false` | Advanced setting. Set to true in case for some reason you don't wish any tag replacement to happen (see: [Replacing elements on your page](#replacing-elements-on-your-page) ). | true
defaultAddedToCartPopup | `true` | Controls default Added To Cart Popup. It appears when user adds a product to the cart. It improves UX by highlighting the action and allowing to navigate quickly to the cart modal window.  | `true` or `false` 
useDefaultErrorHandler | `true` | when set to false and error happens, default message won't be displayed | see [Adding event handlers](#adding-event-handlers)
eventsHandlers | `object` | `null` | the object of event handlers | see [Adding event handlers](#adding-event-handlers)

In addition to the options described above all the configuration options supported by Tipser Elements library are supported.
   
