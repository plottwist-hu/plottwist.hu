---
title: "Integracija soglasja s piškotki"
sidebar:
  order: 2
---

:::note
To je samodejni prevod. Popravki skupnosti so dobrodošli!
:::

## Pregled

Barion Pixel zahteva izrecno soglasje uporabnika pred zbiranjem tržnih podatkov (skladnost z GDPR). Vtičnik mora poklicati `bp('consent', 'grantConsent')`, ko uporabnik sprejme, in `bp('consent', 'rejectConsent')`, ko zavrne. Oba dogodka sta obvezna po zahtevah Barion.

Skript osnovnega piksla se vedno naloži za preprečevanje goljufij, toda nobeni tržni podatki se ne zbirajo, dokler soglasje ni izrecno odobreno ali zavrnjeno.

**Pomembno:** Vaš pasici za piškotke mora ponuditi tako možnost sprejemanja kot zavrnitve. "Zid piškotkov" (samo sprejemanje) ni v skladu z GDPR od leta 2020 in ga bo Barion zavrnil.

Vtičnik podpira tri ravni integracije soglasja, preverjene v naslednjem vrstnem redu:

1. **WP Consent API** (priporočeno) — univerzalno, deluje z vsemi večjimi vtičniki za piškotke
2. **Cookie Law Info** (nadomestno) — neposredna integracija za spletna mesta, ki uporabljajo CookieYes/Cookie Law Info
3. **Ročno** — za prilagojene upravljavce soglasja ali robne primere

---

## Raven 1: WP Consent API (priporočeno)

