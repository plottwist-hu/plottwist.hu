---
title: "Referenca Barion Pixel događaja"
sidebar:
  order: 1
---

:::note
Ovo je automatski prevod. Ispravke zajednice su dobrodošle! [Pošaljite ispravku na GitHubu](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/sr/events-reference.md)
:::

## Pregled

Dodatak podržava dva načina rada:

- **Osnovni piksel** (uvek aktivan kada je Pixel ID konfigurisan): Učitava `bp.js` i automatski aktivira `pageView` na svakoj stranici. Koristi se za sprečavanje prevara.
- **Potpuno praćenje** (opcionalno, uključuje se u administraciji): Dodaje praćenje događaja e-trgovine za marketinšku analitiku i niže provizije Bariona.

### Pregled događaja

| Događaj | Režim | bp() poziv | Okidač |
|---------|-------|-----------|--------|
| pageView | Osnovni | Automatski (bp.js) | Svako učitavanje stranice |
| grantConsent | Osnovni | `bp('consent', 'grantConsent')` | Saglasnost za kolačiće prihvaćena |
| rejectConsent | Osnovni | `bp('consent', 'rejectConsent')` | Saglasnost za kolačiće odbijena |
| contentView | Potpuni | `bp('track', 'contentView', data)` | Stranica pojedinačnog proizvoda |
| addToCart | Potpuni | `bp('track', 'addToCart', data)` | Radnja dodavanja u korpu |
| initiateCheckout | Potpuni | `bp('track', 'initiateCheckout', data)` | Učitavanje stranice za završetak porudžbine |
| purchase | Potpuni | `bp('track', 'purchase', data)` | Stranica zahvalnice |
| setEncryptedEmail | Potpuni | `bp('identify', 'setEncryptedEmail', email)` | Stranica zahvalnice |

---

## Događaji osnovnog piksela

### pageView

Aktivira se automatski kada se učita `bp.js`. Nije potrebna konfiguracija osim postavljanja Pixel ID-a.

### grantConsent

Aktivira se kada korisnik prihvati marketinške kolačiće. Automatski se upravlja putem WP Consent API ili Cookie Law Info, ili ručno putem `window.wcBarionGrantConsent()`.

### rejectConsent

Aktivira se kada korisnik odbije marketinške kolačiće. Automatski se upravlja putem WP Consent API ili Cookie Law Info, ili ručno putem `window.wcBarionRejectConsent()`. I `grantConsent` i `rejectConsent` su obavezni prema zahtevima Bariona.

Pogledaj [Integracija saglasnosti za kolačiće](../cookie-consent/) za detalje.

---

## Događaji potpunog praćenja

### contentView

**Okidač:** Stranica pojedinačnog proizvoda (hook `woocommerce_after_single_product`)

**Poslata polja:**

| Polje | Tip | Vrednost |
|-------|-----|---------|
| contentType | string | `'Product'` |
| currency | string | Valuta prodavnice u WooCommerce (npr. `'HUF'`) |
| id | string | ID proizvoda |
| name | string | Prikazano ime proizvoda |
| quantity | int | `1` (uvek — pregled jednog proizvoda) |
| unit | string | `'pcs'` |
| unitPrice | float | Cena proizvoda |

> **Napomena:** Barion API referenca navodi `totalItemPrice` kao obavezno za ovaj događaj, ali bp.js ga odbija u realnom vremenu sa porukom "Invalid key totalItemPrice in contentView event." Ovo polje je namerno izostavljeno.

---

### addToCart

**Okidač:** JavaScript na strani klijenta (aktivira se odmah pri radnji dodavanja u korpu)

**Implementacija:** Dva puta, oba upravljana na strani klijenta radi kompatibilnosti sa keširanjem stranica:

1. **AJAX dodavanje u korpu** (stranice prodavnice/arhive): Osluškuje WooCommerce jQuery događaj `added_to_cart`. Čita podatke o proizvodu iz atributa podataka dugmeta `<button>` (`data-product_id`, `data-product_name`, `data-product_price`, `data-quantity`).

