const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

// Database configs
const connectionURL =
  "mongodb://dbAdmin:password123@127.0.0.1:27017/?authSource=admin";
const database = "task-manager";

// Connect to database.
connect(connectionURL, database);

async function connect(connectionURL, database) {
  try {
    const client = await MongoClient.connect(connectionURL);

    console.log("Connected successfully!");

    const db = client.db(database);
    db.collection("users").insertOne(
      {
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
// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true },
//   (error, client) => {
//     if (error) {
//       return console.log("Unable to connect to database");
//     }

//     const db = client.db(database);
//     db.collection("users").insertOne({
//       name: "John",
//       age: 30,
//     });
//   }
// );
