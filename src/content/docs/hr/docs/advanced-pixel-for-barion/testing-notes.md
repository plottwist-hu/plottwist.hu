---
title: "Napomene za testiranje i poznate posebnosti"
sidebar:
  order: 4
---

:::note
Ovo je automatski prijevod. Ispravci zajednice su dobrodošli!
:::

## Posebnosti validacije bp.js za vrijeme izvođenja

Barionova skripta `bp.js` izvodi validaciju podataka događaja na strani klijenta. U nekim slučajevima, pravila validacije se razlikuju od Barion API referentne dokumentacije. Ove posebnosti su otkrivene tijekom testiranja na staging okruženju.

### totalItemPrice: odbijen za contentView, obvezan za stavke sadržaja

- **contentView** (ravni događaj): bp.js **odbija** `totalItemPrice` s pogreškom `Invalid key totalItemPrice in contentView event`, iako API referenca navodi da je to obvezno polje.
- **initiateCheckout** i **purchase** stavke `contents`: bp.js **zahtijeva** `totalItemPrice` s pogreškom `Mandatory key totalItemPrice is missing from contents event` ako se izostavi.

**Pravilo palca:** `totalItemPrice` nije valjano za ravne događaje, ali je obavezno unutar stavki niza `contents`.

### unit je obavezan u stavkama sadržaja

bp.js zahtijeva `unit` u stavkama niza `contents` za `initiateCheckout` i `purchase`. Ako se izostavi, dobiva se: `Mandatory key unit is missing from contents event`.

### step je obavezan za događaje naplate

Polje `step` je obvezno za `addToCart`, `initiateCheckout` i `purchase`. Barion dokumentacija preporučuje korištenje `1` za jednofazne blagajne.

---

## Način rada za otklanjanje pogrešaka

Omogući način otklanjanja pogrešaka u **Postavke > Barion Pixel** za bilježenje svih Barion Pixel događaja u konzolu preglednika.

### Na što obratiti pažnju

Otvori konzolu preglednika (F12 > Console) i traži poruke s prefiksom `[Barion Pixel]`:

```
[Barion Pixel] bp.js loaded by Advanced Pixel for Barion
[Barion Pixel] Base pixel initialized with ID: BP-xxxxxxxxxxxx-xx
[Barion Pixel] Consent auto-granted via WP Consent API
[Barion Pixel] Event: contentView { contentType: "Product", ... }
[Barion Pixel] Event: addToCart { contentType: "Product", ... }
[Barion Pixel] Event: initiateCheckout { contents: [...], ... }
[Barion Pixel] Event: purchase { contents: [...], ... }
[Barion Pixel] setEncryptedEmail sent
```

### Pogreške bp.js

bp.js bilježi vlastite pogreške validacije s numeričkim prefiksom. Uobičajene:

| Pogreška | Značenje | Rješenje |
|---------|---------|---------|
| `Mandatory key X is missing from Y event` | Obvezno polje se ne šalje | Provjeri podatke događaja |
| `Invalid key X in Y event` | Šalje se polje koje bp.js ne očekuje | Ukloni polje |

---

## Kontrolni popis testiranja

### Stranica proizvoda (contentView)

1. Idi na bilo koju stranicu jednog proizvoda
2. Otvori konzolu preglednika
3. Provjeri pojavljuje li se `[Barion Pixel] Event: contentView`
4. Provjeri nema li bp.js poruka o pogrešci o nedostajućim/nevažećim ključevima
5. Provjeri sadrže li polja: `contentType`, `currency`, `id`, `name`, `quantity`, `unit`, `unitPrice`

### Dodavanje u košaricu (addToCart)

**Sa stranice trgovine/arhive (AJAX):**

1. Idi na stranicu trgovine
2. Otvori konzolu preglednika
3. Klikni "Dodaj u košaricu" na bilo kojem proizvodu
4. Provjeri pojavljuje li se `[Barion Pixel] Event: addToCart`
5. Provjeri sadrže li polja `totalItemPrice` i `step: 1`

**Sa stranice jednog proizvoda (slanje obrasca):**

1. Idi na stranicu jednog proizvoda
2. Otvori konzolu preglednika
3. Klikni "Dodaj u košaricu"
4. Provjeri pokreće li se `[Barion Pixel] Event: addToCart` prije navigacije stranice
5. Za varijabilne proizvode: prvo odaberi varijaciju i provjeri koristi li se cijena te varijacije

### Stranica naplate (initiateCheckout)

1. Dodaj stavke u košaricu i idi na naplatu
2. Otvori konzolu preglednika
3. Provjeri pojavljuje li se `[Barion Pixel] Event: initiateCheckout`
4. Provjeri ima li niz `contents` ispravne stavke s `unit`, `unitPrice`, `totalItemPrice`
5. Provjeri je li `revenue` međuzbroj + porez (bez dostave)
6. Provjeri je li prisutan `step: 1`

### Završetak narudžbe (purchase + setEncryptedEmail)

1. Dovrši testnu narudžbu (koristi način plaćanja "Bankovni transfer" za lakše testiranje)
2. Na stranici zahvale otvori konzolu preglednika
3. Provjeri pojavljuje li se `[Barion Pixel] Event: purchase` s `revenue` koji odgovara ukupnom iznosu narudžbe
4. Provjeri pojavljuje li se `[Barion Pixel] setEncryptedEmail sent`
5. Osvježi stranicu zahvale — provjeri ne pokreće li se `purchase` opet (prevencija dupliciranja)
6. Provjeri sadrže li stavke `contents` `unit`, `totalItemPrice`

### Integracija pristanka

1. Obriši sve kolačiće
2. Idi na bilo koju stranicu
3. Provjeri pojavljuje li se `[Barion Pixel] Base pixel initialized` (osnovni pixel se uvijek učitava)
4. Prihvati kolačiće putem svog bannera za kolačiće
5. Provjeri pojavljuje li se `[Barion Pixel] Consent granted`
6. Osvježi stranicu — provjeri je li pristanak automatski odobren pri učitavanju (povratni posjetitelj)

---

## Česti problemi

### Događaji se ne pokreću

- **Provjeri Pixel ID**: Osiguraj da je valjan Pixel ID konfiguriran u Postavke > Barion Pixel
- **Provjeri potpuno praćenje**: Događaji zahtijevaju da je "Omogući potpuno praćenje Pixelom" označeno
- **Provjeri WooCommerce**: Potpuno praćenje zahtijeva da WooCommerce bude aktivan
- **Provjeri pogreške konzole**: Traži JavaScript pogreške koje bi mogle spriječiti učitavanje bp.js

### Dvostruko učitavanje pixela

Ako vidiš `[Barion Pixel] bp.js already loaded by another plugin`, drugi dodatak (vjerojatno Barion Payment Gateway) već je učitao bp.js. Ovo je bezopasno — dodatak preskače ponovno učitavanje i svejedno se inicijalizira s tvojim Pixel ID-om.

### Pristanak se ne odobrava

- **WP Consent API**: Osiguraj da je dodatak WP Consent API instaliran i da ga tvoj dodatak za kolačiće podržava
- **Cookie Law Info**: Osiguraj da je dodatak aktivan i da je globalni `CLI` dostupan
- **Ručno**: Pozovi `window.wcBarionGrantConsent()` iz povratnog poziva svog upravitelja pristanka
