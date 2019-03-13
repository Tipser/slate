#Tipser Elements Analytics

Tipser Elements library sends a number of analytics events to Google Analytics as a result of user actions.

### GA account configuration ###

Most of analytics events emitted by Tipser Elements assume [Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce) plugin to be enabled on
a receiver's Google Analytics account. So if you want to get most of Tipser Analytics, it is strongly recommended to enable Enhanced Ecommerce in your GA settings, as shown in a screenshots below.

[![](enhanced_analytics_settings.png)](/images/enhanced_analytics_settings.png) 

[![](enable_ecommerce.png)](/images/enable_ecommerce.png)

The settings for "Enable Enhanced Ecommerce Reporting" and "Checkout Labeling" sections are up to you and are not required for integration with Tipser Elements analytics.

### Custom dimensions ###

Additionally, all the events documented here contain the following [Custom Dimensions](https://support.google.com/analytics/answer/2709828?hl=en). If you would like to analyze those dimensions, please
make sure to configure the same Custom Dimensions, as described [here](google.com/analytics/answer/2709829?hl=en).

Name                  | Index                   | Description
---------             | ---------               | ---------
`posId`               | 1                       | The user ID on Tipser associated with a page that uses Tipser Elements.
`from`                | 2                       | Deprecated. From what type of widget the event comes from. Possible values: `product-view`, `shopping-cart` and `tipser-sdk`.
`article`             | 3                       | The URL of the page where the event occured (mostly the same as event's `location` field).

Warning: if you use the same Custom Dimension indexes for your own
purposes, you may be receiving unexpected values for those Custom Dimensions.

### Advanced E-commerce events ###

Some of the events emitted by Tipser Elements are standard Enhanced Ecommerce events which come with product data attached (as documented at "GA event format" section for each event).

Please refer to [Enhanced Ecommerce Data Types and Actions](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#ecommerce-data) and 
 [Measuring Ecommerce Activities](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-activities) sections in the official GA docs.

## Shop view

This event is emitted every time Shop is rendered on a page.

[![](shop_viewed.png)](/images/shop_viewed.png)

_In the screenshot above tipser shop was rendered and "Shop view" event has been emitted._

### Prerequisites ###
 
An element of type `Layout - Container` needs to be defined in Contentful space. 
The field `IsShop` on that element needs to be set to `true`. 

### Additonal notes ###

The event is emitted no matter if the shop element is actually visible on the screen.
It is possible that if the shop element is positioned below the fold of the browser window, the event
will be emitted for the shop that was not seen by the user.

### GA event format ###

Category    | Action        | Standard Enhanced Ecommerce event?
---------   | -----------   | -----------
`Shops`     | `shop-viewed` | No


## Shop list clicked

This event is emitted every time a list on a shop is clicked.

[![](shop_list_clicked.png)](/images/shop_viewed.png)

_In the screenshot above one of the shop lists was clicked (marked with a red rectangle) and "Shop list clicked" event has been emitted._

### Prerequisites ###

Shop categories need to be defined as `Slottable Link` components (typically as a part of horizontal menu component) in Contentful space. In component hierarchy they need
 to be located anywhere under `Layout - Container` component whose field `IsShop` is set to `true` (otherwise they won't be recognized as a part of the shop).

### GA event format ###

Category    | Action         | Standard Enhanced Ecommerce event?
---------   | -----------    | -----------
`Shops`     | `list-clicked` | No


## Product tile view

This event is emitted every time product tile is rendered on a page. One event is fired per every tile on the page.

[![](inline_product_viewed.png)](/images/inline_product_viewed.png)

_In the screenshot above some product tiles were rendered on a page and "Shop list clicked" event has been emitted for each of them._

### Prerequisites ###

Products need to be defined as `Product` components in Contentful space.

### Additonal notes ###

The event is emitted no matter if the product tile element is actually visible on the screen.
It is possible that if the product tile element is positioned below the fold of the browser window, the event
will be emitted for the product tile that was not seen by the user.


### GA event format ###

Category         | Action       | Standard Enhanced Ecommerce event?
---------        | -----------  | -----------
`E-commerce`     | `impression` | Yes (with one product attached)

## Product details view

This event is emitted every time product tile is clicked and product dialog is displayed.

[![](product_details_viewed.png)](/images/product_details_viewed.png)

_In the screenshot above user has clicked on one of the product tiles and product dialog has been displayed as a result. "Product details view" event has been emitted.

### Prerequisites ###

Products need to be defined as `Product` components in Contentful space.

### Additonal notes ###

Please note below that opening a product dialog fires a pair of GA events (one with action `click` and the other with action `detail`) to reflect the flow of user actions
(first clicking on a product title and then seeing the details).

### GA event format ###

Category         | Action      | Standard Enhanced Ecommerce event?
---------        | ----------- | -----------
`E-commerce`     | `click`     | Yes (with one product attached)
`E-commerce`     | `detail`    | Yes (with one product attached)

## Add to cart

This event is emitted when product is added to cart on a product dialog or checkout dialog.

[![](add_to_cart_event.png)](/images/add_to_cart_event.png)

_In the screenshot above the user has clicked "add to cart" button which resulted in emitting "Add to cart" event._

### GA event format ###

Category         | Action         | Standard Enhanced Ecommerce event?
---------        | -----------    | -----------        
`E-commerce`     | `add`          | Yes (with one product attached) 

## Remove from cart

This event is emitted when product is removed from cart at checkout dialog.

### GA event format ###

Category         | Action         | Standard Enhanced Ecommerce event?
---------        | -----------    | -----------       
`E-commerce`     | `remove`       | Yes (with one product attached)

## Checkout

This event is emitted when checkout dialog is opened with a product (or several products).

[![](product_checkout.png)](/images/product_checkout.png)

_In the screenshot above checkout dialog has been displayed and "Checkout" event has been emitted for a product "Retexturising SERUM"_

### Additonal notes ###

Please note that "checkout" is not the same thing as "purchase". The event is emitted even if the product checkout is never finalized.
The event is emitted every time checkout dialog is opened. This means that there may be several "Checkout" events emitted for product that was purchased just 
once or that was never purchased.

### GA event format ###

Category         | Action         | Standard Enhanced Ecommerce event?     
---------        | -----------    | -----------               
`E-commerce`     | `checkout`     | Yes (with one or many products attached)


## Purchase

This event is emitted when a product (or several products) is purchased.

[![](purchase_event.png)](/images/purchase_event.png)

_In the screenshot above the user has finalized the payment and the order confirmation dialog has been displayed. "Purchase" event has been emitted._

### GA event format ###

Category         | Action         | Standard Enhanced Ecommerce event?        
---------        | -----------    | -----------               
`E-commerce`     | `checkout`     | Yes (with one or many products attached)
