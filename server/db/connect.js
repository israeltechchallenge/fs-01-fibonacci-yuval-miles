const { MongoClient, ServerApiVersion } = require("mongodb");
const { injectConnection } = require("../controllers/controllers");

const dbUrl = "mongodb://localhost:27017/fib";
const remoteDBUrl =
  "mongodb+srv://yuvalmiles:4tvNmRrjOpMiIcJw@nodeexpressprojects.pasml.mongodb.net/?retryWrites=true&w=majority";
let client = new MongoClient(dbUrl);

const connectToDB = async () => {
  try {
    console.log("Connecting to db...");
    await client.connect();
    injectConnection(client);
    await client.db("fib").command({ ping: 1 });
    console.log("Connected to db server");
  } catch (err) {
    if (err.name === "MongoServerSelectionError") await connectToRemoteDB();
    else throw err;
  }
};

const connectToRemoteDB = async () => {
  client = new MongoClient(remoteDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  try {
    await client.connect();
    injectConnection(client);
    await client.db("fib").command({ ping: 1 });
    console.log("Connected to db remote server");
  } catch (err) {
    throw err;
  }
};

module.exports = { connectToDB };
