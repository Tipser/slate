#Advanced usage

## Getting Tipser ids

<aside class="notice">
To run Tipser Elements components you will need to pass <code>productId</code> or <code>collectionId</code>. To get <code>productId</code>, log in to <a href="https://app.tipser.com/" target="_blank">app.tipser.com</a> using your publisher's account, find a product in "Insert Products" section, click on the "<>" sign and copy it's <code>productId</code>.
To curate a collection click "+" sign on a product tile and type the name of the collection. Then click "add". Your product is added to the collection. When all the products are added to the collection, click "<" on the right side of the site and then "<>" to copy the the <code>collectionId</code>. 
</aside>

## Publisher data

In order to associate a piece of data owned by the publisher with an order item in Tipser, you can use a concept called `posData`. A `posData` is an arbitrary string that can be used to store additional information (e.g. session id, user id in your system, etc) attached to order in Tipser's database.
After the transaction is finalized, the string passed as `posData` will be available back in the response from the <a href="https://developers.tipser.com/rest-api/purchase-data" target="_blank">Commissions API</a> that can be consumed by your backend code (e.g. reporting systems). 

<aside class="notice">Because <code>posData</code> is treated as a string in the Tipser system, then if you need to store a structured data (a common use case), please call <code>JSON.stringify()</code> function on a JS object before passing it to Tipser (see: the examples below) and parse it back to JS object when receiving it back.</aside>

There are two ways to enable `posData`:


Option 1: As a global configuration setting that is passed to Elements/SDK initialization (good for static data, like the release number):

```javascript
const tipserConfig = { posData: "release_2.1.5" };
```


Option 2: After Elements/Script initialization with `updateConfig(posData: string)` function (useful for 
the data that is not yet available at the time of initialization):

in Tipser Script:

```javascript
const someData = JSON.stringify({sessionId: "5fa01be88b51", userId: "5fa01bfd3be2"});

tipserScript.updateConfig({posData: someData});
``` 

in Tipser Elements: 

Just update the value passed to the config prop of `TipserElementsProvider` in the next render cycle:

```javascript
const someData = JSON.stringify({sessionId: "5fa01be88b51", userId: "5fa01bfd3be2"});
const elementsConfigWithPosData = {...baseElementsConfig, posData: someData};

return <TipserElementsProvider config={elementsConfigWithPosData}>
...
</TipserElementsProvider>
```

This will apply for the next and all the subsequent products added to cart.

<aside class="notice">The timing of calling <code>setPosData</code> is relevant. The <code>posData</code> is being sent in the Tipser backend with the add to cart API request. This means that to have any effect, <code>setPosData</code> needs to be called <strong>before</strong> the product is added to cart (either from the API or by user's action).</aside> 

<aside class="warning">Warning: for performance reasons, the number of characters in <code>posData</code> is limited to 4000. Longer strings will be truncated down to 4000 characters.</aside>


## Checkout submit functions

You can access the checkout context and create custom functions for submitting delivery and billing address forms as
well as Stripe payment details.

### in Tipser Elements:
If you're using React in your project, you can apply `useCheckoutContext` hook:

```javascript
const CustomSubmitButton = () => {
  const checkoutContext = useCheckoutContext();
  const handleClick = useCallback(() => {
    // for delivery addres submition use:
    checkoutContext.addresses.deliveryAddressForm.submit()
    // for billing address submition use:
    checkoutContext.addresses.billingAddressForm.submit();
    // for payment submition use:
    checkoutContext.payment.paymentForm.submit();
  }, [checkoutContext]);
  return <button onClick={handleClick}>Submit delivery address</button>
}
```

### in Tipser Script:

Even if you don't use React in your project, we allow you to access the checkout context and create custom functions for submitting delivery and billing address forms as well as Stripe payment details.

To access the context, create an Event Listener attached to your checkout wrapper (the element with `data-tipser-modular-checkout` attribute):

```javascript
const modularCheckoutDiv = document.querySelector('#modular_checkout_root');
let getCheckoutContext = null;

modularCheckoutDiv.addEventListener('checkout-context-ready', (evt) => {
  getCheckoutContext = evt.detail.getCheckoutContext;
});
```

Now create your custom Submit button, eg:

```html
<button id="submit-button" onclick="customSubmit()"></button>
```

and define your submit delivery address function:

```javascript
const customSubmit = () => {
    const checkoutContext = getCheckoutContext();
  // for delivery addres submition use:
    checkoutContext.addresses.deliveryAddressForm.submit();
  // for billing address submition use:
    checkoutContext.addresses.billingAddressForm.submit();
  // for payment submition use:
    checkoutContext.payment.paymentForm.submit();
};
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
The `initialState` should then be transferred to the browser. For this purpose, it can be assigned to the global window object and placed in the returned html document:

```html
<script>window.TIPSER_STATE = ${JSON.stringify(initialState)}</script>
```

On the client side, use `window.TIPSER_STATE` as the `initialState` of `SsrTipserElementsProvider`:

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

Next, use the `buildState` method available on the components instance of `StateSsrManager`, which returns a promise:

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
elements.sdkInstance.openDialog(`https://merchsignup.netlify.app/#/start/${posId}`);
```



