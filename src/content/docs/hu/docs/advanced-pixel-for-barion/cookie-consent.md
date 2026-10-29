---
title: "Cookie-hozzájárulás integráció"
sidebar:
  order: 2
---

:::note
Ez egy automatikus fordítás. Közösségi javítások szívesen fogadottak! [Javítás beküldése a GitHubon](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/hu/cookie-consent.md)
:::

## Áttekintés

A Barion Pixel marketing adatok gyűjtése előtt explicit felhasználói hozzájárulást igényel (GDPR-megfelelőség). A bővítménynek meg kell hívnia a `bp('consent', 'grantConsent')` függvényt, amikor a felhasználó elfogadja, és a `bp('consent', 'rejectConsent')` függvényt, amikor elutasítja. Mindkét esemény kötelező a Barion követelményei szerint.

Az alap pixel szkript mindig betöltődik a csalás megelőzése érdekében, de marketing adatok csak akkor kerülnek gyűjtésre, ha a hozzájárulás explicit módon meg lett adva vagy elutasítva.

**Fontos:** A cookie bannernek mind elfogadási, mind elutasítási lehetőséget kell kínálnia. A "cookie fal" (csak elfogadás) 2020 óta nem felel meg a GDPR-nak, és a Barion visszautasítja.

A bővítmény a hozzájárulás-integráció három szintjét támogatja, sorrendben ellenőrizve:

1. **WP Consent API** (ajánlott) — univerzális, minden nagyobb cookie bővítménnyel működik
2. **Cookie Law Info** (tartalék) — közvetlen integráció CookieYes/Cookie Law Info-t használó oldalakhoz
3. **Manuális** — egyéni hozzájárulás kezelőkhöz vagy speciális esetekhez

---

## 1. szint: WP Consent API (ajánlott)

A [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) egy WordPress szabvány a hozzájárulás kommunikációjához. Minden nagyobb cookie hozzájárulás bővítmény támogatja.

### Működési elv

A bővítmény futásidőben ellenőrzi a `wp_has_consent()` JavaScript függvény jelenlétét. Ha a WP Consent API elérhető:

1. Az oldal betöltésekor ellenőrzi, hogy a `marketing` hozzájárulás meg van-e adva vagy elutasítva
2. Meghívja a `bp('consent', 'grantConsent')` függvényt, ha a marketing hozzájárulás meg van adva
3. Meghívja a `bp('consent', 'rejectConsent')` függvényt, ha a marketing hozzájárulás nincs meg adva
4. Figyeli a `wp_listen_for_consent_change` eseményt a valós idejű hozzájárulás frissítésekhez — ennek megfelelően ad vagy utasít el hozzájárulást

### Támogatott cookie bővítmények

Bármely bővítmény, amely megvalósítja a WP Consent API-t, automatikusan működni fog:

