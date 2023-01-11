const express = require('express')
var path = require("path")
const routes = require("./src/bitke/routes")
const morgan = require("morgan")
const { fn } = require('moment')
const pool = require("./db")
const queries = require("./src/bitke/queries.js")
const { auth } = require('express-openid-connect')
var zip = require('express-zip')
const { requiresAuth } = require('express-openid-connect')
const { json } = require('body-parser')
var fs = require('fs')
const converter = require('json-2-csv')
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: '4e17bc32acde0a58875157d9e66a46dbcbedc61a1d89df988c883adbe0c8d52d',
    baseURL: 'http://localhost:3000',
    clientID: 'Sy7g3dz7A8fIweR46JzG0h7iUlCEuPfj',
    issuerBaseURL: 'https://dev-6t7cdh80mlo0yn31.eu.auth0.com'
  };



const app = express()
const port = 3000
app.set("view engine", "ejs")

app.use(morgan('dev'))
app.use(express.json())
app.use("/api/v1/bitke", routes)


app.use(auth(config))
app.get('/', (req, res) => {
    res.render(req.oidc.isAuthenticated() ? "homepage": "login");
  });

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

app.get('/dohvatcsvjson', (req, res) =>{


    pool.query(queries.getBitke, (error, results) => {
        if(error) throw error

        data = JSON.stringify(results.rows);
        var obj = JSON.parse(data);
        var content = JSON.stringify(obj);

        fs.writeFileSync('bitka.json',content)

    })
    pool.query(queries.getBitke, (error, results) => {
      if(error) throw error

        data = JSON.stringify(results.rows);
        var obj = JSON.parse(data);

        converter.json2csv(obj, (err, csv) => {
          if (err) {
            throw err
          }

          console.log(csv)
          fs.writeFileSync('bitka.csv', csv)
          
          res.zip([
            { path: path.join(__dirname, 'bitka.json'),
                name: 'bitka.json'},
            { path: path.join(__dirname, 'bitka.csv'),
                name: 'bitka.csv'},
          ])
        });
        

        })
})

function konvertiraj(mojKontent){
  meow = csvjson.toCSV(mojKontent, {headers: 'key'})

    return meow
}
// app.use((req, res, next) => {
//     if(req.method == "GET")
//     res.status(404).json({
//     status: "Not Found",
//     message: "Resurs na tom link ne postoji",
//     response: null
//     })
//     else
//     res.status(405).json({
//     status: "Method Not Allowed",
//     message: "Ova metoda se ne smije izvoditi na ovom resursu",
//     response: null
//     })
// })

app.listen(port, () => console.log(`Server je pokrenut na portu ${port}`))
