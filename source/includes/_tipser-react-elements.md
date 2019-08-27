# Tipser React Elements
Tipser React Elements is a component library from Tipser enabling you to add shoppable content to your React APP with minimal effort. You can add simple components like products with buy buttons, collections of products and articles, but also more complex grids or whole pages. 

<aside class="notice">
Not using React? Looking for an overview on Tipser Elements? Go check <a href="#tipser-elements">Tipser Elements</a> docs. This section covers only <strong>React API</strong> for Elements. 
</aside>

***

### Live demo

A working examples of page based on Tipser React Elements can be found on [Tipser Elements Bootstrap page](https://tipser.github.io/tipser-elements-react-bootstrap/).

The code of that page is available as a GitHub [Tipser Elements Bootstrap project](https://github.com/Tipser/tipser-elements-react-bootstrap). Feel free to checkout it and play with it on your local environment! 

***

## Quick Start
This quick guide explains how to intialize and render Tipser React Elements on your React app. It requires you to have a publisher account created in order to get the `posId`, as well as have some collections created in your shop. For a guide how to manage your collections, check the **Tipser Tools** tutorial.

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

// simple configuration
const config = {
    lang: 'en',
    primaryColor: 'blue',    
};

ReactDOM.render(
    <TipserElementsProvider posId="59e86b79b8f3f60a94ecd26a" config={config}>   
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
Make sure your HTML document contains an element of id `root` (`<div id="root"/>`) so that React can mount the app to your HTML document. Also check our [configuration](#configuration-options) options.


<aside class="success">Great job! You're all set up with React Elements. For the reference of all Tipser React Elements, check below section.</aside>

***

## API reference of Tipser React Elements
### `TipserElementsProvider` 
Entry point to Tipser Elements (creating a context for other Elements);

prop name  | description | type  | required | default value 
-----------|-------------|-------|----------|--------------
posId | id of Point of sale | string | true | 
config | configuration object (see [definition here](#all-configuration-options-of-tipser-elements)) | {} | false   | {}
 
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
lang | `'en'` | a locale to be used by the Tipser content. Possible values: `'en'`, `'de'`, `'fr'` and `'sv'`. More info at [Language and locale](#language-and-locale)[Environment](#environment)| `'de'` 
env | `'prod'` | Tipser environment to be used by the Tipser content. Possible values: `'stage'` and `'prod'`. More info at [Environment](#environment)| `'stage'`
defaultAddedToCartPopup | `true` | Controls default Added To Cart Popup. It appears when user adds a product to the cart. It improves UX by highlighting the action and allowing to navigate quickly to the cart modal window.  | `true` or `false` 
useDefaultErrorHandler | `true` | when set to false and error happens, default message won't be displayed | see [Adding onError handler](#onerror)
eventsHandlers | `{}` | the object of event handlers. See [Event handlers](#event-handlers)  | `object` | { onError: console.error.bind(console) }  
useDeepLinking | `true` | Makes Shop element to use hash navigation when switching between categories. More info at [Use Deep Linking](#use-deep-linking):  | `false`
modalUi | `{}` | Customization of Tipser Dialog. More info at [Parameters for dialog customization](#parameters-for-dialog-customization)| `{ hideSearchIcon : true}`

### Event Handlers
```js

let tipserConfig = {
    lang: 'en',
    primaryColor: 'red',
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

### Content components
Content components are the building blocks of Tipser Elements. Any components need to be a descendant of **TipserElementsProvider** component. Container components such as **Grid** may contain other components. 

`Article`<br> 
`Brand`<br>
`Collection`<br>
`Grid`<br>
`Menu`<br>
`Page`<br>
`Product`<br>

### Store

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

 
## Customizing Tipser Elements Styles ##

Tipser Elements are the "building blocks" designed to fit your page as much as possible. We created the styling in a way that delivers a nice look & feel from the start, but also allows you to change them easily to fit your unique sense of style. 

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

### Primary color ###

If you'd like to unify our design with your own color-theme, you can use our primary-color theme to change the color of `add-to-cart` buttons in Product and indicator of items number in Cart. These elements on the page will be altered with one small change in your CSS:
[![](primary-color.png)](/images/primary-color.png)
If your primary color is a bright one, you might want to change also the text color of the elements with primary color background. For example in buttons by default the color we use is white.

```css
.te-primary-fill {
    background-color: #5F9F9F;
}

.te-primary-border {
    border-color: #5F9F9F;
}

/* if your primary color is bright,
    you may consider changing also the text color for elements like buttons: */
.te-button-text {
    color: #fff;
}
```
If you'd like to change other elements' color as well, please use our specific classes to override the styles.