[WP Consent API](https://wordpress.org/plugins/wp-consent-api/) je WordPress standard za komunikacijo soglasja. Podpirajo ga vsi večji vtičniki za soglasje s piškotki.

### Kako deluje

Vtičnik preveri prisotnost funkcije `wp_has_consent()` JavaScript ob zagonu. Če je WP Consent API na voljo:

1. Ob nalaganju strani preveri, ali je soglasje za `marketing` odobreno ali zavrnjeno
2. Pokliče `bp('consent', 'grantConsent')`, če je tržno soglasje odobreno
3. Pokliče `bp('consent', 'rejectConsent')`, če tržno soglasje ni odobreno
4. Posluša za dogodek `wp_listen_for_consent_change` za posodobitve soglasja v realnem času — ustrezno odobri ali zavrne

### Podprti vtičniki za piškotke

Vsak vtičnik, ki implementira WP Consent API, bo deloval samodejno:

| Vtičnik | Aktivne namestitve | Opombe |
|---------|-------------------|--------|
| [CookieYes](https://wordpress.org/plugins/cookie-law-info/) | 1,5M+ | WP Consent API vgrajen |
| [Complianz](https://wordpress.org/plugins/complianz-gdpr/) | 1M+ | Soustvarjalec WP Consent API |
| [Cookie Notice by dFactory](https://wordpress.org/plugins/cookie-notice/) | 1M+ | Združljivo z WP Consent API |
| [GDPR Cookie Compliance (Moove)](https://wordpress.org/plugins/gdpr-cookie-compliance/) | 300K+ | Združljivo z WP Consent API |
| [Real Cookie Banner](https://wordpress.org/plugins/real-cookie-banner/) | 100K+ | Združljivo z WP Consent API |

### Nastavitev

1. Namesti in aktiviraj vtičnik [WP Consent API](https://wordpress.org/plugins/wp-consent-api/)
2. Namesti in konfiguriraj želeni vtičnik za soglasje s piškotki (glejte tabelo zgoraj)
3. Namesti in konfiguriraj Advanced Pixel for Barion
4. Nobena dodatna konfiguracija ni potrebna — soglasje se obravnava samodejno

### Kategorija soglasja

Barion Pixel je registriran v kategoriji soglasja `marketing` v WP Consent API. To je standardna kategorija za sledilne piksle, ki se uporabljajo za retargeting in analitiko.

---

## Raven 2: Cookie Law Info (nadomestno)

Če WP Consent API ni na voljo, vtičnik preklopi na neposredno integracijo z vtičnikom [Cookie Law Info](https://wordpress.org/plugins/cookie-law-info/) / CookieYes.

### Kako deluje

1. Preveri prisotnost globalnega objekta `CLI` JavaScript
2. Če so piškotki že sprejeti (vračajoči se obiskovalec), takoj odobri soglasje
3. Če piškotki niso sprejeti, takoj zavrne soglasje
4. Posluša za dogodek `cli_user_preference_set`, ko uporabnik interagira s pasico za piškotke
5. Odobri ali zavrne glede na vrednost piškotka `cookielawinfo-checkbox-necessary`

### Nastavitev

Nobena konfiguracija ni potrebna. Namestite oba vtičnika in integracija deluje samodejno.

---

## Raven 3: Ročna integracija

Za prilagojene upravljavce soglasja ali okolja, kjer nista na voljo niti WP Consent API niti Cookie Law Info.

### Metoda 1: Funkcije JavaScript (priporočeno)

```javascript
// Ko uporabnik sprejme tržne piškotke
function onMarketingConsentGranted() {
    if (typeof window.wcBarionGrantConsent === 'function') {
        window.wcBarionGrantConsent();
    }
}

// Ko uporabnik zavrne tržne piškotke
function onMarketingConsentRejected() {
    if (typeof window.wcBarionRejectConsent === 'function') {
        window.wcBarionRejectConsent();
    }
}
```

### Metoda 2: Prilagojeni dogodki DOM

```javascript
// Odobri soglasje
document.dispatchEvent(new Event('wcBarionGrantConsent'));

// Zavrni soglasje
document.dispatchEvent(new Event('wcBarionRejectConsent'));
```

### Metoda 3: WordPress akcijski kavelj

```php
// V vašem vtičniku za upravljanje soglasja ali temi
add_action('wc_barion_pixel_footer_scripts', 'my_barion_consent_handler');

function my_barion_consent_handler() {
    ?>
    <script>
    // Vaša prilagojena logika soglasja tukaj
    </script>
    <?php
}
```

### Primeri za specifične upravljavce soglasja

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

## Kako soglasje vpliva na piksel

| Stanje | Osnovni piksel (bp.js) | pageView | Zbiranje tržnih podatkov |
|--------|----------------------|----------|--------------------------|
| Pred kakršno koli akcijo soglasja | Naložen | Sproži se (preprečevanje goljufij) | Nobeni podatki se ne zbirajo |
| Po `grantConsent` | Naložen | Sproži se | Zbiranje vseh podatkov omogočeno |
| Po `rejectConsent` | Naložen | Sproži se (preprečevanje goljufij) | Nobeni tržni podatki se ne zbirajo |

Osnovni piksel se vedno naloži za Barionovo preprečevanje goljufij. Klici `grantConsent` / `rejectConsent` nadzirajo, ali se zbirajo tržni podatki.

---

## Testiranje

1. Omogočite **Način za odpravljanje napak** v Nastavitve > Barion Pixel
2. Odprite konzolo brskalnika (F12)
3. Poiščite sporočila dnevnika, povezana s soglasjem:
   - `[Barion Pixel] Consent auto-granted via WP Consent API` — Raven 1, uporabnik sprejel
   - `[Barion Pixel] Consent auto-rejected via WP Consent API` — Raven 1, uporabnik zavrnil
   - `[Barion Pixel] Consent auto-granted via Cookie Law Info` — Raven 2, uporabnik sprejel
   - `[Barion Pixel] Consent auto-rejected via Cookie Law Info` — Raven 2, uporabnik zavrnil
   - `[Barion Pixel] No consent manager detected...` — Raven 3 (ročni način)
   - `[Barion Pixel] Consent granted (grantConsent)` — soglasje odobreno (katera koli raven)
   - `[Barion Pixel] Consent rejected (rejectConsent)` — soglasje zavrnjeno (katera koli raven)
4. Preizkusite tako tok sprejemanja kot zavrnitve na vaši pasici za piškotke
5. Funkcije soglasja je varno klicati večkrat (idempotentne)
