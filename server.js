const express = require('express');
const routeIndex = require('./routes/index.js');
const path = require('path');

//port for heroku || local
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api', routeIndex);

app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);



//wild card, any url other than notes will redirect back to index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.listen(PORT, () =>{
  console.log(`Example app listening at http://localhost:${PORT}`);
});
