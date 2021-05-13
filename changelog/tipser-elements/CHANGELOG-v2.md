# Changelog
All notable changes to Tipser Elements project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [2.3.19] - 2021-05-13

## Fixed
- reset styles of class "label" and "value" colliding with Bootstrap

## [2.3.18] - 2021-05-12

### Added
- TipserScript: added support for `data-tipser-modular-cart` attribute

### Changed
- rename `Checkout` to `CheckoutPage`

### Deprecated
- `Checkout` component will be removed soon (please use `CheckoutPage` instead)

### Fixed
- changed the generic class names colliding with Bootstrap styles
- removed redundant comma from collapsed address form in checkout


## [2.3.17] - 2021-04-28

### Added
- `useCartContext` hook is now exported
### Changed
- trying to call tipser.elements() function more than once will display a warning on the JS console and return a cached instance from the original call
- Unified the product list UX across cart, checkout and confirmation pages

## [2.3.16] - 2021-04-27

### Added
- new configuration option under `customUrls` called `cartUrl` controlling

### Fixed
- Fixed oversized image problem for some specific products

### Changed
- Products at the product list are no longer clickable on the default confirmation page

## [2.3.15] - 2021-04-27

### Fixed
- Fixed the problem with promo code not updating Klarna price in Checkout V1

## [2.3.14] - 2021-04-26

### Added
- `te-promo-code-toggle` CSS class on the promo code toggle element in the standard checkout for easier hiding it via CSS

### Fixed
- Subtotal price is now correctly displayed in Checkout v2 when there is no discounts
- `useCheckoutContext()` hook is now working correctly even with Checkout v1 being used

## [2.3.11] - 2021-04-21

### Fixed
- incorrect rendering of the product image on the default product dialog sometimes on the mobile breakpoint
- too many render cycles of ProductImage component in some circumstances

## [2.3.10] - 2021-04-19

### Added
- new config props for `AddedToCart` component called `duration` and `className`
- product brand and variant name to `AddedToCart` popup

### Fixed
- fixed the problem with infinite redirect cycle that may happen on the confirmation page when using `enableCheckoutV2: true` flag with Tipser Widget and `customUrls.confirmationUrl`

## [2.3.9] - 2021-04-13

### Fixed
- removed delay when rendering Modular Checkout with Tipser Script
- `ProductPrice` component is not displaying tax information for the US market

### Changed
- the currency is no longer displayed on `CheckoutProductList` component when there is no products in the checkout

## [2.3.8] - 2021-04-12

### Fixed
- Fixed the “zip code does not match state” error not being displayed to the user after submitting the delivery address form
- `ModularCheckout.Empty` section is no longer getting ignored in Checkout V2 when opening the checkout page with an empty cart
- "Added to cart" popup shows the price of the specific variant added instead of of master product price

### Changed
- Removed “org. no” row on the checkout merchant summary on the US market

## [2.3.7] - 2021-04-08

### Fixed
- Visual errors in `ProductThumbnails` component
- Modular Checkout not rendering with Tipser Script when checkout module elements are added dynamically

## [2.3.6] - 2021-04-08

### Fixed
- Modular Checkout not rendering with Tipser Script when used with `enableCheckoutV2` flag enabled

## [2.3.5] - 2021-04-08

### Added
- Alternative TipserScript tags: `data-tipser-product-tile`, `data-tipser-product-listing`, `data-tipser-product-page`, `data-tipser-product-id`, `data-tipser-collection`, `data-tipser-collection-id`

### Changed
- Unified order summary across the checkout page and confirmation page in the checkout component for US

### Fixed
- Modular Checkout not rendering with Tipser Script when used with `enableCheckoutV2` flag enabled
- Swiping problem solved in `ProductThumbnails` with `direction: "horizontal"`

## [2.3.4] - 2021-04-01

### Changed
- The error object returned from failed promises (e.g. from the "internal functions", like `addToCart`) has now a simple structure of `{id: string, message: string}`

## [2.3.3] - 2021-03-31

### Changed
- The new Tipser Checkout 2.0 API is now enabled only for the users who use the `enableCheckoutV2` config option

## [2.3.2] - 2021-03-30

