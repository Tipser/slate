#Advanced usage

## Getting Tipser Product Id

<aside class="notice">
To open a dialog for a product you will need to know its Tipser <code>productId</code>. There are two easy ways to get it:
<ol>
<li>Find a product in Tipser Tools and generate a snippet for it</li>
<li>Find a product at <a href="https://www.tipser.com/shop">https://www.tipser.com/shop</a> and copy the last part of product page URL</li>
</ol>
</aside>

## Adding POS data

If you need to associate some custom data to orders made from Tipser on your site (e.g. session id or user id on your site), pass it in the posData field to the Elements configuration.
You will be later able to get that data back when requesting the orders from the Tipser orders API.

```javascript
const tipserOptions = {
    posData: {
      userId: '123'
    }
};
```

## Opening product dialog programatically

Tipser product dialog can be openend programatically by using the underlying [Tipser SDK](#tipser-sdk) instance.

__If you use Tipser Elements:__

```javascript
const elements = tipser.elements(posId, config);
elements.sdkInstance.openProductDialog(productId);
```

__If you use Tipser React Elements:__

1. Create a custom React component and mount it anywhere under `TipserElementsProvider` in React elements hierarchy.
2. Inside that component you can use tipserSdk instance from the context `TipserContext`. This how it can be done with [React Hooks](https://reactjs.org/docs/hooks-intro.html):


```javascript
import { TipserContext } from `@tipser/tipser-elements`;

const DialogOpener = () => {
  const context = useContext(TipserContext());
  const sdk = context.data.tipserSdk;
  
  useEffect(() => { sdk.openProductDialog(productId); }, []);
}
```

Your React components hierarchy should look as following: 

```html
<TipserElementsProvider>
  <!-- Any number of other components -->
  <DialogOpener />
</TipserElementsProvider>
```

***

## Buyable banners

 [![](buyable-banners.gif)](buyable-banners.gif)
 
 Tipser dialogs can be opened by the banners on your site. That way you can use your banners for E-commerce. 
 
 To connect your banner to Tipser, you need to do the following two steps:
 
 1. follow the instructions from [Initializing Tipser Elements](#initializing-tipser-elements)
 2. Add the line of javascript posted below to you banner. It should be invoked when the banner is clicked. 
   
 __To display product dialog:__
 
 ```javascript
 window.top.postMessage({command: 'tipser.api.displayProduct', productId: tipserProductId}, '*')
 ```

__To open the checkout view for a product directly:__

```javascript
  window.top.postMessage({command: 'tipser.api.directToCheckout', productId: tipserProductId}, '*')

```
 
 Check [this](#getting-tipser-product-id) section to learn how to obtain the `tipserProductId`.
 
 <a href="https://bbc-bootstrap.netlify.com/" target="_blank">Live demo</a>
 
 <aside class="notice">
 In case your banner is not nested in an iframe but is simply a part of your site, POST messages should be sent to `window object` instead of `window.top`, e.g:

 </aside>
 
 ```javascript
 window.postMessage({command: 'tipser.api.displayProduct', productId: '5b59bfa4ca60310e30c9ac37'}, '*')
 
```

***

## Server side rendering

If you want to render Tipser-Elements' components on the server side, you can do it in three steps:

1. At the beginning you have to know ids of products and collections that you want to render on specific url.
2. Before rendering you have to prepare the state which contains the data necessary to render specific components. 
It is easy to build this state - our lib includes the tool to do it!
3. The state you have to apply to `TipserElementsProvider` as `initialState` prop
4. You have to transfer the state on the frontend side and apply as `initialState` to `TipserElementsProvider` on the frontend side.

### Building the state

We assume that you know ids of products, collections and you know if you want to render Shop component on the specific url.
Let's say that following four variables are defined: `POS_ID`, `PRODUCT_IDS`, `COLLECTION_IDS` and `IS_SHOP_ON_PAGE`.  
Please note that `PRODUCT_IDS`, `COLLECTION_IDS` and `IS_SHOP_ON_PAGE` should depend on URL - different pages can have different products/collections.
To build the state you should use our `StateBuilder` class. You can do it in the following way:
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
All you need to do is including the following line in your html response:

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

That's all! The complete example is available [here](https://github.com/Tipser/tipser-elements-ssr-bootstrap).

## Embedding Elements in native apps

Tipser Elements is a web-based library and currently there is no native version for Android or iOS available.

However it is possible to embed Elements in a native app with some amount of custom code. We recommend using one of the patterns described below.

### Pattern 1: Full embedded integration

For each of e-commerce subpages/articles in your app do the following:

1. Create a dedicated WebView screen for that page and link it to your application (make sure the user has a way to go back to the native part of application) 
2. Build and host a web page based on Elements, following the instructions from [Tipser Elements](#tipser-elements) or [Tipser Elements React](#tipser-react-elements)
3. Point your WebView to the corresponding web page

*Disabling dialogs with redirects*

The default behavior of opening product dialogs when a product tile is clicked may not be desired in your mobile app. If that's the case, you can replace that behavior with
redirecting to a product page by setting the configuration option: `disableDialog` to `true`. One of the benefits is that the back button will work in the way expected by users
(getting moving back from product page to the e-commerce page).

### Pattern 2: Checkout-only integration

If you prefer even more native experience, you may use [Tipser Rest API](https://developers.tipser.com/rest-api) to fetch the product and shopping cart and build
your own native implementation of product view, product tiles and cart icon components. Your implementation will need to use [Tipser SDK](#tipser-sdk) to add products to cart:

```javascript
tipserSdk.addToCart(tipserProductId);
``` 

Unfortunately, currently the checkout view still must be web based, so you
still need a WebView screen to host the checkout page. To satisfy that requirement, you will need to host a web page which loads [Tipser SDK](#tipser-sdk) and calls the following line:

```javascript
tipserSdk.openPurchaseDialog()
``` 
