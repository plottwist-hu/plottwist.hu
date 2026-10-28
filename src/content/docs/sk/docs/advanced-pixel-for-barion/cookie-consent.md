---
title: "Integrácia súhlasu s cookies"
sidebar:
  order: 2
---

:::note
Toto je automatický preklad. Komunitné opravy sú vítané!
:::

## Prehľad

Barion Pixel vyžaduje výslovný súhlas používateľa pred zhromažďovaním marketingových údajov (súlad s GDPR). Plugin musí zavolať `bp('consent', 'grantConsent')`, keď používateľ prijme, a `bp('consent', 'rejectConsent')`, keď odmietne. Oba príkazy sú povinné podľa požiadaviek Barion.

Základný pixelový skript sa načíta vždy kvôli prevencii podvodov, ale žiadne marketingové údaje sa nezhromažďujú, kým nie je súhlas výslovne udelený alebo odmietnutý.

**Dôležité:** Tvoj banner na cookies musí ponúkať možnosť prijať aj odmietnuť. „Cookie wall" (iba prijatie) nie je v súlade s GDPR od roku 2020 a Barion ho odmietne.

Plugin podporuje tri úrovne integrácie súhlasu, kontrolované v tomto poradí:

1. **WP Consent API** (odporúčané) — univerzálne, funguje so všetkými hlavnými pluginmi na cookies
2. **Cookie Law Info** (záložné) — priama integrácia pre weby používajúce CookieYes/Cookie Law Info
3. **Manuálne** — pre vlastné správcovia súhlasu alebo okrajové prípady

---

## Úroveň 1: WP Consent API (odporúčané)

