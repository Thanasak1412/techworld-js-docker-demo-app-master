const express = require("express");
const path = require("path");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const app = express();

const PORT = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/profile-picture", function (req, res) {
  const img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
});

// use when starting application locally
const mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
const mongoUrlDocker = "mongodb://admin:password@mongodb";

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// "user-account" in demo with docker. "my-db" in demo with docker-compose
const databaseName = "my-db";

app.post("/update-profile", function (req, res) {
  const userObj = req.body;

  MongoClient.connect(
    mongoUrlDocker,
    mongoClientOptions,
    function (err, client) {
      if (err) throw err;

      const db = client.db(databaseName);
      userObj["userid"] = 1;

      const myquery = { userid: 1 };
      const newvalues = { $set: userObj };

      db.collection("users").updateOne(
        myquery,
        newvalues,
        { upsert: true },
        function (err, res) {
          if (err) throw err;
          client.close();
        }
      );
    }
  );
  // Send response
  res.send(userObj);
});

app.get("/get-profile", function (_, res) {
  // Connect to the db
  MongoClient.connect(
    mongoUrlDocker,
    mongoClientOptions,
    function (err, client) {
      if (err) throw err;

      const db = client.db(databaseName);

      const myquery = { userid: 1 };

      db.collection("users").findOne(myquery, function (err, result) {
        if (err) throw err;
        const response = result;
        client.close();

        // Send response
        res.send(response ? response : {});
      });
    }
  );
});

app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}!`);
});
