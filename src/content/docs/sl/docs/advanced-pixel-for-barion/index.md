---
title: "Advanced Pixel for Barion"
sidebar:
  order: 0
  label: "Pregled"
---

:::note
To je samodejni prevod. Popravki skupnosti so dobrodošli! [Pošljite popravek na GitHubu](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/README.sl.md)
:::

Integracija Barion Pixel za WooCommerce s popolnim sledenjem dogodkov e-trgovine, podporo za soglasje s piškotki in združljivostjo z WP Consent API.

## Funkcionalnosti

- **Osnovni Barion Pixel**: Naloži skript za sledenje Barion po celotnem spletnem mestu (pageView se sproži samodejno)
- **Popolno sledenje dogodkov**: Vsi obvezni dogodki e-trgovine po dokumentaciji Barion
  - `contentView`: Sproži se na straneh posameznih izdelkov
  - `addToCart`: Sproži se, ko so izdelki dodani v košarico (na strani odjemalca, deluje z medpomnjenjem strani)
  - `initiateCheckout`: Sproži se, ko se začne nakup
  - `purchase`: Sproži se ob uspešnem zaključku naročila (s preprečevanjem podvajanja)
  - `setEncryptedEmail`: Pošlje e-poštni naslov za zaračunavanje Barionu ob nakupu (šifrira bp.js)
- **Integracija WP Consent API**: Univerzalna podpora za soglasje s piškotki — deluje s CookieYes, Complianz, Real Cookie Banner, GDPR Cookie Compliance, Cookie Notice in drugimi
- **Nadomestna integracija Cookie Law Info**: Neposredna integracija za spletna mesta, ki uporabljajo CookieYes/Cookie Law Info
- **Skrbniška plošča z nastavitvami**: Enostavna konfiguracija prek skrbniškega vmesnika WordPress
- **Način za odpravljanje napak**: Beleženje v konzolo za testiranje in razvoj
- **Zaznavanje dvojnega nalaganja bp.js**: Varno sobivanje z drugimi vtičniki, ki nalagajo bp.js (npr. Barion Payment Gateway)

## Namestitev

1. Naloži mapo `advanced-pixel-for-barion` v `/wp-content/plugins/`
2. Aktiviraj vtičnik prek menija 'Vtičniki' v WordPress
3. Pojdi na Nastavitve > Barion Pixel za konfiguracijo

## Konfiguracija

### Skrbniške nastavitve

Do strani z nastavitvami dostopi pri **Nastavitve > Barion Pixel** v skrbniškem vmesniku WordPress.

#### ID piksla (obvezno)
Vnesi svoj Barion Pixel ID (oblika: `BP-0000000000-00`). Osnovni piksel se bo naložil na vseh straneh, ko je to nastavljeno.

#### Omogoči popolno sledenje piksla
Preklopi za omogočanje/onemogočanje sledenja dogodkov e-trgovine. Ko je onemogočeno, se naloži samo osnovni piksel (pageView za preprečevanje goljufij).

#### Način za odpravljanje napak
Omogoči za beleženje vseh dogodkov Barion Pixel v konzolo brskalnika za testiranje.

## Združljivost

- **WooCommerce**: Potreben za popolno sledenje dogodkov (osnovni piksel deluje brez njega)
- **Barion Payment Gateway** ([woocommerce-barion](https://github.com/szelpe/woocommerce-barion)): Brezkonfliktno sobivanje — ta vtičnik obravnava plačila, ta pa sledenje piksla
- **Medpomnjenje strani**: Popolnoma združljivo (addToCart uporablja JavaScript na strani odjemalca)
- **Vtičniki za piškotke**: Vsi vtičniki, združljivi z WP Consent API, delujejo samodejno

## Zahteve

- WordPress 5.0 ali novejši
- PHP 7.2 ali novejši
- WooCommerce 5.0+ (za popolno sledenje dogodkov)
- Izbirno: [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) za univerzalno podporo soglasja s piškotki

## Licenca

GPL-2.0-or-later — glejte [LICENSE](https://github.com/gcsecsey/advanced-pixel-for-barion/blob/main/LICENSE) za podrobnosti.

## Dnevnik sprememb

### 1.0.0
- Začetna izdaja
- Implementacija osnovnega Barion Pixel (pageView)
- Popolno sledenje dogodkov (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail)
- Integracija WP Consent API
- Nadomestna integracija Cookie Law Info
- Skrbniška plošča z nastavitvami in načinom za odpravljanje napak
- addToCart na strani odjemalca (združljivo z medpomnjenjem strani)
- Podpora za spremenljive izdelke
- Preprečevanje podvajanja nakupov
- Zaznavanje dvojnega nalaganja bp.js
