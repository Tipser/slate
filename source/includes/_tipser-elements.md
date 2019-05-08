# Tipser Elements
Tipser Elements is a React components library from Tipser enabling you to add shopable content to your site with minimal effort.  You can add simple components like products with buy buttons, collections of products and articles, but also more complex grids or whole pages.

The package allows you to use Tipser's product repository and create inline shops embedded into your pages as well as the entire websites.

## See it live! ##

A working examples of page based on tipser-elements can be found here: https://tipser.github.io/tipser-elements-react-bootstrap/ .

The code of that page is available as a GitHub project: https://github.com/Tipser/tipser-elements-react-bootstrap . Feel free to checkout it and play with it on your local machine! 

## Quick Start with NPM version

Add the library to your project:

`npm install --save @tipser/tipser-elements`

Follow the instructions in Available Components section to add particular components to your app.

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


#### Example of above components used together:

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
> root is the id of the HTML element where the Tipser element goes

### All configuration options of Tipser Elements

Configuration is an object, that should be inserted into `TipserElementsProvider` as `config` prop.

All properties are optional:

property name | description |type | default value
--------------|-------------|-----|---------------
defaultAddedToCartPopup | controls whether default Added To Cart Popup is displayed | boolean | true 
eventsHandlers | gives possibility to add handlers to Tipser Elements events | object | empty
useDefaultErrorHandler | if set to false there will be no error message displayed in case of error | boolean | true

#### Event Handlers
Event handlers may be passed as a part of `config` option of `TipserElementsProvider`. There is a number of events exposed for developer. Each of the handler may have a different params as arguments of handler. 

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

class App extends Component {

    render() {
        return (
            <Router history={hashHistory}>
                <TipserElementsProvider
                    posId={"5075d7715c3d090a90585e87"}
                    config={tipserConfig}>
                    <Switch>
                        <Route path="/product/:productId" component={ProductView} />
                        <Route path="/" component={ComponentsView} />
                        <Route component={NotFoundView} />
                    </Switch>
                </TipserElementsProvider>
            </Router>
        );
    }

}

```

Handler name  | description | params
--------------|-------------|--------
onError | Main goal of this handler is to add additional behavior when the error appears. | object of type EventError ```js export interface EventError {
    type?: string;
    id?: string;
    message?: string;
    stack?: string;
}```
onAddToCart | when product is being added to cart event is triggered | object of type {cartSize, product} where cartSize is a current size of cart after adding to cart and product is a product object with properties ```js 
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

### Content components
Content components are the building blocks of Tipser Elements. Any components need to be a descendant of **TipserElementsProvider** component. Container components such as **Grid** may contain other components. 

- **Article**
- **Brand**
- **CartIcon**
- **Collection**
- **Grid**
- **Menu**
- **Page**
- **Product**

### Shop component

Shop component is a HTML widget displaying a list of all Tipser public collections for the POS.   

It can be used with `ShopComponent` react component.

```js
import { ShopComponent } from '@tipser/tipser-elements';
 ...
<ShopComponent />
```

[![](shop_component.png)](/images/shop_component.png)

Note: the shop component is updating the top-level page URL (when it's tabs are clicked). For this reason, please double check if it won't interfere with your web framework. 
For the same reason, it's not recommended to include more than one `<ShopComponent />` on a single page. 
