#Embedded product page

By default, Tipser Elements opens product details and checkout views in modal overlays. If this is not the desired user experience, then you can replace it with an embedded product page. This way you will be able to show the same product view as the one normally displayed in modal but this time embedded on a standalone page.  

<aside class="info">Embedded product page requires some additional preparation on your side but provides the benefit of easily linking to a product page from anywhere, including social media and Instagram Shopping.</aside>

The final result of implementing embedded product page may look like this:

[![](embedded-product.png)](/images/embedded-product.png)

##Setting up embedded product page

To create an embedded product page you will need to implement the steps described below. The examples are using the typical way to do it in a React application, which is with `react-router` library.
However, any other client-side or server-side routing implementation should be fine when used in a similar way.

**Step 1:** Create a route (sub-page) on your site which ends with Tipser product id (as a dynamic parameter). An example URL may look like this: `https://www.example.com/product/12345678`.

```jsx
import { Router, Switch, Route } from 'react-router-dom';

<Router>
    <Switch>
        <Route exact path="/product/:productId">
          <ProductPage />
        </Route>
    </Switch>
</Router>
```

**Step 2:** When the product page is visited, read the product id ("12345678" in the earlier example) from the URL and pass it to Tipser’s `ProductContext` component.

```jsx
import { useParams } from 'react-router';
import { ProductPage } from '@tipser/tipser-elements';

const ProductPageRoute = () => {
  const { productId } = useParams();
  return (
    <ProductPage productId={productId} />
  );
};
```

**Step 3:** Set `customUrls.productBaseUrl` setting Elements configuration, so that we know where to redirect the user when a product title is clicked (instead of opening a modal).

```jsx
const tipserElementsConfig = {
  customUrls: {
      productBaseUrl: '/product' //This is the base url to which the product id will be appended
  }
}

<TipserElementsProvider config={tipserElementsConfig} {...otherProps}>
  
</TipserElementsProvider>
```

This will cause all interactions that would normally open the modal to redirect to this base URL instead.

**Step 4:** This step is not required but is recommended for projects implementing client-side routing. Pass the implementation of the `history` object used by your application, so that Elements can do client-side redirects instead of full-page reloads.

```jsx
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

<TipserElementsProvider history={history} {...otherProps}>
    <Router history={history}>
      
    </Router>
</TipserElementsProvider>
```

Voilà! This concludes the embedded product page setup.

