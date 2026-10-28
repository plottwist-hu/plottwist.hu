---
title: "Opombe za testiranje in znane posebnosti"
sidebar:
  order: 4
---

:::note
To je samodejni prevod. Popravki skupnosti so dobrodošli!
:::

## Posebnosti validacije bp.js ob izvajanju

Barionov skript `bp.js` izvaja validacijo podatkov dogodkov na strani odjemalca. V nekaterih primerih se pravila validacije razlikujejo od referenčne dokumentacije Barion API. Te posebnosti so bile odkrite med testiranjem v uprizoritvenem okolju.

### totalItemPrice: zavrnjen za contentView, zahtevan za postavke vsebine

- **contentView** (plosk dogodek): bp.js **zavrne** `totalItemPrice` z napako `Invalid key totalItemPrice in contentView event`, čeprav referenca API navaja, da gre za obvezno polje.
- **initiateCheckout** in postavke `contents` pri **purchase**: bp.js **zahteva** `totalItemPrice` z napako `Mandatory key totalItemPrice is missing from contents event`, če je izpuščen.

**Pravilo palca:** `totalItemPrice` je neveljaven za ploske dogodke, toda zahtevan znotraj postavk niza `contents`.

### unit je zahtevan v postavkah vsebine

bp.js zahteva `unit` v postavkah niza `contents` za `initiateCheckout` in `purchase`. Izpustitev povzroči: `Mandatory key unit is missing from contents event`.

### step je zahtevan za dogodke blagajne

Polje `step` je obvezno za `addToCart`, `initiateCheckout` in `purchase`. Dokumentacija Barion priporoča uporabo `1` za blagajne z enim korakom.

---

## Način za odpravljanje napak

Omogočite način za odpravljanje napak v **Nastavitve > Barion Pixel**, da beležite vse dogodke Barion Pixel v konzolo brskalnika.

### Kaj iskati

Odprite konzolo brskalnika (F12 > Konzola) in poiščite sporočila s predpono `[Barion Pixel]`:

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

### Napake bp.js

bp.js beleži svoje validacijske napake s številčno predpono. Pogoste napake:

| Napaka | Pomen | Rešitev |
|--------|-------|---------|
| `Mandatory key X is missing from Y event` | Obvezno polje ni poslano | Preverite podatke dogodka |
| `Invalid key X in Y event` | Polje se pošilja, ki ga bp.js ne pričakuje | Odstranite polje |

---

## Kontrolni seznam testiranja

### Stran izdelka (contentView)

1. Pojdite na katero koli stran posameznega izdelka
2. Odprite konzolo brskalnika
3. Preverite, da se pojavi `[Barion Pixel] Event: contentView`
4. Preverite, da ni sporočil o napakah bp.js glede manjkajočih/neveljavnih ključev
5. Preverite, da polja vključujejo: `contentType`, `currency`, `id`, `name`, `quantity`, `unit`, `unitPrice`

### Dodajanje v košarico (addToCart)

**S strani trgovine/arhiva (AJAX):**

1. Pojdite na stran trgovine
2. Odprite konzolo brskalnika
3. Kliknite "Dodaj v košarico" pri katerem koli izdelku
4. Preverite, da se pojavi `[Barion Pixel] Event: addToCart`
5. Preverite, da polja vključujejo `totalItemPrice` in `step: 1`

**S strani posameznega izdelka (oddaja obrazca):**

1. Pojdite na stran posameznega izdelka
2. Odprite konzolo brskalnika
3. Kliknite "Dodaj v košarico"
4. Preverite, da se `[Barion Pixel] Event: addToCart` sproži pred navigacijo strani
5. Za spremenljive izdelke: najprej izberite variacijo in preverite, da se uporabi cena variacije

### Stran blagajne (initiateCheckout)

1. Dodajte postavke v košarico in pojdite na blagajno
2. Odprite konzolo brskalnika
3. Preverite, da se pojavi `[Barion Pixel] Event: initiateCheckout`
4. Preverite, da ima niz `contents` pravilne postavke z `unit`, `unitPrice`, `totalItemPrice`
5. Preverite, da je `revenue` vmesna vsota + davek (brez poštnine)
6. Preverite, da je prisoten `step: 1`

### Zaključek naročila (purchase + setEncryptedEmail)

1. Zaključite testno naročilo (za enostavno testiranje uporabite način plačila "Bančno nakazilo")
2. Na strani zahvale odprite konzolo brskalnika
3. Preverite, da se pojavi `[Barion Pixel] Event: purchase` z `revenue`, ki se ujema s skupno vrednostjo naročila
4. Preverite, da se pojavi `[Barion Pixel] setEncryptedEmail sent`
5. Osvežite stran zahvale — preverite, da se `purchase` NE sproži znova (preprečevanje podvajanja)
6. Preverite, da postavke `contents` vključujejo `unit`, `totalItemPrice`

### Integracija soglasja

1. Počistite vse piškotke
2. Pojdite na katero koli stran
3. Preverite, da se pojavi `[Barion Pixel] Base pixel initialized` (osnovni piksel se vedno naloži)
4. Sprejmite piškotke prek vaše pasice za piškotke
5. Preverite, da se pojavi `[Barion Pixel] Consent granted`
6. Znova naložite stran — preverite, da se soglasje samodejno odobri ob nalaganju (vračajoči se obiskovalec)

---

## Pogoste težave

### Dogodki se ne sprožijo

- **Preverite ID piksla**: Zagotovite, da je v Nastavitve > Barion Pixel konfiguriran veljaven ID piksla
- **Preverite popolno sledenje**: Dogodki zahtevajo, da je označeno "Omogoči popolno sledenje piksla"
- **Preverite WooCommerce**: Popolno sledenje zahteva aktiven WooCommerce
- **Preverite napake konzole**: Poiščite napake JavaScript, ki bi lahko preprečile nalaganje bp.js

### Dvojno nalaganje piksla

Če vidite `[Barion Pixel] bp.js already loaded by another plugin`, je drug vtičnik (verjetno Barion Payment Gateway) že naložil bp.js. To je neškodljivo — vtičnik preskoči ponovno nalaganje in se vseeno inicializira z vašim ID piksla.

### Soglasje se ne odobri

- **WP Consent API**: Zagotovite, da je vtičnik WP Consent API nameščen in da ga vaš vtičnik za piškotke podpira
- **Cookie Law Info**: Zagotovite, da je vtičnik aktiven in da je globalni objekt `CLI` na voljo
- **Ročno**: Pokličite `window.wcBarionGrantConsent()` iz povratnega klica vašega upravljavca soglasja