[WP Consent API](https://wordpress.org/plugins/wp-consent-api/) je štandard WordPress pre komunikáciu o súhlase. Podporujú ho všetky hlavné pluginy na súhlas s cookies.

### Ako to funguje

Plugin kontroluje funkciu `wp_has_consent()` v JavaScripte za behu. Ak je WP Consent API dostupné:

1. Pri načítaní stránky skontroluje, či je súhlas pre `marketing` udelený alebo odmietnutý
2. Zavolá `bp('consent', 'grantConsent')`, ak je marketingový súhlas udelený
3. Zavolá `bp('consent', 'rejectConsent')`, ak marketingový súhlas nie je udelený
4. Počúva udalosť `wp_listen_for_consent_change` pre aktualizácie súhlasu v reálnom čase — udelí alebo odmietne podľa toho

### Podporované pluginy na cookies

Automaticky bude fungovať každý plugin, ktorý implementuje WP Consent API:

| Plugin | Aktívne inštalácie | Poznámky |
|--------|-------------------|---------|
| [CookieYes](https://wordpress.org/plugins/cookie-law-info/) | 1,5M+ | WP Consent API vstavaný |
| [Complianz](https://wordpress.org/plugins/complianz-gdpr/) | 1M+ | Spoluzakladateľ WP Consent API |
| [Cookie Notice od dFactory](https://wordpress.org/plugins/cookie-notice/) | 1M+ | Kompatibilný s WP Consent API |
| [GDPR Cookie Compliance (Moove)](https://wordpress.org/plugins/gdpr-cookie-compliance/) | 300K+ | Kompatibilný s WP Consent API |
| [Real Cookie Banner](https://wordpress.org/plugins/real-cookie-banner/) | 100K+ | Kompatibilný s WP Consent API |

### Nastavenie

1. Nainštaluj a aktivuj plugin [WP Consent API](https://wordpress.org/plugins/wp-consent-api/)
2. Nainštaluj a nakonfiguruj preferovaný plugin na súhlas s cookies (pozri tabuľku vyššie)
3. Nainštaluj a nakonfiguruj Advanced Pixel for Barion
4. Nie je potrebná žiadna ďalšia konfigurácia — súhlas sa spracúva automaticky

### Kategória súhlasu

Barion Pixel je zaregistrovaný v kategórii súhlasu `marketing` vo WP Consent API. Ide o štandardnú kategóriu pre sledovacie pixely používané na retargeting a analýzu.

---

## Úroveň 2: Cookie Law Info (záložné)

Ak WP Consent API nie je dostupné, plugin sa vráti k priamej integrácii s pluginom [Cookie Law Info](https://wordpress.org/plugins/cookie-law-info/) / CookieYes.

### Ako to funguje

1. Skontroluje globálny objekt `CLI` v JavaScripte
2. Ak sú cookies už prijaté (vracajúci sa návštevník), okamžite udelí súhlas
3. Ak cookies nie sú prijaté, okamžite odmietne súhlas
4. Počúva udalosť `cli_user_preference_set`, keď používateľ interaguje s bannerom na cookies
5. Udelí alebo odmietne na základe hodnoty cookie `cookielawinfo-checkbox-necessary`

### Nastavenie

Nie je potrebná žiadna konfigurácia. Nainštaluj oba pluginy a integrácia bude fungovať automaticky.

---

## Úroveň 3: Manuálna integrácia

Pre vlastných správcov súhlasu alebo prostredia, kde nie je k dispozícii ani WP Consent API ani Cookie Law Info.

### Metóda 1: Funkcie JavaScriptu (odporúčané)

```javascript
// Keď používateľ prijme marketingové cookies
function onMarketingConsentGranted() {
    if (typeof window.wcBarionGrantConsent === 'function') {
        window.wcBarionGrantConsent();
    }
}

// Keď používateľ odmietne marketingové cookies
function onMarketingConsentRejected() {
    if (typeof window.wcBarionRejectConsent === 'function') {
        window.wcBarionRejectConsent();
    }
}
```

### Metóda 2: Vlastné udalosti DOM

```javascript
// Udeliť súhlas
document.dispatchEvent(new Event('wcBarionGrantConsent'));

// Odmietnuť súhlas
document.dispatchEvent(new Event('wcBarionRejectConsent'));
```

### Metóda 3: WordPress action hook

```php
// V plugine správcu súhlasu alebo téme
add_action('wc_barion_pixel_footer_scripts', 'my_barion_consent_handler');

function my_barion_consent_handler() {
    ?>
    <script>
    // Tu umiesti svoju vlastnú logiku súhlasu
    </script>
    <?php
}
```

### Príklady pre konkrétnych správcov súhlasu

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

## Ako súhlas ovplyvňuje pixel

| Stav | Základný pixel (bp.js) | pageView | Zhromažďovanie marketingových údajov |
|------|------------------------|----------|--------------------------------------|
| Pred akoukoľvek akciou súhlasu | Načítaný | Spúšťa sa (prevencia podvodov) | Žiadne údaje sa nezhromažďujú |
| Po `grantConsent` | Načítaný | Spúšťa sa | Plné zhromažďovanie údajov povolené |
| Po `rejectConsent` | Načítaný | Spúšťa sa (prevencia podvodov) | Žiadne marketingové údaje sa nezhromažďujú |

Základný pixel sa načíta vždy kvôli prevencii podvodov Barion. Volania `grantConsent` / `rejectConsent` určujú, či sa zhromažďujú marketingové údaje.

---

## Testovanie

1. Povoľ **Režim ladenia** v Nastavenia > Barion Pixel
2. Otvor konzolu prehliadača (F12)
3. Hľadaj správy týkajúce sa súhlasu v protokole:
   - `[Barion Pixel] Consent auto-granted via WP Consent API` — Úroveň 1, používateľ prijal
   - `[Barion Pixel] Consent auto-rejected via WP Consent API` — Úroveň 1, používateľ odmietol
   - `[Barion Pixel] Consent auto-granted via Cookie Law Info` — Úroveň 2, používateľ prijal
   - `[Barion Pixel] Consent auto-rejected via Cookie Law Info` — Úroveň 2, používateľ odmietol
   - `[Barion Pixel] No consent manager detected...` — Úroveň 3 (manuálny režim)
   - `[Barion Pixel] Consent granted (grantConsent)` — súhlas bol udelený (akákoľvek úroveň)
   - `[Barion Pixel] Consent rejected (rejectConsent)` — súhlas bol odmietnutý (akákoľvek úroveň)
4. Otestuj toky prijatia aj odmietnutia na svojom banneri na cookies
5. Funkcie súhlasu je bezpečné volať viackrát (idempotentné)
