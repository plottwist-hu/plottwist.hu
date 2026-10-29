---
title: "Kompatibilnost dodatka"
sidebar:
  order: 3
---

:::note
Ovo je automatski prijevod. Ispravci zajednice su dobrodošli! [Pošaljite ispravak na GitHubu](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/hr/compatibility.md)
:::

## WooCommerce

**Obvezno za potpuno praćenje događaja.** Osnovni pixel radi bez WooCommercea, ali svi e-trgovinski događaji (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail) zahtijevaju WooCommerce.

| Verzija | Status |
|---------|--------|
| WooCommerce 5.0+ | Podržano |
| WooCommerce 9.6 | Testirano |

---

## Barion Payment Gateway (woocommerce-barion)

Dodatak [Barion Payment Gateway](https://github.com/szelpe/woocommerce-barion) od szelpe je **isključivo procesor plaćanja** — dodaje Barion kao način plaćanja u WooCommerce blagajnu. Ne implementira praćenje Barion Pixel događaja.

**Supostojanje:** Oba dodatka rade zajedno bez konflikta. Advanced Pixel for Barion dodatak obrađuje praćenje; platni pristupnik obrađuje plaćanja.

**Preklapanje Pixel ID-a:** Platni pristupnik ima neobavezno polje Pixel ID za učitavanje osnovnog pixela. Ako oba dodatka imaju konfiguriran Pixel ID:

- Advanced Pixel for Barion otkriva je li `bp.js` već učitan i preskače ponovno učitavanje skripte
- Informativna administratorska obavijest predlaže konsolidaciju konfiguracije Pixel ID-a na jedno mjesto
- Oba dodatka nastavljaju ispravno funkcionirati bez obzira na to

**Preporuka:** Ako koristiš oba dodatka, konfiguriraj Pixel ID samo u postavkama Advanced Pixel for Barion i ostavi ga praznim u postavkama platnog pristupnika.

---

## Dodaci za predmemoriranje stranica

Dodatak je potpuno kompatibilan s predmemoriranjem stranica:

| Događaj | Implementacija | Utjecaj predmemoriranja |
|---------|---------------|------------------------|
| contentView | Na strani poslužitelja (stranica proizvoda) | Stranice proizvoda obično nisu predmemorirane ili variraju prema proizvodu |
| addToCart | **JavaScript na strani klijenta** | Nema problema s predmemoriranjem — JS se pokreće u pregledniku |
| initiateCheckout | Na strani poslužitelja (stranica naplate) | Naplata nije predmemorirana (sadrži podatke korisničke sesije) |
| purchase | Na strani poslužitelja (stranica zahvale) | Stranice zahvale nisu predmemorirane (jedinstvene po narudžbi) |

Događaj addToCart je posebno implementiran na strani klijenta (umjesto korištenja PHP sesija) kako bi radio s WordPress.com hostingom i agresivnim postavkama predmemoriranja stranica.

**Kompatibilno s:** WP Super Cache, W3 Total Cache, LiteSpeed Cache, WordPress.com hosting, Cloudflare i sličnim rješenjima za predmemoriranje.

---

## Dodaci za pristanak na kolačiće

Dodatak podržava sve dodatke za pristanak na kolačiće koji implementiraju [WP Consent API](https://wordpress.org/plugins/wp-consent-api/). Pogledaj [Integracija pristanka na kolačiće](../cookie-consent/) za detalje.

**Automatski podržano:**

- CookieYes (1,5M+ instalacija)
- Complianz (1M+ instalacija)
- Cookie Notice od dFactory (1M+ instalacija)
- GDPR Cookie Compliance od Moove (300K+ instalacija)
- Real Cookie Banner (100K+ instalacija)

**Izravna rezervna integracija:**

- Cookie Law Info / CookieYes (radi i bez WP Consent API-ja)

---

## Verzija WordPressa

| Verzija | Status |
|---------|--------|
| WordPress 5.0+ | Obvezno |
| WordPress 6.7 | Testirano |

## Verzija PHP-a

| Verzija | Status |
|---------|--------|
| PHP 7.2+ | Obvezno |
| PHP 8.x | Kompatibilno |
