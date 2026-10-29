---
title: "Integracija pristanka na kolačiće"
sidebar:
  order: 2
---

:::note
Ovo je automatski prijevod. Ispravci zajednice su dobrodošli! [Pošaljite ispravak na GitHubu](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/hr/cookie-consent.md)
:::

## Pregled

Barion Pixel zahtijeva eksplicitni pristanak korisnika prije prikupljanja marketinških podataka (usklađenost s GDPR-om). Dodatak mora pozvati `bp('consent', 'grantConsent')` kada korisnik prihvati, i `bp('consent', 'rejectConsent')` kada korisnik odbije. Oba događaja su obvezna prema Barion zahtjevima.

Osnovna skripta pixela uvijek se učitava radi sprječavanja prijevare, ali marketinški podaci se ne prikupljaju dok se pristanak eksplicitno ne odobri ili odbije.

**Važno:** Tvoj banner za kolačiće mora nuditi i opciju prihvaćanja i opciju odbijanja. "Zid kolačića" (samo prihvaćanje) nije usklađen s GDPR-om od 2020. godine i Barion ga neće prihvatiti.

Dodatak podržava tri razine integracije pristanka, provjeravane po redu:

1. **WP Consent API** (preporučeno) — univerzalan, radi sa svim glavnim dodacima za kolačiće
2. **Cookie Law Info** (rezervna opcija) — izravna integracija za stranice koje koriste CookieYes/Cookie Law Info
3. **Ručno** — za prilagođene upravitelje pristanka ili rubne slučajeve

---

## Razina 1: WP Consent API (Preporučeno)