| Bővítmény | Aktív telepítések | Megjegyzések |
|-----------|-------------------|--------------|
| [CookieYes](https://wordpress.org/plugins/cookie-law-info/) | 1,5M+ | WP Consent API beépített |
| [Complianz](https://wordpress.org/plugins/complianz-gdpr/) | 1M+ | A WP Consent API társalkotója |
| [Cookie Notice by dFactory](https://wordpress.org/plugins/cookie-notice/) | 1M+ | WP Consent API kompatibilis |
| [GDPR Cookie Compliance (Moove)](https://wordpress.org/plugins/gdpr-cookie-compliance/) | 300K+ | WP Consent API kompatibilis |
| [Real Cookie Banner](https://wordpress.org/plugins/real-cookie-banner/) | 100K+ | WP Consent API kompatibilis |

### Beállítás

1. Telepítsd és aktiváld a [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) bővítményt
2. Telepítsd és konfiguráld a preferált cookie hozzájárulás bővítményedet (lásd a fenti táblázatot)
3. Telepítsd és konfiguráld a Advanced Pixel for Barion bővítményt
4. Nincs szükség további konfigurációra — a hozzájárulás kezelése automatikus

### Hozzájárulási kategória

A Barion Pixel a `marketing` hozzájárulási kategória alatt van regisztrálva a WP Consent API-ban. Ez a standard kategória az újracélzáshoz és analitikához használt követési pixelekhez.

---

## 2. szint: Cookie Law Info (tartalék)

Ha a WP Consent API nem érhető el, a bővítmény közvetlen integrációra vált a [Cookie Law Info](https://wordpress.org/plugins/cookie-law-info/) / CookieYes bővítménnyel.

### Működési elv

1. Ellenőrzi a `CLI` JavaScript globális objektum jelenlétét
2. Ha a cookie-k már el vannak fogadva (visszatérő látogató), azonnal megadja a hozzájárulást
3. Ha a cookie-k nincsenek elfogadva, azonnal elutasítja a hozzájárulást
4. Figyeli a `cli_user_preference_set` eseményt, amikor a felhasználó interakcióba lép a cookie bannerrel
5. A `cookielawinfo-checkbox-necessary` cookie értéke alapján ad vagy utasít el hozzájárulást

### Beállítás

Nincs szükség konfigurációra. Telepítsd mindkét bővítményt, és az integráció automatikusan működik.

---

## 3. szint: Manuális integráció

Egyéni hozzájárulás kezelőkhöz vagy olyan környezetekhez, ahol sem a WP Consent API, sem a Cookie Law Info nem érhető el.

### 1. módszer: JavaScript függvények (ajánlott)

```javascript
// Amikor a felhasználó elfogadja a marketing cookie-kat
function onMarketingConsentGranted() {
    if (typeof window.wcBarionGrantConsent === 'function') {
        window.wcBarionGrantConsent();
    }
}

// Amikor a felhasználó elutasítja a marketing cookie-kat
function onMarketingConsentRejected() {
    if (typeof window.wcBarionRejectConsent === 'function') {
        window.wcBarionRejectConsent();
    }
}
```

### 2. módszer: Egyéni DOM események

```javascript
// Hozzájárulás megadása
document.dispatchEvent(new Event('wcBarionGrantConsent'));

// Hozzájárulás elutasítása
document.dispatchEvent(new Event('wcBarionRejectConsent'));
```

### 3. módszer: WordPress action hook

```php
// Az egyéni hozzájárulás kezelő bővítményben vagy témában
add_action('wc_barion_pixel_footer_scripts', 'my_barion_consent_handler');

function my_barion_consent_handler() {
    ?>
    <script>
    // Az egyéni hozzájárulás logikád ide kerül
    </script>
    <?php
}
```

### Példák konkrét hozzájárulás kezelőkhöz

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

## Hogyan befolyásolja a hozzájárulás a pixelt

| Állapot | Alap pixel (bp.js) | pageView | Marketing adatgyűjtés |
|---------|--------------------|-----------|-----------------------|
| Bármilyen hozzájárulási művelet előtt | Betöltve | Aktiválódik (csalás megelőzés) | Nem gyűjt adatot |
| `grantConsent` után | Betöltve | Aktiválódik | Teljes adatgyűjtés engedélyezve |
| `rejectConsent` után | Betöltve | Aktiválódik (csalás megelőzés) | Nem gyűjt marketing adatot |

Az alap pixel mindig betöltődik a Barion csalás megelőzési céljaira. A `grantConsent` / `rejectConsent` hívások szabályozzák, hogy kerül-e gyűjtésre marketing adat.

---

## Tesztelés

1. Engedélyezd a **Hibakeresési módot** a Beállítások > Barion Pixel menüpontban
2. Nyisd meg a böngésző konzolt (F12)
3. Keresd a hozzájárulással kapcsolatos naplóüzeneteket:
   - `[Barion Pixel] Consent auto-granted via WP Consent API` — 1. szint, felhasználó elfogadta
   - `[Barion Pixel] Consent auto-rejected via WP Consent API` — 1. szint, felhasználó elutasította
   - `[Barion Pixel] Consent auto-granted via Cookie Law Info` — 2. szint, felhasználó elfogadta
   - `[Barion Pixel] Consent auto-rejected via Cookie Law Info` — 2. szint, felhasználó elutasította
   - `[Barion Pixel] No consent manager detected...` — 3. szint (manuális mód)
   - `[Barion Pixel] Consent granted (grantConsent)` — hozzájárulás megadva (bármely szint)
   - `[Barion Pixel] Consent rejected (rejectConsent)` — hozzájárulás elutasítva (bármely szint)
4. Teszteld az elfogadási és elutasítási folyamatot is a cookie banneren
5. A hozzájárulás függvények biztonságosan hívhatók többször is (idempotens)
