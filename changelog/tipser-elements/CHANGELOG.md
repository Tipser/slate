# Changelog
All notable changes to Tipser Elements project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.10] - 2021-06-11

### Fixed
- Checkout address form submit issue introduced in 3.0.9

## [3.0.9] - 2021-06-11

### Fixed
- Tipser Script: Dynamic adding of modular product child components works correctly
- Removed US payment provider logos from the EU checkout pages
- Restored the "edit cart" button on the checkout page
- Fixed `CartIcon` button not reacting to click after Tipser modal was open for a specific customer environment

## [3.0.8] - 2021-06-03

### Fixed
- Using `CheckoutCustomerAddressDelivery` and `CheckoutPaymentRequestButton` together doesn't cause problems with selecting shipping address on payment request window

## [3.0.7] - 2021-05-31

### Fixed
- Customer data is available on confirmation page after payment using CheckoutPaymentRequestButton component
- Tax calculation works correctly in case of combining external address form and CheckoutPaymentRequestButton

## [3.0.6] - 2021-05-26

### Added
- `lang` config option impacts Klarna Checkout language
- `variantId` field added to checkout-related `tw-track` events
- support for "preowned" label in product-related components
- `CartPage` component: syncing cart between browser tabs

### Fixed
- CheckoutPaymentRequestButton no longer crashes with useStandaloneAddressForm=true prop
- `Purchase` `tw-track` event is now being correctly send in Checkout 2.0 after successful transaction

## [3.0.5] - 2021-05-19

### Added
- CheckoutPaymentRequestButton component (to be used in ModularCheckout context) displaying ApplePay or GooglePay payment option, depending on the environment
- label for pre-owned products in `ProductPage`

## [3.0.4] - 2021-05-19

### Fixed
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
