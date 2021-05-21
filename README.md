Elias Nijs 2021  - Project scriptingtalen @ universiteit Gent.

# Bedrieglijk galgje

![](resources/other/Screenshot%20from%202021-05-21%2012-36-17.png)

## Extra implementaties

Ik heb ervoor gekozen om een paar extra functionaliteiten toe te voegen. Deze functionaliteiten zijn:

1. Een reset-knop die een nieuw spel start
2. Achtergrondmuziek met bijhorende knop om deze te (un)muten.
3. Soundeffect bij het klikken op een letter-knop
4. Wanneer het spel gedaan is wordt er een woord getoond dat in het patroon past om de speler te doen denken dat het woord van in het begin vast lag.

## Opmerkingen

### 1. cgi bestanden
In de `.cgi` bestanden wordt simplejson geïmporteerd als json. 
Dit gebeurt doordat json niet werkt op mijn systeem (In elk programma geeft hij de foutmelding: `AttributeError: module ‘json’ has no attribute ‘loads’`). 
Het kan zijn dat simplejson niet werkt, dan moet u `import simplejson as json` vervangen door `import json` in zowel [buttonpressed.cgi](cgi-bin/buttonpressed.cgi) 
als [firstpattern.cgi](cgi-bin/firstpattern.cgi).

Ik had u hierover al aangesproken na de evaluatie, u zei toen dat simplejson oké zou moeten zijn. Normaal gezien zou er dus niets moeten aangepast worden.

### 2. [spel.py](cgi-bin/spel.py)

Het `spel.py` script gebruikt in plaats van de originele woordenlijst een nieuwe woordenlijst met dezelfde woorden maar 
gesorteerd op lengte. 
Wanneer een knop ingeduwd wordt moet het script hierdoor enkel de lijst tot een woord dat langer is dan het patroon overlopen. 
Dit zorgt dus veel een redelijk grote optimalisatie.

### 3. [index.js](index.js)

Bij het js script zijn er 3 kleine opmerkingen. 

De eerste is dat er globale variabelen gebruikt worden. Eerst haalde ik mijn data
op op basis van wat er in de html zat. Ik heb eindelijk toch gekozen om globale variabelen aan te maken omwille van de snelheidsoptimalisatie.

De tweede is dat de `const assert = require('assert')` niet werkte in de browser. 
Ik heb dus zelf een methode aangemaakt die hiervoor zorgt. (Deze methode staat op het einde van het bestand.)

De laatste opmerking is dat als mijn json een error object teruggeeft, ik de error ook effectief throw. Het was niet meteen duidelijk
of dit de bedoeling was dus ben ik gaan kijken naar wat andere sites deden en heb dan op basis daarvan een keuze gemaakt.

### 4. html en css

Voor het uiterlijk wordt er in plaats van de meegegeven afbeeldingen gebruikt gemaakt van css en html divs om het galgje op te stellen.
Ik heb hiervoor gekozen omwille van de styling van mijn project.


