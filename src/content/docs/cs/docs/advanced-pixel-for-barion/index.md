---
title: "Advanced Pixel for Barion"
sidebar:
  order: 0
  label: "Přehled"
---

:::note
Toto je automatický překlad. Komunitní opravy jsou vítány! [Odeslat opravu na GitHubu](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/README.cs.md)
:::

Integrace Barion Pixel pro WooCommerce s kompletním sledováním e-commerce událostí, podporou souhlasu s cookies a kompatibilitou s WP Consent API.

## Funkce

- **Základní Barion Pixel**: Načítá sledovací skript Barion na celém webu (pageView se spouští automaticky)
- **Kompletní sledování událostí**: Všechny povinné e-commerce události dle dokumentace Barion
  - `contentView`: Spouští se na stránkách produktů
  - `addToCart`: Spouští se při přidání zboží do košíku (na straně klienta, funguje s ukládáním stránek do mezipaměti)
  - `initiateCheckout`: Spouští se při zahájení pokladny
  - `purchase`: Spouští se při úspěšném dokončení objednávky (s ochranou proti duplicitám)
  - `setEncryptedEmail`: Odesílá fakturační e-mail do Barion při nákupu (zašifrovaný pomocí bp.js)
- **Integrace WP Consent API**: Univerzální podpora souhlasu s cookies — funguje s CookieYes, Complianz, Real Cookie Banner, GDPR Cookie Compliance, Cookie Notice a dalšími
- **Záložní integrace Cookie Law Info**: Přímá integrace pro weby používající CookieYes/Cookie Law Info
- **Panel nastavení správce**: Snadná konfigurace přes administraci WordPress
- **Režim ladění**: Protokolování do konzole pro testování a vývoj
- **Detekce dvojitého načtení bp.js**: Bezpečně koexistuje s dalšími pluginy, které načítají bp.js (např. Barion Payment Gateway)

## Instalace

1. Nahrajte složku `advanced-pixel-for-barion` do `/wp-content/plugins/`
2. Aktivujte plugin přes nabídku „Pluginy" ve WordPressu
3. Přejděte do Nastavení > Barion Pixel a nakonfigurujte plugin

## Konfigurace

### Nastavení správce

Přejděte na stránku nastavení v **Nastavení > Barion Pixel** ve správě WordPressu.

#### ID Pixelu (povinné)
Zadejte své Barion Pixel ID (formát: `BP-0000000000-00`). Základní Pixel se načte na všech stránkách, jakmile je toto nastaveno.

#### Povolit kompletní sledování Pixelem
Přepínač pro zapnutí/vypnutí sledování e-commerce událostí. Pokud je vypnuto, načte se pouze základní Pixel (pageView pro prevenci podvodů).

#### Režim ladění
Povolte, abyste zaznamenávali všechny události Barion Pixel do konzole prohlížeče pro testování.

## Kompatibilita

- **WooCommerce**: Vyžadováno pro kompletní sledování událostí (základní pixel funguje i bez něj)
- **Barion Payment Gateway** ([woocommerce-barion](https://github.com/szelpe/woocommerce-barion)): Bezkonfliktní koexistence — tento plugin zpracovává platby, zatímco náš plugin se stará o sledování pixelem
- **Ukládání stránek do mezipaměti**: Plně kompatibilní (addToCart používá JavaScript na straně klienta)
- **Pluginy pro cookies**: Jakýkoli plugin kompatibilní s WP Consent API funguje automaticky

## Požadavky

- WordPress 5.0 nebo vyšší
- PHP 7.2 nebo vyšší
- WooCommerce 5.0+ (pro kompletní sledování událostí)
- Volitelné: [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) pro univerzální podporu souhlasu s cookies

## Licence

GPL-2.0-or-later — viz [LICENSE](https://github.com/gcsecsey/advanced-pixel-for-barion/blob/main/LICENSE) pro podrobnosti.

## Historie změn

### 1.0.0
- První vydání
- Implementace základního Barion Pixelu (pageView)
- Kompletní sledování událostí (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail)
- Integrace WP Consent API
- Záložní integrace Cookie Law Info
- Panel nastavení správce s režimem ladění
- addToCart na straně klienta (kompatibilní s ukládáním stránek do mezipaměti)
- Podpora variabilních produktů
- Ochrana proti duplicitním nákupům
- Detekce dvojitého načtení bp.js
