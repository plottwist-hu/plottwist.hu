---
title: "Bővítmény kompatibilitás"
sidebar:
  order: 3
---

:::note
Ez egy automatikus fordítás. Közösségi javítások szívesen fogadottak!
:::

## WooCommerce

**A teljes eseménykövetéshez szükséges.** Az alap pixel WooCommerce nélkül is működik, de minden e-kereskedelmi esemény (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail) WooCommerce-t igényel.

| Verzió | Állapot |
|--------|---------|
| WooCommerce 5.0+ | Támogatott |
| WooCommerce 9.6 | Tesztelve |

---

## Barion Payment Gateway (woocommerce-barion)

A szelpe által fejlesztett [Barion Payment Gateway](https://github.com/szelpe/woocommerce-barion) bővítmény **kizárólag fizetési feldolgozó** — a Barion-t fizetési módként adja hozzá a WooCommerce pénztárhoz. Nem valósítja meg a Barion Pixel eseménykövetést.

**Együttélés:** Mindkét bővítmény ütközés nélkül működik együtt. A Advanced Pixel for Barion bővítmény kezeli a követést; a fizetési átjáró kezeli a fizetéseket.

**Pixel azonosító átfedés:** A fizetési átjáróban van egy opcionális Pixel azonosító mező az alap pixel betöltéséhez. Ha mindkét bővítményben be van állítva a Pixel azonosító:

- A Advanced Pixel for Barion észleli, ha a `bp.js` már betöltődött, és kihagyja a szkript újratöltését
- Egy tájékoztató adminisztrációs értesítés javasolja a Pixel azonosító konfigurációjának egy helyre konszolidálását
- Mindkét bővítmény helyesen működik tovább ettől függetlenül

**Javaslat:** Ha mindkét bővítményt használod, csak a Advanced Pixel for Barion beállításaiban állítsd be a Pixel azonosítót, és hagyd üresen a fizetési átjáró beállításaiban.

---

## Oldal gyorsítótárazó bővítmények

A bővítmény teljesen kompatibilis az oldal gyorsítótárazással:

| Esemény | Megvalósítás | Gyorsítótárazás hatása |
|---------|--------------|------------------------|
| contentView | Szerveroldali (termékoldal) | A termékoldalak jellemzően nem kerülnek gyorsítótárba, vagy termékenként eltérőek |
| addToCart | **Kliensoldalú JavaScript** | Nincsenek gyorsítótárazási problémák — a JS a böngészőben aktiválódik |
| initiateCheckout | Szerveroldali (pénztár oldal) | A pénztár nem kerül gyorsítótárba (felhasználói munkamenet adatokat tartalmaz) |
| purchase | Szerveroldali (köszönő oldal) | A köszönő oldalak nem kerülnek gyorsítótárba (rendelésenként egyediek) |

Az addToCart esemény kifejezetten kliensoldalon lett megvalósítva (PHP munkamenetek helyett), hogy működjön WordPress.com tárhelyen és agresszív oldal gyorsítótárazási beállítások esetén is.

**Kompatibilis:** WP Super Cache, W3 Total Cache, LiteSpeed Cache, WordPress.com tárhely, Cloudflare és hasonló gyorsítótárazási megoldásokkal.

---

## Cookie hozzájárulás bővítmények

A bővítmény támogatja az összes cookie hozzájárulás bővítményt, amelyek megvalósítják a [WP Consent API](https://wordpress.org/plugins/wp-consent-api/)-t. Részletekért lásd a [Cookie-hozzájárulás integráció](../cookie-consent/) dokumentumot.

**Automatikusan támogatott:**

- CookieYes (1,5M+ telepítés)
- Complianz (1M+ telepítés)
- Cookie Notice by dFactory (1M+ telepítés)
- GDPR Cookie Compliance by Moove (300K+ telepítés)
- Real Cookie Banner (100K+ telepítés)

**Közvetlen tartalék integráció:**

- Cookie Law Info / CookieYes (WP Consent API nélkül is működik)

---

## WordPress verzió

| Verzió | Állapot |
|--------|---------|
| WordPress 5.0+ | Szükséges |
| WordPress 6.7 | Tesztelve |

## PHP verzió

| Verzió | Állapot |
|--------|---------|
| PHP 7.2+ | Szükséges |
| PHP 8.x | Kompatibilis |
