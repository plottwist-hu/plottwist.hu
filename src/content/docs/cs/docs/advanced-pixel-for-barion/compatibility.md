---
title: "Kompatibilita pluginů"
sidebar:
  order: 3
---

:::note
Toto je automatický překlad. Komunitní opravy jsou vítány! [Odeslat opravu na GitHubu](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/cs/compatibility.md)
:::

## WooCommerce

**Vyžadováno pro kompletní sledování událostí.** Základní pixel funguje bez WooCommerce, ale všechny e-commerce události (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail) vyžadují WooCommerce.

| Verze | Stav |
|-------|------|
| WooCommerce 5.0+ | Podporováno |
| WooCommerce 9.6 | Testováno |

---

## Barion Payment Gateway (woocommerce-barion)

Plugin [Barion Payment Gateway](https://github.com/szelpe/woocommerce-barion) od szelpe je **pouze platební procesor** — přidává Barion jako platební metodu do pokladny WooCommerce. Neimplementuje sledování událostí Barion Pixel.

**Koexistence:** Oba pluginy fungují společně bez konfliktu. Plugin Advanced Pixel for Barion se stará o sledování; platební brána zpracovává platby.

**Překrytí ID Pixelu:** Platební brána obsahuje volitelné pole pro ID Pixelu pro načtení základního pixelu. Pokud mají oba pluginy nakonfigurované ID Pixelu:

- Advanced Pixel for Barion zjistí, zda je `bp.js` již načteno, a přeskočí opětovné načtení skriptu
- Informační upozornění správce navrhuje sloučit konfiguraci ID Pixelu na jedno místo
- Oba pluginy nadále fungují správně bez ohledu na situaci

**Doporučení:** Pokud používáte oba pluginy, nakonfigurujte ID Pixelu pouze v nastavení Advanced Pixel for Barion a v nastavení platební brány ho nechte prázdné.

---

## Pluginy pro ukládání stránek do mezipaměti

Plugin je plně kompatibilní s ukládáním stránek do mezipaměti:

| Událost | Implementace | Dopad mezipaměti |
|---------|-------------|------------------|
| contentView | Na straně serveru (stránka produktu) | Stránky produktů obvykle nejsou ukládány do mezipaměti, nebo se liší podle produktu |
| addToCart | **JavaScript na straně klienta** | Žádné problémy s mezipaměti — JS se spouští v prohlížeči |
| initiateCheckout | Na straně serveru (stránka pokladny) | Pokladna není ukládána do mezipaměti (obsahuje data uživatelské relace) |
| purchase | Na straně serveru (stránka s poděkováním) | Stránky s poděkováním nejsou ukládány do mezipaměti (unikátní pro každou objednávku) |

Událost addToCart byla záměrně implementována na straně klienta (místo použití PHP relací), aby fungovala s hostingem WordPress.com a agresivním ukládáním stránek do mezipaměti.

**Kompatibilní s:** WP Super Cache, W3 Total Cache, LiteSpeed Cache, hostingem WordPress.com, Cloudflare a podobnými řešeními pro ukládání do mezipaměti.

---

## Pluginy pro souhlas s cookies

Plugin podporuje všechny pluginy pro souhlas s cookies, které implementují [WP Consent API](https://wordpress.org/plugins/wp-consent-api/). Viz [Integrace souhlasu s cookies](../cookie-consent/) pro podrobnosti.

**Automaticky podporováno:**

- CookieYes (1,5 M+ instalací)
- Complianz (1 M+ instalací)
- Cookie Notice od dFactory (1 M+ instalací)
- GDPR Cookie Compliance od Moove (300 K+ instalací)
- Real Cookie Banner (100 K+ instalací)

**Přímá záložní integrace:**

- Cookie Law Info / CookieYes (funguje i bez WP Consent API)

---

## Verze WordPressu

| Verze | Stav |
|-------|------|
| WordPress 5.0+ | Vyžadováno |
| WordPress 6.7 | Testováno |

## Verze PHP

| Verze | Stav |
|-------|------|
| PHP 7.2+ | Vyžadováno |
| PHP 8.x | Kompatibilní |
