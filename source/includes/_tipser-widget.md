#Tipser Widget

Tipser Widget is a small and handy script that you can use to embed Tipser products and shops on your page and start selling with Tipser.

## Basic usage ##

To use Tipser Widget, add the following snippet to your page.

```html
<script>
    var scriptTag = document.createElement('script');
    scriptTag.src = "https://cdn.tipser.com/tipser-script/latest.js";
    scriptTag.onload = scriptTag.onreadystatechange = function() {
        TIPSER.init({
            posId: 'myPosId',
            lang: 'en',
            domReplacementMode: true
        });
    }
    document.body.appendChild(scriptTag);
</script>
```

> Make sure to replace `myPosId` with your Tipser account id.

<aside class="notice">
The recommended place to add the script is the end of the <code>body</code> tag of your page.
</aside>

The only part of the script that may be interesting for you is between the curly brackets (`{` and `}`). It is a list of configuration parameters, like `posId` and `lang`, and your are free to modify it to satisfy your needs. (All the following code examples will only include this relevant fragment).
A complete index of all the supported options can be found in [All configuration options](#all-configuration-options) section.

`lang` parameter specifies the language to be used. Supported languages are currently: `en`, `de` and `sv`.

<aside class="notice">
Make sure to replace <code>myPosId</code> with your Tipser account id. If you are not sure what to put here, please contact Tipser staff.
</aside>

Tipser Widget can be used in one of two modes described below, controlled by `domReplacementMode` parameter. They are are intended to satisfy different clients and use cases. Find out which one suits the best for you!

## Usage mode 1: Replacing elements on your page ##

```js
TIPSER.init({
    posId: 'myPosId',
    lang: 'en',
    domReplacementMode: true,
});
```

> Make sure to replace the values for `posId`

This is the simplest way to use Tipser Widget and a good place to start when in doubt. You need to mark HTML elements on your page with special attributes. Tipser Widget will find them and replace with shoppable content.

To activate this mode, set `domReplacementMode` to `true` in Tipser Widget configuration.

Prerequisites: find Tipser ids of products that you want to sell or to create your own customized collections of products on www.tipser.com page.

### Embedding single Tipser products on page ###

```html
<div data-tipser-pid="5ba2334a781baa0001ccdf61" />
```

Elements with attribute `data-tipser-pid` will be replaced with Tipser product component, using the product with Tipser id passed in the attribute.

### Embedding Tipser collectons on page ###

```html
<p name="My collection" data-tipser-cid="5b2788909d25801adcb23f4f"
```

Elements with attribute `data-tipser-cid` will be replaced with Tipser collection component, using the collection with Tipser id passed in the attribute.

## Usage mode 2: Mounting the shop on page ##

```js
TIPSER.init({
    posId: 'myPosId',
    lang: 'en',
    domReplacementMode: false,
    domElementSelectorWhereToMount: ".shopping-zone .shop-container",
    tipserElementIdToBeMount: "3UvCQHKV7gmMdcegDHSr5B"
});
```

> Make sure to replace the values for `posId`, `domElementSelectorWhereToMount` and `tipserElementIdToBeMount`.

In this mode, Tipser Widget renders on your page a shop widget defined in Tipser's CMS (Contentful).

To activate this mode, set domReplacementMode to `false` in Tipser Widget configuration or just skip this option..

The prerequisite is to have a Contentful Shop created and configured (which is typically done by Tipser staff) and dedicate part of your page for Tipser Shop.

`domElementSelectorWhereToMount` parameter is required in this mode. It is a [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) pointing to the element on your page where Tipser Shop will be injected.


## Displaying cart icon ##

```js
TIPSER.init({
  //...
  domElementSelectorWhereToMountCart: ".shopping-zone .shoping-cart-container",
  //...
});
```

To keep the user informed about the state of his shopping cart and make it possible to finalize the checkout process at any time, Tipser Widget can attach a live shopping cart icon on your page.

To make it possible you need to dedicate a part of your page to host a shopping cart and define a CSS selector to it in `domElementSelectorWhereToMountCart` option.

## All configuration options ##

Tipser Widget supports following configuration options.

Parameter | Default | Description | Example
--------- | ------- | ----------- | -------
domReplacementMode | false | should the script replace elements of the original page? See the section [Replacing elements on your page](#usage-mode-1-replacing-elements-on-your-page) for details. | true
domElementSelectorWhereToMount | none | only used when `domReplacementMode: false`. A CSS selector to the container where the shop element should be mounted. | domElementSelectorWhereToMount: '#tipser_shop'
tipserElementIdToBeMount | none | only used when `domReplacementMode: false` and `domElementSelectorWhereToMount` is defined. A Contentful id of the element to be mounted at the element specified by `domElementSelectorWhereToMount`.
domElementSelectorWhereToMountCart | none | only used when `domReplacementMode: true`. A CSS selector for the container where Tipser cart tab should be mounted. If not specified, the Tipser shopping cart won't be displayed on the page. | domElementSelectorWhereToMountCart: "#cart"

In addition to the options described above all the configuration options supported by Tipser Elements library are supported.
   
