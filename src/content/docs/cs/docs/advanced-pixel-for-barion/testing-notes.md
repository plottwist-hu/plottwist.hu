---
title: "Poznámky k testování a známé zvláštnosti"
sidebar:
  order: 4
---

:::note
Toto je automatický překlad. Komunitní opravy jsou vítány! [Odeslat opravu na GitHubu](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/cs/testing-notes.md)
:::

## Zvláštnosti validace bp.js za běhu

Skript `bp.js` od Barion provádí validaci dat událostí na straně klienta. V některých případech se validační pravidla liší od referenční dokumentace Barion API. Tyto zvláštnosti byly odhaleny během testování na stagingu.

### totalItemPrice: odmítáno pro contentView, vyžadováno pro položky obsahu

- **contentView** (plochá událost): bp.js **odmítá** `totalItemPrice` s chybou `Invalid key totalItemPrice in contentView event`, i když referenční dokumentace API ho uvádí jako povinné pole.
- Položky `contents` pro **initiateCheckout** a **purchase**: bp.js **vyžaduje** `totalItemPrice` s chybou `Mandatory key totalItemPrice is missing from contents event`, pokud je vynecháno.

**Obecné pravidlo:** `totalItemPrice` je neplatné pro ploché události, ale vyžadováno uvnitř položek pole `contents`.

### unit je vyžadováno v položkách obsahu

bp.js vyžaduje `unit` v položkách pole `contents` pro `initiateCheckout` a `purchase`. Vynechání způsobí: `Mandatory key unit is missing from contents event`.

### step je vyžadováno pro události pokladny

Pole `step` je povinné pro `addToCart`, `initiateCheckout` a `purchase`. Dokumentace Barion doporučuje použít `1` pro jednoúrovňové pokladny.

---

## Režim ladění

Povolte režim ladění v **Nastavení > Barion Pixel**, abyste zaznamenávali všechny události Barion Pixel do konzole prohlížeče.

### Co hledat

Otevřete konzoli prohlížeče (F12 > Konzole) a hledejte zprávy s předponou `[Barion Pixel]`:

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

bp.js zaznamenává vlastní validační chyby s číselnou předponou. Běžné chyby:

| Chyba | Význam | Řešení |
|-------|--------|--------|
| `Mandatory key X is missing from Y event` | Povinné pole není odesíláno | Zkontrolujte data události |
| `Invalid key X in Y event` | Je odesíláno pole, které bp.js neočekává | Odeberte pole |

---

## Kontrolní seznam testování

### Stránka produktu (contentView)

1. Přejděte na libovolnou stránku jednotlivého produktu
2. Otevřete konzoli prohlížeče
3. Ověřte, že se zobrazí `[Barion Pixel] Event: contentView`
4. Ověřte, že nejsou žádné chybové zprávy bp.js o chybějících/neplatných klíčích
5. Zkontrolujte, že pole zahrnují: `contentType`, `currency`, `id`, `name`, `quantity`, `unit`, `unitPrice`

### Přidání do košíku (addToCart)

**Ze stránky obchodu/archivu (AJAX):**

1. Přejděte na stránku obchodu
2. Otevřete konzoli prohlížeče
3. Klikněte na „Přidat do košíku" u libovolného produktu
4. Ověřte, že se zobrazí `[Barion Pixel] Event: addToCart`
5. Zkontrolujte, že pole zahrnují `totalItemPrice` a `step: 1`

**Ze stránky jednotlivého produktu (odeslání formuláře):**

1. Přejděte na stránku jednotlivého produktu
2. Otevřete konzoli prohlížeče
3. Klikněte na „Přidat do košíku"
4. Ověřte, že se `[Barion Pixel] Event: addToCart` spustí před přechodem na jinou stránku
5. U variabilních produktů: nejprve vyberte variantu a ověřte, že je použita cena varianty

### Stránka pokladny (initiateCheckout)

1. Přidejte položky do košíku a přejděte k pokladně
2. Otevřete konzoli prohlížeče
3. Ověřte, že se zobrazí `[Barion Pixel] Event: initiateCheckout`
4. Zkontrolujte, že pole `contents` obsahuje správné položky s `unit`, `unitPrice`, `totalItemPrice`
5. Zkontrolujte, že `revenue` je mezisoučet + daň (bez dopravy)
6. Zkontrolujte, že je přítomno `step: 1`

### Dokončení objednávky (purchase + setEncryptedEmail)

1. Dokončete testovací objednávku (použijte platební metodu „Bankovní převod" pro snadné testování)
2. Na stránce s poděkováním otevřete konzoli prohlížeče
3. Ověřte, že se zobrazí `[Barion Pixel] Event: purchase` s `revenue` odpovídajícím celkové částce objednávky
4. Ověřte, že se zobrazí `[Barion Pixel] setEncryptedEmail sent`
5. Obnovte stránku s poděkováním — ověřte, že se `purchase` NESPUSTÍ znovu (ochrana proti duplicitám)
6. Zkontrolujte, že položky `contents` zahrnují `unit`, `totalItemPrice`

### Integrace souhlasu

1. Vymažte všechny cookies
2. Přejděte na libovolnou stránku
3. Ověřte, že se zobrazí `[Barion Pixel] Base pixel initialized` (základní pixel se vždy načte)
4. Přijměte cookies přes váš banner cookies
5. Ověřte, že se zobrazí `[Barion Pixel] Consent granted`
6. Obnovte stránku — ověřte, že je souhlas automaticky udělen při načtení (vracející se návštěvník)

---

## Běžné problémy

### Události se nespouštějí

- **Zkontrolujte ID Pixelu**: Ujistěte se, že je v Nastavení > Barion Pixel nakonfigurováno platné ID Pixelu
- **Zkontrolujte kompletní sledování**: Události vyžadují zaškrtnutou možnost „Povolit kompletní sledování Pixelem"
- **Zkontrolujte WooCommerce**: Kompletní sledování vyžaduje aktivní WooCommerce
- **Zkontrolujte chyby konzole**: Hledejte JavaScriptové chyby, které by mohly bránit načtení bp.js

### Dvojité načtení pixelu

Pokud vidíte `[Barion Pixel] bp.js already loaded by another plugin`, jiný plugin (pravděpodobně Barion Payment Gateway) již načetl bp.js. To je neškodné — plugin přeskočí opětovné načtení a stále se inicializuje s vaším ID Pixelu.

### Souhlas není udělen

- **WP Consent API**: Ujistěte se, že je nainstalován plugin WP Consent API a váš plugin pro cookies ho podporuje
- **Cookie Law Info**: Ujistěte se, že je plugin aktivní a globální proměnná `CLI` je dostupná
- **Ruční**: Zavolejte `window.wcBarionGrantConsent()` z callbacku vašeho správce souhlasu
