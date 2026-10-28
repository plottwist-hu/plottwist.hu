---
title: "Advanced Pixel for Barion"
sidebar:
  order: 0
  label: "Überblick"
---

:::note
Dies ist eine automatische Übersetzung. Korrekturen aus der Community sind willkommen!
:::

Barion Pixel-Integration für WooCommerce mit vollständigem E-Commerce-Event-Tracking, Cookie-Consent-Unterstützung und WP Consent API-Kompatibilität.

## Funktionen

- **Basis-Barion-Pixel**: Lädt das Barion-Tracking-Skript websiteweit (pageView wird automatisch ausgelöst)
- **Vollständiges Event-Tracking**: Alle obligatorischen E-Commerce-Events gemäß Barion-Dokumentation
  - `contentView`: Wird auf Produktseiten ausgelöst
  - `addToCart`: Wird ausgelöst, wenn Artikel in den Warenkorb gelegt werden (clientseitig, funktioniert mit Seiten-Caching)
  - `initiateCheckout`: Wird beim Start des Bestellvorgangs ausgelöst
  - `purchase`: Wird bei erfolgreichem Bestellabschluss ausgelöst (mit Duplikatverhinderung)
  - `setEncryptedEmail`: Sendet die Rechnungs-E-Mail-Adresse bei einem Kauf an Barion (verschlüsselt durch bp.js)
- **WP Consent API-Integration**: Universelle Cookie-Consent-Unterstützung — funktioniert mit CookieYes, Complianz, Real Cookie Banner, GDPR Cookie Compliance, Cookie Notice und mehr
- **Cookie Law Info-Fallback**: Direkte Integration für Websites, die CookieYes/Cookie Law Info verwenden
- **Admin-Einstellungsseite**: Einfache Konfiguration über das WordPress-Admin-Panel
- **Debug-Modus**: Konsolenprotokollierung zum Testen und Entwickeln
- **bp.js Doppellade-Erkennung**: Koexistiert sicher mit anderen Plugins, die bp.js laden (z. B. Barion Payment Gateway)

## Installation

1. Lade den Ordner `advanced-pixel-for-barion` nach `/wp-content/plugins/` hoch
2. Aktiviere das Plugin über das Menü „Plugins" in WordPress
3. Navigiere zu Einstellungen > Barion Pixel zur Konfiguration

## Konfiguration

### Admin-Einstellungen

Rufe die Einstellungsseite unter **Einstellungen > Barion Pixel** im WordPress-Admin auf.

#### Pixel-ID (Erforderlich)
Gib deine Barion Pixel-ID ein (Format: `BP-0000000000-00`). Das Basis-Pixel wird auf allen Seiten geladen, sobald dies eingestellt ist.

#### Vollständiges Pixel-Tracking aktivieren
Umschalten, um das E-Commerce-Event-Tracking zu aktivieren/deaktivieren. Wenn deaktiviert, wird nur das Basis-Pixel geladen (pageView zur Betrugsprävention).

#### Debug-Modus
Aktivieren, um alle Barion Pixel-Events für Testzwecke in der Browser-Konsole zu protokollieren.

## Kompatibilität

- **WooCommerce**: Erforderlich für vollständiges Event-Tracking (Basis-Pixel funktioniert auch ohne)
- **Barion Payment Gateway** ([woocommerce-barion](https://github.com/szelpe/woocommerce-barion)): Funktioniert problemlos zusammen — dieses Plugin verarbeitet Zahlungen, das andere verwaltet das Pixel-Tracking
- **Seiten-Caching**: Vollständig kompatibel (addToCart verwendet clientseitiges JS)
- **Cookie-Plugins**: Jedes mit der WP Consent API kompatible Plugin funktioniert automatisch

## Anforderungen

- WordPress 5.0 oder höher
- PHP 7.2 oder höher
- WooCommerce 5.0+ (für vollständiges Event-Tracking)
- Optional: [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) für universelle Cookie-Consent-Unterstützung

## Lizenz

GPL-2.0-or-later — siehe [LICENSE](https://github.com/gcsecsey/advanced-pixel-for-barion/blob/main/LICENSE) für Details.

## Änderungsprotokoll

### 1.0.0
- Erstveröffentlichung
- Basis-Barion-Pixel (pageView) Implementierung
- Vollständiges Event-Tracking (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail)
- WP Consent API-Integration
- Cookie Law Info-Fallback-Integration
- Admin-Einstellungsseite mit Debug-Modus
- Clientseitiges addToCart (kompatibel mit Seiten-Caching)
- Unterstützung für variable Produkte
- Duplikat-Kaufverhinderung
- bp.js Doppellade-Erkennung
