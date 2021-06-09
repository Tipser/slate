# Migration guide

Below is the list of all the backwards-incompatible changes between Tipser Elements 2.x and 3.x.

Migrating to 3.x should be as simple as going through this list and replacing all the old calls in your code with the new ones.

### Component renames:

`Cart`

has been renamed to:

`CartIcon`

---

`Checkout` has been renamed to `CheckoutPage`

---

`CheckoutCartPromoCode` has been renamed to `CheckoutPromoCode`

---

`CheckoutCartProducts` has been renamed to `CheckoutProductList`

---

`CheckoutCartSummary` has been renamed to `CheckoutSummary`

---

### Tipser SDK removed

In Tipser Elements 3.x `scriptInstance.sdkInstance` has been removed. Instead, we provide a set of functions available from `useInternalFunctions` hook. Read the [Internal functions](#internal-functions) chapter for more details.

So for example this snippet of code:

```js
const tipserSdk = useTipserSdk();
tipserSdk.openProductDialog(productId);
```

Needs to be replaced with the following code:

```
const { goToProduct } = useInternalFunctions();
goToProduct(productId);
```

### `Store` component

Optional `inlineMenu` prop has been renamed to `inlineMobileMenu`

### Important checkout flow changes:

- In the dialog one more phase has been added between product view and checkout view: a cart phase 
- Checkout product list is no longer editable by default (unless modular checkout is in use and `editable` attribute is set to `true` on `CheckoutProductList` component)
- For embedded integrations we recommend using the `CartPage` component to present and modify cart contents (checkout page should not be editable unless absolutely required)

### Configuration

- The config option `disableDialog` is no longer supported. It should be replaced by building an embedded product page (with `customUrls.productUrl` config option)
- `openOldDialog` and `openOldCheckout` config options are no longer supported (the old dialog is no longer available)
- `useCheckoutV2` config option has been removed (Chekcout 2.0 is always used when PSP is non-Klarna)
