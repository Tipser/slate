# Migration guide

Below is the list of all the backwards-incompatible changes between Tipser Script 2.x and 3.x.

Migrating to 3.x should be as simple as going through this list and replacing all the old calls in your code with the new ones.

<aside type="notice">
Most of the changes described below have been backported to Tipser Script 2.x, meaning that you can first safely try them out in your current code using 2.x before bumping Tipser Script version to 3.x.
</aside> 

### The new way to initialize

The way to initialize Tipser Script used to be:

```js
tipser.elements(posId, config)
```

Now it is:

```js
tipserScript.initialize(posId, config)
```

Please note that the global variable name `tipser` has been renamed to `tipserScript`.

### Configuration changes

- The config option `disableDialog` is no longer supported. It should be replaced by building an embedded product page (with `customUrls.productUrl` config option)
- `openOldDialog` and `openOldCheckout` config options are no longer supported (the old dialog is no longer available)
- `useCheckoutV2` config option has been removed (Checkout 2.0 is always used when PSP is non-Klarna)

### Components:

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

The attribute to control the image size used to be:

`data-tipser-img-size="large"`

Now it is:

`data-tipser-image-size="large"`


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

Before the cart component was mounted with the following function call:

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

- the optional `data-tipser-inline-menu` attribute has been renamed to `data-tipser-inline-mobile-menu`
- the `useDeepLinking` configuration option has been replaced by `data-tipser-disable-deep-linking` attribute with inverted logic   

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

Or with `data-tipser-carousel`:

```html
<div
   data-tipser-collection
   data-tipser-collection-id="5f13cead3fc6c100012e2c12"
   data-tipser-carousel>
</div>
```

---

**`data-tipser-product-list` component**

The HTML syntax for the product list component used to be:

```html
<div 
   data-tipser-pids="5fdb6c982ccf91000135deba,5fdb6c982ccf91000135debc,5fdb6c982ccf91000135debd">
</div>
```

Now it is:

```html
<div 
   data-tipser-product-list
   data-tipser-product-ids="5fdb6c982ccf91000135deba,5fdb6c982ccf91000135debc,5fdb6c982ccf91000135debd">
</div>
```

Or with `data-tipser-carousel`:

```html
<div
   data-tipser-product-list
   data-tipser-product-ids="5fdb6c982ccf91000135deba,5fdb6c982ccf91000135debc,5fdb6c982ccf91000135debd"
   data-tipser-carousel>
</div>
```

---

**`data-tipser-checkout` component**

The HTML syntax for the checkout component used to be:

```html
<div id="tipser_checkout"></div>
```

Now it is:

```html
<div data-tipser-checkout-page></div>
```

---

## Tipser SDK removed

In Tipser Script 3.x `scriptInstance.sdkInstance` has been removed. Instead, we provide a set of functions available directly on `scriptInstance` object. Read the [Internal functions](#internal-functions) chapter for more details.

So for example the following snippet of code:

```js
scriptInstance.sdkInstance.openProductDialog(productId);
```

Needs to be replaced with:

```js
scriptInstance.goToProduct(productId);
```

### Styles inheritance in modal

In Tipser Script 2.x all the basic CSS styles like `font-size`, `font-family`, header sizes, etc, are inherited from the parent page and applied to the Tipser modal.
In Tipser Script 3.0 this behavior has been changed: a set of "reasonable" styles is applied inside the modal (overriding corresponding styles from the parent page).

In order to activate the old behavior (recommended when migrating from 2.x), the following config option needs to be used:

```js
const scriptConfig = {
    //...
    modalUi: {
        inheritStyles: true;
    }
    //...
}
```  

### Checkout flow changes

- In the dialog one more phase has been added between product view and checkout view: a cart phase 
- Checkout product list is no longer editable by default (unless modular checkout is in use and `data-tipser-editable` attribute is used on `data-tipser-modular-checkout-product-list` component)
- For embedded integrations we recommend using the `data-tipser-cart-page` component to present and modify cart contents (checkout page should not be editable unless absolutely required)