2. **Slanje forme na stranici pojedinačnog proizvoda**: Presreće slanje forme `form.cart`. Podaci o proizvodu su ugrađeni kao JSON u podnožju. Za varijabilne proizvode, čita `display_price` odabrane varijacije iz WooCommerce jQuery podataka `product_variations`.

**Poslata polja:**

| Polje | Tip | Vrednost |
|-------|-----|---------|
| contentType | string | `'Product'` |
| currency | string | Valuta prodavnice |
| id | string | ID proizvoda |
| name | string | Ime proizvoda |
| quantity | int | Dodata količina |
| unit | string | `'pcs'` |
| unitPrice | float | Cena po jedinici |
| totalItemPrice | float | `unitPrice * quantity` |
| step | int | `1` |

---

### initiateCheckout

**Okidač:** Učitavanje stranice za završetak porudžbine (hook `woocommerce_before_checkout_form`)

**Poslata polja:**

| Polje | Tip | Vrednost |
|-------|-----|---------|
| contents | array | Niz stavki korpe (pogledaj ispod) |
| currency | string | Valuta prodavnice |
| revenue | float | Međuzbir korpe + porez (bez dostave — možda još nije izračunata) |
| step | int | `1` |

**Polja stavke u sadržaju:**

| Polje | Tip | Vrednost |
|-------|-----|---------|
| contentType | string | `'Product'` |
| currency | string | Valuta prodavnice |
| id | string | ID proizvoda |
| name | string | Ime proizvoda |
| quantity | int | Količina stavke |
| unit | string | `'pcs'` |
| unitPrice | float | Cena po jedinici |
| totalItemPrice | float | `unitPrice * quantity` |

---

### purchase

**Okidač:** Stranica zahvalnice (hook `woocommerce_thankyou`)

**Sprečavanje duplikata:** Koristi post meta `_wc_barion_tracked` da spreči aktiviranje pri ponovnom učitavanju stranice.

**Poslata polja:**

| Polje | Tip | Vrednost |
|-------|-----|---------|
| contents | array | Niz stavki porudžbine (pogledaj ispod) |
| currency | string | Valuta porudžbine |
| revenue | float | Ukupan iznos porudžbine (uključuje dostavu, porez, popuste) |
| step | int | `1` |

**Polja stavke u sadržaju:**

| Polje | Tip | Vrednost |
|-------|-----|---------|
| contentType | string | `'Product'` |
| currency | string | Valuta porudžbine |
| id | string | ID proizvoda |
| name | string | Ime stavke |
| quantity | int | Količina stavke |
| unit | string | `'pcs'` |
| unitPrice | float | `(item_total + item_tax) / quantity` (odražava popuste) |
| totalItemPrice | float | `unitPrice * quantity` |

**Napomena o prihodu:** Događaj `purchase` koristi ukupan iznos porudžbine (uključujući dostavu), dok `initiateCheckout` koristi samo međuzbir + porez (dostava možda nije izračunata na početku završetka porudžbine).

---

### setEncryptedEmail

**Okidač:** Stranica zahvalnice (hook `woocommerce_thankyou`)

**bp() poziv:** `bp('identify', 'setEncryptedEmail', email)`

Adresa za naplatu se pretvara u mala slova pre slanja. Barionov `bp.js` automatski upravlja SHA1 heširanjem — dodatak šalje čistu adresu e-pošte, ne heš.

Aktivira se samo kada porudžbina ima adresu e-pošte za naplatu.

---

## Događaji koji NISU implementirani

| Događaj | Razlog |
|---------|--------|
| `customEvent` | Nije potreban za standardno praćenje e-trgovine |
| `initiatePayment` | Barion dokumentacija kaže: implementiraj `purchase` ILI `initiatePayment` — mi koristimo `purchase` |
| `setPhoneNumber` | Opcionalno; broj telefona nije pouzdano dostupan u svim tokovima WooCommerce |
| `search` | Opcionalno; nije deo obaveznog skupa događaja |
