'use strict';

require('dotenv').config();
const express = require('express');
// const router = express.Router();
const chalk = require('chalk');
const {
    MongoClient
} = require('mongodb');
const moment = require('moment');

const app = express();
const hbs = require('hbs');

app.set('view engine', 'hbs');

const port = process.env.PORT || 80;
const dbAddress = `mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@ds129031.mlab.com:29031/fcc-image-search`;

app.get('/', (req, res) => {
  MongoClient.connect(dbAddress, (err, db) => {
    if (err) {
      console.log(err);
    } else {
      //TODO: pass recent searches
      res.render('index.hbs');
    }
  });
});

app.get('/api/imagesearch/:str', (req, res) => {
  res.end("test");
  console.log(req.params);
  console.log(req.query);

  // save to database
  MongoClient.connect(dbAddress, (err, db) => {
    if (err) {
      console.log(err);
    } else {

      const formattedSearch = {
        'search_string' : req.params.str,
        'timestamp' : parseInt(moment().format('x'))
      };

      db.collection('searchs').insertOne(formattedSearch).then((doc) => {
        console.log(doc.ops);
      });
    }
  });



  // get and display results
});

app.get('/api/latest/imagesearch/', (req, res) => {
  MongoClient.connect(dbAddress, (err, db) => {
    if (err) {
      console.log(err);
    } else {
      db.collection('searchs').find()
        .sort({'timestamp': -1})
        .limit(10)
        .toArray()
        .then((doc) => {

        let results = [];

        for (let i = 0; i < doc.length; i++) {
          console.log(doc[i]);
          results.push({
            'search_string' : doc[i].search_string,
            'timestamp' : moment(doc[i].timestamp).format()
          });
        }
        console.log(doc.length);
        res.send(results);
      });
    }
  });
});

app.listen(port, () => {
    console.log(chalk.yellow(`Listening on port: ${port}`));
});
