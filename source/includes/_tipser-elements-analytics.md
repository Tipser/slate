# Tipser Elements Analytics

Tipser has implemented an event for the Tipser Elements Analytics that users of the script can listen to in order to gather analytics about Tipser interactions and feed them into their own analytics engines.  

## General overview of the Tipser Elements Analytics collector
By listening to the event `tw-track` certain Tipser events can be gathered and pushed into an external analytics engine.

The event contains the object detail that contains the following items:

`detail` object

```yaml
{
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
```


Example of an event listener:

```javascript
document.addEventListener('tw-track', function (e) {
  var detial = e.detail; 
  console.log('tw-track');
  console.log('tw-track action',detial.action);
  console.log('tw-track description',detial.description);
  console.log('tw-track target',detial.target);
  console.log('tw-track object',detial.object);
});
```

## List of supported interactions

### View collection
When a collection appears in the viewport.

`detail` object structure

 ```yaml
{
  description: ‘Viewport scrolled’,
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
      url_slug: string # store url slug 
    }
  ]
}
```

### Click menu item in shop
When a menu item is clicked in the shop.

`detail` object structure

```yaml
{ 
  description: 'List clicked',
  action: 'Click,
  target: 'List',
  object:[
    { 
      id: string, # collection id
    } 
  ]
```

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
