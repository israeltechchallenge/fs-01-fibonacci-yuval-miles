const { MongoClient } = require("mongodb");

const dbUrl = "mongodb://localhost:27017/fib";
const client = new MongoClient(dbUrl);

const connectToDB = async () => {
  try {
    console.log("Connecting to db...");
    await client.connect();
    await client.db("fib").command({ ping: 1 });
    console.log("Connected to db server");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { client, connectToDB };
