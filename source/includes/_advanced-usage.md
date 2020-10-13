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

To render Tipser Elements components on the server side, you can choose between two methods:

1. Basic, in which you need to provide the `id`s of the Tipser Elements components that are used on the website.
2. Smart, where you don't need to know the `id`s, but there would be two subsequent renders. In the first one, 'dry run', we collect information about components used on the website and the proper rendering, that uses the previously collected data.

Server-side rendering takes place in several steps:

- building a state containing the data needed for rendering

- passing the state to the `SsrTipserElementsProvider`

- rendering the application

- sending the same state to the browser and passing it back to the `SsrTipserElementsProvider` on the client side.


### Basic method
In the basic method, you should use the `StateBuilder` class to build the state. Start with creating its instances (which can be global):

```typescript
import { StateBuilder } from '@tipser/tipser-elements';

const stateBuilder = new StateBuilder(POS_ID);
```

Then, while handling a specific request, use the `stateBuilder.buildState` method, passing an object containing information about which elements are placed on the website, i.e. what products (PRODUCT_IDS), collections (COLLECTION_IDS) and whether there is the shop component (IS_SHOP_ON_PAGE).

```typescript
stateBuilder.buildState({
    productIds: PRODUCT_IDS,
    collectionIds: COLLECTION_IDS,
    shouldFetchStore: IS_SHOP_ON_PAGE,
})
```

This method returns a promise in which the ready state will be available, which should then be passed to `SsrTipserElementsProvider`:

```typescript
stateBuilder.buildState({
    productIds: dataToFetch.productIds,
    collectionIds: dataToFetch.collectionIds,
    shouldFetchStore: dataToFetch.shouldFetchStore
}).then((initialState) => {
    const markup = renderToString(
        <TipserElementsProvider posId={POS_ID}>
            <SsrTipserElementsProvider initialState={initialState}>
                <App/>
            </SsrTipserElementsProvider>
        </TipserElementsProvider>
    );
    ...
 });
```
The status should then be transferred to the browser. For this purpose, it can be assigned to the global window object and placed in the returned html document:

```html
<script>window.TIPSER_STATE = ${JSON.stringify(initialState)}</script>
```

On the client side, use `window.TIPSER_STATE` as the initial State `SsrTipserElementsProvider`:

```typescript
<TipserElementsProvider posId={POS_ID}>
    <SsrTipserElementsProvider initialState={window.TIPSER_STATE}>
        <App/>
    </SsrTipserElementsProvider>
</TipserElementsProvider>
```

That's all! The complete example is available [here](https://github.com/Tipser/tipser-elements-ssr-bootstrap).

### Smart method
In the smart version, the `ComponentsStateSsrManager` class should be used to build the state. For this purpose, you should create an instance of this class, which cannot be global, i.e. a new instance should be created for each request:

```typescript
const componentsStateSsrManager = new ComponentsStateSsrManager(POS_ID);
```

Then perform the first rendering that will collect information about the components on the page:

```typescript
const componentsStateSsrManager = new ComponentsStateSsrManager(POS_ID, 'prod')

const toRender = (
    <TipserElementsProvider posId={POS_ID}>
        <SsrTipserElementsProvider componentsStateManager={componentsStateSsrManager}>
            <App/>
        </SsrTipserElementsProvider>
    </TipserElementsProvider>
);
//first render
renderToString(toRender);
```

Next, use the `buildState` method available on the components instance of `StateSsrManager`, which, similarly to i, returns a promise:

```typescript
const componentsStateSsrManager = new ComponentsStateSsrManager(POS_ID)

const toRender = (
    <TipserElementsProvider posId={POS_ID}>
        <SsrTipserElementsProvider componentsStateManager={componentsStateSsrManager}>
            <App/>
        </SsrTipserElementsProvider>
    </TipserElementsProvider>
);
//first render
renderToString(toRender);

componentsStateSsrManager.buildState().then(() => {
    //second render
    const markup = renderToString(toRender);
    ...
});
```

In this case, you no longer need to manually pass the state to the `SsrTipserElementsProvider`, it is done automatically. The last step is to transfer the state to the browser in a similar way as it was done in the basic version, but this time the state should be extracted from `componentsStateSsrManager` using the `getState` method:

```typescript
<script>window.TIPSER_STATE = ${JSON.stringify(componentsStateSsrManager.getState())}</script>
```

The state should be passed to the `SsrTipserElementsProvider` on the browser side:

```typescript
<TipserElementsProvider posId={POS_ID}>
    <SsrTipserElementsProvider initialState={window.TIPSER_STATE}>
        <App/>
    </SsrTipserElementsProvider>
</TipserElementsProvider>,
```

## Native apps

Tipser Elements is a web-based library and currently we don't provide a native version for Android or iOS (let us know if you'd like us to build it for you!)

However it is possible to embed Elements in a native app if you are using WebViews. We recommend you to follow one of the patterns described below.

### Pattern 1: Full web integration

In case your articles are managed by a Web CMS and are displayed in WebView you can simply install and use Tipser Elements in your web articles. Just follow the instructions from [Tipser Elements](#tipser-elements) or [Tipser Elements React](#tipser-react-elements) sections, depending on your technology of choice.

The only customization that we recommend is using `disableDialog` option, as described below.

*Replacing dialogs with redirects*

By default, when a product tile is clicked, it opens a full screen product dialog. It may not be desired behavior in your mobile app. Set the configuration option: `disableDialog` to `true` to replace the dialog with a _redirect_ to the product page. That way pressing the back button will bring the user back to your article.                                                                                                                                                                                                 

### Pattern 2: API integration

If you want to deliver native experience to your users, you can build your custom native e-commerce components (product tiles, shopping cart icon, etc) and use [Tipser Rest API](https://developers.tipser.com/rest-api) to populate them. With this pattern, only the checkout part needs to be displayed in a WebView.

Below is a basic example of a native view with a single product that opens Tipser checkout view when clicked.

Step 1: Rendering a product on your page

1. Use the Tipser product API to get the product that you want to sell, e.g: `https://t3-stage-api.tipser.com/v3/products/5d932be284da04000116ae3c?pos=59e86b79b8f3f60a94ecd26a` 
(please, replace the example product id with the desired product and the pos parameter with your own POS id)
2. Render your custom product component based on the response data

<aside class="notice">
Here we describe displaying a single product. If you'd be interested to render multiple products, it's best to use the collections API.
</aside>


Step2: Opening the checkout view

1. Create a WebView screen in your app project
2. When your product is clicked, open the WebView with the URL like: `https://www.tipser.com/direct-checkout?productId=productId&posId=59e86b79b8f3f60a94ecd26a` 
(again, please make sure to replace the `posId` with your POS id and `productId` with the Tipser id of the product that was clicked)

<aside class="notice">
If your use case is not covered in this section, please discuss it with your Tipser integration support person.   
</aside>

## Merchant signup on your site

It is possible to let merchants sign-up to Tipser directly from your site.

To make it possible, you need to have Tipser Elements installed on your page and you need to prepare a dedicated subpage for merchants, with a "Sign up" button that invokes the following code:

```javascript
const elements = tipser.elements(posId, config);
elements.sdkInstance.openDialog(`https://merchant-signup.netlify.app/#/start/${posId}`);
```



