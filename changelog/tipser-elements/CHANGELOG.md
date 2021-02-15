# Changelog
All notable changes to Tipser Elements project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.7] - unreleased

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
