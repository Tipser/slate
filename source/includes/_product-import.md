# Product Import

Tipser has a few different possibilities to automatically synchronise product data, stock status and prices to be as close to the status of the source system as possible.

### Existing Integrations

There are a number of systems that offer API access to the product data, that Tipser can use out of the box. Please see this article about our [existing integrations](https://developers.tipser.com/merchant-on-boarding-start/existing-integrations).

### Product Feed Integration

Tipser can read a complete feed of product data from the merchant source system that returns all available products.

The preferred format is in either XML or JSON, but Tipser can handle feeds from most e-commerce platforms. A more detailed specification can be worked out based on the available feeds in the source system (the merchant's system).

The preferred Tipser standard feed format can be found [here](#product-feed-specification).

Tipser prefers a structure where all variants are nested into the `Product`, but a flat product structure could also be stitched together given that there's a `VariantId` or `GroupId` that specifies what products belong into the same group.

### Live Update

To keep stock count, availability and prices as accurate as possible, Tipser has implemented the possibility to check this data on the fly, e.g. as soon as a visitor requests this data in the frontend, or when the shopping cart is loaded. This way Tipser prevents selling products that are out of stock.

<aside class="success">Tipser Developers aim to help developers to integrate with www.tipser.com.</aside>

## Tipser Product Feed Specification 
### Preffered Feed Format

Our preffered feed format is Google Merchant Feed (GMF). You can find it's specification here [GMF documentation](https://support.google.com/merchants/answer/7052112). GMF can be delivered both as XML or CSV files (Examples at the bottom). See our hints on how to generate good quality feed and have higher chance of selling the products.

You can still view documentation for our old Tipser feed format here Old Product [feed specification](#product-feed-specification).

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

## Product Feed Specification

This format of the feed is no longer maintained. All integrations that are live already will remain supported.

See [Product Feed Specification](#product-feed-specification) for our current preffered feed specification.

This is the preferred format for import of product data to tipser.com. Example feeds are located further down.

Outline of the xml format:

```xml
<?xml version="1.0" encoding="utf-8"?>
<TipserFeed>
  <Currency></Currency>
  <CreationDate></CreationDate>
  <Products>
   <Product></Product>
  <Products>
</TipserFeed>
```

## Product Structure
The products `<product></product>` in the feed need to be nested with all it's variants (colours, size, etc.).

Every single product as well as the variants in the product can contain unique images, descriptions, prices, properties, etc. for maximum flexibility. Every single variant should have a SKU to ensure there's a unique match between the systems. If there's another field that uniquely identifies a certain product between the systems, such as ProductID (e.g. when SKUs are re-used), this shall be specified on the product and variant level.

## Header Fieds

Element | Value Type | Description
----- | ------ | -----------
Currency | string | Currency of the prices in the feed e.g. **SEK,DKK,EUR**
CreationDate | DateTime | The time the XML was created or generated. E.g. 2013-01-08T15:13:30 
Products | Product | All products that are current for this merchant. (see below)

## Products

The `Products` element can have any number of `Product` elements. `Products` defines all the products to be available for this merchant. If an existing product is removed from the feed, the product will also be hidden in the shop.

Mandatory attributes
The `Product` element defines one product using the following element:


Element | Value Type | Description
----- | ------ | -----------
Name | String | The name of the product.
Description | String | The description of the product.HTML code will be removed from the text.
Price | Integer | The current sales price of the product (excluding VAT).
FreightCost | Integer | The freight cost of the product (excluding VAT).
VAT | Integer | The VAT applied to the product and freightcost, ex 12 (for 12%)
MediaData | List<Media> | A list of url:s to images related to the product. The first image in the list will be used as the primary image for the product. <br>Note: the product must contain at least one image. <br>Tipser converts images to preferred resolution, so high resolution images are preferred in this feed.
ProductId | String | The unique identifier of the product in the source system that generated the export. This number is used to uniquely identify the product in the Tipser system and is never exposed to visitors. <br>NOTE! This value has to be unique for each product!
Variants | Variant | See below the structure of a variant <br> NOTE! There needs to be at least one variant per product.
AdditionalMetaData | `<MetaData>` <br> `<Key></Key>` <br> `<Value></Value>` <br> `</MetaData>` | A list of Meta Data that describes the product, mandatory element must contain manufacturers ID (MPN), EAN, GTIN, ISBN, etc. e.g.: <br>Key: “EAN” - Value: “978020137962”, <br>Key: “GTIN” - Value: “978020137962”, <br>Key: “ISBN” - Value: “978020137962”,

## Optional elements
The `Product` element can also have the following optional elements:

Element | Value Type | Description
----- | ------ | -----------
Full price | Integer | The list price, or original price of the product.
Brand | `<Name></Name>` <br> `<Media></Media>` | The brand of the product. Brand contains the required element `<Name>` with the brand name as a string. Optionally an `<Media>` for brand logo, can be added when creating new brands. Existing brands are not updated by this data.
Status | String | “Active” or “Inactive”, (default “Active”). Inactive marks the product as not being for sale and removes the product from being listed on Tipser.com, and the purchase functionality from already existing widgets.
OriginUrl | URL | The url to the product detail page for the product.
Categories | Category | A list of category names, e.g. Kids, Kitchen, Beds, Cookware<br>Can also for higher accuracy be Home > Lights > Floor Lamps
AdditionalMetaData | `<MetaData>` <br> `<Key></Key>` <br> `<Value></Value>` <br> `</MetaData>`| A list of Meta Data that describes the product, such as <br> Key: “Gender” - Value: “Male/Female/Unisex”, <br>Key: “Colour” - Value: “Blue/Green/#233456”, <br> Key: “Gender” - Value: “Male/Female/Unisex”, <br> Key: “Gender” - Value: “Male/Female/Unisex”,
DisplayAttributes| `<Attribute>` <br> `<Key></Key>` <br> `<Value></Value>` <br> `</Attribute>` | A list of attributes to display together with the product, a specification of the prdouct. This could be properties such as Height, Width, Weight, Designer, etc.
DeliveryTime | `<DeliveryTime>` <br> `<Min>integer</Min>` <br> `<Max>integer</Max>` <br> `<Unit>string</Unit>` <br> `</DeliveryTime>` | The unit can be a string that we map; days, weeks, etc.
DeliveryNote  | String | If the delivery time cannot be mapped to integers and units, or there's a special message needed to be attached to the product, e.g. "made to order", this field could be used.
BoughtTogetherWith | String | A list of ProductIds comma separated.
ReplacableWith | String | A list of ProductIds comma separated.

## Variants

The **Variant** in the Product element can have the same attributes as the `Product`, and will then overwrite the attributes from the master product. Otherwise the variant will inherit the master product attributes.

However, there are a few elements that are mandatory on the variant level that `VariantProductId` and `SkuId`.

Element | Value Type | Description
----- | ------ | -----------
VariantProductId | String | The unique identifier of the SKU in the source system that generated the export. This number is used to uniquely identify the variant in the Tipser system and is never exposed to visitors.
SkuId | String | The identifier for each SKU that best describes for the merchant and customer what product has been ordered. This value is printed on the receipt as well as in the merchant order notification.<br>NOTE! It is recommended to keep this value unique.
Stock | Integer | The amount of products that are available in stock.
SelectableAttributes | `<Attribute>`<br>`<Key></Key>`<br>`<Value></Value>`<br>`</Attribute>` | A list of possible selections that the user can make when ordering the product, such as Size or Color. If attributes are used, all variants within the same product must have the same number of attributes and they must use the same key.