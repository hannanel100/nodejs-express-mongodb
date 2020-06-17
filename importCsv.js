const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const csvFolder = "./csv";
const fs = require("fs");
let url = "mongodb://localhost:27017/";

let nameArray = [];
let collectionNames = [];
const getCollectionNames = (err, client) => {
 
      if (err) throw err;
      let db = client.db("specifications");
      let names =[];
      db.listCollections(null, {nameOnly: true}).toArray(function (err, collectionInfos) {
        let collectionNames = collectionInfos.map(collection => {
          return collection.name;
        })
        client.close();
        console.log(collectionNames)
        return collectionNames
    })
    
  
}
fs.readdir(csvFolder, (err, files) => {
  files.forEach((file) => {
    let name = file.split(".")[0];
    nameArray.push(name);
  });
  mongodb.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },(err, client)=> getCollectionNames(err, client) )

  uploadToDb(nameArray);
});

// let url = "mongodb://username:password@localhost:27017/";

const uploadToDb = (nameArray) => {
  nameArray.forEach((name) => {
        csvtojson()
      .fromFile(`./csv/${name}.csv`)
      .then((csvData) => {
        // mongodb.connect(
        //   url,
        //   { useNewUrlParser: true, useUnifiedTopology: true },
        //   (err, client) => {
        //     if (err) throw err;
        //     let db = client.db("specifications");
        //     db.listCollections(null, {nameOnly: true}).toArray(function (err, collectionInfos) {
        //       console.log(collectionInfos);
        //       client.close();
        //   });
        //     // .collection(name)
        //     // .insertMany(csvData, (err, res) => {
        //     //   if (err) throw err;

        //     //   console.log(`Inserted: ${res.insertedCount} rows`);
        //     // client.close();
        //   }
        // );
      });
  });
}
