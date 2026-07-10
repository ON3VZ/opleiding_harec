# IRTS-inhoudsdekking — gedetailleerde controle

Deze controle gaat verder dan een hoofdstuk-mapping: ze verifieert of de **werkelijke inhoud**
van elke IRTS-sectie ook echt in de theorie verwerkt is (niet enkel of er een 'bestemming' bestaat).

## Methode
De volledige IRTS-inhoudstafel (tot subsubsecties) is als checklist gebruikt. Per onderwerp is
met trefwoorden in de theorie-JSON gecontroleerd of de inhoud aanwezig is.

## Resultaat van de inhoudscontrole (2 rondes)
Eerste ronde: 29 ontbrekende onderwerpen gevonden en toegevoegd.
Tweede ronde: 3 extra ontbrekende onderwerpen gevonden en toegevoegd.
Alle gecontroleerde IRTS-onderwerpen zijn nu verwerkt.

## Toegevoegd na de inhoudscontrole
- **H07 Ontvangers**: blokkering/desensitisatie, intermodulatie, kruismodulatie
- **H08 Antennes/lijnen**: voor-achterverhouding, effectief oppervlak (capture area),
  parabolische antenne, hoornantenne, gevouwen dipool, endfed, grondvlak/radialen,
  golfpijp (waveguide), parallelle lijn/ladderlijn, spannings- vs stroombalun/unun
- **H09 Propagatie**: zonnevlekken/flares, geomagnetische stormen, troposcatter,
  aircraft scatter, ducting, EME (maanreflectie), satellieten
- **H10 Meten**: spectrumanalyser, signaalgenerator, antenne-analyser, veldsterktemeter
- **H12 EMC**: gestraalde vs geleide emissie
- **H13 Veiligheid**: batterij- en chemische gevaren (kortsluiting, waterstofgas, lithium)
- **H14 Internationaal**: emissiedesignators (A1A/A3E/J3E/F3E), logboek, bakens
- **H06 Zenders**: duty cycle, transverter
- **H11 DSP**: resolutie/bits, oversampling

## IRTS-hoofdstuk → UBA-hoofdstuk (mapping)
| IRTS | UBA |
|---|---|
| 3 Electrical Principles | h02 |
| 4 Resistors in Circuits | h02, h03 |
| 5 AC & Sinusoidal Signals | h02 |
| 6 DSP & Non-Sinusoidal | h02, h11 |
| 7 Radio Waves & Spectrum | h08, h09 |
| 8 Resonant Circuits & Components | h02, h03 |
| 9 Power Ratios & Decibels | h03 |
| 10 Other Components & Circuits | h03, h04 |
| 11 Modulation & Modes | h05 |
| 12 Transmitters | h06 |
| 13 Receivers | h07 |
| 14 Transmission Lines | h08 |
| 15 Antennas | h08 |
| 16 Propagation | h09 |
| 17 Measurements | h10 |
| 18 EMC & Immunity | h12 |
| 19 Safety | h13 |
| 20 ITU Radio Regulations | h14 |
| 21 CEPT Regulations | h14 |
| 22 Irish Law → (vervangen door) Belgische | h15 |
| 23 Phonetic Alphabet | h14 |
| 24 Call Signs | h14 |
| 25 Spectrum Allocation / Band Plans | h14 |
| 26 Q-Codes & Abbreviations | h14 |
| 27 Distress & Emergency | h14 |
| 28 Social Responsibility | h14 |
| 29 Operating Procedures | h14 |

## Belangrijke nuance
De Ierse wetgeving (IRTS h22, deels h24-25) is bewust **vervangen door de Belgische regelgeving**
(h15, uit de aparte UBA-PDF), omdat die voor het Belgische HAREC-examen geldt.
