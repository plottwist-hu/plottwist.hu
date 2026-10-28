---
title: "Integracija saglasnosti za kolačiće"
sidebar:
  order: 2
---

:::note
Ovo je automatski prevod. Ispravke zajednice su dobrodošle!
:::

## Pregled

Barion Pixel zahteva eksplicitnu saglasnost korisnika pre prikupljanja marketinških podataka (usklađenost sa GDPR). Dodatak mora pozvati `bp('consent', 'grantConsent')` kada korisnik prihvati, i `bp('consent', 'rejectConsent')` kada korisnik odbije. Oba događaja su obavezna prema zahtevima Bariona.

Skripta osnovnog piksela se uvek učitava radi sprečavanja prevara, ali marketinški podaci se ne prikupljaju dok saglasnost ne bude eksplicitno odobrena ili odbijena.

**Važno:** Tvoj baner sa kolačićima mora nuditi i opciju prihvatanja i opciju odbijanja. "Zid kolačića" (samo prihvatanje) nije u skladu sa GDPR od 2020. godine i Barion će ga odbiti.

Dodatak podržava tri nivoa integracije saglasnosti, koji se proveravaju sledećim redom:

1. **WP Consent API** (preporučeno) — univerzalno, radi sa svim glavnim dodacima za kolačiće
2. **Cookie Law Info** (rezervna opcija) — direktna integracija za sajtove koji koriste CookieYes/Cookie Law Info
3. **Ručno** — za prilagođene menadžere saglasnosti ili posebne slučajeve

---

## Nivo 1: WP Consent API (preporučeno)

