---
title: "Referencia udalostí Barion Pixel"
sidebar:
  order: 1
---

:::note
Toto je automatický preklad. Komunitné opravy sú vítané! [Odoslať opravu na GitHube](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/sk/events-reference.md)
:::

## Prehľad

Plugin podporuje dva prevádzkové režimy:

- **Základný pixel** (vždy aktívny, keď je nakonfigurované Pixel ID): Načíta `bp.js` a automaticky spustí `pageView` na každej stránke. Používa sa na prevenciu podvodov.
- **Úplné sledovanie** (voliteľné, prepínač v administrácii): Pridáva sledovanie e-commerce udalostí pre marketingové analýzy a nižšie provízne sadzby Barion.

### Súhrn udalostí

| Udalosť | Režim | Volanie bp() | Spúšťač |
|---------|-------|-------------|---------|
| pageView | Základný | Automatické (bp.js) | Každé načítanie stránky |
| grantConsent | Základný | `bp('consent', 'grantConsent')` | Prijatie súhlasu s cookies |
| rejectConsent | Základný | `bp('consent', 'rejectConsent')` | Odmietnutie súhlasu s cookies |
| contentView | Úplný | `bp('track', 'contentView', data)` | Stránka jedného produktu |
| addToCart | Úplný | `bp('track', 'addToCart', data)` | Akcia pridania do košíka |
| initiateCheckout | Úplný | `bp('track', 'initiateCheckout', data)` | Načítanie stránky pokladne |
| purchase | Úplný | `bp('track', 'purchase', data)` | Stránka ďakovania |
| setEncryptedEmail | Úplný | `bp('identify', 'setEncryptedEmail', email)` | Stránka ďakovania |

---

## Udalosti základného pixelu

### pageView

Spustí sa automaticky pri načítaní `bp.js`. Nie je potrebná žiadna konfigurácia okrem nastavenia Pixel ID.

### grantConsent

Spustí sa, keď používateľ prijme marketingové cookies. Spracúva sa automaticky cez WP Consent API alebo Cookie Law Info, alebo manuálne cez `window.wcBarionGrantConsent()`.

### rejectConsent

Spustí sa, keď používateľ odmietne marketingové cookies. Spracúva sa automaticky cez WP Consent API alebo Cookie Law Info, alebo manuálne cez `window.wcBarionRejectConsent()`. Oba príkazy `grantConsent` aj `rejectConsent` sú povinné podľa požiadaviek Barion.

Podrobnosti nájdeš v [Integrácia súhlasu s cookies](../cookie-consent/).

---

## Udalosti úplného sledovania

### contentView

**Spúšťač:** Stránka jedného produktu (hook `woocommerce_after_single_product`)

**Odosielané polia:**

| Pole | Typ | Hodnota |
|------|-----|---------|
| contentType | string | `'Product'` |
| currency | string | Mena obchodu WooCommerce (napr. `'HUF'`) |
| id | string | ID produktu |
| name | string | Zobrazovaný názov produktu |
| quantity | int | `1` (vždy — prezeranie jedného produktu) |
| unit | string | `'pcs'` |
| unitPrice | float | Cena produktu |

> **Poznámka:** Referencia Barion API uvádza `totalItemPrice` ako povinné pre túto udalosť, ale bp.js ho za behu odmietne s chybou „Invalid key totalItemPrice in contentView event." Toto pole je zámerne vynechané.

---

### addToCart

**Spúšťač:** JavaScript na strane klienta (spustí sa okamžite pri akcii pridania do košíka)

**Implementácia:** Dve cesty, obe spracované na strane klienta pre kompatibilitu s ukladaním stránok do cache:

1. **AJAX pridanie do košíka** (stránky obchodu/archívu): Počúva udalosť WooCommerce jQuery `added_to_cart`. Číta údaje o produkte z atribútov `data` tlačidla `<button>` (`data-product_id`, `data-product_name`, `data-product_price`, `data-quantity`).

