#Configuration options

To initialize Tipser Elements or Tipser SDK, you need to create a tipser const.

```javascript
const tipser = tipser.elements(posId: string, options: TipserSdkConfig);
```

Arguments:

posId (string) - id of shop's account in Tipser (required)

options (object) - an object of options (optional)

Example:

```javascript
const tipser = TipserSDK("59e86b79b8f3f60a94ecd26a", {primaryColor: "yellow"});
```

The example connects Tipser SDK with Tipser shop and sets primary color to yellow.

### Environment

```javascript
const tipser = tipser.elements("59e86b79b8f3f60a94ecd26a", {env: "stage"});
```

By default, Tipser ELements and SDK connect to production Tipser environment. Yet if testing environment is preferred (e.g. in order to do test purchase), then it can be customized with env parameter in Tipser options, which accept the following values:

**prod** or production

**stage** or staging

**dev** or development

## Language and locale

`lang` configuration option specifies the language to be used. Supported languages are currently: `en`, `de`, `fr` and `sv`.

```js
  tipser.elements('posId', {
    lang: 'en'
  })
```

It affects all the localizable texts in the UI - buy buttons, store, shopping cart and checkout. It does not affect the currency in which the customer will pay for the product.


##Parameters for dialog customization
Sometimes Tipser dialogue styling and functionality needs to be customized. It is possible with modalUi parameters group.

> Complete example of dialog customizations:

```javascript
const tipserOptions = {
    modalUi: {
      hideSearchIcon: true,
      hideFavouritesIcon: true,
      hideCartIcon: false,
      hideMoreIcon: true,
      hideSimilarProducts: false,
      useCustomCss: true
    }
};
```

##Hiding icons on menu bar

The following parameters under modalUi can be used to selectively hide tipser icons on the dialog menu bar: 

`hideSearchIcon` <br> 
`hideFavouritesIcon` <br>
`hideCartIcon` <br>
`hideMoreIcon` <br>

[![](widget1.png)](/images/widget1.png)

##Hiding Similar Products Module

Similarly, `hideSimilarProducts` parameter, if set to **true**, can be used to hide Similar Products Module on product page

[![](widget2.png)](/images/widget2.png)

##Custom CSS

If there is a need to use custom css stylesheet, it may be activated in two steps:

1. set `useCustomCss` parameter to **true**
    
2. Send the custom css stylesheet to Tipser administrator in order for it to be uploaded to your account.

##Disable Hash Navigation

By default adding the hash to your shop's URL is turned on. It means you can link directly to the product page or collection on your site. If, for some reason, you wish to turn this behaviour off, just add this configuration option: 

```javascript
const tipserOptions = {
    disableHashNavigation: false
};
```