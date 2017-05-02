'use strict';

require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const {
    MongoClient
} = require('mongodb');

const app = express();
const port = process.env.PORT || 80;
const dbAddress = `mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@ds129031.mlab.com:29031/fcc-image-search`;

app.get('*', (req, res) => {
  MongoClient.connect(dbAddress, (err, db) => {
    if (err) {
      console.log(err);
    } else {
      
    }
  });

  res.end("TODO: Show homepage and some recent results.");
});



app.listen(port, () => {
    console.log(chalk.yellow(`Listening on port: ${port}`));
});
