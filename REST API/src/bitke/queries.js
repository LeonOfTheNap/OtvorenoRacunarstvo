const getBitke = "SELECT * FROM bitka";
const getBitkaById = "SELECT * FROM bitka WHERE datum = $1"
const provjeriDatum = "SELECT b FROM bitka b WHERE b.datum = $1"
const dodajBitku = "INSERT INTO bitka (datum, pobjednik, sudionici, voditeljpobjednika, tijekomkojekoalicije, trajanjeudanima, ukupnoranjenihmrtvih, ime, lokacijaid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);"
const removeBitka = "DELETE FROM bitka WHERE datum = $1"

module.exports = {
    getBitke,
    getBitkaById,
    provjeriDatum,
    dodajBitku,
    removeBitka
}