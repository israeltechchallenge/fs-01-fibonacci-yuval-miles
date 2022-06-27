const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./routes/router");
const { connectToDB } = require("./db/connect");

app.use(cors());
app.use("/", express.static(__dirname + "/public"));
app.use("/", router);

const port = 5050;

app.listen(port, async () => {
  await connectToDB();
  console.log(`Server listing on port: ${port}`);
});
