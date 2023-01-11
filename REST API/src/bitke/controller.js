const moment = require("moment/moment")
const pool = require("../../db")
const queries = require("./queries")
var path = require("path")
var fs = require('fs')

function getStandardResponse(status, message, response){
    return {
        status: status,
        message : message,
        response : response
     }
}

function getStandardResponseAll(status, message, response){

    for(let i in response){
        ime = response[i]["imeLokacije"]
        sirina = response[i]["širina"]
        duzina = response[i]["dužina"]
        zemlja = response[i]["zemljaid"]
        postanskibroj = response[i]["poštanskibroj"]
        delete response[i]["širina"]
        delete response[i]["dužina"]
        delete response[i]["zemljaid"]
        delete response[i]["poštanskibroj"]
        response[i]["@context"] = {
                "location": "https://schema.org/GeoCoordinates",
                "@vocab": "https://schema.org/",
                "addressCountry": "zemljaid",
                "postalCode": "poštanskibroj",
                "name":"imeLokacije",
                "latitude":"širina",
                "longitude":"dužina"}
        response[i]["location"] = {
            "zemljaid": zemlja,
            "imeLokacije": ime,
            "poštanskibroj": postanskibroj,
            "dužina": duzina,
            "širina": sirina}

    }

    return {
        status: status,
        message : message,
        response : response
     }
}

const getBitke = (req, res) => {
    pool.query(queries.getBitke, (error, results) => {
        if(error) throw error
        res.status(200).json(getStandardResponseAll("OK", "Dohvat svih bitki", results.rows))
    })
}

const getBitkaById = (req, res) => {
    const id = (req.params.id)

    if(!moment(id, "DD-MM-YYYY", true).isValid)
        res.status(406).json(getStandardResponse("Not Acceptable", "Upišite pravilan datum.", null))

    pool.query(queries.getBitkaById, [id], (error, results) => { try{
        if(error) throw error
        
        const nemaBitke = !(results.rows.length)
        if(nemaBitke) {
            res.status(404).json(getStandardResponse("Not Found", "Unijeli ste datum za bitku koja ne postoji.", null))
        }
        else {res.status(200).json(getStandardResponse("OK", "Dohvat bitke.", results.rows))}
        } catch (error) {
            res.status(400).json(getStandardResponse("Bad Request","Niste upisali datum u obliku DD-MM-YYYY.", null))
        }
    })
}

const addBitka = (req, res) => {
    const { datum, pobjednik, sudionici, voditeljpobjednika, tijekomkojekoalicije, trajanjeudanima, ukupnoranjenihmrtvih, ime, lokacijaid} = req.body

    //provjeri datum postoji li ta bitka
    pool.query(queries.provjeriDatum, [datum], (error, results) => { try{
        if(results.rows.length) {
            res.status(400).json(getStandardResponse("Bad Request", "Bitka za taj datum je već unesena.", null))}} catch (error) {res.status(400).json(getStandardResponse("Bad Request", "Niste upisali datum u obliku DD-MM-YYYY.", null))}

        //dodaja bitke
        pool.query(queries.dodajBitku, [datum, pobjednik, sudionici, voditeljpobjednika, tijekomkojekoalicije, trajanjeudanima, ukupnoranjenihmrtvih, ime, lokacijaid], (error, results) =>{ try{
            if(error) throw error
            res.status(201).json(getStandardResponse("Created", "Bitka je dodana u bazu.", results.rows))} catch (error) {res.status(400).json(getStandardResponse("Bad Request", "Niste upisali valjane podatke u odgovarajuća polja.", null))}
        })
    })
        
}

const removeBitka = (req, res) =>{
    const id = (req.params.id)
    
    pool.query(queries.getBitkaById, [id], (error, results) =>{ try{
        const nemaBitke = !(results.rows.length)
        if(nemaBitke) {
        res.status(400).json(getStandardResponse("Bad request", "Bitka s tim datumom ne postoji.", null))}} catch (error) {res.status(400).json(getStandardResponse("Bad Request", "Niste upisali datum u obliku DD-MM-YYYY.", null))}
    

    pool.query(queries.removeBitka, [id], (error, results) =>{
        if(error) throw error
        res.status(200).json(getStandardResponse("OK", "Bitka uspješno izbrisana iz baze.", null))
    })
    })
}

const getEgypt = (req, res) => {
    pool.query(queries.getEgypt, (error, results) => {
        if(error) throw error
        res.status(200).json(getStandardResponse("OK", "Dohvat svih bitki u Egiptu", results.rows))
    })
}

const getVictorNotFrance = (req, res) => {
    pool.query(queries.getVictorNotFrance, (error, results) => {
        if(error) throw error
        res.status(200).json(getStandardResponse("OK", "Dohvat svih bitki u kojima pobjednik nije Francuska", results.rows))
    })
}

const getViseDana = (req, res) => {
    pool.query(queries.getViseDana, (error, results) => {
        if(error) throw error
        res.status(200).json(getStandardResponse("OK", "Dohvat svih bitki koje su trajale više dana.", results.rows))
    })
}

const openapi = (req, res) => {
    var data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'openapi.json'), 'utf8'));
    res.status(200).json(getStandardResponse("OK", "Dohvat OpenAPI dokumentacije", data))
}

const putBitkaById = (req, res) => {
    const id = (req.params.id)
    const { datum, pobjednik, sudionici, voditeljpobjednika, tijekomkojekoalicije, trajanjeudanima, ukupnoranjenihmrtvih, ime, lokacijaid} = req.body

    //provjeri datum postoji li ta bitka
    pool.query(queries.provjeriDatum, [id], (error, results) => { 
        if(!results.rows.length) {
            res.status(400).json(getStandardResponse("Bad Request", "Bitka za taj datum ne postoji.", null))}
            
        //azuriranje bitke
        else(pool.query(queries.azurirajBitku, [datum, pobjednik, sudionici, voditeljpobjednika, tijekomkojekoalicije, trajanjeudanima, ukupnoranjenihmrtvih, ime, lokacijaid, id], (error, results) =>{ try{
        if(error) throw error
        res.status(200).json(getStandardResponse("OK", "Bitka je ažurirana u bazi.", results.rows))} catch (error) {res.status(400).json(getStandardResponse("Bad Request", "Niste upisali valjane podatke u odgovarajuća polja.", null))}
    }))
    })
        
}


module.exports = {
    getBitke,
    getBitkaById,
    addBitka,
    removeBitka,
    getEgypt,
    getVictorNotFrance,
    getViseDana,
    openapi,
    putBitkaById
}