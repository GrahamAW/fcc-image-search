'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const {
    MongoClient
} = require('mongodb');

const app = express();
const port = process.env.PORT || 80;
const dbAddress = `mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@ds129031.mlab.com:29031/fcc-image-search`;

app.get('/', (req, res) => {
  MongoClient.connect(dbAddress, (err, db) => {
    if (err) {
      console.log(err);
    } else {

    }
  });

  res.end("TODO: Show homepage and some recent results.");
});

app.get('/api/imagesearch/:str', (req, res) => {
  res.end("test");
  console.log(req.params);
  console.log(req.query);
});

app.get('/api/latest/imagesearch/', (req, res) => {
  res.end("TODO: display image search lastest requests.");
})

app.listen(port, () => {
    console.log(chalk.yellow(`Listening on port: ${port}`));
});
