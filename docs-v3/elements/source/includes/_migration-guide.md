# Migration guide

Below is the list of all the backwards-incompatible changes between Tipser Elements 2.x and 3.x.

Migrating to 3.x should be as simple as going through this list and replacing all the old calls in your code with the new ones.

<aside type="notice">
Most of the changes described below have been backported to Tipser Elements 2.x, meaning that you can first safely try them out in your current code using 2.x before bumping Tipser Elements version to 3.x.
</aside>

### Configuration changes

- The config option `disableDialog` is no longer supported. It should be replaced by building an embedded product page (with `customUrls.productUrl` config option)
- `openOldDialog` and `openOldCheckout` config options are no longer supported (the old dialog is no longer available)
- `useCheckoutV2` config option has been removed (Checkout 2.0 is always used when PSP is non-Klarna)
- the `useDeepLinking` configuration option has been replaced by `disableDeepLinking` prop on the `Store` component with inverted logic

### Component renames

- `Cart` is renamed to `CartIcon`
- `Checkout` is renamed to `CheckoutPage`
- `CheckoutCartPromoCode` is renamed to `CheckoutPromoCode`
- `CheckoutCartProducts` is renamed to `CheckoutProductList`
- `CheckoutCartSummary` is renamed to `CheckoutSummary`

### Tipser SDK removed

In Tipser Elements 3.x `useTipserSdk()` hook has been removed. Instead, we provide a set of functions available from `useInternalFunctions` hook. Read the [Internal functions](#internal-functions) chapter for more details.

So for example the following snippet of code:

```js
const tipserSdk = useTipserSdk();
tipserSdk.openProductDialog(productId);
```

Needs to be replaced with:

```js
const { goToProduct } = useInternalFunctions();
goToProduct(productId);
```

### Styles inheritance in modal

In Elements 2.x all the basic CSS styles like `font-size`, `font-family`, header sizes, etc, are inherited from the parent page and applied to the Tipser modal.
In Elements 3.0 this behavior has been changed, and a set of "reasonable" styles is applied inside the modal (overriding corresponding styles from the parent page).

In order to activate the old behavior (recommended when migrating from 2.x), the following config option needs to be used:

```js
const elementsConfig = {
    //...
    modalUi: {
        inheritStyles: true;
    }
    //...
}
```  

### Component properties renames

- `inlineMenu` prop in the `Store` component has been renamed to `inlineMobileMenu`

### Checkout flow changes

- In the dialog one more phase has been added between product view and checkout view: a cart phase 
- Checkout product list is no longer editable by default (unless modular checkout is in use and `editable` attribute is set to `true` on `CheckoutProductList` component)
- For embedded integrations we recommend using the `CartPage` component to present and modify cart contents (checkout page should not be editable unless absolutely required)
