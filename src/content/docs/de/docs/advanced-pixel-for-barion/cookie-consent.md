---
title: "Cookie-Consent-Integration"
sidebar:
  order: 2
---

:::note
Dies ist eine automatische Übersetzung. Korrekturen aus der Community sind willkommen! [Korrektur auf GitHub einreichen](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/de/cookie-consent.md)
:::

## Übersicht

Das Barion Pixel erfordert die ausdrückliche Einwilligung des Nutzers, bevor Marketing-Daten erfasst werden (DSGVO-Konformität). Das Plugin muss `bp('consent', 'grantConsent')` aufrufen, wenn der Nutzer zustimmt, und `bp('consent', 'rejectConsent')`, wenn der Nutzer ablehnt. Beide Events sind gemäß den Barion-Anforderungen obligatorisch.

Das Basis-Pixel-Skript wird immer zur Betrugsprävention geladen, aber es werden keine Marketing-Daten erfasst, bis die Einwilligung ausdrücklich erteilt oder verweigert wurde.

**Wichtig:** Dein Cookie-Banner muss sowohl eine Zustimmungs- als auch eine Ablehnungsoption anbieten. Eine „Cookie-Mauer" (nur Zustimmung) ist seit 2020 nicht DSGVO-konform und wird von Barion abgelehnt.

Das Plugin unterstützt drei Stufen der Consent-Integration, die der Reihe nach geprüft werden:

1. **WP Consent API** (empfohlen) — universell, funktioniert mit allen wichtigen Cookie-Plugins
2. **Cookie Law Info** (Fallback) — direkte Integration für Websites, die CookieYes/Cookie Law Info verwenden
3. **Manuell** — für benutzerdefinierte Consent-Manager oder Sonderfälle

---

## Stufe 1: WP Consent API (Empfohlen)

Die [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) ist ein WordPress-Standard für die Consent-Kommunikation. Sie wird von allen wichtigen Cookie-Consent-Plugins unterstützt.

### Funktionsweise

Das Plugin prüft zur Laufzeit, ob die JavaScript-Funktion `wp_has_consent()` verfügbar ist. Wenn die WP Consent API verfügbar ist:

1. Beim Seitenaufruf wird geprüft, ob die `marketing`-Einwilligung erteilt oder verweigert wurde
2. `bp('consent', 'grantConsent')` wird aufgerufen, wenn die Marketing-Einwilligung erteilt wurde
3. `bp('consent', 'rejectConsent')` wird aufgerufen, wenn die Marketing-Einwilligung nicht erteilt wurde
4. Lauscht auf das `wp_listen_for_consent_change`-Event für Echtzeit-Consent-Aktualisierungen — erteilt oder verweigert entsprechend

### Unterstützte Cookie-Plugins

Jedes Plugin, das die WP Consent API implementiert, funktioniert automatisch:

