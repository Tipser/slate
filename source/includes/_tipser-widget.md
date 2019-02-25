#Tipser Widget

Tipser Widget is a script to embed Tipser products and shops on other pages.

## Basic usage ##

> To use Tipser Widget, add this snipper to your page:

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

The recommended place to add this script is the end of the `<body>` tag of your page.

`lang` parameter specifies the language to be used. Supported languages are currently: `en`, `de` and `sv`.

<aside class="notice">
Make sure to replace <code>myPosId</code> with your Tipser account id. If you are not sure what to put here, please contact Tipser staff.
</aside>

## Configuration options ##

All the configuration options described in Tipser Elements configuration options \[link missing\] are allowed here. In addition, options below are available specifically for Tipser Widget script.

Parameter | Default | Description | Example
--------- | ------- | ----------- | -------
domReplacementMode | false | should the script replace elements of the original page? See the section [Replacing elements on page](#replacing-elements-on-page) for details. | true
domElementSelectorWhereToMount | none | only used when `domReplacementMode: false`. A [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) to the container where the shop element should be mounted. | domElementSelectorWhereToMount: '#tipser_shop'
tipserElementIdToBeMount | none | only used when `domReplacementMode: false` and `domElementSelectorWhereToMount` is defined. A Contentful id of the element to be mounted at the element specified by `domElementSelectorWhereToMount`.
domElementSelectorWhereToMountCart | none | only used when `domReplacementMode: true`. A [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) for the container where Tipser cart tab should be mounted. If not specified, the Tipser shopping cart won't be displayed on the page. | domElementSelectorWhereToMountCart: "#cart"

## Replacing elements on page ##

When `domReplacementMode` is `true` and Tipser Widget is added to a page, it will replace some elements in the original page with Tipser components, using the following rules: 

### Tipser products ###

```html
<div data-tipser-pid="5ba2334a781baa0001ccdf61" />
```

Elements with attribute `data-tipser-pid` will be replaced with Tipser product component, using the product with Tipser id passed in the attribute.

### Tipser collections ###

```html
<p name="My collection" data-tipser-cid="5b2788909d25801adcb23f4f"
```

Elements with attribute `data-tipser-cid` will be replaced with Tipser collection component, using the collection with Tipser id passed in the attribute.
