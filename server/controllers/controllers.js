const { client } = require("../db/connect");

const fib = (x, hashmap) => {
  hashmap = hashmap || {};
  if (hashmap.hasOwnProperty(x)) return hashmap[x];
  if (x > 50) {
    return "LARGER THEN 50";
  }
  if (x < 2) return x;
  else return (hashmap[x] = fib(x - 1, hashmap) + fib(x - 2, hashmap));
};

const getFibAtIndex = (req, res) => {
  const num = fib(req.params.number);
  client
    .db("fib")
    .collection("prevFibNumbers")
    .insertOne({ num: req.params.number, result: num });
  res.status(200).send(`${num}`);
};

const getPrevRes = async (req, res) => {
  const cursor = client.db("fib").collection("prevFibNumbers").find({});
  const results = [];
  await cursor.forEach(({ num, result }) => results.push({ num, result }));
  const resObj = { message: "success", results };
  res.status(200).json(resObj);
};

module.exports = { getFibAtIndex, getPrevRes };
