// Use asigned environment post, otherwise use 3000
const port = process.env.PORT || 3000

const MongoClient    = require('mongodb').MongoClient;
const db = require('./config/db');

const express = require('express');
const app = express();

app.use(express.json());

MongoClient.connect(db.url, (error, database) => {
    if(error) return console.log(error)
    require('./app/routes')(app, database)
    app.listen(port, () => {
      console.log(`Listening to ${port} ...`)
    });
  })