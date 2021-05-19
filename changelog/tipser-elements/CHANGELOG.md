# Changelog
All notable changes to Tipser Elements project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.5] - 2021-05-19

## Added
- CheckoutPaymentRequestButton component (to be used in ModularCheckout context) displaying ApplePay or GooglePay payment option, depending on the environment

## [3.0.4] - 2021-05-19

## Fixed
- fixed odd rendering of HTML product descriptions in some cases
- fixed handling of customUrl.checkoutConfirmationUrl when custom `history` implementation from react-router 5 is provided

## [3.0.3] - 2021-05-12

### Added
- new Element components: `ProductTile`, `ProductListing`, `Carousel`, `ModularCart`
- new Script tags: `data-tipser-product-tile`, `data-tipser-product-listing`, `data-tipser-modular-cart-page`
- config property `modalUi: {inheritStyles: true}` removing fixed styles from product and checkout dialog for more convenient application of custom CSS
- Script: added support for  attribute
- added cart summary step before checkout step in the dialog
- prefixed with `te-` the generic class names like `label`, `value`, `uppercase`, `sales`, `regular`, colliding with Bootstrap standard class names
- added `te-promo-code-toggle` css class
- added `showBackToCartButton` prop to `CheckoutProductList` component

### Changed
- renamed `Checkout` to `CheckoutPage` (Elements) and `data-tipser-checkout` to `data-tipser-checkout-page` (Script)
- renamed `readOnly` prop of `CheckoutProductList` component (defaults to `true`) with `editable` (defaults to `false`) with inverse logic

### Fixed
- fixed the problem with promo code not updating Klarna price in Checkout V1
- renamed generic classnames colliding with bootstrap-styled pages
- fixed oversized buy button in checkout
- promo code functionality in checkout is now working correctly
- fixed the problem with wrong product images on the product details page
- fixed `useCheckoutContext()` hook (now works correctly with both with Klarna and Stripe)
- fixed subtotal price field in checkout

## [3.0.2] - 2021-04-19

### Fixed
- using the correct version of the CSS file by Tipser Script
- fixed the problem with infinite redirect cycle that may happen on the confirmation page when using `enableCheckoutV2: true` flag with Tipser Widget and `customUrls.confirmationUrl`

### Changed
- displaying `0.00` as prices on empty checkout

## [3.0.1] - 2021-04-15

### Fixed
- promo code savings information in `CheckoutSummary` (`data-tipser-modular-checkout-summary`) component is now displaying price ex. tax, as expected, after the delivery address is specifed
- fixed a bug with promo code application error not appearing to the user

### Changed
- product variant separator has been changed from "x" to "-" in a various places of the UI, e.g. "S x White" variant name will be now displayed as "S - White"

## [3.0.0] - 2021-04-15

### Changed
- this is the first version 3.x with a set of backwards-incompatible changes that are described in detail on the [Tipser Script 3.x Migration Guide](https://tipser.dev/docs/v3/script/#migration-guide) and [Elements 3.x Migration Guide](https://tipser.dev/docs/v3/elements/#migration-guide) pages
