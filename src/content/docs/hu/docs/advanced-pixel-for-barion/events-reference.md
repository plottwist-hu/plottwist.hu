---
title: "Barion Pixel eseményreferencia"
sidebar:
  order: 1
---

:::note
Ez egy automatikus fordítás. Közösségi javítások szívesen fogadottak!
:::

## Áttekintés

A bővítmény két működési módot támogat:

- **Alap Pixel** (mindig aktív, ha a Pixel azonosító be van állítva): Betölti a `bp.js` fájlt és minden oldalon automatikusan aktiválja a `pageView` eseményt. Csalás megelőzésre szolgál.
- **Teljes követés** (opcionális, az adminisztrációs felületen kapcsolható): E-kereskedelmi eseménykövetést ad a marketing analitikához és az alacsonyabb Barion jutalékkulcshoz.

### Esemény összefoglaló

| Esemény | Mód | bp() hívás | Aktiválás |
|---------|-----|------------|-----------|
| pageView | Alap | Automatikus (bp.js) | Minden oldalbetöltés |
| grantConsent | Alap | `bp('consent', 'grantConsent')` | Cookie hozzájárulás elfogadva |
| rejectConsent | Alap | `bp('consent', 'rejectConsent')` | Cookie hozzájárulás elutasítva |
| contentView | Teljes | `bp('track', 'contentView', data)` | Egyedi termékoldal |
| addToCart | Teljes | `bp('track', 'addToCart', data)` | Kosárba helyezési művelet |
| initiateCheckout | Teljes | `bp('track', 'initiateCheckout', data)` | Pénztár oldal betöltése |
| purchase | Teljes | `bp('track', 'purchase', data)` | Köszönő oldal |
| setEncryptedEmail | Teljes | `bp('identify', 'setEncryptedEmail', email)` | Köszönő oldal |

---

## Alap Pixel események

### pageView

Automatikusan aktiválódik, amikor a `bp.js` betöltődik. Nincs szükség konfigurációra a Pixel azonosító beállításán túl.

### grantConsent

Akkor aktiválódik, amikor a felhasználó elfogadja a marketing cookie-kat. Automatikusan kezeli a WP Consent API vagy a Cookie Law Info, illetve manuálisan a `window.wcBarionGrantConsent()` függvényen keresztül.

### rejectConsent

Akkor aktiválódik, amikor a felhasználó elutasítja a marketing cookie-kat. Automatikusan kezeli a WP Consent API vagy a Cookie Law Info, illetve manuálisan a `window.wcBarionRejectConsent()` függvényen keresztül. Mind a `grantConsent`, mind a `rejectConsent` kötelező a Barion követelményei szerint.

Részletekért lásd a [Cookie-hozzájárulás integráció](../cookie-consent/) dokumentumot.

---

## Teljes követés eseményei

### contentView

**Aktiválás:** Egyedi termékoldal (`woocommerce_after_single_product` hook)

**Küldött mezők:**

| Mező | Típus | Érték |
|------|-------|-------|
| contentType | string | `'Product'` |
| currency | string | WooCommerce üzlet pénzneme (pl. `'HUF'`) |
| id | string | Termék azonosító |
| name | string | Termék megjelenített neve |
| quantity | int | `1` (mindig — egy terméket nézünk) |
| unit | string | `'pcs'` |
| unitPrice | float | Termék ára |

> **Megjegyzés:** A Barion API referencia a `totalItemPrice` mezőt kötelezőként listázza ennél az eseménynél, de a bp.js futásidőben elutasítja: "Invalid key totalItemPrice in contentView event." Ez a mező szándékosan ki van hagyva.

---

### addToCart

**Aktiválás:** Kliensoldalú JavaScript (azonnal aktiválódik a kosárba helyezési műveletnél)

**Megvalósítás:** Két útvonal, mindkettő kliensoldalon kezelve az oldal gyorsítótárazással való kompatibilitás érdekében:

1. **AJAX kosárba helyezés** (bolt/archív oldalak): Figyeli a WooCommerce jQuery `added_to_cart` eseményt. A termékadatokat a `<button>` data attribútumaiból olvassa (`data-product_id`, `data-product_name`, `data-product_price`, `data-quantity`).

