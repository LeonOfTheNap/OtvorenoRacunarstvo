const pool = require("../../db")
const queries = require("./queries")

const getBitke = (req, res) => {
    pool.query(queries.getBitke, (error, results) => {
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

const getBitkaById = (req, res) => {
    const id = (req.params.id)
    pool.query(queries.getBitkaById, [id], (error, results) => {
        if(error) throw error
        
        const nemaBitke = !(results.rows.length)
        if(nemaBitke) {
            res.status(404).send("Unijeli ste datum za bitku koja ne postoji.")
        }

        res.status(200).json(results.rows)
    })
}

const addBitka = (req, res) => {
    const { datum, pobjednik, sudionici, voditeljpobjednika, tijekomkojekoalicije, trajanjeudanima, ukupnoranjenihmrtvih, ime, lokacijaid} = req.body

    //provjeri datum postoji li ta bitka
    pool.query(queries.provjeriDatum, [datum], (error, results) => {
        if(results.rows.length) {
            res.send("Bitka za taj datum je već unesena.")
        }

        //dodaja bitke
        pool.query(queries.dodajBitku, [datum, pobjednik, sudionici, voditeljpobjednika, tijekomkojekoalicije, trajanjeudanima, ukupnoranjenihmrtvih, ime, lokacijaid], (error, results) =>{
            if(error) throw error
            res.status(201).send("Bitka je dodana u bazu.")
        })
    })
        
}

const removeBitka = (req, res) =>{
    const id = (req.params.id)
    
    pool.query(queries.getBitkaById, [id], (error, results) =>{
        const nemaBitke = !(results.rows.length)
        if(nemaBitke) {
        res.send("Bitka s tim datumom ne postoji.")
    }

    pool.query(queries.removeBitka, [id], (error, results) =>{
        if(error) throw error
        res.status(200).send("Bitka uspješno izbrisana iz baze.")
    })
    })
}

module.exports = {
    getBitke,
    getBitkaById,
    addBitka,
    removeBitka
}