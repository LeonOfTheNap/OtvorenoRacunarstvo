const express = require('express')
const routes = require("./src/bitke/routes")
const morgan = require("morgan")
const { fn } = require('moment')

const app = express()
const port = 3000

app.use(morgan('dev'))

app.use(express.json())
app.use("/api/v1/bitke", routes)

app.use((req, res, next) => {
    if(req.method == "GET")
    res.status(404).json({
    status: "Not Found",
    message: "Resurs na tom link ne postoji",
    response: null
    })
    else
    res.status(405).json({
    status: "Method Not Allowed",
    message: "Ova metoda se ne smije izvoditi na ovom resursu",
    response: null
    })
})

app.listen(port, () => console.log(`Server je pokrenut na portu ${port}`))
