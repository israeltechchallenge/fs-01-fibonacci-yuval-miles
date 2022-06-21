const express = require("express");
const app = express();

const router = require("./routes/router");
const { connectToDB } = require("./db/connect");

app.use("/", router);

const port = 5050;

app.listen(port, async () => {
  await connectToDB();
  console.log(`Server listing on port: ${port}`);
});
