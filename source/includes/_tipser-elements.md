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
You can combine Tipser Elements with your own application

- `TipserElementsProvider` entry point to Tipser Elements (creating a context for other Elements) with the `tipserElementsConfig` as props.
- `TipserElement` is a generic Element that can render any Contentful content that's fed as a prop to the element.
- `TipserProduct` is the Element that renders the product given the Tipser product ID as the prop.
- `CartIcon` is the Element that displays the number of items in your cart and gives the user a way to open the checkout dialog.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { TipserElement, TipserProduct, CartIcon, TipserElementsProvider } from '@tipser/tipser-elements';

const tipserElementsConfig = {
    lang: 'en',
    primaryColor: 'blue'
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
        </main>
        <footer>
            <span>This is the footer</span>
        </footer>
    </TipserElementsProvider>, 
    document.getElementById('root'));
```
> root is the id of the HTML element where the Tipser element goes 

## Available components

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
