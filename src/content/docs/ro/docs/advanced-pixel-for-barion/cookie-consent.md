---
title: "Integrare consimțământ cookie"
sidebar:
  order: 2
---

:::note
Aceasta este o traducere automată. Corecțiile comunității sunt binevenite! [Trimiteți o corectură pe GitHub](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/ro/cookie-consent.md)
:::

## Prezentare generală

Barion Pixel necesită consimțământul explicit al utilizatorului înainte de a colecta date de marketing (conformitate GDPR). Plugin-ul trebuie să apeleze `bp('consent', 'grantConsent')` când utilizatorul acceptă și `bp('consent', 'rejectConsent')` când utilizatorul refuză. Ambele evenimente sunt obligatorii conform cerințelor Barion.

Scriptul pixelului de bază se încarcă întotdeauna pentru prevenirea fraudei, dar nu se colectează date de marketing până când consimțământul nu este acordat sau refuzat în mod explicit.

**Important:** Bannerul tău de cookie-uri trebuie să ofere atât o opțiune de acceptare, cât și una de refuz. Un „zid de cookie-uri" (numai acceptare) nu este conform cu GDPR din 2020 și va fi respins de Barion.

Plugin-ul suportă trei niveluri de integrare a consimțământului, verificate în ordine:

1. **WP Consent API** (recomandat) — universal, funcționează cu toate plugin-urile majore de cookie
2. **Cookie Law Info** (fallback) — integrare directă pentru site-urile care folosesc CookieYes/Cookie Law Info
3. **Manual** — pentru manageri de consimțământ personalizați sau cazuri speciale

---

## Nivelul 1: WP Consent API (Recomandat)

