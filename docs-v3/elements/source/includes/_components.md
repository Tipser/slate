# Components

## Quick Start

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

## Tipser Elements API

### Configuration options of Tipser Elements

Configuration is an object, which should be inserted into `TipserElementsProvider` as `config` prop.

All properties are optional:

| Parameter               | Default   | Description                                                                                                                                                                                    | Example                                    |
| ----------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------     |
| lang                    | `'en-US'` | a locale to be used by the Tipser content. Possible values: `'en-US'`, `'de-DE'`, `'fr-FR'` and `'sv-SE'`. More info at [Language and locale](#language-and-locale)[Environment](#environment) | `'de-DE'`                                  |
| env                     | `'prod'`  | Tipser environment to be used by the Tipser content. Possible values: `'stage'` and `'prod'`. More info at [Environment](#environment)                                                         | `'stage'`                                  |
| defaultAddedToCartPopup | `true`    | Controls default Added To Cart Popup. It appears when user adds a product to the cart. It improves UX by highlighting the action and allowing to navigate quickly to the cart modal window.    | `true` or `false`                          |
| useDefaultErrorHandler  | `true`    | when set to false and error happens, default message won't be displayed                                                                                                                        | see [Adding onError handler](#onerror)     |
| eventsHandlers          | `{}`      | the object of event handlers. See [Event handlers](#event-handlers)                                                                                                                            | `{ onError: console.error.bind(console) }` |
| modalUi                 | `{}`      | Customization of Tipser Dialog. More info at [Parameters for dialog customization](#parameters-for-dialog-customization)                                                                       | `{ hideSearchIcon : true}`                 |
| disableDialog           | `false`   | If set to `true`, a redirect to the product page is done instead of opening product dialogs (read more at: [Embedding Elements in native apps](#embedding-elements-in-native-apps) section)    | `false`                                    |
| disableAnalytics        | `false`   | If set to `true`, all Tipser analytics requests will be blocked (no events to Analytics and stats.tipser.com will be sent)                                                                     | `true`                                     |
| enableCheckoutV2        | `false`   | If set to `true`, the more robust v2 version of Tipser Checkout API is used (recommended)                                                                                                      | `true`                                     |

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

## TipserElementsProvider

The entry point to Tipser Elements (providing a context for other elements living inside it). Every other element documented here needs to be located below `TipserElementsProvider` in the React elements hierarchy.

| prop name | description                                                                                                      | type   | required | default value    |
| --------- | ---------------------------------------------------------------------------------------------------------------  | ------ | -------- | ---------------- |
| posId     | id of Point of sale                                                                                              | string | true     |                  |
| config    | configuration object (see [definition here](#configuration-options))                | object | false    | {}               |
| history   | a history implementation specific for your web framework, needed for soft redirects instead of full page reloads | object | false    | `window.history` |

## Product

Displays a tile or a listing for the product specified by the [productId](#getting-tipser-ids) prop. Comes in three different flavours, described below.

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
| productId | [where to find](#getting-tipser-ids) | string                     | true     | none          |
| viewMode  | enables full or compact product display                       | string ('full', 'compact') | false    | 'full'        |

_example:_

```jsx
<Product productId="5c751cf82d3f3b0001bcec8c" viewMode={"compact"} />
```

[Learn more](#product-element).

## Collection

Renders a collection of product tiles based on [collectionId](#getting-tipser-ids) prop.

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
| collectionId | [where to find](#getting-tipser-ids) | string                                | true     | none          |
| carousel     | enables carousel display                                      | boolean                               | false    | false         |
| imgSize      | changes the size of single product tile                       | string ('small', 'medium' or 'large') | false    | none          |

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

## ModularProduct

A more customisable and feature-rich version <code>Product</code> component. `ModularProduct` component allows you to mix and match the elements that are included in your product view.
In other words, you can build you own version of product view from the existing components like from Lego pieces. And you can even mix in your own components in between.

A minimal working example:

```jsx
<ModularProduct>
    <ProductTitle />
    <ProductPrice />
    <ProductImage />
    <ProductVariantSelector />
    <ProductBuyButton />
</ModularProduct>
```

And a more sophisticated one:

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

<aside class="notice">
It's required that all the product modules are located under <code>ModularProduct</code> in the elements hierarchy.
</aside>

### `ProductContainer`

The default implementation of the main part of the product view, consisting of `ProductImage`, `ProductTitle`, `ProductColorRelations`, `ProductVariantSelector`, `ProductAvailabilityInfo` and `ProductBuyButton`.
It may come handy if you don't want to mess with the main part of the product view, and just need to customize the remaining sections.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductContainer />
  <ProductStyleWithProducts />
  <ProductDescription />
  <ProductSimilarProducts />
</ModularProduct>
```

<img src="/images/modular-product/product_container.png" alt="Product container" width="250"/>

### `ProductTitle`

Displays the name and the brand of the product

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductTitle />
</ModularProduct>
```

  <img src="/images/modular-product/product_title.png" alt="Similar Products Component" width="305"/>

### `ProductPrice`

Displays the price, discount price and unit price ( eg. 2$/100ml, if applicable ) for the product.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductPrice />
</ModularProduct>
```

  <img src="/images/modular-product/product_price.png" alt="Similar Products Component" width="305"/>

### `ProductImage`

Displays the full-size version of the active product image. With some configuration options it can be also used to change the active product image.

<aside class="notice">
<code>ProductImage</code> component must be placed in a container with fixed width and height.
</aside>

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
<code>ProductImage</code> component must be placed in a container with fixed width and height and it will grow to fill that container.
</aside>

### `ProductThumbnails`

Displays the product thumbnails.

<aside class="notice">
<code>ProductThumbnails</code> component must be placed in a container with fixed width and height and it will grow to fill that container.
</aside>

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

### `ProductVariantSelector`

A dropdown listing all variants of the product. When a variant is selected from the list, all the displayed product information will be updated accordingly (only available variants are selectable).

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductVariantSelector />
</ModularProduct>
```

  <img src="/images/modular-product/product_variant_selector.png" alt="Similar Products Component" />

### `ProductAvailabilityInfo`

Displays information related to product availability and delivery, such as:

- product availability
- delivery cost
- delivery time

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductAvailabilityInfo />
</ModularProduct>
```

    <img src="/images/modular-product/product_availability_info.png" alt="Product availability component" width="305"/>
    
### `ProductDescription`

Displays the product text description.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductDescription />
</ModularProduct>
```

  <img src="/images/modular-product/description.png" alt="Product description Component" width="610"/>

### `ProductBuyButton`

A button adding the product to the shopping cart.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductBuyButton />
</ModularProduct>
```

  <img src="/images/modular-product/product_buy_button.png" alt="Product buy button component" width="305"/>
  
<aside class="info">In case the variant has not been yet selected, clicking the button will expand the variant selector instead.</aside>
  
### `ProductSimilarProducts`

An automatically generated list of similar products (basing on text similarity, image similarity, more from the same brand, etc).

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductSimilarProducts />
</ModularProduct>
```

  <img src="/images/modular-product/similar_products.png" alt="Similar Products Component" width="610"/>  

### `ProductColorRelations`

Displays the list of color variants of the product and switches the product view to any of them, when clicked.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductColorRelations />
</ModularProduct>
```

  <img src="/images/modular-product/color_relations.png" alt="Similar Products Component" width="305"/>

### `ProductStyleWithProducts`

A hand-picked list of other products that go well together with the current product.

```jsx
<ModularProduct productId="5c751cf82d3f3b0001bcec8c">
  <ProductStyleWithProducts />
</ModularProduct>
```

  <img src="/images/modular-product/style_with_products.png" alt="Similar Products Component" width="610"/>

## Checkout

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

For more flexibility use `ModularCheckout` component.

## ModularCheckout

The main element providing the checkout context for all of the checkout modules nested under it.

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
</ModularCheckout>
```

A list of supported modules that can be nested under `ModularCheckout`:

### `CheckoutProductList`

A list of items in the current checkout. By default, (unless `readOnly` prop is set to `true`) comes toger with controls allowing the user to remove products and change their quantities in the current checkout. 

Properties:

| prop name | description                                                        | type    | required | default value |
| --------- | ------------------------------------------------------------------ | ------  | -------- | ------------- |
| className | custom CSS class name to apply                                     | string  | false    | none          |
| readOnly  | should removing from cart and changing quantities be blocked?      | boolean | false    | false         |

<aside class="info">Modifications (remove, change quantity) made within <code>CheckoutProductList</code> component are scoped to the current checkout not the shopping cart. This means that after leaving the checkout page, the user will see the same
state of the shopping cart as before entering the checkout.</aside>

### `CheckoutCustomerAddressDelivery`

A form accepting user’s delivery address

<aside class="info">This component is only available for integrations using Stripe as the payment provider. In case of Klarna, <code>CheckoutPayment</code> contains its own fields for entering delivery and billing address</aside>

Properties:

| prop name                       | description                                                                          | type    | values             | required | default value |
| ------------------------------- | ------------------------------------------------------------------------------------ | ------- | ------------------ | -------- | ------------- |
| className                       | custom CSS class name to apply                                                       | string  |                    | false    | none          |
| hideUseAsBillingAddressCheckbox | hides the checkbox allowing to copy delivery address as billing address              | boolean |                    | false    | false         |
| submitBehavior                  | the behaviour of the form after submitting it                                        | enum    | 'collapse', 'none' | false    | 'none'        |
| hideSubmitButton                | hides the "submit" button that collapses the form after filling it with correct data | boolean |                    | false    | false         |

### `CheckoutCustomerAddressBilling`

A form accepting user’s billing address

<aside class="info">This component is only available for integrations using Stripe as the payment provider. In case of Klarna, <code>CheckoutPayment</code> contains its own fields for entering delivery and billing address</aside>

Properties:

| prop name        | description                                                                          | type    | values             | required | default value |
| ---------------- | ------------------------------------------------------------------------------------ | ------- | ------------------ | -------- | ------------- |
| className        | custom CSS class name to apply                                                       | string  |                    | false    | none          |
| submitBehavior   | the behaviour of the form after submitting it                                        | enum    | 'collapse', 'none' | false    | none          |
| hideSubmitButton | hides the "submit" button that collapses the form after filling it with correct data | boolean |                    | false    | false         |
| submitBehavior   | the behavior of the form after submitting it                                         | string  | 'collapse', 'none' | false    | 'collapse'    |

### `CheckoutSummary`

A summary of the total costs and taxes resulting from the checkout

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

<aside class="info">On the US market the taxes will be calculated only after delivery address is filled.</aside>

### `CheckoutPayment`

A payment section, accepting user's payment input (e.g. credit card number). In case of Klarna integrations, this component will additionally contain delivery and billing address forms.

Properties:

| prop name     | description                                                              | type    | values                         | required | default value |
| ------------- | ------------------------------------------------------------------------ | ------- | ------------------------------ | -------- | ------------- |
| className     | custom CSS class name to apply                                           | string  |                                | false    | none          |
| hidePayButton | hides the "pay" button in Stripe payment provider form                   | boolean |                                | false    | false         |
| dependsOn     | lets you render the component depending on the delivery form being valid | string  | 'none', 'validDeliveryAddress' | false    | 'none'        |

### `CheckoutCartPromoCode`

A widget for entering promotion codes

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

### `CheckoutLegal`

A text explaining legal terms of the purchase

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

### `CheckoutOrderProcessing`

A loading animation for checkout processing

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

### `CheckoutOrderConfirmation`

A confirmation page displaying a summary of the completed order

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

### `ModularCheckout.Empty`, `ModularCheckout.New`, `ModularCheckout.Processing` and `ModularCheckout.Confirmed`  

The elements `ModularCheckout.Empty`, `ModularCheckout.New`, `ModularCheckout.Processing` and `ModularCheckout.Confirmed` are helper elements that are used
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

## ModularCart

The main element providing the shopping cart context for all of the shopping cart modules nested under it.

```jsx
import {
  ModularCart,
  CartProductList,
  CartSummary,
} from "@tipser/tipser-elements";

<ModularCart>
    <CartProductList />
    <CartSummary />
</ModularCart>
```

A list of supported modules that can be nested under `ModularCart`:

### `CartProductList`

A list of items in the shopping cart. By default, (unless `readOnly` prop is set to `true`) comes together with controls allowing the user to remove products and change their quantities in the shopping cart.

Properties:

| prop name | description                                                        | type    | required | default value |
| --------- | ------------------------------------------------------------------ | ------  | -------- | ------------- |
| className | custom CSS class name to apply                                     | string  | false    | none          |
| readOnly  | should removing from cart and changing quantities be blocked?      | boolean | false    | false         |

<aside class="info">As opposed to the <code>CheckoutProductList</code>, modifications (remove, change quantity) made within <code>CartProductList</code> component are affecting the shopping cart. 
This means that these changes will be permanent and reflected on every page using the Tipser shopping cart.</aside>

### `CartSummary`

A summary of the total costs and taxes for the products in the shopping cart.

Properties:

| prop name | description                    | type   | required | default value |
| --------- | ------------------------------ | ------ | -------- | ------------- |
| className | custom CSS class name to apply | string | false    | none          |

<aside class="info">On the US market the tax value will not be displayed as the tax value can only be calculated at the checkout phase, after the customer fills the delivery address.</aside>

### `ModularCart.Empty` and `ModularCart.NonEmpty`  

`ModularCart.Empty` and `ModularCart.NonEmpty` are helper elements that are used to conditionally render their children only for a given shopping cart status. If none of these elements is be used, all the elements passed to `ModularCart`
will be rendered for every shopping cart status.

For example, to provide a custom empty cart information:

```jsx
<ModularCart>
    <ModularCart.Empty>The shopping cart is empty, please add some products first!</ModularCart.Empty>
    <ModularCart.NonEmpty>
        <CartProductList />
        <CartSummary />
    </ModularCart.NonEmpty>
</ModularCart>
```

## ProductList

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

## CartIcon

A cart icon element that displays the number of items in your cart and brings the user to the checkout when clicked (either by opening the checkout dialog or by redirecting to the checkout embedded page).

## Store

A component displaying of all your store collections with the store menu and the active collection. We recommend using it on a dedicated subpage on your site.

```jsx
import { Store } from '@tipser/tipser-elements';
 
<Store />
```

### Store menu display

You can choose between two ways of displaying the store menu on the mobile screens. The default one is a native dropdown. If you prefer to use the inline menu instead (the same one as is displayed on other screen sizes), set the `inlineMobileMenu` prop to `true`.

### Updating the browser's URL

By default, the `Store` component saves the active collection in the browser's URL hash part (everything after the `#` symbol in the URL). It allows the users to bookmark the store page or share the URL with others (the same collection will be active in the store when opening the link). To opt-out of this behaviour (e.g. because it interferes with the routing system of your site), set the `disableDeepLinking` prop to `true`.

<aside class="warning">When the active store category is changed, the <code>Store</code> component is updating the top-level page URL (unless <code>disableDeepLinking</code> prop is set to <code>true</code>). For this reason, please make sure that it doesn't interfere with the routing system of your your web framework. For the same reason, it's not recommended to include more than one `Store` on a single page.</aside>

### Supported props

| prop name          | description                                                                             | type    | required | default value |
| ---------          | --------------------------------------------------------------------------------------- | ------  | -------- | ------------- |
| className          | custom CSS class name to apply                                                          | string  | false    | none          |
| inlineMobileMenu   | should the menu be displayed inline on the mobile breakpoint instead of in a dropdown?  | boolean | false    | false         |
| disableDeepLinking | should reflecting the active collection in the hash part of the URL be disabled?        | boolean | false    | false         |

## Imprerative functions

In case you need to open Tipser dialogs from the code or perform operations like adding a Tipser product to cart, we provide a set of JavaScript functions that serve that purpose.

<aside class="info">Typical use case for calling the actions described here is when you want to build your own implementation of some of the components, e.g. the product tile component or the cart icon component.</aside>

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