2. **Egyedi termékoldal űrlap beküldés**: Elfogja a `form.cart` beküldést. A termékadatok JSON formátumban vannak beágyazva a láblécbe. Változó termékek esetén a WooCommerce jQuery `product_variations` adataiból olvassa a kiválasztott változat `display_price` értékét.

**Küldött mezők:**

| Mező | Típus | Érték |
|------|-------|-------|
| contentType | string | `'Product'` |
| currency | string | Üzlet pénzneme |
| id | string | Termék azonosító |
| name | string | Termék neve |
| quantity | int | Hozzáadott mennyiség |
| unit | string | `'pcs'` |
| unitPrice | float | Egységár |
| totalItemPrice | float | `unitPrice * quantity` |
| step | int | `1` |

---

### initiateCheckout

**Aktiválás:** Pénztár oldal betöltése (`woocommerce_before_checkout_form` hook)

**Küldött mezők:**

| Mező | Típus | Érték |
|------|-------|-------|
| contents | array | Kosár elemek tömbje (lásd alább) |
| currency | string | Üzlet pénzneme |
| revenue | float | Kosár részösszeg + adó (szállítás nélkül — esetleg még nem számított) |
| step | int | `1` |

**Tartalom elem mezők:**

| Mező | Típus | Érték |
|------|-------|-------|
| contentType | string | `'Product'` |
| currency | string | Üzlet pénzneme |
| id | string | Termék azonosító |
| name | string | Termék neve |
| quantity | int | Elem mennyisége |
| unit | string | `'pcs'` |
| unitPrice | float | Egységár |
| totalItemPrice | float | `unitPrice * quantity` |

---

### purchase

**Aktiválás:** Köszönő oldal (`woocommerce_thankyou` hook)

**Duplikáció megelőzés:** A `_wc_barion_tracked` post meta-t használja az oldal újratöltéskor való ismételt aktiválás megakadályozására.

**Küldött mezők:**

| Mező | Típus | Érték |
|------|-------|-------|
| contents | array | Rendelési elemek tömbje (lásd alább) |
| currency | string | Rendelés pénzneme |
| revenue | float | Rendelés végösszege (tartalmazza a szállítást, adót, kedvezményeket) |
| step | int | `1` |

**Tartalom elem mezők:**

| Mező | Típus | Érték |
|------|-------|-------|
| contentType | string | `'Product'` |
| currency | string | Rendelés pénzneme |
| id | string | Termék azonosító |
| name | string | Elem neve |
| quantity | int | Elem mennyisége |
| unit | string | `'pcs'` |
| unitPrice | float | `(item_total + item_tax) / quantity` (tükrözi a kedvezményeket) |
| totalItemPrice | float | `unitPrice * quantity` |

**Megjegyzés a revenue-ről:** A `purchase` esemény a teljes rendelési összeget használja (szállítással együtt), míg az `initiateCheckout` csak a részösszeget + adót (a szállítás esetleg még nem lett kiszámítva a pénztár kezdetén).

---

### setEncryptedEmail

**Aktiválás:** Köszönő oldal (`woocommerce_thankyou` hook)

**bp() hívás:** `bp('identify', 'setEncryptedEmail', email)`

A számlázási e-mail-t kisbetűssé alakítja küldés előtt. A Barion `bp.js` automatikusan kezeli az SHA1 hash-elést — a bővítmény a plain e-mail-t küldi, nem a hash-t.

Csak akkor aktiválódik, ha a rendeléshez tartozik számlázási e-mail cím.

---

## Nem implementált események

| Esemény | Ok |
|---------|----|
| `customEvent` | Nem szükséges a standard e-kereskedelmi követéshez |
| `initiatePayment` | A Barion dokumentáció szerint valósítsd meg a `purchase` VAGY az `initiatePayment` eseményt — mi a `purchase`-t használjuk |
| `setPhoneNumber` | Opcionális; a telefonszám nem érhető el megbízhatóan minden WooCommerce folyamatban |
| `search` | Opcionális; nem része a kötelező eseménykészletnek |
