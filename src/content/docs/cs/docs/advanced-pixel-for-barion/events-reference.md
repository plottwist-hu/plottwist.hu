---
title: "Přehled událostí Barion Pixel"
sidebar:
  order: 1
---

:::note
Toto je automatický překlad. Komunitní opravy jsou vítány! [Odeslat opravu na GitHubu](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/cs/events-reference.md)
:::

## Přehled

Plugin podporuje dva provozní režimy:

- **Základní Pixel** (vždy aktivní, pokud je nakonfigurováno ID Pixelu): Načte `bp.js` a automaticky spustí `pageView` na každé stránce. Používá se pro prevenci podvodů.
- **Kompletní sledování** (volitelné, přepínač ve správě): Přidává sledování e-commerce událostí pro marketingové analýzy a nižší provizní sazby Barion.

### Souhrn událostí

| Událost | Režim | Volání bp() | Spouštěč |
|---------|-------|-------------|----------|
| pageView | Základní | Automatické (bp.js) | Každé načtení stránky |
| grantConsent | Základní | `bp('consent', 'grantConsent')` | Přijetí souhlasu s cookies |
| rejectConsent | Základní | `bp('consent', 'rejectConsent')` | Odmítnutí souhlasu s cookies |
| contentView | Kompletní | `bp('track', 'contentView', data)` | Stránka jednotlivého produktu |
| addToCart | Kompletní | `bp('track', 'addToCart', data)` | Akce přidání do košíku |
| initiateCheckout | Kompletní | `bp('track', 'initiateCheckout', data)` | Načtení stránky pokladny |
| purchase | Kompletní | `bp('track', 'purchase', data)` | Stránka s poděkováním |
| setEncryptedEmail | Kompletní | `bp('identify', 'setEncryptedEmail', email)` | Stránka s poděkováním |

---

## Události základního pixelu

### pageView

Spustí se automaticky při načtení `bp.js`. Není potřeba žádná konfigurace nad rámec nastavení ID Pixelu.

### grantConsent

Spustí se, když uživatel přijme marketingové cookies. Zpracováváno automaticky přes WP Consent API nebo Cookie Law Info, nebo ručně přes `window.wcBarionGrantConsent()`.

### rejectConsent

Spustí se, když uživatel odmítne marketingové cookies. Zpracováváno automaticky přes WP Consent API nebo Cookie Law Info, nebo ručně přes `window.wcBarionRejectConsent()`. Obě události `grantConsent` i `rejectConsent` jsou povinné dle požadavků Barion.

Viz [Integrace souhlasu s cookies](../cookie-consent/) pro podrobnosti.

---

## Události kompletního sledování

### contentView

**Spouštěč:** Stránka jednotlivého produktu (hook `woocommerce_after_single_product`)

**Odesílaná pole:**

| Pole | Typ | Hodnota |
|------|-----|---------|
| contentType | string | `'Product'` |
| currency | string | Měna obchodu WooCommerce (např. `'HUF'`) |
| id | string | ID produktu |
| name | string | Zobrazovaný název produktu |
| quantity | int | `1` (vždy — prohlíží se jeden produkt) |
| unit | string | `'pcs'` |
| unitPrice | float | Cena produktu |

> **Poznámka:** Referenční dokumentace Barion API uvádí `totalItemPrice` jako povinné pole pro tuto událost, ale bp.js ho za běhu odmítne s chybou „Invalid key totalItemPrice in contentView event." Toto pole je záměrně vynecháno.

---

### addToCart

**Spouštěč:** JavaScript na straně klienta (spouští se okamžitě při akci přidání do košíku)

**Implementace:** Dvě cesty, obě zpracovávané na straně klienta, aby fungovaly s ukládáním stránek do mezipaměti:

1. **AJAX přidání do košíku** (stránky obchodu/archivů): Naslouchá WooCommerce jQuery události `added_to_cart`. Čte data produktu z datových atributů `<button>` (`data-product_id`, `data-product_name`, `data-product_price`, `data-quantity`).