### Added
- `<ModularCart.Empty>` and `<ModularCart.NonEmpty>` sections to be used within `ModularCart`

### Fixed
- `ModularCart` displays a loader until the cart data is loaded from the backend, instead of rendering immediately
- `ModularCart` is sending tw-track events (\[action: VIEW: Target: CART\], \[action: ADD: Target: CART\], \[action: REMOVE: Target: CART\])

## [2.3.0] - 2021-03-26

### Added
- `ModularCart` component with `CartProductList` and `CartSummary` subcomponents
- Integration with the more robust Tipser Checkout 2.0 API, that is enabled with `enableCheckoutV2` configuration option
- `readOnly` prop on `CheckoutProductList` to disable making any modifications to the checkout on the checkout page (disabled by default)
- customs warning displayed on the `CheckoutSummary` component, when the US checkout has products imported from outside of US


### Changed
- On the checkout address state pickers removed the states that are not supported by Tipser (like `American Samoa` or `Guam`)
- `Checkout` stylistic improvement: the pay button now has more width and padding
- "added to cart" popup is being displayed after adding a product to cart even when there is no `Cart` component on page (before having a `Cart` component was a hard dependency)

### Deprecated
- `CheckoutCartProducts` and `CheckoutCartSummary` components. Renamed to `CheckoutProductList` and `CheckoutSummary` respectively


## [2.2.14] - 2021-03-05

### Changed
- `ProductImage` component contains only main product image with new props (enableDots, enableSwipe, swipeAnimation, enableArrows)

### Added
- `ProductThumbnails` component for displaying thumbnails in `ModularProduct`
- `ProductTile` component as the new official way to render a product tile

### Changed
- `ProductImage` component contains only main product image with new props (enableDots, enableSwipe, swipeAnimation, enableArrows)

### Deprecated
- `<Product viewMode="compact" />` syntax as a way to render a product tile

### Fixed
- Label of the add to cart button is changed to "added to cart" (for a few seconds) when a product is added to cart

## [2.2.13] - 2021-02-24

### Fixed
- Resolved the problem with creating Klarna checkout on some specific publisher URLs

## [2.2.12] - 2021-02-22

### Added
- `ModularProduct` and `ModularCheckout`: Exported `useProductContext` and `useCheckoutContext` for external users

### Fixed
- Analytic events "product clicked" and "product detail viewed" are now sent every time when product dialog is displayed

## [2.2.11] - 2021-02-22

### Fixed
- Brought back the `checkout` event in the `Checkout` and `ModularCheckout` components

## [2.2.10] - 2021-02-19

### Added
- Exposed more internal functions: `getCartItems` and `removeFromCart`

### Changed
- Internal functions `addToCart` and `addToCartAndGoToCheckout` are not returning promises

## [2.2.9] - 2021-02-17

### Added
- configuration option `prePopulatedAddress` that makes it possible to prepopulate user's address forms,
- `updateConfig` function on Tipser Script instance object to update the configuration dynamically.
- Tipser Script: added `checkout-delivery-address-change` and `checkout-billing-address-change` HTML

## [2.2.8] - 2021-02-15

### Added

- Modular Checkout: `hidePayButton` prop in `CheckoutPayment` component
- Modular Checkout: `checkoutContext.payment.paymentForm.submit()` function is now available allowing to implement custom pay button for Stripe payments

## [2.2.7] - 2021-02-15

### Fixed
- Product dialog styles for tablet
- TipserScript: Order of context events. The first `checkout-context-change` will be sent after `checkout-context-ready` event.
- Problems with validation in checkout addresses if the fields were auto-completed by the browser
- Analytics: when the user changes the quantity of the items in the cart, sending "add to cart" or "remove to cart" with a proper `quantity` field
- Modular checkout: submit function exposed from the checkout context now triggers form revalidation.
- Modular checkout: delivery address do not send billing address when the checkbox (billing address same as delivery) is hidden.
- Analytics: "Product purchased" is now being sent to the publisher's code via `tw-track` event

## [2.2.6] - 2021-02-04

