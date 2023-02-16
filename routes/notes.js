const routeNote = require('express').Router(); //router function
const utility = require('../js-server/utility');
const fs = require ('fs');
const path = require('path');



//get /api/notes
routeNote.get('/', (req, res) => {
  
  utility.readFile("../db", "db.json").then ((data) => {
    
    res.json(data);
  });
  
});


//delete /api/notes:id
routeNote.delete('/:id', (req, res) => {
  
  const deleteId = req.params.id;

  
  if (deleteId != "" && deleteId != undefined)
  {
    utility.readFile("../db", "db.json").then ((data) => {

      const loadedData = JSON.parse(data);
  
      const filterData = loadedData.filter(entry => entry.id != deleteId); //must use != operate to remove the that item if using filter function
        //console.log (filterData);

      utility.saveFile (JSON.stringify (filterData), "../db", "db.json").then ((data) => {
  
  
        if (data.indexOf ("success") !== false)
        {
          //console.log ("deleteId:" +  deleteId);
          
          const response = {
            status: 'success',
            body: data,
          };
        
          //console.log(response);
          res.status(201).json(response);
    
        } else {
          res.status(500).json('Error in deleting entry');
        }
  
  
      })
      
    });
  }
});


//post /api/notes
routeNote.post('/', (req, res) => {
  //console.log('Got body:', req.body);

  utility.readFile("../db", "db.json").then ((data) => {

    loadedData = JSON.parse(data);

    const {title, text} = req.body;
    loadedData.push ({id: utility.uuid (), title: title, text:text});

    utility.saveFile (JSON.stringify (loadedData), "../db", "db.json").then ((data) => {

      //console.log(data);



      if (data.indexOf ("success") !== false)
      {
        const response = {
          status: 'success',
          body: data,
        };
      
        //console.log(response);
        res.status(201).json(response);
  
      } else {
        res.status(500).json('Error in posting review');
      }


    })
    
  });
});


module.exports = routeNote;
