---
title: "Compatibilitate plugin"
sidebar:
  order: 3
---

:::note
Aceasta este o traducere automată. Corecțiile comunității sunt binevenite! [Trimiteți o corectură pe GitHub](https://github.com/gcsecsey/advanced-pixel-for-barion/edit/main/docs/i18n/ro/compatibility.md)
:::

## WooCommerce

**Necesar pentru urmărirea completă a evenimentelor.** Pixelul de bază funcționează și fără WooCommerce, dar toate evenimentele de e-commerce (contentView, addToCart, initiateCheckout, purchase, setEncryptedEmail) necesită WooCommerce.

| Versiune | Status |
|---------|--------|
| WooCommerce 5.0+ | Suportat |
| WooCommerce 9.6 | Testat |

---

## Barion Payment Gateway (woocommerce-barion)

Plugin-ul [Barion Payment Gateway](https://github.com/szelpe/woocommerce-barion) creat de szelpe este **exclusiv un procesor de plăți** — adaugă Barion ca metodă de plată la finalizarea comenzii în WooCommerce. Nu implementează urmărirea evenimentelor Barion Pixel.

**Coexistență:** Ambele plugin-uri funcționează împreună fără conflicte. Plugin-ul Advanced Pixel for Barion gestionează urmărirea; gateway-ul de plată gestionează plățile.

**Suprapunere ID Pixel:** Gateway-ul de plată are un câmp opțional pentru ID Pixel pentru încărcarea pixelului de bază. Dacă ambele plugin-uri au un ID Pixel configurat:

- Advanced Pixel for Barion detectează dacă `bp.js` este deja încărcat și omite reîncărcarea scriptului
- O notificare informativă în administrare sugerează consolidarea configurației ID Pixel într-un singur loc
- Ambele plugin-uri continuă să funcționeze corect indiferent de situație

**Recomandare:** Dacă folosești ambele plugin-uri, configurează ID-ul Pixel doar în setările Advanced Pixel for Barion și lasă-l gol în setările gateway-ului de plată.

---

## Plugin-uri de cache pentru pagini

Plugin-ul este pe deplin compatibil cu cache-ul de pagini:

| Eveniment | Implementare | Impact cache |
|-------|---------------|----------------|
| contentView | Server (pagina de produs) | Paginile de produse nu sunt de obicei în cache, sau variază în funcție de produs |
| addToCart | **JavaScript pe partea clientului** | Fără probleme de cache — JS se execută în browser |
| initiateCheckout | Server (pagina de finalizare a comenzii) | Pagina de finalizare nu este în cache (conține date de sesiune ale utilizatorului) |
| purchase | Server (pagina de mulțumire) | Paginile de mulțumire nu sunt în cache (unice per comandă) |

Evenimentul addToCart a fost implementat specific pe partea clientului (în loc de sesiuni PHP) pentru a funcționa cu găzduirea WordPress.com și configurații agresive de cache pentru pagini.

**Compatibil cu:** WP Super Cache, W3 Total Cache, LiteSpeed Cache, găzduire WordPress.com, Cloudflare și soluții similare de cache.

---

## Plugin-uri de consimțământ cookie

Plugin-ul suportă toate plugin-urile de consimțământ cookie care implementează [WP Consent API](https://wordpress.org/plugins/wp-consent-api/). Vezi [Integrare consimțământ cookie](../cookie-consent/) pentru detalii.

**Suportate automat:**

- CookieYes (1,5M+ instalări)
- Complianz (1M+ instalări)
- Cookie Notice by dFactory (1M+ instalări)
- GDPR Cookie Compliance by Moove (300K+ instalări)
- Real Cookie Banner (100K+ instalări)

**Integrare fallback directă:**

- Cookie Law Info / CookieYes (funcționează și fără WP Consent API)

---

## Versiune WordPress

| Versiune | Status |
|---------|--------|
| WordPress 5.0+ | Necesar |
| WordPress 6.7 | Testat |

## Versiune PHP

| Versiune | Status |
|---------|--------|
| PHP 7.2+ | Necesar |
| PHP 8.x | Compatibil |