[WP Consent API](https://wordpress.org/plugins/wp-consent-api/) este un standard WordPress pentru comunicarea consimțământului. Este suportat de toate plugin-urile majore de consimțământ cookie.

### Cum funcționează

Plugin-ul verifică funcția JavaScript `wp_has_consent()` la execuție. Dacă WP Consent API este disponibil:

1. La încărcarea paginii, verifică dacă consimțământul `marketing` este acordat sau refuzat
2. Apelează `bp('consent', 'grantConsent')` dacă consimțământul de marketing este acordat
3. Apelează `bp('consent', 'rejectConsent')` dacă consimțământul de marketing nu este acordat
4. Ascultă evenimentul `wp_listen_for_consent_change` pentru actualizări de consimțământ în timp real — acordă sau refuză în consecință

### Plugin-uri de cookie suportate

Orice plugin care implementează WP Consent API va funcționa automat:

| Plugin | Instalări active | Note |
|--------|----------------|-------|
| [CookieYes](https://wordpress.org/plugins/cookie-law-info/) | 1,5M+ | WP Consent API integrat |
| [Complianz](https://wordpress.org/plugins/complianz-gdpr/) | 1M+ | Co-creator al WP Consent API |
| [Cookie Notice by dFactory](https://wordpress.org/plugins/cookie-notice/) | 1M+ | Compatibil cu WP Consent API |
| [GDPR Cookie Compliance (Moove)](https://wordpress.org/plugins/gdpr-cookie-compliance/) | 300K+ | Compatibil cu WP Consent API |
| [Real Cookie Banner](https://wordpress.org/plugins/real-cookie-banner/) | 100K+ | Compatibil cu WP Consent API |

### Configurare

1. Instalează și activează plugin-ul [WP Consent API](https://wordpress.org/plugins/wp-consent-api/)
2. Instalează și configurează plugin-ul preferat de consimțământ cookie (vezi tabelul de mai sus)
3. Instalează și configurează Advanced Pixel for Barion
4. Nu este necesară configurare suplimentară — consimțământul este gestionat automat

### Categoria de consimțământ

Barion Pixel este înregistrat în categoria de consimțământ `marketing` din WP Consent API. Aceasta este categoria standard pentru pixelii de urmărire utilizați pentru retargeting și analiză.

---

## Nivelul 2: Cookie Law Info (Fallback)

Dacă WP Consent API nu este disponibil, plugin-ul trece la integrarea directă cu plugin-ul [Cookie Law Info](https://wordpress.org/plugins/cookie-law-info/) / CookieYes.

### Cum funcționează

1. Verifică obiectul global JavaScript `CLI`
2. Dacă cookie-urile sunt deja acceptate (vizitator care revine), acordă consimțământul imediat
3. Dacă cookie-urile nu sunt acceptate, refuză consimțământul imediat
4. Ascultă evenimentul `cli_user_preference_set` când utilizatorul interacționează cu bannerul de cookie
5. Acordă sau refuză în funcție de valoarea cookie-ului `cookielawinfo-checkbox-necessary`

### Configurare

Nu este necesară nicio configurare. Instalează ambele plugin-uri și integrarea funcționează automat.

---

## Nivelul 3: Integrare manuală

Pentru manageri de consimțământ personalizați sau medii în care nici WP Consent API, nici Cookie Law Info nu sunt disponibile.

### Metoda 1: Funcții JavaScript (recomandat)

```javascript
// Când utilizatorul acceptă cookie-urile de marketing
function onMarketingConsentGranted() {
    if (typeof window.wcBarionGrantConsent === 'function') {
        window.wcBarionGrantConsent();
    }
}

// Când utilizatorul refuză cookie-urile de marketing
function onMarketingConsentRejected() {
    if (typeof window.wcBarionRejectConsent === 'function') {
        window.wcBarionRejectConsent();
    }
}
```

### Metoda 2: Evenimente DOM personalizate

```javascript
// Acordă consimțământul
document.dispatchEvent(new Event('wcBarionGrantConsent'));

// Refuză consimțământul
document.dispatchEvent(new Event('wcBarionRejectConsent'));
```

### Metoda 3: Hook de acțiune WordPress

```php
// În plugin-ul tău de manager de consimțământ sau temă
add_action('wc_barion_pixel_footer_scripts', 'my_barion_consent_handler');

function my_barion_consent_handler() {
    ?>
    <script>
    // Logica ta personalizată de consimțământ aici
    </script>
    <?php
}
```

### Exemple pentru manageri de consimțământ specifici

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

## Cum afectează consimțământul pixelul

| Stare | Pixel de bază (bp.js) | pageView | Colectarea datelor de marketing |
|-------|--------------------|----------|--------------------------|
| Înainte de orice acțiune de consimțământ | Încărcat | Se declanșează (prevenirea fraudei) | Nu se colectează date |
| După `grantConsent` | Încărcat | Se declanșează | Colectarea completă de date activată |
| După `rejectConsent` | Încărcat | Se declanșează (prevenirea fraudei) | Nu se colectează date de marketing |

Pixelul de bază se încarcă întotdeauna pentru prevenirea fraudei Barion. Apelurile `grantConsent` / `rejectConsent` controlează dacă se colectează date de marketing.

---

## Testare

1. Activează **Mod depanare** în Setări > Barion Pixel
2. Deschide consola browserului (F12)
3. Caută mesajele de jurnal legate de consimțământ:
   - `[Barion Pixel] Consent auto-granted via WP Consent API` — Nivelul 1, utilizator a acceptat
   - `[Barion Pixel] Consent auto-rejected via WP Consent API` — Nivelul 1, utilizator a refuzat
   - `[Barion Pixel] Consent auto-granted via Cookie Law Info` — Nivelul 2, utilizator a acceptat
   - `[Barion Pixel] Consent auto-rejected via Cookie Law Info` — Nivelul 2, utilizator a refuzat
   - `[Barion Pixel] No consent manager detected...` — Nivelul 3 (mod manual)
   - `[Barion Pixel] Consent granted (grantConsent)` — consimțământul a fost acordat (orice nivel)
   - `[Barion Pixel] Consent rejected (rejectConsent)` — consimțământul a fost refuzat (orice nivel)
4. Testează atât fluxul de acceptare, cât și cel de refuz pe bannerul tău de cookie
5. Funcțiile de consimțământ pot fi apelate de mai multe ori în siguranță (idempotente)
