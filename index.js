'use strict';

require('dotenv').config();
const express = require('express');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 80;

app.get('*', (req, res) => {
  res.end("Hello");
});

app.listen(port, () => {
    console.log(chalk.yellow(`Listening on port: ${port}`));
});
