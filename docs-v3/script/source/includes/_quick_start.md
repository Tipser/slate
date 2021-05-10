# Quick start

This tutorial explains how to initialize and render Tipser Script on your page. You are required to have a publisher account created in order to get the `posId`, as well as have some collections created in your shop <a href="https://app.tipser.com/" target="_blank">managed here</a>.

If you're all set up, follow the three steps below to install Tipser Script on your site!

---

## Installation of Tipser Script

To include Tipser Script on your site, use the following `script` element. It exposes a global `tipserScript` variable that can be used to initialize and configure Tipser Script.

```html
<script src="https://cdn.tipser.com/tipser-script/v3/tipser-script.min.js"></script>
```

<aside class="notice">
Make sure that Tipser Script is <strong>loaded only once on your page</strong>. Additionally, for the best performance it is recommended to put the <code>script</code> element at the end of the <code>body</code> element on your page. 
</aside>

---

## Inserting Tipser Store

Insert this HTML tag on your page in the place where you want the store to appear. For a good effect you may want to put it on a dedicated subpage, as larger stores may occupy a significant space on the page.

```html
<div data-tipser-store></div>
```

<aside class="notice">Tipser Script works by scanning your HTML and replacing special tags with shoppable elements - even if these special tags are added dynamically, thanks to the usage of <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver">MutationObserver API</a>.</aside>
***

## Initializing Tipser Script

Finally, to initialise Tipser Script, run the following line of JS code:

```js
tipserScript.initialize("posId");
```

Make sure that the `posId` is replaced with the actual id corresponding to your account.

If you need to pass custom settings (see: [configuration](#configuration-options)), you can pass an `options` object as the second argument.

```js
tipserScript.initialize("posId", options);
```

A complete working example could look like below:

```html
<!DOCTYPE html>
<html>
  <body>
    <div data-tipser-store></div>
    <script src="https://cdn.tipser.com/tipser-script/v3/tipser-script.min.js"></script>
    <script>
      tipserScript.initialize(MY_POS_ID, {lang: "en-US"});
    </script>
  </body>
</html>
```

If everything was done correctly, you should see the `Store` element populated with all your store collections in place of the `<div data-tipser-store></div>` tag.

[![](../images/tipser_elements_store.png)](/images/tipser_elements_store.png)

> <a href="https://codepen.io/tipser-tech/pen/wvJaYOZ" target="_blank">Open this snippet on Code Pen</a>

<aside class="success">Congratulations! You have successfully integrated and setup Tipser Script on your site.</aside>

---