2. **Odoslanie formulára na stránke jedného produktu**: Zachytí odoslanie `form.cart`. Údaje o produkte sú vložené ako JSON v päte. Pre variabilné produkty číta `display_price` vybranej variácie z údajov WooCommerce jQuery `product_variations`.

**Odosielané polia:**

| Pole | Typ | Hodnota |
|------|-----|---------|
| contentType | string | `'Product'` |
| currency | string | Mena obchodu |
| id | string | ID produktu |
| name | string | Názov produktu |
| quantity | int | Pridané množstvo |
| unit | string | `'pcs'` |
| unitPrice | float | Cena za jednotku |
| totalItemPrice | float | `unitPrice * quantity` |
| step | int | `1` |

---

### initiateCheckout

**Spúšťač:** Načítanie stránky pokladne (hook `woocommerce_before_checkout_form`)

**Odosielané polia:**

| Pole | Typ | Hodnota |
|------|-----|---------|
| contents | array | Pole položiek košíka (pozri nižšie) |
| currency | string | Mena obchodu |
| revenue | float | Medzisúčet košíka + daň (doprava vylúčená — nemusí byť ešte vypočítaná) |
| step | int | `1` |

**Polia položky obsahu:**

| Pole | Typ | Hodnota |
|------|-----|---------|
| contentType | string | `'Product'` |
| currency | string | Mena obchodu |
| id | string | ID produktu |
| name | string | Názov produktu |
| quantity | int | Množstvo položky |
| unit | string | `'pcs'` |
| unitPrice | float | Cena za jednotku |
| totalItemPrice | float | `unitPrice * quantity` |

---

### purchase

**Spúšťač:** Stránka ďakovania (hook `woocommerce_thankyou`)

**Prevencia duplicít:** Používa post meta `_wc_barion_tracked` na zabránenie spusteniu pri opätovnom načítaní stránky.

**Odosielané polia:**

| Pole | Typ | Hodnota |
|------|-----|---------|
| contents | array | Pole položiek objednávky (pozri nižšie) |
| currency | string | Mena objednávky |
| revenue | float | Celková suma objednávky (zahŕňa dopravu, daň, zľavy) |
| step | int | `1` |

**Polia položky obsahu:**

| Pole | Typ | Hodnota |
|------|-----|---------|
| contentType | string | `'Product'` |
| currency | string | Mena objednávky |
| id | string | ID produktu |
| name | string | Názov položky |
| quantity | int | Množstvo položky |
| unit | string | `'pcs'` |
| unitPrice | float | `(item_total + item_tax) / quantity` (zohľadňuje zľavy) |
| totalItemPrice | float | `unitPrice * quantity` |

**Poznámka k príjmu:** Udalosť `purchase` používa celkovú sumu objednávky (vrátane dopravy), zatiaľ čo `initiateCheckout` používa iba medzisúčet + daň (doprava nemusí byť vypočítaná na začiatku pokladne).

---

### setEncryptedEmail

**Spúšťač:** Stránka ďakovania (hook `woocommerce_thankyou`)

**Volanie bp():** `bp('identify', 'setEncryptedEmail', email)`

Fakturačný e-mail sa pred odoslaním prevedie na malé písmená. Barionov `bp.js` automaticky spracúva hashovanie SHA1 — plugin odošle obyčajnú e-mailovú adresu, nie hash.

Spustí sa iba vtedy, keď má objednávka fakturačnú e-mailovú adresu.

---

## Neimplementované udalosti

| Udalosť | Dôvod |
|---------|-------|
| `customEvent` | Nie je potrebná pre štandardné sledovanie e-commerce |
| `initiatePayment` | Dokumentácia Barion hovorí, že treba implementovať `purchase` ALEBO `initiatePayment` — používame `purchase` |
| `setPhoneNumber` | Voliteľné; telefónne číslo nie je spoľahlivo dostupné vo všetkých tokoch WooCommerce |
| `search` | Voliteľné; nie je súčasťou povinnej sady udalostí |