[WP Consent API](https://wordpress.org/plugins/wp-consent-api/) je WordPress standard za komunikaciju saglasnosti. Podržan je od strane svih glavnih dodataka za saglasnost za kolačiće.

### Kako funkcioniše

Dodatak proverava JavaScript funkciju `wp_has_consent()` u realnom vremenu. Ako je WP Consent API dostupan:

1. Pri učitavanju stranice, proverava da li je odobrena ili odbijena `marketing` saglasnost
2. Poziva `bp('consent', 'grantConsent')` ako je marketinška saglasnost odobrena
3. Poziva `bp('consent', 'rejectConsent')` ako marketinška saglasnost nije odobrena
4. Osluškuje događaj `wp_listen_for_consent_change` radi ažuriranja saglasnosti u realnom vremenu — odobrava ili odbija u skladu sa tim

### Podržani dodaci za kolačiće

Bilo koji dodatak koji implementira WP Consent API radiće automatski:

| Dodatak | Aktivne instalacije | Napomene |
|---------|---------------------|---------|
| [CookieYes](https://wordpress.org/plugins/cookie-law-info/) | 1,5M+ | WP Consent API ugrađen |
| [Complianz](https://wordpress.org/plugins/complianz-gdpr/) | 1M+ | Sukreator WP Consent API |
| [Cookie Notice by dFactory](https://wordpress.org/plugins/cookie-notice/) | 1M+ | Kompatibilan sa WP Consent API |
| [GDPR Cookie Compliance (Moove)](https://wordpress.org/plugins/gdpr-cookie-compliance/) | 300K+ | Kompatibilan sa WP Consent API |
| [Real Cookie Banner](https://wordpress.org/plugins/real-cookie-banner/) | 100K+ | Kompatibilan sa WP Consent API |

### Podešavanje

1. Instaliraj i aktiviraj dodatak [WP Consent API](https://wordpress.org/plugins/wp-consent-api/)
2. Instaliraj i podesi preferirani dodatak za saglasnost za kolačiće (pogledaj tabelu iznad)
3. Instaliraj i podesi Advanced Pixel for Barion
4. Nije potrebna dodatna konfiguracija — saglasnost se automatski upravlja

### Kategorija saglasnosti

Barion Pixel je registrovan u kategoriji saglasnosti `marketing` u WP Consent API. Ovo je standardna kategorija za piksele za praćenje koji se koriste za retargeting i analitiku.

---

## Nivo 2: Cookie Law Info (rezervna opcija)

Ako WP Consent API nije dostupan, dodatak prelazi na direktnu integraciju sa [Cookie Law Info](https://wordpress.org/plugins/cookie-law-info/) / CookieYes dodatkom.

### Kako funkcioniše

1. Proverava globalni JavaScript objekat `CLI`
2. Ako su kolačići već prihvaćeni (povratni posetilac), odmah odobrava saglasnost
3. Ako kolačići nisu prihvaćeni, odmah odbija saglasnost
4. Osluškuje događaj `cli_user_preference_set` kada korisnik interaguje sa banerom za kolačiće
5. Odobrava ili odbija na osnovu vrednosti kolačića `cookielawinfo-checkbox-necessary`

### Podešavanje

Nije potrebna konfiguracija. Instaliraj oba dodatka i integracija radi automatski.

---

## Nivo 3: Ručna integracija

Za prilagođene menadžere saglasnosti ili okruženja gde ni WP Consent API ni Cookie Law Info nisu dostupni.

### Metod 1: JavaScript funkcije (preporučeno)

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

### Metod 2: Prilagođeni DOM događaji

```javascript
// Odobri saglasnost
document.dispatchEvent(new Event('wcBarionGrantConsent'));

// Odbij saglasnost
document.dispatchEvent(new Event('wcBarionRejectConsent'));
```

### Metod 3: WordPress action hook

```php
// U tvom dodatku za menadžer saglasnosti ili temi
add_action('wc_barion_pixel_footer_scripts', 'my_barion_consent_handler');

function my_barion_consent_handler() {
    ?>
    <script>
    // Tvoja prilagođena logika saglasnosti ovde
    </script>
    <?php
}
```

### Primeri za specifične menadžere saglasnosti

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

## Kako saglasnost utiče na piksel

| Stanje | Osnovni piksel (bp.js) | pageView | Prikupljanje marketinških podataka |
|--------|------------------------|----------|-----------------------------------|
| Pre bilo koje radnje saglasnosti | Učitan | Aktivira se (sprečavanje prevara) | Podaci se ne prikupljaju |
| Nakon `grantConsent` | Učitan | Aktivira se | Puno prikupljanje podataka omogućeno |
| Nakon `rejectConsent` | Učitan | Aktivira se (sprečavanje prevara) | Marketinški podaci se ne prikupljaju |

Osnovni piksel se uvek učitava radi Barionove prevencije prevara. Pozivi `grantConsent` / `rejectConsent` kontrolišu da li se prikupljaju marketinški podaci.

---

## Testiranje

1. Omogući **Režim za otklanjanje grešaka** u Podešavanja > Barion Pixel
2. Otvori konzolu pregledača (F12)
3. Traži poruke u konzoli vezane za saglasnost:
   - `[Barion Pixel] Consent auto-granted via WP Consent API` — Nivo 1, korisnik prihvatio
   - `[Barion Pixel] Consent auto-rejected via WP Consent API` — Nivo 1, korisnik odbio
   - `[Barion Pixel] Consent auto-granted via Cookie Law Info` — Nivo 2, korisnik prihvatio
   - `[Barion Pixel] Consent auto-rejected via Cookie Law Info` — Nivo 2, korisnik odbio
   - `[Barion Pixel] No consent manager detected...` — Nivo 3 (ručni režim)
   - `[Barion Pixel] Consent granted (grantConsent)` — saglasnost je odobrena (bilo koji nivo)
   - `[Barion Pixel] Consent rejected (rejectConsent)` — saglasnost je odbijena (bilo koji nivo)
4. Testiraj oba toka — prihvatanje i odbijanje — na svom baneru za kolačiće
5. Funkcije saglasnosti je bezbedno pozivati više puta (idempotentne)
