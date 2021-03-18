# Tipser Elements

Tipser Elements is a component library from Tipser enabling you to add shoppable content to your React APP with minimal effort. You can add simple components like products with buy buttons, collections of products and articles, but also more complex grids or whole pages.

<aside class="notice">
Not using React? Looking for an overview on Tipser Elements? Go check <a href="#tipser-script">Tipser Script</a> docs. This section covers only <strong>React API</strong> for Elements. 
</aside>

---

### Live demo

A working examples of page based on Tipser Elements can be found on <a href="https://tipser.github.io/tipser-elements-react-bootstrap/" target="_blank">Tipser Elements Bootstrap page</a>.

The code of that page is available as a GitHub <a href="https://github.com/Tipser/tipser-elements-react-bootstrap" target="_blank">Tipser Elements Bootstrap project</a>. Feel free to checkout it and play with it on your local environment!

---

## Quick React Start

This quick guide explains how to intialize and render Tipser React Elements on your React app. It requires you to have a publisher account created in order to get the `posId`, as well as have some collections created in your shop <a href="https://app.tipser.com/" target="_blank">here</a>.

If you're all set up, follow this three steps to rock on your app with Tipser React Elements!

---

### Instalation

Add the library to your project:

`npm install --save @tipser/tipser-elements`

---

### Import Tipser React Elements

The following lines of code import Tipser Elements to your project:

```jsx
import { Product, TipserElementsProvider } from "@tipser/tipser-elements"; // Imports all the needed React components
import "@tipser/tipser-elements/dist/index.css"; // Imports the base set of CSS styles (can be overriden)
```

Below is a full example illustrating how can you combine Tipser Elements with your own application:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import {
  Product,
  Cart,
  Store,
  TipserElementsProvider,
} from "@tipser/tipser-elements";
import history from "path/to/your/history"; // path to your history object that has been passed to react-router'
// import CSS files for Tipser Elements
import "@tipser/tipser-elements/dist/index.css";

// simple configuration
const config = {
  lang: "en-US",
  primaryColor: "#0000FF",
};

ReactDOM.render(
  <TipserElementsProvider
    posId="59e86b79b8f3f60a94ecd26a"
    config={config}
    history={history}
  >
    <header>
      <nav>
        Welcome to my store!
        <Cart />
      </nav>
    </header>
    <main>
      <Product productId="5ba2334a781baa0001ccdffc" />
      <Store />
    </main>
    <footer>
      <span>This is the footer</span>
    </footer>
  </TipserElementsProvider>,
  document.getElementById("root")
);
```

Please make sure:

- your HTML document contains an element of id `root` (`<div id="root"/>`) so that React can mount the app to your HTML document

- to provide `history` object on which we can rely for client side routing, when not provided routing is based on `window.history`

- import CSS files (`import '@tipser/tipser-elements/dist/index.css'`).

Also, check our [configuration](#configuration-options) options.

<aside class="success">Great job! You're all set up with React Elements. For the reference of all Tipser React Elements, check below section.</aside>

---

## API reference of Tipser React Elements

### `TipserElementsProvider`

Entry point to Tipser Elements (creating a context for other Elements);

| prop name | description                                                                                       | type   | required | default value    |
| --------- | ------------------------------------------------------------------------------------------------- | ------ | -------- | ---------------- |
| posId     | id of Point of sale                                                                               | string | true     |
| config    | configuration object (see [definition here](#all-configuration-options-of-tipser-react-elements)) | {}     | false    | {}               |
| history   | history object                                                                                    | {}     | false    | `window.history` |

#### `TipserElement`

Generic Element that can render any Contentful content that's fed as a prop to the element.

### All configuration options of Tipser React Elements

Configuration is an object, which should be inserted into `TipserElementsProvider` as `config` prop.

All properties are optional:

| Parameter               | Default   | Description                                                                                                                                                                                    | Example                                |
| ----------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------- |
| lang                    | `'en-US'` | a locale to be used by the Tipser content. Possible values: `'en-US'`, `'de-DE'`, `'fr-FR'` and `'sv-SE'`. More info at [Language and locale](#language-and-locale)[Environment](#environment) | `'de-DE'`                              |
| env                     | `'prod'`  | Tipser environment to be used by the Tipser content. Possible values: `'stage'` and `'prod'`. More info at [Environment](#environment)                                                         | `'stage'`                              |
| defaultAddedToCartPopup | `true`    | Controls default Added To Cart Popup. It appears when user adds a product to the cart. It improves UX by highlighting the action and allowing to navigate quickly to the cart modal window.    | `true` or `false`                      |
| useDefaultErrorHandler  | `true`    | when set to false and error happens, default message won't be displayed                                                                                                                        | see [Adding onError handler](#onerror) |
| eventsHandlers          | `{}`      | the object of event handlers. See [Event handlers](#event-handlers)                                                                                                                            | `object`                               | { onError: console.error.bind(console) } |
| useDeepLinking          | `true`    | Makes Shop element to use hash navigation when switching between categories. More info at [Use Deep Linking](#deep-linking):                                                                   | `false`                                |
| modalUi                 | `{}`      | Customization of Tipser Dialog. More info at [Parameters for dialog customization](#parameters-for-dialog-customization)                                                                       | `{ hideSearchIcon : true}`             |
| disableDialog           | `false`   | If set to `true`, a redirect to the product page is done instead of opening product dialogs (read more at: [Embedding Elements in native apps](#embedding-elements-in-native-apps) section)    | `false`                                |
| disableAnalytics        | `false`   | If set to `true`, all Tipser analytics requests will be blocked (no events to Analytics and stats.tipser.com will be sent) 

### Event Handlers

```js
let tipserConfig = {
  lang: "en",
  primaryColor: "#FF0000",
  // ----- EVENT HANDLING START
  useDefaultErrorHandler: true,
  eventsHandlers: {
    onError: (error) => {
      console.log(error);
    },
    onAddToCart: ({ cartSize, product }) => {
      console.log("Hurray, you have added item to cart. ", product);
      console.log("Your cart size is now. ", cartSize);
    },
  },
  // -- EVENT HANDLING END
};

