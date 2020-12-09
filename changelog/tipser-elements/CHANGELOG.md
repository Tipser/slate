# Changelog
All notable changes to Tipser Elements project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.61] - UNRELEASED
### Added
- Don't display `Details` link button when there is no `StyleWith` component
### Fixed
- Scroll to top of the modal when click on `Similar Product`
### Added
- Support for `className` attribute in `Product`, `Collection`, `Store` and `CartIcon` components
- `CartIcon` component is now using the top-level class name `te-cart-icon` (consistent with each other class names)

### Fixed
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
