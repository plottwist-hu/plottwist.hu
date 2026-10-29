---
title: "Tesztelési megjegyzések és ismert sajátosságok"
sidebar:
  order: 4
---

:::note
Ez egy automatikus fordítás. Közösségi javítások szívesen fogadottak! [Javítás beküldése a GitHubon](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/hu/testing-notes.md)
:::

## bp.js futásidejű validációs sajátosságok

A Barion `bp.js` szkriptje kliensoldalú validációt végez az eseményadatokon. Bizonyos esetekben a validációs szabályok eltérnek a Barion API referencia dokumentációjától. Ezeket a sajátosságokat staging tesztelés során fedezték fel.

### totalItemPrice: contentView esetén elutasítva, contents elemekben szükséges

- **contentView** (sima esemény): A bp.js **elutasítja** a `totalItemPrice` mezőt a következő hibával: `Invalid key totalItemPrice in contentView event`, még akkor is, ha az API referencia kötelező mezőként listázza.
- **initiateCheckout** és **purchase** `contents` elemek: A bp.js **megköveteli** a `totalItemPrice` mezőt, és ha hiányzik, a következő hibát adja: `Mandatory key totalItemPrice is missing from contents event`.

**Ökölszabály:** A `totalItemPrice` érvénytelen a sima eseményeknél, de kötelező a `contents` tömb elemein belül.

### unit kötelező a contents elemekben

A bp.js megköveteli a `unit` mezőt a `contents` tömb elemekben az `initiateCheckout` és `purchase` eseményeknél. Ha hiányzik, a következő hibát produkálja: `Mandatory key unit is missing from contents event`.

### step kötelező a checkout eseményeknél

A `step` mező kötelező az `addToCart`, `initiateCheckout` és `purchase` eseményeknél. A Barion dokumentáció az egyoldalas pénztárnál az `1` értéket javasolja.

---

## Hibakeresési mód

Engedélyezd a hibakeresési módot a **Beállítások > Barion Pixel** menüpontban, hogy az összes Barion Pixel esemény naplózódjon a böngésző konzolba.

### Mit kell keresni

Nyisd meg a böngésző konzolt (F12 > Konzol), és keresd a `[Barion Pixel]` előtaggal ellátott üzeneteket:

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

### bp.js hibák

A bp.js numerikus előtaggal naplózza saját validációs hibáit. Leggyakoribbak:

| Hiba | Jelentés | Megoldás |
|------|----------|----------|
| `Mandatory key X is missing from Y event` | Egy kötelező mező nem kerül elküldésre | Ellenőrizd az eseményadatokat |
| `Invalid key X in Y event` | Egy olyan mező kerül elküldésre, amelyet a bp.js nem vár | Távolítsd el a mezőt |

---

## Tesztelési ellenőrzőlista

### Termékoldal (contentView)

1. Navigálj bármely egyedi termékoldralra
2. Nyisd meg a böngésző konzolt
3. Ellenőrizd, hogy megjelenik-e a `[Barion Pixel] Event: contentView` üzenet
4. Ellenőrizd, hogy nincsenek bp.js hibaüzenetek hiányzó/érvénytelen kulcsokról
5. Ellenőrizd, hogy a mezők tartalmazzák: `contentType`, `currency`, `id`, `name`, `quantity`, `unit`, `unitPrice`

### Kosárba helyezés (addToCart)

**A bolt/archív oldalról (AJAX):**

1. Navigálj a bolt oldalára
2. Nyisd meg a böngésző konzolt
3. Kattints "Kosárba" bármely termékre
4. Ellenőrizd, hogy megjelenik-e a `[Barion Pixel] Event: addToCart` üzenet
5. Ellenőrizd, hogy a mezők tartalmazzák a `totalItemPrice` és `step: 1` értékeket

**Egyedi termékoldalról (űrlap beküldés):**

