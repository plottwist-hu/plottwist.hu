---
title: "Plugin-Kompatibilität"
sidebar:
  order: 3
---

:::note
Dies ist eine automatische Übersetzung. Korrekturen aus der Community sind willkommen! [Korrektur auf GitHub einreichen](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/de/compatibility.md)
:::

## WooCommerce

**Erforderlich für vollständiges Event-Tracking.** Das Basis-Pixel funktioniert ohne WooCommerce, aber alle E-Commerce-Events (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail) erfordern WooCommerce.

| Version | Status |
|---------|--------|
| WooCommerce 5.0+ | Unterstützt |
| WooCommerce 9.6 | Getestet |

---

## Barion Payment Gateway (woocommerce-barion)

Das Plugin [Barion Payment Gateway](https://github.com/szelpe/woocommerce-barion) von szelpe ist **ausschließlich ein Zahlungsabwickler** — es fügt Barion als Zahlungsmethode zur WooCommerce-Kasse hinzu. Es implementiert kein Barion Pixel-Event-Tracking.

**Koexistenz:** Beide Plugins funktionieren konfliktfrei zusammen. Das Advanced Pixel for Barion-Plugin übernimmt das Tracking; das Payment Gateway die Zahlungsabwicklung.

**Pixel-ID-Überschneidung:** Das Payment Gateway verfügt über ein optionales Pixel-ID-Feld zum Laden des Basis-Pixels. Wenn beide Plugins eine Pixel-ID konfiguriert haben:

- Advanced Pixel for Barion erkennt, ob `bp.js` bereits geladen wurde, und überspringt das erneute Laden des Skripts
- Ein informativer Admin-Hinweis empfiehlt, die Pixel-ID-Konfiguration an einem Ort zu bündeln
- Beide Plugins funktionieren unabhängig davon weiterhin korrekt

**Empfehlung:** Wenn du beide Plugins verwendest, konfiguriere die Pixel-ID nur in den Einstellungen von Advanced Pixel for Barion und lasse das Feld in den Payment-Gateway-Einstellungen leer.

---

## Seiten-Caching-Plugins

Das Plugin ist vollständig mit Seiten-Caching kompatibel:

| Event | Implementierung | Auswirkung des Cachings |
|-------|-----------------|-------------------------|
| contentView | Serverseitig (Produktseite) | Produktseiten werden typischerweise nicht gecacht oder variieren je nach Produkt |
| addToCart | **Clientseitiges JavaScript** | Keine Caching-Probleme — JS wird im Browser ausgeführt |
| initiateCheckout | Serverseitig (Kassenseite) | Die Kasse wird nicht gecacht (enthält Benutzersitzungsdaten) |
| purchase | Serverseitig (Danke-Seite) | Danke-Seiten werden nicht gecacht (einmalig pro Bestellung) |

Das addToCart-Event wurde gezielt clientseitig implementiert (anstatt PHP-Sitzungen zu verwenden), um mit WordPress.com-Hosting und aggressiven Seiten-Caching-Setups zu funktionieren.

**Kompatibel mit:** WP Super Cache, W3 Total Cache, LiteSpeed Cache, WordPress.com-Hosting, Cloudflare und ähnlichen Caching-Lösungen.

---

## Cookie-Consent-Plugins

Das Plugin unterstützt alle Cookie-Consent-Plugins, die die [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) implementieren. Weitere Einzelheiten findest du unter [Cookie-Consent-Integration](../cookie-consent/).

**Automatisch unterstützt:**

- CookieYes (1,5 Mio.+ Installationen)
- Complianz (1 Mio.+ Installationen)
- Cookie Notice by dFactory (1 Mio.+ Installationen)
- GDPR Cookie Compliance by Moove (300.000+ Installationen)
- Real Cookie Banner (100.000+ Installationen)

**Direkte Fallback-Integration:**

- Cookie Law Info / CookieYes (funktioniert auch ohne WP Consent API)

---

## WordPress-Version

| Version | Status |
|---------|--------|
| WordPress 5.0+ | Erforderlich |
| WordPress 6.7 | Getestet |

## PHP-Version

| Version | Status |
|---------|--------|
| PHP 7.2+ | Erforderlich |
| PHP 8.x | Kompatibel |
