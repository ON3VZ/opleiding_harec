# HAREC Leerplatform

Interactief leerplatform voor het HAREC-radioamateurexamen (klasse A), volgens de **UBA-cursusstructuur** (15 hoofdstukken). Statische site, klaar voor **GitHub Pages**. Volledig in het Nederlands.

## Functies

- **Aanmelden** met naam/roepnaam (lokaal, geen server).
- **UBA-structuur**: 15 hoofdstukken, 75 subhoofdstukken — elk subhoofdstuk op een **eigen pagina** (minder scrollen, gericht studeren), met vorige/volgende-navigatie.
- **Leerboek-diepgang**: volledige theorie met formules (via MathJax), afleidingen en uitgewerkte rekenvoorbeelden. Essentie in gekleurde kaders; klik "meer uitleg" voor een **zijpaneel** met uitleg + voorbeeld + analogie.
- **Examenvragen op aparte pagina** per hoofdstuk, filterbaar per subhoofdstuk én met een **"enkel foute"-filter** om je fouten opnieuw te oefenen.
- Interactieve vragen: antwoord verborgen tot je klikt, dan goed/fout + uitleg.
- **Voortgang** lokaal per toestel; rechtermenu toont waar je bent en wat voltooid is.

## Structuur

```
/login.html                  ← aanmelden
/index.html                  ← dashboard (15 hoofdstuktegels)
/chapters/hNN.html           ← hoofdstukoverzicht (subhoofdstuk-tegels)
/chapters/hNN-X.Y.html       ← theorie per subhoofdstuk
/quiz/hNN.html               ← examenvragen van het hoofdstuk
/data/structuur.json         ← centrale UBA-structuur (15 hfst, 75 subs)
/data/theorie_hNN.json       ← theorie in blokken per subhoofdstuk
/data/vragen_hNN.json        ← examenvragen (antwoord + uitleg, verborgen tot klik)
/assets/css/app.css          ← stijl
/assets/js/app.js            ← logica (structuur, voortgang, quiz, menu, paneel)
/assets/vendor/mathjax/      ← MathJax (lokaal, geen CDN nodig)
/assets/img/hNN/             ← figuren per hoofdstuk
```

## Publiceren op GitHub Pages

1. Upload de **volledige inhoud van deze map** naar een repository.
2. Settings → Pages → branch `main`, map `/ (root)`.
3. Open de site via de Pages-URL (niet door dubbelklikken — de JSON-data laadt enkel via een webserver).

## Status

| Hfst | Titel | Theorie | Vragen |
|---|---|---|---|
| 1 | Wiskunde | ⬜ | — |
| 2 | Elektriciteit | 🟡 2.1 volledig, rest in opbouw | ✅ 171 |
| 3 | Passieve en actieve componenten | ⬜ | ✅ 37 (dB) |
| 5 | Modulatie en demodulatie | ⬜ | ✅ 71 |
| 11 | Digitale signaalverwerking | ⬜ | ✅ 19 |
| overige | | ⬜ | ⬜ |

Structuur volgt het UBA-handboek. Bronnen: UBA-cursus · IRTS HAREC Study Guide (2024) · CEPT T/R 61-02 · UBA-oefenreeksen. Uitsluitend voor persoonlijke studie.
