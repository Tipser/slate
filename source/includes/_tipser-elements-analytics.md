# Analytics

You can connect to Tipser analytics by listening to the `tw-track` event on your page:

```html
<script>
var tipserEventsCallback = function (e) {
  //put here your own code handling the event, example below
  var detail = e.detail; 
  console.log('Tipser analytics event: ', e);
  console.log('Action',detail.action);
  console.log('Description',detail.description);
  console.log('Target',detail.target);
  console.log('Object',detail.object);
}
document.addEventListener('tw-track', tipserEventsCallback);
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

Each event passed to `tipserEventsCallback` function follows the following structure:

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

In case you want to tunnel Tipser Analytics events to your Google Analytics, you can use this code snippet:

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

## Typical use case: Facebook Pixel

Facebook Pixel is also an option to tunnel Tipser Analytics events, here's a snippet:

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
Example above doesn't translate tipser events to pixel events, you will have to make corelation in pixel dashboard or you can use function that translates those for you. 

1. Go <a href="https://gist.github.com/sirpeas/b434ca8972228f0b453a82a57558325a">here</a> and copy script.
2. Paste it above addEventListener for tw-track event.
3. Use it like on belowed example

```javascript
document.addEventListener('tw-track', callPixelEvent);
```

The code above assumes that you use <a href="https://developers.facebook.com/docs/facebook-pixel/implementation" target="_blank">pixel.js</a> facebook client library on your page.

For the instructions how to setup pixel.js script on your site and connect it to your Facebook for Developers account, refer to the <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs" target="_blank">official documentation</a>.

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
  target: 'Cart',
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
