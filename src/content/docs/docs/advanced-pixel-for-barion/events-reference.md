---
title: "Barion Pixel Events Reference"
sidebar:
  order: 1
---

## Overview

The plugin supports two operating modes:

- **Base Pixel** (always active when Pixel ID is configured): Loads `bp.js` and fires `pageView` automatically on every page. Used for fraud prevention.
- **Full Tracking** (optional, toggle in admin): Adds e-commerce event tracking for marketing analytics and lower Barion commission rates.

### Event summary

| Event | Mode | bp() call | Trigger |
|-------|------|-----------|---------|
| pageView | Base | Automatic (bp.js) | Every page load |
| grantConsent | Base | `bp('consent', 'grantConsent')` | Cookie consent accepted |
| rejectConsent | Base | `bp('consent', 'rejectConsent')` | Cookie consent rejected |
| contentView | Full | `bp('track', 'contentView', data)` | Single product page |
| addToCart | Full | `bp('track', 'addToCart', data)` | Add to cart action |
| initiateCheckout | Full | `bp('track', 'initiateCheckout', data)` | Checkout page load |
| purchase | Full | `bp('track', 'purchase', data)` | Thank-you page |
| setEncryptedEmail | Full | `bp('identify', 'setEncryptedEmail', email)` | Thank-you page |

---

## Base Pixel events

### pageView

Fires automatically when `bp.js` loads. No configuration needed beyond setting the Pixel ID.

### grantConsent

Fires when the user accepts marketing cookies. Handled automatically via WP Consent API or Cookie Law Info, or manually via `window.wcBarionGrantConsent()`.

### rejectConsent

Fires when the user rejects marketing cookies. Handled automatically via WP Consent API or Cookie Law Info, or manually via `window.wcBarionRejectConsent()`. Both `grantConsent` and `rejectConsent` are mandatory per Barion's requirements.

See [Cookie Consent Integration](../cookie-consent/) for details.

---

## Full Tracking events

### contentView

**Trigger:** Single product page (`woocommerce_after_single_product` hook)

**Fields sent:**

| Field | Type | Value |
|-------|------|-------|
| contentType | string | `'Product'` |
| currency | string | WooCommerce store currency (e.g. `'HUF'`) |
| id | string | Product ID |
| name | string | Product display name |
| quantity | int | `1` (always — viewing one product) |
| unit | string | `'pcs'` |
| unitPrice | float | Product price |

> **Note:** The Barion API reference lists `totalItemPrice` as required for this event, but bp.js rejects it at runtime with "Invalid key totalItemPrice in contentView event." This field is intentionally omitted.

---

### addToCart

**Trigger:** Client-side JavaScript (fires immediately on add-to-cart action)

**Implementation:** Two paths, both handled client-side to work with page caching:

1. **AJAX add to cart** (shop/archive pages): Listens for WooCommerce jQuery `added_to_cart` event. Reads product data from the `<button>` data attributes (`data-product_id`, `data-product_name`, `data-product_price`, `data-quantity`).

2. **Single product page form submit**: Intercepts `form.cart` submit. Product data is embedded as JSON in the footer. For variable products, reads the selected variation's `display_price` from WooCommerce's jQuery `product_variations` data.

**Fields sent:**

| Field | Type | Value |
|-------|------|-------|
| contentType | string | `'Product'` |
| currency | string | Store currency |
| id | string | Product ID |
| name | string | Product name |
| quantity | int | Quantity added |
| unit | string | `'pcs'` |
| unitPrice | float | Price per unit |
| totalItemPrice | float | `unitPrice * quantity` |
| step | int | `1` |

---

### initiateCheckout

**Trigger:** Checkout page load (`woocommerce_before_checkout_form` hook)

**Fields sent:**

| Field | Type | Value |
|-------|------|-------|
| contents | array | Array of cart items (see below) |
| currency | string | Store currency |
| revenue | float | Cart subtotal + tax (shipping excluded — may not be calculated yet) |
| step | int | `1` |

**Contents item fields:**

| Field | Type | Value |
|-------|------|-------|
| contentType | string | `'Product'` |
| currency | string | Store currency |
| id | string | Product ID |
| name | string | Product name |
| quantity | int | Item quantity |
| unit | string | `'pcs'` |
| unitPrice | float | Unit price |
| totalItemPrice | float | `unitPrice * quantity` |

---

### purchase

**Trigger:** Thank-you page (`woocommerce_thankyou` hook)

**Duplicate prevention:** Uses `_wc_barion_tracked` post meta to prevent firing on page reload.

**Fields sent:**

| Field | Type | Value |
|-------|------|-------|
| contents | array | Array of order items (see below) |
| currency | string | Order currency |
| revenue | float | Order total (includes shipping, tax, discounts) |
| step | int | `1` |

**Contents item fields:**

| Field | Type | Value |
|-------|------|-------|
| contentType | string | `'Product'` |
| currency | string | Order currency |
| id | string | Product ID |
| name | string | Item name |
| quantity | int | Item quantity |
| unit | string | `'pcs'` |
| unitPrice | float | `(item_total + item_tax) / quantity` (reflects discounts) |
| totalItemPrice | float | `unitPrice * quantity` |

**Note on revenue:** The `purchase` event uses the full order total (including shipping), while `initiateCheckout` uses subtotal + tax only (shipping may not be calculated at checkout start).

---

### setEncryptedEmail

**Trigger:** Thank-you page (`woocommerce_thankyou` hook)

**bp() call:** `bp('identify', 'setEncryptedEmail', email)`

The billing email is lowercased before sending. Barion's `bp.js` handles SHA1 hashing automatically — the plugin sends the plain email address, not a hash.

Only fires when the order has a billing email address.

---

## Events NOT implemented

| Event | Reason |
|-------|--------|
| `customEvent` | Not needed for standard e-commerce tracking |
| `initiatePayment` | Barion docs say implement `purchase` OR `initiatePayment` — we use `purchase` |
| `setPhoneNumber` | Optional; phone number is not reliably available in all WooCommerce flows |
| `search` | Optional; not part of the mandatory event set |