2. **Odeslání formuláře na stránce jednotlivého produktu**: Zachytí odeslání `form.cart`. Data produktu jsou vložena jako JSON v zápatí. Pro variabilní produkty čte `display_price` vybrané varianty z dat WooCommerce jQuery `product_variations`.

**Odesílaná pole:**

| Pole | Typ | Hodnota |
|------|-----|---------|
| contentType | string | `'Product'` |
| currency | string | Měna obchodu |
| id | string | ID produktu |
| name | string | Název produktu |
| quantity | int | Přidané množství |
| unit | string | `'pcs'` |
| unitPrice | float | Cena za kus |
| totalItemPrice | float | `unitPrice * quantity` |
| step | int | `1` |

---

### initiateCheckout

**Spouštěč:** Načtení stránky pokladny (hook `woocommerce_before_checkout_form`)

**Odesílaná pole:**

| Pole | Typ | Hodnota |
|------|-----|---------|
| contents | array | Pole položek košíku (viz níže) |
| currency | string | Měna obchodu |
| revenue | float | Mezisoučet košíku + daň (doprava vyloučena — nemusí být ještě vypočítána) |
| step | int | `1` |

**Pole položky obsahu:**

| Pole | Typ | Hodnota |
|------|-----|---------|
| contentType | string | `'Product'` |
| currency | string | Měna obchodu |
| id | string | ID produktu |
| name | string | Název produktu |
| quantity | int | Množství položky |
| unit | string | `'pcs'` |
| unitPrice | float | Jednotková cena |
| totalItemPrice | float | `unitPrice * quantity` |

---

### purchase

**Spouštěč:** Stránka s poděkováním (hook `woocommerce_thankyou`)

**Ochrana proti duplicitám:** Používá post meta `_wc_barion_tracked` k zabránění opětovnému spuštění při obnovení stránky.

**Odesílaná pole:**

| Pole | Typ | Hodnota |
|------|-----|---------|
| contents | array | Pole položek objednávky (viz níže) |
| currency | string | Měna objednávky |
| revenue | float | Celková částka objednávky (zahrnuje dopravu, daň, slevy) |
| step | int | `1` |

**Pole položky obsahu:**

| Pole | Typ | Hodnota |
|------|-----|---------|
| contentType | string | `'Product'` |
| currency | string | Měna objednávky |
| id | string | ID produktu |
| name | string | Název položky |
| quantity | int | Množství položky |
| unit | string | `'pcs'` |
| unitPrice | float | `(item_total + item_tax) / quantity` (zohledňuje slevy) |
| totalItemPrice | float | `unitPrice * quantity` |

**Poznámka k revenue:** Událost `purchase` používá celkovou částku objednávky (včetně dopravy), zatímco `initiateCheckout` používá pouze mezisoučet + daň (doprava nemusí být na začátku pokladny ještě vypočítána).

---

### setEncryptedEmail

**Spouštěč:** Stránka s poděkováním (hook `woocommerce_thankyou`)

**Volání bp():** `bp('identify', 'setEncryptedEmail', email)`

Fakturační e-mail je před odesláním převeden na malá písmena. `bp.js` od Barion zpracovává hashování SHA1 automaticky — plugin odesílá prostou e-mailovou adresu, nikoli hash.

Spustí se pouze v případě, že objednávka obsahuje fakturační e-mailovou adresu.

---

## Neimplementované události

| Událost | Důvod |
|---------|-------|
| `customEvent` | Není potřeba pro standardní sledování e-commerce |
| `initiatePayment` | Dokumentace Barion říká implementovat `purchase` NEBO `initiatePayment` — používáme `purchase` |
| `setPhoneNumber` | Volitelné; telefonní číslo není spolehlivě dostupné ve všech tocích WooCommerce |
| `search` | Volitelné; není součástí povinné sady událostí |
