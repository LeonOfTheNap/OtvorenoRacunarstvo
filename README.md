# OtvorenoRacunarstvo

## Autor
Mario Petar Bišćan

## Opis licence
Radi se o _CC0 1.0 Universal_ licenci koja zapravo dopušta da se ovi materijali koriste kako god tko želi, bez nužnosti da me se navodi kao autora. https://creativecommons.org/publicdomain/zero/1.0/

## Verzija dokumenta
1.0

## Napomena
Preporučam kopirati JSON u https://codebeautify.org/jsonviewer i stisnuti *Beautify* da se vidi cijela forma.

## Jezik podataka
Hrvatski (za zemljaID podatak se koriste internacionalne skraćenice).

## Opis podataka


## Lokacija
#### ZemljaID
Oznaka (VarChar(3)) koja govori u kojoj se **današnjoj** državi lokacija nalazi.

Slijedi objašnjenje svih kratica:
- AUS = Austrija
- BEL = Belgija
- CZE = Češka
- EGY = Egipat
- FRA = Francuska
- GER = Njemačka
- ITA = Italija
- POR = Portugal
- RUS = Rusija

#### ImeLokacije
Ime lokacije (VarChar(100)).

#### LokcaijaID
Oznaka (INT) koja specificira o kojoj se lokaciji govori.

#### Širina
Oznaka (INT) koja specificira na kojoj geografskoj širini se nalazi lokacija.

#### Dužina
Oznaka (INT) koja specificira na kojoj geografskoj dužini se nalazi lokacija.

#### PoštanskiBroj
Oznaka (INT) koja statira poštanski broj lokacije.

#### UIstojDržavi
Oznaka (BOOL) koja specificira nalazi li se lokacija u istoj državi kao i onda kada se bitka odbila (ukoliko te države tada nije postojalo, vrijednost je tada FALSE).

#### Spomenik
Oznaka (BOOL) koja govori postoji li spomenik na lokaciji koji komemorira samu bitku.

#### DrugeBitke
Oznaka (BOOL) koja govori jesu li se na ovoj lokaciji u povijesti dogodile još neke bitke.

#### ZračnaUdaljenostOdZG
Oznaka (INT) koja specificira zračnu udaljenost lokacije od Zagreb.

## Bitka
#### Datum
Datum (date) koji govori kada se bitka odvila/kada se krenula odvijati (ukoliko je trajala nekoliko dana). U formatu YYYY-MM-DD.

#### Pobjednik 
Oznaka (VarChar(3)) koja govori koja zemlja je bila pobjednička u bitci. Ukoliko piše _NUL_ znači da je bitka završila neriješeno.

#### Sudionici
Oznaka (VarChar(40)) koja govori koje zemlje su se borile protiv koje. U formatu `XXX VS YYY` gdje je jedna strana *XXX*, a druga *YYY*. 

Slijedi objašnjenje svih kratica:
- AUS = Austrija
- FRA = Francuska
- MAM = Mamluci
- OTT = Osmansko Cartsvo
- POR = Portugal
- PRU = Prusija
- RUS = Rusija
- UK = Ujedinjeno Kraljestvo

#### VoditeljPobjednika
Oznaka (VarChar(100)) koja daje ime i prezime generla pobjedničke strane.

#### TijekomKojeKoalicije
Oznaka (INT) koja govori tijekom koje koalicije se odvila bitka. Ukoliko je oznaka `0` znači da se odvila u sklopu nekog drugog rata/kampanje.

#### TrajanjeUDanima
Oznaka (INT) koja govori koliko je dana trajala bitka.

#### UkupnoRanjenihMrtvih
Oznaka (INT) koja govori koliko je sveukupno bilo ranjenih i mrtvih ljudi s obje strane (uključujući i nestale).

#### Ime
Ime bitke (VarChar(100)) koje ne mora nužno odgovarati imenu samog mjesta.

#### LokacijaID
Oznaka (INT) koja specificira o kojoj se lokaciji govori. (U ovom slučaju ovdje služi kao *Foreign Key*)

## Shell komande za ispis

koristeći psql i database kao: napoleonskeBitke
- CSV: \copy (SELECT * FROM lokacija NATURAL JOIN bitka) TO 'C:\Users\MPB\Documents\SQL\napoleonskeBitke_db.csv' DELIMITER ',' CSV HEADER;     
- JSON: \copy (SELECT array_to_json(array_agg(row_to_json(t)))FROM (SELECT *,(select array_to_json(array_agg(row_to_json(d))) FROM (SELECT datum, pobjednik, sudionici, voditeljpobjednika, tijekomkojekoalicije, trajanjeudanima, ukupnoranjenihmrtvih, ime FROM bitka WHERE lokacijaid=lokacija.lokacijaid ORDER BY datum ) d) AS bitke FROM lokacija) t) TO 'C:\Users\MPB\Documents\SQL\napoleonskeBitke_db.json'