| Plugin | Aktive Installationen | Hinweise |
|--------|----------------------|----------|
| [CookieYes](https://wordpress.org/plugins/cookie-law-info/) | 1,5 Mio.+ | WP Consent API integriert |
| [Complianz](https://wordpress.org/plugins/complianz-gdpr/) | 1 Mio.+ | Mitentwickler der WP Consent API |
| [Cookie Notice by dFactory](https://wordpress.org/plugins/cookie-notice/) | 1 Mio.+ | WP Consent API kompatibel |
| [GDPR Cookie Compliance (Moove)](https://wordpress.org/plugins/gdpr-cookie-compliance/) | 300.000+ | WP Consent API kompatibel |
| [Real Cookie Banner](https://wordpress.org/plugins/real-cookie-banner/) | 100.000+ | WP Consent API kompatibel |

### Einrichtung

1. Installiere und aktiviere das Plugin [WP Consent API](https://wordpress.org/plugins/wp-consent-api/)
2. Installiere und konfiguriere dein bevorzugtes Cookie-Consent-Plugin (siehe Tabelle oben)
3. Installiere und konfiguriere Advanced Pixel for Barion
4. Keine weitere Konfiguration erforderlich — die Einwilligung wird automatisch verarbeitet

### Consent-Kategorie

Das Barion Pixel ist in der WP Consent API unter der Consent-Kategorie `marketing` registriert. Dies ist die Standardkategorie für Tracking-Pixel, die für Retargeting und Analysen verwendet werden.

---

## Stufe 2: Cookie Law Info (Fallback)

Wenn die WP Consent API nicht verfügbar ist, greift das Plugin auf die direkte Integration mit dem Plugin [Cookie Law Info](https://wordpress.org/plugins/cookie-law-info/) / CookieYes zurück.

### Funktionsweise

1. Prüft, ob das globale JavaScript-Objekt `CLI` vorhanden ist
2. Wenn Cookies bereits akzeptiert wurden (wiederkehrender Besucher), wird die Einwilligung sofort erteilt
3. Wenn Cookies nicht akzeptiert wurden, wird die Einwilligung sofort verweigert
4. Lauscht auf das `cli_user_preference_set`-Event, wenn der Nutzer mit dem Cookie-Banner interagiert
5. Erteilt oder verweigert basierend auf dem Cookie-Wert `cookielawinfo-checkbox-necessary`

### Einrichtung

Keine Konfiguration erforderlich. Installiere beide Plugins und die Integration funktioniert automatisch.

---

## Stufe 3: Manuelle Integration

Für benutzerdefinierte Consent-Manager oder Umgebungen, in denen weder die WP Consent API noch Cookie Law Info verfügbar ist.

### Methode 1: JavaScript-Funktionen (empfohlen)

```javascript
// Wenn der Nutzer Marketing-Cookies akzeptiert
function onMarketingConsentGranted() {
    if (typeof window.wcBarionGrantConsent === 'function') {
        window.wcBarionGrantConsent();
    }
}

// Wenn der Nutzer Marketing-Cookies ablehnt
function onMarketingConsentRejected() {
    if (typeof window.wcBarionRejectConsent === 'function') {
        window.wcBarionRejectConsent();
    }
}
```

### Methode 2: Benutzerdefinierte DOM-Events

```javascript
// Einwilligung erteilen
document.dispatchEvent(new Event('wcBarionGrantConsent'));

// Einwilligung verweigern
document.dispatchEvent(new Event('wcBarionRejectConsent'));
```

### Methode 3: WordPress-Action-Hook

```php
// In deinem Consent-Manager-Plugin oder Theme
add_action('wc_barion_pixel_footer_scripts', 'my_barion_consent_handler');

function my_barion_consent_handler() {
    ?>
    <script>
    // Deine benutzerdefinierte Consent-Logik hier
    </script>
    <?php
}
```

### Beispiele für spezifische Consent-Manager

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

## Auswirkung der Einwilligung auf das Pixel

| Zustand | Basis-Pixel (bp.js) | pageView | Marketing-Datenerfassung |
|---------|---------------------|----------|--------------------------|
| Vor jeder Consent-Aktion | Geladen | Wird ausgelöst (Betrugsprävention) | Keine Daten erfasst |
| Nach `grantConsent` | Geladen | Wird ausgelöst | Vollständige Datenerfassung aktiviert |
| Nach `rejectConsent` | Geladen | Wird ausgelöst (Betrugsprävention) | Keine Marketing-Daten erfasst |

Das Basis-Pixel wird immer für Barions Betrugsprävention geladen. Die Aufrufe `grantConsent` / `rejectConsent` steuern, ob Marketing-Daten erfasst werden.

---

## Testen

1. Aktiviere den **Debug-Modus** unter Einstellungen > Barion Pixel
2. Öffne die Browser-Konsole (F12)
3. Achte auf consent-bezogene Protokollmeldungen:
   - `[Barion Pixel] Consent auto-granted via WP Consent API` — Stufe 1, Nutzer hat zugestimmt
   - `[Barion Pixel] Consent auto-rejected via WP Consent API` — Stufe 1, Nutzer hat abgelehnt
   - `[Barion Pixel] Consent auto-granted via Cookie Law Info` — Stufe 2, Nutzer hat zugestimmt
   - `[Barion Pixel] Consent auto-rejected via Cookie Law Info` — Stufe 2, Nutzer hat abgelehnt
   - `[Barion Pixel] No consent manager detected...` — Stufe 3 (manueller Modus)
   - `[Barion Pixel] Consent granted (grantConsent)` — Einwilligung wurde erteilt (beliebige Stufe)
   - `[Barion Pixel] Consent rejected (rejectConsent)` — Einwilligung wurde verweigert (beliebige Stufe)
4. Teste sowohl den Zustimmungs- als auch den Ablehnungsablauf an deinem Cookie-Banner
5. Die Consent-Funktionen können mehrfach aufgerufen werden (idempotent)
