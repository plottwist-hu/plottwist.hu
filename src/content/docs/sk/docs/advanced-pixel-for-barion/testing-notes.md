---
title: "Poznámky k testovaniu a známe zvláštnosti"
sidebar:
  order: 4
---

:::note
Toto je automatický preklad. Komunitné opravy sú vítané!
:::

## Zvláštnosti validácie bp.js za behu

Skript `bp.js` od Barion vykonáva validáciu údajov udalostí na strane klienta. V niektorých prípadoch sa pravidlá validácie líšia od referenčnej dokumentácie Barion API. Tieto zvláštnosti boli objavené počas testovania na staging prostredí.

### totalItemPrice: odmietnuté pre contentView, povinné pre položky contents

- **contentView** (plochá udalosť): bp.js **odmietne** `totalItemPrice` s chybou `Invalid key totalItemPrice in contentView event`, aj keď referencia API ho uvádza ako povinné pole.
- **initiateCheckout** a **purchase** položky `contents`: bp.js **vyžaduje** `totalItemPrice` s chybou `Mandatory key totalItemPrice is missing from contents event`, ak je vynechané.

**Pravidlo palca:** `totalItemPrice` je neplatné pre ploché udalosti, ale povinné vo vnútri položiek poľa `contents`.

### unit je povinné v položkách contents

bp.js vyžaduje `unit` v položkách poľa `contents` pre `initiateCheckout` a `purchase`. Ak je vynechané, produkuje: `Mandatory key unit is missing from contents event`.

### step je povinné pre udalosti pokladne

Pole `step` je povinné pre `addToCart`, `initiateCheckout` a `purchase`. Dokumentácia Barion odporúča používať `1` pre pokladne s jedným krokom.

---

## Režim ladenia

Povolí režim ladenia v **Nastavenia > Barion Pixel**, aby sa všetky udalosti Barion Pixel zaznamenávali do konzoly prehliadača.

### Na čo sa zamerať

Otvor konzolu prehliadača (F12 > Console) a hľadaj správy s predponou `[Barion Pixel]`:

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

### Chyby bp.js

bp.js zaznamenáva vlastné chyby validácie s numerickým prefixom. Bežné chyby:

| Chyba | Význam | Riešenie |
|-------|--------|---------|
| `Mandatory key X is missing from Y event` | Povinné pole sa neodosiela | Skontroluj údaje udalosti |
| `Invalid key X in Y event` | Pole sa odosiela, ale bp.js ho neočakáva | Odober pole |

---

## Kontrolný zoznam testovania

### Stránka produktu (contentView)

1. Prejdi na ľubovoľnú stránku jedného produktu
2. Otvor konzolu prehliadača
3. Overte, že sa zobrazí `[Barion Pixel] Event: contentView`
4. Overte, že sa nezobrazujú chybové správy bp.js o chýbajúcich/neplatných kľúčoch
5. Skontroluj, či polia zahŕňajú: `contentType`, `currency`, `id`, `name`, `quantity`, `unit`, `unitPrice`

### Pridanie do košíka (addToCart)

**Ze stránky obchodu/archívu (AJAX):**

1. Prejdi na stránku obchodu
2. Otvor konzolu prehliadača
3. Klikni na „Pridať do košíka" pri ľubovoľnom produkte
4. Overte, že sa zobrazí `[Barion Pixel] Event: addToCart`
5. Skontroluj, či polia zahŕňajú `totalItemPrice` a `step: 1`

**Ze stránky jedného produktu (odoslanie formulára):**

1. Prejdi na stránku jedného produktu
2. Otvor konzolu prehliadača
3. Klikni na „Pridať do košíka"
4. Overte, že `[Barion Pixel] Event: addToCart` sa spustí pred navigáciou stránky
5. Pre variabilné produkty: najprv vyber variáciu a overte, že sa použije cena variácie

### Stránka pokladne (initiateCheckout)

1. Pridaj položky do košíka a prejdi na pokladňu
2. Otvor konzolu prehliadača
3. Overte, že sa zobrazí `[Barion Pixel] Event: initiateCheckout`
4. Skontroluj, či pole `contents` obsahuje správne položky s `unit`, `unitPrice`, `totalItemPrice`
5. Skontroluj, či `revenue` je medzisúčet + daň (bez dopravy)
6. Skontroluj, či je prítomné `step: 1`

### Dokončenie objednávky (purchase + setEncryptedEmail)

1. Dokonči testovaciu objednávku (na jednoduché testovanie použi platobnú metódu „Bankový prevod")
2. Na stránke ďakovania otvor konzolu prehliadača
3. Overte, že sa zobrazí `[Barion Pixel] Event: purchase` s `revenue` zodpovedajúcim celkovej sume objednávky
4. Overte, že sa zobrazí `[Barion Pixel] setEncryptedEmail sent`
5. Obnov stránku ďakovania — overte, že `purchase` sa NESPUSTÍ znovu (prevencia duplicít)
6. Skontroluj, či položky `contents` zahŕňajú `unit`, `totalItemPrice`

### Integrácia súhlasu

1. Vymaž všetky cookies
2. Prejdi na ľubovoľnú stránku
3. Overte, že sa zobrazí `[Barion Pixel] Base pixel initialized` (základný pixel sa načíta vždy)
4. Prijmi cookies cez svoj banner na cookies
5. Overte, že sa zobrazí `[Barion Pixel] Consent granted`
6. Znovu načítaj stránku — overte, že súhlas je automaticky udelený pri načítaní (vracajúci sa návštevník)

---

## Bežné problémy

### Udalosti sa nespúšťajú

- **Skontroluj Pixel ID**: Uisti sa, že je v Nastavenia > Barion Pixel nakonfigurované platné Pixel ID
- **Skontroluj úplné sledovanie**: Udalosti vyžadujú zaškrtnutie „Povoliť úplné sledovanie Pixel"
- **Skontroluj WooCommerce**: Úplné sledovanie vyžaduje aktívny WooCommerce
- **Skontroluj chyby konzoly**: Hľadaj chyby JavaScriptu, ktoré by mohli brániť načítaniu bp.js

### Dvojité načítanie pixelu

Ak vidíš `[Barion Pixel] bp.js already loaded by another plugin`, iný plugin (pravdepodobne Barion Payment Gateway) už načítal bp.js. Toto je neškodné — plugin preskočí opätovné načítanie a stále sa inicializuje s tvojím Pixel ID.

### Súhlas sa neudeľuje

- **WP Consent API**: Uisti sa, že je nainštalovaný plugin WP Consent API a tvoj plugin na cookies ho podporuje
- **Cookie Law Info**: Uisti sa, že je plugin aktívny a globálna premenná `CLI` je dostupná
- **Manuálne**: Zavolaj `window.wcBarionGrantConsent()` z callbacku svojho správcu súhlasu
