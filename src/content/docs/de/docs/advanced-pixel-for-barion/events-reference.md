---
title: "Barion Pixel Events-Referenz"
sidebar:
  order: 1
---

:::note
Dies ist eine automatische Übersetzung. Korrekturen aus der Community sind willkommen! [Korrektur auf GitHub einreichen](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/de/events-reference.md)
:::

## Übersicht

Das Plugin unterstützt zwei Betriebsmodi:

- **Basis-Pixel** (immer aktiv, wenn eine Pixel-ID konfiguriert ist): Lädt `bp.js` und löst `pageView` automatisch auf jeder Seite aus. Wird zur Betrugsprävention verwendet.
- **Vollständiges Tracking** (optional, Umschalten im Admin): Fügt E-Commerce-Event-Tracking für Marketing-Analysen und niedrigere Barion-Provisionsraten hinzu.

### Event-Übersicht

| Event | Modus | bp()-Aufruf | Auslöser |
|-------|-------|-------------|----------|
| pageView | Basis | Automatisch (bp.js) | Jeder Seitenaufruf |
| grantConsent | Basis | `bp('consent', 'grantConsent')` | Cookie-Einwilligung akzeptiert |
| rejectConsent | Basis | `bp('consent', 'rejectConsent')` | Cookie-Einwilligung abgelehnt |
| contentView | Vollständig | `bp('track', 'contentView', data)` | Einzelne Produktseite |
| addToCart | Vollständig | `bp('track', 'addToCart', data)` | In-den-Warenkorb-Aktion |
| initiateCheckout | Vollständig | `bp('track', 'initiateCheckout', data)` | Kassenseite wird geladen |
| purchase | Vollständig | `bp('track', 'purchase', data)` | Danke-Seite |
| setEncryptedEmail | Vollständig | `bp('identify', 'setEncryptedEmail', email)` | Danke-Seite |

---

## Basis-Pixel-Events

### pageView

Wird automatisch ausgelöst, wenn `bp.js` geladen wird. Keine Konfiguration erforderlich außer der Angabe der Pixel-ID.

### grantConsent

Wird ausgelöst, wenn der Nutzer Marketing-Cookies akzeptiert. Wird automatisch über die WP Consent API oder Cookie Law Info verarbeitet oder manuell über `window.wcBarionGrantConsent()`.

### rejectConsent

Wird ausgelöst, wenn der Nutzer Marketing-Cookies ablehnt. Wird automatisch über die WP Consent API oder Cookie Law Info verarbeitet oder manuell über `window.wcBarionRejectConsent()`. Sowohl `grantConsent` als auch `rejectConsent` sind gemäß den Barion-Anforderungen obligatorisch.

Weitere Einzelheiten unter [Cookie-Consent-Integration](../cookie-consent/).

---

## Events für vollständiges Tracking

### contentView

**Auslöser:** Einzelne Produktseite (Hook `woocommerce_after_single_product`)

**Gesendete Felder:**

| Feld | Typ | Wert |
|------|-----|------|
| contentType | string | `'Product'` |
| currency | string | WooCommerce-Shop-Währung (z. B. `'HUF'`) |
| id | string | Produkt-ID |
| name | string | Anzeigename des Produkts |
| quantity | int | `1` (immer — es wird ein Produkt angesehen) |
| unit | string | `'pcs'` |
| unitPrice | float | Produktpreis |

> **Hinweis:** Die Barion-API-Referenz listet `totalItemPrice` als erforderlich für dieses Event auf, aber bp.js lehnt es zur Laufzeit mit „Invalid key totalItemPrice in contentView event" ab. Dieses Feld wird absichtlich weggelassen.

---

### addToCart

**Auslöser:** Clientseitiges JavaScript (wird unmittelbar bei der In-den-Warenkorb-Aktion ausgelöst)

**Implementierung:** Zwei Pfade, beide clientseitig verarbeitet, um mit Seiten-Caching zu funktionieren:

1. **AJAX-In-den-Warenkorb** (Shop-/Archivseiten): Lauscht auf das WooCommerce-jQuery-Event `added_to_cart`. Liest Produktdaten aus den `<button>`-Datenattributen (`data-product_id`, `data-product_name`, `data-product_price`, `data-quantity`).

