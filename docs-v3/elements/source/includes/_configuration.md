#Configuration


Tipser Script initialization function accepts configuration object as a second parameter. The same configuration can be passed to the `config` prop of `TipserElementsProvider`.

```javascript
const tipserElements = tipser.elements("59e86b79b8f3f60a94ecd26a", {primaryColor: "#222"});
```

All the available configuaration options are: 

```javascript
const configurationOptions = {
  primaryColor: "#0000FF",
  env: "stage",
  lang: 'en-US',
  addToCartSettings: {
      directToCheckoutMode: false,
  },
  customLabels: {
    buy: "buy now!",
    unavailable: "not available",
    add_to_cart: "add to shopping bag",
    choose_variant: "available variants",
    out_of_stock: "magazine supplies finished",
  },
  posData: {
    key: "value"
  },
  customUrls: {
    productBaseUrl: (productId) => `/product-page?productId=${productId}`,
    checkoutConfirmationUrl: "/checkout-confirmation",
    checkoutUrl: "/checkout",
  },
  prePopulatedAddress: {
      delivery: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'youremail@email.com',
        zipCode: '12345',
        city: 'Ankeborg',
        street: 'Stårgatan 1',
        country: 'Sweden',
        state: '',
        phoneNumber: '0765260000'
      },
      billing: {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'billing@w.pl',
        zipCode: '12345',
        city: 'Ankeborgen',
        street: 'Stårgatan 1',
        country: 'Sweden',
        state: '',
      },
  },
  modalUi: {
    hideSimilarProducts: true,
  },
  addToCartPopup: {
    className: "custom-className",
    duration: 5000;
  };
}
```
They will be described in the following sections.

***

## Primary Color

If you'd like to unify our design with your own color-theme, you can use our primary color configuration option to change the color of `buy` buttons in Product and indicator of items number in Cart. You only need to make sure to use the right hex color code.

```javascript
const elementsConfig = {primaryColor: "#5F9F9F"};
```

[![](primary-color.png)](/images/primary-color.png)

<aside class="notice">
If your primary color is bright, you may consider changing also the text color for elements like buttons via CSS overrides of element's specific class [(examples)](#customizing-tipser-elements-styles).
</aside> 


***

## Environment

```js
const elementsConfig = {env: "stage"};
```

By default, Tipser Elements connect to production Tipser environment. Yet if testing environment is preferred (e.g. in order to do test purchase), then it can be customized with env parameter in Tipser options, which accept the following values:

- **prod**
- **stage**

***

## Language and locale

`lang` configuration option specifies the language to be used. Supported languages are currently: `en-US`, `en-GB`, `de-DE`, `de-DE-formal`, `fr-FR`, `fi-FI` and `sv-SE`.
     
```js
const elementsConfig = {lang: 'en-US'};
```     

It affects all the localizable texts in the UI - buy buttons, store, shopping cart and checkout. It does not affect the currency in which the customer will pay for the product.

***


## Direct to checkout mode

When the`addToCartSettings.directToCheckoutMode` option is set to `true`, then clicking the "add to cart" button on product listing component will bring the user directly to checkout.

***

## Add to cart popup

```js
const elementsConfig = {
  addToCartPopup: {
    className: "custom-className",
    duration: 5000
  }
};
```
- `className` adds a custom class name to the "added to cart" popup
- `duration` the amount of time (in ms) to keep "added to cart" popup visible

***

## Custom Labels

If you want to override our default text labels with your own, you can do it via `customLabels` option. 

Currently supported options: 

```js
const elementsConfig = {
    customLabels: {
      buy: "buy now!", //displated at the button at the bottom of product tile, originally "buy"
      add_to_cart: "add to shopping bag", //displayed at product details, originally "add to cart"
      choose_variant: "available variants", //displayed at product details, originally "choose variant"
      out_of_stock: "sold out", //displayed at product tile and product details for out of stock products, originally "out of stock"
    }
};
```

*Example:*
[![](custom-label.png)](/images/custom-label.png)

***

## POS data

Go to [this](#adding-pos-data) section to see the usage.

***

## Custom Urls

To fully embed the Tipser `Product Page` or the `Checkout` on your site, please use these configuration options to determine the relative path directing to them.

```javascript
const elementsConfig = {
    customUrls: {
       productBaseUrl: (productId) => `/product-page?productId=${productId}`,
       checkoutUrl: "/checkout",
       checkoutConfirmationUrl: "/checkout-confirmation",
    }
}
```
***

## Prepopulated address data

If you would like to use your logged-in User's data to prepopulate address data of the payment provider, you can pass it on via Tipser config `prePopulatedAddress` option.

```javascript
const elementsConfig = {
    prePopulatedAddress: {
      delivery: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'youremail@email.com',
        zipCode: '12345',
        city: 'Ankeborg',
        street: 'Stårgatan 1',
        country: 'Sweden',
        state: '',
        phoneNumber: '0765260000'
      },
      billing: {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'youremail@email.com',
        zipCode: '',
        city: 'Ankeborgen',
        street: 'Stårgatan 1',
        country: 'Sweden',
        state: '',
      },
    },
}
```

To add the address data dynamically, please use the [`updateConfig`](#updateconfig)function.

##Parameters for modal customization
Hiding the similar products section in the product dialog:

```js
const elementsConfig = {
    modalUi: {
      hideSimilarProducts: true, //by default, the similar products section is visible
    }
};
```

Enabling styles inheritance:

```js
const tipserScriptConfig = {
    modalUi: {
      hideSimilarProducts: true, //by default, the similar products section is visible
    }
};
```

Starting with Tipser Script 3.0 a set of default styles (`font-size`, `font-family`, header sizes, etc) is applied inside the Tipser modal (overriding corresponding styles from the parent page). The configuration option above disables the default styles in favour of using the styles inherited from the parent page.

