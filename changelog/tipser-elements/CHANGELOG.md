# Changelog
All notable changes to Tipser Elements project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [2.1.65] - 2020-12-17

### Changed
- DynamicCollection component now returns product narrowed down to POS whitelisting settings

## [2.1.64] - 2020-12-17
### Added
- Sending the "checkout viewed" event to whisperer and GA when the user opens the new checkout view
### Fixed
- Overlay with "Update my Cart" button in modal.
- Fixed the problem with product image not appearing on mobile
- Closing modal by Esc
### Changed
- Replace lottie animations to CSS animations

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

### Fixed
- Scroll to top of the modal when click on `Similar Product`
- Inconsistent way of displaying currency in the cart preview overlay

### Deprecated
- the old `cart-icon` class name of the `CartIcon` component

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
