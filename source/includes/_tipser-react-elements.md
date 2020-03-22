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
Make sure your HTML document contains an element of id `root` (`<div id="root"/>`) so that React can mount the app to your HTML document, provide `history` object on which we can rely for client side routing, when not provided routing is based on `window.history`. Also check our [configuration](#configuration-options) options.


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
Element that renders the product given the Tipser product ID as the prop.

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

For example Store component is a HTML widget displaying a list of all Tipser public collections for the POS.   

It can be used with `Store` react component.

```js
import { Store } from '@tipser/tipser-elements';
 ...
<Store />
```

[![](shop_component.png)](/images/shop_component.png)

Note: the `Store` component is updating the top-level page URL (when it's tabs are clicked). For this reason, please double check if it won't interfere with your web framework. 
For the same reason, it's not recommended to include more than one `<Store />` on a single page. 

 
## Customizing Tipser Elements Styles ##

Tipser Elements are the "building blocks" designed to fit your page as much as possible. We created the styling in a way that delivers a nice look & feel from the start, but also allows you to change them easily to fit your unique sense of style. For example, all elements' `font-family` and `font-size` attributes are set to inherit them from the host page. If you need to change some other styles, please overwrite the certain CSS classes.

### Product Card ###

The Product Card is an item used for displaying single `Collection` or `Store` component, among others. The font-family used in the description section of the Product Card is inherited from your website's styles, and the font-size is expressed in the relative `em` units controlled in `.te-product-card` class. The default value used there is `12px`, which you can easily change by adding to your CSS the following style:

```css
.te-product-card {
    font-size: 14px;
}
```

All the description elements (product name, brand and price) will become bigger / smaller according to the value you specify in the `px` unit. If you wish to change single description element, please use its specific class names: 

`.te-product-card-name` <br/>
`.te-product-card-brand`<br/>
`.te-product-card-price`<br/>
and:<br/>
`.te-product-card-sales-price`<br/>
`.te-product-card-price-regular-price`<br/>
for products on sale.


### Cart ###

The Cart component with the cart icon can be placed anywhere on your website. (It is highly advisable to place it in your navigation element among other icons such as search, home etc.) However, if you want to keep it visible at all times, attached to the right side of the viewport, you can use these styles:

```css
.cart-icon {
    position: fixed;
    right: 0;
    top: 121px;
    background: #fff;
    padding: 10px;
    box-shadow: -2px 2px 7px rgba(0,0,0,0.3);
    z-index: 10;
}
```

### Adding Primary color ###

If you'd like to unify our design with your own color-theme, you can use our primary-color [configuration option](#primary-color). If your primary color is a bright one, you might want to change also the text color of the elements with primary color background. For example in buttons by default the color we use is white.

```css

/* if your primary color is bright,
    you may consider changing also the text color for elements like buttons: */
.te-button-text {
    color: #fff;
}
```
If you'd like to change other elements' color as well, please use specific classes to override the styles.

## Server side rendering

If you want to render Tipser-Elements' components on the server side, you can do it in three steps:
1. At the beginning you have to know ids of products and collections that you want to render on specific url.
2. Before rendering you have to prepare the state which contains the data necessary to render specific components. 
It is easy to build this state - our lib includes tool to do it!
3. The state you have to apply to `TipserElementsProvider` as `initialState` prop
4. You have to transfer the state on the frontend side and apply as `initialState` to `TipserElementsProvider` on the frontend side.

### Building the state

We assume that you know ids of products, collections and you know if you want to render Shop component on the specific url.
Let's say that following four variables are defined: `POS_ID`, `PRODUCT_IDS`, `COLLECTION_IDS` and `IS_SHOP_ON_PAGE`.  
Please note that `PRODUCT_IDS`, `COLLECTION_IDS` and `IS_SHOP_ON_PAGE` should depend on URL - different pages can have different products/collections.
To build the state you should use our `StateBuilder` class. You can do it in following way:
```typescript
import { StateBuilder } from '@tipser/tipser-elements';

const stateBuilder = new StateBuilder(POS_ID);
```
Now you can use it in your request handler: 

```typescript
stateBuilder.buildState(PRODUCT_IDS, COLLECTION_IDS, IS_SHOP_ON_PAGE): Promise<TipserState>
```

Full example:
```typescript
stateBuilder
  .buildState(PRODUCT_IDS, COLLECTION_IDS, IS_SHOP_ON_PAGE)
  .then(initialState => {
    renderToString(
      <TipserElementsProvider posId={POS_ID} initialState={initialState}>
        <YourAppHere />
      </TipserElementsProvider>
    );
  });
```

The state should be transferred to the frontend app. You can use the pattern that is known from Redux based apps.
Everything what you need is to add following script to your html response:

```html
<script>window.TIPSER_STATE = ${JSON.stringify(initialState)}</script>
```

then on the frontend side you are able to reuse it:

```typescript
hydrate(
    <TipserElementsProvider posId={POS_ID} initialState={window.TIPSER_STATE}>
        <YourAppHere />
    </TipserElementsProvider>,
    document.getElementById('root')
);
```

That's all!
