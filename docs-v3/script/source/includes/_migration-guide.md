# Migration guide

Below is the list of all the HTML tags and JS calls that were available in Tipser Script 2.x that now have new counterparts in Tipser Script 3.x .

Migrating from 2.x to 3.x should be as simple as going through this list and replacing all the old calls in your code with the new ones, according to the instructions below.

**Tipser Script `initialize` function**

The way to initialize Tipser Script used to be:

```js
tipser.elements(posId,config)
```

Now it is:

```js
tipserScript.initialize(posId, config)
```

---

**`data-tipser-product-tile` component**

The HTML syntax for the product tile component used to be:

```html
<div data-tipser-pid="5f13cead3fc6c100012e2c12" data-tipser-view="compact"></div>
```

Now it is:

```html
<div data-tipser-product-tile data-tipser-product-id="5f13cead3fc6c100012e2c12"></div>
```

---

**`data-tipser-product-listing` component**

The HTML syntax for the product listing component used to be:

```html
<div data-tipser-pid="5f13cead3fc6c100012e2c12"></div>
```

Or:

```html
<div data-tipser-pid="5f13cead3fc6c100012e2c12" data-tipser-view="full"></div>
```

Now it is:

```html
<div data-tipser-product-listing data-tipser-product-id="5f13cead3fc6c100012e2c12"></div>
```

---

**`data-tipser-product-page` component**

The HTML syntax for the product page component used to be:

```html
<div data-tipser-product-page="5f13cead3fc6c100012e2c12"></div>
```

Now it is:

```html
<div data-tipser-product-page data-tipser-product-id="5f13cead3fc6c100012e2c12"></div>
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

The HTML syntax for the `Store` component used to be:

```html
<div id="tipser_store"></div>
```

Now it is:

```html
<div data-tipser-store /></div>
```

Additionally, optional `data-tipser-inline-menu` was renamed to `data-tipser-inline-mobile-menu`.

---

**`data-tipser-collection` component**

The HTML syntax for the collection component used to be:

```html
<div data-tipser-cid="5f13cead3fc6c100012e2c12"></div>
```

Now it is:

```html
<div data-tipser-collection data-tipser-collection-id="5f13cead3fc6c100012e2c12"></div>
```
