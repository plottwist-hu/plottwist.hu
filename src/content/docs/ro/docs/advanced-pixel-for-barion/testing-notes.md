---
title: "Note de testare și particularități cunoscute"
sidebar:
  order: 4
---

:::note
Aceasta este o traducere automată. Corecțiile comunității sunt binevenite! [Trimiteți o corectură pe GitHub](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/ro/testing-notes.md)
:::

## Particularități de validare la execuție bp.js

Scriptul `bp.js` al Barion efectuează validarea pe partea clientului a datelor evenimentelor. În unele cazuri, regulile de validare diferă de documentația de referință a API-ului Barion. Aceste particularități au fost descoperite în timpul testării pe mediul de staging.

### totalItemPrice: respins pentru contentView, obligatoriu pentru articolele din contents

- **contentView** (eveniment simplu): bp.js **respinge** `totalItemPrice` cu eroarea `Invalid key totalItemPrice in contentView event`, chiar dacă referința API îl listează ca câmp obligatoriu.
- Articolele `contents` ale **initiateCheckout** și **purchase**: bp.js **necesită** `totalItemPrice` cu eroarea `Mandatory key totalItemPrice is missing from contents event` dacă este omis.

**Regulă generală:** `totalItemPrice` este invalid pentru evenimentele simple, dar obligatoriu în articolele array-ului `contents`.

### unit este obligatoriu în articolele din contents

bp.js necesită `unit` în articolele array-ului `contents` pentru `initiateCheckout` și `purchase`. Omiterea lui produce: `Mandatory key unit is missing from contents event`.

### step este obligatoriu pentru evenimentele de checkout

Câmpul `step` este obligatoriu pentru `addToCart`, `initiateCheckout` și `purchase`. Documentația Barion recomandă folosirea valorii `1` pentru checkout-urile cu un singur pas.

---

## Mod depanare

Activează modul de depanare în **Setări > Barion Pixel** pentru a înregistra toate evenimentele Barion Pixel în consola browserului.

### Ce să urmărești

Deschide consola browserului (F12 > Consolă) și caută mesajele prefixate cu `[Barion Pixel]`:

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

### Erori bp.js

bp.js înregistrează propriile erori de validare cu un prefix numeric. Cele mai comune:

| Eroare | Semnificație | Remediere |
|-------|---------|-----|
| `Mandatory key X is missing from Y event` | Un câmp obligatoriu nu este trimis | Verifică datele evenimentului |
| `Invalid key X in Y event` | Un câmp este trimis pe care bp.js nu îl așteaptă | Elimină câmpul |

---

## Listă de verificare pentru testare

### Pagina produsului (contentView)

1. Navighează la orice pagină de produs individual
2. Deschide consola browserului
3. Verifică că apare `[Barion Pixel] Event: contentView`
4. Verifică că nu există mesaje de eroare bp.js despre chei lipsă/invalide
5. Verifică că câmpurile includ: `contentType`, `currency`, `id`, `name`, `quantity`, `unit`, `unitPrice`

### Adăugare în coș (addToCart)

**De pe pagina de magazin/arhivă (AJAX):**

1. Navighează la pagina de magazin
2. Deschide consola browserului
3. Apasă „Adaugă în coș" pe orice produs
4. Verifică că apare `[Barion Pixel] Event: addToCart`
5. Verifică că câmpurile includ `totalItemPrice` și `step: 1`

**De pe pagina unui singur produs (submit formular):**

1. Navighează la o pagină de produs individual
2. Deschide consola browserului
3. Apasă „Adaugă în coș"
4. Verifică că `[Barion Pixel] Event: addToCart` se declanșează înainte ca pagina să navigheze
5. Pentru produse variabile: selectează mai întâi o variație și verifică că se folosește prețul variației

### Pagina de finalizare a comenzii (initiateCheckout)

1. Adaugă articole în coș și navighează la finalizarea comenzii
2. Deschide consola browserului
3. Verifică că apare `[Barion Pixel] Event: initiateCheckout`
4. Verifică că array-ul `contents` conține articolele corecte cu `unit`, `unitPrice`, `totalItemPrice`
5. Verifică că `revenue` este subtotal + taxe (fără transport)
6. Verifică că `step: 1` este prezent

### Finalizarea comenzii (purchase + setEncryptedEmail)

1. Completează o comandă de test (folosește metoda de plată „Transfer bancar" pentru testare ușoară)
2. Pe pagina de mulțumire, deschide consola browserului
3. Verifică că apare `[Barion Pixel] Event: purchase` cu `revenue` corespunzând totalului comenzii
4. Verifică că apare `[Barion Pixel] setEncryptedEmail sent`
5. Reîncarcă pagina de mulțumire — verifică că `purchase` NU se mai declanșează (prevenirea dublurilor)
6. Verifică că articolele din `contents` includ `unit`, `totalItemPrice`

### Integrare consimțământ

1. Șterge toate cookie-urile
2. Navighează la orice pagină
3. Verifică că apare `[Barion Pixel] Base pixel initialized` (pixelul de bază se încarcă întotdeauna)
4. Acceptă cookie-urile prin bannerul tău de cookie-uri
5. Verifică că apare `[Barion Pixel] Consent granted`
6. Reîncarcă pagina — verifică că consimțământul este acordat automat la încărcare (vizitator care revine)

---

## Probleme frecvente

### Evenimentele nu se declanșează

- **Verifică ID Pixel**: Asigură-te că un ID Pixel valid este configurat în Setări > Barion Pixel
- **Verifică urmărirea completă**: Evenimentele necesită ca „Activează urmărirea completă cu Pixel" să fie bifat
- **Verifică WooCommerce**: Urmărirea completă necesită ca WooCommerce să fie activ
- **Verifică erorile din consolă**: Caută erori JavaScript care ar putea împiedica încărcarea bp.js

### Dubla încărcare a pixelului

Dacă vezi `[Barion Pixel] bp.js already loaded by another plugin`, un alt plugin (probabil Barion Payment Gateway) a încărcat deja bp.js. Acest lucru este inofensiv — plugin-ul omite reîncărcarea și se inițializează totuși cu ID-ul tău Pixel.

### Consimțământul nu se acordă

- **WP Consent API**: Asigură-te că plugin-ul WP Consent API este instalat și că plugin-ul tău de cookie îl suportă
- **Cookie Law Info**: Asigură-te că plugin-ul este activ și că obiectul global `CLI` este disponibil
- **Manual**: Apelează `window.wcBarionGrantConsent()` din callback-ul managerului tău de consimțământ