[WP Consent API](https://wordpress.org/plugins/wp-consent-api/) je WordPress standard za komunikaciju o pristanku. Podržavaju ga svi glavni dodaci za pristanak na kolačiće.

### Kako radi

Dodatak provjerava JavaScript funkciju `wp_has_consent()` za vrijeme izvođenja. Ako je WP Consent API dostupan:

1. Pri učitavanju stranice provjerava je li `marketing` pristanak odobren ili odbijen
2. Poziva `bp('consent', 'grantConsent')` ako je marketinški pristanak odobren
3. Poziva `bp('consent', 'rejectConsent')` ako marketinški pristanak nije odobren
4. Sluša događaj `wp_listen_for_consent_change` za ažuriranja pristanka u stvarnom vremenu — odobrava ili odbija prema tome

### Podržani dodaci za kolačiće

Svaki dodatak koji implementira WP Consent API radit će automatski:

| Dodatak | Aktivne instalacije | Napomene |
|---------|---------------------|---------|
| [CookieYes](https://wordpress.org/plugins/cookie-law-info/) | 1,5M+ | WP Consent API ugrađen |
| [Complianz](https://wordpress.org/plugins/complianz-gdpr/) | 1M+ | Sukreator WP Consent API-ja |
| [Cookie Notice od dFactory](https://wordpress.org/plugins/cookie-notice/) | 1M+ | Kompatibilan s WP Consent API-jem |
| [GDPR Cookie Compliance (Moove)](https://wordpress.org/plugins/gdpr-cookie-compliance/) | 300K+ | Kompatibilan s WP Consent API-jem |
| [Real Cookie Banner](https://wordpress.org/plugins/real-cookie-banner/) | 100K+ | Kompatibilan s WP Consent API-jem |

### Postavljanje

1. Instaliraj i aktiviraj dodatak [WP Consent API](https://wordpress.org/plugins/wp-consent-api/)
2. Instaliraj i konfiguriraj željeni dodatak za pristanak na kolačiće (vidi tablicu iznad)
3. Instaliraj i konfiguriraj Advanced Pixel for Barion
4. Nije potrebna dodatna konfiguracija — pristanak se obrađuje automatski

### Kategorija pristanka

Barion Pixel je registriran u kategoriji pristanka `marketing` u WP Consent API-ju. Ovo je standardna kategorija za piksele za praćenje koji se koriste za retargeting i analitiku.

---

## Razina 2: Cookie Law Info (Rezervna opcija)

Ako WP Consent API nije dostupan, dodatak se vraća na izravnu integraciju s dodatkom [Cookie Law Info](https://wordpress.org/plugins/cookie-law-info/) / CookieYes.

### Kako radi

1. Provjerava globalni JavaScript objekt `CLI`
2. Ako su kolačići već prihvaćeni (povratni posjetitelj), odmah odobrava pristanak
3. Ako kolačići nisu prihvaćeni, odmah odbija pristanak
4. Sluša događaj `cli_user_preference_set` kada korisnik stupi u interakciju s bannerom za kolačiće
5. Odobrava ili odbija na temelju vrijednosti kolačića `cookielawinfo-checkbox-necessary`

### Postavljanje

Nije potrebna konfiguracija. Instaliraj oba dodatka i integracija radi automatski.

---

## Razina 3: Ručna integracija

Za prilagođene upravitelje pristanka ili okruženja gdje niti WP Consent API niti Cookie Law Info nisu dostupni.

### Metoda 1: JavaScript funkcije (preporučeno)

```javascript
// Kada korisnik prihvati marketinške kolačiće
function onMarketingConsentGranted() {
    if (typeof window.wcBarionGrantConsent === 'function') {
        window.wcBarionGrantConsent();
    }
}

// Kada korisnik odbije marketinške kolačiće
function onMarketingConsentRejected() {
    if (typeof window.wcBarionRejectConsent === 'function') {
        window.wcBarionRejectConsent();
    }
}
```

### Metoda 2: Prilagođeni DOM događaji

```javascript
// Odobri pristanak
document.dispatchEvent(new Event('wcBarionGrantConsent'));

// Odbij pristanak
document.dispatchEvent(new Event('wcBarionRejectConsent'));
```

### Metoda 3: WordPress action hook

```php
// U svom dodatku za upravljanje pristankom ili temi
add_action('wc_barion_pixel_footer_scripts', 'my_barion_consent_handler');

function my_barion_consent_handler() {
    ?>
    <script>
    // Ovdje dodaj svoju prilagođenu logiku pristanka
    </script>
    <?php
}
```

### Primjeri za specifične upravitelje pristanka

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

## Kako pristanak utječe na pixel

| Stanje | Osnovni pixel (bp.js) | pageView | Prikupljanje marketinških podataka |
|--------|----------------------|----------|-----------------------------------|
| Prije bilo koje radnje pristanka | Učitan | Pokreće se (sprječavanje prijevare) | Nema prikupljanja podataka |
| Nakon `grantConsent` | Učitan | Pokreće se | Omogućeno puno prikupljanje podataka |
| Nakon `rejectConsent` | Učitan | Pokreće se (sprječavanje prijevare) | Nema prikupljanja marketinških podataka |

Osnovni pixel uvijek se učitava za Barionovo sprječavanje prijevare. Pozivi `grantConsent` / `rejectConsent` kontroliraju prikupljaju li se marketinški podaci.

---

## Testiranje

1. Omogući **Način rada za otklanjanje pogrešaka** u Postavke > Barion Pixel
2. Otvori konzolu preglednika (F12)
3. Traži poruke u konzoli vezane za pristanak:
   - `[Barion Pixel] Consent auto-granted via WP Consent API` — Razina 1, korisnik prihvatio
   - `[Barion Pixel] Consent auto-rejected via WP Consent API` — Razina 1, korisnik odbio
   - `[Barion Pixel] Consent auto-granted via Cookie Law Info` — Razina 2, korisnik prihvatio
   - `[Barion Pixel] Consent auto-rejected via Cookie Law Info` — Razina 2, korisnik odbio
   - `[Barion Pixel] No consent manager detected...` — Razina 3 (ručni način)
   - `[Barion Pixel] Consent granted (grantConsent)` — pristanak je odobren (bilo koja razina)
   - `[Barion Pixel] Consent rejected (rejectConsent)` — pristanak je odbijen (bilo koja razina)
4. Testiraj tokove prihvaćanja i odbijanja na svom banneru za kolačiće
5. Funkcije pristanka sigurno je pozivati više puta (idempotentne su)
