---
title: "Referenca Barion Pixel događaja"
sidebar:
  order: 1
---

:::note
Ovo je automatski prijevod. Ispravci zajednice su dobrodošli!
:::

## Pregled

Dodatak podržava dva načina rada:

- **Osnovni Pixel** (uvijek aktivan kada je konfiguriran Pixel ID): Učitava `bp.js` i automatski pokreće `pageView` na svakoj stranici. Koristi se za sprječavanje prijevare.
- **Potpuno praćenje** (neobavezno, uključuje/isključuje se u administraciji): Dodaje praćenje e-trgovinskih događaja za marketinšku analitiku i niže Barion provizije.

### Sažetak događaja

| Događaj | Način | bp() poziv | Okidač |
|---------|-------|-----------|--------|
| pageView | Osnovni | Automatski (bp.js) | Svako učitavanje stranice |
| grantConsent | Osnovni | `bp('consent', 'grantConsent')` | Pristanak na kolačiće prihvaćen |
| rejectConsent | Osnovni | `bp('consent', 'rejectConsent')` | Pristanak na kolačiće odbijen |
| contentView | Potpuni | `bp('track', 'contentView', data)` | Stranica jednog proizvoda |
| addToCart | Potpuni | `bp('track', 'addToCart', data)` | Radnja dodavanja u košaricu |
| initiateCheckout | Potpuni | `bp('track', 'initiateCheckout', data)` | Učitavanje stranice naplate |
| purchase | Potpuni | `bp('track', 'purchase', data)` | Stranica zahvale |
| setEncryptedEmail | Potpuni | `bp('identify', 'setEncryptedEmail', email)` | Stranica zahvale |

---

## Događaji osnovnog Pixela

### pageView

Pokreće se automatski kada se učita `bp.js`. Nije potrebna konfiguracija osim postavljanja Pixel ID-a.

### grantConsent

Pokreće se kada korisnik prihvati marketinške kolačiće. Obrađuje se automatski putem WP Consent API-ja ili Cookie Law Info, ili ručno putem `window.wcBarionGrantConsent()`.

### rejectConsent

Pokreće se kada korisnik odbije marketinške kolačiće. Obrađuje se automatski putem WP Consent API-ja ili Cookie Law Info, ili ručno putem `window.wcBarionRejectConsent()`. I `grantConsent` i `rejectConsent` su obvezni prema Barion zahtjevima.

Pogledaj [Integracija pristanka na kolačiće](../cookie-consent/) za detalje.

---

## Događaji potpunog praćenja

### contentView

**Okidač:** Stranica jednog proizvoda (hook `woocommerce_after_single_product`)

**Poslana polja:**

| Polje | Vrsta | Vrijednost |
|-------|-------|-----------|
| contentType | string | `'Product'` |
| currency | string | Valuta WooCommerce trgovine (npr. `'HUF'`) |
| id | string | ID proizvoda |
| name | string | Naziv za prikaz proizvoda |
| quantity | int | `1` (uvijek — pregledava se jedan proizvod) |
| unit | string | `'pcs'` |
| unitPrice | float | Cijena proizvoda |

> **Napomena:** Barion API referenca navodi `totalItemPrice` kao obvezno za ovaj događaj, ali bp.js ga odbija za vrijeme izvođenja s porukom "Invalid key totalItemPrice in contentView event." Ovo polje je namjerno izostavljeno.

---

### addToCart

**Okidač:** JavaScript na strani klijenta (pokreće se odmah pri radnji dodavanja u košaricu)

**Implementacija:** Dva puta, oba obrađena na strani klijenta za rad s predmemoriranjem stranica:

1. **AJAX dodavanje u košaricu** (stranice trgovine/arhive): Sluša WooCommerce jQuery događaj `added_to_cart`. Čita podatke o proizvodu iz `<button>` data atributa (`data-product_id`, `data-product_name`, `data-product_price`, `data-quantity`).

