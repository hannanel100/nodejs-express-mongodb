const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const csvFolder = './csv';
const fs = require('fs');
let url = "mongodb://localhost:27017/";

let nameArray = [];
fs.readdir(csvFolder, (err, files) => {
  files.forEach(file => {
    let name = file.split(".")[0];
    nameArray.push(name)
    
  });
  uploadToDb(nameArray)
});


// let url = "mongodb://username:password@localhost:27017/";

const uploadToDb = (nameArray) => {
    nameArray.forEach((name)=> {
        console.log(name)
        csvtojson()
        .fromFile(`./csv/${name}.csv`)
        .then(csvData => {
          console.log(csvData);
      
          mongodb.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
              if (err) throw err;
      
              client
                .db("specifications")
                .collection(name)
                .insertMany(csvData, (err, res) => {
                  if (err) throw err;
      
                  console.log(`Inserted: ${res.insertedCount} rows`);
                  client.close();
                });
            }
          );
        });
    })

}