### Added
- `CheckoutCartProducts` now lets the user to enter product quantity larger than 10.
- "Same billing and delivery address" checkout available for `ModularCheckout` (visible by default, if `CheckoutCustomerAddressBilling` component is available under `CheckoutCustomerAddressBilling`, but can be hidden with `hideUseAsBillingAddressCheckbox` property on `CheckoutCustomerAddressBilling` element)
- Accepted cart icons in Stripe payment form.
- New prop for `CheckoutCustomerAddressDelivery` and `CheckoutCustomerAddressBilling` called `submitBehavior` (accepted values: `"none"`, `"collapse"`) controlling if the form should collapse after submission
- New prop for `CheckoutCustomerAddressBilling` called (accepted values: `"none"`, `"validDeliveryAddress"`) controlling if this element should appear right away (if the value is `"none"`) or only after the delivery address form is filled with valid data
- New prop for `CheckoutPayment` called `dependsOn` (accepted values: `"none"`, `"validAddress"`) controlling if this element should appear right away (if the value is `"none"`) or only after the address form(s) is filled with valid data
- Padlock icon and loading indicator over the buy button in the `CheckoutPaymentStripe` element
- `useInternalFunctions` hook that allows to use `addToCart`, `addToCartAndGoToCheckout`, `goToProduct` and `goToCheckout` in imperative way
- Tipser Script: `ProductPage` component available from the HTML syntax via the `data-tipser-product-page` attribute
- Tipser Script: all React attributes of `ModularCheckout` and `ModularProduct` modules have a html counterpart. For example, `CheckoutCustomerAddressDelivery` element has a React property called `hideSubmitButton`, which can be controlled by `data-tipser-hide-submit-button` attribute in HTML
- TipserScript: customer's own "submit" button can be used to submit the billing and delivery address forms in `ModularCheckout`, using the `checkout-context-ready` and `checkout-context-change` HTML events

### Changed
- URL hash property from `Store` component will be collection name instead of collection id.
- CSS class names and styles structure in modular product component.

### Fixed
- Add to cart request failure will not cause the white screen anymore.

## [2.2.5] - 2021-01-25

### Fixed
- Close button on the dropdown with cart summary

## [2.2.4] - 2021-01-22

### Added
- `ModularCheckout.Empty` section in ModularCheckout that is displayed when there is no product in the checkout

### Fixed
- Checkout: when the last product is removed from the cart, Checkout component will display a list of similar products

## [2.2.3] - 2021-01-21

### Added
- Tipser Script: Payment status change event that can be used to render modular checkout parts conditionally

### Fixed
- Checkout: when the last product is removed from the cart, Checkout component will display a list of similar products
- Resolved an issue with too many shopping cart requests being sent from the `Cart` component

## [2.2.2] - 2021-01-21

### Fixed
- Checkout component will not crash if a user has a product with stock count 0 during the first render

## [2.2.1] - 2021-01-20

### Added
- `<CheckoutOrderConfirmation>`, `<CheckoutOrderProcessing` and `CheckoutLegal` components are supported by Tipser Script

### Fixed
- Checkout used from Tipser Script works correctly
- Klarna payment in modal works correctly
- Missing billing address form on page does not block the payment form
- Incorrect data in billing address form blocks the payment form
- The checkbox to use delivery address as billing address is not visible in case of modular checkout


## [2.2.0] - 2021-01-18

### Added
- Support for `className` prop for modular checkout components
- Support for `className` prop for modular product components
- Simplified modular checkout syntax (replaced <CustomerAddressDelivery {...checkoutContext} /> syntax with just <CustomerAddressDelivery />)
- Added helper components to distinguish checkout statuses (ModularCheckout.New, ModularCheckout.Processing and ModularCheckout.Confirmed)

### Breaking changes
- `ModularProduct` component with empty children is no longer supported. Use `ProductPage` component instead!
- Renamed modular checkout components to have common prefix (e.g. CustomerAddressDelivery renamed to CheckoutCustomerAddressDelivery )
- Split checkout into two components: Checkout and ModularCheckout

### Known issues
- Checkout does not work in case of Tipser Script (React version is not affected)
- Klarna payment in modal doesn't work

## [2.1.69] - 2021-01-14

