const express = require('express')
const path = require('path');
const app = express()
const port = 3000;

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
})

app.get('/datatable', (req, res) =>{
    res.sendFile(path.join(__dirname, '../Frontend/datatable.html'));
})


app.listen(port, () =>{
    console.log('Server sluša na port', port)
})