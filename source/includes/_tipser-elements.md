# Tipser Elements
Tipser Elements is a React components library from Tipser enabling you to add shoppable content to your site with minimal effort.  You can add simple components like products with buy buttons, collections of products and articles, but also more complex grids or whole pages.

The package allows you to use Tipser's product repository and create inline shops embedded into your page as well as the entire websites.

## See it live! ##

A working examples of page based on tipser-elements can be found on [Tipser Elements Bootstrap page](https://tipser.github.io/tipser-elements-react-bootstrap/).

The code of that page is available as a GitHub [Tipser Elements Bootstrap project](https://github.com/Tipser/tipser-elements-react-bootstrap). Feel free to checkout it and play with it on your local machine! 

## Quick Start with NPM version

Add the library to your project:

`npm install --save @tipser/tipser-elements`

Follow the instructions in the Available Components section to add particular components to your app.

## Quick start with scripted injectable version
There is a bundled, out-of-the-box solution to be placed on your website called Tipser Widget. For more information and instructions how to use it, please refer to [Tipser Widget docs](#tipser-widget).

If you feel comfortable with React and need to address more advanced use cases, read further!

## Quick React example
Create a React app using e.g. [Create React App](https://facebook.github.io/create-react-app/docs/getting-started) (follow the instructions on their page). 

`npx create-react-app my-tipser-elements-app`

`cd my-tipser-elements-app`

Add Tipser Elements to the project with npm: 

`npm install @tipser/tipser-elements`

Put your Elements code (e.g. copy the example below) in src/index.js file.

Start the application

`npm start`

### Example inserting elements in your site
You can combine Tipser Elements with your own application:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { TipserElement, TipserProduct, CartIcon, TipserElementsProvider, ShopComponent } from '@tipser/tipser-elements';

const tipserElementsConfig = {
    lang: 'en',
    primaryColor: 'blue',    
};

ReactDOM.render(
    <TipserElementsProvider posId="59e86b79b8f3f60a94ecd26a" config={tipserElementsConfig}>   
        <header>
            <nav>
                <span>Nav Element</span>
                <CartIcon/>
            </nav>
        </header>
        <main>
            <TipserElement  id="1larHZb8TeMQiqmi4W8CIS" />
            <TipserProduct productId="5ba2334a781baa0001ccdffc"/>
            <ShopComponent />
        </main>
        <footer>
            <span>This is the footer</span>
        </footer>
    </TipserElementsProvider>, 
    document.getElementById('root'));
```
> "root" is the id of the HTML element where the Tipser element goes

#### `TipserElementsProvider` 
Entry point to Tipser Elements (creating a context for other Elements);

prop name  | description | type  | required | default value 
-----------|-------------|-------|----------|--------------
posId | id of Point of sale | string | true | 
config | configuration object (see [definition here](#all-configuration-options-of-tipser-elements)) | {} | false   | {}
 
#### `TipserElement` 
Generic Element that can render any Contentful content that's fed as a prop to the element.

#### `TipserProduct` 
Element that renders the product given the Tipser product ID as the prop.

#### `CartIcon` 
Element that displays the number of items in your cart and gives the user a way to open the checkout dialog.



### All configuration options of Tipser Elements

Configuration is an object, which should be inserted into `TipserElementsProvider` as `config` prop.

All properties are optional:

property name | description |type | default value
--------------|-------------|-----|---------------
`defaultAddedToCartPopup` | controls whether default Added To Cart Popup is displayed | boolean | true 
`eventsHandlers` | gives possibility to add handlers to Tipser Elements events | object | {}
`useDefaultErrorHandler` | when set to false and error happens, default message won't be displayed | boolean | true

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

<br><br><br><br>

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
<br><br><br><br><br><br><br><br><br><br><br><br>

### Content components
Content components are the building blocks of Tipser Elements. Any components need to be a descendant of **TipserElementsProvider** component. Container components such as **Grid** may contain other components. 

`Article`<br> 
`Brand*`<br>
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

```css
.te-product-card {
    font-size: 14px;
}
```

The Product Card is an item used for displaying single `Collection` or `Store` component, among others. The font-family used in the description section of the Product Card is inherited from your website's styles, and the font-size is expressed in the relative `em` units controlled in `.te-product-card` class. The default value used there is `12px`, which you can easily change by adding to your CSS the following style:

All the description elements (product name, brand and price) will become bigger / smaller according to the value you specify in the `px` unit. If you wish to change single description element, please use its specific class names: 

`.te-product-card-name` <br/>
`.te-product-card-brand`<br/>
`.te-product-card-price`<br/>
and:<br/>
`.te-product-card-sales-price`<br/>
`.te-product-card-price-regular-price`<br/>
for products on sale.

### Cart ###

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
The Cart component with the cart icon can be placed anywhere on your website. (It is highly advisable to place it in your navigation element among other icons such as search, home etc.) However, if you want to keep it visible at all times, attached to the right side of the viewport, you can use these styles: