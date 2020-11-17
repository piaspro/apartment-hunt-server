const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

// pass: uJHArSG7Zz6ruhs;
// use app
const app = express()

app.use(bodyParser.json());
app.use(cors())

const uri = "mongodb+srv://apartmentUser:uJHArSG7Zz6ruhs@cluster0.z0xlc.mongodb.net/apartmentDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
  const apartmentBookingCollection = client.db("apartmentDb").collection("apartmentBooking");
  console.log("connected")
  // Add Request booking
  app.post('/addRequest', (req, res) => {
    const userInfo = req.body
    console.log(userInfo)
    apartmentBookingCollection.insertOne(userInfo)
      .then(result => {
        console.log(result);
        res.send(result.insertedCount > 0)
      })

    // Show Services in the home page
    app.get('/getBookings', (req, res) => {
      apartmentBookingCollection.find({})
        .toArray((err, documents) => {
          res.send(documents)
        })
    });
    
  });

  app.get('/', (req, res) => {
    res.send("connected")
  });
});


app.listen(process.env.PORT || 5000);