---
title: "Referință evenimente Barion Pixel"
sidebar:
  order: 1
---

:::note
Aceasta este o traducere automată. Corecțiile comunității sunt binevenite! [Trimiteți o corectură pe GitHub](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/ro/events-reference.md)
:::

## Prezentare generală

Plugin-ul suportă două moduri de funcționare:

- **Pixel de bază** (întotdeauna activ când ID Pixel este configurat): Încarcă `bp.js` și declanșează `pageView` automat pe fiecare pagină. Folosit pentru prevenirea fraudei.
- **Urmărire completă** (opțional, comutare din administrare): Adaugă urmărirea evenimentelor de e-commerce pentru analize de marketing și rate mai mici de comision Barion.

### Rezumat evenimente

| Eveniment | Mod | Apel bp() | Declanșator |
|-------|------|-----------|---------|
| pageView | De bază | Automat (bp.js) | Fiecare încărcare de pagină |
| grantConsent | De bază | `bp('consent', 'grantConsent')` | Consimțământ cookie acceptat |
| rejectConsent | De bază | `bp('consent', 'rejectConsent')` | Consimțământ cookie refuzat |
| contentView | Complet | `bp('track', 'contentView', data)` | Pagina unui singur produs |
| addToCart | Complet | `bp('track', 'addToCart', data)` | Acțiune de adăugare în coș |
| initiateCheckout | Complet | `bp('track', 'initiateCheckout', data)` | Încărcarea paginii de finalizare |
| purchase | Complet | `bp('track', 'purchase', data)` | Pagina de mulțumire |
| setEncryptedEmail | Complet | `bp('identify', 'setEncryptedEmail', email)` | Pagina de mulțumire |

---

## Evenimente Pixel de bază

### pageView

Se declanșează automat când se încarcă `bp.js`. Nu este necesară nicio configurare în afara setării ID-ului Pixel.

### grantConsent

Se declanșează când utilizatorul acceptă cookie-urile de marketing. Gestionat automat prin WP Consent API sau Cookie Law Info, sau manual prin `window.wcBarionGrantConsent()`.

### rejectConsent

Se declanșează când utilizatorul refuză cookie-urile de marketing. Gestionat automat prin WP Consent API sau Cookie Law Info, sau manual prin `window.wcBarionRejectConsent()`. Atât `grantConsent`, cât și `rejectConsent` sunt obligatorii conform cerințelor Barion.

Vezi [Integrare consimțământ cookie](../cookie-consent/) pentru detalii.

---

## Evenimente urmărire completă

### contentView

**Declanșator:** Pagina unui singur produs (hook `woocommerce_after_single_product`)

**Câmpuri trimise:**

| Câmp | Tip | Valoare |
|-------|------|-------|
| contentType | string | `'Product'` |
| currency | string | Moneda magazinului WooCommerce (de ex. `'HUF'`) |
| id | string | ID produs |
| name | string | Numele afișat al produsului |
| quantity | int | `1` (întotdeauna — vizualizarea unui produs) |
| unit | string | `'pcs'` |
| unitPrice | float | Prețul produsului |

> **Notă:** Referința API Barion listează `totalItemPrice` ca obligatoriu pentru acest eveniment, dar bp.js îl respinge la execuție cu „Invalid key totalItemPrice in contentView event." Acest câmp este omis intenționat.

---

### addToCart

**Declanșator:** JavaScript pe partea clientului (se declanșează imediat la acțiunea de adăugare în coș)

**Implementare:** Două căi, ambele gestionate pe partea clientului pentru a funcționa cu cache-ul de pagini:

1. **AJAX add to cart** (pagini de magazin/arhivă): Ascultă evenimentul jQuery WooCommerce `added_to_cart`. Citește datele produsului din atributele `data-` ale elementului `<button>` (`data-product_id`, `data-product_name`, `data-product_price`, `data-quantity`).