2. **Formularabsenden auf der Einzelproduktseite**: Fängt das Absenden von `form.cart` ab. Produktdaten sind als JSON im Footer eingebettet. Bei variablen Produkten wird der `display_price` der ausgewählten Variante aus den WooCommerce-jQuery-`product_variations`-Daten ausgelesen.

**Gesendete Felder:**

| Feld | Typ | Wert |
|------|-----|------|
| contentType | string | `'Product'` |
| currency | string | Shop-Währung |
| id | string | Produkt-ID |
| name | string | Produktname |
| quantity | int | Hinzugefügte Menge |
| unit | string | `'pcs'` |
| unitPrice | float | Preis pro Einheit |
| totalItemPrice | float | `unitPrice * quantity` |
| step | int | `1` |

---

### initiateCheckout

**Auslöser:** Kassenseite wird geladen (Hook `woocommerce_before_checkout_form`)

**Gesendete Felder:**

| Feld | Typ | Wert |
|------|-----|------|
| contents | array | Array von Warenkorb-Artikeln (siehe unten) |
| currency | string | Shop-Währung |
| revenue | float | Warenkorb-Zwischensumme + Steuer (Versand ausgeschlossen — möglicherweise noch nicht berechnet) |
| step | int | `1` |

**Felder der contents-Artikel:**

| Feld | Typ | Wert |
|------|-----|------|
| contentType | string | `'Product'` |
| currency | string | Shop-Währung |
| id | string | Produkt-ID |
| name | string | Produktname |
| quantity | int | Artikelmenge |
| unit | string | `'pcs'` |
| unitPrice | float | Stückpreis |
| totalItemPrice | float | `unitPrice * quantity` |

---

### purchase

**Auslöser:** Danke-Seite (Hook `woocommerce_thankyou`)

**Duplikatverhinderung:** Verwendet `_wc_barion_tracked` Post-Meta, um das erneute Auslösen beim Neuladen der Seite zu verhindern.

**Gesendete Felder:**

| Feld | Typ | Wert |
|------|-----|------|
| contents | array | Array von Bestellartikeln (siehe unten) |
| currency | string | Bestellwährung |
| revenue | float | Bestellsumme (inkl. Versand, Steuer, Rabatte) |
| step | int | `1` |

**Felder der contents-Artikel:**

| Feld | Typ | Wert |
|------|-----|------|
| contentType | string | `'Product'` |
| currency | string | Bestellwährung |
| id | string | Produkt-ID |
| name | string | Artikelname |
| quantity | int | Artikelmenge |
| unit | string | `'pcs'` |
| unitPrice | float | `(item_total + item_tax) / quantity` (spiegelt Rabatte wider) |
| totalItemPrice | float | `unitPrice * quantity` |

**Hinweis zu revenue:** Das `purchase`-Event verwendet die vollständige Bestellsumme (inkl. Versand), während `initiateCheckout` nur Zwischensumme + Steuer verwendet (Versand ist zum Kassenbeginn möglicherweise noch nicht berechnet).

---

### setEncryptedEmail

**Auslöser:** Danke-Seite (Hook `woocommerce_thankyou`)

**bp()-Aufruf:** `bp('identify', 'setEncryptedEmail', email)`

Die Rechnungs-E-Mail-Adresse wird vor dem Senden in Kleinbuchstaben umgewandelt. Barions `bp.js` übernimmt das SHA1-Hashing automatisch — das Plugin sendet die reine E-Mail-Adresse, keinen Hash.

Wird nur ausgelöst, wenn die Bestellung eine Rechnungs-E-Mail-Adresse hat.

---

## Nicht implementierte Events

| Event | Grund |
|-------|-------|
| `customEvent` | Nicht erforderlich für Standard-E-Commerce-Tracking |
| `initiatePayment` | Barion-Dokumentation besagt: entweder `purchase` ODER `initiatePayment` implementieren — wir verwenden `purchase` |
| `setPhoneNumber` | Optional; Telefonnummern sind nicht in allen WooCommerce-Abläufen zuverlässig verfügbar |
| `search` | Optional; nicht Teil des obligatorischen Event-Sets |