// ... as in example above class App extends Component { ... }
```

Event handlers may be passed as a part of `config` option of `TipserElementsProvider`. There is a number of events exposed for developer.

| Handler name | description                                                                     | params                                                                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onError      | Main goal of this handler is to add additional behavior when the error appears. | object of type EventError (see [EventError](#event-error-interface)                                                                                                                                              |
| onAddToCart  | when product is being added to cart event is triggered                          | object of type {cartSize, product} where cartSize is a current size of cart after adding to cart and product is a product object with properties see (see [TipserProductModel](#tipser-product-model-interface)) |

### Event Error interface

```js
export interface EventError {
  type?: string;
  id?: string;
  message?: string;
  stack?: string;
}
```

Param of `onError` handlers

### Tipser Product Model interface

```js
export interface TipserProductModel {
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

When onAddToCart is being dispatched the handlers are triggered with object with cart size of type string and product of type TipserProductModel.

### Components

Components are the building blocks of Tipser Elements. Any components need to be a descendant of **TipserElementsProvider** component.

`Collection`<br>
`Product`<br>
`ProductList`<br>
`Cart`<br>
`Store`<br>
`Checkout`<br>

## `Collection`

Element that renders a collection of product tiles based on [collectionId](#getting-tipser-product-id-and-collection-id) prop.

If the collection has many elements and you want to display it in one row as a collection, you need to add `carousel` prop. You can also use 'imgSize' prop to control the size of displayed product tiles. [Learn more](#collection-element).

_example:_

```jsx
<Collection
  collectionId={"5b2788909d25801adcb23f4f"}
  carousel
  imgSize={"small"}
/>
```

| prop name    | description                                                   | type                                  | required | default value |
| ------------ | ------------------------------------------------------------- | ------------------------------------- | -------- | ------------- |
| collectionId | [where to find](#getting-tipser-product-id-and-collection-id) | string                                | true     | none          |
| carousel     | enables carousel display                                      | boolean                               | false    | false         |
| imgSize      | changes the size of single product tile                       | string ('small', 'medium' or 'large') | false    | none          |

## `Product`

Displays a tile or a listing for the product specified by the [productId](#getting-tipser-product-id-and-collection-id) prop. Comes in three different flavours, described below.

**Product tile** - a small, rectangular product preview with the title, the price and the buy button. When clicked (over the buy button or anywhere else), it opens a dialog with product details.

Activated by `viewMode="compact"`.

_Example:_

[![](compact-product.png)](/images/compact-product.png)

**Full product view** - a larger, more detailed and better exposed product view, typically occupying the full width of the article. Allows the user to add the product to cart without opening the product dialog (which means less steps needed by the user to purchase the product). With

Activated by `viewMode="full"` (or skipping the `viewMode` prop, as this is the default value).

_Example:_

[![](full-product.png)](/images/full-product.png)

| prop name | description                                                   | type                       | required | default value |
| --------- | ------------------------------------------------------------- | -------------------------- | -------- | ------------- |
| productId | [where to find](#getting-tipser-product-id-and-collection-id) | string                     | true     | none          |
| viewMode  | enables full or compact product display                       | string ('full', 'compact') | false    | 'full'        |

_example:_

```jsx
<Product productId="5c751cf82d3f3b0001bcec8c" viewMode={"compact"} />
```

[Learn more](#product-element).

## ProductPage

A full-sized product component to be used on a dedicated page.

```jsx
<ProductPage productId="5c751cf82d3f3b0001bcec8c">
```

_Example:_

[![](modular-product/modular_product_default.png)](/images/modular-product/modular_product_default.png)

<aside class="notice">
This component renders the same product view that is displayed inside the product modal.
</aside>

Properties:

| prop name | description                            | type   | required | default value |
| --------- | -------------------------------------- | ------ | -------- | ------------- |
| productId | the Tipser id of the product to render | string | true     |

## Modular Product

This is a more customisable and feature-rich version <code>Product</code> component.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <div className="top-container">
    <div className="left-column">
      <ProductThumbnails direction="vertical">
      <ProductImage />
    </div>
    <div className="right-column">
      <ProductTitle />
      <ProductPrice />
      <ProductColorRelations />
      <ProductVariantSelector />
      <ProductAvailabilityInfo />
      <ProductBuyButton />
    </div>
  </div>
  <div className="bottom-container">
    <ProductDescription />
    <ProductSimilarProducts />
    <ProductStyleWithProducts />
  </div>
</ModularProduct>
```

`ModularProduct` component allows you to mix and match the elements that are included in your product view.
In other words, you can build you own version of product view from the existing components like from Lego pieces. And you can even mix in your own components in between.

Below is the list of all of the available modules:

<img src="/images/modular-product/modular_product_modules.png" alt="Modular Product Default" />

You can build your product view as in the following example.

<aside class="notice">
It's important that all the lower-level modules are located under <code>ModularProduct</code> in the elements hierarchy. If this rule is not respected, the Elements code will throw an error message informing about the problem.
</aside>

In case you don't want to mess with the main part of the product view,
and just want to control the four main sections, you can use the `ProductContainer` component.

### Product Container

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductContainer />
  <ProductStyleWithProducts />
  <ProductDescription />
  <ProductSimilarProducts />
</ModularProduct>
```

<img src="/images/modular-product/product_container.png" alt="Product container" width="250"/>

The default implementation of the main part of the product view, consisting of `ProductImage`, `ProductTitle`, `ColorRelations`, `ProductVariantSelector`, `ProductAvailabilityInfo` and `ProductBuyButton`.

### Product Image

Displays the full-size version of the active product image. With some configuration options it can be also use to change the active product image.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <div>
    <ProductImage enableDots enableArrows />
  </div>
</ModularProduct>
```

  <img src="/images/modular-product/product_image_props.png" alt="Product Image" width="305"/>

| prop name      | type    | description                                                 | default |
| -------------- | ------- | ----------------------------------------------------------- | ------- |
| enableSwipe    | boolean | enables swipe functionality (recommended for touch devices) | false   |
| swipeAnimation | boolean | add animation when changing image from thumbnails           | false   |
| enableArrows   | boolean | show left and right arrows for changing images              | false   |
| enableDots     | boolean | show slider bullet dots                                     | false   |
| className      | string  | custom CSS class name to apply                              | none    |

<aside class="notice">
ProductImage component will always expand to the 100% width and height of its parent container.
</aside>

### Product Thumbnails

Displays the product thumbnails.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <div>
    <ProductThumbnails />
  </div>
</ModularProduct>
```

  <img src="/images/modular-product/product_thumb_horizontal.png" alt="Product Thumbnails horizontal" width="365"/>

<aside class="notice">
In the <b>horizontal</b> mode thumbnails will always expand to 100% of the width and height to its parent container and automatically adjust the number of displaying thumbnails depending on the width, height and ratio of its parent container.
</aside>

| prop name | type                           | description                                         | default      |
| --------- | ------------------------------ | --------------------------------------------------- | ------------ |
| imageFit  | 'contain' &#124; 'cover'       | changes the background-size property                | 'cover'      |
| direction | 'vertical' &#124; 'horizontal' | changes the orientation of the thumbnails container | 'horizontal' |
| className | string                         | custom CSS class name to apply                      | none         |

<img src="/images/modular-product/product_thumb_vertical.png" alt="Product Thumbnails vertical" height="364"/>

<aside class="notice">In the <b>vertical</b> mode a single thumbnail will always have a fixed width of 100px, so to change the number of the thumbnails you should change only the height of its parent container.</aside>

### Product Title

Displays the name and the brand of the product

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductTitle />
</ModularProduct>
```

  <img src="/images/modular-product/product_title.png" alt="Similar Products Component" width="305"/>

### Product Price

Displays the price, discount price and unit price ( eg. 2$/100ml, if applicable ) for the product.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductPrice />
</ModularProduct>
```

  <img src="/images/modular-product/product_price.png" alt="Similar Products Component" width="305"/>

### Color Relations

Displays the list of color variants of the product and switches the product view to any of them, when clicked.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductColorRelations />
</ModularProduct>
```

  <img src="/images/modular-product/color_relations.png" alt="Similar Products Component" width="305"/>

### Variant Selector

A dropdown listing all variants of the product. When a variant is selected from the list, all the displayed product information will be updated accordingly (only available variants are selectable).

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductVariantSelector />
</ModularProduct>
```

  <img src="/images/modular-product/product_variant_selector.png" alt="Similar Products Component" />

### Availability Info

Displays information related to product availability and delivery, such as:

  <ul>
  <li>product availability</li>
  <li>delivery cost</li>
  <li>delivery time</li>
  </ul>

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductAvailabilityInfo />
</ModularProduct>
```

    <img src="/images/modular-product/product_availability_info.png" alt="Product availability component" width="305"/>

### Add To Cart button

A button adding the product to the shopping cart. In case the variant has not been yet selected, clicking the button will expand the variant selector instead.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductBuyButton />
</ModularProduct>
```

  <img src="/images/modular-product/product_buy_button.png" alt="Product buy button component" width="305"/>

### Description

Displays the product text description.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductDescription />
</ModularProduct>
```

  <img src="/images/modular-product/description.png" alt="Product description Component" width="610"/>

### Style With Products

A hand-picked list of other products that go well together with the current product.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductStyleWithProducts />
</ModularProduct>
```

  <img src="/images/modular-product/style_with_products.png" alt="Similar Products Component" width="610"/>

### Similar Products

An automatically generated list of similar products (basing on text similarity, image similarity, more from the same brand, etc).

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductSimilarProducts />
</ModularProduct>
```

  <img src="/images/modular-product/similar_products.png" alt="Similar Products Component" width="610"/>

## Checkout Element

A predefined checkout component with all necessary elements (product list, user address form, payment widget, etc) to make the purchase possible.

```jsx
import { Checkout } from '@tipser/tipser-elements';
 ...
<Checkout />
```

The above code will render more or less the following output:
[![](checkout_component.png)](/images/checkout_component.png)

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

## Modular Checkout Element

For more flexibility use `ModularCheckout` component.

```jsx
import {
  ModularCheckout,
  CheckoutCartProducts,
  CheckoutCustomerAddressDelivery,
  CheckoutPayment,
  CheckoutOrderProcessing,
  CheckoutOrderConfirmation,
} from "@tipser/tipser-elements";

<ModularCheckout>
  <ModularCheckout.New>
    <CheckoutCartProducts />
    <CheckoutCustomerAddressDelivery />
    <CheckoutPayment />
  </ModularCheckout.New>

  <ModularCheckout.Processing>
    <CheckoutOrderProcessing />
  </ModularCheckout.Processing>

  <ModularCheckout.Empty>
    <div>Your cart is empty!</div>
  </ModularCheckout.Empty>

  <ModularCheckout.Confirmed>
    <CheckoutOrderConfirmation />
  </ModularCheckout.Confirmed>
</ModularCheckout>;
```

`ModularCheckout` is the main element providing the product context for all of the checkout modules nested under it.

A list of supported modules that can be nested under `ModularCheckout`:

### Checkout Cart Products

`<CheckoutCartProducts />`
A list of items in the current checkout

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

### Checkout Customer Address Delivery

`<CheckoutCustomerAddressDelivery />`
A form accepting user’s delivery address

Properties:

| prop name                       | description                                                                          | type    | values             | required | default value |
| ------------------------------- | ------------------------------------------------------------------------------------ | ------- | ------------------ | -------- | ------------- |
| className                       | custom CSS class name to apply                                                       | string  |                    | false    | none          |
| hideUseAsBillingAddressCheckbox | hides the checkbox allowing to copy delivery address as billing address              | boolean |                    | false    | false         |
| submitBehavior                  | the behaviour of the form after submitting it                                        | enum    | 'collapse', 'none' | false    | 'none'        |
| hideSubmitButton                | hides the "submit" button that collapses the form after filling it with correct data | boolean |                    | false    | false         |

### Checkout Customer Address Billing

`<CheckoutCustomerAddressBilling />`
A form accepting user’s billing address

Properties:

| prop name        | description                                                                          | type    | values             | required | default value |
| ---------------- | ------------------------------------------------------------------------------------ | ------- | ------------------ | -------- | ------------- |
| className        | custom CSS class name to apply                                                       | string  |                    | false    | none          |
| submitBehavior   | the behaviour of the form after submitting it                                        | enum    | 'collapse', 'none' | false    | none          |
| hideSubmitButton | hides the "submit" button that collapses the form after filling it with correct data | boolean |                    | false    | false         |
| submitBehavior   | the behavior of the form after submitting it                                         | string  | 'collapse', 'none' | false    | 'collapse'    |

### Checkout Cart Summary

`<CheckoutCartSummary />`
A summary of the total costs resulting from the checkout

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

### Checkout Payment

`<CheckoutPayment />`
A payment section, accepting user's payment input (e.g. credit card number)

Properties:

| prop name     | description                                                              | type    | values                         | required | default value |
| ------------- | ------------------------------------------------------------------------ | ------- | ------------------------------ | -------- | ------------- |
| className     | custom CSS class name to apply                                           | string  |                                | false    | none          |
| hidePayButton | hides the "pay" button in Stripe payment provider form                   | boolean |                                | false    | false         |
| dependsOn     | lets you render the component depending on the delivery form being valid | string  | 'none', 'validDeliveryAddress' | false    | 'none'        |

### CheckoutCartPromoCode

`<CheckoutCartPromoCode />`
A widget for entering promotion codes

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

### Checkout Legal

`<CheckoutLegal />`
A text explaining legal terms of the purchase

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

### Checkout Order Processing

`<CheckoutOrderProcessing />`
A loading animation for checkout processing

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

### Checkout Order Confirmation

`<CheckoutOrderConfirmation />`
A confirmation page displaying a summary of the completed order

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

The elements `ModularCheckout.New`, `ModularCheckout.Processing`, `ModularCheckout.Empty` and `ModularCheckout.Confirmed` are helper elements that are used
to conditionally render their children only for a given checkout status. If none of these elements, will be used, all the elements passed to `ModularCheckout`
will be rendered for every checkout status.

For example:

```jsx
<ModularCheckout.Confirmed>
  <CheckoutOrderConfirmation />
</ModularCheckout.Confirmed>
```

This will guarantee that the `CheckoutOrderConfirmation` module is only displayed if the current checkout status is `confirmed`,
that is, that the payment has been successfully processed.

Properties:

No properties supported.

### Multi-step `ModularCheckout`

It is possible to spread the modular checkout over several pages. The only requirement is to keep the `Checkout` element as a parent for all of the routes
that are using any of the checkout modules described before.

The example below illustrates how to do it with the `react-router` library.

```jsx
import React from "react";
import { Checkout } from "@tipser/tipser-elements";
import { Route, Switch, withRouter } from "react-router";

export const CheckoutMultipage = withRouter(({ match }) => (
  <div>
    <div className="te-multipage-label">Checkout multipage</div>
    <ModularCheckout>
      <Switch>
        <Route path={`${match.url}/step-1`}>
          <CheckoutPage1 />
        </Route>
        <Route path={`${match.url}/step-2`}>
          <CheckoutPage2 />
        </Route>
      </Switch>
    </ModularCheckout>
  </div>
));

const CheckoutPage1 = () => (
  <>
    <h2>Step 1</h2>
    <CartProducts />
    <CustomerAddressDelivery />
    <CartSummary />
  </>
);

const CheckoutPage2 = ({ checkout }) => (
  <>
    <h2>Step 2</h2>
    <CartPromoCode />
    <CheckoutPayment />
  </>
);
```

## `Product List`

A list of products, looking the same as `Collection` component, but instead of the `collectionId`, you need to pass the array of `productId`s. and optional `carousel` and `imgSize` attributes.

_example:_

```jsx
<ProductList
  productIds={[
    "5911c26c8aa0ce3d70cd607b",
    "5c878cc5a6e96d00012e1771",
    "5c878cc5a6e96d00012e1775",
  ]}
/>
```

| prop name  | description                             | type                                  | required | default value |
| ---------- | --------------------------------------- | ------------------------------------- | -------- | ------------- |
| productIds | array of single productIds              | array of strings                      | true     | none          |
| carousel   | enables carousel display                | boolean                               | false    | false         |
| imgSize    | changes the size of single product tile | string ('small', 'medium' or 'large') | false    | none          |

[Learn more](#product-element).

## `Cart`

Element that displays the number of items in your cart and gives the user a way to open the checkout dialog.

## `Store`

Element that displays the store consisting of all your collections.

The `Store` element accepts additional `inlineMenu` prop, which renders mobile menu items inline, as opposed to the default dropdown one.

It can be used as `Store` react component.

```js
import { Store } from '@tipser/tipser-elements';
 ...
<Store />
```

Note: the `Store` component is updating the top-level page URL (when it's tabs are clicked). For this reason, please double check if it won't interfere with your web framework.
For the same reason, it's not recommended to include more than one `<Store />` on a single page.

## Imprerative elements functions

In case you need to open Tipser dialogs from the code or perform operations like adding a Tipser product to cart, we provide a set of JavaScript functions that serve that purpose.

<aside class="info">Typical use case for calling the actions described here is when you want to build your own implementation of some of the components, e.g. the product tile component or the cart icon component.</aside>

<aside class="warning">The below functions will work correctly only with <code>openOldDialog: false</code> setting in the configuration.</aside>

All the below functions are accessible from `useInternalFunctions` hook to every component living in the context of `TipserElementsProvider`.

```js
const { goToProduct, goToCheckout, addToCart, removeFromCart, addToCartAndGoToCheckout } = useInternalFunctions();
```

### goToProduct() function

```js
const { goToProduct } = useInternalFunctions();
goToProduct(productId);
```

Opens the product modal dialog for a product with a given Tipser product id. Alternatively, redirects to the URL defined in `customUrls.baseProductUrl` configuration option if specified.

### goToCheckout() function

```js
const { goToCheckout } = useInternalFunctions();
goToCheckout();
```

Opens the checkout modal dialog. Alternatively, redirects to the URL defined in `customUrls.checkoutUrl` configuration option if specified.

### addToCart(productId) function

```js
const { addToCart } = useInternalFunctions();
addToCart(productId).then(() => {
  console.log("adding to cart successful");
}).catch((e) => {
  console.log("adding to cart failed", e)
});
```

Adds to cart a product with a given Tipser product id. Return a promise 

### removeFromCart(productId) function

```js
const { removeFromCart } = useInternalFunctions();
removeFromCart(productId).then(() => {
    console.log("removing from cart successful");
}).catch((e) => {
    console.log("removing from cart failed", e)
});
```

Adds to cart a product with a given Tipser product id. Returns a promise that will succeed or reject depending on the status of that operation. 

### getCartItems() function

```js
const { getCartItems } = useInternalFunctions();
getCartItems().then((cartItems) => {
    console.log("cart items: ", cartItems)
}).catch((e) => {
    console.log("failed to get cart items", e)
});
```

Returns a Promise that will eventually return a list of all Tipser products currently in the shopping cart.

### addToCartAndGoToCheckout(productId) function

```js
const { addToCartAndGoToCheckout } = useInternalFunctions();
addToCartAndGoToCheckout(productId).then(() => {
   console.log("add to cart and go to checkout successful");
}).catch((e) => {
   console.log("add to cart and go to checkout  failed", e)
});
```

Adds to cart a product with a given Tipser product id and then opens the checkout modal dialog. Alternatively, redirects to the URL defined in `customUrls.checkoutUrl` configuration option if specified. Returns a promise that will succeed or reject depending on the status of that operation. 
