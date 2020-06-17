const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// const csvtojson = require("csvtojson");

// csvtojson()
//   .fromFile("general.csv")
//   .then(csvData => {
//     console.log(csvData);

//   });

//   const fs = require("fs");
// const fastcsv = require("fast-csv");

// let stream = fs.createReadStream("general.csv");
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on("data", function(data) {
//     csvData.push({
//       id: data[0],
//       name: data[1],
//       description: data[2],
//       createdAt: data[3]
//     });
//   })
//   .on("end", function() {
//     // remove the first line: header
//     csvData.shift();

//     // save to the MongoDB database collection
//   });

// stream.pipe(csvStream);

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require("./app/routes/tutorial.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});