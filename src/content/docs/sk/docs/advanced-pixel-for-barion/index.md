---
title: "Advanced Pixel for Barion"
sidebar:
  order: 0
  label: "Prehľad"
---

:::note
Toto je automatický preklad. Komunitné opravy sú vítané! [Odoslať opravu na GitHube](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/README.sk.md)
:::

Integrácia Barion Pixel pre WooCommerce s kompletným sledovaním e-commerce udalostí, podporou súhlasu s cookies a kompatibilitou s WP Consent API.

## Funkcie

- **Základný Barion Pixel**: Načíta sledovací skript Barion na celom webe (pageView sa spúšťa automaticky)
- **Úplné sledovanie udalostí**: Všetky povinné e-commerce udalosti podľa dokumentácie Barion
  - `contentView`: Spúšťa sa na stránkach produktov
  - `addToCart`: Spúšťa sa pri pridaní položiek do košíka (na strane klienta, funguje s ukladaním stránok do cache)
  - `initiateCheckout`: Spúšťa sa pri začatí pokladne
  - `purchase`: Spúšťa sa pri úspešnom dokončení objednávky (s prevenciou duplicít)
  - `setEncryptedEmail`: Posiela fakturačný e-mail do Barion pri nákupe (šifrovaný pomocou bp.js)
- **Integrácia WP Consent API**: Univerzálna podpora súhlasu s cookies — funguje s CookieYes, Complianz, Real Cookie Banner, GDPR Cookie Compliance, Cookie Notice a ďalšími
- **Záložná integrácia Cookie Law Info**: Priama integrácia pre weby používajúce CookieYes/Cookie Law Info
- **Panel nastavení administrátora**: Jednoduchá konfigurácia cez správu WordPress
- **Režim ladenia**: Zaznamenávanie do konzoly pre testovanie a vývoj
- **Detekcia dvojitého načítania bp.js**: Bezpečne koexistuje s inými pluginmi, ktoré načítavajú bp.js (napr. Barion Payment Gateway)

## Inštalácia

1. Nahraj priečinok `advanced-pixel-for-barion` do `/wp-content/plugins/`
2. Aktivuj plugin cez ponuku „Pluginy" vo WordPress
3. Prejdi na Nastavenia > Barion Pixel a nakonfiguruj plugin

## Konfigurácia

### Nastavenia administrátora

Prístup k stránke nastavení v **Nastavenia > Barion Pixel** v správe WordPress.

#### Pixel ID (povinné)
Zadaj svoje Barion Pixel ID (formát: `BP-0000000000-00`). Základný Pixel sa načíta na všetkých stránkach po jeho nastavení.

#### Povoliť úplné sledovanie Pixel
Prepnúť na povolenie/zakázanie sledovania e-commerce udalostí. Ak je zakázané, načíta sa iba základný Pixel (pageView na prevenciu podvodov).

#### Režim ladenia
Povolí zaznamenávanie všetkých udalostí Barion Pixel do konzoly prehliadača na účely testovania.

## Kompatibilita

- **WooCommerce**: Vyžaduje sa pre úplné sledovanie udalostí (základný pixel funguje aj bez neho)
- **Barion Payment Gateway** ([woocommerce-barion](https://github.com/szelpe/woocommerce-barion)): Dokonale koexistuje — tento plugin spracúva platby, tento sleduje pixel
- **Ukladanie stránok do cache**: Plne kompatibilné (addToCart používa JavaScript na strane klienta)
- **Pluginy na cookies**: Automaticky funguje každý plugin kompatibilný s WP Consent API

## Požiadavky

- WordPress 5.0 alebo vyšší
- PHP 7.2 alebo vyšší
- WooCommerce 5.0+ (pre úplné sledovanie udalostí)
- Voliteľné: [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) pre univerzálnu podporu súhlasu s cookies

## Licencia

GPL-2.0-or-later — podrobnosti nájdeš v [LICENSE](https://github.com/gcsecsey/advanced-pixel-for-barion/blob/main/LICENSE).

## Zoznam zmien

### 1.0.0
- Prvé vydanie
- Implementácia základného Barion Pixel (pageView)
- Úplné sledovanie udalostí (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail)
- Integrácia WP Consent API
- Záložná integrácia Cookie Law Info
- Panel nastavení administrátora s režimom ladenia
- addToCart na strane klienta (kompatibilné s ukladaním stránok do cache)
- Podpora variabilných produktov
- Prevencia duplicitných nákupov
- Detekcia dvojitého načítania bp.js
