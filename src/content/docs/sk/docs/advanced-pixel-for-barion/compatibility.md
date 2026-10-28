---
title: "Kompatibilita pluginu"
sidebar:
  order: 3
---

:::note
Toto je automatický preklad. Komunitné opravy sú vítané!
:::

## WooCommerce

**Vyžaduje sa pre úplné sledovanie udalostí.** Základný pixel funguje bez WooCommerce, ale všetky e-commerce udalosti (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail) vyžadujú WooCommerce.

| Verzia | Stav |
|--------|------|
| WooCommerce 5.0+ | Podporovaná |
| WooCommerce 9.6 | Testovaná |

---

## Barion Payment Gateway (woocommerce-barion)

Plugin [Barion Payment Gateway](https://github.com/szelpe/woocommerce-barion) od szelpe je **iba platobný procesor** — pridáva Barion ako platobnú metódu do pokladne WooCommerce. Neimplementuje sledovanie udalostí Barion Pixel.

**Koexistencia:** Oba pluginy fungujú spoločne bez konfliktu. Plugin Advanced Pixel for Barion spracúva sledovanie; platobná brána spracúva platby.

**Prekrývanie Pixel ID:** Platobná brána má voliteľné pole Pixel ID na načítanie základného pixelu. Ak majú oba pluginy nakonfigurované Pixel ID:

- Advanced Pixel for Barion zistí, či je `bp.js` už načítaný, a preskočí opätovné načítanie skriptu
- Informatívne oznámenie v administrácii navrhuje skonsolidovať konfiguráciu Pixel ID na jedno miesto
- Oba pluginy naďalej fungujú správne bez ohľadu na to

**Odporúčanie:** Ak používaš oba pluginy, nakonfiguruj Pixel ID iba v nastaveniach Advanced Pixel for Barion a v nastaveniach platobnej brány ho nechaj prázdne.

---

## Pluginy na ukladanie stránok do cache

Plugin je plne kompatibilný s ukladaním stránok do cache:

| Udalosť | Implementácia | Vplyv cacheovania |
|---------|--------------|-------------------|
| contentView | Na strane servera (stránka produktu) | Stránky produktov sa zvyčajne neukladajú do cache alebo sa líšia podľa produktu |
| addToCart | **JavaScript na strane klienta** | Žiadne problémy s cacheovaním — JS sa spustí v prehliadači |
| initiateCheckout | Na strane servera (stránka pokladne) | Pokladňa nie je uložená v cache (obsahuje údaje o relácii používateľa) |
| purchase | Na strane servera (stránka ďakovania) | Stránky ďakovania nie sú uložené v cache (jedinečné pre každú objednávku) |

Udalosť addToCart bola špecificky implementovaná na strane klienta (namiesto použitia PHP relácií), aby fungovala s hostingom WordPress.com a agresívnymi nastaveniami ukladania stránok do cache.

**Kompatibilné s:** WP Super Cache, W3 Total Cache, LiteSpeed Cache, hostingom WordPress.com, Cloudflare a podobnými riešeniami na ukladanie do cache.

---

## Pluginy na súhlas s cookies

Plugin podporuje všetky pluginy na súhlas s cookies, ktoré implementujú [WP Consent API](https://wordpress.org/plugins/wp-consent-api/). Podrobnosti nájdeš v [Integrácia súhlasu s cookies](../cookie-consent/).

**Automaticky podporované:**

- CookieYes (1,5M+ inštalácií)
- Complianz (1M+ inštalácií)
- Cookie Notice od dFactory (1M+ inštalácií)
- GDPR Cookie Compliance od Moove (300K+ inštalácií)
- Real Cookie Banner (100K+ inštalácií)

**Priama záložná integrácia:**

- Cookie Law Info / CookieYes (funguje aj bez WP Consent API)

---

## Verzia WordPress

| Verzia | Stav |
|--------|------|
| WordPress 5.0+ | Vyžadovaná |
| WordPress 6.7 | Testovaná |

## Verzia PHP

| Verzia | Stav |
|--------|------|
| PHP 7.2+ | Vyžadovaná |
| PHP 8.x | Kompatibilná |
