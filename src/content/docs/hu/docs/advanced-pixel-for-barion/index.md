---
title: "Advanced Pixel for Barion"
sidebar:
  order: 0
  label: "Áttekintés"
---

:::note
Ez egy automatikus fordítás. Közösségi javítások szívesen fogadottak! [Javítás beküldése a GitHubon](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/README.hu.md)
:::

Barion Pixel integráció WooCommerce-hez teljes e-kereskedelmi eseménykövetéssel, cookie-hozzájárulás támogatással és WP Consent API kompatibilitással.

## Funkciók

- **Alap Barion Pixel**: Betölti a Barion követési szkriptet az egész webhelyen (pageView automatikusan aktiválódik)
- **Teljes eseménykövetés**: Minden kötelező e-kereskedelmi esemény a Barion dokumentációja szerint
  - `contentView`: Termékoldalakon aktiválódik
  - `addToCart`: Kosárba helyezéskor aktiválódik (kliensoldalon, oldal gyorsítótárazással kompatibilis)
  - `initiateCheckout`: A pénztár megkezdésekor aktiválódik
  - `purchase`: Sikeres rendelés teljesítésekor aktiválódik (duplikáció-védelemmel)
  - `setEncryptedEmail`: Elküld a számlázási e-mail-t a Barionnak vásárláskor (a bp.js titkosítja)
- **WP Consent API integráció**: Univerzális cookie-hozzájárulás támogatás — működik CookieYes, Complianz, Real Cookie Banner, GDPR Cookie Compliance, Cookie Notice és más bővítményekkel
- **Cookie Law Info tartalék**: Közvetlen integráció CookieYes/Cookie Law Info-t használó oldalakhoz
- **Adminisztrációs beállítások panel**: Egyszerű konfiguráció a WordPress adminisztrációs felületen keresztül
- **Hibakeresési mód**: Konzolnaplózás teszteléshez és fejlesztéshez
- **bp.js dupla betöltés észlelése**: Biztonságosan együttműködik más bővítményekkel, amelyek betöltik a bp.js fájlt (pl. Barion Payment Gateway)

## Telepítés

1. Töltsd fel a `advanced-pixel-for-barion` mappát a `/wp-content/plugins/` könyvtárba
2. Aktiváld a bővítményt a WordPress 'Bővítmények' menüjén keresztül
3. Navigálj a Beállítások > Barion Pixel menüponthoz a konfiguráláshoz

## Konfiguráció

### Adminisztrációs beállítások

A beállítások oldalt a WordPress adminisztrációs felületen a **Beállítások > Barion Pixel** menüpont alatt éred el.

#### Pixel azonosító (kötelező)

Add meg a Barion Pixel azonosítódat (formátum: `BP-0000000000-00`). Az Alap Pixel minden oldalon betöltődik, amint ez be van állítva.

#### Teljes Pixel követés engedélyezése

Kapcsold be/ki az e-kereskedelmi eseménykövetést. Kikapcsolt állapotban csak az Alap Pixel töltődik be (pageView a csalás megelőzéséhez).

#### Hibakeresési mód

Engedélyezd, hogy az összes Barion Pixel esemény naplózódjon a böngésző konzolba tesztelés céljából.

## Kompatibilitás

- **WooCommerce**: A teljes eseménykövetéshez szükséges (az alap pixel nélküle is működik)
- **Barion Payment Gateway** ([woocommerce-barion](https://github.com/szelpe/woocommerce-barion)): Tökéletesen együttműködik — az a bővítmény a fizetéseket kezeli, ez a pixel követést
- **Oldal gyorsítótárazás**: Teljesen kompatibilis (az addToCart kliensoldalú JS-t használ)
- **Cookie bővítmények**: Bármely WP Consent API kompatibilis bővítmény automatikusan működik

## Követelmények

- WordPress 5.0 vagy újabb
- PHP 7.2 vagy újabb
- WooCommerce 5.0+ (a teljes eseménykövetéshez)
- Opcionális: [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) az univerzális cookie-hozzájárulás támogatáshoz

## Licenc

GPL-2.0-or-later — részletekért lásd a [LICENSE](https://github.com/gcsecsey/advanced-pixel-for-barion/blob/main/LICENSE) fájlt.

## Változásnapló

### 1.0.0
- Első kiadás
- Alap Barion Pixel (pageView) implementáció
- Teljes eseménykövetés (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail)
- WP Consent API integráció
- Cookie Law Info tartalék integráció
- Adminisztrációs beállítások panel hibakeresési móddal
- Kliensoldalú addToCart (kompatibilis az oldal gyorsítótárazással)
- Változó termék támogatás
- Dupla vásárlás megelőzés
- bp.js dupla betöltés észlelése
