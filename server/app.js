const express = require("express");
const app = express();

const router = require("./routes/router");

app.use("/", router);

const port = 5050;

app.listen(port, () => {
  console.log(`Server listing on port:${port}`);
});