2. **Slanje obrasca na stranici jednog proizvoda**: Presreće slanje `form.cart`. Podaci o proizvodu su ugrađeni kao JSON u podnožje. Za varijabilne proizvode, čita `display_price` odabrane varijacije iz WooCommerce jQuery podataka `product_variations`.

**Poslana polja:**

| Polje | Vrsta | Vrijednost |
|-------|-------|-----------|
| contentType | string | `'Product'` |
| currency | string | Valuta trgovine |
| id | string | ID proizvoda |
| name | string | Naziv proizvoda |
| quantity | int | Dodana količina |
| unit | string | `'pcs'` |
| unitPrice | float | Cijena po jedinici |
| totalItemPrice | float | `unitPrice * quantity` |
| step | int | `1` |

---

### initiateCheckout

**Okidač:** Učitavanje stranice naplate (hook `woocommerce_before_checkout_form`)

**Poslana polja:**

| Polje | Vrsta | Vrijednost |
|-------|-------|-----------|
| contents | array | Niz stavki košarice (vidi dolje) |
| currency | string | Valuta trgovine |
| revenue | float | Međuzbroj košarice + porez (bez dostave — možda još nije izračunata) |
| step | int | `1` |

**Polja stavki sadržaja:**

| Polje | Vrsta | Vrijednost |
|-------|-------|-----------|
| contentType | string | `'Product'` |
| currency | string | Valuta trgovine |
| id | string | ID proizvoda |
| name | string | Naziv proizvoda |
| quantity | int | Količina stavke |
| unit | string | `'pcs'` |
| unitPrice | float | Jedinična cijena |
| totalItemPrice | float | `unitPrice * quantity` |

---

### purchase

**Okidač:** Stranica zahvale (hook `woocommerce_thankyou`)

**Prevencija dupliciranja:** Koristi `_wc_barion_tracked` post meta za sprječavanje ponovnog pokretanja pri osvježavanju stranice.

**Poslana polja:**

| Polje | Vrsta | Vrijednost |
|-------|-------|-----------|
| contents | array | Niz stavki narudžbe (vidi dolje) |
| currency | string | Valuta narudžbe |
| revenue | float | Ukupni iznos narudžbe (uključuje dostavu, porez, popuste) |
| step | int | `1` |

**Polja stavki sadržaja:**

| Polje | Vrsta | Vrijednost |
|-------|-------|-----------|
| contentType | string | `'Product'` |
| currency | string | Valuta narudžbe |
| id | string | ID proizvoda |
| name | string | Naziv stavke |
| quantity | int | Količina stavke |
| unit | string | `'pcs'` |
| unitPrice | float | `(item_total + item_tax) / quantity` (odražava popuste) |
| totalItemPrice | float | `unitPrice * quantity` |

**Napomena o prihodu:** Događaj `purchase` koristi puni ukupni iznos narudžbe (uključujući dostavu), dok `initiateCheckout` koristi samo međuzbroj + porez (dostava možda nije izračunata na početku naplate).

---

### setEncryptedEmail

**Okidač:** Stranica zahvale (hook `woocommerce_thankyou`)

**bp() poziv:** `bp('identify', 'setEncryptedEmail', email)`

E-mail za naplatu se pretvara u mala slova prije slanja. Barionov `bp.js` automatski obrađuje SHA1 hashiranje — dodatak šalje adresu e-pošte u tekstualnom obliku, a ne hash.

Pokreće se samo kada narudžba ima adresu e-pošte za naplatu.

---

## Neimplementirani događaji

| Događaj | Razlog |
|---------|--------|
| `customEvent` | Nije potreban za standardno praćenje e-trgovine |
| `initiatePayment` | Barion dokumentacija kaže implementiraj `purchase` ILI `initiatePayment` — koristimo `purchase` |
| `setPhoneNumber` | Neobavezno; broj telefona nije pouzdano dostupan u svim WooCommerce tokovima |
| `search` | Neobavezno; nije dio obveznog skupa događaja |
