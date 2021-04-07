# Migration guide

### Initialization

The way to initialize Tipser Script has changed. It used to be:

```js
tipserScript.initialize(posId,config)
```

Now it is:

```js
tipserScript.initialize(posId, config)
```

### `Store` component

The HTML syntax for the `Store` component used to be:

```html
<div id="tipser_store"></div>
```

Now it is:

```html
<div data-tipser-store /></div>
```

Additionally, optional `data-tipser-inline-menu` was renamed to `data-tipser-inline-mobile-menu`. 
