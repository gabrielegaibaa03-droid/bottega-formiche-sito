# Sito – La Bottega delle Formiche

## Il cliente
Bottega di grafica, stampa, copisteria e oggetti artigianali di Andrea e Laura Gaiba, in via Sant'Isaia 19/A a Bologna. Sono grafici dal 1987. Il progetto è seguito dal figlio, Gabriele.

Il negozio ha già un sito, https://labottegadelleformiche.it, con la sua identità visiva e i suoi testi: vanno rispettati.

## A cosa serve il sito
1. Far trovare la bottega su Google e spiegare chi sono.
2. Portare richieste di preventivo su WhatsApp e persone in negozio.
3. In seguito: un piccolo negozio online con pochi prodotti scelti.

## Per chi è
Per tutti: anziani del quartiere, famiglie, studenti, turisti, negozi e studi del centro. Deve essere semplicissimo da usare per chi non è pratico di tecnologia.

## Regole di design
- Stile pulito ed essenziale, ispirato ad Apple: molto spazio, poche cose per schermata.
- Testo base di almeno 18px, contrasto alto (almeno WCAG AA), pulsanti alti almeno 48px.
- Il pulsante per ingrandire il testo resta sempre visibile.
- Perfetto da telefono. Tema chiaro e tema scuro.
- Identità della bottega (dal sito attuale): verde bottiglia come colore principale, arancio caldo per i titoletti, logo rotondo ufficiale (img/logo.svg), monogramma LBDF, frase "Life Style Goods & Gifts". La formica resta come dettaglio decorativo.
- Usare i loro testi dove possibile, sono scritti con la loro voce. Frasi da tenere:
  - "Dove le idee prendono forma, colore e… diventano carta, inchiostro e sorrisi."
  - "Ogni giorno lavoriamo con le mani, la testa e un po' di cuore in più."
- Mai testo segnaposto o lorem ipsum. Se un dato manca, lascia un commento `TODO` nel codice e segnalalo nel riepilogo.

## Scelte tecniche
- Sito statico: HTML, CSS e JavaScript, senza framework e senza passaggi di build. Pubblicato con GitHub Pages.
- Font ospitati dentro il sito, non caricati da Google Fonts (privacy).
- Nessun cookie e nessun sistema di statistiche senza consenso.
- I preventivi usano un link wa.me al numero del negozio: nessun server, nessun database.
- Immagini nella cartella `img/`, in WebP, sotto i 300 KB ciascuna.
- File del sito: `index.html`, `privacy.html`, `404.html`, `style.css`, `script.js`, font in `fonts/`. Il prototipo iniziale è stato rimosso.
- Home in stile pagine prodotto Apple, approvata da Gabriele (tavola 4 della lavagna "Home – tre idee di stampa"). Ordine delle sezioni: apertura con il titolo che si scompone nei colori di stampa, storia su fondo scuro con le frasi che si accendono, Chi siamo con la foto, stampante con il foglio che esce, quaderno cucito con il nome in copertina, servizi a tessere, preventivo su WhatsApp, vicini, Dove siamo con la mappa e la formica, recensioni.
- Le animazioni legate allo scorrimento sono solo CSS (`animation-timeline`), in fondo a `style.css`. Senza supporto del browser o con "riduci movimento" la pagina resta completa e ferma. Su schermi piccoli e con il testo grande le sezioni non restano ferme.
- Recensioni: solo frasi vere di clienti, prese da Google. Mai recensioni inventate.

## Dati del negozio (unica fonte di verità)
- Nome: La Bottega delle Formiche di Andrea Gaiba
- Indirizzo: Via Sant'Isaia 19/A, 40123 Bologna
- Telefono e WhatsApp: 375 923 9787 — CONFERMATO dai titolari (link WhatsApp: wa.me/393759239787)
- Email: servicelabottega@gmail.com
- Orari: lunedì–venerdì 8:30–13:00 e 15:00–19:00; sabato e domenica chiuso — CONFERMATI dai titolari
- Instagram: @labottegadelleformiche
- Partita IVA: 03063371201 — CONFERMATA (il codice fiscale del titolare non va pubblicato)
- Foto di Andrea e Laura: `img/andrea-e-laura.webp` (serve l'ok di chi l'ha scattata)
- Logo: `img/logo.svg` (vettoriale, ricostruito dal logo rotondo verde salvia #4D8C74 con ornamenti); `img/logo-512.png` per i social

Non cambiare questi dati senza la conferma di Gabriele.

## Servizi
- Grafica e stampa: loghi, biglietti da visita, carta intestata, inviti, locandine, menù, cartelli vetrina e vetrofanie
- Copisteria, tesi di laurea e rilegature di ogni genere
- Quaderni, agende, taccuini e album personalizzati; quaderni cuciti a mano e cartoleria
- Personalizzazioni: t-shirt, felpe, shopper, gadget
- Casa e regali
- Angolo moda: capi sartoriali femminili cuciti a mano

## Obblighi
- Partita IVA visibile nel footer di ogni pagina.
- Una pagina Privacy.

## Come lavorare
- Una modifica alla volta. A fine lavoro spiega in italiano semplice cosa hai cambiato e cosa resta da decidere.
- Prima di consegnare, controlla il sito a 375px e a 1280px di larghezza.
