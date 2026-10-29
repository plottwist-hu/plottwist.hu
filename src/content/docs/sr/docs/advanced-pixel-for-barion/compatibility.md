---
title: "Kompatibilnost dodatka"
sidebar:
  order: 3
---

:::note
Ovo je automatski prevod. Ispravke zajednice su dobrodošle! [Pošaljite ispravku na GitHubu](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/sr/compatibility.md)
:::

## WooCommerce

**Potreban za potpuno praćenje događaja.** Osnovni piksel radi bez WooCommerce-a, ali svi događaji e-trgovine (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail) zahtevaju WooCommerce.

| Verzija | Status |
|---------|--------|
| WooCommerce 5.0+ | Podržano |
| WooCommerce 9.6 | Testirano |

---

## Barion Payment Gateway (woocommerce-barion)

Dodatak [Barion Payment Gateway](https://github.com/szelpe/woocommerce-barion) od szelpe je **isključivo procesor plaćanja** — dodaje Barion kao način plaćanja pri završetku porudžbine u WooCommerce-u. Ne implementira praćenje Barion Pixel događaja.

**Koegzistencija:** Oba dodatka rade zajedno bez konflikta. Advanced Pixel for Barion dodatak upravlja praćenjem; platni prolaz upravlja plaćanjima.

**Preklapanje Pixel ID-a:** Platni prolaz ima opcionalno polje za Pixel ID za učitavanje osnovnog piksela. Ako oba dodatka imaju konfigurisan Pixel ID:

- Advanced Pixel for Barion otkriva da li je `bp.js` već učitan i preskače ponovno učitavanje skripte
- Informativno obaveštenje u administraciji predlaže konsolidaciju konfiguracije Pixel ID-a na jedno mesto
- Oba dodatka nastavljaju ispravno da funkcionišu bez obzira na to

**Preporuka:** Ako koristiš oba dodatka, konfigurišu Pixel ID samo u podešavanjima Advanced Pixel for Barion i ostavi ga praznog u podešavanjima platnog prolaza.

---

## Dodaci za keširanje stranica

Dodatak je potpuno kompatibilan sa keširanjem stranica:

| Događaj | Implementacija | Uticaj keširanja |
|---------|---------------|-----------------|
| contentView | Na strani servera (stranica proizvoda) | Stranice proizvoda se obično ne keširaju ili variraju po proizvodu |
| addToCart | **JavaScript na strani klijenta** | Bez problema sa keširanjem — JS se izvršava u pregledaču |
| initiateCheckout | Na strani servera (stranica za završetak porudžbine) | Završetak porudžbine se ne kešira (sadrži podatke korisničke sesije) |
| purchase | Na strani servera (stranica zahvalnice) | Stranice zahvalnice se ne keširaju (jedinstvene po porudžbini) |

Događaj addToCart je specifično implementiran na strani klijenta (umesto korišćenja PHP sesija) da bi radio sa WordPress.com hostingom i agresivnim podešavanjima keširanja stranica.

**Kompatibilno sa:** WP Super Cache, W3 Total Cache, LiteSpeed Cache, WordPress.com hosting, Cloudflare i sličnim rešenjima za keširanje.

---

## Dodaci za saglasnost za kolačiće

Dodatak podržava sve dodatke za saglasnost za kolačiće koji implementiraju [WP Consent API](https://wordpress.org/plugins/wp-consent-api/). Pogledaj [Integracija saglasnosti za kolačiće](../cookie-consent/) za detalje.

**Automatski podržano:**

- CookieYes (1,5M+ instalacija)
- Complianz (1M+ instalacija)
- Cookie Notice by dFactory (1M+ instalacija)
- GDPR Cookie Compliance by Moove (300K+ instalacija)
- Real Cookie Banner (100K+ instalacija)

**Direktna rezervna integracija:**

- Cookie Law Info / CookieYes (radi i bez WP Consent API)

---

## Verzija WordPress-a

| Verzija | Status |
|---------|--------|
| WordPress 5.0+ | Potrebno |
| WordPress 6.7 | Testirano |

## Verzija PHP-a

| Verzija | Status |
|---------|--------|
| PHP 7.2+ | Potrebno |
| PHP 8.x | Kompatibilno |
