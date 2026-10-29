---
title: "Advanced Pixel for Barion"
sidebar:
  order: 0
  label: "Pregled"
---

:::note
Ovo je automatski prevod. Ispravke zajednice su dobrodošle! [Pošaljite ispravku na GitHubu](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/README.sr.md)
:::

Integracija Barion Pixel za WooCommerce sa potpunim praćenjem događaja e-trgovine, podrškom za saglasnost za kolačiće i kompatibilnošću sa WP Consent API.

## Funkcionalnosti

- **Osnovni Barion Pixel**: Učitava skriptu za praćenje na celom sajtu (pageView se aktivira automatski)
- **Potpuno praćenje događaja**: Svi obavezni događaji e-trgovine prema Barion dokumentaciji
  - `contentView`: Aktivira se na stranicama proizvoda
  - `addToCart`: Aktivira se kada se stavke dodaju u korpu (na strani klijenta, radi sa keširanjem stranice)
  - `initiateCheckout`: Aktivira se kada počne završetak porudžbine
  - `purchase`: Aktivira se pri uspešnom završetku porudžbine (sa sprečavanjem duplikata)
  - `setEncryptedEmail`: Šalje adresu za naplatu Barionu pri kupovini (enkriptovano putem bp.js)
- **Integracija WP Consent API**: Univerzalna podrška za saglasnost za kolačiće — radi sa CookieYes, Complianz, Real Cookie Banner, GDPR Cookie Compliance, Cookie Notice i više
- **Rezervna integracija Cookie Law Info**: Direktna integracija za sajtove koji koriste CookieYes/Cookie Law Info
- **Panel za podešavanja u administraciji**: Jednostavna konfiguracija kroz WordPress administraciju
- **Režim za otklanjanje grešaka**: Beleženje u konzoli za testiranje i razvoj
- **Detekcija dvostrukog učitavanja bp.js**: Bezbedno koegzistira sa drugim dodacima koji učitavaju bp.js (npr. Barion Payment Gateway)

## Instalacija

1. Otpremi fasciklu `advanced-pixel-for-barion` u `/wp-content/plugins/`
2. Aktiviraj dodatak kroz meni 'Dodaci' u WordPress-u
3. Idi na Podešavanja > Barion Pixel da konfigurišeš

## Konfiguracija

### Podešavanja u administraciji

Pristupi stranici podešavanja na **Podešavanja > Barion Pixel** u WordPress administraciji.

#### ID piksela (obavezno)
Unesi svoj Barion Pixel ID (format: `BP-0000000000-00`). Osnovni piksel će se učitati na svim stranicama kada ovo budeš podesio.

#### Omogući potpuno praćenje piksela
Uključi/isključi praćenje događaja e-trgovine. Kada je onemogućeno, učitava se samo Osnovni piksel (pageView za sprečavanje prevara).

#### Režim za otklanjanje grešaka
Omogući da se svi Barion Pixel događaji beležu u konzolu pregledača radi testiranja.

## Kompatibilnost

- **WooCommerce**: Potreban za potpuno praćenje događaja (osnovni piksel radi bez njega)
- **Barion Payment Gateway** ([woocommerce-barion](https://github.com/szelpe/woocommerce-barion)): Savršeno koegzistira — taj dodatak upravlja plaćanjima, ovaj upravlja praćenjem pikselom
- **Keširanje stranica**: Potpuno kompatibilno (addToCart koristi JavaScript na strani klijenta)
- **Dodaci za kolačiće**: Bilo koji dodatak kompatibilan sa WP Consent API radi automatski

## Zahtevi

- WordPress 5.0 ili noviji
- PHP 7.2 ili noviji
- WooCommerce 5.0+ (za potpuno praćenje događaja)
- Opcionalno: [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) za univerzalnu podršku saglasnosti za kolačiće

## Licenca

GPL-2.0-or-later — pogledaj [LICENSE](https://github.com/gcsecsey/advanced-pixel-for-barion/blob/main/LICENSE) za detalje.

## Evidencija promena

### 1.0.0
- Početno izdanje
- Implementacija osnovnog Barion Pixel (pageView)
- Potpuno praćenje događaja (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail)
- Integracija WP Consent API
- Rezervna integracija Cookie Law Info
- Panel za podešavanja u administraciji sa režimom za otklanjanje grešaka
- addToCart na strani klijenta (kompatibilno sa keširanjem stranice)
- Podrška za varijabilne proizvode
- Sprečavanje duplih kupovina
- Detekcija dvostrukog učitavanja bp.js
