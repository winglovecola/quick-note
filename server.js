const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.port || 3001;
const path = require('path');
const fs = require ('fs');
const utility = require('./js-server/utility');


// Serve images, css files, js files from the public directory
// Allows us to reference files with their relative path
// Example: http://localhost:3000/images/cat.jpg


const app = express();
app.use(express.static('public'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  
  utility.readFile("..\\db", "db.json").then ((data) => {
    
    res.json(data);
  });
  
});

app.delete('/api/notes/:id', (req, res) => {
  
  const deleteId = req.params.id;

  
  if (deleteId != "" && deleteId != undefined)
  {
    

    utility.readFile("..\\db", "db.json").then ((data) => {

      const loadedData = JSON.parse(data);
  
      const filterData = loadedData.filter(entry => entry.id != deleteId); //must use != operate to remove the that item if using filter function
  console.log (filterData);

      utility.saveFile (JSON.stringify (filterData), "..\\db", "db.json").then ((data) => {
  
  
        if (data.indexOf ("success") !== false)
        {
          console.log ("deleteId:" +  deleteId);
          
          const response = {
            status: 'success',
            body: data,
          };
        
          console.log(response);
          res.status(201).json(response);
    
        } else {
          res.status(500).json('Error in deleting entry');
        }
  
  
      })
      
    });
  
  }
});


app.post('/api/notes', (req, res) => {
  console.log('Got body:', req.body);

  utility.readFile("..\\db", "db.json").then ((data) => {

    loadedData = JSON.parse(data);

    const {title, text} = req.body;
    loadedData.push ({id: utility.uuid (), title: title, text:text});

    utility.saveFile (JSON.stringify (loadedData), "..\\db", "db.json").then ((data) => {

      console.log(data);



      if (data.indexOf ("success") !== false)
      {
        const response = {
          status: 'success',
          body: data,
        };
      
        console.log(response);
        res.status(201).json(response);
  
      } else {
        res.status(500).json('Error in posting review');
      }


    })
    
  });

  

});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.listen(PORT, () =>{
  console.log(`Example app listening at http://localhost:${PORT}`);
});
