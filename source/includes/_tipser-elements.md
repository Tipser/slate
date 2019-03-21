# Tipser Elements
Tipser Elements is a React components library from Tipser enabling you to add shopable content to your site with minimal effort.  You can add simple components like products with buy buttons, collections of products and articles, but also more complex grids or whole pages.

The package allows you to use Tipser's product repository and create inline shops embedded into your pages as well as the entire websites. 

## Quick Start with NPM version
- Install with npm: `npm install @tipser/tipser-elements`
- Install with yarn: `yarn add @tipser/tipser-elements`

Follow the instructions in Available Components section to add particular components to your app.

## Quick React example
Create a React app using e.g. [Create React App](https://facebook.github.io/create-react-app/docs/getting-started) 

`npx create-react-app my-app`
`cd my-app`

Install Tipser Elements with yarn: 
`yarn install @tipser/tipser-elements`

Refresh dependencies
`yarn install`

Start the application
`yarn start`

### Example inserting elements in your site
You can combine Tipser Elements with your own application

- `TipserElement` is a generic Element that can render any Contentful content that's fed as a prop to the element.
- `TipserProduct` is the Element that renders the product given the product ID as the prop.
- `CartIcon` is the Element that displays the number of items in your cart, as well as links to  checkout.
- `TipserContectProvider` takes care of putting the Tipser Elements app in context with the `tipserConfig` as props.


```js
import React from 'react';
import ReactDOM from 'react-dom';
import { TipserElement, TipserProduct, CartIcon, TipserContextProvider } from '@tipser/tipser-elements';

let tipserConfig = {
    posId: '59e86b79b8f3f60a94ecd26a',
    lang: 'en',
    env: 'prod',
    primaryColor: 'blue',
};

ReactDOM.render(
    <TipserContextProvider value = { tipserConfig }>   
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
    </TipserContextProvider>, 
    document.getElementById('root'));
```
> root is the id of the HTML element where the Tipser element goes


## Quick start with scripted injectable version
They are a ready-to-use out-of-the-box solution to be placed on your website, using React even though your own website doesn’t.

### Script to be injected 
The script should be added in the body section of the page (as a last element preferably) Please see widget config section to get more details on configuration options.

```js
<script>
    var scriptTag = document.createElement('script');
    scriptTag.src = "https://cdn.tipser.com/tipser-script/latest.js";
    scriptTag.onload = scriptTag.onreadystatechange = function() {
        TIPSER.init({
            posId: 'your pos id',
            lang: 'en',
            tipserElementIdToBeMount: "id of the Tipser Element to be displayed",
            domElementSelectorWhereToMount: "the css selector of the element where Tipser Element will be mount",
            basePath: 'the url path to the page where the Tipser is displayed',
            domReplacementMode: false,
        });
    };
    document.body.appendChild(scriptTag);
</script>
```

### Available config options

```js  
    var widgetConfig = {
        posId: 'your pos id',
        lang: 'en',
        tipserElementIdToBeMount: "id of the Tipser Element to be displayed",
        domElementSelectorWhereToMount: "the css selector of the element where Tipser Element will be mount",
        basePath: 'the url path to the page where the Tipser is displayed',
        domReplacementMode: false, // shall we change data-tipser-pid and data-tipser-cid html tags to product / collections 
        env: 'prod', // what environment would you like to use
        openOldDialog: true,
        primaryColor: 'black',
        domElementSelectorWhereToMountCart: undefined // if we want the shop, where to mount the shop cart icon
        
        // HERE GOES ADDITIONAL WIDGET OPTIONS
    }; 
``` 

### Custom styling

## Available components

### Content components
Content components are the building blocks of Tipser Elements. Components may contain other components that act as a hierachy. 

- **Article**
- **Brand**
- **CartIcon**
- **Collection**
- **Grid**
- **Menu**
- **Page**
- **Product**