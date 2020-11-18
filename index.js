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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER}@cluster0.z0xlc.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`;
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

    // Show Bookings
    app.get('/getBookings', (req, res) => {
      apartmentBookingCollection.find({})
        .toArray((err, documents) => {
          res.send(documents)
        })
    });

    // Update status
    app.patch('/update/:id', (req, res) => {
      UserServiceCollection.updateOne({ _id: ObjectId(req.params.id) },
        {
          $set: { project: req.body.project }
        })
        .then(result => {
          console.log(result)
          res.send(result.modifiedCount > 0)
        })
    });

  });

  app.get('/', (req, res) => {
    res.send("Connected")
  })
});




app.listen(process.env.PORT || 5000);