1. Navigálj egy egyedi termékoldalra
2. Nyisd meg a böngésző konzolt
3. Kattints "Kosárba"
4. Ellenőrizd, hogy a `[Barion Pixel] Event: addToCart` aktiválódik mielőtt az oldal navigál
5. Változó termékek esetén: először válassz egy változatot, és ellenőrizd, hogy a változat ára kerül felhasználásra

### Pénztár oldal (initiateCheckout)

1. Helyezz elemeket a kosárba, és navigálj a pénztárhoz
2. Nyisd meg a böngésző konzolt
3. Ellenőrizd, hogy megjelenik-e a `[Barion Pixel] Event: initiateCheckout` üzenet
4. Ellenőrizd, hogy a `contents` tömb helyes elemeket tartalmaz `unit`, `unitPrice`, `totalItemPrice` mezőkkel
5. Ellenőrizd, hogy a `revenue` értéke részösszeg + adó (szállítás nélkül)
6. Ellenőrizd a `step: 1` jelenlétét

### Rendelés teljesítése (purchase + setEncryptedEmail)

1. Teljesíts egy teszt rendelést (egyszerű teszteléshez használd a "Banki átutalás" fizetési módot)
2. A köszönő oldalon nyisd meg a böngésző konzolt
3. Ellenőrizd, hogy megjelenik-e a `[Barion Pixel] Event: purchase` üzenet, ahol a `revenue` egyezik a rendelés végösszegével
4. Ellenőrizd, hogy megjelenik-e a `[Barion Pixel] setEncryptedEmail sent` üzenet
5. Frissítsd a köszönő oldalt — ellenőrizd, hogy a `purchase` esemény NEM aktiválódik újra (duplikáció megelőzés)
6. Ellenőrizd, hogy a `contents` elemek tartalmazzák a `unit`, `totalItemPrice` mezőket

### Hozzájárulás integráció

1. Töröld az összes cookie-t
2. Navigálj bármely oldalra
3. Ellenőrizd, hogy megjelenik-e a `[Barion Pixel] Base pixel initialized` üzenet (az alap pixel mindig betöltődik)
4. Fogadd el a cookie-kat a cookie banneren keresztül
5. Ellenőrizd, hogy megjelenik-e a `[Barion Pixel] Consent granted` üzenet
6. Töltsd újra az oldalt — ellenőrizd, hogy a hozzájárulás automatikusan megadásra kerül az oldal betöltésekor (visszatérő látogató)

---

## Gyakori problémák

### Nem aktiválódnak az események

- **Ellenőrizd a Pixel azonosítót**: Győződj meg róla, hogy érvényes Pixel azonosító van beállítva a Beállítások > Barion Pixel menüpontban
- **Ellenőrizd a teljes követést**: Az eseményekhez szükséges a "Teljes Pixel követés engedélyezése" bejelölése
- **Ellenőrizd a WooCommerce-t**: A teljes követéshez aktív WooCommerce szükséges
- **Ellenőrizd a konzol hibákat**: Keresd a JavaScript hibákat, amelyek megakadályozhatják a bp.js betöltődését

### Dupla pixel betöltés

Ha látod a `[Barion Pixel] bp.js already loaded by another plugin` üzenetet, egy másik bővítmény (valószínűleg a Barion Payment Gateway) már betöltötte a bp.js fájlt. Ez ártalmatlan — a bővítmény kihagyja az újratöltést, és továbbra is inicializál a Pixel azonosítóddal.

### Nem adódik meg a hozzájárulás

- **WP Consent API**: Győződj meg róla, hogy a WP Consent API bővítmény telepítve van, és a cookie bővítményed támogatja azt
- **Cookie Law Info**: Győződj meg róla, hogy a bővítmény aktív, és a `CLI` globális objektum elérhető
- **Manuális**: Hívd meg a `window.wcBarionGrantConsent()` függvényt a hozzájárulás kezelőd visszahívásából
