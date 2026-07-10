# MAPPING — volledigheid & voortgang

## ✅ Vragen: 1371/1371 — ALLE Excel-vragen zitten in het platform
| Excel | Vragen | Platform-hoofdstuk |
|---|---|---|
| electriciteit | 298 | h02 (171), h03-dB (37), h05 (71), h11 (19) |
| componenten | 156 | h03 |
| schakelingen | 232 | h04 |
| ontvangers | 93 | h07 |
| zenders | 53 | h06 |
| antennes_en_transmissielijnen | 132 | h08 |
| propagatie | 88 | h09 |
| metingen | 87 | h10 |
| emcveiligheid | 51 | h12 (35) + h13 (16) |
| reglementering | 181 | h14 (69) + h15 (112) |
| **TOTAAL** | **1371** | **1371 ✅** |

Gecontroleerd met check_volledigheid2.py: elke vraagtekst uit elke Excel is teruggevonden in het platform.

## Figuren via OLE-extractie (nooit via conversie)
| Excel | Figuren gekoppeld |
|---|---|
| electriciteit | 28 |
| componenten | 35 |
| schakelingen | 63 |
| ontvangers | 11 |
| zenders | 6 |
| antennes | 3 |
| metingen | 10 |
| propagatie / emc / reglementering | 0 (bevatten geen figuren) |

## Theorie-status (leerboek-diepgang)
- ✅ H2 Elektriciteit: 9/9 subhoofdstukken volledig
- ✅ H3 Passieve en actieve componenten: 7/7 subhoofdstukken volledig
- 🟡 Overige hoofdstukken: pagina's + vragen klaar, theorie in opbouw

## IRTS-dekking (Engelse PDF → UBA)
Zie docs/DEKKING_IRTS.md — elk IRTS-hoofdstuk gemapt op een UBA-subhoofdstuk zodat geen Engelse inhoud verloren gaat.

## Principes
- Figuren ALTIJD via OLE-extractie uit origineel .xls
- Elk subhoofdstuk = eigen pagina; vragen op aparte pagina per hoofdstuk
- Leerboek-diepgang: formules + afleidingen + rekenvoorbeelden + concept-panelen
- MathJax lokaal (geen CDN)
- Volledigheid bewaakt met check_volledigheid2.py (vragen) + DEKKING_IRTS.md (theorie)
