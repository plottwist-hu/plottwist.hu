---
title: "Združljivost vtičnika"
sidebar:
  order: 3
---

:::note
To je samodejni prevod. Popravki skupnosti so dobrodošli!
:::

## WooCommerce

**Potreben za popolno sledenje dogodkov.** Osnovni piksel deluje brez WooCommerce, toda vsi dogodki e-trgovine (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail) zahtevajo WooCommerce.

| Različica | Status |
|-----------|--------|
| WooCommerce 5.0+ | Podprto |
| WooCommerce 9.6 | Preizkušeno |

---

## Barion Payment Gateway (woocommerce-barion)

Vtičnik [Barion Payment Gateway](https://github.com/szelpe/woocommerce-barion) avtorja szelpe je **samo procesor plačil** — dodaja Barion kot način plačila na WooCommerce blagajno. Ne implementira sledenja dogodkov Barion Pixel.

**Sobivanje:** Oba vtičnika delujeta skupaj brez konfliktov. Vtičnik Advanced Pixel for Barion skrbi za sledenje; plačilni prehod skrbi za plačila.

**Prekrivanje ID piksla:** Plačilni prehod ima izbirno polje za ID piksla za nalaganje osnovnega piksla. Če imata oba vtičnika konfiguriran ID piksla:

- Advanced Pixel for Barion zazna, ali je `bp.js` že naložen, in preskoči ponovno nalaganje skripta
- Informacijsko skrbniško obvestilo predlaga konsolidacijo konfiguracije ID piksla na eno mesto
- Oba vtičnika nadaljujeta pravilno delovanje ne glede na to

**Priporočilo:** Če uporabljate oba vtičnika, konfigurirajte ID piksla samo v nastavitvah Advanced Pixel for Barion in ga pustite praznega v nastavitvah plačilnega prehoda.

---

## Vtičniki za medpomnjenje strani

Vtičnik je popolnoma združljiv z medpomnjenjem strani:

| Dogodek | Implementacija | Vpliv medpomnjenja |
|---------|---------------|-------------------|
| contentView | Strežniška stran (stran izdelka) | Strani izdelkov navadno niso v predpomnilniku ali se razlikujejo glede na izdelek |
| addToCart | **JavaScript na strani odjemalca** | Brez težav z medpomnjenjem — JS se sproži v brskalniku |
| initiateCheckout | Strežniška stran (stran blagajne) | Blagajna ni v predpomnilniku (vsebuje podatke o seji uporabnika) |
| purchase | Strežniška stran (stran zahvale) | Strani zahvale niso v predpomnilniku (edinstvene za vsako naročilo) |

Dogodek addToCart je bil specifično implementiran na strani odjemalca (namesto z uporabo sej PHP) za delovanje z gostovanjem WordPress.com in agresivnimi nastavitvami medpomnjenja strani.

**Združljivo z:** WP Super Cache, W3 Total Cache, LiteSpeed Cache, gostovanjem WordPress.com, Cloudflare in podobnimi rešitvami za medpomnjenje.

---

## Vtičniki za soglasje s piškotki

Vtičnik podpira vse vtičnike za soglasje s piškotki, ki implementirajo [WP Consent API](https://wordpress.org/plugins/wp-consent-api/). Glejte [Integracija soglasja s piškotki](../cookie-consent/) za podrobnosti.

**Samodejno podprto:**

- CookieYes (1,5M+ namestitev)
- Complianz (1M+ namestitev)
- Cookie Notice by dFactory (1M+ namestitev)
- GDPR Cookie Compliance by Moove (300K+ namestitev)
- Real Cookie Banner (100K+ namestitev)

**Neposredna nadomestna integracija:**

- Cookie Law Info / CookieYes (deluje tudi brez WP Consent API)

---

## Različica WordPress

| Različica | Status |
|-----------|--------|
| WordPress 5.0+ | Potrebno |
| WordPress 6.7 | Preizkušeno |

## Različica PHP

| Različica | Status |
|-----------|--------|
| PHP 7.2+ | Potrebno |
| PHP 8.x | Združljivo |
