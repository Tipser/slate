# Tipser React Elements

Tipser React Elements is a component library from Tipser enabling you to add shoppable content to your React APP with minimal effort. You can add simple components like products with buy buttons, collections of products and articles, but also more complex grids or whole pages.

<aside class="notice">
Not using React? Looking for an overview on Tipser Elements? Go check <a href="#tipser-elements">Tipser Elements</a> docs. This section covers only <strong>React API</strong> for Elements. 
</aside>

---

### Live demo

A working examples of page based on Tipser React Elements can be found on <a href="https://tipser.github.io/tipser-elements-react-bootstrap/" target="_blank">Tipser Elements Bootstrap page</a>.

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

- to provide `history` object to be used by Elements for client side redirects (otherwise all our links/redirects will trigger full page reloads)

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
| disableDialog           | false     | If set to `true`, a redirect to the product page is done instead of opening product dialogs (read more at: [Embedding Elements in native apps](#embedding-elements-in-native-apps) section)    | `false`                                |

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

Element that renders the product title based on Tipser [productId](#getting-tipser-product-id-and-collection-id) passed to the `productId` prop.

The `Product` element supports two display modes (controlled by `viewMode` prop):

- Large product title with variant selector and "add to cart" button, if `viewMode="full"` (default)
- Small product title which when clicked opens a product dialog, if `viewMode="compact"`

| prop name | description                                                   | type                       | required | default value |
| --------- | ------------------------------------------------------------- | -------------------------- | -------- | ------------- |
| productId | [where to find](#getting-tipser-product-id-and-collection-id) | string                     | true     | none          |
| viewMode  | enables full or compact product display                       | string ('full', 'compact') | false    | 'full'        |

_example:_

```jsx
<Product productId="5c751cf82d3f3b0001bcec8c" viewMode={"compact"} />
```

[Learn more](#product-element).

## `Modular Product`

For a more customazible and featured <code>Product</code> component you can use
<code>Modular Product</code> which comes with two main ways of using it:

1). The default pre-defined:

```jsx
<ProductContext productId="5c751cf82d3f3b0001bcec8c" />
```

<div style="display:flex">

<div style="width:50%">
      
<ul>
<p>The main differences between standard <code>Product</code> component and a default <code>Modular Product</code> component is more functionalities such as:</p>

<li><p><code><a href="#color-relations">Color relations:</a></code></p>
  <div>
    <img src="/images/modular-product/color_relations.png" alt="Color Relations" width="250"/>
  </div>
</li>
  
<li><p><code><a href="#style-with">Style-With:</a></code></p>
<div>
<img src="/images/modular-product/style_with_products.png" alt="Style With Component" />
</div>
</li>
<li><p><code><a href="#product-description">Description Module:</a></code></p>
<div>
<img src="/images/modular-product/description.png" alt="Description Component" />
</div>
</li>
<li><p><code><a href="#similar-products">Similar-Products:</a></code></p>
<div>
<img src="/images/modular-product/similar_products.png" alt="Similar Products Component" />
</div>
</li>
<li><p><code><a href="#product-container">Product-Container:</a></code></p>
<div>
<img src="/images/modular-product/product_container.png" alt="Similar Products Component" />
</div>

</li>
</ul>

</div>

<div style="display:flex;justify-content:center;width:50%;align-items: flex-start;">
<img src="/images/modular-product/modular_product_default.png" alt="Modular Product Default" width="250"/>
</div>

</div>
<aside style=margin-top:0 class="notice">As you will see in the <a href="#modular-product-overview"><code>Modular Product Overwiew</code></a> the <a href="#product-container"><code>Product-Container</code></a> module can be split into smaller modules.</aside>

2).Fully customazible and modular:

For a better understanding of what <code>Modular Product</code> is, lets list all the available modules:

<p id="modular-product-overview"><code>Modular Product overview:</code></p>
<img src="/images/modular-product/modular_product_modules.png" alt="Modular Product Default" />

For those users that want to remove or rearrange some of the modules positions, <code>Modular Product</code> allow you do that with slighly different syntax:

```jsx
<ProductContext productId="5c751cf82d3f3b0001bcec8c">
  {(productContext) => (
      <>
        <ProductImage {...productContext} />
        <>
          <ProductTitle {...productContext} />
          <ProductPrice {...productContext} />
          <ColorRelations {...productContext} />
          <ProductVariantSelector {...productContext} />
          <ProductAvailabilityInfo {...productContext} />
          <ProductBuyButton {...productContext} />
        </>
      </>
      <ProductDescription {...productContext} />
      <SimilarProducts {...productContext} />
      <StyleWithProducts {...productContext} />

  )}
</ProductContext>
```

<aside style=margin-top:0 class="notice">Notice that in this syntax there is no <a href="#product-container"></a><code>Product-Container</code> module. All of his children live as a separate modules.</aside>

Or if you want just to change four main modules you can do it with:

```jsx
<ProductContext productId="5c751cf82d3f3b0001bcec8c">
  {(productContext) => (
    <>
      <ProductContainer {...productContext} />
      <StyleWithProducts {...productContext} />
      <ProductDescription {...productContext} />
      <SimilarProducts {...productContext} />
    </>
  )}
</ProductContext>
```

<code>Modules Description:</code>

<h4 id="product-container"><code>Product Container</code></h4>

<img src="/images/modular-product/product_container.png" alt="Similar Products Component" width="250"/>

Component that is displaying all the necessary informations about a product and the only one that have sub-modules you can fully remove or rearrange:

<h4><code>ProductImage</code></h4>
  Wyświetla zdjęcie produktu oraz thumbnailsy (dla wersji desktopowej)

<div style=display:flex;>
  <div style=display:flex;flex-direction:column;>
    <p>Wersja desktopowa:</p>
    <img src="/images/modular-product/product_image.png" alt="Product Image" width="305"/>
  </div>

  <div style=display:flex;flex-direction:column;margin-left:20px;>
    <p>Wersja mobile:</p>
    <img src="/images/modular-product/product_image_mobile.png" alt="Product Image" width="265"/>
  </div>
</div>

<h4><code>Product Title</code></h4>
  Displays the name and the brand of the product

  <img src="/images/modular-product/product_title.png" alt="Similar Products Component" width="305"/>

<h4><code>Product Price</code></h4>
  Displays price, discount price and unit price ( eg. 2$/100ml, if applicable ) for the product

  <img src="/images/modular-product/product_price.png" alt="Similar Products Component" width="305"/>

<h4 id="color-relations"><code>Color Relations</code></h4>
  Module for displaying and picking other color variants

  <img src="/images/modular-product/color_relations.png" alt="Similar Products Component" width="305"/>

<h4><code>Variant Selector</code></h4>
  Module for selecting the variant. Only available variants are selectable
  When a variant is selected all the information (price, description, etc) will be updated for the selected variant

  <img src="/images/modular-product/product_variant_selector.png" alt="Similar Products Component" />

<h4><code>Availability Info</code></h4>
  Module for displaying product availability such as:
  <ul>
  <li>product availability</li>
  <li>delivery cost</li>
  <li>delivery time</li>
  </ul>
    <img src="/images/modular-product/product_availability_info.png" alt="Similar Products Component" width="305"/>
   
<h4><code>Add To Cart button</code></h4>
  Module for adding to cart product. Kiedy dany posiada warianty, kliknięcie buttona add-to-cart powoduje rozwinięcie się dropdowna z wariantami.

  <img src="/images/modular-product/product_buy_button.png" alt="Similar Products Component" width="305"/>

  <h4 id="product-description"><code>Description</code></h4>
  Module displaying product description.

  <img src="/images/modular-product/description.png" alt="Similar Products Component" width="610"/>

 <h4 id="style-with"><code>Style With</code></h4>
  Editable list for a products that can be shown on a main page.
  List of products go well together with the current product, hand-picked by yourself.

  <img src="/images/modular-product/style_with_products.png" alt="Similar Products Component" width="610"/>

   <h4 id="similar-products"><code>Similar Products</code></h4>
  Lista produktów wybierana przez algorytm tipsera.

  <img src="/images/modular-product/similar_products.png" alt="Similar Products Component" width="610"/>

## `Product List`

It is an element that is displayed in the same way as the `Collection`, but instead of the collection Id, you need to pass the array of `productId`s. and optional `carousel` and `imgSize`.

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

## `Checkout`

Element that displays the checkout component with all necessary elements to make the purchase take place.
It is a HTML widget displaying a whole Checkout component allowing a user to make a purchase on the POS site, using Tipser infrastructure. The Checkout component can be used in two ways:

- Stand-alone `Checkout` react component displayed on one site;

- Modular Checkout component displaying parts of it as different react Components in a custom order on different subsites;

### Stand-alone Checkout

To display `Checkout` as **stand-alone component**, all you need to do is to place it in your code like any other Tipser Elements React components:

```jsx
import { Checkout } from '@tipser/tipser-elements';
 ...
<Checkout />
```

The component will be rendered on Your site as shown below:
[![](checkout_component.png)](/images/checkout_component.png)

### Modular Checkout

More advanced way of embedding Tipser Checkout on your page, to be used if you need more control over the Checkout experience.

The `Checkout` consists of several React components:

```jsx
<Checkout>
    {(checkout: CheckoutData) => (
      <CartProducts {...checkout} />
      <CustomerAddressDelivery {...checkout} />
      <CartPromoCode {...checkout} />
      <CartSummary {...checkout} />
      <CheckoutPayment {...checkout} />
      <CustomerAddressBilling {...checkout} />
    )}
</Checkout>
```

To connect them together, you need to place them in a wrapper component `<Checkout/>` and pass all the data via props `{...checkout}`:

```jsx
import React from "react";
import { Checkout, CheckoutData } from "@tipser/tipser-elements/dist/all";
import { Route, Switch, withRouter } from "react-router";

export const CheckoutMultipage = withRouter(({ match }) => (
  <div>
    <div className="te-multipage-label">Checkout multipage</div>
    <Checkout>
      {(checkout: CheckoutData) => (
        <Switch>
          <Route path={`${match.url}/step-1`}>
            <CheckoutPage1 checkout={checkout} />
          </Route>
          <Route path={`${match.url}/step-2`}>
            <CheckoutPage2 checkout={checkout} />
          </Route>
        </Switch>
      )}
    </Checkout>
  </div>
));

const CheckoutPage1 = ({ checkout }) => (
  <>
    <h2>Step 1</h2>
    <CartProducts {...checkout} />
    <CustomerAddressDelivery {...checkout} />
    <CartSummary {...checkout} />
  </>
);

const CheckoutPage2 = ({ checkout }) => (
  <>
    <h2>Step 2</h2>
    <CartPromoCode {...checkout} />
    <CheckoutPayment {...checkout} />
  </>
);
```

Feel free to position the checkout components in any order that suits your UX needs.

- **Cart Products**
  A list of products with such details as price, quantity and delivery cost.

- **Customer Address Delivery**
  Component with cutomer's adderss delivery details. It is obligatory with Stripe as payment service provider. When it's filled with information in the right format, it enables the Checkout Payment component.

- **Cart Promo Code**
  Enables the user to use promotion code for discounts and other campaign benefits.

- **Cart Summary**
  Financial details of the transaction including taxes, discounts, delivery cost, etc.

- **Checkout Payment**
  Component connected to payment service provider.

- **Customer Address Billing**
  Component with cutomer's billing details.

- **Legal Component**
  Displays any necessary legal information required by law, provided by POS and stored in the POS' Tipser account.

- **Order Confirmation**
  Final step in the checkout - confirms the purchase and displays the delivery details, purchased items and payment summary.

```

```

```

```

```

```
