const express = require('express');

const routeNotes = require('./notes');

const app = express();

app.use('/notes', routeNotes);

module.exports = app;
