# Tipser React Elements
Tipser React Elements is a component library from Tipser enabling you to add shoppable content to your React APP with minimal effort. You can add simple components like products with buy buttons, collections of products and articles, but also more complex grids or whole pages. 

<aside class="notice">
Not using React? Looking for an overview on Tipser Elements? Go check <a href="#tipser-elements">Tipser Elements</a> docs. This section covers only <strong>React API</strong> for Elements. 
</aside>

***

### Live demo

A working examples of page based on Tipser React Elements can be found on <a href="https://tipser.github.io/tipser-elements-react-bootstrap/" target="_blank">Tipser Elements Bootstrap page</a>.

The code of that page is available as a GitHub <a href="https://github.com/Tipser/tipser-elements-react-bootstrap" target="_blank">Tipser Elements Bootstrap project</a>. Feel free to checkout it and play with it on your local environment! 

***

## Quick React Start
This quick guide explains how to intialize and render Tipser React Elements on your React app. It requires you to have a publisher account created in order to get the `posId`, as well as have some collections created in your shop. For a guide how to manage your collections, check the [Tipser Tools tutorial](#tipser-tools).

If you're all set up, follow this three steps to rock on your app with Tipser React Elements!

*** 

### Instalation
Add the library to your project:

`npm install --save @tipser/tipser-elements`

***

###  Import Tipser React Elements
You can combine Tipser Elements with your own application.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Product, Cart, Store, TipserElementsProvider } from '@tipser/tipser-elements';
import history from 'path/to/your/history'; // path to your history object that has been passed to react-router'
// import CSS files for Tipser Elements
import '@tipser/tipser-elements/dist/index.css'; 

// simple configuration
const config = {
    lang: 'en-US',
    primaryColor: '#0000FF',    
};

ReactDOM.render(
    <TipserElementsProvider posId="59e86b79b8f3f60a94ecd26a" config={config} history={history}>   
        <header>
            <nav>
                Welcome to my store! 
                <Cart />
            </nav>
        </header>
        <main>
            <Product productId="5ba2334a781baa0001ccdffc"/>
            <Store />
        </main>
        <footer>
            <span>This is the footer</span>
        </footer>
    </TipserElementsProvider>, 
    document.getElementById('root'));
```
Please make sure: 

- your HTML document contains an element of id `root` (`<div id="root"/>`) so that React can mount the app to your HTML document 

- to provide `history` object on which we can rely for client side routing, when not provided routing is based on `window.history`

- import CSS files. 

Also, check our [configuration](#configuration-options) options.



<aside class="success">Great job! You're all set up with React Elements. For the reference of all Tipser React Elements, check below section.</aside>

***

## API reference of Tipser React Elements
### `TipserElementsProvider` 
Entry point to Tipser Elements (creating a context for other Elements);

prop name  | description | type  | required | default value 
-----------|-------------|-------|----------|--------------
posId | id of Point of sale | string | true | 
config | configuration object (see [definition here](#all-configuration-options-of-tipser-react-elements)) | {} | false | {}
history | history object | {} | false | `window.history`
 
#### `TipserElement` 
Generic Element that can render any Contentful content that's fed as a prop to the element.

#### `Product` 
Element that renders the product title based on Tipser product ID passed to the `productId` prop. 

The `Product` element supports two display modes (controller by `viewMode` prop):

- Large product title with variant selector and "add to cart" button, if `viewMode="full"` (default)
- Small product title which when clicked opens a product dialog, if `viewMode="compact"`

#### `Cart` 
Element that displays the number of items in your cart and gives the user a way to open the checkout dialog.


#### `Store` 
Element that displays the store consisting of all your collections.



### All configuration options of Tipser React Elements

Configuration is an object, which should be inserted into `TipserElementsProvider` as `config` prop.

All properties are optional:

Parameter | Default | Description | Example
--------- | ------- | ----------- | -------
lang | `'en-US'` | a locale to be used by the Tipser content. Possible values: `'en-US'`, `'de-DE'`, `'fr-FR'` and `'sv-SE'`. More info at [Language and locale](#language-and-locale)[Environment](#environment)| `'de-DE'` 
env | `'prod'` | Tipser environment to be used by the Tipser content. Possible values: `'stage'` and `'prod'`. More info at [Environment](#environment)| `'stage'`
defaultAddedToCartPopup | `true` | Controls default Added To Cart Popup. It appears when user adds a product to the cart. It improves UX by highlighting the action and allowing to navigate quickly to the cart modal window.  | `true` or `false` 
useDefaultErrorHandler | `true` | when set to false and error happens, default message won't be displayed | see [Adding onError handler](#onerror)
eventsHandlers | `{}` | the object of event handlers. See [Event handlers](#event-handlers)  | `object` | { onError: console.error.bind(console) }  
useDeepLinking | `true` | Makes Shop element to use hash navigation when switching between categories. More info at [Use Deep Linking](#deep-linking):  | `false`
modalUi | `{}` | Customization of Tipser Dialog. More info at [Parameters for dialog customization](#parameters-for-dialog-customization)| `{ hideSearchIcon : true}`
disableDialog | false | If set to `true`, a redirect to the product page is done instead of opening product dialogs (read more at: [Embedding Elements in native apps](#embedding-elements-in-native-apps) section) | `false`

### Event Handlers
```js

