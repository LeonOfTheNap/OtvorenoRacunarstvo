const getBitke = "SELECT * FROM bitka NATURAL JOIN lokacija"
const getBitkaById = "SELECT * FROM bitka WHERE datum = $1"
const provjeriDatum = "SELECT b FROM bitka b WHERE b.datum = $1"
const dodajBitku = "INSERT INTO bitka (datum, pobjednik, sudionici, voditeljpobjednika, tijekomkojekoalicije, trajanjeudanima, ukupnoranjenihmrtvih, ime, lokacijaid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);"
const removeBitka = "DELETE FROM bitka WHERE datum = $1"
const azurirajBitku = "UPDATE bitka SET datum = $1, pobjednik = $2, sudionici = $3, voditeljpobjednika = $4, tijekomkojekoalicije = $5, trajanjeudanima = $6, ukupnoranjenihmrtvih = $7, ime = $8, lokacijaid = $9 WHERE datum = $10;"
const getEgypt = "SELECT * FROM bitka NATURAL JOIN lokacija WHERE zemljaid = 'EGY'"
const getVictorNotFrance = "SELECT * FROM bitka WHERE pobjednik != 'FRA'"
const getViseDana = "SELECT * FROM bitka WHERE trajanjeudanima > 1"

module.exports = {
    getBitke,
    getBitkaById,
    provjeriDatum,
    dodajBitku,
    removeBitka,
    getEgypt,
    getVictorNotFrance,
    getViseDana,
    azurirajBitku
}