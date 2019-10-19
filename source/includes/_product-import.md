# Product Import

Tipser has a few different possibilities to automatically synchronise product data, stock status and prices to be as close to the status of the source system as possible.

### Existing Integrations

There are a number of systems that offer API access to the product data, that Tipser can use out of the box. Please see this article about our [existing integrations](https://developers.tipser.com/merchant-on-boarding-start/existing-integrations).

### Product Feed Integration

Tipser can read a complete feed of product data from the merchant source system that returns all available products.

The preferred format is in either XML or JSON, but Tipser can handle feeds from most e-commerce platforms. A more detailed specification can be worked out based on the available feeds in the source system (the merchant's system).

The preferred Tipser standard feed format can be found [here](https://developers.tipser.com/import-specifications/product-feed-specification-nested-products).

Tipser prefers a structure where all variants are nested into the `Product`, but a flat product structure could also be stitched together given that there's a `VariantId` or `GroupId` that specifies what products belong into the same group.

### Live Update

To keep stock count, availability and prices as accurate as possible, Tipser has implemented the possibility to check this data on the fly, e.g. as soon as a visitor requests this data in the frontend, or when the shopping cart is loaded. This way Tipser prevents selling products that are out of stock.

<aside class="success">Tipser Developers aim to help developers to integrate with www.tipser.com.</aside>

## Tipser Product Feed Specification 
### Preffered Feed Format

Our preffered feed format is Google Merchant Feed (GMF). You can find it's specification here [GMF documentation](https://support.google.com/merchants/answer/7052112). GMF can be delivered both as XML or CSV files (Examples at the bottom). See our hints on how to generate good quality feed and have higher chance of selling the products.

You can still view documentation for our old Tipser feed format here Old Product [feed specification](https://developers.tipser.com/import-specifications/product-feed-specification-nested-products).

### Other Supported Feed Formats:

We have means to integrate with following systems:

* **WooCommerce**
* **Shopify**
* **Magento**
* **Askas**

Keep in mind that not all version might be supported.

### Ensuring Product Quality

The better the quality of your products, the higher the chance of selling the products. Here are some tips:

* Make sure that we can match variants. **item_group_id** field should have the same value for product with variants. Product with variants is the same product in multiple sizes, colors etc. All clothing should have the size attribute. Same attribute should have unique value among other variants.
* Images should be of good quality and the more of them, the better. A minimum for good product is three images (**image_link**, **additional_image_link** fields).
* Description should be detailed and contain all the information customer might be interested in.
* Include delivery time in your feed or inform us what's the default delivery time for all your orders.
* Items with free shipping sell best, consider it (**shipping** field).
* Include google product category in the feed, so we can make your product searchable easier (**google_product_category** field).
* Include GTIN number (**gtin** field).
* Take good care of the availability of your products, make sure to inform us about the stock count (quantity field).
* If the product is targeted to specific gender, add this information in the feed (**gender** field)

## Examples

[GMF CSV Example](https://docs.google.com/spreadsheets/d/1CQC03Soi05dviWre8QNSVgEwdoUoLF7-6tRri051Js4)

[GMF XML Example](https://docs.google.com/document/d/1H1JOt6S25F1MRBRL6c0wdYYyzrUy8LzdSxNB27h7siU)

## Product Live Update

### Introduction
To keep the product data in synch Tipser can check the availability, stock quantity and price on a product level. This will keep the product data as fresh as possible.

### Triggers
When a user checks out a product the following calls will be made from the Tipser System to the target system.

**Trigger: User enter product page**

When the Tipser Product API is called, the system will try to update the product data in the background if the product data age is passed a configured variable.  

```
Call: Get one product
```
Tipser action: Update product price and stock count in Tipser.

**Trigger: User checks out**

When the Tipser Checkout API is called, the system will try to update the product data in the background if the product data age is passed a configured variable.  

```
Call: Get one product
```

Tipser action: Update product stock count, if less than 1: abort checkout.

[![](triggers.png)](/images/triggers.png)

### Your API
The endpoint that Tipser will check at your end will ideally respond to a query parameter, where they query parameter is the `ProductId` (e.g. ` `)

and the body payload similar to

```js
{
    id: "55395520784155158c30c57b",
    priceIncVat: {
        value: 195,
        currency: "SEK",
        formatted: "195 kr"
    },
    vat: {
        value: 25,
        formatted: "25%"
    },
    deliveryCost: {
        value: 0,
        currency: "SEK",
        formatted: "0 kr"
    },
    isInStock: true,
    variants: [{
            id: "55395520784155158c30c57b",
            stockCount: 20,
            stockCountUnlimited: false,
            priceIncVat: {
                value: 195,
                currency: "SEK",
                formatted: "195 kr"
            },
            vat: {
                value: 25,
                formatted: "25%"
            },
            sku: "TSWODCFM",
            isInStock: true
        },
        {..}
    ],
    lastUpdateDate: "2018-06-21T07:07:53.278Z",
}
``` 