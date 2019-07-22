# Rest API

Tipser provides a RESTful API you can use to fully integrate your platform with Tipser.

##Endpoints

##Markets

> Get available markets

```curl
GET https://t3-prod-api.tipser.com/v4/markets
```

> Market model:

```js
{
  id: "59dde7e3b8f3f67f24d6f6c9",
  name: "CH_FR",
  currencyName: "CHF",
  currencySymbol: "CHF",
  country: "CH",
  locale: "fr-CH",
  defaultVat: {
    value: 8,
    formatted: "8%"
  },
  availablePsp: [
    "stripe"
  ]
}
```

Available markets for the product endpoint: `/v4/markets`

These parameters control the market in the API and are used for some of the methods.

Market controls the currency, and ship-to country. 

Available markets are: 

Name | Country
---- | -------------
de | Germany 
de-CH | Switzerland - German language
fr-CH | Switzerland - French language
se | Sweden (default) 

These parameters control the market in the API and are used for some of the methods.

##Products

> PRODUCT MODEL

```js
{
    id: string,
    title: string,
    description: string,
    priceIncVat: {
        value: integer,
        currency: string,
        formatted: string
    },
    vat: {
        value: integer,
        formatted: string
    },
    currency: string,
    deliveryTime: string,
    deliveryCost: {
        value: integer,
        currency: string,
        formatted: string
    },
    brand: string,
    categories: [{
        department: string,
        section: string
    }],
    categoriesValue: string,
    market: string,
    merchant: string,
    merchantName: string,
    accessRights: string,
    isInStock: boolean,
    images: [{
            250 x: URI,
            450 x: URI,
            960 x: URI,
            id: string,
            original: URI,
            50 x50: URI
        },
        {...}
    ],
    variants: [{
            id: string,
            productId: string,
            title: string,
            description: string,
            stockCount: integer,
            stockCountUnlimited: boolean,
            attributes: {
                key: string
            },
            attributesValue: string,
            priceIncVat: {
                value: integer,
                currency: string,
                formatted: string
            },
            vat: {
                value: integer,
                formatted: string
            },
            currency: string,
            images: [{
                250 x: URI,
                450 x: URI,
                960 x: URI,
                id: string,
                original: URI,
                50 x50: URI
               },
               {...}
            ],
            sku: string,
            isInStock: boolean,
            gtin: {
                type: "Unknown",
                value: "874034007676"
            },
            mpn: "80950086000"
        },
        {...}
    ],
    lastUpdateDate: date,
    freeReturn: boolean
}
```

All product related methods: `/v4/products`

###Fetching products using search
Search over Tipser public product repository, with support for filtering by text, brands, prices with sorting and pagination.

`GET https://t3-prod-api.tipser.com/v4/products`

Query string parameters

query | string | Search query
----- | ------ | -----------
brands | string | Brand name
merchants | string | Merchant name  
limit | integer | Number of items to show
skip | integer | Number or items to skip  
sort | name/-name/price/-price	 
priceFrom | integer	 
priceTo | integer	 
market | string | See above

Example requests (try me):

[https://t3-prod-api.tipser.com/v4/products?query=vita+skor&brands=Birkenstock] (https://t3-prod-api.tipser.com/v4/products?query=vita+skor&brands=Birkenstock)

[https://t3-prod-api.tipser.com/v4/products?limit=3]
(https://t3-prod-api.tipser.com/v4/products?limit=3)

[https://t3-prod-api.tipser.com/v4/products?limit=3&skip=3]
(https://t3-prod-api.tipser.com/v4/products?limit=3&skip=3)


###Fetch product by id


`GET https://t3-prod-api.tipser.com/v4/products/:productId(?pos=:posId)`

Query string parameters
**productId:** string
**pos:** string (optional) - posId needed to ie. show pos-specific discounts etc.

[https://t3-prod-api.tipser.com/v4/products/5889a1648aa0ce36b8cd5663]
(https://t3-prod-api.tipser.com/v4/products/5889a1648aa0ce36b8cd5663)

[https://t3-prod-api.tipser.com/v4/products/5889a1648aa0ce36b8cd5663?pos=54fdfcf378415516b41e88c8]
(https://t3-prod-api.tipser.com/v4/products/5889a1648aa0ce36b8cd5663?pos=54fdfcf378415516b41e88c8)


##Essential product model attribute

**id:** used to reference for the product when adding to cart or getting to know more about it (ie. list of variants, similar products)

**images:** a list of image objects, keyed by the resolution (250,450,960) but also with an option to get the original size. Also, note underlined URI fragment (h_50,w_50), that you may modify to get the desired image size.

**price:** original price of an item

**salesPrice:** the price that we currently sell the item for. If it is equal to the price, it means that there's no any sale. If the price is lower, then it means the product is on a sale

**available:** if true, you should be able to add it to cart. else no

**variants:** all SKUs nested into the master product

**attributes:** what concrete product variant is that (color, size, sex etc)

##Category names

Get translated category names for a product
To get the translated category names, used in the product model, you can use the API endpoint:

`GET https://t3-dev-api.tipser.com/v4/categories?market=se`