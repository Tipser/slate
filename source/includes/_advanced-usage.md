#Advanced usage

## Getting Tipser Product Id

<aside class="notice">
To open a dialog for a product you will need to know its Tipser <code>productId</code>. There are two easy ways to get it:
<ol>
<li>Find a product in Tipser Tools and generate a snippet for it</li>
<li>Find a product at <a href="https://www.tipser.com/shop">https://www.tipser.com/shop</a> and copy the last part of product page URL</li>
</ol>
</aside>

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

## Buyable banners
 
 Tipser dialog can be opened from a banner nested in your page. To enable it, make sure that the banner executes the following line of javascript when clicked:
   
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
