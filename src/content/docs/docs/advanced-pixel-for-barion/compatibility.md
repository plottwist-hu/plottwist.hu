---
title: "Plugin Compatibility"
sidebar:
  order: 3
---

## WooCommerce

**Required for full event tracking.** The base pixel works without WooCommerce, but all e-commerce events (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail) require WooCommerce.

| Version | Status |
|---------|--------|
| WooCommerce 5.0+ | Supported |
| WooCommerce 9.6 | Tested |

---

## Barion Payment Gateway (woocommerce-barion)

The [Barion Payment Gateway](https://github.com/szelpe/woocommerce-barion) plugin by szelpe is a **payment processor only** — it adds Barion as a payment method to WooCommerce checkout. It does not implement Barion Pixel event tracking.

**Coexistence:** Both plugins work together without conflict. The Advanced Pixel for Barion plugin handles tracking; the payment gateway handles payments.

**Pixel ID overlap:** The payment gateway has an optional Pixel ID field for loading the base pixel. If both plugins have a Pixel ID configured:

- Advanced Pixel for Barion detects if `bp.js` is already loaded and skips re-loading the script
- An informational admin notice suggests consolidating the Pixel ID configuration to one place
- Both plugins continue to function correctly regardless

**Recommendation:** If you use both plugins, configure the Pixel ID only in Advanced Pixel for Barion settings and leave it empty in the payment gateway settings.

---

## Page Caching Plugins

The plugin is fully compatible with page caching:

| Event | Implementation | Caching impact |
|-------|---------------|----------------|
| contentView | Server-side (product page) | Product pages are typically not cached, or vary by product |
| addToCart | **Client-side JavaScript** | No caching issues — JS fires in the browser |
| initiateCheckout | Server-side (checkout page) | Checkout is not cached (contains user session data) |
| purchase | Server-side (thank-you page) | Thank-you pages are not cached (unique per order) |

The addToCart event was specifically implemented client-side (rather than using PHP sessions) to work with WordPress.com hosting and aggressive page caching setups.

**Compatible with:** WP Super Cache, W3 Total Cache, LiteSpeed Cache, WordPress.com hosting, Cloudflare, and similar caching solutions.

---

## Cookie Consent Plugins

The plugin supports all cookie consent plugins that implement the [WP Consent API](https://wordpress.org/plugins/wp-consent-api/). See [Cookie Consent Integration](../cookie-consent/) for details.

**Automatically supported:**

- CookieYes (1.5M+ installs)
- Complianz (1M+ installs)
- Cookie Notice by dFactory (1M+ installs)
- GDPR Cookie Compliance by Moove (300K+ installs)
- Real Cookie Banner (100K+ installs)

**Direct fallback integration:**

- Cookie Law Info / CookieYes (works without WP Consent API too)

---

## WordPress Version

| Version | Status |
|---------|--------|
| WordPress 5.0+ | Required |
| WordPress 6.7 | Tested |

## PHP Version

| Version | Status |
|---------|--------|
| PHP 7.2+ | Required |
| PHP 8.x | Compatible |
