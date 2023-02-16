const express = require('express');
const routeNotes = require('./notes');

const app = express();

//use notes route
app.use('/notes', routeNotes);

module.exports = app;