2. **Submit formular pagina unui singur produs**: Interceptează submit-ul `form.cart`. Datele produsului sunt incluse ca JSON în footer. Pentru produse variabile, citește `display_price` al variației selectate din datele jQuery `product_variations` ale WooCommerce.

**Câmpuri trimise:**

| Câmp | Tip | Valoare |
|-------|------|-------|
| contentType | string | `'Product'` |
| currency | string | Moneda magazinului |
| id | string | ID produs |
| name | string | Numele produsului |
| quantity | int | Cantitate adăugată |
| unit | string | `'pcs'` |
| unitPrice | float | Prețul per unitate |
| totalItemPrice | float | `unitPrice * quantity` |
| step | int | `1` |

---

### initiateCheckout

**Declanșator:** Încărcarea paginii de finalizare (hook `woocommerce_before_checkout_form`)

**Câmpuri trimise:**

| Câmp | Tip | Valoare |
|-------|------|-------|
| contents | array | Array de articole din coș (vezi mai jos) |
| currency | string | Moneda magazinului |
| revenue | float | Subtotal coș + taxe (transportul exclus — este posibil să nu fie calculat încă) |
| step | int | `1` |

**Câmpurile articolelor din contents:**

| Câmp | Tip | Valoare |
|-------|------|-------|
| contentType | string | `'Product'` |
| currency | string | Moneda magazinului |
| id | string | ID produs |
| name | string | Numele produsului |
| quantity | int | Cantitatea articolului |
| unit | string | `'pcs'` |
| unitPrice | float | Prețul per unitate |
| totalItemPrice | float | `unitPrice * quantity` |

---

### purchase

**Declanșator:** Pagina de mulțumire (hook `woocommerce_thankyou`)

**Prevenirea dublurilor:** Folosește meta `_wc_barion_tracked` din post pentru a preveni declanșarea la reîncărcarea paginii.

**Câmpuri trimise:**

| Câmp | Tip | Valoare |
|-------|------|-------|
| contents | array | Array de articole din comandă (vezi mai jos) |
| currency | string | Moneda comenzii |
| revenue | float | Totalul comenzii (include transportul, taxele, reducerile) |
| step | int | `1` |

**Câmpurile articolelor din contents:**

| Câmp | Tip | Valoare |
|-------|------|-------|
| contentType | string | `'Product'` |
| currency | string | Moneda comenzii |
| id | string | ID produs |
| name | string | Numele articolului |
| quantity | int | Cantitatea articolului |
| unit | string | `'pcs'` |
| unitPrice | float | `(total_articol + taxe_articol) / cantitate` (reflectă reducerile) |
| totalItemPrice | float | `unitPrice * quantity` |

**Notă despre revenue:** Evenimentul `purchase` folosește totalul complet al comenzii (inclusiv transportul), în timp ce `initiateCheckout` folosește subtotalul + taxe (transportul poate să nu fie calculat la începutul finalizării comenzii).

---

### setEncryptedEmail

**Declanșator:** Pagina de mulțumire (hook `woocommerce_thankyou`)

**Apel bp():** `bp('identify', 'setEncryptedEmail', email)`

Adresa de e-mail de facturare este convertită în litere mici înainte de trimitere. `bp.js` al Barion gestionează automat hashing-ul SHA1 — plugin-ul trimite adresa de e-mail simplă, nu un hash.

Se declanșează doar când comanda are o adresă de e-mail de facturare.

---

## Evenimente NEimplementate

| Eveniment | Motiv |
|-------|--------|
| `customEvent` | Nu este necesar pentru urmărirea standard a e-commerce |
| `initiatePayment` | Documentele Barion spun să implementezi `purchase` SAU `initiatePayment` — folosim `purchase` |
| `setPhoneNumber` | Opțional; numărul de telefon nu este disponibil în mod fiabil în toate fluxurile WooCommerce |
| `search` | Opțional; nu face parte din setul obligatoriu de evenimente |
