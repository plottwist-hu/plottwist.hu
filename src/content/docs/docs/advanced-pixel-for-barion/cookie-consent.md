---
title: "Cookie Consent Integration"
sidebar:
  order: 2
---

## Overview

The Barion Pixel requires explicit user consent before collecting marketing data (GDPR compliance). The plugin must call `bp('consent', 'grantConsent')` when the user accepts, and `bp('consent', 'rejectConsent')` when the user declines. Both events are mandatory per Barion's requirements.

The base pixel script always loads for fraud prevention, but no marketing data is collected until consent is explicitly granted or rejected.

**Important:** Your cookie banner must offer both an accept and a reject option. A "cookie wall" (accept-only) is not GDPR compliant since 2020 and will be rejected by Barion.

The plugin supports three tiers of consent integration, checked in order:

1. **WP Consent API** (recommended) — universal, works with all major cookie plugins
2. **Cookie Law Info** (fallback) — direct integration for sites using CookieYes/Cookie Law Info
3. **Manual** — for custom consent managers or edge cases

---

## Tier 1: WP Consent API (Recommended)

The [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) is a WordPress standard for consent communication. It's supported by all major cookie consent plugins.

### How it works

The plugin checks for the `wp_has_consent()` JavaScript function at runtime. If the WP Consent API is available:

1. On page load, checks if `marketing` consent is granted or rejected
2. Calls `bp('consent', 'grantConsent')` if marketing consent is granted
3. Calls `bp('consent', 'rejectConsent')` if marketing consent is not granted
4. Listens for the `wp_listen_for_consent_change` event for real-time consent updates — grants or rejects accordingly

### Supported cookie plugins

Any plugin that implements the WP Consent API will work automatically:

| Plugin | Active installs | Notes |
|--------|----------------|-------|
| [CookieYes](https://wordpress.org/plugins/cookie-law-info/) | 1.5M+ | WP Consent API built-in |
| [Complianz](https://wordpress.org/plugins/complianz-gdpr/) | 1M+ | Co-creator of WP Consent API |
| [Cookie Notice by dFactory](https://wordpress.org/plugins/cookie-notice/) | 1M+ | WP Consent API compatible |
| [GDPR Cookie Compliance (Moove)](https://wordpress.org/plugins/gdpr-cookie-compliance/) | 300K+ | WP Consent API compatible |
| [Real Cookie Banner](https://wordpress.org/plugins/real-cookie-banner/) | 100K+ | WP Consent API compatible |

### Setup

1. Install and activate the [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) plugin
2. Install and configure your preferred cookie consent plugin (see table above)
3. Install and configure Advanced Pixel for Barion
4. No additional configuration needed — consent is handled automatically

### Consent category

The Barion Pixel is registered under the `marketing` consent category in the WP Consent API. This is the standard category for tracking pixels used for retargeting and analytics.

---

## Tier 2: Cookie Law Info (Fallback)

If the WP Consent API is not available, the plugin falls back to direct integration with the [Cookie Law Info](https://wordpress.org/plugins/cookie-law-info/) / CookieYes plugin.

### How it works

1. Checks for the `CLI` JavaScript global object
2. If cookies are already accepted (returning visitor), grants consent immediately
3. If cookies are not accepted, rejects consent immediately
4. Listens for the `cli_user_preference_set` event when the user interacts with the cookie banner
5. Grants or rejects based on the `cookielawinfo-checkbox-necessary` cookie value

### Setup

No configuration needed. Install both plugins and the integration works automatically.

---

## Tier 3: Manual Integration

For custom consent managers or environments where neither WP Consent API nor Cookie Law Info is available.

### Method 1: JavaScript functions (recommended)

```javascript
// When user accepts marketing cookies
function onMarketingConsentGranted() {
    if (typeof window.wcBarionGrantConsent === 'function') {
        window.wcBarionGrantConsent();
    }
}

// When user rejects marketing cookies
function onMarketingConsentRejected() {
    if (typeof window.wcBarionRejectConsent === 'function') {
        window.wcBarionRejectConsent();
    }
}
```

### Method 2: Custom DOM events

```javascript
// Grant consent
document.dispatchEvent(new Event('wcBarionGrantConsent'));

// Reject consent
document.dispatchEvent(new Event('wcBarionRejectConsent'));
```

### Method 3: WordPress action hook

```php
// In your consent manager plugin or theme
add_action('wc_barion_pixel_footer_scripts', 'my_barion_consent_handler');

function my_barion_consent_handler() {
    ?>
    <script>
    // Your custom consent logic here
    </script>
    <?php
}
```

### Examples for specific consent managers

**Cookiebot:**
```javascript
window.addEventListener('CookiebotOnAccept', function() {
    if (Cookiebot.consent.marketing) {
        window.wcBarionGrantConsent();
    } else {
        window.wcBarionRejectConsent();
    }
});
window.addEventListener('CookiebotOnDecline', function() {
    window.wcBarionRejectConsent();
});
```

**OneTrust:**
```javascript
function OptanonWrapper() {
    if (OnetrustActiveGroups.includes('C0004')) {
        window.wcBarionGrantConsent();
    } else {
        window.wcBarionRejectConsent();
    }
}
```

---

## How consent affects the pixel

| State | Base pixel (bp.js) | pageView | Marketing data collection |
|-------|--------------------|----------|--------------------------|
| Before any consent action | Loaded | Fires (fraud prevention) | No data collected |
| After `grantConsent` | Loaded | Fires | Full data collection enabled |
| After `rejectConsent` | Loaded | Fires (fraud prevention) | No marketing data collected |

The base pixel always loads for Barion's fraud prevention. The `grantConsent` / `rejectConsent` calls control whether marketing data is collected.

---

## Testing

1. Enable **Debug Mode** in Settings > Barion Pixel
2. Open the browser console (F12)
3. Look for consent-related log messages:
   - `[Barion Pixel] Consent auto-granted via WP Consent API` — Tier 1, user accepted
   - `[Barion Pixel] Consent auto-rejected via WP Consent API` — Tier 1, user declined
   - `[Barion Pixel] Consent auto-granted via Cookie Law Info` — Tier 2, user accepted
   - `[Barion Pixel] Consent auto-rejected via Cookie Law Info` — Tier 2, user declined
   - `[Barion Pixel] No consent manager detected...` — Tier 3 (manual mode)
   - `[Barion Pixel] Consent granted (grantConsent)` — consent was granted (any tier)
   - `[Barion Pixel] Consent rejected (rejectConsent)` — consent was rejected (any tier)
4. Test both accept and reject flows on your cookie banner
5. The consent functions are safe to call multiple times (idempotent)
