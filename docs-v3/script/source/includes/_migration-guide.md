# Migration guide

Below is the list of all the HTML tags and JS calls that were available in Tipser Script 2.x that now have new counterparts in Tipser Script 3.x .

Migrating from 2.x to 3.x should be as simple as going through this list and replacing all the old calls in your code with the new ones, according to the instructions below.

## Components:

**Tipser Script `initialize` function**

The way to initialize Tipser Script used to be:

```js
tipser.elements(posId, config)
```

Now it is:

```js
tipserScript.initialize(posId, config)
```

---

**`data-tipser-product-tile` component**

The HTML syntax for the product tile component used to be:

```html
<div 
   data-tipser-pid="5f13cead3fc6c100012e2c12" 
   data-tipser-view="compact">
</div>
```

Now it is:

```html
<div 
   data-tipser-product-tile 
   data-tipser-product-id="5f13cead3fc6c100012e2c12">
</div>
```

The attribute for image size used to be:

`data-tipser-img-size="large"`

Now it is:

`data-tipser-size="large"`


---

**`data-tipser-product-listing` component**

The HTML syntax for the product listing component used to be:

```html
<div
   data-tipser-pid="5f13cead3fc6c100012e2c12">
</div>
```

Now it is:

```html
<div 
   data-tipser-product-listing 
   data-tipser-product-id="5f13cead3fc6c100012e2c12">
</div>
```

---

**`data-tipser-product-page` component**

The HTML syntax for the product page component used to be:

```html
<div 
   data-tipser-product-page="5f13cead3fc6c100012e2c12">
</div>
```

Now it is:

```html
<div 
   data-tipser-product-page
   data-tipser-product-id="5f13cead3fc6c100012e2c12">
</div>
```

---

**`data-tipser-cart-icon` component**

Before the cart component was mounted with the following functon call:

```js
tipserScriptInstance.mountCart(cartElementSelector);
```

Now the cart is mounted via HTML tag, just as any other components:

```html
<div data-tipser-cart-icon></div>
``` 

---

**`data-tipser-store` component**

The HTML syntax for the store component used to be:

```html
<div id="tipser_store"></div>
```

Now it is:

```html
<div data-tipser-store /></div>
```

Additional changes:

- the optional `data-tipser-inline-menu` attribute was renamed to `data-tipser-inline-mobile-menu`
- the `useDeepLinking` configuration option was replaced by `data-tipser-disable-deep-linking` attribute with inverted logic   

---

**`data-tipser-product-list` component**

The HTML syntax for the product list component used to be:

```html
<div 
   data-tipser-pids="5fdb6c982ccf91000135deba,5fdb6c982ccf91000135debc,5fdb6c982ccf91000135debd,5fdb6c982ccf91000135debe,5fdb6c982ccf91000135dec0,5fdb6c982ccf91000135debb,5fdb6c982ccf91000135deb9">
</div>
```

Now it is:

```html
<div 
   data-tipser-product-ids="5fdb6c982ccf91000135deba,5fdb6c982ccf91000135debc,5fdb6c982ccf91000135debd,5fdb6c982ccf91000135debe,5fdb6c982ccf91000135dec0,5fdb6c982ccf91000135debb,5fdb6c982ccf91000135deb9">
</div>
```

Or with `carousel`:

```html
<div 
   data-tipser-product-ids="5fdb6c982ccf91000135deba,5fdb6c982ccf91000135debc,5fdb6c982ccf91000135debd,5fdb6c982ccf91000135debe,5fdb6c982ccf91000135dec0,5fdb6c982ccf91000135debb,5fdb6c982ccf91000135deb9">
	data-tipser-carouseel
</div>
```

**`data-tipser-collection` component**

The HTML syntax for the collection component used to be:

```html
<div
   data-tipser-cid="5f13cead3fc6c100012e2c12">
</div>
```

Now it is:

```html
<div
  data-tipser-collection
  data-tipser-collection-id="5f13cead3fc6c100012e2c12">
</div>
```

Or with `carousel`:

```html
<div
   data-tipser-carousel 
   data-tipser-collection
   data-tipser-collection-id="5f13cead3fc6c100012e2c12">
</div>
```

---

**`data-tipser-checkout` component**

The HTML syntax for the checkout component used to be:

```html
<div 
   id="tipser_checkout">
</div>
```

Now it is:

```html
<div 
   data-tipser-checkout-page>
</div>
```

---

## SDK:
   In Elements 3.x SDK is completely removed, as a replacement we created `internal functions` 

   List Below contains all the `internal functions`:
- addToCartAndGoToCheckout
- goToProduct
- goToCheckout
- goToCart
- addToCart
- removeFromCart
- getCartItems

## New Components:
**`data-tipser-cart-page` component**

   The HTML syntax for the cart-page component

 ```html
<div 
   data-tipser-cart-page>
</div>
```  
## Config:
   new `CustomUrl` called `cartUrl` for displaying Cart Page

## Default Behaviors:
-  `cart-icon` dropdown enabled
-  new dialogs enabled

## Important checkout flow changes:

- Before going to checkout there will be Cart phase page enabled by default.
- Checkout products list will be non-editable by default.
- We recommend using `cart-icon` or `cart-page` to represent editable cart.

## Deprecated

- The behavior of `disableDialog` config is replaced by `customUrls.productUrl`
