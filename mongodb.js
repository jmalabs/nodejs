const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const dbConfig = require("./config/db.config");

// Database configs
const database = "task-manager";
console.log(dbConfig);
// Connect to database.
connect(dbConfig.connectionString, database);

async function connect(connectionURL, database) {
  try {
    const client = await MongoClient.connect(connectionURL);

    console.log("Connected successfully!");

    const db = client.db(database);
    db.collection("users").insertOne(
      {
        _id: new ObjectId(),
        name: "John",
        age: 30,
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert new user.");
        }

        console.log(result);
      }
    );
  } catch (error) {
    console.log("Failed to connect!");
  }
}
