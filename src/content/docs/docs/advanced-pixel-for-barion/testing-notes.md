---
title: "Testing Notes & Known Quirks"
sidebar:
  order: 4
---

## bp.js Runtime Validation Quirks

Barion's `bp.js` script performs client-side validation on event data. In some cases, the validation rules differ from the Barion API reference documentation. These quirks were discovered during staging testing.

### totalItemPrice: rejected for contentView, required for contents items

- **contentView** (flat event): bp.js **rejects** `totalItemPrice` with the error `Invalid key totalItemPrice in contentView event`, even though the API reference lists it as a required field.
- **initiateCheckout** and **purchase** `contents` items: bp.js **requires** `totalItemPrice` with the error `Mandatory key totalItemPrice is missing from contents event` if omitted.

**Rule of thumb:** `totalItemPrice` is invalid for flat events but required inside `contents` array items.

### unit is required in contents items

bp.js requires `unit` in the `contents` array items for `initiateCheckout` and `purchase`. Omitting it produces: `Mandatory key unit is missing from contents event`.

### step is required for checkout events

The `step` field is mandatory for `addToCart`, `initiateCheckout`, and `purchase`. The Barion documentation recommends using `1` for single-step checkouts.

---

## Debug Mode

Enable debug mode in **Settings > Barion Pixel** to log all Barion Pixel events to the browser console.

### What to look for

Open the browser console (F12 > Console) and look for `[Barion Pixel]` prefixed messages:

```
[Barion Pixel] bp.js loaded by Advanced Pixel for Barion
[Barion Pixel] Base pixel initialized with ID: BP-xxxxxxxxxxxx-xx
[Barion Pixel] Consent auto-granted via WP Consent API
[Barion Pixel] Event: contentView { contentType: "Product", ... }
[Barion Pixel] Event: addToCart { contentType: "Product", ... }
[Barion Pixel] Event: initiateCheckout { contents: [...], ... }
[Barion Pixel] Event: purchase { contents: [...], ... }
[Barion Pixel] setEncryptedEmail sent
```

### bp.js errors

bp.js logs its own validation errors with a numeric prefix. Common ones:

| Error | Meaning | Fix |
|-------|---------|-----|
| `Mandatory key X is missing from Y event` | A required field is not being sent | Check the event data |
| `Invalid key X in Y event` | A field is being sent that bp.js doesn't expect | Remove the field |

---

## Testing Checklist

### Product page (contentView)

1. Navigate to any single product page
2. Open browser console
3. Verify `[Barion Pixel] Event: contentView` appears
4. Verify no bp.js error messages about missing/invalid keys
5. Check that fields include: `contentType`, `currency`, `id`, `name`, `quantity`, `unit`, `unitPrice`

### Add to cart (addToCart)

**From shop/archive page (AJAX):**

1. Navigate to the shop page
2. Open browser console
3. Click "Add to cart" on any product
4. Verify `[Barion Pixel] Event: addToCart` appears
5. Check fields include `totalItemPrice` and `step: 1`

**From single product page (form submit):**

1. Navigate to a single product page
2. Open browser console
3. Click "Add to cart"
4. Verify `[Barion Pixel] Event: addToCart` fires before the page navigates
5. For variable products: select a variation first and verify the variation's price is used

### Checkout page (initiateCheckout)

1. Add items to cart and navigate to checkout
2. Open browser console
3. Verify `[Barion Pixel] Event: initiateCheckout` appears
4. Check that `contents` array has correct items with `unit`, `unitPrice`, `totalItemPrice`
5. Check that `revenue` is subtotal + tax (not including shipping)
6. Check `step: 1` is present

### Order completion (purchase + setEncryptedEmail)

1. Complete a test order (use "Bank transfer" payment method for easy testing)
2. On the thank-you page, open browser console
3. Verify `[Barion Pixel] Event: purchase` appears with `revenue` matching the order total
4. Verify `[Barion Pixel] setEncryptedEmail sent` appears
5. Refresh the thank-you page — verify `purchase` does NOT fire again (duplicate prevention)
6. Check that `contents` items include `unit`, `totalItemPrice`

### Consent integration

1. Clear all cookies
2. Navigate to any page
3. Verify `[Barion Pixel] Base pixel initialized` appears (base pixel always loads)
4. Accept cookies via your cookie banner
5. Verify `[Barion Pixel] Consent granted` appears
6. Reload the page — verify consent is auto-granted on load (returning visitor)

---

## Common Issues

### Events not firing

- **Check Pixel ID**: Ensure a valid Pixel ID is configured in Settings > Barion Pixel
- **Check full tracking**: Events require "Enable Full Pixel Tracking" to be checked
- **Check WooCommerce**: Full tracking requires WooCommerce to be active
- **Check console errors**: Look for JavaScript errors that might prevent bp.js from loading

### Double pixel loading

If you see `[Barion Pixel] bp.js already loaded by another plugin`, another plugin (likely the Barion Payment Gateway) has already loaded bp.js. This is harmless — the plugin skips re-loading and still initializes with your Pixel ID.

### Consent not granting

- **WP Consent API**: Ensure the WP Consent API plugin is installed and your cookie plugin supports it
- **Cookie Law Info**: Ensure the plugin is active and the `CLI` global is available
- **Manual**: Call `window.wcBarionGrantConsent()` from your consent manager's callback
