# Tipser Elements
Tipser Elements is a React components library from Tipser enabling you to add shopable content to your site with minimal effort.  You can add simple components like products with buy buttons, collections of products and articles, but also more complex grids or whole pages.

The package allows you to use Tipser's product repository and create inline shops embedded into your pages as well as the entire websites. 

## Quick Start with NPM version
- Install with npm: `npm install @tipser/tipser-elements`
- Install with yarn: `yarn add @tipser/tipser-elements`

Follow the instructions in Available Components section to add particular components to your app.

## Quick React example running as an App
Create a React app using e.g. [Create React App](https://facebook.github.io/create-react-app/) (e.g. `npx create-react-app my-app`)
cd my-app

Install Tipser Elements with yarn: `yarn install @tipser/tipser-elements`

`yarn install`
`yarn start`


```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '@tipser/tipser-elements';

ReactDOM.render(
    <App 
        options = {{
            lang: "en"
        }}
        basePath="/"
        id="45d4anZqSAmI848SQKmaSI" 
    />,
    document.getElementById('root'));
```

## Quick React example inserting one Element

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TipserElement } from '@tipser/tipser-elements';

ReactDOM.render(
    <TipserElement 
        options = {{
            lang: "en"
        }}
        basePath="/"
        id="1larHZb8TeMQiqmi4W8CIS" 
    />,
    document.getElementById('root'));
```
> root is id of your HTML element where to put the Tipser element


## Quick start with scripted injectable version
They are a ready-to-use out-of-the-box solution to be placed on your website, using React even though your own website doesn’t.

### Script to be injected 
The script should be added in the body section of the page. Please see widget config section to get more details on configuration options.

```js
(function(){

    // --------------------------------------
    // TIPSER WIDGET CODE CONFIG STARTS HERE
    // --------------------------------------
    var widgetConfig = {
        posId: 'xxxxxx',
        lang: 'de',
        env: 'prod',
        openOldDialog: true,
        primaryColor: 'black'
        // HERE GOES ADDITIONAL WIDGET OPTIONS
    };

    var basePath = '/shop'; // default /
    var tipserElementIdToBeMount = "xxxxx";
    var domElementSelectorWhereToMount = "#tipser_shop";

    // --------------------------------------
    // END OF CONFIG
    // --------------------------------------

    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "https://cdn.tipser.com/tipser-publishers/" + widgetConfig.posId + "-latest.css";

    head.appendChild(link);
    
    (function(d, s, id){
        var js, tjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.async = false; js.id = id;
        js.src = "https://cdn.tipser.com/tipser-widget2/Core-tipser-elements-latest.js";
        js.onload = js.onreadystatechange = function() {
            var rs = this.readyState; if (rs && rs != "complete" && rs != "loaded") return;
            var tipserEl = new tipserWidget.Core.TipserElementModule(widgetConfig);
                tipserEl.mount(tipserElementIdToBeMount, document.querySelector(domElementSelectorWhereToMount), basePath);
        }
        tjs.parentNode.insertBefore(js, tjs);
    }(document, "script", "tipser-js-core"));

})();

window.addEventListener('message', function(event) {
    var tab = document.getElementById('twshoptab');
    if (!tab) {
        console.warn('no Tipser shopping cart is visible on page.');
    }
    if (event.data.command && event.data.command === 'tipser.api.cartItemsCountChange') {
        if (event.data.payload && event.data.payload.count > 0) {
            tab.style.display='block';
        } else {
            tab.style.display='none';
        }
    }
});
```

### Widget config options explained

### Custom styling

## Available components

### Backend source of components

### Main (root) components
Main components are dedicated to render the whole structure or to configure nested components. 

- **App**
- **Site**
- **Tipser Element**

### Content components
Content components are the building blocks of Tipser Elements. Components may contain other components as act as hierachy. 

- **Article**
- **Brand**
- **Collection**
- **Container**
- **Grid**
- **Image**
- **Column Layout**
- **Horizontal Menu**
- **Link**
- **Menu**
- **Slot**
- **SlottableLink**
- **Page**
- **Product**
- **Site**
