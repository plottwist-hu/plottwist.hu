---
title: "Testhinweise & Bekannte Eigenheiten"
sidebar:
  order: 4
---

:::note
Dies ist eine automatische Übersetzung. Korrekturen aus der Community sind willkommen! [Korrektur auf GitHub einreichen](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/de/testing-notes.md)
:::

## bp.js Laufzeit-Validierungseigenheiten

Barions `bp.js`-Skript führt eine clientseitige Validierung der Event-Daten durch. In einigen Fällen weichen die Validierungsregeln von der Barion-API-Referenzdokumentation ab. Diese Eigenheiten wurden beim Staging-Test entdeckt.

### totalItemPrice: abgelehnt für contentView, erforderlich für contents-Artikel

- **contentView** (flaches Event): bp.js **lehnt** `totalItemPrice` mit dem Fehler `Invalid key totalItemPrice in contentView event` ab, obwohl die API-Referenz es als erforderliches Feld auflistet.
- **initiateCheckout** und **purchase** `contents`-Artikel: bp.js **erfordert** `totalItemPrice` mit dem Fehler `Mandatory key totalItemPrice is missing from contents event`, wenn es weggelassen wird.

**Faustregel:** `totalItemPrice` ist für flache Events ungültig, aber innerhalb von `contents`-Array-Artikeln erforderlich.

### unit ist in contents-Artikeln erforderlich

bp.js erfordert `unit` in den `contents`-Array-Artikeln für `initiateCheckout` und `purchase`. Das Weglassen führt zu: `Mandatory key unit is missing from contents event`.

### step ist für Checkout-Events erforderlich

Das Feld `step` ist für `addToCart`, `initiateCheckout` und `purchase` obligatorisch. Die Barion-Dokumentation empfiehlt die Verwendung von `1` für einstufige Checkouts.

---

## Debug-Modus

Aktiviere den Debug-Modus unter **Einstellungen > Barion Pixel**, um alle Barion Pixel-Events in der Browser-Konsole zu protokollieren.

### Worauf zu achten ist

Öffne die Browser-Konsole (F12 > Konsole) und achte auf Meldungen mit dem Präfix `[Barion Pixel]`:

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

### bp.js-Fehler

bp.js protokolliert seine eigenen Validierungsfehler mit einem numerischen Präfix. Häufige Fehler:

| Fehler | Bedeutung | Lösung |
|--------|-----------|--------|
| `Mandatory key X is missing from Y event` | Ein erforderliches Feld wird nicht gesendet | Event-Daten prüfen |
| `Invalid key X in Y event` | Ein Feld wird gesendet, das bp.js nicht erwartet | Feld entfernen |

---

## Test-Checkliste

### Produktseite (contentView)

1. Navigiere zu einer beliebigen Einzelproduktseite
2. Öffne die Browser-Konsole
3. Überprüfe, ob `[Barion Pixel] Event: contentView` erscheint
4. Überprüfe, ob keine bp.js-Fehlermeldungen zu fehlenden/ungültigen Schlüsseln vorhanden sind
5. Prüfe, ob die Felder enthalten: `contentType`, `currency`, `id`, `name`, `quantity`, `unit`, `unitPrice`

### In den Warenkorb (addToCart)

**Von der Shop-/Archivseite (AJAX):**

1. Navigiere zur Shop-Seite
2. Öffne die Browser-Konsole
3. Klicke bei einem beliebigen Produkt auf „In den Warenkorb"
4. Überprüfe, ob `[Barion Pixel] Event: addToCart` erscheint
5. Prüfe, ob die Felder `totalItemPrice` und `step: 1` enthalten sind

**Von der Einzelproduktseite (Formularabsenden):**

1. Navigiere zu einer Einzelproduktseite
2. Öffne die Browser-Konsole
3. Klicke auf „In den Warenkorb"
4. Überprüfe, ob `[Barion Pixel] Event: addToCart` ausgelöst wird, bevor die Seite navigiert
5. Bei variablen Produkten: Wähle zuerst eine Variante aus und überprüfe, ob der Preis der Variante verwendet wird

### Kassenseite (initiateCheckout)

1. Lege Artikel in den Warenkorb und navigiere zur Kasse
2. Öffne die Browser-Konsole
3. Überprüfe, ob `[Barion Pixel] Event: initiateCheckout` erscheint
4. Prüfe, ob das `contents`-Array korrekte Artikel mit `unit`, `unitPrice`, `totalItemPrice` enthält
5. Prüfe, ob `revenue` Zwischensumme + Steuer ist (ohne Versand)
6. Prüfe, ob `step: 1` vorhanden ist

### Bestellabschluss (purchase + setEncryptedEmail)

1. Schließe eine Testbestellung ab (verwende „Banküberweisung" als Zahlungsmethode zum einfachen Testen)
2. Öffne auf der Danke-Seite die Browser-Konsole
3. Überprüfe, ob `[Barion Pixel] Event: purchase` mit `revenue` erscheint, das der Bestellsumme entspricht
4. Überprüfe, ob `[Barion Pixel] setEncryptedEmail sent` erscheint
5. Lade die Danke-Seite neu — überprüfe, ob `purchase` NICHT erneut ausgelöst wird (Duplikatverhinderung)
6. Prüfe, ob `contents`-Artikel `unit` und `totalItemPrice` enthalten

### Consent-Integration

1. Lösche alle Cookies
2. Navigiere zu einer beliebigen Seite
3. Überprüfe, ob `[Barion Pixel] Base pixel initialized` erscheint (Basis-Pixel wird immer geladen)
4. Akzeptiere Cookies über deinen Cookie-Banner
5. Überprüfe, ob `[Barion Pixel] Consent granted` erscheint
6. Lade die Seite neu — überprüfe, ob die Einwilligung beim Laden automatisch erteilt wird (wiederkehrender Besucher)

---

## Häufige Probleme

### Events werden nicht ausgelöst

- **Pixel-ID prüfen**: Stelle sicher, dass eine gültige Pixel-ID in den Einstellungen unter Einstellungen > Barion Pixel konfiguriert ist
- **Vollständiges Tracking prüfen**: Events erfordern, dass „Vollständiges Pixel-Tracking aktivieren" aktiviert ist
- **WooCommerce prüfen**: Vollständiges Tracking erfordert, dass WooCommerce aktiv ist
- **Konsolenfehler prüfen**: Achte auf JavaScript-Fehler, die das Laden von bp.js verhindern könnten

### Doppeltes Pixel-Laden

Wenn `[Barion Pixel] bp.js already loaded by another plugin` erscheint, hat ein anderes Plugin (wahrscheinlich das Barion Payment Gateway) bp.js bereits geladen. Dies ist harmlos — das Plugin überspringt das erneute Laden und initialisiert sich trotzdem mit deiner Pixel-ID.

### Einwilligung wird nicht erteilt

- **WP Consent API**: Stelle sicher, dass das WP Consent API-Plugin installiert ist und dein Cookie-Plugin es unterstützt
- **Cookie Law Info**: Stelle sicher, dass das Plugin aktiv ist und das globale `CLI`-Objekt verfügbar ist
- **Manuell**: Rufe `window.wcBarionGrantConsent()` aus dem Callback deines Consent-Managers auf