let tipserConfig = {
    lang: 'en',
    primaryColor: '#FF0000',
    // ----- EVENT HANDLING START
    useDefaultErrorHandler: true,
    eventsHandlers: {
        onError: (error) => {
            console.log(error)
        },
        onAddToCart: ({cartSize, product}) => {
            console.log('Hurray, you have added item to cart. ', product);
            console.log('Your cart size is now. ', cartSize);
        }
    }
    // -- EVENT HANDLING END
};

// ... as in example above class App extends Component { ... }

```
Event handlers may be passed as a part of `config` option of `TipserElementsProvider`. There is a number of events exposed for developer. 


Handler name  | description | params
--------------|-------------|--------
onError | Main goal of this handler is to add additional behavior when the error appears. | object of type EventError (see [EventError](#event-error-interface)
onAddToCart | when product is being added to cart event is triggered | object of type {cartSize, product} where cartSize is a current size of cart after adding to cart and product is a product object with properties see (see [TipserProductModel](#tipser-product-model-interface)) 

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
`Store`<br>
`Cart`<br>
`Checkout`<br>

## Store 
Store component is a HTML widget displaying a list of all Tipser public collections for the POS.   

It can be used with `Store` react component.

```js
import { Store } from '@tipser/tipser-elements';
 ...
<Store />
```

[![](shop_component.png)](/images/shop_component.png)

Note: the `Store` component is updating the top-level page URL (when it's tabs are clicked). For this reason, please double check if it won't interfere with your web framework. 
For the same reason, it's not recommended to include more than one `<Store />` on a single page. 

## Checkout
Is an HTML widget displaying a whole Checkout component allowing a user to make a purchase on the POS site, using Tipser infrastructure. The Checkout component can be used in two ways: 

Stand-alone `Checkout` react component displayed on one site;

Modular Checkout component displaying parts of it as different react Components in a custom order on different subsites;

### Stand-alone Checkout
To display `Checkout` as **stand-alone component**, all you need to do is to place it in  your code like any other Tipser Elements React components:

```js
import { Checkout } from '@tipser/tipser-elements';
 ...
<Checkout />
```
The component will be rendered on Your site as shown below:
[![](checkout_component.png)](/images/checkout_component.png)
 
 
## Modular Checkout
More advanced way of embedding Tipser Checkout on your page, to be used if you need more control over the Checkout experience.

The `Checkout` consists of several React components:

```html
<Checkout>
  <CartProducts />
  <CustomerAddressDelivery />
  <CartPromoCode />
  <CartSummary />
  <CheckoutPayment />
  <CustomerAddressBilling />
</Checkout>
```

To connect them together, you need to place them in a wrapper component `<Checkout/>` and pass all the data via props `{...checkout}`:

```jsx
import React from 'react';
import { Checkout, CheckoutData } from '@tipser/tipser-elements/dist/all';
import { Route, Switch, withRouter } from 'react-router';

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

* **Cart Products**
A list of products with such details as price, quantity and delivery cost. 

[![](cart_products.png)](/images/cart_products.png)

* **Customer Address Delivery**
Component with cutomer's adderss delivery details. It is obligatory with Stripe as payment service provider. When it's filled with information in the right format, it enables the 
Checkout Payment component.
[![](customer_address_delivery.png)](/images/customer_address_delivery.png)


* **Cart Promo Code**
Enables the user to use promotion code for discounts and other campaign benefits.

[![](cart_promotion_code.png)](/images/cart_promotion_code.png)

* **Cart Summary**
Financial details of the transaction including taxes, discounts, delivery cost, etc.

[![](cart_summary.png)](/images/cart_summary.png)

* **Checkout Payment**
Component connected to payment service provider. 
[![](checkout_payment.png)](/images/checkout_payment.png)

* **Customer Address Billing**
Component with cutomer's billing details. 

[![](customer_address_billing.png)](/images/customer_address_billing.png)
