const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


// use app
const app = express()

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req,res) => {
    res.send("hello world")
})

app.listen(process.env.PORT || 5000);