### Added
- Stripe checkout is respecting customUrls.checkoutConfirmationUrl config
- Tipser Elements Script: data-tipser-modular-product-id component is emitting two custom HTML events: `product-context-ready` and `product-variant-changed`

### Changed
- Stripe checkout: the buy button becoming disabled after it has been first clicked (to avoid multiple clicks)

### Fixed
- Checkout confirmation page won't crash if re-visited after user's shopping cart has expired

## [2.1.68] - 2021-01-08

### Added
- Support for `customLabels` configuration options for modular components

### Changed
- Trying to use Tipser components without a wrapping TipserElementsProvider will now throw an error with a much cleaner error message

## [2.1.67] - 2021-01-05

### Added
- New language in config: `de-DE-formal`
- Error validation for US delivery address in checkout
- Simplified React syntax for modular product
- Html syntax for modular checkout

### Changed
- Cart component styles: cart size indicator scales when the size of cart icon is changed
- Cart component class names changed: `.te-cart-icon` to `.te-cart`, `.tipser-icon-cart` to `.te-cart-icon`.

### Fixed
- Cart component now supports className property

## [2.1.66] - 2020-12-21

### Changed
- The label "OFF" (like "-20% OFF") on the product view is now translatable

### Fixed
- Klarna component shows the correct price after the user modifies the order on the checkout page

## [2.1.65] - 2020-12-17

### Changed
- DynamicCollection component now returns product narrowed down to POS whitelisting settings

## [2.1.64] - 2020-12-17

### Added
- Sending the "checkout viewed" event to whisperer and GA when the user opens the new checkout view

### Changed
- Reduced bundle size by about 50 kBs (gzipped) by switching the implementation of checkout animations from JS to CSS

### Fixed
- Overlay with "Update my Cart" button in the modal (when the product quantity / availability changes during the checkout)
- Fixed the problem with the main product image occasionally not appearing on mobile
- Closing modal by pressing Esc button is now possible again

## [2.1.63] - 2020-12-10

### Fixed
- Added some missing swedish translations to the new product dialog

## [2.1.62] - 2020-12-10

### Changed
- replaced some divs and spans with semantic HTML tags
- default `useCustomCSS` config option set to `true`
- [Elements CMS] updated the Contentful client library to the newest version

### Fixed
- fixed a visual glitch with slightly larger delivery cost font size on the new product dialog (compared to other fields)

## [2.1.61] - 2020-12-09

### Added
- Don't display `Details` link button when there is no `StyleWith` component
- Support for `className` attribute in `Product`, `Collection`, `Store` and `CartIcon` components
- `CartIcon` component is now using the top-level class name `te-cart-icon` (consistent with each other class names)

### Changed
- Clicking outside of the new product dialog causes it to close

### Deprecated
- the old `cart-icon` class name of the `CartIcon` component

### Fixed
- Scroll to top of the modal when click on `Similar Product`
- Inconsistent way of displaying currency in the cart preview overlay

## [2.1.60] - 2020-12-02

### Added
- DynamicCollection element that renders product tiles returned by search results

### Changed
- Replaced all the clickable `div` elements in the HTML with `button` elements (moving towards more semantic HTML)

### Fixed
- Removed horizontal scrollbar from the new modal (activated by `openOldDialog:false` setting)

## [2.1.57] - 2020-11-26

### Fixed
- Fixed some minor stylistic issues and added the missing label translations to the new modal (activated by `openOldDialog:false` setting)

## [2.1.56] - 2020-11-26

### Added
- Introduced `elements.openProductDialog` and `elements.openCheckoutDialog` in the widget

### Fixed
- Cart icon no longer appears in the Klarna Checkout dialog

## [2.1.54] - 2020-11-25

### Changed
- Product variant selector in ProductContext component now uses a visually nicer implementation of the dropdowns instead of raw HTML (native) dropdowns

### Fixed
- "Show description" link in the ProductContext component now correctly scrolls down to the product description section

## [2.1.53] - 2020-11-19

### Fixed
- Fixed the missing "Out of stock" label on the add to cart button and not blocking it in some corner cases on the Product with viewMode="full" component (a regression introduced in the previous version)
