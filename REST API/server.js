const express = require('express')
const routes = require("./src/bitke/routes")
const morgan = require("morgan")

const app = express()
const port = 3000

app.use(morgan('dev'))

app.use(express.json())
app.use("/api/v1/bitke", routes)

app.use((req, res, next) => {
    res.status(404).send({
    status: 404,
    error: "Not found"
    })
})

app.listen(port, () => console.log(`Server je pokrenut na portu ${port}`))
