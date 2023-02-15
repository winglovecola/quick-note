const fs = require ('fs');
const path = require('path');


function uuid () {

    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1) + "-" + Math.floor(new Date().getTime() / 1000);

}



const readFile = (dir, filename) =>
  new Promise((resolve, reject) => {
    //read file
    let currentDir = path.join(__dirname, dir);
    let filePath = currentDir + "\\" + filename;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            reject(new Error(err));
        }
        else
        {
            resolve(data);
        }

      });

  });




  const saveFile = (data, dir, filename) =>
    new Promise((resolve, reject) => {
    //create directory
    let currentDir = path.join(__dirname, dir);

    fs.mkdir(currentDir, { recursive: true }, (err) => {
        if (err)
        {
            reject('Failed to save to database\n\n' + err);
        }
        else
        {
            //save file
            let filePath = currentDir + "\\" + filename;

            fs.writeFile(filePath, data, (err) => {
                err ? reject('Failed to save to database\n\n' + err) : resolve('Successfully saved to database:\n\n' + filePath);
            });
        }
    });

    
  });


module.exports = {uuid, readFile, saveFile}; 