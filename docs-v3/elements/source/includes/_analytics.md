# Analytics

You can connect to Tipser analytics by listening to the `tw-track` event on your page:

```html
<script>
const analyticsHandler = function (e) {
  //put here your own code handling the event, example below
  const detail = e.detail; 
  console.log('Tipser analytics event: ', e);
  console.log('Action',detail.action); //e.g. 'Cart'
  console.log('Target',detail.target); //e.g. 'Product'
  console.log('Description',detail.description); //e.g. 'Product added to cart'
  console.log('Object',detail.object); //payload of the event (e.g. product id, price, etc)
}
document.addEventListener('tw-track', analyticsHandler);
</script>
```

Example events intercepted this way are:

* the user viewed a product on your page
* a product was added to cart
* product checkout dialog was opened
* transaction was finalized

For complete list of supported events refer to the [List of supported interactions](#list-of-supported-interactions) section.

What you do with those events is up to you. Typical usage examples are:

* forwarding them to your analytics system (e.g. Google Analytics, as described [here](#typical-use-case-google-analytics))
* logging them to the browser console for easier debugging

## Events structure

Each event passed to `analyticsHandler` function follows the following structure:

```yaml
{
  detail: {
    action: string, # what action is taken on the target, mandatory
    target: string, # where this action is taken, mandatory
    description: string, # describing what is being logged
    object: # details about the tracked object, e.g. product name, product price, etc.
    [    
      {  
        # some properties here               
      },     
      ..., # this array can contain more than 1 object
    ]
  } 
}
```

As you can see, all the useful data is contained in the top-level `detail` field of the event object.

## Typical use case: Google Analytics

In case you want to forward Tipser Analytics events to your Google Analytics, you can use this code snippet:

```javascript
document.addEventListener('tw-track', function(e) {
    // ga() function coming from analytics.js library
    ga('send', {
        hitType: 'event',
        eventCategory: e.detail.description,
        eventAction: e.detail.action,
        eventLabel: e.detail.target,
    });
});
```

The code above assumes that you use <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs" target="_blank">analytics.js</a> GA client library on your page. For other libraries, like gtag.js, that code needs to be slightly adjusted.

For the instructions how to setup analytics.js script on your site and connect it to your GA account, refer to the <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs" target="_blank">official documentation</a>.

The above example is just a very trivial example of integrating Tipser events with GA. For a more thorough implementation involving Enhanced Ecommerce extension, please refer to [this gist](https://gist.github.com/piotr-sobczyk/c652fd03488e4bd4003d66c763b5127d).

For example, if you're using analytics.js script to integrate with Google Analytics, you need to add the line below (as described <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#loadit" target="_blank">here</a>) at the end of the snippet copied from your GA account: 

```js
ga('require', 'ec');
```

and make sure that Enhanced Ecommerce extension is enabled in you GA settings:

[![](enhanced_ecommerce_config.png)](/images/enhanced_ecommerce_config.png)

## Typical use case: Facebook Pixel

In case you want to forward Tipser Analytics events to your Facebook Pixel account, you can use the following code snippet:

```javascript
document.addEventListener('tw-track', function(e) {
    // fbq() function coming from Facebook Pixel analytics script
    fbq('trackCustom', e.detail.action, {
        content_name: e.detail.target, 
        content_category: e.detail.description,
        content_type: e.detail.action,
    });
});
```
The example above doesn't translate Tipser events to standard Pixel events, you will have to make a correlation in the Pixel dashboard or you can write a custom mapping function. 


1. Expand and copy the snippet script.
2. Paste it above `addEventListener` for tw-track event.
3. Use it the same way as in the example below
<details>
  <summary>Snippet</summary>
  <p>

    ```javascript
    const callPixelEvent = function(e) {
      const action = e.detail.action;
      const target = e.detail.target;
      const object = e.detail.object;

      switch (true) {
        case action === 'Click' && target === 'Product tile': {
          const product = object[0];
          fbq('track', 'ViewContent', {
            currency: (product.salesPrice || product.listPrice || product.priceIncVat).currency,
            value: (product.salesPrice || product.listPrice || product.priceIncVat).value,
            content_name: product.name || product.title,
            content_ids: [product.id],
          });
          break;
        }
        case action === 'Cart' && target === 'Product': {
          const product = object[0];
          if ((product.name || product.title) && (product.salesPrice || product.listPrice || product.priceIncVat)) {
            fbq('track', 'AddToCart', {
              currency: (product.salesPrice || product.listPrice || product.priceIncVat).currency,
              value: (product.salesPrice || product.listPrice || product.priceIncVat).value,
              content_name: product.name || product.title,
              content_ids: [product.id],
            });
          } else {
            fbq('track', 'AddToCart', {
              content_ids: [product.id],
            });
          }
          break;
        }
        case action === 'Cart' && target === 'Payment': {
          const products = object;
          fbq('track', 'InitiateCheckout', {
            content_ids: products.map((p) => p.id),
            contents: products.map((p) => p.name).join(', '),
            currency: (products[0].salesPrice || products[0].listPrice || products[0].priceIncVat).currency,
            num_items: products.reduce((totalQuantity, product) => product.quantity + totalQuantity, 0),
            value: products.reduce((totalPrice, product) => product.quantity * (product.salesPrice || product.listPrice).value + totalPrice, 0),
          });
          break;
        }
        case action === 'Purchase' && target === 'Order': {
          const products = object.map((order) => order.Products).flat();
          fbq('track', 'Purchase', {
            value: products.reduce(
              (totalPrice, product) => totalPrice + (product.salesPrice || product.listPrice || product.priceIncVat).value,
              0
            ),
            currency: (products[0].salesPrice || products[0].listPrice || products[0].priceIncVat).currency,
            content_ids: products.map((product) => product.id),
            contents: products,
            content_type: 'product',
          });
          break;
        }
        default:
          break;
      }
    };
  ```

  </p>

</details>

```javascript
document.addEventListener('tw-track', callPixelEvent);
```

The code above assumes that you use <a href="https://developers.facebook.com/docs/facebook-pixel/implementation" target="_blank">pixel.js</a> facebook client library on your page.

For the instructions how to setup pixel.js script on your site and connect it to your Facebook for Developers account, refer to the <a href="https://developers.facebook.com/docs/facebook-pixel/implementation" target="_blank">official documentation</a>.

## List of supported interactions

### View collection
When a collection appears in the viewport.

`detail` object structure

 ```yaml
{
  description: ‘Collection viewed’,
  action: 'View',
  target: 'List',
  object:  {
    id: string,
    ownerUserId: string,
    created: string, #e.g. DateTime ISO 2019-06-11T08:40:29.377Z
    modified: string, #e.g. DateTime ISO 2019-06-11T08:40:29.377Z
    postComment: null | ?
    product: Product     
  }[]
}
```
_Quick links to object structures: [Product](#product-structure)_ 

### Click product in collection
When a product in a collection is clicked.

`detail` object structure

```yaml
{
  description: 'Product tile clicked',
  action: 'Click',
  target: 'Product tile',
  object: Product[]
}
```
_Quick links to object structures: [Product](#product-structure)_

### View product details
It is emitted every time product tile is clicked and product dialog is displayed.

`detail` object structure

```yaml
{
  description: 'Product detail page viewed',
  action: 'View',
  target: 'Product',
  object: Product[] # Product which interests us is the first element of an Array 
}
```
_Quick links to object structures: [Product](#product-structure)_

### View the Store
When the Tipser store appears in the viewport.

`detail` object structure

```yaml
{
  description: 'Shop viewed',
  action: 'View',
  target: 'Shop',
  object: [
    { 
      id: string, # collection id
      items: Product[], # products
      url_slug: string # store url slug 
    }
  ]
}
```

When a category is changed in the store, this event will be sent again with a different set of products and collection id.

### Click cart tab
When the shopping cart tab is clicked.

`detail` object structure

```yaml
{
  description: 'Cart clicked',
  action: 'Click',
  target: 'Cart-tab',
  object: []
}
```

### Add product to cart
  
When a product is added to a shopping cart.

`detail` object structure

```yaml
{
  description: ‘Product added to cart’,
  action: 'Cart',
  target: 'Product',
  object: ProductLegacy[]
}
```
_Quick links to object structures: [ProductLegacy](#productlegacy-structure)_

### View cart - with purchase intent
When cart appears in the viewport, and getting payment in view.

`detail` object structure

```yaml
{
  description: 'View cart - payment in viewport',
  action: 'View',
  target: 'Payment',
  object: OrderedProductLegacy[]
}
```

_Quick links to object structures: [OrderedProductLegacy](#orderedproductlegacy-structure)_

### Product purchased
When a product was bought (thank you page).


`detail` object structure

```yaml
{
  description: ‘Product purchased’,
  action: 'Purchase',
  target: 'Order',
  object: [
    {
      OrderId: string, 
      Products: ProductLegacy[]
    }
  ]
}
```
_Quick links to object structures: [ProductLegacy](#productlegacy-structure)_


### View cart
When cart icon appears in the viewport.

`detail` object structure

```yaml
{
  description: ‘View cart’,
  action: 'View',
  target: 'Cart-tab',
  object: []
}
```

## Objects structures

### `ProductLegacy` structure
```yaml
{ # Representation of product, but slightly different schema than Product
  id: string,
  name: string,
  brand: string,
  campaign: undefined,
  categories: CategoriesLegacy
  image: string, # url
  listPrice: Price,
  salesPrice: Price,
  variant: [],
  merchant: undefined
}
```
_Quick links to object structures: [CategoriesLegacy](#categorieslegacy-structure), [Price](#price-structure)_

### `OrderedProductLegacy` structure
```yaml
{ # Representation of product, but slightly different schema than Product
  id: string,
  name: string,
  brand: string,
  campaign: undefined,
  categories: CategoriesLegacy 
  merchant: string
  image: string, # url
  listPrice: Price,
  salesPrice: Price,
  variant: [],
  posId: string,
  quantity: number
}
```
_Quick links to object structures: [CategoriesLegacy](#categorieslegacy-structure), [Price](#price-structure)_

### `CategoriesLegacy` structure

```yaml
{
  [key]: string
}[]
```

### `Product` structure

```yaml
{
  id: string,
  title: string,
  images: Image[],
  brand: string,
  catgories: Categories
  currency: string, #ISO 4217
  description: string,
  priceInVat: Price,
  isInStock: boolean,
  variants: [],
  vat: { # percentage of VAT
    value: number,
    formatted: string, # human readable value percentage string
  }      
  categoriesValue: string
}
```
_Quick links to object structures: [Categories](#categories-structure), [Price](#price-structure), [Image](#image-structure)_

### `Image` structure

```yaml
{
  [key]: string 
  id: string,
  original: string
}
```
Each value is url for the certain variation of an image. `key` determines size, and it is one of following: `250x`, `450x`, `960x`, `50x50`.

### `Categories` structure

```yaml
  department: string,
  section: string,
  productType: string
``` 

### `Price` structure

```yaml
{
  value: number,
  currency: string, #ISO 4217
  formatted: string, # human readable price string    
}
```

## Disabling analytics

In case analytics needs to be disabled (e.g. as a result of the user rejecting the GDPR terms), the `disableAnalytics: true` configuration option can be used. Doing so will prevent the following from happening:

- sending web requests to Tipser's Google Analytics property
- sending web requests to Tipser's internal analytics system (stats.tipser.com)
- placing Google Analytics tracking cookies in the user's browser by Tipser's Google Analytics script

### Disabling analytics statically vs dynamically

You can decide to disable analytics from the start when `disableAnalytics: true` setting is a part of your initial configuration. 

Or, instead, you may want to initially keep it enabled (by setting `disableAnalytics: false` setting in your initial configuration or simply skipping that setting) and only disable it dynamically at the later time (if necessary) by updating the value of `disableAnalytics` config to `true` (e.g. at the moment when the user declines the GDPR terms).

If you're using Tipser Script, you can dynamically update `disableAnalytics` value with the following line:

```javascript
tipserScript.updateConfig({disableAnalytics: true});
```

If you're using Tipser Elements, just update the value passed to the `config` prop of `TipserElementsProvider` in the next render cycle:

```jsx
const elementsConfigWithAnalytics = {...baseElementsConfig, disableAnalytics: shouldDisableAnalytics()};

return <TipserElementsProvider config={elementsConfigWithAnalytics}>
...
</TipserElementsProvider>
```
 

    

<aside class="warning">
The configuration setting <code>disableAnalytics: true</code> does not block <code>tw-track</code> events from being emitted. In case you are translating <code>tw-track</code> events to analytics events (e.g. as described in <a href="#typical-use-case-google-analytics">Typical use case: Google Analytics</a> section), then it's your responsibility 
to block that sending your own analytics events when necessary.     
</aside>
